var DossieresEnCursoPage = function(){
    var self = this;

    this.navegacion = {};
    this.accionesTabla = {};
    this.tabla = {};
    this.accionesFiltro = {};
    this.ficha = {};

    this.paginador = new ipkPaginador();
    this.paginador.configurar({
        control : $('#paginador')
    });
    this.paginador.onBtnAtrasClick = function(eventArgs){
        var datos  = (self.datosMostrados) ? self.datosMostrados : self.datosCache;
        var datosPaginados = datos.slice((eventArgs.irAPaginaNumero - 1) * eventArgs.tamanyoPagina, eventArgs.irAPaginaNumero * eventArgs.tamanyoPagina);

        self.tabla.setDatos(datosPaginados);
    };
    this.paginador.onBtnAdelanteClick = function(eventArgs){
        var datos  = (self.datosMostrados) ? self.datosMostrados : self.datosCache;
        var datosPaginados = datos.slice((eventArgs.irAPaginaNumero - 1) * eventArgs.tamanyoPagina, eventArgs.irAPaginaNumero * eventArgs.tamanyoPagina);

        self.tabla.setDatos(datosPaginados);
    };
    this.paginador.onResetear = function(eventArgs){
        var datos  = (self.datosMostrados) ? self.datosMostrados : self.datosCache;
        var datosPaginados = datos.slice((eventArgs.paginaActual - 1) * eventArgs.tamanyoPagina, eventArgs.paginaActual * eventArgs.tamanyoPagina);

        self.tabla.setDatos(datosPaginados);
    };

    this.dossieresDS = {};
    /*
    this.queryBuilder = new QueryBuilder({contenedor: 'queryBuilder'});
    this.queryBuilder.create();
    */

    this.crearDataSources();

    this.inicializarLayout();

    this.crearTabla();
    this.crearToolbarTabla();
    this.crearToolbarMenu();

    this.crearFicha();

    this.inicializarEventos();
};

DossieresEnCursoPage.prototype.inicializarLayout = function(){
    $('body').layout({
        north: {
            resizable  : false,
            closable : false,
            size: '30'
        }
    });
};

DossieresEnCursoPage.prototype.crearDataSources = function(){
    this.crearDossieresDS();
};
DossieresEnCursoPage.prototype.crearDossieresDS = function(){
    var self = this;

    this.dossieresDS= new IpkRemoteDataSource({
        entidad : "Dossier",
        clave   : "IdDossier"
    });
    this.dossieresDS.onListado = function(respuesta){
        if(respuesta.estado = 'OK')
        {
            if(respuesta.datos.length == 0)
                alert("No hay resultados para la consulta");
            else
            {
               self.tabla.setDatos(respuesta.datos);
            }
        }
        else
            alert(respuesta.mensaje);
    };
    this.dossieresDS.onDelete = function(respuesta){
        if(respuesta.estado = 'OK')
        {
            alert(respuesta.mensaje);
        }
        else
            alert(respuesta.mensaje);
    };
    this.dossieresDS.onFiltrar = function(respuesta){
        if(respuesta.estado = 'OK')
        {
            if(respuesta.datos.length == 0)
                alert("No hay resultados para la consulta");
            else
            {
                app.log.debug('Filtrado de dossieres', respuesta.datos);

                var ordenado = _.sortBy(respuesta.datos , function(dosier){
                    var fecha = dosier["FechaLimiteRespuesta"].substring(3,5) + '/' + dosier["FechaLimiteRespuesta"].substring(0,2) + '/' + dosier["FechaLimiteRespuesta"].substring(6,10);
                    return new Date(fecha);
                });

                if(self.filtroActivo == 'proximasExpirar')
                    ordenado = _.initial(ordenado, (ordenado.length >= 10)? ordenado.length - 10 : 0);

                if(self.filtroActivo == 'ultimasCreadas')
                {
                    ordenado = _.sortBy(respuesta.datos , function(dosier){
                        var fecha = dosier["FechaCreacion"].substring(3,5) + '/' + dosier["FechaCreacion"].substring(0,2) + '/' + dosier["FechaCreacion"].substring(6,10);
                        return new Date(fecha);
                    });
                    ordenado = _.rest(ordenado, (ordenado.length >= 10)? ordenado.length - 10 : 0);
                }

                self.datosMostrados = ordenado;

                if(!self.filtroActivo || self.filtroActivo == '')
                {
                    self.paginador.resetear({
                        paginaTotal : (self.datosMostrados.length > 0) ? Math.round(self.datosMostrados.length/ 15): 0,
                        tamanyoPagina : 15
                    });
                    var datos  = (self.datosMostrados) ? self.datosMostrados : self.datosCache;
                    var datosPaginados = datos.slice(0,15);

                    self.tabla.setDatos(datosPaginados);

                    $('#paginador').show();
                }
                else
                {
                    $('#paginador').hide();
                    self.tabla.setDatos(self.datosMostrados);
                }



            }
        }
        else
            alert(respuesta.mensaje);
    };
};
DossieresEnCursoPage.prototype.crearTabla = function(){
    var configuracion = {
        contenedor : "tablaPlaceholder",
        Nombre     : "Dossieres",
        Listado    : "Dossier"
    };

    this.tabla = new IpkRemoteTabla(configuracion, []);
    var self = this;
    setTimeout(function(){ self.aplicarFiltro();}, 3000);

};
DossieresEnCursoPage.prototype.crearToolbarTabla = function(){
    var configuracion = {
        contenedor : "accionesTabla",
        id         : "accionesTabla"
    };

    this.accionesTabla = new IpkToolbar(configuracion);
    this.accionesTabla.agregarBoton({
        nombre : "Detalle",
        descripcion : "Ver el detalle del dossier (ALT + V)",
        clases : "",
        icono : "icon-list-alt",
        accessKey : "v",
        texto : "Ver detalle"
    });
    this.accionesTabla.agregarBoton({
        nombre : "Estructura",
        descripcion : "Ver la estructura del dossier (ALT + S)",
        clases : "",
        icono : "icon-list-alt",
        accessKey : "s",
        texto : "Estructura"
    });

    this.accionesTabla.agregarBoton({
        nombre : "BtnBorrar",
        descripcion : "Borrar el registro seleccionado",
        clases : "",
        icono : "icon-trash",
        accessKey : "d",
        texto : "Borrar",
        permisos : ["cotiz_comercial"]
    });


    var self = this;

    this.accionesTabla.onEstructura = function(){
        var idRegistro = self.tabla.tabla.getIdRegistroSeleccionada();

        if(idRegistro)
            window.location = "Estructura.aspx?Id=" + idRegistro;

        //window.location = "../../ipkWeb/site/Cotizacion/Ficha/Estructura.html?Ficha=Dossier&Id=" + idRegistro;
    };
    this.accionesTabla.onDetalle = function(){
        var idRegistro = self.tabla.tabla.getIdRegistroSeleccionada();

        if(idRegistro){
            self.ficha.ficha.limpiar();
            self.ficha.ficha.setModo(IpkFicha.Modos.Consulta);
            self.ficha.cargarRegistro(idRegistro);
            self.dialogoFicha.dialog('open');
        }
    };
    this.accionesTabla.onBtnBorrar  = function(){
        var idRegistro = self.tabla.tabla.getIdRegistroSeleccionada();

        if(idRegistro){
            var confirmacion = confirm('Si borra el registro se eliminará y no podrá ser recuperado.\n¿Está seguro que desea borrar el registro?');
            if(confirmacion)
            {
                self.dossieresDS.Delete(idRegistro);
                self.tabla.tabla.borrarFilaSeleccionada();
            }
        }
    };


};
DossieresEnCursoPage.prototype.crearToolbarMenu = function(){
    app.configuracion.navegacion();
};
DossieresEnCursoPage.prototype.crearFicha = function(){
    var configuracion = {
        contenedor : "fichaPlaceholder",
        nombre     : "Dossier",
        ficha      : 'Ficha' ,
        modo       : IpkFicha.Modos.Consulta
    };

    var self = this;
    this.ficha = new IpkRemoteFicha(configuracion, []);
    this.ficha.onGuardarClick = function(){
        //setTimeout( function(){self.aplicarFiltro()}, 3000 );
    };
    this.ficha.onRecordUpdated = function(e){
        self.aplicarFiltro();
    };
    this.ficha.onRecordDeleted = function(e){
        self.ficha.ficha.limpiar();
        self.dialogoFicha.dialog('close');
        self.aplicarFiltro();
    };
    this.dialogoFicha = $('#' + configuracion.contenedor).dialog({
        width     : '1120',
        height    : '650',
        autoOpen  : false,
        modal     : true,
        title     : 'Ficha de dossier'
    });

};

DossieresEnCursoPage.prototype.inicializarEventos = function(){
    $('#todas').on('click' ,  $.proxy(this.obtenerDossieres, this) );
    $('#proximasExpirar').on('click' ,  $.proxy(this.aplicarFiltroProximasExpirar, this) );
    $('#ultimasCreadas').on('click' ,  $.proxy(this.aplicarFiltroUltimasCreadas, this) );
};
DossieresEnCursoPage.prototype.aplicarFiltroProximasExpirar = function(){
    this.filtroActivo = 'proximasExpirar';
    this.aplicarFiltro();
};
DossieresEnCursoPage.prototype.aplicarFiltroUltimasCreadas = function(){
    this.filtroActivo = 'ultimasCreadas';
    this.aplicarFiltro();
};
DossieresEnCursoPage.prototype.cambiarSeleccionFiltro = function(){
    var panelFiltro =  $('#panelFiltros');
    var seleccion = this.filtroActivo;
    if(!seleccion || seleccion == '')
        seleccion = 'todas';

    panelFiltro.find('a').removeClass('activo');
    panelFiltro.find('a#'+ seleccion).addClass('activo');
};

// **** FUNCIONES DATOS *****
DossieresEnCursoPage.prototype.obtenerDossieres = function(){
    this.filtroActivo = '';
    this.aplicarFiltro();
};
DossieresEnCursoPage.prototype.aplicarFiltro = function(){
    var cadena = '';
    //cadena += " it.Estado <> 'Aceptado' AND it.Estado <> 'Concluido'";
    cadena += " it.Estado = 'EnEstudio'";
    this.dossieresDS.Filtrar(cadena);
    this.cambiarSeleccionFiltro();
};
DossieresEnCursoPage.prototype.limpiarFiltro = function(){
    //this.tabla.setDatos([]);
};




var IpkFactory = function(){
    this.datasources = [];
    this.listados = [];
    this.fichas = [];
    this.ipkConfiguracion = new IpkInfraestructura();

    return this;
};
IpkFactory.prototype.getDataSource = function(nombreModelo , DS){
    this.datasources[nombreModelo] = DS;

    var self = this;
    this.ipkConfiguracion.getModeloByName(nombreModelo);
    this.ipkConfiguracion.onGetModelo = function(modelo){
        var clave = _.find(modelo.zz_CamposModelos, function(elemento){return elemento.EsClave == true}).Nombre;
        self.datasources[modelo.Nombre].CambiarEntidad(modelo.Nombre, clave);

    };
};