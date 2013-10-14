var unidadesMedidaNavision = undefined;
$.ajax({
    type: "POST",
    contentType: "application/json; charset=utf-8",
    url: 'http://svb00078/sites/coleccionsitios/Articulos/Cotizaciones/_layouts/SP_Webservices/Navision.asmx/EjecutarFiltro',
    dataType: 'json',
    data : "{'Pagina':'UOM','Filtro':{},'TamanyoPagina':0}",
    success: function(data, textStatus, jqXHR){
        var datos = JSON.parse(data.d);
        console.log( JSON.parse(datos.Datos) );
        unidadesMedidaNavision = JSON.parse(datos.Datos);
    },
    error: function(jqXHR, textStatus, errorThrown){
        alert( '*** Error *** \n Metodo: Buscar \n Mensaje: ' +  errorThrown );
    }
});

var ipkSharepoint = function(){};
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
        query = SP.CamlQuery.createAllItemsQuery(),
        items = lista.getItems(query);

    contexto.load(items);

    var operacion = $.Deferred();
    contexto.executeQueryAsync(function () { operacion.resolve(items); }, function(){ operacion.reject(arguments); });

    return operacion.promise();
};
ipkSharepoint.prototype.ElementoEnListaPorId = function(nombre, id){
    var contexto = this.ContextoActual(),
        web = contexto.get_web(),
        lista = web.get_lists().getByTitle(nombre),
        item = lista.getItemById(id);

    contexto.load(item);

    var operacion = $.Deferred();
    contexto.executeQueryAsync(function () { operacion.resolve(item); }, function(){ operacion.reject(arguments); });

    return operacion.promise();
};
ipkSharepoint.prototype.ElementosEnListaQuery = function(nombre, queryXml){
    var contexto = this.ContextoActual(),
        web = contexto.get_web(),
        lista = web.get_lists().getByTitle(nombre),
        query = new SP.CamlQuery(),
        items = undefined;

    query.set_viewXml(queryXml);
    items = lista.getItems(query);

    contexto.load(items);

    var operacion = $.Deferred();
    contexto.executeQueryAsync(function () { operacion.resolve(items); }, function(){ operacion.reject(arguments); });

    return operacion.promise();
};
ipkSharepoint.prototype.CrearElementoEnLista = function(nombre, setterFunction, registro){
    var contexto = this.ContextoActual(),
        web = contexto.get_web(),
        lista = web.get_lists().getByTitle(nombre);

    var listItem = lista.addItem(new SP.ListItemCreationInformation());

    if(registro)
        setterFunction(listItem, registro);
    else
        setterFunction(listItem);

    listItem.set_item("Title", ".");

    listItem.update();

    var operacion = $.Deferred();
    contexto.executeQueryAsync(function () { operacion.resolve(listItem); }, function(){ operacion.reject(arguments); });

    return operacion.promise();
};
ipkSharepoint.prototype.ActualizarElementoEnLista = function(nombre, identificador,  setterFunction, registro){
    var contexto = this.ContextoActual(),
        web = contexto.get_web(),
        lista = web.get_lists().getByTitle(nombre),
        elemento = lista.getItemById(identificador);

    if(registro)
        setterFunction(elemento, registro);
    else
        setterFunction(elemento);
    elemento.update();

    var operacion = $.Deferred();
    contexto.executeQueryAsync(function () { operacion.resolve(elemento); }, function(){ operacion.reject(arguments); });

    return operacion.promise();
};
ipkSharepoint.prototype.BorrarElementoEnLista = function (nombre, identificador) {
    var contexto = this.ContextoActual(),
        web = contexto.get_web(),
        lista = web.get_lists().getByTitle(nombre),
        elemento = lista.getItemById(identificador);

    elemento.deleteObject();

    var operacion = $.Deferred();
    contexto.executeQueryAsync(function () { operacion.resolve(arguments); }, function(){ operacion.reject(arguments); });

    return operacion.promise();
};

var gridUnidadesMedida = function(codigo){
    // Variables
    this.codigo = codigo;
    this.tipoProducto = $.QueryString.t;
    this.api_sharepoint = undefined;
    // UI
    this.dialogo = undefined;
    this.gridReferencias = new gridReferenciasCruzadasCodigoBarras(codigo);

    this.inicializar_Componente();
    this.xmlConsulta = '<View><Query><Where><Eq><FieldRef Name="ItemNo"/><Value Type="Text">' + this.codigo +'</Value></Eq></Where></Query></View>';
    this.api_sharepoint.ElementosEnListaQuery('UnidadesDeMedida', this.xmlConsulta).done($.proxy(this.renderUnidadesMedida, this));
};

gridUnidadesMedida.prototype.inicializar_Componente = function(){
    this.inicializar_variables();
    this.inicializar_UI();
    this.inicializar_eventos();
};
gridUnidadesMedida.prototype.inicializar_variables = function(){
    this.api_sharepoint = new ipkSharepoint();
};
gridUnidadesMedida.prototype.inicializar_UI = function(){
    var that = this;
    this.dialogo = $('#formularioUnidadesMedida').dialog(
        {
            title : 'Unidades de Medida',
            autoOpen : false,
            modal : true,
            buttons: {
                "Guardar" : function() {
                    that.guardarClick();
                    //$( this ).dialog( "close" );
                },
                "Cancelar" : function() {
                    $( this ).dialog( "close" );
                }
            },
            close : function(evento, ui){
                that.dialogo.accion = "";
                that.dialogo._Clave_ = "";
                that.limpiarFormulario();
            }
        }
    );
    this.dialogo.accion = "";
};
gridUnidadesMedida.prototype.inicializar_eventos = function(){
    var that = this,
        $bloqueUnidadesMedida = $('#bloqueUnidadesMedida');

    $bloqueUnidadesMedida.delegate('#btnAddUnidadMedida', 'click', $.proxy( that.nuevaUnidadMedidaClick, that ));
    $bloqueUnidadesMedida.delegate('.btnEliminarUnidadMedida', 'click', function(){
        that.borrarUnidadMedidaClick(this);
    });
    $bloqueUnidadesMedida.delegate('.btnEditarUnidadMedida', 'click',  function(){
        that.editarUnidadMedidaClick(this);
    });
    this.dialogo.delegate('#Length', 'change', this.calculoCubicaje);
    this.dialogo.delegate('#Width', 'change', this.calculoCubicaje);
    this.dialogo.delegate('#Height', 'change', this.calculoCubicaje);
};

gridUnidadesMedida.prototype.nuevaUnidadMedidaClick = function(){
    this.dialogo.accion = "ALTA";
    this.dialogo._Clave_ = "";

    this.renderComboNavision();
    this.bloqueoFormulario();
    $(this.dialogo).dialog('open');

};
gridUnidadesMedida.prototype.borrarUnidadMedidaClick = function(elemento){
    var that = this,
        id = parseInt(
        $(elemento)
            .closest('tr')
            .attr('id')
            .replace('unidadMedida-','')
    );
    this.api_sharepoint.BorrarElementoEnLista('UnidadesDeMedida', id).done(function(){
        that.api_sharepoint.ElementosEnListaQuery('UnidadesDeMedida', that.xmlConsulta).done($.proxy(that.renderUnidadesMedida, that));
        //that.api_sharepoint.ElementosEnLista('UnidadesDeMedida').done($.proxy(that.renderUnidadesMedida, that));
    });

};
gridUnidadesMedida.prototype.editarUnidadMedidaClick = function(elemento){
    var that = this,
        id = parseInt(
        $(elemento)
            .closest('tr')
            .attr('id')
            .replace('unidadMedida-','')
    );
    this.renderComboNavision();
    this.limpiarFormulario();
    this.api_sharepoint.ElementoEnListaPorId('UnidadesDeMedida', id).done(function(item){
        var valores = item.get_fieldValues();
        that.jsonToformulario(valores);
        that.bloqueoFormulario(valores);
        that.dialogo.accion = "EDICION";
        that.dialogo._Clave_ = valores.ID;
        $(that.dialogo).dialog('open');

    });
};
gridUnidadesMedida.prototype.guardarClick = function(){
    var that = this,
        registro = this.formularioToJson();

    if(this.validarRegistro(registro)){
        if(this.dialogo.accion == "ALTA")
        {
            this.api_sharepoint.CrearElementoEnLista('UnidadesDeMedida', $.proxy(this.setListItemValues, this))
                .done(function(){
                    console.log(that.formularioToJson());
                    that.api_sharepoint.ElementosEnListaQuery('UnidadesDeMedida', that.xmlConsulta).done($.proxy(that.renderUnidadesMedida, that));

                    that.api_sharepoint.CrearElementoEnLista('ReferenciasCruzadas', $.proxy(that.crearReferenciaRelacionada, that), that.formularioToJson())
                        .done(function(){
                            var xmlConsulta = '<View><Query><Where><And><Eq><FieldRef Name="TipoReferencia"/><Value Type="Text">Cód. Barra</Value></Eq><Eq><FieldRef Name="ItemNo"/><Value Type="Text">' + that.codigo +'</Value></Eq></And></Where></Query></View>';
                            that.api_sharepoint.ElementosEnListaQuery('ReferenciasCruzadas', xmlConsulta).done($.proxy(that.gridReferencias.renderReferenciasCruzadas, that.gridReferencias));

                        });

                    $(that.dialogo).dialog('close');
                    alert('Completa los datos de la referencia cruzada para la unidad de medida creada.')
                });
        }
        else
        {
            this.api_sharepoint.ActualizarElementoEnLista('UnidadesDeMedida',this.dialogo._Clave_, $.proxy(this.setListItemValues, this))
                .done(function(){
                    that.api_sharepoint.ElementosEnListaQuery('UnidadesDeMedida', that.xmlConsulta).done($.proxy(that.renderUnidadesMedida, that));
                    $(that.dialogo).dialog('close');
                });
        }
    }
    else
    {
        alert('Revisa los datos del formulario.');
    }
};

gridUnidadesMedida.prototype.renderComboNavision = function(){
    if($('select#Code option').length == 0)
    {
        $("#comboOperariosTemplate").tmpl(unidadesMedidaNavision).appendTo('select#Code');
        $('select#Code').prepend('<option value="">Selecciona una opci&oacute;n</option>');
    }
};
gridUnidadesMedida.prototype.renderUnidadesMedida = function(Collection){
    var dto = [];
    dto = this.procesarUnidadesMedida(Collection);

    this.registros = dto;

    $('#tablaUnidadesMedidad').find('tbody tr').remove();
    $('#filaUnidaMedidaTemplate').tmpl(dto).appendTo('#tablaUnidadesMedidad tbody');
    $('#bloqueUnidadesMedida').show();
};
gridUnidadesMedida.prototype.procesarUnidadesMedida = function(Collection){
    var currentItem,
        valores = undefined,
        dto = [],
        nuevo = undefined,
        ListEnumerator = Collection.getEnumerator();



    while(ListEnumerator.moveNext())
    {
        currentItem = ListEnumerator.get_current();

        valores = currentItem.get_fieldValues();
        nuevo = {
            Id : valores.ID,
            ItemNo : valores.ItemNo,
            Code : valores.Code,
            QtyPerUnitOfMeasure : valores.QtyPerUnitOfMeasure,
            Length : valores.Length,
            Width : valores.Width,
            Height : valores.Height,
            Cubage : valores.Cubage,
            Weight : valores.Weight,
            QtyPerPalet : valores.QtyPerPalet,
            TipoProducto : this.tipoProducto
        };

        dto.push(nuevo);
    }

    return dto;
};
gridUnidadesMedida.prototype.validarRegistros = function(){
    var valido = true,
        that = this;

    $.each(this.registros, function(){
        valido = valido && that.validarRegistro(this);
    });

    return valido;
};
gridUnidadesMedida.prototype.validarRegistro = function(registro){
    //var registro = this.formularioToJson(),
    var valido = false;

    if(registro.QtyPerUnitOfMeasure != '' && registro.Length != '' && registro.Width != '' && registro.Height != '' && registro.Cubage != '' && registro.QtyPerPalet != '' && registro.Weight != '')
    {
        if(registro.QtyPerUnitOfMeasure > 0 && registro.Length > 0 && registro.Width > 0 && registro.Height > 0 && registro.Cubage > 0 && registro.QtyPerPalet > 0 && registro.Weight > 0)
        {
            valido = true;
        }
    }

    return valido;
};
gridUnidadesMedida.prototype.setListItemValues = function(listItem){
    var registro = this.formularioToJson();

    listItem.set_item("ItemNo", registro.ItemNo);
    listItem.set_item("Code", registro.Code);
    listItem.set_item("QtyPerUnitOfMeasure", registro.QtyPerUnitOfMeasure);
    listItem.set_item("Length", registro.Length);
    listItem.set_item("Width", registro.Width);
    listItem.set_item("Height", registro.Height);
    listItem.set_item("Cubage", registro.Cubage);
    listItem.set_item("QtyPerPalet", registro.QtyPerPalet);
    listItem.set_item("Weight", registro.Weight);
};
gridUnidadesMedida.prototype.crearReferenciaRelacionada = function(listItem, registro){
    listItem.set_item("ItemNo", registro.ItemNo);
    listItem.set_item("TipoReferencia", 'Cód. Barra');
    listItem.set_item("UnidadMedida", registro.Code);

};
gridUnidadesMedida.prototype.formularioToJson = function(){
    var registro = {};

    registro.ItemNo = this.codigo;
    registro.Code = $('#Code').val();
    registro.QtyPerUnitOfMeasure = $('#QtyPerUnitOfMeasure').val();
    registro.Length = $('#Length').val();
    registro.Width = $('#Width').val();
    registro.Height = $('#Height').val();
    registro.Cubage = $('#Cubage').val();
    registro.QtyPerPalet = $('#QtyPerPalet').val();
    registro.Weight = $('#Weight').val();

    return registro;
};
gridUnidadesMedida.prototype.jsonToformulario = function(registro){
    $('#Code').val(registro.Code);
    $('#QtyPerUnitOfMeasure').val(registro.QtyPerUnitOfMeasure);
    $('#Length').val(registro.Length);
    $('#Width').val(registro.Width);
    $('#Height').val(registro.Height);
    $('#Cubage').val(registro.Cubage);
    $('#QtyPerPalet').val(registro.QtyPerPalet);
    $('#Weight').val(registro.Weight);
};
gridUnidadesMedida.prototype.bloqueoFormulario = function(registro){
    var $code = $('#Code'),
        $unidadMedida = $('#QtyPerUnitOfMeasure');

    if(registro)
    {
        switch (registro.Code)
        {
            case 'UD':
                $code.attr('disabled', true);
                $code.attr('readonly', true);
                $unidadMedida.val('1');
                $unidadMedida.attr('disabled', true);
                $unidadMedida.attr('readonly', true);
                break;
            case 'PALET':
                $code.attr('disabled', true);
                $code.attr('readonly', true);
                $unidadMedida.attr('disabled', false);
                $unidadMedida.attr('readonly', false);
                break;
            default :
                $code.attr('disabled', false);
                $code.attr('readonly', false);
                $unidadMedida.attr('disabled', false);
                $unidadMedida.attr('readonly', false);
                break;
        }
    }
    else
    {
        $code.attr('disabled', false);
        $code.attr('readonly', false);
        $unidadMedida.attr('disabled', false);
        $unidadMedida.attr('readonly', false);
    }
};
gridUnidadesMedida.prototype.limpiarFormulario = function(){
    var vacio = '';
    $('#Code').val(vacio);
    $('#QtyPerUnitOfMeasure').val(vacio);
    $('#Length').val(vacio);
    $('#Width').val(vacio);
    $('#Height').val(vacio);
    $('#Cubage').val(vacio);
    $('#QtyPerPalet').val(vacio);
    $('#Weight').val(vacio);
};

gridUnidadesMedida.prototype.calculoCubicaje = function(){
    var longitud = 0,
        altura = 0,
        anchura = 0 ,
        cubicaje = 0;

    var $longitud = $('#Length'),
        $altura = $('#Height'),
        $anchura = $('#Width') ,
        $cubicaje = $('#Cubage');


    altura =  ( $altura.val() == '')? 0 : parseFloat( $altura.val()) ;
    anchura =  ( $anchura.val() == '')? 0 : parseFloat( $anchura.val()) ;
    longitud =  ( $longitud.val() == '')? 0 : parseFloat( $longitud.val()) ;

    if( altura != 0 && anchura != 0 && longitud != 0)
        cubicaje = (altura * anchura * longitud) / 1000000;

    $cubicaje.val( Math.round(cubicaje) );

};


var gridReferenciasCruzadasCodigoBarras = function(codigo){

    // Variables
    this.codigo = codigo;
    this.tipoProducto = $.QueryString.t;
    this.api_sharepoint = undefined;
    this.filas = undefined;
    // UI
    this.dialogo = undefined;

    this.inicializar_Componente();
    this.xmlConsulta = '<View><Query><Where><And><Eq><FieldRef Name="TipoReferencia"/><Value Type="Text">Cód. Barra</Value></Eq><Eq><FieldRef Name="ItemNo"/><Value Type="Text">' + this.codigo +'</Value></Eq></And></Where></Query></View>';
    this.api_sharepoint.ElementosEnListaQuery('ReferenciasCruzadas', this.xmlConsulta).done($.proxy(this.renderReferenciasCruzadas, this));

};

gridReferenciasCruzadasCodigoBarras.prototype.inicializar_Componente = function(){
    this.inicializar_variables();
    this.inicializar_UI();
    this.inicializar_eventos();
};
gridReferenciasCruzadasCodigoBarras.prototype.inicializar_variables = function(){
    this.api_sharepoint = new ipkSharepoint();
};
gridReferenciasCruzadasCodigoBarras.prototype.inicializar_UI = function(){
    var that = this;
    this.dialogo = $('#formularioReferenciasCruzadas').dialog(
        {
            title : 'Referencias Cruzadas',
            autoOpen : false,
            modal : true,
            buttons: {
                "Guardar" : function() {
                    that.guardarClick();
                    //$( this ).dialog( "close" );
                },
                "Cancelar" : function() {
                    $( this ).dialog( "close" );
                }
            },
            close : function(evento, ui){
                that.dialogo.accion = "";
                that.dialogo._Clave_ = "";
                that.limpiarFormulario();
            }
        }
    );
    this.dialogo.accion = "";
};
gridReferenciasCruzadasCodigoBarras.prototype.inicializar_eventos = function(){
    var that = this,
        $bloqueReferenciasCruzada = $('#bloqueReferenciasCruzadas');

    $bloqueReferenciasCruzada.delegate('#btnAddReferenciaCruzada', 'click', $.proxy( that.nuevaReferenciasCruzadaClick, that ));
    $bloqueReferenciasCruzada.delegate('.btnEliminarReferenciaCruzada', 'click', function(){
        that.borrarReferenciasCruzadaClick(this);
    });
    $bloqueReferenciasCruzada.delegate('.btnEditarReferenciaCruzada', 'click',  function(){
        that.editarReferenciasCruzadaClick(this);
    });

};

gridReferenciasCruzadasCodigoBarras.prototype.nuevaReferenciasCruzadaClick = function(){
    this.dialogo.accion = "ALTA";
    this.dialogo._Clave_ = "";

    this.renderComboNavision();

    $(this.dialogo).dialog('open');

};
gridReferenciasCruzadasCodigoBarras.prototype.borrarReferenciasCruzadaClick = function(elemento){
    var that = this,
        id = parseInt(
            $(elemento)
                .closest('tr')
                .attr('id')
                .replace('referenciaCruzada-','')
        );
    this.api_sharepoint.BorrarElementoEnLista('ReferenciasCruzadas', id).done(function(){
        //that.api_sharepoint.ElementosEnLista('ReferenciasCruzadas').done($.proxy(that.renderReferenciasCruzadas, that));
        that.api_sharepoint.ElementosEnListaQuery('ReferenciasCruzadas', that.xmlConsulta).done($.proxy(that.renderReferenciasCruzadas, that));
    });

};
gridReferenciasCruzadasCodigoBarras.prototype.editarReferenciasCruzadaClick = function(elemento){
    var that = this,
        id = parseInt(
            $(elemento)
                .closest('tr')
                .attr('id')
                .replace('referenciaCruzada-','')
        );
    this.renderComboNavision();
    this.limpiarFormulario();
    this.api_sharepoint.ElementoEnListaPorId('ReferenciasCruzadas', id).done(function(item){
        var valores = item.get_fieldValues();
        that.jsonToformulario(valores);
        that.dialogo.accion = "EDICION";
        that.dialogo._Clave_ = valores.ID;
        $(that.dialogo).dialog('open');
    });
};
gridReferenciasCruzadasCodigoBarras.prototype.guardarClick = function(){
    var that = this;

    if(this.validar())
    {
        if(this.dialogo.accion == "ALTA")
        {
            this.crearElemento().done(function(){
                that.api_sharepoint.ElementosEnListaQuery('ReferenciasCruzadas', that.xmlConsulta).done(
                    $.proxy(that.renderReferenciasCruzadas, that)
                );
                $( that.dialogo ).dialog( "close" );
            });
        }
        else
        {
            this.actualizarElemento()
                .done(function(){
                    alert('Actualizar Ref. Cruzada');
                    console.log('Actualizar Ref. Cruzada');
                    console.log(that.formularioToJson());

                    that.api_sharepoint.ElementosEnListaQuery('ReferenciasCruzadas', that.xmlConsulta).done($.proxy(that.renderReferenciasCruzadas, that));
                    $( that.dialogo ).dialog( "close" );
                });
        }
    }
    else
    {
        alert('Revisa los datos del formulario.');
    }
};


gridReferenciasCruzadasCodigoBarras.prototype.crearElemento = function(){
    var deferred = $.Deferred();

    this.api_sharepoint.CrearElementoEnLista('ReferenciasCruzadas', $.proxy(this.setListItemValues, this))
        .done(function(){
            deferred.resolve();
        });

    return deferred.promise();
};
gridReferenciasCruzadasCodigoBarras.prototype.actualizarElemento = function(){
    var deferred = $.Deferred();
    var elementoMarcado = this.referenciaAVolcar();
    var volcado = this.volcarValidacion(this.formularioToJson());
    var that = this;

    this.api_sharepoint.ActualizarElementoEnLista('ReferenciasCruzadas',this.dialogo._Clave_, $.proxy(this.setListItemValues, this))
        .done(function(){
            if(volcado)
            {
                elementoMarcado.Volcar = "False";
                that.api_sharepoint.ActualizarElementoEnLista('ReferenciasCruzadas',elementoMarcado.Id, $.proxy(that.setListItemValues, that), elementoMarcado)
                    .done(function(){
                        deferred.resolve();
                    });
            }
            else
                deferred.resolve();
        });

    return deferred.promise();
};

gridReferenciasCruzadasCodigoBarras.prototype.renderComboNavision = function(){
    if($('select#UnidadMedida option').length == 0)
    {
        $("#comboOperariosTemplate").tmpl(unidadesMedidaNavision).appendTo('select#UnidadMedida');
        $('select#UnidadMedida').prepend('<option value="">Selecciona una opci&oacute;n</option>');
    }
};
gridReferenciasCruzadasCodigoBarras.prototype.renderReferenciasCruzadas = function(Collection){
    var dto = [];
    dto = this.procesarReferenciasCruzada(Collection);
    this.filas = dto;

    $('#tablaReferenciasCruzadas').find('tbody tr').remove();
    $('#filaReferenciaCruzadaTemplate').tmpl(dto).appendTo('#tablaReferenciasCruzadas tbody');
    $('#bloqueReferenciasCruzadas').show();
};
gridReferenciasCruzadasCodigoBarras.prototype.procesarReferenciasCruzada = function(Collection){
    var currentItem,
        valores = undefined,
        dto = [],
        nuevo = undefined,
        ListEnumerator = Collection.getEnumerator();

    while(ListEnumerator.moveNext())
    {
        currentItem = ListEnumerator.get_current();

        valores = currentItem.get_fieldValues();
        nuevo = {
            Id : valores.ID,
            ItemNo : valores.ItemNo,
            TipoReferencia : valores.TipoReferencia,
            NoTipoReferencia : valores.NoTipoReferencia,
            NoReferencia : valores.NoReferencia,
            CodVariante : valores.CodVariante,
            UnidadMedida : valores.UnidadMedida,
            Descripcion : valores.Descripcion,
            Volcar : ((valores.Volcar == "True") ? true: false),
            TipoProducto : this.tipoProducto
        };


        dto.push(nuevo);
    }

    return dto;
};
gridReferenciasCruzadasCodigoBarras.prototype.validar = function(){
    var registro = this.formularioToJson(),
        valido = false;

    if(registro.NoReferencia != '' && registro.UnidadMedida != '')
    {
        valido = true;
    }

    return valido;
};
gridReferenciasCruzadasCodigoBarras.prototype.setListItemValues = function(listItem, objeto){
    var registro = undefined ;
    if(objeto)
        registro = objeto;
    else
        registro = this.formularioToJson();

    listItem.set_item("ItemNo", registro.ItemNo);
    listItem.set_item("TipoReferencia", registro.TipoReferencia);
    listItem.set_item("NoTipoReferencia", registro.NoTipoReferencia);
    listItem.set_item("NoReferencia", registro.NoReferencia);
    listItem.set_item("CodVariante", registro.CodVariante);
    listItem.set_item("UnidadMedida", registro.UnidadMedida);
    listItem.set_item("Descripcion", registro.Descripcion);
    listItem.set_item("Volcar", registro.Volcar);

};
gridReferenciasCruzadasCodigoBarras.prototype.formularioToJson = function(){
    var registro = {};

    registro.ItemNo = this.codigo;
    registro.TipoReferencia = $('#TipoReferencia').val();
    registro.NoTipoReferencia = $('#NoTipoReferencia').val();
    registro.NoReferencia = $('#NoReferencia').val();
    registro.CodVariante = $('#CodVariante').val();
    registro.UnidadMedida = $('#UnidadMedida').val();
    registro.Descripcion = $('#Descripcion').val();
    registro.Volcar =  ($('#Volcar').attr('checked')) ? "True" : "False" ;


    return registro;
};
gridReferenciasCruzadasCodigoBarras.prototype.jsonToformulario = function(registro){
    $('#TipoReferencia').val(registro.TipoReferencia);
    $('#NoTipoReferencia').val(registro.NoTipoReferencia);
    $('#NoReferencia').val(registro.NoReferencia);
    $('#CodVariante').val(registro.CodVariante);
    $('#UnidadMedida').val(registro.UnidadMedida);
    $('#Descripcion').val(registro.Descripcion);
    $('#Volcar').attr('checked', ((registro.Volcar == "True") ? true: false) );

};
gridReferenciasCruzadasCodigoBarras.prototype.limpiarFormulario = function(){
    var vacio = '';

    $('#TipoReferencia').val(vacio);
    $('#NoTipoReferencia').val(vacio);
    $('#NoReferencia').val(vacio);
    $('#CodVariante').val(vacio);
    $('#UnidadMedida').val(vacio);
    $('#Descripcion').val(vacio);
    $('#Volcar').attr('checked', false);
};

gridReferenciasCruzadasCodigoBarras.prototype.volcarValidacion = function(elemento){
    var that = this,
        estadoCheck = ((elemento.Volcar == "True") ? true : false),
        referenciaMarcada = this.referenciaAVolcar(),
        resultado = false;

    console.log('La refrencia marcada es .... ');
    console.log(referenciaMarcada.UnidadMedida);

    if(this.dialogo._Clave_ != referenciaMarcada.Id)
    {
        if(estadoCheck)
        {
            console.log('Se va a cambiar la refencia a Volcar');
            resultado = true;
        }
        else
            console.log('No se hace nada');
    }
    else
    {
        if(estadoCheck)
            console.log('No se puede cambiar desmarcar la referencia porque actualmente es la referencia a Volcar');
        else
            console.log('No hace nada xk la referencia ya esta marcada como a Volcar');
    }

    return resultado;
};
gridReferenciasCruzadasCodigoBarras.prototype.referenciaAVolcar = function(){
    var referenciaMarcada = undefined;

    $.each(this.filas , function(){
        if(this.Volcar)
            referenciaMarcada = this;
    });

    return referenciaMarcada;
};


var gridReferenciasCruzadasClientes = function(codigo){
    // Variables
    this.codigo = codigo;
    this.tipoProducto = $.QueryString.t;
    this.api_sharepoint = undefined;
    this.filas = undefined;

    // UI
    this.dialogo = undefined;

    this.inicializar_Componente();
    this.xmlConsulta = '<View><Query><Where><And><Eq><FieldRef Name="TipoReferencia"/><Value Type="Text">Cliente</Value></Eq><Eq><FieldRef Name="ItemNo"/><Value Type="Text">' + this.codigo +'</Value></Eq></And></Where></Query></View>';
    this.api_sharepoint.ElementosEnListaQuery('ReferenciasCruzadas', this.xmlConsulta).done($.proxy(this.renderReferenciasCruzadas, this));

};

gridReferenciasCruzadasClientes.prototype.inicializar_Componente = function(){
    this.inicializar_variables();
    this.inicializar_UI();
    this.inicializar_eventos();
};
gridReferenciasCruzadasClientes.prototype.inicializar_variables = function(){
    this.api_sharepoint = new ipkSharepoint();
};
gridReferenciasCruzadasClientes.prototype.inicializar_UI = function(){
    var that = this;
    this.dialogo = $('#formularioReferenciasCruzadasClientes').dialog(
        {
            title : 'Referencias Cruzadas Clientes',
            autoOpen : false,
            modal : true,
            buttons: {
                "Guardar" : function() {
                    that.guardarClick();
                    $( this ).dialog( "close" );
                },
                "Cancelar" : function() {
                    $( this ).dialog( "close" );
                }
            },
            close : function(evento, ui){
                that.dialogo.accion = "";
                that.dialogo._Clave_ = "";
                that.limpiarFormulario();
            }
        }
    );
    this.dialogo.accion = "";
};
gridReferenciasCruzadasClientes.prototype.inicializar_eventos = function(){
    var that = this,
        $bloqueReferenciasCruzada = $('#bloqueReferenciasCruzadasClientes');

    $bloqueReferenciasCruzada.delegate('#btnAddReferenciaCruzadaClientes', 'click', $.proxy( that.nuevaReferenciasCruzadaClick, that ));
    $bloqueReferenciasCruzada.delegate('.btnEliminarReferenciaCruzadaClientes', 'click', function(){
        that.borrarReferenciasCruzadaClick(this);
    });
    $bloqueReferenciasCruzada.delegate('.btnEditarReferenciaCruzadaClientes', 'click',  function(){
        that.editarReferenciasCruzadaClick(this);
    });
};

gridReferenciasCruzadasClientes.prototype.nuevaReferenciasCruzadaClick = function(){
    this.dialogo.accion = "ALTA";
    this.dialogo._Clave_ = "";

    this.renderComboNavision();

    $(this.dialogo).dialog('open');

};
gridReferenciasCruzadasClientes.prototype.borrarReferenciasCruzadaClick = function(elemento){
    var that = this,
        id = parseInt(
            $(elemento)
                .closest('tr')
                .attr('id')
                .replace('referenciaCruzadaClientes-','')
        );
    this.api_sharepoint.BorrarElementoEnLista('ReferenciasCruzadas', id).done(function(){
        that.api_sharepoint.ElementosEnListaQuery('ReferenciasCruzadas', that.xmlConsulta).done($.proxy(that.renderReferenciasCruzadas, that));
        //that.api_sharepoint.ElementosEnLista('ReferenciasCruzadas').done($.proxy(that.renderReferenciasCruzadas, that));
    });

};
gridReferenciasCruzadasClientes.prototype.editarReferenciasCruzadaClick = function(elemento){
    var that = this,
        id = parseInt(
            $(elemento)
                .closest('tr')
                .attr('id')
                .replace('referenciaCruzadaClientes-','')
        );
    this.renderComboNavision();
    this.limpiarFormulario();
    this.api_sharepoint.ElementoEnListaPorId('ReferenciasCruzadas', id).done(function(item){
        var valores = item.get_fieldValues();
        that.jsonToformulario(valores);
        that.dialogo.accion = "EDICION";
        that.dialogo._Clave_ = valores.ID;
        $(that.dialogo).dialog('open');
    });
};
gridReferenciasCruzadasClientes.prototype.guardarClick = function(){
    var that = this;
    var elementoMarcado = this.referenciaAImprimirPalet();
    var volcado = this.impresionPaletValidacion(this.formularioToJson());

    if(this.validar())
    {
        if(this.dialogo.accion == "ALTA")
        {
            this.api_sharepoint.CrearElementoEnLista('ReferenciasCruzadas', $.proxy(this.setListItemValues, this))
                .done(function(){
                    that.api_sharepoint.ElementosEnListaQuery('ReferenciasCruzadas', that.xmlConsulta).done($.proxy(that.renderReferenciasCruzadas, that));
                });
        }
        else
        {

            var actualizacion = this.formularioToJson();
            if(elementoMarcado.Id == this.dialogo._Clave_)
            {
                if(actualizacion.ImpresionFichaPalet == "False")
                {
                    actualizacion.ImpresionFichaPalet = "True";
                }
            }

            this.api_sharepoint.ActualizarElementoEnLista('ReferenciasCruzadas',this.dialogo._Clave_, $.proxy(this.setListItemValues, this), actualizacion)
                .done(function(){
                    if(volcado)
                    {
                        elementoMarcado.ImpresionFichaPalet = "False";
                        that.api_sharepoint.ActualizarElementoEnLista('ReferenciasCruzadas',elementoMarcado.Id, $.proxy(that.setListItemValues, that), elementoMarcado)
                            .done(function(){
                                that.api_sharepoint.ElementosEnListaQuery('ReferenciasCruzadas', that.xmlConsulta).done($.proxy(that.renderReferenciasCruzadas, that));
                            });
                    }
                    else
                        that.api_sharepoint.ElementosEnListaQuery('ReferenciasCruzadas', that.xmlConsulta).done($.proxy(that.renderReferenciasCruzadas, that));
                });
        }
    }

};

gridReferenciasCruzadasClientes.prototype.renderComboNavision = function(){
    if($('select#UnidadMedidaClientes option').length == 0)
    {
        $("#comboOperariosTemplate").tmpl(unidadesMedidaNavision).appendTo('select#UnidadMedidaClientes');
        $('select#UnidadMedidaClientes').prepend('<option value="">Selecciona una opci&oacute;n</option>');
    }
};
gridReferenciasCruzadasClientes.prototype.renderReferenciasCruzadas = function(Collection){
    var dto = [];

    dto = this.procesarReferenciasCruzada(Collection);
    this.filas = dto;

    $('#tablaReferenciasCruzadasClientes').find('tbody tr').remove();
    $('#filaReferenciaCruzadaClientesTemplate').tmpl(dto).appendTo('#tablaReferenciasCruzadasClientes tbody');
    $('#bloqueReferenciasCruzadasClientes').show();
};
gridReferenciasCruzadasClientes.prototype.procesarReferenciasCruzada = function(Collection){
    var currentItem,
        valores = undefined,
        dto = [],
        nuevo = undefined,
        ListEnumerator = Collection.getEnumerator();

    while(ListEnumerator.moveNext())
    {
        currentItem = ListEnumerator.get_current();

        valores = currentItem.get_fieldValues();
        nuevo = {
            Id : valores.ID,
            ItemNo : valores.ItemNo,
            TipoReferencia : valores.TipoReferencia,
            NoTipoReferencia : valores.NoTipoReferencia,
            NoReferencia : valores.NoReferencia,
            CodVariante : valores.CodVariante,
            UnidadMedida : valores.UnidadMedida,
            Descripcion : valores.Descripcion,
            ImpresionFichaPalet : ((valores.ImpresionFichaPalet == "True") ? true: false),
            TipoProducto : this.tipoProducto
        };

        dto.push(nuevo);
    }

    return dto;
};
gridReferenciasCruzadasClientes.prototype.validar = function(){
    var registro = this.formularioToJson(),
        valido = false;

    if(registro.NoTipoReferencia != '' && registro.NoReferencia != '' && registro.UnidadMedida != '')
    {
        valido = true;
    }

    return valido;
};
gridReferenciasCruzadasClientes.prototype.setListItemValues = function(listItem, objeto){

    var registro = undefined;
    if(objeto)
        registro = objeto;
    else
        registro = this.formularioToJson();

    listItem.set_item("ItemNo", registro.ItemNo);
    listItem.set_item("TipoReferencia", registro.TipoReferencia);
    listItem.set_item("NoTipoReferencia", registro.NoTipoReferencia);
    listItem.set_item("NoReferencia", registro.NoReferencia);
    listItem.set_item("CodVariante", registro.CodVariante);
    listItem.set_item("UnidadMedida", registro.UnidadMedida);
    listItem.set_item("Descripcion", registro.Descripcion);
    listItem.set_item("ImpresionFichaPalet", registro.ImpresionFichaPalet);

};
gridReferenciasCruzadasClientes.prototype.formularioToJson = function(){
    var registro = {};

    registro.ItemNo = this.codigo;
    registro.TipoReferencia = $('#TipoReferenciaClientes').val();
    registro.NoTipoReferencia = $('#NoTipoReferenciaClientes').val();
    registro.NoReferencia = $('#NoReferenciaClientes').val();
    registro.CodVariante = $('#CodVarianteClientes').val();
    registro.UnidadMedida = $('#UnidadMedidaClientes').val();
    registro.Descripcion = $('#DescripcionClientes').val();
    registro.ImpresionFichaPalet = ($('#ImpresionFichaPalet').attr('checked')) ? "True" : "False" ;

    return registro;
};
gridReferenciasCruzadasClientes.prototype.jsonToformulario = function(registro){
    $('#TipoReferenciaClientes').val(registro.TipoReferencia);
    $('#NoTipoReferenciaClientes').val(registro.NoTipoReferencia);
    $('#NoReferenciaClientes').val(registro.NoReferencia);
    $('#CodVarianteClientes').val(registro.CodVariante);
    $('#UnidadMedidaClientes').val(registro.UnidadMedida);
    $('#DescripcionClientes').val(registro.Descripcion);
    $('#ImpresionFichaPalet').attr('checked', ((registro.ImpresionFichaPalet == "True") ? true: false) );
};
gridReferenciasCruzadasClientes.prototype.limpiarFormulario = function(){
    var vacio = '';

    $('#TipoReferenciaClientes').val(vacio);
    $('#NoTipoReferenciaClientes').val(vacio);
    $('#NoReferenciaClientes').val(vacio);
    $('#CodVarianteClientes').val(vacio);
    $('#UnidadMedidaClientes').val(vacio);
    $('#DescripcionClientes').val(vacio);
    $('#ImpresionFichaPalet').attr('checked', false);
};

gridReferenciasCruzadasClientes.prototype.impresionPaletValidacion = function(elemento){
    var that = this,
        estadoCheck = ((elemento.ImpresionFichaPalet == "True") ? true : false),
        referenciaMarcada = this.referenciaAImprimirPalet(),
        resultado = false;

    if(this.dialogo._Clave_ != referenciaMarcada.Id)
    {
        if(estadoCheck)
        {
            console.log('Se va a cambiar la refencia a Volcar');
            resultado = true;
        }
        else
            console.log('No se hace nada');
    }
    else
    {
        if(estadoCheck)
            console.log('No se puede cambiar desmarcar la referencia porque actualmente es la referencia a Volcar');
        else
            console.log('No hace nada xk la referencia ya esta marcada como a Volcar');
    }

    return resultado;
};
gridReferenciasCruzadasClientes.prototype.referenciaAImprimirPalet = function(){
    var referenciaMarcada = undefined;

    $.each(this.filas , function(){
        if(this.ImpresionFichaPalet)
            referenciaMarcada = this;
    });

    return referenciaMarcada;
};

function waitFor(objecto){
    var o = objecto;
    var deferred = $.Deferred();

    var intervalId = setInterval(function(){

        if(o.valor)
        {
            deferred.resolve();
            clearInterval(intervalId);
        }
    }, 1000);

    return deferred.promise();
}