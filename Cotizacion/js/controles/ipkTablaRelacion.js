var IpkTablaRelacion = function(ficha , configuracion ,datos){
    this.defaults = {};
    this.propiedades = $.extend(this.defaults , configuracion);

    this.ficha = ficha;

    this.toolbar = {};
    this.tabla = {};
    this.mostrarElegir = {};

    if(datos)
    {
        this.datos = datos;
        this.datosPasados = datos;
    }

    this.crearTab();
    this.crearTabla();
};

IpkTablaRelacion.prototype.crearTabla = function(){
    var contenedorTabla = this.propiedades.Nombre  + "_Tabla";
    var toolbarContainer = $('<div id="' + contenedorTabla + '"></div>');
    this.placeholder.append(toolbarContainer);

    this.propiedades.contenedor = contenedorTabla;
    this.propiedades.Listado = this.propiedades.Nombre;

    this.tabla = new IpkRemoteTabla(this.propiedades ,this.datosPasados );
};

IpkTablaRelacion.prototype.crearTab = function(){
    this.crearNavegacionTab();
    this.crearContenedorTab();
    this.crearToolbar();
    this.crearMostrarElegir();

};
IpkTablaRelacion.prototype.crearNavegacionTab = function(){
    this.navegacion = $("<li><a href='#" + this.propiedades.Nombre  + "' >" + this.propiedades.Titulo + "</a></li>");
    this.ficha.areaColecciones.find('ul').eq(0).append(this.navegacion);
};
IpkTablaRelacion.prototype.crearContenedorTab = function(){
    if($('#' + this.nombre).length > 0)
        this.placeholder = $('#' + this.propiedades.Nombre);
    else
        this.placeholder = $("<div id='" +  this.propiedades.Nombre  + "' class='coleccion listado'></div>");

    $(this.ficha.areaColecciones).append(this.placeholder);
};

IpkTablaRelacion.prototype.crearToolbar = function(){
    var idToolbar = 'toolbar' + this.propiedades.Nombre ;
    var toolbarContainer = $('<div id="' + idToolbar  + '"></div>');
    this.placeholder.append(toolbarContainer);

    this.toolbar = new IpkToolbar({
        contenedor : idToolbar ,
        id         : idToolbar
    });

    this.toolbar.agregarBoton({
        nombre : "CrearRelacion",
        descripcion : "Seleccionar el registro para insertarlo",
        clases : "",
        icono : "icon-ok",
        texto : "Crear Relacion"
    });
    this.toolbar.agregarBoton({
        nombre : "EliminarRelacion",
        descripcion : "Elminar la selección de registro",
        clases : "",
        icono : "icon-remove",
        texto : "Eliminar Relacion"
    });

    var self = this;
    this.toolbar.onCrearRelacion = function(){
        self.mostrarElegir.abrir();
    };
    this.toolbar.onEliminarRelacion = function(){
        var idSeleccion = self.tabla.tabla.getIdRegistroSeleccionada();

        var Datos1 = {
            Entidad : self.ficha.configuracionFicha.zz_Modelos.Nombre,
            Clave   : self.ficha.campoClave(),
            Valor   : self.ficha.valorClave()
        };
        var Datos2 = {
            Entidad : self.tabla.modelo.Nombre,
            Clave   : self.tabla.tabla.campoClave(),
            Valor   : idSeleccion
        };

        self.tabla.genericoDS.BorrarRelacion(Datos1, Datos2);
        self.tabla.tabla.borrarFilaSeleccionada();
    };
};
IpkTablaRelacion.prototype.crearMostrarElegir = function(){

    var optionsME = {};
    optionsME = $.extend( {} , this.propiedades);
    optionsME.Listado = this.propiedades.Nombre;
    optionsME.datosPadre = this.ficha.datosPadre;
    //optionsME.datos = this.ficha.datos[this.propiedades.Nombre];

    this.mostrarElegir = new IpkMostrarElegir(optionsME);

    var self = this;

    this.mostrarElegir.onSeleccionClick = function(eventArgs){
        var Datos1 = {
            Entidad : self.ficha.configuracionFicha.zz_Modelos.Nombre,
            Clave   : self.ficha.campoClave(),
            Valor   : self.ficha.valorClave()
        };
        var Datos2 = {
            Entidad : self.tabla.modelo.Nombre,
            Clave   : self.tabla.tabla.campoClave(),
            Valor   : eventArgs.seleccion[self.tabla.tabla.campoClave()]
        };

        self.tabla.genericoDS.CrearRelacion(Datos1, Datos2);
        self.tabla.tabla.agregarRegistro(eventArgs.seleccion);
    };
};

// **** FUNCIONES DATOS *****
IpkTablaRelacion.prototype.setDatos = function(datos){
    this.tabla.setDatos(datos);
};
IpkTablaRelacion.prototype.habilitarToolbar = function(habilitar){
    this.toolbar.habilitada(habilitar);
};