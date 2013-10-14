Date.prototype.TimeStamp = function () {
    var d = new Date();
    var fecha = ( (d.getDate() < 10) ? '0' + d.getDate(): d.getDate() )  + '/' + (((d.getMonth() + 1 < 10) ? '0' + (d.getMonth() + 1): d.getMonth() + 1)) + '/' + d.getFullYear();
    var hora = ( (d.getHours() < 10) ? '0' + d.getHours(): d.getHours() ) + ':' + ( (d.getMinutes() < 10) ? '0' + d.getMinutes(): d.getMinutes() ) + ':' + ( (d.getSeconds() < 10) ? '0' + d.getSeconds(): d.getSeconds() );

    return   fecha + '  ' + hora;
};

var WorkFlowManager = function(options){
    this.propiedades = options;

    this.factoria  = undefined;
    this.dossierDS = undefined;

    this.idDossier = undefined;
    this.dossier = undefined;

    this.tabs = undefined;

    return this;
};

WorkFlowManager.prototype.create = function(){
    var that = this,
        contenedor = "body";

    if(this.propiedades && this.propiedades.contenedor)
        contenedor = this.propiedades.contenedor;

    this.html = $(contenedor).load('../js/componentes/html/workflowManager.html', function(){
        that.inicializarComponentes();
        that.inicializarUI();
        that.inicializarEventos();
    });


};
WorkFlowManager.prototype.inicializarComponentes = function(){
    var that = this;
    this.factoria = new IpkRemoteFactory();
    this.factoria.onGetRemoteDataSource = function(eventArgs){
        that.dossierDS = eventArgs.control;
        that.dossierDS.onBuscar = function(respuesta){
            that.dossier = respuesta.datos[0];

            that.cargarWorkflow();
            that.cargarFechaUltimoLanzamiento();
        };

        if(that.idDossier)
            that.cargarDossier(that.idDossier);
    };
    this.factoria.getRemoteDataSource('Dossier', 'dossierDS');
};
WorkFlowManager.prototype.inicializarUI = function(){
    this.dialogo = $('#dialogWorkflow').dialog(
        {
            title       : 'Estado del workflow del dossier',
            autoOpen    : false,
            modal       : true,
            width       : 'auto',
            height      : 'auto'
        }
    );

    if(app.seguridad.grupoActual != 'cotiz_comercial')
    {
        $('#btnLanzarWorkflow').hide();
    }
};
WorkFlowManager.prototype.inicializarEventos = function(){
    var that = this;

    $(document).delegate('.inlineButton .icon-ok','click', function(){

        var infoElementoPulsado = that.infoElementoPulsado(this);
        var parametros = {
            InfoElemento : {
                IdDossier   : that.dossier.IdDossier,
                Seccion     : infoElementoPulsado.seccion
            }
        };

        app.modelos.especiales.MarcarSeccionCompletada(JSON.stringify(parametros)).done(
            function(res){
                if(app.ajax.procesarRespuesta([res]).datos.EsValido)
                    that.dossierDS.Buscar({'IdDossier': that.dossier.IdDossier}, true, true);
                else
                    alert('No se puede marcar como "Completada" la sección porque faltan datos por completar');
            }
        );
    });
    $(document).delegate('.inlineButton .icon-remove.btnNoCompletada', 'click', function () {
        var infoElementoPulsado = that.infoElementoPulsado(this);
        var parametros = {
            InfoElemento : {
                IdDossier   : that.dossier.IdDossier,
                Seccion     : infoElementoPulsado.seccion
            }
        };

        app.modelos.especiales.MarcarSeccionPendiente(JSON.stringify(parametros)).done(
            function(res){
                that.dossierDS.Buscar({'IdDossier': that.dossier.IdDossier}, true, true);
            }
        );
    });
    $(document).delegate('.inlineButton .icon-envelope', 'click', function () {

        var infoElementoPulsado = that.infoElementoPulsado(this);
        var parametros = {
            InfoElemento : {
                IdDossier   : that.dossier.IdDossier,
                Seccion     : infoElementoPulsado.seccion
            }
        };

        app.modelos.especiales.EnviarAvisoSeccion(JSON.stringify(parametros)).done(
            function(res){
                alert( app.ajax.procesarRespuesta([res]).mensaje );
            }
        );
    });
    $(document).delegate('.inlineButton .icon-share-alt', 'click', function () {

        var infoElementoPulsado = that.infoElementoPulsado(this);
        var parametros = {
            InfoElemento : {
                IdDossier   : that.dossier.IdDossier,
                Seccion     : infoElementoPulsado.seccion
            }
        };

        app.modelos.especiales.EnviarAvisoSeccionSiguiente(JSON.stringify(parametros)).done(
            function(res){
                alert( app.ajax.procesarRespuesta([res]).mensaje );
            }
        );
    });

    $('#btnLanzarWorkflow').on('click', function(){
        var parametros = {
            InfoElemento : {
                IdDossier   : that.dossier.IdDossier
            }
        };

        app.modelos.especiales.EnviarAvisoSeccionSiguiente(JSON.stringify(parametros)).done(
            function(res){
                alert( app.ajax.procesarRespuesta([res]).mensaje );
                that.dossier.UltimoLanzamientoWorkflow = new Date().TimeStamp();
                that.cargarFechaUltimoLanzamiento();
            }
        );
    });

    $(this.propiedades.trigger).on('click', function(){
        that.abrir();
    });


};

WorkFlowManager.prototype.infoElementoPulsado = function(Boton){
    var columna = $(Boton).closest('td');
    var numColumn = columna.parent().children().index(columna);
    var cabecera  = columna.parent().parent().parent().find('thead tr th').eq(numColumn).text();
    var nombreGrupo = cabecera.toLowerCase()[0].toUpperCase() +  cabecera.toLowerCase().substr(1);
    var idDossier = $(Boton).closest('tr').attr('id');

    return {
        'seccion'    : nombreGrupo,
        'idDossier'  : idDossier
    };
};

WorkFlowManager.prototype.cargarDossier = function(IdDossier){
    this.idDossier = IdDossier;
    if(this.dossierDS)
        this.dossierDS.Buscar({'IdDossier': IdDossier}, true, true);
};
WorkFlowManager.prototype.cargarWorkflow = function(){

    if(this.dossier.WorkflowEstados)
    {
        if(this.dossier.WorkflowEstados.length > 0)
        {
            var workflow_estados = [],
                estado = {};

            estado.IdDossier            = this.dossier.IdDossier;
            estado.Produccion           = this.estadoSeccion( this.dossier, "Produccion");
            estado.FechaProduccion      = this.dossier.WorkflowEstados[0]["FechaProduccion"];
            estado.Moldes               = this.estadoSeccion( this.dossier, "Moldes");
            estado.FechaMoldes          = this.dossier.WorkflowEstados[0]["FechaMoldes"];
            estado.Dnp                  = this.estadoSeccion( this.dossier, "Dnp");
            estado.FechaDnp             = this.dossier.WorkflowEstados[0]["FechaDnp"];
            estado.Programacion         = this.estadoSeccion( this.dossier, "Programacion");
            estado.FechaProgramacion    = this.dossier.WorkflowEstados[0]["FechaProgramacion"];
            estado.Analitica            = this.estadoSeccion( this.dossier, "Analitica");
            estado.FechaAnalitica       = this.dossier.WorkflowEstados[0]["FechaAnalitica"];
            estado.Comercial            = this.estadoSeccion( this.dossier, "Comercial");
            estado.FechaComercial       = this.dossier.WorkflowEstados[0]["FechaComercial"];

            workflow_estados.push(estado);

            $('#tabSoluciones').find('table tbody tr').remove();
            $('#filaTemplate').tmpl(workflow_estados).appendTo('#tabSoluciones table tbody');
        }
    }
};
WorkFlowManager.prototype.estadoSeccion = function(dossier, seccion){
    var resultado = "Pendiente";
    var arrResultado = _.uniq( _.pluck( dossier.WorkflowEstados, seccion ) );
    if(arrResultado.length == 1)
        resultado = arrResultado[0];

    return resultado;
};
WorkFlowManager.prototype.cargarFechaUltimoLanzamiento = function(){
    $('.marcaTiempoLanzamiento span').eq(0).text(this.dossier.UltimoLanzamientoWorkflow);
};

WorkFlowManager.prototype.abrir = function(){
    this.dialogo.dialog('open');
    $(window).height()
};
WorkFlowManager.prototype.cerrar = function(){
    this.dialogo.dialog('close');
};

