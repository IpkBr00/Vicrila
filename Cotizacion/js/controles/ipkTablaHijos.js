var IpkTablaHijos = function(ficha , configuracion ,datos){
    this.referencia = Date.now();
    this.defaults = {};
    this.propiedades = $.extend(this.defaults , configuracion);

    this.modelo = {};

    this.ficha = ficha;
    this.tabla = {};
    this.toolbar = {};
    this.tipo = "IpkTablaHijos";

    if(datos)
        this.datos = datos;

    this.crearTab();
    this.crearTabla();
};

IpkTablaHijos.prototype.crearTabla = function(){
    var contenedorTabla = this.propiedades.Nombre  + "_Tabla" + this.referencia;
    var toolbarContainer = $('<div id="' + contenedorTabla + '"></div>');
    this.placeholder.append(toolbarContainer);

    this.propiedades.contenedor = contenedorTabla;
    this.propiedades.contenedor = this.propiedades.Nombre + "_Tabla" + this.referencia;
    this.propiedades.Listado = this.propiedades.Nombre;
    this.propiedades.Ficha = this.propiedades.Nombre;

    //this.tabla = new IpkRemoteTabla(this.propiedades ,this.datos);
    this.tabla = new IpkTablaEditable(this.propiedades ,this.datos);

    var padre = {
        Entidad : this.ficha.propiedades.nombre,
        Clave   : this.ficha.campoClave(),
        Valor   : this.ficha.valorClave()
    };

    this.tabla.setPadre(padre);
};

IpkTablaHijos.prototype.crearTab = function(){
    this.crearNavegacionTab();
    this.crearContenedorTab();
    //this.crearToolbar();
};
IpkTablaHijos.prototype.crearNavegacionTab = function(){
    this.navegacion = $("<li><a href='#" + this.propiedades.Nombre  + this.referencia + "' >" + this.propiedades.Titulo + "</a></li>");
    this.ficha.areaColecciones.find('ul').eq(0).append(this.navegacion);
    //$('ul', this.ficha.areaColecciones).append(this.navegacion);
};
IpkTablaHijos.prototype.crearContenedorTab = function(){
    if($('#' + this.nombre + this.referencia).length > 0)
        this.placeholder = $('#' + this.propiedades.Nombre + this.referencia);
    else
        this.placeholder = $("<div id='" +  this.propiedades.Nombre + this.referencia  + "' class='coleccion listado'></div>");

    $(this.ficha.areaColecciones).append(this.placeholder);
};

IpkTablaHijos.prototype.crearToolbar = function(){
    var idToolbar = 'toolbar' + this.propiedades.Nombre  + 'Hijos' + this.referencia;
    var toolbarContainer = $('<div id="' + idToolbar  + '"></div>');
    this.placeholder.append(toolbarContainer);

    this.toolbar = new IpkToolbar({
        contenedor : idToolbar ,
        id         : idToolbar
    });

    this.toolbar.agregarBoton({
        nombre : "CrearNuevo",
        descripcion : "Añade un nuevo registro",
        clases : "",
        icono : "icon-ok",
        texto : "Crear Nuevo"
    });
    this.toolbar.agregarBoton({
        nombre : "IrAFicha",
        descripcion : "Ir a la ficha del registro seleccionado",
        clases : "",
        icono : "icon-list-alt",
        texto : "Ir a ficha"
    });
    this.toolbar.agregarBoton({
        nombre : "Borrar",
        descripcion : "Borrar el registro seleccionado",
        clases : "",
        icono : "icon-trash",
        texto : "Borrar"
    });
    this.toolbar.agregarBoton({
        nombre : "Copiar",
        descripcion : "Copia el registro seleccionado",
        clases : "",
        icono : "icon-repeat",
        texto : "Copiar"
    });

    var self = this;
    this.toolbar.onCrearNuevo = function(){
        alert('Nuevo hijos');
    };
    this.toolbar.onIrAFicha = function(){
        alert('Ir a ficha');
    };
    this.toolbar.onBorrar = function(){
        alert('Borrar');
    };
    this.toolbar.onCopiar = function(){
        alert('Copiar');
    };

    if(this.toolbarHabilitada)
        this.tabla.toolbar.habilitada(false);
};


// **** FUNCIONES DATOS *****
IpkTablaHijos.prototype.setDatos = function(datos){
    this.tabla.setDatos(datos);
};

IpkTablaHijos.prototype.habilitarToolbar = function(habilitar){
    this.toolbarHabilitada = habilitar;
    var self = this;

    if(!this.repeticion)
        this.repeticion = setInterval( function() {
            self.habilitarToolbar(self.toolbarHabilitada);
        }, 500);
    try
    {
        this.tabla.toolbar.habilitada(habilitar);
        clearInterval(this.repeticion)
    }
    catch (e)
    {
    }
};
