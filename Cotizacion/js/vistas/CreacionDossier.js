var CreacionDossierPage = function(){
    var self = this;

    this.ficha = {};
    this.factory = new IpkRemoteFactory();
    this.factory.onGetFicha = function(eventArgs){
        if(self[eventArgs.propiedad])
        {

            self[eventArgs.propiedad] = eventArgs.control;

            if(self[eventArgs.propiedad + 'Eventos'])
                self[eventArgs.propiedad + 'Eventos']();

            self[eventArgs.propiedad].ficha.aplicarSeguridad();

            setTimeout($.proxy(function(){  this.ficha.ficha.aplicarSeguridad(); }, self), 2000);
        }
    };

    this.inicializarLayout();

    this.crearToolbarMenu();
    this.crearFicha();
};

CreacionDossierPage.prototype.inicializarLayout = function(){
    $('body').layout({
        north: {
            resizable  : false,
            closable : false,
            size: '30'
        },
        south : {
            resizable  : false,
            closable : false,
            size: '220'
        }
    });
};

CreacionDossierPage.prototype.fichaEventos = function(){
    var self = this;

    this.ficha.onCancelarClick = function(){
        window.location = 'Inicio.aspx';
    };
    this.ficha.onRecordInserted = function(respuesta){
        var contexto = SP.ClientContext.get_current(),
            web = contexto.get_web(),
            lista = web.get_lists().getByTitle('Documentos Cotizacion'),
            listItemCreationInfo = new SP.ListItemCreationInformation();

        listItemCreationInfo.set_underlyingObjectType(SP.FileSystemObjectType.folder);
        listItemCreationInfo.set_leafName(respuesta.datos.NumDossier);

        var newItem = lista.addItem(listItemCreationInfo);

        newItem.update();

        contexto.load(web);
        contexto.load(lista);

        contexto.executeQueryAsync(function () { window.location = 'Estructura.aspx?Id=' + respuesta.datos.IdDossier; });

    };
};

CreacionDossierPage.prototype.crearToolbarMenu = function(){
    app.configuracion.navegacion();
};
CreacionDossierPage.prototype.crearFicha = function(){

    var configuracion = { contenedor : "fichaPlaceholder" , nombre : "Dossier" , modo : IpkFicha.Modos.Alta};
    this.factory.getFicha('Dossier', 'ficha', configuracion);
};

