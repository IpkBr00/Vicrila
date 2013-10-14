var ipkSharepoint = function(){
};
ipkSharepoint.prototype.Contexto = function(url){
    return new SP.ClientContext(url);
};
ipkSharepoint.prototype.ContextoActual = function(){
    return SP.ClientContext.get_current();
};
ipkSharepoint.prototype.ElementosEnLista = function(nombre){
    var contexto = this.ContextoActual(),
        web = contexto.get_web(),
        lista = web.get_lists().getByTitle(nombre),
        query = SP.CamlQuery.createAllItemsQuery();
    items = lista.getItems(query);

    contexto.load(items);

    var operacion = $.Deferred();
    contexto.executeQueryAsync(function () { operacion.resolve(items); }, function(){ operacion.reject(arguments); });

    return operacion.promise();
};
ipkSharepoint.prototype.EliminarElemento = function(Lista, Id){
    var contexto = this.ContextoActual();
    var item = contexto
                .get_web()
                .get_lists()
                .getByTitle(Lista)
                .getItemById(Id);

    item.deleteObject();

    var operacion = $.Deferred();
    contexto.executeQueryAsync(function(){ operacion.resolve(Id);}, function(){operacion.reject();});

    return operacion.promise();
};
ipkSharepoint.prototype.CarpetasEnLista = function(nombre){
    var contexto = this.ContextoActual(),
        web = contexto.get_web(),
        lista = web.get_lists().getByTitle(nombre),
        query = SP.CamlQuery.createAllFoldersQuery();
    items = lista.getItems(query);

    contexto.load(items);

    var operacion = $.Deferred();
    contexto.executeQueryAsync(function () { operacion.resolve(items); }, function(){ operacion.reject(arguments); });

    return operacion.promise();
};
ipkSharepoint.prototype.DocumentosEnCarpeta = function(nombre, ruta){
    var contexto = this.ContextoActual(),
        web = contexto.get_web(),
        lista = web.get_lists().getByTitle(nombre),
        query = SP.CamlQuery.createAllItemsQuery();
    query.set_folderServerRelativeUrl(ruta);

    var items = lista.getItems(query);
    contexto.load(items);

    var operacion = $.Deferred();
    contexto.executeQueryAsync(function () { operacion.resolve(items); }, function(){ operacion.reject(arguments); });

    return operacion.promise();
};
ipkSharepoint.prototype.CrearCarpeta = function(Lista, Carpeta){
    var contexto = this.ContextoActual(),
        web = contexto.get_web(),
        lista = web.get_lists().getByTitle(Lista),
        listItemCreationInfo = new SP.ListItemCreationInformation();

    listItemCreationInfo.set_underlyingObjectType(SP.FileSystemObjectType.folder);
    listItemCreationInfo.set_leafName(Carpeta);

    var newItem = lista.addItem(listItemCreationInfo);

    newItem.update();

    contexto.load(web);
    contexto.load(lista);

    var operacion = $.Deferred();
    contexto.executeQueryAsync(function () { operacion.resolve(newItem); }, function(){ operacion.reject(arguments); });

    return operacion.promise();
};

var ListadoAdjuntos = function(options){
    this.propiedades = options;

    this.ipkSP  = new ipkSharepoint();

    this.idDossier = undefined;
    this.dossier = undefined;

    this.tabs = undefined;

    return this;
};

ListadoAdjuntos.prototype.create = function(){
    var that = this,
        contenedor = "body";

    if(this.propiedades && this.propiedades.contenedor)
        contenedor = this.propiedades.contenedor;

    this.html = $(contenedor).load('../js/componentes/html/listadoAdjuntos.html', function(){
        that.inicializarComponentes();
        that.inicializarUI();
        that.inicializarEventos();
    });


};
ListadoAdjuntos.prototype.inicializarComponentes = function(){
};
ListadoAdjuntos.prototype.inicializarUI = function(){
    this.dialogo = $('#dialogoAdjuntos').dialog(
        {
            title       : 'Adjuntos del dossier',
            autoOpen    : false,
            modal       : true,
            width       : 'auto',
            height      : 'auto'
        }
    );
};
ListadoAdjuntos.prototype.inicializarEventos = function(){
    var that = this;

    $(document).delegate('.inlineButton .icon-remove.btnEliminarDocumento','click', function(){
        var infoElementoPulsado = that.infoElementoPulsado(this);
        var parametros = {
            InfoElemento : {
                idAdjunto     : infoElementoPulsado.idAdjunto
            }
        };
        var respuesta = confirm('¿Está seguro que desea borrar el adjunto?');
        if(respuesta)
        {
            that.ipkSP.EliminarElemento('Documentos Cotizacion', infoElementoPulsado.idAdjunto).
                done(function(id){
                    alert('Se ha eliminado el elemento con ID ' + id);
                    that.cargarAdjuntos(that.numDossier);
                }).fail(function(){
                    alert('Ha ocurrido un error eliminando el registro');
                }
            );
        }
        else
        {
            alert('Se ha cancelado la operación.');
        }

    });
    $(this.propiedades.trigger).on('click', function(){
        that.abrir();
    });
};

ListadoAdjuntos.prototype.infoElementoPulsado = function(Boton){
    var idfila = $(Boton).closest('tr').attr('id');

    return {
        'idAdjunto'    : idfila
    };
};

ListadoAdjuntos.prototype.cargarAdjuntos = function(NumDossier){
    var ipkSP =  new ipkSharepoint();
    var that = this;
    this.numDossier = NumDossier;
    ipkSP.DocumentosEnCarpeta('Documentos Cotizacion', '/Articulos/Cotizaciones/Documentos%20Cotizacion/'+ NumDossier).
        done(function(documentosEnCarpeta){
            that.renderAdjuntos(documentosEnCarpeta);
        });
};
ListadoAdjuntos.prototype.renderAdjuntos = function(DocumentosEnCarpeta){
            var currentItem,
                valores = undefined,
                dto = [],
                nuevo = undefined,
                ListEnumerator = DocumentosEnCarpeta.getEnumerator();

            while(ListEnumerator.moveNext())
            {
                currentItem = ListEnumerator.get_current();

                valores = currentItem.get_fieldValues();
                nuevo = {
                    idDocumento : valores.ID,
                    tipo : (valores.Tipo_x0020_Documento) ? valores.Tipo_x0020_Documento.get_lookupValue() : '',
                    nombre : valores.FileLeafRef,
                    url : valores.FileRef
                };

                dto.push(nuevo);
            }

            $('#tablaAdjuntos').
                find('table tbody tr').
                remove();

            $('#filaTemplate', this.html).
                tmpl(dto).
                appendTo('#tablaAdjuntos table tbody');

};
ListadoAdjuntos.prototype.abrir = function(){
    this.dialogo.dialog('open');
    $(window).height()
};
ListadoAdjuntos.prototype.cerrar = function(){
    this.dialogo.dialog('close');
};

