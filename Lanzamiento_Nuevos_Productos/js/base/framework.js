var app = {
	log: {
		activado: false,
		write : function(valor){
			if(this.activado)
			{
				if(typeof(console) !== 'undefined' && console !== null) {
					console.log(valor);
				}
				else{
					//alert('No hay consola');
					//alert(valor);
				}	
			}

		},
		groupBegin : function(valor){
			if(this.activado)
			{
				if(typeof(console) !== 'undefined' && console !== null) {
					console.group(valor);
				}
				else{
					//alert('No hay consola');
					//alert(valor);
				}	
			}

		},		
		groupEnd : function(){
			if(this.activado)
			{
				if(typeof(console) !== 'undefined' && console !== null) {
					console.groupEnd();
				}
				else{
					//alert('No hay consola');
				}	
			}
		},
		debug : function(){
			app.log.groupBegin(arguments[0]);
			//app.log.write('----- ' + arguments[0] + ' -----');
			for (var i = arguments.length - 1; i >= 1; i--) {
				app.log.write(arguments[i]);
			};
			//app.log.write('---------------------');			
			app.log.groupEnd();
		}
	},
	eventos : {
		subscribir : function(evento, callback){
			$.subscribe(evento, callback);
			app.log.debug('Subscripción' , evento);
		},
		publicar : function(evento, datos){
			app.log.debug('Publicación' , evento);
			$.publish(evento, [datos]);
		}
	},
	ajax : {
		defaults : {
				type: "POST",
		    	contentType: "application/json; charset=utf-8",
		    	url: '',
		    	data: '',
		    	dataType: 'json',
		    	beforeSend : function(jqXHR, settings){},
		    	success : function(data, textStatus, jqXHR) {},
		    	error: function (jqXHR, textStatus, errorThrown) {}
			},
		launch : function(options){
			var parametros = $.extend({}, this.defaults, options);

			app.log.debug('Ajax Launch', options, parametros);

			return $.ajax(parametros);
		}
	},
	configuracion :{
		modelos: {
			navision: {
				productos : {
					existeProducto : {
						url : 'Ajax.aspx/NavisionBuscarProducto'
					},
					pasoANavision : {
						url : 'Ajax.aspx/PasarANavision'
					},
					consultaPropiedades : {
						url : 'Ajax.aspx/Navision_ObtenerPropiedades'
					},
					porcentajeMerma : {
						url : 'Ajax.aspx/PorcentajeMerma'
					},
					dimensionesPalet : {
						url : 'Ajax.aspx/DimensionesPalet'
					}
				},
				maestros : {
					claseVidrio: {
						url : 'Ajax.aspx/Navision',
						data: "{'Fuente' : 'claseVidrio'}"
					},
					tratamientoTermico: {
						url : 'Ajax.aspx/Navision',
						data: "{'Fuente' : 'tratamientoTermico'}"
					},
					fdf: {
						url : 'Ajax.aspx/Navision',
						data: "{'Fuente' : 'fdf'}"
					},
					grupoContableExistencias: {
						url : 'Ajax.aspx/Navision',
						data: "{'Fuente' : 'grupoContableExistencias'}"
					},
					grupoContableProducto: {
						url : 'Ajax.aspx/Navision',
						data: "{'Fuente' : 'grupoContableProducto'}"
					},
					grupoRegistroIVA: {
						url : 'Ajax.aspx/Navision',
						data: "{'Fuente' : 'grupoRegistroIVA'}"
					},
					valoracionExistencias: {
						url : 'Ajax.aspx/Navision',
						data: "{'Fuente' : 'valoracionExistencias'}"
					},
					operarios: {
						url : 'Ajax.aspx/Navision',
						data: "{'Fuente' : 'operarios'}"
					},
					serie: {
						url : 'Ajax.aspx/Navision',
						data: "{'Fuente' : 'serie'}"
					},
					tipoPalet: {
						url : 'Ajax.aspx/Navision',
						data: "{'Fuente' : 'tipoPalet'}"
					},
					rutasProducto: {
						url : 'Ajax.aspx/Navision',
						data: "{'Fuente' : 'rutasProducto'}"	
					}
				}
			},
			dominio : {
				productos: {
					Listado    : { url : 'Ajax.aspx/ListadoProductos' },
					Buscar     : { url : 'Ajax.aspx/BuscarProducto'  }, 
					Insertar   : { url : 'Ajax.aspx/CrearProducto'	},
					Actualizar : { url : 'Ajax.aspx/ActualizarProducto'},
					Eliminar   : { url : 'Ajax.aspx/EliminarProducto'}
				},
				resumen: {
					Listado    : { url : 'Ajax.aspx/ListadoResumen' },
					Insertar    : { url : 'Ajax.aspx/CrearResumen' }
				},
				articulos : {
					Listado    : { url : 'Ajax.aspx/ListadoArticulos' },
					Buscar     : { url : 'Ajax.aspx/BuscarArticulo'  }, 
					Insertar   : { url : 'Ajax.aspx/InsertarArticulo'	},
					Actualizar : { url : 'Ajax.aspx/ActualizarArticulo'},
					Eliminar   : { url : 'Ajax.aspx/EliminarArticulo'}
				},
				formularios : {
					Listado    : { url : 'Ajax.aspx/ListadoFormularios' },
					Buscar     : { url : 'Ajax.aspx/BuscarFormularios'  }, 
					Insertar   : { url : 'Ajax.aspx/CrearFormulario'	},
					Actualizar : { url : 'Ajax.aspx/ActualizarFormulario'}
				},
				operarios : {
					Listado    : { url : 'Ajax.aspx/ListadoOperarios' },
					Buscar     : { url : 'Ajax.aspx/BuscarOperarios'  }, 
					Insertar   : { url : 'Ajax.aspx/CrearOperario'	},
					Actualizar : { url : 'Ajax.aspx/ActualizarOperario'},
					Eliminar   : { url : 'Ajax.aspx/EliminarOperario'},
					PorArticulo : { url : 'Ajax.aspx/ListadoOperariosPorArticulo'}
				}
			},
			sharepoint : {
				info : {
					getGrupoUsuario: {
						url : 'Ajax.aspx/GrupoActual'
					},
					notificaciones: {
						url : 'Ajax.aspx/Notificaciones'	
					}
				}
			}
		}
	},
	modelos: {
		navision : {
			productos : {
				ExisteProducto : function(Tipo, Codigo){
					var parametros = app.configuracion.modelos.navision.productos.existeProducto;
					parametros.data = "{'Tipo' :'" + Tipo + "', 'Codigo' : '" + Codigo + "'}";

					return app.ajax.launch(parametros);	
				},
				PasoANavision : function(Tipo, IdResumen){
					var parametros = app.configuracion.modelos.navision.productos.pasoANavision;
					parametros.data = "{'Tipo' :'" + Tipo + "', 'IdResumen' : '" + IdResumen + "'}";

					return app.ajax.launch(parametros);		
				},
				consultaPropiedades : function(Tipo, Codigo){
					var parametros = app.configuracion.modelos.navision.productos.consultaPropiedades;
					parametros.data = "{'Tipo' :'" + Tipo + "', 'Codigo' : '" + Codigo + "'}";

					return app.ajax.launch(parametros);	
				},
				porcentajeMerma : function(Familia)
				{
					var parametros = app.configuracion.modelos.navision.productos.porcentajeMerma;
					parametros.data = "{'Familia' :'" + Familia + "'}";

					return app.ajax.launch(parametros);	
				},
				dimensionesPalet : function(TipoPalet)
				{
					var parametros = app.configuracion.modelos.navision.productos.dimensionesPalet;
					parametros.data = "{'TipoPalet' :'" + TipoPalet + "'}";

					return app.ajax.launch(parametros);	
				}
			},
			operarios : {
				Listado : function(){
					return app.ajax.launch(app.configuracion.modelos.navision.maestros.operarios);
				}
			},
			rutasProducto : {
				Listado : function(){
					return app.ajax.launch(app.configuracion.modelos.navision.maestros.rutasProducto);
				}	
			}
		},
		dominio :{
			productos: {
				Listado: function(){
					return app.ajax.launch(app.configuracion.modelos.dominio.productos.Listado);	
				},
				Buscar: function(Campo, Valor){
					var parametros = app.configuracion.modelos.dominio.productos.Buscar;
					parametros.data = "{'Campo' : '" + Campo + "', 'Valor' : '" + Valor + "'}";

					return app.ajax.launch(parametros);		
				},
				Insertar : function(Datos){
					var parametros = app.configuracion.modelos.dominio.productos.Insertar;
					parametros.data = Datos;

					return app.ajax.launch(parametros);		
				},
				Actualizar : function(Datos){
					var parametros = app.configuracion.modelos.dominio.productos.Actualizar;
					parametros.data = Datos;

					return app.ajax.launch(parametros);		
				},
                Eliminar : function(Id){
                    var parametros = app.configuracion.modelos.dominio.productos.Eliminar;
                    parametros.data = "{'Codigo' : '" + Id + "'}";

                    return app.ajax.launch(parametros);
                }
			},
			resumen: {
				Listado: function(){
					return app.ajax.launch(app.configuracion.modelos.dominio.resumen.Listado);	
				},
				Insertar : function(Datos){
					var parametros = app.configuracion.modelos.dominio.resumen.Insertar;
					parametros.data = Datos;

					return app.ajax.launch(parametros);		
				}
			},
			articulos : {
				Listado : function(Tipo){
					var parametros = app.configuracion.modelos.dominio.articulos.Listado;
					parametros.data = "{'Tipo' : '" + Tipo + "'}";

					return app.ajax.launch(app.configuracion.modelos.dominio.articulos.Listado);	
				},
				Buscar : function(Tipo, Campo, Valor){
					var parametros = app.configuracion.modelos.dominio.articulos.Buscar;
					parametros.data = "{'Tipo': '" + Tipo + "','Campo' : '" + Campo +"', 'Valor' : '" + Valor + "'}";

					return app.ajax.launch(parametros);		
				},
				Insertar : function(Datos){
					var parametros = app.configuracion.modelos.dominio.articulos.Actualizar;
					parametros.data = Datos;

					return app.ajax.launch(parametros);		
				},
                Eliminar : function(Tipo, IdResumen){
                    var parametros = app.configuracion.modelos.dominio.articulos.Eliminar;
                    parametros.data = "{'Tipo' : '" + Tipo + "', 'IdResumen' :'" + IdResumen +"'}";

                    return app.ajax.launch(app.configuracion.modelos.dominio.articulos.Eliminar);
                }
			},
			formularios :{
				Listado : function(){
					return app.ajax.launch(app.configuracion.modelos.dominio.formularios.Listado);	
				},
				Buscar : function(Campo , Valor){
					var parametros = app.configuracion.modelos.dominio.formularios.Buscar;
					parametros.data = "{'Campo' : '" + Campo + "', 'Valor' : '" + Valor + "'}";

					return app.ajax.launch(parametros);		
				},
				Actualizar : function(Datos){
					var parametros = app.configuracion.modelos.dominio.formularios.Actualizar;
					parametros.data = Datos;

					return app.ajax.launch(parametros);		
				}
			},
			operarios : {
				Listado : function(){
					return app.ajax.launch(app.configuracion.modelos.dominio.operarios.Listado);	
				},
				Buscar : function(Campo , Valor){
					var parametros = app.configuracion.modelos.dominio.operarios.Buscar;
					parametros.data = "{'Campo' : '" + Campo + "', 'Valor' : '" + Valor + "'}";

					return app.ajax.launch(parametros);		
				},
				Insertar : function(Datos){
					var parametros = app.configuracion.modelos.dominio.operarios.Insertar;
					parametros.data = Datos;

					return app.ajax.launch(parametros);		
				},
				Actualizar : function(Datos){
					var parametros = app.configuracion.modelos.dominio.operarios.Actualizar;
					parametros.data = Datos;

					return app.ajax.launch(parametros);		
				},
				Eliminar : function(Campo , Valor){
					var parametros = app.configuracion.modelos.dominio.operarios.Eliminar;
					parametros.data = "{'Campo' : '" + Campo + "', 'Valor' : '" + Valor + "'}";

					return app.ajax.launch(parametros);		
				},
				PorArticulo : function(Datos){
					var parametros = app.configuracion.modelos.dominio.operarios.PorArticulo;
					parametros.data = Datos;

					return app.ajax.launch(parametros);			
				}
			}
		},
		sharepoint: {
			info:{
				getGrupoUsuario : function(){
					return app.ajax.launch(app.configuracion.modelos.sharepoint.info.getGrupoUsuario);
				},
				Notificaciones : function(){
					return app.ajax.launch(app.configuracion.modelos.sharepoint.info.notificaciones);
				}
			}
		}
	},
	servicios : {
		productos : {
			Listado : function(){
				app.modelos.dominio.productos.Listado()
			    	  .done(
			    	  	function() {  
			    	  		app.log.debug('modelos.dominio.productos.Listado',arguments);
		    				app.eventos.publicar('modelos.dominio.productos.Listado', arguments);
				 	  })
			    	  .fail(
		    	  		function(){ 
		    				var mensaje = 'Error consultando el listado de productos';

	    					app.log.write(mensaje); 
    					}
			    	  );
			},
			Buscar : function(Campo, Valor){
				app.modelos.dominio.productos.Buscar(Campo, Valor)
			    	  .done(
			    	  	function() {  
			    	  		app.log.debug('modelos.dominio.productos.Buscar',arguments);
		    				app.eventos.publicar('modelos.dominio.productos.Buscar', arguments);
				 	  })
			    	  .fail(
		    	  		function(){ 
		    				var mensaje = 'Error buscando el producto con los parametros \n' + 
		    							  'Campo : ' + Campo + '     Valor: ' + Valor ;

	    					app.log.write(mensaje); 
    					}
			    	  );
			},
			Insertar : function(Datos){
				app.modelos.dominio.productos.Insertar(Datos)
			    	  .done(
			    	  	function() {  
			    	  		app.log.debug('modelos.dominio.productos.Insertar',arguments);
		    				app.eventos.publicar('modelos.dominio.productos.Insertar', arguments);
				 	  })
			    	  .fail(
		    	  		function(){ 
		    				var mensaje = 'Error insertando el producto.';

	    					app.log.write(mensaje); 
    					}
			    	  );	
			},
			Actualizar : function(Datos){
				app.modelos.dominio.productos.Insertar(Datos)
			    	  .done(
			    	  	function() {  
			    	  		app.log.debug('modelos.dominio.productos.Actualizar',arguments);
		    				app.eventos.publicar('modelos.dominio.productos.Actualizar', arguments);
				 	  })
			    	  .fail(
		    	  		function(){ 
		    				var mensaje = 'Error actualizando el producto.';

	    					app.log.write(mensaje); 
    					}
			    	  );	
			},
            Eliminar : function(Id){
                app.modelos.dominio.productos.Eliminar(Id)
                    .done(
                    function() {
                        app.log.debug('modelos.dominio.productos.Eliminar',arguments);
                        app.eventos.publicar('modelos.dominio.productos.Eliminar', arguments);
                    })
                    .fail(
                    function(){
                        var mensaje = 'Error actualizando el producto.';

                        app.log.write(mensaje);
                    }
                );
            }
		},
		resumen:{
			Listado : function(){
				app.modelos.dominio.resumen.Listado()
			    	  .done(
			    	  	function() {  
			    	  		app.log.debug('modelos.dominio.resumen.Listado',arguments);
		    				app.eventos.publicar('modelos.dominio.resumen.Listado', arguments);
				 	  })
			    	  .fail(
		    	  		function(){ 
		    				var mensaje = 'Error consultando el resumen del producto';

	    					app.log.write(mensaje); 
    					}
			    	  );
			},
			Insertar : function(Datos){
				app.modelos.dominio.resumen.Insertar(Datos)
			    	  .done(
			    	  	function() {  
			    	  		app.log.debug('modelos.dominio.resumen.Insertar',arguments);
		    				app.eventos.publicar('modelos.dominio.resumen.Insertar', arguments);
				 	  })
			    	  .fail(
		    	  		function(){ 
		    				var mensaje = 'Error insertando el nuevo producto.';

	    					app.log.write(mensaje); 
    					}
			    	  );	
			}
		},
		articulos : {
			Listado : function(Tipo){
				app.modelos.dominio.articulos.Listado(Tipo)
			    	  .done(
			    	  	function() {  
			    	  		app.log.debug('modelos.dominio.articulos.Listado.'+ Tipo,arguments);
		    				app.eventos.publicar('modelos.dominio.articulos.Listado', [Tipo, arguments]);
				 	  })
			    	  .fail(
		    	  		function(){ 
		    				var mensaje = 'Error consultando el listado de articulos';

	    					app.log.write(mensaje); 
	    				}
			    	  );
			},
			Insertar : function(Datos){
				app.modelos.dominio.articulos.Insertar(Datos)
			    	  .done(
			    	  	function() {  
			    	  		app.log.debug('modelos.dominio.articulos.Insertar',arguments);
		    				app.eventos.publicar('modelos.dominio.articulos.Insertar', arguments);
				 	  })
			    	  .fail(
		    	  		function(){ 
		    				var mensaje = 'Error insertando el artículos.';

	    					app.log.write(mensaje); 
    					}
			    	  );	
			},
			Buscar: function(Tipo, Campo, Valor){
				app.modelos.dominio.articulos.Buscar(Tipo, Campo, Valor)
					.done(
						function() {  
							app.eventos.publicar('modelos.dominio.articulos.Buscar', [Tipo, arguments]);
					  })
					.fail(
						function(){ 
						var mensaje = 'Error consultando en la busquedad del articulos';

						app.log.write(mensaje); 
					}
				);
			},
            Eliminar : function(Tipo, IdResumen){
                app.modelos.dominio.articulos.Eliminar(Tipo, IdResumen)
                    .done(
                    function() {
                        app.log.debug('modelos.dominio.articulos.Eliminar.'+ Tipo,arguments);
                        app.eventos.publicar('modelos.dominio.articulos.Eliminar', [Tipo, arguments]);
                    })
                    .fail(
                    function(){
                        var mensaje = 'Error Eliminando el articulos';

                        app.log.write(mensaje);
                    }
                );
            },
		},
		formularios : {
			Listado : function(){},
			Buscar : function(Campo, Valor){
				//app.modelos.dominio.formularios.Buscar('ID', $.QueryString["id"])
				app.modelos.dominio.formularios.Buscar(Campo, Valor)
			    	  .done(
			    		function() {  
		    				app.eventos.publicar('modelos.dominio.formularios.Buscar', arguments);
				 	}).fail(
		    			function(){ 
	    					alert('Error Cargando la listado busqueda de formularios')
    				}
		    	);
			},
			Actualizar : function(Datos){
				app.modelos.dominio.formularios.Actualizar(Datos)
					.done(
						function() {  
		    				app.eventos.publicar('modelos.dominio.formularios.Actualizar', arguments);
				 		}
					).fail(
		    			function(){ 
		    				var mensaje = 'Error actualizando el formulario';

	    					app.log.write(mensaje); 
    				}
				);
			}
		},
		operarios : {
			Listado : function(){},
			Buscar : function(Campo, Valor){
				//app.modelos.dominio.formularios.Buscar('ID', $.QueryString["id"])
				app.modelos.dominio.operarios.Buscar(Campo, Valor)
			    	  .done(
			    		function() {  
			    			app.log.debug('Resultado de busqueda de operarios' , arguments);
		    				app.eventos.publicar('modelos.dominio.operarios.Buscar', arguments);
				 	}).fail(
		    			function(){ 
	    					alert('Error cargando la busqueda de operarios')
    				}
		    	);
			},
			Actualizar : function(Datos){
				app.modelos.dominio.operarios.Actualizar(Datos)
					.done(
						function() {  
		    				app.eventos.publicar('modelos.dominio.operarios.actualizar', arguments);
				 		}
					).fail(
		    			function(arguments){ 
		    				var mensaje = 'Error actualizando el operario';

	    					app.log.write(mensaje); 
    					}
				);
			},
			Insertar : function(Datos){
				app.modelos.dominio.operarios.Insertar(Datos)
					.done(
						function() {  
		    				app.eventos.publicar('modelos.dominio.operarios.insertando', arguments);
				 		}
					).fail(
		    			function(){ 
		    				var mensaje = 'Error insertando el operario';

	    					app.log.write(mensaje); 
    				}
				);
			},
			Eliminar : function(Campo, Valor){
				app.modelos.dominio.operarios.Eliminar(Campo, Valor)
			    	  .done(
			    		function() {  
			    			arguments[0].d = { 'Eliminado': Valor };
			    			app.log.debug('Resultado de eliminar operario' , arguments);
		    				app.eventos.publicar('modelos.dominio.operarios.Eliminar', arguments);
				 	}).fail(
		    			function(){ 
	    					alert('Error eliminando el operario');
    				}
		    	);
			}
		},
		navision : {
			GetListado : function(Entidad){
				app.modelos.navision[Entidad].Listado().done( 
						function(){  app.eventos.publicar('modelos.navision.' + Entidad + '.Listado', arguments); }
					).fail(
						function(){ alert('Fail'); }
				);
			},
			ExisteProducto: function(Tipo , Codigo)
			{
				app.modelos.navision.productos.ExisteProducto(Tipo, Codigo).done( 
						function(){  
							app.log.debug('ExisteProducto', arguments);
							app.eventos.publicar('modelos.navision.productos.ExisteProducto', arguments); 
						}
					).fail(
						function(){ 
		    				var mensaje = 'Error comprondo producto en Navision';

	    					app.log.write(mensaje); 
    				}
				);
			},
			PasoANavision : function(Tipo, IdResumen){
				app.modelos.navision.productos.PasoANavision(Tipo, IdResumen).done( 
						function(){  
							app.log.debug('PasoANavision', arguments);
							app.eventos.publicar('modelos.navision.productos.PasoANavision', arguments); 
						}
					).fail(
						function(){ 
		    				var mensaje = 'Error pasando el producto a Navision';

	    					app.log.write(mensaje); 
    				}
				);
			},
			ConsultaPropiedades: function(Tipo , Codigo)
			{
				app.modelos.navision.productos.consultaPropiedades(Tipo, Codigo).done( 
						function(){  
							app.log.debug('ConsultaPropiedades', arguments);
							app.eventos.publicar('modelos.navision.productos.ConsultaPropiedades', arguments); 
						}
					).fail(
						function(){ 
		    				var mensaje = 'Error ConsultaPropiedades Navision';

	    					app.log.write(mensaje); 
    				}
				);
			},
			PorcentajeMerma : function(TipoPalet){
				app.modelos.navision.productos.porcentajeMerma(TipoPalet).done( 
						function(){  
							app.log.debug('PorcentajeMerma', arguments);
							app.eventos.publicar('modelos.navision.productos.PorcentajeMerma', arguments); 
						}
					).fail(
						function(){ 
		    				var mensaje = 'Error consultando el Porcentaje Merma en navision Navision';

	    					app.log.write(mensaje); 
    				}
				);
			},
			DimensionesPalet : function(Familia){
				app.modelos.navision.productos.dimensionesPalet(Familia).done( 
						function(){  
							app.log.debug('DimensionesPalet', arguments);
							app.eventos.publicar('modelos.navision.productos.DimensionesPalet', arguments); 
						}
					).fail(
						function(){ 
		    				var mensaje = 'Error consultando el Dimensiones Palet en navision Navision';

	    					app.log.write(mensaje); 
    				}
				);
			}
		},
		sharepoint : {
			GrupoUsuario : function(){
				app.modelos.sharepoint.info.getGrupoUsuario()
					.done(
						function() {  
		    				app.eventos.publicar('modelos.sharepoint.info.getGrupoUsuario', arguments);
		    				app.eventos.publicar('sharepoint.GrupoUsuario', arguments);
				 		}
					).fail(
		    			function(){ 
		    				var mensaje = 'Error consultando el grupo de sharepoint';

	    					app.log.write(mensaje); 
    				}
				);
			},
			Notificaciones : function(){
				app.modelos.sharepoint.info.Notificaciones()
					.done(
						function() {  
							app.log.debug('Notificaciones', arguments);
		    				app.eventos.publicar('modelos.sharepoint.info.Notificaciones', arguments);
		    				app.eventos.publicar('sharepoint.Notificaciones', arguments);
				 		}
					).fail(
		    			function(){ 
		    				var mensaje = 'Error consultando el grupo de sharepoint';

	    					app.log.write(mensaje); 
    				}
				);
			}
		}
	},
    utils : {
        Fecha : {
            Now : function(){
                var fecha = new Date();
                var dia = fecha.getDate();
                var mes = fecha.getMonth() + 1;

                if(dia.toString().length == 1)
                    dia = "0" + dia;

                if(mes.toString().length == 1)
                    mes = "0" + mes;

                return dia + "/"+ mes + "/" + fecha.getFullYear();
            },
            AddDays : function(fecha , dias){
                var nuevoDia = parseInt(fecha.substr(0, 2));
                var resto = fecha.substr(2, 8);
                nuevoDia += dias;

                if(nuevoDia.toString().length == 1)
                    nuevoDia = "0" + nuevoDia;

                return  nuevoDia + resto;

            },
            create : function(){
                var descomponerFecha = function(fecha){
                    return {
                        dia : parseInt(fecha.substr(0, 2)),
                        mes:  parseInt(fecha.substr(3,2)) - 1,
                        anyo : parseInt(fecha.substr(6,4))
                    };
                };

                var resultado = undefined;

                if(arguments.length == 1) {
                    //var fecha = descomponerFecha(arguments[0]);
                    var fecha = app.utils.Fecha.extraer(arguments[0]);
                    resultado =  new Date(fecha.anyo, fecha.mes, fecha.dia, 0 ,0 ,0, 0);
                }
                else {
                    resultado = new Date(arguments[2], arguments[1], arguments[0], 0 ,0 ,0, 0);
                }

                return resultado;
            },
            extraer : function(fecha){
                return {
                    dia : parseFloat(fecha.substr(0, 2)),
                    mes:  parseFloat(fecha.substr(3,2)) - 1,
                    anyo : parseFloat(fecha.substr(6,4))
                };
            }

        }
    }
};

if (!window.console) {
    window.console = {};
    window.console.log = function() {}
}