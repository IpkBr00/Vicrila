var Estructura = function(){
    var self = this;
    this.cargaDossierDeferred = $.Deferred();
    this.cargaDossierPromise = this.cargaDossierDeferred.promise();
    this.cargaDossierPromise.done(
        function(){
            if(self.dossier.FormaArt)
            {
                console.log('Promesa completada');
                self.articulos.tabla.setDatos(self.dossier.FormaArt);
                self.articulosME.setDatos(self.dossier.FormaArt);
            }
        }
    );

    // DATOS
    this.dossier = {};

    // DATASOURCES
    this.ipkFactory = new IpkFactory();
    this.dossieresDS = new IpkRemoteDataSource({});
    this.solucionesDS = new IpkRemoteDataSource({});
    this.nivelDS = new IpkRemoteDataSource({});

    // CONTROLES
    this.toolbarMenu = {};
    this.fichaDossier = {};
    this.wfm = {};

    this.wfm = new WorkFlowManager({
        contenedor : '#workflowPlaceHolder',
        trigger    : '#btnAbrirWorkflow'
    });
    this.wfm.create();

    this.hojaCotizacion = new VisorHojasCotizacion({
        contenedor : '#hojaCotizacionPlaceHolder',
        trigger    : '#btnAbrirHojaCotizacion'
    });
    this.hojaCotizacion.create();

    //trigger    : '#btnAbrirListadoAdjuntos'
    this.listadoAdjuntos =  new ListadoAdjuntos({
        contenedor : '#listadoAdjuntosPlaceHolder',
        trigger    : '#verAdjuntos'
    });
    this.listadoAdjuntos.create();

    this.vistaCompleta =  new VistaDosierCompleta({
        contenedor : $('#vistaCompletaDossier'),
        trigger    : '#btnVistaCompleta'
    });
    $(document).delegate('#btnVistaCompleta', 'click', function(){
        self.vistaCompleta  = new VistaDosierCompleta({
            contenedor : $('#vistaCompletaDossier'),
            trigger    : '#btnVistaCompleta'
        });
        var arrSoluciones = [];
        $.each(self.estructura.soluciones, function(indice ,elemento){
            console.log(elemento);
            arrSoluciones.push(elemento);
        });
        self.vistaCompleta.cargar(self.dossier, arrSoluciones);
        self.vistaCompleta.abrir();
    });

    this.soluciones = {};
    this.embalajes = {};
    this.articulos = {};
    this.estructura = {};

    this.embalajesME = {};
    this.articulosME = {};


    this.intervalID = setInterval( function() { self.comprobarCargaDS(); }, 2000);

    this.crearToolbarMenu();
    this.crearTablaSoluciones();
    this.crearTablaEmbalajes();
    this.crearTablaArticulos();

    this.crearMostrarElegirEmbalajes();
    this.crearMostrarElegirArticulos();

    this.crearDialogos();
    this.crearFichaDossieres();

    this.crearFichaNivel();

    this.vincularEventos();

    this.crearDataSources();

    return this;
};

Estructura.prototype.comprobarCargaDS = function(){
    if(this.dossieresDS.propiedades.clave)
    {
        this.buscarDossier(parseInt($.QueryString["Id"]));
        clearInterval(this.intervalID);
    }
    else
        app.log.debug('CONTEXTO INTERVAL' , this.dossieresDS.propiedades);
};

Estructura.prototype.crearToolbarMenu = function(){
    app.configuracion.navegacion();
};

Estructura.prototype.crearDataSources = function(){
    this.ipkFactory.getDataSource('Dossier', this.dossieresDS);
    this.ipkFactory.getDataSource('Solucion', this.solucionesDS);
    this.ipkFactory.getDataSource('Nivel', this.nivelDS);
    this.eventosDossieresDS();
    this.eventosSolucionDS();
    this.eventosNivelDS();
};

Estructura.prototype.crearFichaDossieres = function(){
    this.crearDialogoFichaDossier();
    var configuracion = {
        contenedor : "contenedorFicha1",
        nombre     : "Dossier",
        ficha      : 'Ficha' ,
        modo       : IpkFicha.Modos.Consulta
    };

    this.fichaDossier = new IpkRemoteFicha( configuracion, [] );
    this.fichaDossier.onGuardarClick = function(){

    };

    //this.ipkFactory.getFicha('Dossier', this.fichaDossier, configuracion);
};
Estructura.prototype.crearFichaNivel = function(){
    var self = this;
    this.crearDialogoFichaNivel();
    var configuracion = {
        contenedor : "contenedorFichaNivel",
        nombre     : "Nivel",
        ficha      : 'Ficha' ,
        modo       : IpkFicha.Modos.Alta
    };

    this.fichaNivel = new IpkRemoteFicha( configuracion, [] );
    this.fichaNivel.onGuardarClick = function(){

    };
    this.fichaNivel.onRecordInserted = function(respuesta){
        if(respuesta.estado == "OK"){
            console.log('Se ha insertado un nuevo nivel en la solucion');
            console.log(respuesta.datos);
            self.estructura.agregarNivel(respuesta.datos);
        }
    };
    this.fichaNivel.onRecordUpdated = function(respuesta){
        if(respuesta.estado == "OK"){
            console.log('Se ha modificado un nivel en la solucion');
            console.log(respuesta.datos);
            self.estructura.actualizarNivel(respuesta.datos);
        }
    };
};
Estructura.prototype.eventosDossieresDS = function(){
    var self = this;

    this.dossieresDS.onBuscar = function(eventArgs){
        if(eventArgs.estado == 'OK')
        {

            self.dossier = eventArgs.datos[0];
            self.cargarDatosResumenDossier(self.dossier);
            self.fichaDossier.ficha.setDatos(self.dossier);

            var padre = {
                Entidad : self.fichaDossier.modelo.Nombre,
                Clave   : self.fichaDossier.ficha.campoClave(),
                Valor   : self.fichaDossier.ficha.valorClave()
            };

            self.soluciones.tabla.setDatos(self.dossier.Solucion);
            self.embalajes.tabla.setDatos(self.dossier.FormaEmb);
            //self.articulos.tabla.setDatos(self.dossier.FormaArt);

            self.soluciones.setPadre(padre);
            self.embalajes.setPadre(padre);
            self.articulos.setPadre(padre);

            self.embalajesME.setDatos(self.dossier.FormaEmb);
            //self.articulosME.setDatos(self.dossier.FormaArt);

            self.wfm.cargarDossier(self.dossier.IdDossier);
            self.listadoAdjuntos.cargarAdjuntos(self.dossier.NumDossier);

            self.crearEstructura();

            self.cargaDossierDeferred.resolve();
        }
    };
};
Estructura.prototype.eventosSolucionDS = function(){
    var self = this;

    this.solucionesDS.onCrearRelacion = function(eventArgs){
        if(eventArgs.estado == 'OK')
        {
            if(self.idEmbalaje){
                var embalajeSeleccionado = self.embalajesME.tabla.tabla.datos.find('idFormaEmb', self.idEmbalaje);
                //self.estructura.agregarEmbalaje(embalajeSeleccionado);
                self.idEmbalaje = undefined
            }
            else{
                var articuloSeleccionado = self.articulosME.tabla.tabla.datos.find('idFormaArt', self.idForma);
                self.estructura.agregarForma(articuloSeleccionado);
                self.idForma= undefined;
            }
            app.log.debug('CREAR RELACION LA SOLUCION', eventArgs.datos);
        }
    };
    this.solucionesDS.onBorrarRelacion = function(eventArgs){
        if(eventArgs.estado == 'OK')
        {
            if(self.idEmbalaje)
            {
                self.estructura.quitarEmbalaje(self.idEmbalaje);
                self.idEmbalaje = undefined;
            }
            else{
                self.estructura.quitarForma(self.idForma);
                self.idForma = undefined;
            }
            alert('Se ha borrado la relacion ');

            app.log.debug('BORRAR  RELACION LA SOLUCION', eventArgs.datos);
        }
    };
};
Estructura.prototype.eventosNivelDS = function(){
    var self = this;

    this.nivelDS.onDelete = function(eventArgs){
        if(eventArgs.estado == 'OK')
        {
            console.log('Se ha borrado el nivel');
            console.log(eventArgs);
            self.estructura.quitarNivel(self.idNivel);
        }
        self.idNivel = undefined;
    };
    this.nivelDS.onCrearRelacion = function(eventArgs){
        if(eventArgs.estado == 'OK')
        {
            if(self.idEmbalaje){
                var embalajeSeleccionado = self.embalajesME.tabla.tabla.datos.find('idFormaEmb', self.idEmbalaje);
                self.estructura.agregarEmbalaje(self.idNivel,embalajeSeleccionado);
                self.idEmbalaje = undefined;
                self.idNivel = undefined;
            }

            app.log.debug('CREADA LA RELACION - [NIVEL:COMPONENTE]', eventArgs.datos);
        }
    };
    this.nivelDS.onBorrarRelacion = function(eventArgs){
        if(eventArgs.estado == 'OK')
        {
            if(self.idEmbalaje)
            {
                self.estructura.quitarEmbalaje(self.idSolucion, self.idNivel, self.idEmbalaje);
                self.idSolucion = undefined;
                self.idEmbalaje = undefined;
                self.idNivel = undefined;
            }
            alert('Se ha borrado la relacion ');

            app.log.debug('BORRADA LA RELACION - [NIVEL:COMPONENTE]', eventArgs.datos);
        }
    };
};

Estructura.prototype.crearTablaSoluciones = function(){
    var optionsEmb = {
        Nombre     : "ipkSoluciones",
        Listado    : "Solucion",
        Ficha      : "Solucion",
        contenedor : 'contenedorTablaSoluciones',
        autoLoad    : false
    };

    var that = this;
    this.soluciones = new IpkTablaEditable(optionsEmb,[]);
    this.soluciones.onRecordInserted = function(respuesta){
        that.dossier.Solucion.push(respuesta.datos);
        //that.estructura.render();
        that.estructura.cargarDossier(that.dossier);
        app.log.debug('El elemento ha sido insertado en la BBDD', respuesta.datos);
    };
    this.soluciones.onDeleteClick = function(idRegistro){
        that.idRegistroBorrar = idRegistro;
    };
    this.soluciones.onRecordDeleted = function(respuesta){
        var soluciones = _.filter(that.dossier.Solucion , function(e){return e.idSolucion !=  that.idRegistroBorrar});
        that.dossier.Solucion = soluciones;

        that.estructura.cargarDossier(that.dossier);

        app.log.debug('El elemento ha sido eliminado en la BBDD', respuesta.datos);
    };
};
Estructura.prototype.crearTablaEmbalajes = function(){
    var optionsEmb = {
        Nombre      : "ipkEmbalajes",
        Listado     : "FormaEmb",
        Ficha       : "FormaEmb",
        contenedor  : 'contenedorTablaEmbalajes',
        autoLoad    : false
    };

    var that = this;
    this.embalajes = new IpkTablaEditable(optionsEmb,[]);
    this.embalajes.onRecordInserted = function(respuesta){
        that.dossier.FormaEmb.push(respuesta.datos);
        that.embalajesME.setDatos(that.dossier.FormaEmb);

        app.log.debug('El elemento ha sido insertado en la BBDD', respuesta.datos);
    };
    this.embalajes.onDeleteClick = function(idRegistro){
        that.idRegistroBorrar = idRegistro;
    };
    this.embalajes.onRecordDeleted = function(respuesta){
        var embalajes = _.filter(that.dossier.FormaEmb , function(e){return e.idFormaEmb !=  that.idRegistroBorrar});
        that.dossier.FormaEmb = embalajes;

        that.estructura.cargarDossier(that.dossier);

        app.log.debug('El elemento ha sido eliminado en la BBDD', respuesta.datos);
    };
};
Estructura.prototype.crearTablaArticulos = function(){
    var optionsArt = {
        Nombre      : "ipkArticulos",
        Listado     : "FormaArt",
        Ficha       : "FormaArt",
        contenedor  : 'contenedorTablaArticulos',
        EsME        : false,
        autoLoad    : false
    };

    var that = this;
    var datos = [];

    if(this.dossier)
        if(this.dossier.FormaArt)
            datos =  this.dossier.FormaArt;

    this.articulos = new IpkTablaEditable(optionsArt, datos);
    this.articulos.onRecordInserted = function(respuesta){
        that.dossier.FormaArt.push(respuesta.datos);
        that.articulosME.setDatos(that.dossier.FormaArt);

        app.log.debug('El elemento ha sido insertado en la BBDD', respuesta.datos);
    };
    this.articulos.onDeleteClick = function(idRegistro){
        that.idRegistroBorrar = idRegistro;
    };
    this.articulos.onRecordDeleted = function(respuesta){
        var articulos = _.filter(that.dossier.FormaArt , function(e){return e.idFormaArt !=  that.idRegistroBorrar});
        that.dossier.FormaArt = articulos;

        that.estructura.cargarDossier(that.dossier);

        app.log.debug('El elemento ha sido eliminado en la BBDD', respuesta.datos);
    };
};

Estructura.prototype.crearMostrarElegirEmbalajes = function(){
    var optionsEmb = {
        Nombre      : "EmbalajesME",
        Listado     : "EmbalajesME",
        contenedor  : 'listaEmbalajesME'
    };

    var self = this;
    this.embalajesME = new IpkMostrarElegir(optionsEmb);
    this.embalajesME.onSeleccionClick = function(eventArgs){
        var DatosSolucion = {
            Entidad : "Nivel",
            Clave   : "IdNivel",
            Valor   : self.idNivel
        };
        var DatosEmbalaje= {
            Entidad : self.embalajesME.tabla.modelo.Nombre,
            Clave   : self.embalajesME.tabla.tabla.campoClave(),
            Valor   : self.embalajesME.tabla.tabla.getIdRegistroSeleccionada()
        };

        self.idEmbalaje = self.embalajesME.tabla.tabla.getIdRegistroSeleccionada();
        self.idForma = undefined;


        console.log(DatosSolucion);
        console.log(DatosEmbalaje);
        self.nivelDS.CrearRelacion(DatosSolucion, DatosEmbalaje);
    };
};
Estructura.prototype.crearMostrarElegirArticulos = function(){
    var optionsArt = {
        Nombre      : "ArticulosME",
        Listado     : "ArticulosME",
        contenedor  : 'listaArticulosME'
    };
    var self = this;

    this.articulosME = new IpkMostrarElegir(optionsArt);
    this.articulosME.onSeleccionClick = function(eventArgs){
        var DatosSolucion = {
            Entidad : "Solucion",
            Clave   : "IdSolucion",
            Valor   : self.estructura.solucionSeleccionada.idSolucion
        };
        var DatosArticulo= {
            Entidad : self.articulosME.tabla.modelo.Nombre,
            Clave   : self.articulosME.tabla.tabla.campoClave(),
            Valor   : self.articulosME.tabla.tabla.getIdRegistroSeleccionada()
        };

        self.idForma = self.articulosME.tabla.tabla.getIdRegistroSeleccionada();
        self.idEmbalaje = undefined;

        self.solucionesDS.CrearRelacion(DatosSolucion, DatosArticulo);
    };
};

Estructura.prototype.crearDialogos = function(){
    this.crearDialogoFichaDossier ();
    this.crearDialogoSoluciones();
    this.crearDialogoEmbalajes();
    this.crearDialogoArticulos();

    this.crearDialogoEmbalajesMe();
    this.crearDialogoArticulosMe();
};
Estructura.prototype.crearDialogoFichaDossier = function(){

    $('#contenedorFicha1').dialog({
        title : 'Ficha del dossier ',
        autoOpen : false,
        modal : true,
        width : '1100',
        height: 'auto',
        maxHeight: '800'
    })
};
Estructura.prototype.crearDialogoFichaNivel = function(){

    $('#contenedorFichaNivel').dialog({
        title : 'Ficha del nivel ',
        autoOpen : false,
        modal : true,
        width : '1100',
        height: 'auto',
        maxHeight: '800'
    })
};
Estructura.prototype.crearDialogoSoluciones = function(){

    $('#contenedorTablaSoluciones').dialog({
        title : 'Soluciones del dossier ',
        autoOpen : false,
        width : '800px'
    });
};
Estructura.prototype.crearDialogoEmbalajes = function(){
    $('#contenedorTablaEmbalajes').dialog({
        title : 'Embalajes del dossier ',
        autoOpen : false,
        width : '800'
    });
};
Estructura.prototype.crearDialogoEmbalajesMe = function(){
    $('#listaEmbalajesME').dialog({
        title : 'Seleccion de embalajes de la solucion',
        autoOpen : false,
        modal : true,
        width : '800'
    });
};
Estructura.prototype.crearDialogoArticulosMe = function(){
    $('#listaArticulosME').dialog({
        title : 'Seleccion de articulos de la solucion',
        autoOpen : false,
        modal : true,
        width : '800'
    });
};
Estructura.prototype.crearDialogoArticulos = function(){
    $('#contenedorTablaArticulos').dialog({
        title : 'Articulos del dossier ',
        autoOpen : false,
        width : '800px'
    }).height("auto");
};

Estructura.prototype.buscarDossier = function(id){
    var where = {
        'IdDossier' : id
    };
    this.dossieresDS.Buscar(where, true, true);
};

Estructura.prototype.subscripciones = function(){
    var self = this;

    //TODO: Pasar a nuestro nuevo sistema de eventos
    app.eventos.escuchar('OnRecordUpdated', 'contenedorFicha1', function(e, r){
        app.log.debug('Registro actualizado ', r);

        self.cargarDatosResumenDossier( r.datos );
        $('#contenedorFicha1 .areaColecciones').hide();
        $('#contenedorFicha1').dialog('close');
    });

};
Estructura.prototype.vincularEventos = function(){
    var self = this;

    $('#editarDossier').on('click', function(){
        $('#contenedorFicha1 .areaColecciones').hide();
        $('#contenedorFicha1').dialog('open');
    });

    $('#verSoluciones').on('click', function(){
        $('#contenedorTablaSoluciones').dialog('open');
    });
    $('#verEmbalajes').on('click', function(){
        $('#contenedorTablaEmbalajes').dialog('open');
    });
    $('#verArticulos').on('click', function(){
        $('#contenedorTablaArticulos').dialog('open');
    });

    $('#btnSubirDocumento').on('click', function(){
        var NumDossier = self.dossier.NumDossier;
        SP.UI.ModalDialog.showModalDialog({

            url: "http://sharepoint/Articulos/Cotizaciones/_layouts/Upload.aspx?List=%7B87AC15BD%2DDA2D%2D4FF6%2D9748%2D782EA902470D%7D&RootFolder=%2FArticulos%2FCotizaciones%2FDocumentos%20Cotizacion%2F"+ NumDossier +"&Source=http%3A%2F%2Fsharepoint%2FArticulos%2FCotizaciones%2FDocumentos%20Cotizacion%2FForms%2FAllItems%2Easpx%3FRootFolder%3D%252FArticulos%252FCotizaciones%252FDocumentos%2520Cotizacion%252F"+ NumDossier +"%26FolderCTID%3D0x01200090C8EE5A40E9464A9CABE175E866DF7B%26View%3D%7BD9FD8D12%2DD0FD%2D4A0D%2DA080%2D5F08FDA19EAC%7D&IsDlg=1",
            title: "Subir Documento",
            dialogReturnValueCallback: function(dialogResult, returnValue) {
                if(dialogResult == SP.UI.DialogResult.OK)
                {
                    console.log('Fichero subido con exito');
                    console.log(returnValue);
                    self.listadoAdjuntos.cargarAdjuntos(NumDossier);
                    SP.UI.Notify.addNotification('Presionaste OK o Guardar');
                }

                if(dialogResult == SP.UI.DialogResult.cancel) {
                    SP.UI.Notify.addNotification('Presionaste Cancelar!');
                }
            }
        });
    });

    $('.estructura').delegate('.btnQuitarForma','click', function(e){
        var formaHTML = $(this).closest('li');
        var idForma = formaHTML.attr('id').replace('forma-', '');
        var solucionHTML = $(this).closest('div.areaSolucion');
        var idSolucion = solucionHTML.attr('id').replace('solucion-', '');

        self.estructura.seleccionarSolucion(idSolucion);
        self.idForma = idForma;

        var Datos1  = {
            Entidad : "Solucion",
            Clave   : "IdSolucion",
            Valor   : self.estructura.solucionSeleccionada.idSolucion
        };
        var Datos2 = {
            Entidad : "FormaArt",
            Clave   : "IdFormaArt",
            Valor   : idForma
        };

        var borrarRelacion = {
            Datos1 : Datos1,
            Datos2 : Datos2
        };

        self.solucionesDS.BorrarRelacion(Datos1, Datos2);
    });
    $('.estructura').delegate('.btnQuitarEmbalaje','click', function(e){

        var embalajeHTML = $(this).closest('li');
        var idEmbalaje = embalajeHTML.attr('id').replace('embalaje-', '');
        var solucionHTML = $(this).closest('div.areaSolucion');
        var idSolucion = solucionHTML.attr('id').replace('solucion-', '');

        self.estructura.seleccionarSolucion(idSolucion);
        self.idEmbalaje = idEmbalaje;

        var Datos1  = {
            Entidad : "Solucion",
            Clave   : "IdSolucion",
            Valor   : self.estructura.solucionSeleccionada.idSolucion
        };
        var Datos2 = {
            Entidad : "FormaEmb",
            Clave   : "IdFormaEmb",
            Valor   : idEmbalaje
        };

        var borrarRelacion = {
            Datos1 : Datos1,
            Datos2 : Datos2
        };

        self.solucionesDS.BorrarRelacion(Datos1, Datos2);
    });
};

Estructura.prototype.setPadreListado = function(listado){
    var padre = {
        Entidad : 'Dossier',
        Clave   : this.fichaDossier.ficha.campoClave(),
        Valor   : this.fichaDossier.ficha.valorClave()
    };

    listado.tabla.setPadre(padre);
};

Estructura.prototype.crearEstructura = function(){
    var self = this;
    var configuracion = {
        contenedor : 'estructura',
        plantilla  : '#solucionTemplate'
    };
    this.estructura = new arbolEstructura(configuracion);
    this.estructura.cargarDossier(this.dossier);

    this.estructura.onVerHojaCotizacionClick = function(eventArgs){
        self.hojaCotizacion.cargarSolucion(eventArgs.idSolucion, self.dossier);
        self.hojaCotizacion.abrir();
    };
    this.estructura.onAgregarFormaClick= function(eventArgs){
        self.estructura.seleccionarSolucion(eventArgs.idSolucion);
        self.articulosME.abrir();
    };
    this.estructura.onAgregarNivelClick= function(eventArgs){
        self.estructura.seleccionarSolucion(eventArgs.idSolucion);

        var padre = {
            Entidad : "Solucion",
            Clave   : "idSolucion",
            Valor   : parseInt(eventArgs.idSolucion)
        };
        self.fichaNivel.ficha.limpiar();
        self.fichaNivel.ficha.setPadre(padre);
        self.fichaNivel.ficha.setModo(IpkFicha.Modos.Alta);
        $('#contenedorFichaNivel').dialog('open');
    };
    this.estructura.onAgregarComponenteClick= function(eventArgs){
        console.log(eventArgs);
        self.idNivel = eventArgs.idNivel;
        self.embalajesME.abrir();
    };
    this.estructura.onAceptarSolucionClick= function(eventArgs){
        self.estructura.seleccionarSolucion(eventArgs.idSolucion);

        var parametros = {
            IdSolucion :  eventArgs.idSolucion
        };

        app.servicios.especiales.AceptarSolucion(JSON.stringify(parametros));
        setTimeout(function(){ window.location.reload(); } , 2000);
    };
    this.estructura.onRechazarSolucionClick= function(eventArgs){
        self.estructura.seleccionarSolucion(eventArgs.idSolucion);

        var parametros = {
            IdSolucion :  eventArgs.idSolucion
        };

        app.servicios.especiales.RechazarSolucion(JSON.stringify(parametros));
        setTimeout(function(){ window.location.reload(); } , 2000);
    };
    this.estructura.onEliminarFormaClick= function(eventArgs){
        self.estructura.seleccionarSolucion(eventArgs.idSolucion);
        self.idForma = eventArgs.idForma;

        var Datos1  = {
            Entidad : "Solucion",
            Clave   : "IdSolucion",
            Valor   : self.estructura.solucionSeleccionada.idSolucion
        };
        var Datos2 = {
            Entidad : "FormaArt",
            Clave   : "IdFormaArt",
            Valor   : eventArgs.idForma
        };

        var borrarRelacion = {
            Datos1 : Datos1,
            Datos2 : Datos2
        };

        self.solucionesDS.BorrarRelacion(Datos1, Datos2);
    };
    this.estructura.onEliminarComponenteClick= function(eventArgs){
        self.idSolucion = eventArgs.idSolucion;
        self.idEmbalaje = eventArgs.idComponente;
        self.idNivel = eventArgs.idNivel;

        var Datos1  = {
            Entidad : "Nivel",
            Clave   : "IdNivel",
            Valor   : eventArgs.idNivel
        };
        var Datos2 = {
            Entidad : "FormaEmb",
            Clave   : "IdFormaEmb",
            Valor   : eventArgs.idComponente
        };
        var borrarRelacion = {
            Datos1 : Datos1,
            Datos2 : Datos2
        };

        self.nivelDS.BorrarRelacion(Datos1, Datos2);
    };
    this.estructura.onEliminarNivelClick= function(eventArgs){
        self.estructura.seleccionarSolucion(eventArgs.idSolucion);
        self.idNivel = parseInt(eventArgs.idNivel);
        self.nivelDS.Delete(parseInt(eventArgs.idNivel));
    };
    this.estructura.onEditarNivelClick= function(eventArgs){

        console.log('Edición del nivel seleccionado');
        console.log(eventArgs);

        var padre = {
            Entidad : "Solucion",
            Clave   : "idSolucion",
            Valor   : parseInt(eventArgs.idSolucion)
        };

        self.fichaNivel.ficha.limpiar();
        self.fichaNivel.ficha.setModo(IpkFicha.Modos.Consulta);
        self.fichaNivel.ficha.setDatos(eventArgs.nivel);

        $('#contenedorFichaNivel').dialog('open');
    };

    //2013-02-12 13:27:24.700
};

Estructura.prototype.cargarDatosResumenDossier = function(dossier){
    $('#rsNumDossier').text(dossier.NumDossier);
    $('#rsTipoDossier').text(dossier.TipoDossier);
    $('#rsFechaCreacion').text(dossier.FechaCreacion);
    $('#rsFechaCierre').text(dossier.FechaCierre);
    $('#rsEstado').text(dossier.Estado);

    $('#rsDescripcion').text(dossier.DescripcionArt);
    $('#rsObservaciones').text(dossier.Observaciones);

};

var IpkFactory = function(){
    this.datasources = [];
    this.listados = [];
    this.fichas = [];
    this.fichasConfiguracion = [];
    this.ipkConfiguracion = new IpkInfraestructura();

    return this;
};
IpkFactory.prototype.getDataSource = function(nombreModelo , datasource){
    this.datasources[nombreModelo] = datasource;

    var self = this;
    this.ipkConfiguracion.getModeloByName(nombreModelo);
    this.ipkConfiguracion.onGetModelo = function(modelo){
        var clave = _.find(modelo.zz_CamposModelos, function(elemento){return elemento.EsClave == true}).Nombre;
        self.datasources[modelo.Nombre].CambiarEntidad(modelo.Nombre, clave);
    };
};
IpkFactory.prototype.getFicha = function(nombreFicha , ficha, configuracion){
    this.fichas[nombreFicha] = ficha;
    this.fichasConfiguracion[nombreFicha] = configuracion;

    var self = this;
    this.ipkConfiguracion.getFichaByName(nombreFicha);
    this.ipkConfiguracion.onGetFicha = function(ficha){

        var fichaNueva = new IpkRemoteFicha( self.fichasConfiguracion[ficha.Nombre], [] );

        app.log.debug('onGetFicha Nueva' , fichaNueva);
    };
};