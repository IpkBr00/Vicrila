var DossieresPage = function(){
    this.navegacion = {};
    this.accionesTabla = {};
    this.tabla = {};
    this.accionesFiltro = {};
    this.ficha = {};

    this.dossieresDS = {};

    this.crearDataSources();

    this.inicializarLayout();

    this.crearTabla();
    this.crearToolbarTabla();
    this.crearToolbarFiltro();
    this.crearToolbarMenu();

    this.crearFicha();

    this.inicializarEventos();
};

DossieresPage.prototype.inicializarLayout = function(){
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
DossieresPage.prototype.eventos = function(){
    var self = this;
};

DossieresPage.prototype.crearDataSources = function(){
    this.crearDossieresDS();
};
DossieresPage.prototype.crearDossieresDS = function(){
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
                app.log.debug('Listado de dossieres', respuesta.datos);
                self.tabla.setDatos(respuesta.datos);
            }

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
                self.tabla.setDatos(respuesta.datos);
            }

        }
        else
            alert(respuesta.mensaje);
    };
};

DossieresPage.prototype.crearTabla = function(){
    var configuracion = {
        contenedor : "tablaPlaceholder",
        Nombre     : "Dossieres",
        Listado    : "Dossier"
    };

    this.tabla = new IpkRemoteTabla(configuracion, []);
};
DossieresPage.prototype.crearToolbarTabla = function(){
    var configuracion = {
        contenedor : "accionesTabla",
        id         : "accionesTabla"
    };

    this.accionesTabla = new IpkToolbar(configuracion);

    this.accionesTabla.agregarBoton({
        nombre : "Crear",
        descripcion : "Abre el formulario de creación de Dossier (ALT + C)",
        clases : "",
        icono : "icon-plus",
        accessKey : "c",
        texto : "Crear Dossier",
        permisos : ['cotiz_comercial']
    });
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
        nombre : "Borrar",
        descripcion : "Borrar el dossier seleccionado (ALT + B)",
        clases : "",
        icono : "icon-trash",
        accessKey : "d",
        texto : "Eliminar",
        permisos : ['COMERIAL']
    });
    this.accionesTabla.agregarBoton({
        nombre : "Copiar",
        descripcion : "Copia el dossier seleccionado (ALT + Y)",
        clases : "",
        icono : "icon-repeat",
        accessKey : "y",
        texto : "Copiar",
        permisos : ['cotiz_comercial']
    });

    var self = this;
    this.accionesTabla.onCrear = function(){

        self.ficha.ficha.setModo(IpkFicha.Modos.Alta);
        self.ficha.ficha.limpiar();
        self.dialogoFicha.dialog('open');
    };
    this.accionesTabla.onEstructura = function(){
        var idRegistro = self.tabla.tabla.getIdRegistroSeleccionada();

        if(idRegistro)
            window.location = "Estructura.aspx?Id=" + idRegistro;
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
    this.accionesTabla.onBorrar = function(){
        var idRegistro = self.tabla.tabla.getIdRegistroSeleccionada();

        if(idRegistro){
            var resultado = confirm('¿Está segura de que desea borrar el registro ?');
            if(resultado )
            {
                self.dossieresDS.Delete(idRegistro);
                self.tabla.tabla.borrarFilaSeleccionada();
            }
        }
    };
    this.accionesTabla.onCopiar = function(){
        var idRegistro = self.tabla.tabla.getIdRegistroSeleccionada();

        self.ficha.ficha.limpiar();
        self.ficha.ficha.setModo(IpkFicha.Modos.Consulta);
        self.ficha.cargarRegistro(idRegistro);
        self.dialogoFicha.dialog('open');
    };

};
DossieresPage.prototype.crearToolbarFiltro = function(){
    var configuracion = {
        contenedor : "accionesFiltro",
        id         : "accionesFiltro"
    };

    this.accionesFiltro = new IpkToolbar(configuracion);

    this.accionesFiltro.agregarBoton({
        nombre : "AplicarFiltro",
        descripcion : "Filtra el listado de los dossieres (ALT + B)",
        clases : "",
        icono : "icon-search",
        accessKey : "b",
        texto : "Filtrar"
    });
    this.accionesFiltro.agregarBoton({
        nombre : "LimpiarFiltro",
        descripcion : "Limpia los resultado del listado (ALT + L)",
        clases : "",
        icono : "icon-remove-circle",
        accessKey : "l",
        texto : "Limpiar"
    });

    this.accionesFiltro.onAplicarFiltro = $.proxy(this.aplicarFiltro, this);
    this.accionesFiltro.onLimpiarFiltro = $.proxy(this.limpiarFiltro ,this);
};

DossieresPage.prototype.crearToolbarMenu = function(){
    app.configuracion.navegacion();
};

DossieresPage.prototype.crearFicha = function(){
    var configuracion = {
        contenedor : "fichaPlaceholder",
        nombre     : "Dossier",
        ficha      : 'Ficha' ,
        modo       : IpkFicha.Modos.Consulta
    };

    var self = this;
    this.ficha = new IpkRemoteFicha(configuracion, []);
    this.ficha.onGuardarClick = function(){
        setTimeout( function(){self.aplicarFiltro()}, 3000 );
    };
    this.dialogoFicha = $('#' + configuracion.contenedor).dialog({
        width     : '1200',
        height    : '900',
        autoOpen  : false,
        modal     : true,
        title     : 'Ficha de dossier'
    });
    setTimeout(function(){
        $('#Marca').attr('disabled', false);
        $('#Marca').attr('readonly', false);
        $('#Cliente').attr('disabled', false);
        $('#Cliente').attr('readonly', false);
        $('#NumDossier').attr('disabled', false);
        $('#NumDossier').attr('readonly', false);
        $('#TipoDossier').attr('disabled', false);
        $('#TipoDossier').attr('readonly', false);
    }, 2000);
};

DossieresPage.prototype.inicializarEventos = function(){
    $('#todas').on('click' ,  $.proxy(this.obtenerDossieres, this) );
    $('#aceptadas').on('click' ,  $.proxy(this.aplicarFiltroAceptadas, this) );
    $('#concluidas').on('click' ,  $.proxy(this.aplicarFiltroCanceladas, this) );
};
DossieresPage.prototype.aplicarFiltroAceptadas = function(){
    this.filtroActivo = 'aceptadas';
    this.aplicarFiltro();
};
DossieresPage.prototype.aplicarFiltroCanceladas = function(){
    this.filtroActivo = 'concluidas';
    this.aplicarFiltro();
};
DossieresPage.prototype.cambiarSeleccionFiltro = function(){
    var panelFiltro =  $('#panelFiltros');
    var seleccion = this.filtroActivo;
    if(!seleccion || seleccion == '')
        seleccion = 'todas';

    panelFiltro.find('a').removeClass('activo');
    panelFiltro.find('a#'+ seleccion).addClass('activo');
};

// **** FUNCIONES DATOS *****
DossieresPage.prototype.obtenerDossieres = function(){
    this.filtroActivo = '';
    //this.dossieresDS.Listado();
    this.aplicarFiltro();
    this.cambiarSeleccionFiltro();
};

DossieresPage.prototype.aplicarFiltro = function(){
    var cadena = '';
    var marca = $('#Marca');
    var cliente = $('#Cliente');
    var numDossier = $('#NumDossier');
    var tipoDossier = $('#TipoDossier');

    if(marca.val() !== "")
        cadena += " it.Marca Like '%" + marca.val() + "%'";

    if(cliente.val() !== "")
    {
        if(cadena !== "") cadena += " OR ";
        cadena += " it.NombreClteSolicitante Like '%" + cliente.val() + "%'";
    }

    if(numDossier.val() !== "")
    {
        if(cadena !== "") cadena += " OR ";
        cadena += " it.NumDossier Like '%" + numDossier.val() + "%'";
    }

    if(tipoDossier.val() !== "")
    {
        if(cadena !== "") cadena += " OR ";
        cadena += " it.TipoDossier Like '%" + tipoDossier.val() + "%'";
    }

    var prefijo = "";
    if(cadena !== "")
    {
        prefijo = "AND";
    }
   
    switch (this.filtroActivo)
    {
        case 'aceptadas':
            cadena +=  prefijo + " (it.Estado = 'Aceptado')";
            break;
        case 'concluidas':
            cadena += prefijo + " (it.Estado = 'Concluido')";
            break;
        default :
            cadena += prefijo + " (it.Estado = 'Aceptado' OR it.Estado = 'Concluido')";
            break;
    }

    this.dossieresDS.Filtrar(cadena);
    this.cambiarSeleccionFiltro();
};
DossieresPage.prototype.limpiarFiltro = function(){
    this.tabla.setDatos([]);
};


var IpkFactory = function(){
    this.datasources = [];
    this.listados = [];
    this.fichas = [];
    this.ipkConfiguracion = new IpkInfraestructura();

    return this;
};
IpkFactory.prototype.getDataSource = function(nombreModelo , DS){
    var self = this;

    this.datasources[nombreModelo] = DS;
    this.ipkConfiguracion.getModeloByName(nombreModelo);

    this.ipkConfiguracion.onGetModelo = function(modelo){
        var clave = _.find(modelo.zz_CamposModelos, function(elemento){return elemento.EsClave == true}).Nombre;

        app.log.debug('ACCESOS --- MODELO ' + modelo.Nombre , modelo.zz_Accesos );
        self.datasources[modelo.Nombre].CambiarEntidad(modelo.Nombre, clave);

    };
};