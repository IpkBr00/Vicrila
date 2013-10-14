

app.configuracion = {
    ajax: {
        generales: {
            Insert 	   : { url : 'http://svb00078/sites/coleccionsitios/Articulos/Cotizaciones/_layouts/SP_Webservices/Servicio.asmx/Insert'},
            InsertHijo : { url : 'http://svb00078/sites/coleccionsitios/Articulos/Cotizaciones/_layouts/SP_Webservices/Servicio.asmx/InsertHijo'},
            Update 	   : { url : 'http://svb00078/sites/coleccionsitios/Articulos/Cotizaciones/_layouts/SP_Webservices/Servicio.asmx/Update'},
            Delete 	   : { url : 'http://svb00078/sites/coleccionsitios/Articulos/Cotizaciones/_layouts/SP_Webservices/Servicio.asmx/Delete'},
            GetById	   : { url : 'http://svb00078/sites/coleccionsitios/Articulos/Cotizaciones/_layouts/SP_Webservices/Servicio.asmx/Select'},
            Buscar     : { url : 'http://svb00078/sites/coleccionsitios/Articulos/Cotizaciones/_layouts/SP_Webservices/Servicio.asmx/Buscar'},
            //Buscar     : { url : 'http://wvb00320/_layouts/SP_WebServices/prueba.asmx/Buscar'},
            Filtrar    : { url : 'http://svb00078/sites/coleccionsitios/Articulos/Cotizaciones/_layouts/SP_Webservices/Servicio.asmx/Filtrar'},
            Listado	   : { url : 'http://svb00078/sites/coleccionsitios/Articulos/Cotizaciones/_layouts/SP_Webservices/Servicio.asmx/Listado'},
            Copiar     : { url : 'http://svb00078/sites/coleccionsitios/Articulos/Cotizaciones/_layouts/SP_Webservices/Servicio.asmx/Copiar'},
            CrearRelacion : { url : 'http://svb00078/sites/coleccionsitios/Articulos/Cotizaciones/_layouts/SP_Webservices/Servicio.asmx/CrearRelacion'},
            BorrarRelacion: { url : 'http://svb00078/sites/coleccionsitios/Articulos/Cotizaciones/_layouts/SP_Webservices/Servicio.asmx/BorrarRelacion'},
            Estructura : { url : 'http://svb00078/sites/coleccionsitios/Articulos/Cotizaciones/_layouts/SP_Webservices/Servicio.asmx/Estructura'}
        },
        administracion: {
            Insert 	   : { url : 'http://svb00078/sites/coleccionsitios/Articulos/Cotizaciones/_layouts/SP_Webservices/Administracion.asmx/Insert'},
            Update 	   : { url : 'http://svb00078/sites/coleccionsitios/Articulos/Cotizaciones/_layouts/SP_Webservices/Administracion.asmx/Update'},
            Delete 	   : { url : 'http://svb00078/sites/coleccionsitios/Articulos/Cotizaciones/_layouts/SP_Webservices/Administracion.asmx/Delete'},
            GetById	   : { url : 'http://svb00078/sites/coleccionsitios/Articulos/Cotizaciones/_layouts/SP_Webservices/Administracion.asmx/Select'},
            Buscar     : { url : 'http://svb00078/sites/coleccionsitios/Articulos/Cotizaciones/_layouts/SP_Webservices/Administracion.asmx/Buscar'},
            Listado	   : { url : 'http://svb00078/sites/coleccionsitios/Articulos/Cotizaciones/_layouts/SP_Webservices/Administracion.asmx/Listado'},
            Copiar     : { url : 'http://svb00078/sites/coleccionsitios/Articulos/Cotizaciones/_layouts/SP_Webservices/Administracion.asmx/Copiar'},
            Estructura : { url : 'http://svb00078/sites/coleccionsitios/Articulos/Cotizaciones/_layouts/SP_Webservices/Administracion.asmx/Estructura'}
        },
        especiales : {
            AceptarSolucion : {
                url : 'http://svb00078/sites/coleccionsitios/Articulos/Cotizaciones/_layouts/SP_Webservices/Especiales.asmx/AceptarSolucion'
            },
            RechazarSolucion : {
                url : 'http://svb00078/sites/coleccionsitios/Articulos/Cotizaciones/_layouts/SP_Webservices/Especiales.asmx/RechazarSolucion'
            },
            GenerarNumDossier : {
                url :'http://svb00078/sites/coleccionsitios/Articulos/Cotizaciones/_layouts/SP_Webservices/Especiales.asmx/GenerarNumDossier'
            },

            MarcarSeccionCompletada : {
                url : 'http://svb00078/sites/coleccionsitios/Articulos/Cotizaciones/_layouts/SP_Webservices/Especiales.asmx/MarcarSeccionCompletada'
            },
            MarcarSeccionPendiente : {
                url : 'http://svb00078/sites/coleccionsitios/Articulos/Cotizaciones/_layouts/SP_Webservices/Especiales.asmx/MarcarSeccionPendiente'
            },
            EnviarAvisoSeccion: {
                url : 'http://svb00078/sites/coleccionsitios/Articulos/Cotizaciones/_layouts/SP_Webservices/Especiales.asmx/EnviarAvisoSeccion'
            },
            EnviarAvisoSeccionSiguiente : {
                url : 'http://svb00078/sites/coleccionsitios/Articulos/Cotizaciones/_layouts/SP_Webservices/Especiales.asmx/EnviarAvisoSeccionSiguiente'
            },
            Avisos_Diarios: {
                url : 'http://svb00078/sites/coleccionsitios/Articulos/Cotizaciones/_layouts/SP_Webservices/Especiales.asmx/Avisos_Diarios'
            },
            Estadistica_TMR_Dossier_PorTipo: {
                url : 'http://svb00078/sites/coleccionsitios/Articulos/Cotizaciones/_layouts/SP_Webservices/Especiales.asmx/Estadistica_TMR_Dossier_PorTipo'
            },
            Estadistica_TMR_Dossier_PorDepartamento: {
                url : 'http://svb00078/sites/coleccionsitios/Articulos/Cotizaciones/_layouts/SP_Webservices/Especiales.asmx/Estadistica_TMR_Dossier_PorDepartamento'
            }
        },
        navision : {
            EjecutarFiltro : {
                url : 'http://svb00078/sites/coleccionsitios/Articulos/Cotizaciones/_layouts/SP_Webservices/Navision.asmx/EjecutarFiltro'
            },
            Paginas : {
                url :'http://svb00078/sites/coleccionsitios/Articulos/Cotizaciones/_layouts/SP_Webservices/Navision.asmx/Paginas'
            },
            Campos : {
                url : 'http://svb00078/sites/coleccionsitios/Articulos/Cotizaciones/_layouts/SP_Webservices/Navision.asmx/Campos'
            }
        },
        sharepoint  : {
            usuarios : {
                GrupoUsuarioActual : {
                    url : 'http://svb00078/sites/coleccionsitios/Articulos/Cotizaciones/_layouts/SP_WebServices/SP_Usuarios.asmx/GrupoUsuarioActual'
                },
                Informacion : {
                    url : 'http://svb00078/sites/coleccionsitios/Articulos/Cotizaciones/_layouts/SP_WebServices/SP_Usuarios.asmx/Informacion'
                }
            },
            correo : {
                Enviar : {
                    url : 'http://svb00078/sites/coleccionsitios/Articulos/Cotizaciones/_layouts/SP_WebServices/SP_Correo.asmx/Enviar'
                },
                EnviarGrupo : {
                    url : 'http://svb00078/sites/coleccionsitios/Articulos/Cotizaciones/_layouts/SP_WebServices/SP_Correo.asmx/EnviarGrupo'
                }
            }
        },
        dossieres: {
            Listado  : { url : '../js/fixtures/Dossieres.json' }
        }
    },
    navegacion : function(){
        var nombreGrupoInfo =  app.seguridad.grupoActual.replace('cotiz_', '');
        nombreGrupoInfo = nombreGrupoInfo.charAt(0).toUpperCase() + nombreGrupoInfo.substr(1).toLowerCase();

        var configuracion = {
            contenedor : "menuPlaceholder",
            id         : "menuPlaceholder"
        };

        this.toolbarMenu = new IpkToolbar(configuracion);

        this.toolbarMenu.agregarBoton({
            nombre : "Inicio",
            descripcion : "Navega a la pagina de inicio",
            clases : "bold",
            icono : "icon-home",
            accessKey : "0",
            texto : "Inicio"
        });
        this.toolbarMenu.agregarBoton({
            nombre : "IrANuevoDossier",
            descripcion : "Navega a la pantalla de creacion de un dossier desde cero",
            clases : "",
            icono : "icon-plus",
            accessKey : (app.seguridad.grupoActual == "cotiz_comercial") ? "1" : "99",
            texto : "Nuevo Dossier",
            permisos : ["cotiz_comercial"]
        });
        this.toolbarMenu.agregarBoton({
            nombre : "IrACopiarDossier",
            descripcion : "Navega a la pantalla de copia de dossier",
            clases : "",
            icono : "icon-repeat",
            accessKey : (app.seguridad.grupoActual == "cotiz_comercial") ? "2" : "99",
            texto : "Copiar Dossier",
            permisos : ["cotiz_comercial"]
        });

        this.toolbarMenu.agregarBoton({
            nombre : "IrABusquedaDossieres",
            descripcion : "Navega a la busqueda",
            clases : "",
            icono : "icon-search",
            accessKey : (app.seguridad.grupoActual == "cotiz_comercial") ? "3" : "1",
            texto : "Busqueda"
        });
        this.toolbarMenu.agregarBoton({
            nombre : "IrADossieresEnCurso",
            descripcion : "Navega a dossieres en curso",
            clases : "",
            icono : "icon-folder-open",
            accessKey : (app.seguridad.grupoActual == "cotiz_comercial") ? "3" : "2",
            texto : "Dossieres En Curso"
        });

        this.toolbarMenu.agregarBoton({
            nombre : "Info",
            descripcion : app.seguridad.grupoActual,
            clases : "bold",
            icono : "icon-user",
            accessKey : "",
            texto : 'GRUPO ACTUAL: ' + nombreGrupoInfo
        });

        this.toolbarMenu.onInicio = function(){
            document.location = 'Inicio.aspx';
        };


        this.toolbarMenu.onIrANuevoDossier = function(){
            document.location = 'CreacionDossier.aspx';
        };
        this.toolbarMenu.onIrACopiarDossier = function(){
            document.location = 'CopiaDossieres.aspx';
        };
        this.toolbarMenu.onIrABusquedaDossieres = function(){
            document.location = 'Busqueda.aspx';
        };

        this.toolbarMenu.onIrADossieresEnCurso = function(){
            document.location = 'DossieresEnCurso.aspx';
        };

        this.toolbarMenu.onInfo = function(){
        };

        return this.toolbarMenu;
    },
    navegacionAdministracion : function(){
        var configuracion = {
            contenedor : "navegacionPlaceholder",
            id         : "navegacion"
        };

        this.toolbar = new IpkToolbar(configuracion);

        this.toolbar.agregarBoton({
            nombre : "navModelos",
            descripcion : "Administracio de los modelos de la aplicación",
            clases : "",
            icono : "icon-Book",
            texto : "Modelos"
        });
        this.toolbar.agregarBoton({
            nombre : "navListados",
            descripcion : "Administracio de los listados de la aplicación",
            clases : "",
            icono : "icon-Book",
            texto : "Listados"
        });
        this.toolbar.agregarBoton({
            nombre : "navFichas",
            descripcion : "Administración de las fichas de la aplicación",
            clases : "",
            icono : "icon-Book",
            texto : "Fichas"
        });
        this.toolbar.agregarBoton({
            nombre : "navFuentesNavision",
            descripcion : "Administración de las fuentes de datos de navision",
            clases : "",
            icono : "icon-Book",
            texto : "Fuentes Navision"
        });
        this.toolbar.agregarBoton({
            nombre : "navFuentesInternas",
            descripcion : "Administración de las fuentes de internas de la aplicación",
            clases : "",
            icono : "icon-Book",
            texto : "Fuentes Internas"
        });

        var self = this;

        this.toolbar.onnavModelos = function(){
            window.location = 'Modelos.aspx'
        };
        this.toolbar.onnavListados = function(){
            window.location = 'Listados.aspx'
        };
        this.toolbar.onnavFichas = function(){
            window.location = 'Fichas.aspx'
        };
        this.toolbar.onnavFuentesNavision = function(){
            window.location = 'FuentesNavision.aspx'
        };
        this.toolbar.onnavFuentesInternas = function(){
            window.location = 'FuentesInternas.aspx'
        };
    }
};

app.modelos = {
    generales: {
        GetById: function(data){
            var parametros = app.configuracion.ajax.generales.GetById;
            parametros.data = data;

            return app.ajax.launch(parametros);
        },
        Insert: function(data){
            var parametros = app.configuracion.ajax.generales.Insert;
            parametros.data = data;

            return app.ajax.launch(parametros);
        },
        InsertHijo: function(data){
            var parametros = app.configuracion.ajax.generales.InsertHijo;
            parametros.data = data;

            return app.ajax.launch(parametros);
        },
        Update: function(data){
            var parametros = app.configuracion.ajax.generales.Update;

            parametros.data = data;

            return app.ajax.launch(parametros);
        },
        Delete: function(data){
            var parametros = app.configuracion.ajax.generales.Delete;
            parametros.data = data;

            return app.ajax.launch(parametros);
        },
        Buscar : function(data){
            var parametros = app.configuracion.ajax.generales.Buscar;
            parametros.data = data;

            return app.ajax.launch(parametros);
        },
        Filtrar : function(data){
            var parametros = app.configuracion.ajax.generales.Filtrar;
            parametros.data = data;

            return app.ajax.launch(parametros);
        },
        Listado : function(data){
            var parametros = app.configuracion.ajax.generales.Listado;
            parametros.data = data;

            return app.ajax.launch(parametros);
        },
        Copiar: function(data){
            var parametros = app.configuracion.ajax.generales.Copiar;
            parametros.data = data;

            return app.ajax.launch(parametros);
        },
        CrearRelacion: function(data){
            var parametros = app.configuracion.ajax.generales.CrearRelacion;
            parametros.data = data;

            return app.ajax.launch(parametros);
        },
        BorrarRelacion: function(data){
            var parametros = app.configuracion.ajax.generales.BorrarRelacion;
            parametros.data = data;

            return app.ajax.launch(parametros);
        },
        Estructura : function(data){
            var parametros = app.configuracion.ajax.generales.Estructura;
            parametros.data = data;

            return app.ajax.launch(parametros);
        }
    },
    administracion : {
        GetById: function(data){
            var parametros = app.configuracion.ajax.administracion.GetById;
            parametros.data = data;

            return app.ajax.launch(parametros);
        },
        Insert: function(data){
            var parametros = app.configuracion.ajax.administracion.Insert;
            parametros.data = data;

            return app.ajax.launch(parametros);
        },
        Update: function(data){
            var parametros = app.configuracion.ajax.administracion.Update;
            parametros.data = data;


            return app.ajax.launch(parametros);
        },
        Delete: function(data){
            var parametros = app.configuracion.ajax.administracion.Delete;
            parametros.data = data;

            return app.ajax.launch(parametros);
        },
        Buscar : function(data){
            var parametros = app.configuracion.ajax.administracion.Buscar;
            parametros.data = data;

            return app.ajax.launch(parametros);
        },
        Listado : function(data){
            var parametros = app.configuracion.ajax.administracion.Listado;
            parametros.data = data;

            return app.ajax.launch(parametros);
        },
        Copiar: function(data){
            var parametros = app.configuracion.ajax.administracion.Copiar;
            parametros.data = data;

            return app.ajax.launch(parametros);
        },
        Estructura : function(data){
            var parametros = app.configuracion.ajax.administracion.Estructura;
            parametros.data = data;

            return app.ajax.launch(parametros);
        }
    },
    especiales : {
        AceptarSolucion: function(data){
            var parametros = app.configuracion.ajax.especiales.AceptarSolucion;
            parametros.data = data;

            return app.ajax.launch(parametros);
        },
        RechazarSolucion: function(data){
            var parametros = app.configuracion.ajax.especiales.RechazarSolucion;
            parametros.data = data;

            return app.ajax.launch(parametros);
        },
        GenerarNumDossier: function(data){
            var parametros = app.configuracion.ajax.especiales.GenerarNumDossier;
            parametros.data = data;

            return app.ajax.launch(parametros);
        },

        MarcarSeccionCompletada: function(data){
            var parametros = app.configuracion.ajax.especiales.MarcarSeccionCompletada;
            parametros.data = data;

            return app.ajax.launch(parametros);
        },
        MarcarSeccionPendiente: function(data){
            var parametros = app.configuracion.ajax.especiales.MarcarSeccionPendiente;
            parametros.data = data;

            return app.ajax.launch(parametros);
        },
        EnviarAvisoSeccion: function(data){
            var parametros = app.configuracion.ajax.especiales.EnviarAvisoSeccion;
            parametros.data = data;

            return app.ajax.launch(parametros);
        },
        EnviarAvisoSeccionSiguiente: function(data){
            var parametros = app.configuracion.ajax.especiales.EnviarAvisoSeccionSiguiente;
            parametros.data = data;

            return app.ajax.launch(parametros);
        },
        Avisos_Diarios: function(data){
            var parametros = app.configuracion.ajax.especiales.Avisos_Diarios;
            parametros.data = data;

            return app.ajax.launch(parametros);
        },
        Estadistica_TMR_Dossier_PorTipo: function(data){
            var parametros = app.configuracion.ajax.especiales.Estadistica_TMR_Dossier_PorTipo;
            parametros.data = data;

            return app.ajax.launch(parametros);
        },
        Estadistica_TMR_Dossier_PorDepartamento: function(data){
            var parametros = app.configuracion.ajax.especiales.Estadistica_TMR_Dossier_PorDepartamento;
            parametros.data = data;

            return app.ajax.launch(parametros);
        }
    },
    navision : {
        EjecutarFiltro: function(data){
            var parametros = app.configuracion.ajax.navision.EjecutarFiltro;
            parametros.data = data;

            return app.ajax.launch(parametros);
        },
        Paginas: function(data){
            var parametros = app.configuracion.ajax.navision.Paginas;
            parametros.data = data;

            return app.ajax.launch(parametros);
        },
        Campos: function(data){
            var parametros = app.configuracion.ajax.navision.Campos;
            parametros.data = data;

            return app.ajax.launch(parametros);
        }
    },
    sharepoint : {
        usuarios : {
            GrupoUsuarioActual: function(data){
                var parametros = app.configuracion.ajax.sharepoint.usuarios.GrupoUsuarioActual;
                parametros.data = data;

                return app.ajax.launch(parametros);
            },
            Informacion: function(data){
                var parametros = app.configuracion.ajax.sharepoint.usuarios.Informacion;
                parametros.data = data;

                return app.ajax.launch(parametros);
            }
        },
        correo : {
            Enviar : function(data){
                var parametros = app.configuracion.ajax.sharepoint.correo.Enviar;
                parametros.data = data;

                return app.ajax.launch(parametros);
            },
            EnviarGrupo : function(data){
                var parametros = app.configuracion.ajax.sharepoint.correo.EnviarGrupo;
                parametros.data = data;

                return app.ajax.launch(parametros);
            }
        }
    },
    dossieres: {
        Listado: function(){
            return app.ajax.launch(app.configuracion.ajax.dossieres.Listado);
        }
    }
};

app.servicios = {
    generales : {
        GetById : function(data){
            var entidad = JSON.parse(data).Entidad;

            var alias = JSON.parse(data).Alias;

            if(!alias)
                alias = "GetById";

            app.modelos.generales.GetById(data)
                .done(
                function() {
                    arguments.entidad = entidad;
                    //app.eventos.publicar('GetById', arguments);
                    app.eventos.lanzar(alias, entidad, arguments);
                    //app.eventos.lanzar('GetById', entidad, arguments);
                })
                .fail(
                function(){
                    var mensaje = 'Error obteniendo el elemento por id en ' + entidad;
                }
            );
        },
        Insert : function(data){
            var entidad = JSON.parse(data).Entidad;

            app.modelos.generales.Insert(data)
                .done(
                function() {
                    arguments.entidad = entidad;

                    //app.eventos.publicar('Insert', arguments);
                    app.eventos.lanzar('Insert', entidad, arguments);
                })
                .fail(
                function(){

                    var mensaje = 'Error Insert de ' + entidad;

                }
            );
        },
        InsertHijo : function(data){
            var entidad = JSON.parse(data).Entidad;

            app.modelos.generales.InsertHijo(data)
                .done(
                function() {
                    arguments.entidad = entidad;
                    app.eventos.lanzar('InsertHijo', entidad , arguments);
                })
                .fail(
                function(){
                    var mensaje = 'Error InsertHijo de ' + entidad;
                }
            );
        },
        Update : function(data){
            var entidad = JSON.parse(data).Entidad;

            app.modelos.generales.Update(data)
                .done(
                function() {
                    arguments.entidad = entidad;
                    app.eventos.lanzar('Update', entidad,  arguments);
                })
                .fail(
                function(){
                    var mensaje = 'Error Update de ' + entidad;
                }
            );
        },
        Delete : function(data){
            var entidad = JSON.parse(data).Entidad;

            app.modelos.generales.Delete(data)
                .done(
                function() {
                    arguments.entidad = entidad;
                    app.eventos.lanzar('Delete',entidad,  arguments);
                })
                .fail(
                function(){
                    var mensaje = 'Error Delete de ' + entidad;
                }
            );
        },
        Buscar : function(data){
            var entidad = JSON.parse(data).Entidad;
            var alias = JSON.parse(data).Alias;

            if(!alias)
                alias = "Buscar";


            app.modelos.generales.Buscar(data)
                .done(
                function() {
                    arguments.entidad = entidad;
                    app.eventos.lanzar(alias, entidad, arguments);
                })
                .fail(
                function(){
                    var mensaje = 'Error Buscar de ' + entidad;
                }
            );
        },
        Filtrar : function(data){
            var entidad = JSON.parse(data).Entidad;

            app.modelos.generales.Filtrar(data)
                .done(
                function() {
                    arguments.entidad = entidad;

                    app.eventos.publicar('Filtrar', arguments);
                    //app.eventos.lanzar('Filtrar' , entidad, arguments);
                    app.eventos.lanzar('Filtrar' + entidad, entidad, arguments);
                })
                .fail(
                function(){
                    var mensaje = 'Error Filtrar de ' + entidad;

                }
            );
        },
        Listado : function(data){
            var entidad = JSON.parse(data).Entidad;
            var alias = JSON.parse(data).Alias;

            if(!alias)
                alias = "Listado";

            app.modelos.generales.Listado(data)
                .done(
                function() {
                    arguments.entidad = entidad;

                    //app.eventos.publicar('Listado', arguments);
                    app.eventos.lanzar(alias, entidad, arguments);
                })
                .fail(
                function(){
                    var mensaje = 'Error Listado de ' + entidad;
                }
            );
        },
        Copiar : function(data){
            var entidad = JSON.parse(data).Entidad;

            app.modelos.generales.Copiar(data)
                .done(
                function() {
                    arguments.entidad = entidad;
                    app.eventos.lanzar('Copiar', entidad, arguments);
                })
                .fail(
                function(){
                    var mensaje = 'Error Copiar de ' + entidad;
                }
            );
        },
        CrearRelacion : function(data){
            var entidad = JSON.parse(data).Datos2.Entidad;
            var alias = JSON.parse(data).Alias;

            if(!alias)
                alias = "CrearRelacion";


            app.modelos.generales.CrearRelacion(data)
                .done(
                function() {
                    arguments.entidad = entidad;
                    app.eventos.lanzar(alias, entidad, arguments);
                })
                .fail(
                function(){
                    var mensaje = 'Error CrearRelacion de ' + entidad;
                }
            );
        },
        BorrarRelacion : function(data){
            var entidad = JSON.parse(data).Datos2.Entidad;
            var alias = JSON.parse(data).Alias;

            if(!alias)
                alias = "BorrarRelacion";


            app.modelos.generales.BorrarRelacion (data)
                .done(
                function() {
                    arguments.entidad = entidad;
                    app.eventos.lanzar(alias, entidad, arguments);
                })
                .fail(
                function(){
                    var mensaje = 'Error BorrarRelacion  de ' + entidad;
                }
            );
        },
        Estructura : function(data){
            var entidad = JSON.parse(data).Entidad;
            app.modelos.generales.Estructura(data)
                .done(
                function() {
                    app.eventos.lanzar('Estructura',entidad, arguments);
                })
                .fail(
                function(){
                    JSON.parse(data)
                    var mensaje = 'Error Estructura de ' + JSON.parse(data).Entidad;

                }
            );
        }
    },
    administracion : {
        GetById : function(data){
            app.modelos.administracion.GetById(data)
                .done(
                function() {
                    app.eventos.publicar('GetById', arguments);
                })
                .fail(
                function(){
                    var mensaje = 'Error consultando el listado de dossieres';
                }
            );
        },
        Insert : function(data){
            app.modelos.administracion.Insert(data)
                .done(
                function() {
                    app.eventos.publicar('Insert', arguments);
                })
                .fail(
                function(){
                    JSON.parse(data)
                    var mensaje = 'Error Insert de ' + JSON.parse(data).Entidad;
                }
            );
        },
        Update : function(data){
            app.modelos.administracion.Update(data)
                .done(
                function() {
                    app.eventos.publicar('Update', arguments);
                })
                .fail(
                function(){
                    JSON.parse(data)
                    var mensaje = 'Error Update de ' + JSON.parse(data).Entidad;
                }
            );
        },
        Delete : function(data){
            app.modelos.administracion.Delete(data)
                .done(
                function() {
                    app.eventos.publicar('Delete', arguments);
                })
                .fail(
                function(){
                    JSON.parse(data)
                    var mensaje = 'Error Delete de ' + JSON.parse(data).Entidad;

                }
            );
        },
        Buscar : function(data){
            app.modelos.administracion.Buscar(data)
                .done(
                function() {
                    app.eventos.publicar('Buscar', arguments);
                })
                .fail(
                function(){
                    JSON.parse(data)
                    var mensaje = 'Error Buscar de ' + JSON.parse(data).Entidad;


                }
            );
        },
        Listado : function(data){
            app.modelos.administracion.Listado(data)
                .done(
                function() {
                    app.eventos.publicar('Listado_'+ JSON.parse(data).Entidad, arguments);
                })
                .fail(
                function(){
                    JSON.parse(data)
                    var mensaje = 'Error Listado de ' + JSON.parse(data).Entidad;
                }
            );
        },
        Copiar : function(data){
            app.modelos.administracion.Copiar(data)
                .done(
                function() {
                    app.eventos.publicar('Copiar', arguments);
                })
                .fail(
                function(){
                    JSON.parse(data)
                    var mensaje = 'Error Copiar de ' + JSON.parse(data).Entidad;
                }
            );
        },
        Estructura : function(data){
            app.modelos.administracion.Estructura(data)
                .done(
                function() {
                    app.eventos.publicar('Estructura', arguments);
                })
                .fail(
                function(){
                    var mensaje = 'Error Estructura de ' + JSON.parse(data).Entidad;
                }
            );
        }
    },
    especiales : {
        AceptarSolucion: function(data){
            app.modelos.especiales.AceptarSolucion(data)
                .done(
                function() {
                    app.eventos.lanzar("AceptarSolucion", "Solucion", arguments);
                })
                .fail(
                function(){
                    var mensaje = 'Error obteniendo el elemento por id en ' + entidad;
                }
            );
        },
        RechazarSolucion: function(data){
            app.modelos.especiales.RechazarSolucion(data)
                .done(
                function() {
                    app.eventos.lanzar("RechazarSolucion", "Solucion", arguments);
                })
                .fail(
                function(){
                    var mensaje = 'Error obteniendo el elemento por id en ' + entidad;
                }
            );
        },
        GenerarNumDossier: function(data){
            app.modelos.especiales.GenerarNumDossier(data)
                .done(
                function() {})
                .fail(
                function(){
                    var mensaje = 'Error obteniendo el elemento por id en ' + entidad;
                }
            );
        },
        Avisos_Diarios : function(data){
            app.modelos.especiales.Avisos_Diarios(data)
                .done(
                function() {})
                .fail(
                function(){
                    var mensaje = 'Error enviando el mail de Avisos diarios' + entidad;
                }
            );
        },
        Estadistica_TMR_Dossier_PorTipo : function(data){
            app.modelos.especiales.Estadistica_TMR_Dossier_PorTipo(data)
                .done(
                function() {})
                .fail(
                function(){
                    var mensaje = 'Error enviando el mail de Avisos diarios' + entidad;
                }
            );
        },
        Estadistica_TMR_Dossier_PorDepartamento: function(data){
            app.modelos.especiales.Estadistica_TMR_Dossier_PorDepartamento(data)
                .done(
                function() {})
                .fail(
                function(){
                    var mensaje = 'Error enviando el mail de Avisos diarios' + entidad;
                }
            );
        }
    },
    dossieres : {
        Listado : function(){
            app.modelos.dossieres.Listado()
                .done(
                function() {
                    app.eventos.publicar('Listado_Dossieres', arguments);

                })
                .fail(
                function(){
                    var mensaje = 'Error consultando el listado de dossieres';
                }
            );
        }

    }
};

app.seguridad = {
    grupos : [
        'cotiz_produccion',
        'cotiz_moldes',
        'cotiz_dnp',
        'cotiz_programacion',
        'cotiz_analitica',
        'cotiz_comercial'
    ],
    grupoActual : 'cotiz_comercial'
};

