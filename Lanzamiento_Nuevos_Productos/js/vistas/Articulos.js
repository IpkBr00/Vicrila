function Articulos(options) {
	var camposSoporte = {};
	var camposSemiterminado = {};
    this.formBuilder = new FormBuilder();
    this.departamento = "";
    this.tipo = "";
    this.soportes = {};
    this.semiterminados = {};
    this.soporteBaseSeleccionado = {};
    this.semiterminadoBaseSeleccionado = {};

	this.init = function () {

		$('#id_Resumen').val($.QueryString["i"]);

	    if ($.QueryString["t"].indexOf("EMBALAJE") != -1)
	        this.tipo = "EMBALAJE";
	    else
	        this.tipo = $.QueryString["t"];

	    this.cache();
	    this.vincularEventos();
	    this.suscripciones();

        this.BuscarArticulo();
		app.servicios.sharepoint.GrupoUsuario();
	},
	this.cache = function () {
		$('#cambiarSoporte, #aceptarCambioSoporte, #cancelarCambioSoporte').button();
	},
	this.vincularEventos = function () {


		var self = this;
		$('#cambiarSoporte, #cancelarCambioSoporte').on('click', this.VisibilidadBaseSoporte );
		$('#cambiarSemiterminado, #cancelarCambioSemiterminado').on('click', this.VisibilidadBaseSemiterminado );

		$('#aceptarCambioSoporte').on('click',function(){
			var seleccion = $('#herenciaSoporteBloque input[type=radio]:checked');
			if(seleccion.length == 1)
			{
				$('#soporteBase').val(seleccion.val());
				$('#soporteBaseText').text(seleccion.val());
				$.proxy(self.CargarSoporteBaseEnSemiterminado(), self);

				self.VisibilidadBaseSoporte();
			}
			else
			{
				alert('Debes seleccionar un Artículo Soporte Base.');
			}
		});

		$('#aceptarCambioSemiterminado').on('click',function(){
			var seleccion = $('#herenciaSemiterminadoBloque input[type=radio]:checked');
			if(seleccion.length == 1)
			{
				$('#semiterminadoBase').val(seleccion.val());
				$('#semiterminadoBaseText').text(seleccion.val());
				$.proxy(self.CargarSemiterminadoBaseEnTerminado(), self);

				self.VisibilidadBaseSemiterminado();
			}
			else
			{
				alert('Debes seleccionar un Artículo Semiterminado Base.');
			}
		});

		$(document).delegate('#tablaOperarios .btnEliminar','click' , function(){
			var confirmacion = false;

			confirmacion = confirm('¿Esta seguro de que desea borrar el registro de la gama de personal?');

			if(confirmacion)
			{
				var fila = $(this).closest('tr');
				var idOperario = fila.attr('id').replace('operario-','');
				app.servicios.operarios.Eliminar("ID", idOperario);	
			}
		});

		$(document).delegate('table input#alto, table input#ancho,table input#longitud','change', function(){

			var resultado = 0;
			var alto = $('input#alto').val();
			var ancho = $('input#ancho').val();
			var longitud = $('input#longitud').val();

			resultado = Math.round((alto * ancho * longitud) / 1000000);
			$('input#volumen').val(resultado);
		});

		$(document).delegate('table input#dune14', 'blur', function(evt){  
			var theEvent = evt || window.event;
			var longitud = $(this).val().length;

			if( longitud < 14 || longitud > 14)
			{
				alert('El campo debe tener 14 caracteres y actualmente tiene ' + longitud);
	  			theEvent.returnValue = false;
	    		if(theEvent.preventDefault) theEvent.preventDefault();
	    		$(this).focus();
			}
		});

        $(document).delegate('table input#codePlan', 'blur', function(evt){
            var theEvent = evt || window.event;
            var longitud = $(this).val().length;

            if( longitud > 20)
            {
                alert('El campo puede tener como máximo 20 caracteres y actualmente tiene ' + longitud);
                theEvent.returnValue = false;
                if(theEvent.preventDefault) theEvent.preventDefault();
                $(this).focus();
            }
        });

        $(document).delegate('table input#cbPalet', 'blur', function(evt){
            var theEvent = evt || window.event;
            var longitud = $(this).val().length;

            if( longitud > 9)
            {
                alert('El campo puede tener como máximo 9 caracteres y actualmente tiene ' + longitud);
                theEvent.returnValue = false;
                if(theEvent.preventDefault) theEvent.preventDefault();
                $(this).focus();
            }
        });

		$(document).delegate('table input#cadenciaEstandar, table input#unidadesDeVenta, table input#unidadVentaPalet, table input#unidadesVentaPalet','change', function(){
			if( self.tipo === 'SEMITERMINADO' || self.tipo === 'TERMINADO')
			{ 
				self.CalculoNumLotes();
			}
		});
		$(document).delegate('table input#cadenciaEstandar, table input#unidadesDeVenta, table input#unidadVentaPalet, table input#unidadesVentaPalet','keyup', function(){
			if( self.tipo === 'SEMITERMINADO' || self.tipo === 'TERMINADO')
			{ 
				self.CalculoNumLotes();
			}
		});

		$(document).delegate('table input#plazoEntrega' , 'blur', function(evt){  
			var theEvent = evt || window.event;
			var valor = $(this).val().toUpperCase();

			if( valor.toUpperCase().replace(/(\d+)([D]{1})/,'') !== '')
			{
			   if( valor.replace(/(\d+)/,'') === '' )
			   {
			     $(this).val(valor + 'D');
			   }
			   else
			   {
			     alert('El valor introducido no coincide con el formato esperado. \n\nEjemplos: "1D", "15D" , "90D" ');
			     theEvent.returnValue = false;
	    		 if(theEvent.preventDefault) theEvent.preventDefault();
	    		 $(this).focus();
			   }
			}
			else
			{
				$(this).val(valor.toUpperCase());
			}
		});

		$(document).delegate('table #familiasCompra', 'change' , function(){
			app.servicios.navision.PorcentajeMerma($(this).val());
		});

	},
	this.CalculoNumLotes = function(){
        var velocidad = 0;
		var unidadesVenta = 0;
		var unidadesVentaPalet = 0;
		var campoNumPalets = "";
        var resultado = 1;

		velocidad = ( $('input#cadenciaEstandar').val() === '' ? 0 : $('input#cadenciaEstandar').val());

		if(this.tipo === 'SEMITERMINADO')
		{
			unidadesVenta = ( $('input#unidadesVenta').val() === '' ? 0 : $('input#unidadesVenta').val());
			unidadesVentaPalet = ( $('input#unidadVentaPalet').val() === '' ? 0 : $('input#unidadVentaPalet').val());
			campoNumPalets = "#numPaletsLoteControl";
		}
		else
		{
			unidadesVenta = ( $('input#unidadesDeVenta').val() === '' ? 0 : $('input#unidadesDeVenta').val());
			unidadesVentaPalet = ( $('input#unidadesVentaPalet').val() === '' ? 0 : $('input#unidadesVentaPalet').val());
			campoNumPalets = "#numPaletLoteControl";
		}

		if(velocidad !== 0 && unidadesVenta !== 0 && unidadesVentaPalet !== 0)
            resultado = (75*velocidad) /(unidadesVentaPalet * unidadesVenta);

        if(resultado < 1)
            resultado = 1;

        $(campoNumPalets).val( Math.round(resultado) );

	},
	this.suscripciones = function () {
	    $.subscribe('FormBuilder/guardar', $.proxy(this.Guardar, this));

		app.eventos.subscribir('FormBuilder/Inizializado', $.proxy(this.AplicarSeguridad, this));
		app.eventos.subscribir('FormBuilder/CargarRegistro', $.proxy(this.BuscarArticulo, this));

		app.eventos.subscribir('modelos.sharepoint.info.getGrupoUsuario', $.proxy(this.SetDepartamento, this));
	    app.eventos.subscribir('modelos.dominio.formularios.Buscar',$.proxy(this.RenderFomulario, this));
	    app.eventos.subscribir('modelos.dominio.articulos.Listado',$.proxy(this.CargarDatosHeredados , this));
		app.eventos.subscribir('modelos.dominio.articulos.Buscar', $.proxy(this.CargarRegistro, this));
	    app.eventos.subscribir('modelos.dominio.operarios.insertando', $.proxy(this.RefrescarOperario, this));
	    app.eventos.subscribir('modelos.dominio.operarios.actualizar', function(){ window.location = 'ResumenProducto.aspx'});
	    app.eventos.subscribir('modelos.dominio.operarios.Eliminar', $.proxy(this.EliminarOperario, this));

	    app.eventos.subscribir('UI/InsercionOperario', $.proxy(this.InsercionOperario, this));
	    app.eventos.subscribir('ActualizarArticulo', $.proxy(this.ActualizarArticuloProcess, this));
	    app.eventos.subscribir('modelos.dominio.articulos.Insertar', $.proxy(this.ActualizarArticuloProcess, this));
	    app.eventos.subscribir('CargaCombos', $.proxy(this.CargaCombos, this));
	    app.eventos.subscribir('modelos.navision.productos.PorcentajeMerma', $.proxy(this.SetMerma, this));
	},
	this.SetMerma = function(evento, respuesta){
		var datos = JSON.parse(respuesta[0].d);
		var operacion = JSON.parse(datos["Operacion"]);

		$('#porcentajeMermaEmbalaje').val(operacion[0].merma);
	},
	this.CargaCombos = function(evento, response){
		//app.log.debug('Combo', response);

		app.log.debug('Combo Datos', this.cacheData[response.nombre] );

        if( !(this.cacheData[response.nombre] == '' || this.cacheData[response.nombre] == null) )
            $('#' + response.nombre).val(this.cacheData[response.nombre]);
	},
	this.ActualizarArticuloProcess = function(evento, response){
		var respuesta = JSON.parse(response[0].d);

		if(respuesta.Estado == 'Error')
		{
			alert( respuesta["Mensaje"] + "\n\n" + respuesta["Detalles Error"] );
		}
		else
		{

			alert( respuesta["Mensaje"] );
			window.location = 'ResumenProducto.aspx';
		}

	},
	this.SetDepartamento = function(evento, respuesta){
		this.departamento = respuesta[0].d;
		this.formBuilder.departamento = respuesta[0].d;

		app.servicios.formularios.Buscar('tipo', this.tipo)
	},
	this.AplicarSeguridad = function(){
		var self = this;
		var seccion = "";

		$('.tituloSeccion').each(function(){
			seccion = $($(this).data('target')).attr('id');
			app.eventos.publicar('FormBuilder/DeshabilitarSeccion', seccion);
		});


        if(this.formBuilder.datos.tipo == "SOPORTE"){
            setTimeout(function(){
                self.gridUnidades = new gridUnidadesMedida(self.cacheData.codigo);
            }, 2000 );
        }
        if(this.formBuilder.datos.tipo == "SEMITERMINADO"){
            setTimeout(function(){
                self.gridUnidades = new gridUnidadesMedida(self.cacheData.codigo);
                self.gridReferencias = new gridReferenciasCruzadasCodigoBarras(self.cacheData.codigo);
            }, 2000 );
        }
        if(this.formBuilder.datos.tipo == "TERMINADO"){
            setTimeout(function(){
                self.gridUnidades = new gridUnidadesMedida(self.cacheData.codigo);
                self.gridReferencias = new gridReferenciasCruzadasCodigoBarras(self.cacheData.codigo);
                self.gridReferenciasCliente = new gridReferenciasCruzadasClientes(self.cacheData.codigo);
            }, 2000 );
        }
	},
	this.RenderFomulario = function (evento, respuesta){
		var formulario = JSON.parse(respuesta[0].d);
        var esquema = JSON.parse(formulario.esquema);
        var operarios = JSON.parse(formulario.operarios);

		this.formBuilder.suscripciones();
        app.eventos.publicar("FormBuilder/Inicializar", [formulario, esquema, $.QueryString["i"]]);
	},
	this.BuscarArticulo = function(){
		var tipo = "";

		$('#id_Resumen').val($.QueryString["i"]);

	    if ($.QueryString["t"].indexOf("EMBALAJE") != -1)
	        tipo = "EMBALAJE";
	    else
	        tipo = $.QueryString["t"];

		app.servicios.articulos.Buscar(tipo, 'id_Resumen', $.QueryString["i"]);
	},
	this.CargarRegistro = function(evento, respuesta){		

		var datos = JSON.parse(respuesta[1][0].d);

		app.log.debug('Carga de registro de Datos ' , datos);

        if(this.cacheData == undefined)
        {
            this.cacheData  = datos;

            if(this.tipo == 'SEMITERMINADO')
            {

                $('#soporteBase').val(datos["soporteBase"]);
                app.servicios.articulos.Listado('SOPORTE');
                this.CalculoNumLotes();
            }
            else if(this.tipo == 'TERMINADO'){
                $('#soporteBase').val(datos["soporteBase"]);
                $('#semiterminadoBase').val(datos["semiterminadoBase"]);
                app.servicios.articulos.Listado('SOPORTE');
                app.servicios.articulos.Listado('SEMITERMINADO');
                this.CalculoNumLotes();
            }
        }


		var self = this;
		$.each(datos, function(k,v){

			if( !(v == '' || v == null) )
			{

				if( $('#' + k).attr('type')  == 'checkbox' ) 
				{
					if(v == 'SI')
						$('#' + k).attr('checked',  'checked');
					else
						$('#' + k).attr('checked');
				}
				else
				{
					
				    //app.log.debug('la coleccion de combos es ...', self.formBuilder.ColeccionCombos);

				     /*TODO : Revisar esto
					$(self.formBuilder.ColeccionCombos).each(function(){
						if (this.nombre == k)
						{

							if(this.cargado)
							{
								$('#' + k).val(v);	
						    	app.log.debug('Al cargar registro '+ this.nombre, "Si");	
							}
							else
							{
								app.log.debug('Al cargar registro ' + this.nombre, "No");
								
								$('#' + k).val(v);	
							}
						}
					});
					*/

					$('#' + k).val(v);	
					
				}

				
			}
		});




	    if($.QueryString["N"] == 'true')
	    {
	    	$('input').each(function(){ $(this).attr('disabled', true)});
			$('select').each(function(){ $(this).attr('disabled', true)});
			$('#btnCancelar').attr('disabled', false);

	    }


		if($('#codigo5Digitos').length == 1)
		{
			var codigoOriginal = $('#codigo').val();
			if( codigoOriginal != '' && codigoOriginal.length >= 5)
			{
				$('#codigo5Digitos').val(codigoOriginal.substring(0,5));
			}
			
		}

		$('#infoTipo').text(this.tipo);
		$('#infoCodigo').text(datos.codigo);
		$('#infoDescripcion').text(datos.descripcion + ((datos.descripcion2 == null) ? "" : datos.descripcion2));

		if($.QueryString["N"] == 'false')
	    {
			app.eventos.publicar('FormBuilder/HabilitarSeccion', this.departamento);
		}

	},
	this.Guardar = function(){
		var parametros;
		var output;

		if(this.departamento == 'Produccion' )
		{
			output = inputToJson('#'+ this.departamento + ' #tablaSeccion');
			parametros =  JSON.stringify({Registro: this.formBuilder.operarios });	
			app.servicios.operarios.Actualizar(parametros );
		}
		else
			output = inputToJson('#'+ this.departamento  + ' #tablaSeccion');

		//var output = inputToJson('#'+ this.departamento);
		output["id_Resumen"] = $('#id_Resumen').val();
		if(this.tipo == 'SEMITERMINADO')
	    {
	    	output["soporteBase"] = $('#soporteBase').val()
	    }
	    else if(this.tipo == 'TERMINADO'){
	    	output["soporteBase"] = $('#soporteBase').val()
	    	output["semiterminadoBase"] = $('#semiterminadoBase').val()
	    }

		this.departamento = this.departamento.replace(this.departamento[0] , this.departamento[0].toLowerCase());
		if(this.departamento == 'desarrolloProducto')
			this.departamento = 'desarrollo';

		if(this.departamento == 'produccion2' )
		{
			parametros =  JSON.stringify({Registro: this.formBuilder.operarios });	
			app.servicios.operarios.Actualizar(parametros);
		}
		else
		{
			app.log.debug('Seccion a guardar', output);
            var validoParaGuardar = true;

            if(this.tipo == 'SOPORTE' || this.tipo == 'SEMITERMINADO' || this.tipo == 'TERMINADO'){
                var unidadesMedidaValidas = this.gridUnidades.validarRegistros();
                validoParaGuardar = unidadesMedidaValidas;

                if(!unidadesMedidaValidas){
                    alert('Comprueba las unidades de medida.');
                }
            }

            if(validoParaGuardar)
            {
                parametros =  JSON.stringify({Tipo: $.QueryString["t"], Departamento: this.departamento , Registro: output });
                app.servicios.articulos.Insertar(parametros);
            }

		}
	},
	this.LimpiarFormulario = function () {
	    $('#formulario input[type=hidden]').each(function () { $(this).val(''); });
	    $('#formulario input[type=text]').each(function () { $(this).val(''); });
	    $('#formulario input[type=checkbox]').each(function () { $(this).attr('checked', false); });
	    $('#formulario textarea').each(function () { $(this).val(''); });
	},
	this.InsercionOperario = function(evento, respuesta){
		var operario = JSON.stringify({Registro: respuesta[0]});
		app.servicios.operarios.Insertar(operario);
	},
	this.RefrescarOperario = function(evento, respuesta){
		var datos = JSON.parse(respuesta[0].d);

		$(frm.formBuilder.operarios).each(function(){
			if(this.NumeroLinea == datos.NumeroLinea)
			{
				this.ID = datos.ID;
			}
		});

		$('#operario-').attr('id', 'operario-' + datos.ID);
	},
	this.RenderSoportesBase = function(datos){


		$('#templateBaseSoporte').tmpl(datos).appendTo('#basesSoporte tbody');
	},
	this.RenderSemiterminadosBase = function(datos){


		$('#templateBaseSemiterminado').tmpl(datos).appendTo('#basesSemiterminado tbody');
	},
	this.EliminarOperario = function(evento, respuesta){
		var datos = respuesta[0].d;
		$('#operario-' + datos.Eliminado).remove();
	},
	this.InicailizarSoportesBase = function(){
		var self = this;
		var seleccion = $('#soporteBase').val();
		if(seleccion == '')
		{
			$('#soporteBaseText').text('< NO SELECCIONADO >');
			$('#cambiarSoporte').click();
			alert('Debe seleccionar un articulo soporte para extraer los datos necesarios.')
		}
		else
		{
			$('#'+seleccion).attr('checked','checked');
			$('#soporteBaseText').text(seleccion);
		}

		var indice = 0;
		var valido = true;

		$(this.soportes).each(function(){
			valido = true;

			$(camposSoporte[self.departamento]).each(function(k,v){
				valido = valido && (self.soportes[indice][this.origen] != null);
			});
			
			self.soportes[indice].esValido = valido;

			if(!valido)
				$('#' + this.codigo).attr('disabled','disabled');

			indice++;
		});

	},
	this.IniacilizarSemiterminadosBase = function(){
		var self = this;
		var seleccion = $('#semiterminadoBase').val();
		if(seleccion == '')
		{
			$('#semiterminadoBaseText').text('< NO SELECCIONADO >');
			$('#cambiarSemiterminado').click();
			alert('Debe seleccionar un articulo semiterminado para extraer los datos necesarios.')
		}
		else
		{
			$('#'+seleccion).attr('checked','checked');
			$('#semiterminadoBaseText').text(seleccion);
		}

		var indice = 0;
		var valido = true;

		$(this.semiterminados).each(function(){

			valido = true;

			$(camposSemiterminado[self.departamento]).each(function(k,v){
				valido = valido && (self.semiterminados[indice][this.origen] != null);
			});
			
			self.semiterminados[indice].esValido = valido;

			if(!valido)
				$('#' + this.codigo).attr('disabled','disabled');

			indice++;
		});

	},
	this.CargarSoporteBaseEnSemiterminado =function(){
		var self = this;
		var codigo = $('#soporteBase').val();
		var soporteSeleccionado;

		if(codigo != '')
		{
			$(this.soportes).each(function(){
				if(this.codigo == codigo )
                {
                    soporteSeleccionado = this;
                    self.soporteBaseSeleccionado = soporteSeleccionado;
                }

			});

			var valorActual = '';
			var valorSoporte = '';

			$(camposSoporte[self.departamento]).each(function(k,v){
				valorActual = $('#' + this.destino).val();
				valorSoporte = soporteSeleccionado[this.origen];
			
				if(valorActual == '' || valorActual == null || valorActual == '0')
				{
					if(valorSoporte != '' || valorSoporte != null)
					{
						 $('#'+ this.destino).val(valorSoporte);
					}
				}
			});
		}
	},
	this.CargarSemiterminadoBaseEnTerminado = function(){
		var self = this;
		var codigo = $('#semiterminadoBase').val();
		var semiterminadoSeleccionado;

		if(codigo != '')
		{
			$(this.semiterminados).each(function(){
				if(this.codigo == codigo )
                {
                    semiterminadoSeleccionado = this;
                    self.semiterminadoBaseSeleccionado = semiterminadoSeleccionado;
                }
			});

			var valorActual = '';
			var valorSemiterminado = '';

			$(camposSemiterminado[self.departamento]).each(function(k,v){
				valorActual = $('#' + this.destino).val();
				valorSemiterminado = semiterminadoSeleccionado[this.origen];

				if(valorActual == '' || valorActual == null || valorActual == '0')
				{
					if(valorSemiterminado != '' || valorSemiterminado != null)
					{
						 $('#'+ this.destino).val(valorSemiterminado);
					}
				}
			});
		}
	},
	this.CamposSoporteASemiterminado = function(){
		camposSoporte = {};
		camposSoporte.DesarrolloProducto = [];
		camposSoporte.DesarrolloProducto.push({destino:"claseVidrio", origen:"claseVidrio"});
		camposSoporte.DesarrolloProducto.push({destino:"tratamientoTermico", origen:"tratamientoTermico"});
		camposSoporte.DesarrolloProducto.push({destino:"fdf", origen:"fdf"});
		camposSoporte.DesarrolloProducto.push({destino:"pesoNetoArticulo", origen:"pesoNeto"});

		camposSoporte.Produccion = [];
		camposSoporte.Produccion.push({destino: "cadenciaEstandar", origen:"cadenciaEstandar"});
		camposSoporte.Produccion.push({destino: "rendimientoEstandar", origen:"rendimientoEstandar"});
	},
	this.CamposSoporteATerminado = function(){
		camposSoporte = {};
		camposSoporte.DesarrolloProducto = [];
		camposSoporte.DesarrolloProducto.push({destino:"fdf", origen:"fdf"});
		camposSoporte.DesarrolloProducto.push({destino:"pesoNetoUnidadVenta", origen:"pesoNeto"});

		camposSoporte.Produccion = [];
		camposSoporte.Produccion.push({destino: "cadenciaEstandar", origen:"cadenciaEstandar"});
		camposSoporte.Produccion.push({destino: "rendimientoEstandar", origen:"rendimientoEstandar"});
	},
	this.CamposSemiterminadoATerminado = function(){
		camposSemiterminado = {};
		camposSemiterminado.DesarrolloProducto = [];
		camposSemiterminado.DesarrolloProducto.push({destino:"decorado", origen:"decorado"});
		camposSemiterminado.DesarrolloProducto.push({destino:"serie", origen:"serie"});
	},
	this.CargarDatosHeredados = function(evento, respuesta){
        var self = this;
		var articulo = JSON.parse(respuesta[1][0].d);
		var departamento = this.departamento;
		var valido = true;

		if(this.tipo == 'SEMITERMINADO')
		{		
			if(respuesta[0] == 'SOPORTE')
			{
				
				this.soportes = articulo;
				this.CamposSoporteASemiterminado();

				if(camposSoporte[this.departamento] != undefined)
				{
					$('#herenciaSoporte').removeClass('noDisplay');
					this.RenderSoportesBase(articulo);
					$.proxy( this.InicailizarSoportesBase(),this );
					$.proxy( this.CargarSoporteBaseEnSemiterminado(), this);
				}
			}

            $('#pesoBrutoArticulo, #pesoNetoArticulo, #unidadVentaPalet').change(
                function(){

                    if( !$.isEmptyObject(self.soporteBaseSeleccionado) )
                    {
                        var pesoNetoSoporte = self.soporteBaseSeleccionado.pesoNeto;
                        var pesoBrutoArticulo = parseFloat($('#pesoBrutoArticulo').val());
                        var unidadesVentaPalet = parseFloat($('#unidadVentaPalet').val());
                        var unidadesDeVenta = parseFloat($('#unidadesVenta').val());

                        if( !(isNaN(unidadesVentaPalet) || unidadesVentaPalet == 0) )
                        {
                            if( !(isNaN(unidadesDeVenta) || unidadesDeVenta == 0) )
                                $('#pesoNetoPalet').val(pesoNetoSoporte * unidadesVentaPalet);

                            if( !(isNaN(pesoBrutoArticulo) || pesoBrutoArticulo == 0) )
                            {
                                $('#pesoBrutoPalet').val(pesoBrutoArticulo * unidadesVentaPalet);
                            }
                        }
                    }
                }
            );
		}
		else if(this.tipo == 'TERMINADO')
		{
			if(respuesta[0] == 'SOPORTE')
			{
				this.soportes = articulo;
				this.CamposSoporteATerminado();

				if(camposSoporte[this.departamento] != undefined)
				{
					$('#herenciaSoporte').removeClass('noDisplay');
					this.RenderSoportesBase(articulo);
					$.proxy( this.InicailizarSoportesBase(),this );
					$.proxy( this.CargarSoporteBaseEnSemiterminado(), this);
				}
			}
			else if(respuesta[0] == 'SEMITERMINADO')
			{
				this.semiterminados = articulo;
				this.CamposSemiterminadoATerminado();

				if(camposSemiterminado[this.departamento] != undefined)
				{
					$('#herenciaSemiterminado').removeClass('noDisplay');
					this.RenderSemiterminadosBase(articulo);
					$.proxy( this.IniacilizarSemiterminadosBase(),this );
					$.proxy( this.CargarSemiterminadoBaseEnTerminado(), this);
				}
				
			}

            $('#pesoBrutoUnidadVenta, #pesoNetoUnidadVenta, #unidadesVentaPalet, #unidadesDeVenta').change(
                function(){

                    if( !$.isEmptyObject(self.soporteBaseSeleccionado) )
                    {
                        var pesoNetoSoporte = self.soporteBaseSeleccionado.pesoNeto;
                        var pesoBrutoUnidadVenta = parseFloat($('#pesoBrutoUnidadVenta').val());
                        var unidadesVentaPalet = parseFloat($('#unidadesVentaPalet').val());
                        var unidadesDeVenta = parseFloat($('#unidadesDeVenta').val());

                        if( !(isNaN(unidadesVentaPalet) || unidadesVentaPalet == 0) )
                        {


                            if( !(isNaN(unidadesDeVenta) || unidadesDeVenta == 0) )
                            {
                                $('#pesoNetoUnidadVenta').val(pesoNetoSoporte * unidadesDeVenta );
                                $('#pesoNetoPalet').val(pesoNetoSoporte * unidadesDeVenta * unidadesVentaPalet);
                            }


                            if( !(isNaN(pesoBrutoUnidadVenta) || pesoBrutoUnidadVenta == 0) )
                            {
                                $('#pesoBrutoPalet').val(pesoBrutoUnidadVenta * unidadesVentaPalet);
                            }
                        }
                    }
                }
            );
		}

        this.CalculoNumLotes();
	},
	this.VisibilidadBaseSoporte = function(){
		$('#cambiarSoporte, #aceptarCambioSoporte, #cancelarCambioSoporte').toggle();
		$('#herenciaSoporteBloque').toggleClass('noDisplay');
	},
	this.VisibilidadBaseSemiterminado = function(){
		$('#cambiarSemiterminado, #aceptarCambioSemiterminado, #cancelarCambioSemiterminado').toggle();
		$('#herenciaSemiterminadoBloque').toggleClass('noDisplay');
	}
};



