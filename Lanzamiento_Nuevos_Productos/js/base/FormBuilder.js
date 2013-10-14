function cargarCampoDelay(nombre, valor)
{
	//$('#' + nombre).val(valor);	
}

function FormBuilder(options){
	var datos = {};
	var esquema = {};
	var defaults = {};
	var modelo = {};
	var tipo = '';
	var id = '';

	this.ColeccionCombos = [],
	this.init = function(datos, esquema, id, departamento, operarios){
		var self = this;

		self.datos = datos;
		self.esquema = esquema;
		self.defaults = defaults;
		self.id = id;
		self.tipo = tipo;
		self.departamento = departamento;
		self.operarios = operarios;
		
		self.cache();
		self.vincularEventos();
		self.inicializarControlErrores();
		self.crearFormulario('Colapsables');
		self.visibilidadPanelErrores(false);
        /*
        if(datos.tipo = "SEMITERMINADO")
        {
            self.gridReferencias = new gridReferenciasCruzadasCodigoBarras();
        }
        else if(datos.Tipo = "TERMINADO")
        {
            self.gridReferencias = new gridReferenciasCruzadasCodigoBarras();
            self.gridReferenciasCliente = new gridReferenciasCruzadasClientes();
        }
*/
		app.eventos.publicar('FormBuilder/Inizializado',{});
	},
	this.cache = function(){
		this.btnViewTabla = $('#btnViewTabla');
		this.btnViewMultipleTablas = $('#btnViewMultipleTablas');
		this.btnViewColapsables = $('#btnViewColapsables');
		this.panelErrores = $("#errores");
		this.formulario = $('#aspnetForm');
		this.btnGuardar = $('#btnGuardar');
		this.btnCancelar = $('#btnCancelar');
		this.plantillaFilaOperario = $('#filaOperarioTemplate');
	},
	this.vincularEventos = function(){
		var self = this;

		// EVENTOS VISTAS
		this.btnViewTabla.click( function(){self.cambiarVista('Tabla'); });
		this.btnViewMultipleTablas.click( function(){self.cambiarVista('MultiTabla');});
		this.btnViewColapsables.click( function(){self.cambiarVista('Colapsables');});

		// EVENTOS BOTONES ACCIONES
		this.btnCancelar.click( function(){ self.cancelar(); });
		this.btnGuardar.click( $.proxy( this.guardar, this) );

		this.formulario.delegate("#btnAddOperario", "click", function(){
	    	self.InsertarOperario();
	    });

	    this.formulario.delegate('#tablaOperarios .valorOperario', 'change' ,
			function(){
                alert('Cambiamos el valor');
				var codigo = $(this).attr('id');
				var nuevoValor = $(this).val();
				app.log.debug('Buscamos el operario : '+ codigo, codigo	);
				$(frm.formBuilder.operarios).each(function(){
					if(this.codigoActividad == codigo)
					{
						app.log.debug('operario encontrado', this);
						this.numero = nuevoValor;
						app.log.debug('operario modificado', this);
					}
				})
			}
		);

		this.formulario.delegate('#container input.numerico', 'keypress' ,
			function(evt){  
				var theEvent = evt || window.event;
		  		var key = theEvent.keyCode || theEvent.which;
		  		key = String.fromCharCode( key );
		  		if(key == ',') key = '.';
		  		var regex = /[0-9]|\./;

//		  		if($(this).hasClass('required'))	
//					regex = /[1-9]|\./;		  			

                app.log.debug('keypress', [key, $(this).val()]);

		  		if( !regex.test(key) ) { 
		  			app.log.debug('Campos numerico', this);
		  		//	if($(this).hasClass('required'))	
		  		//		alert('Este campo solo acepta valores númericos mayores de 0');
		  		//	else
		  				alert('Este campo solo acepta valores númericos');
		  			
		  			theEvent.returnValue = false;
		    		if(theEvent.preventDefault) theEvent.preventDefault();
				}
			}
		);

		this.formulario.delegate('#container input.numerico', 'blur' ,
			function(evt){
				var theEvent = evt || window.event;
				var valor = $(this).val();
				var numero = 0;
				

				if($(this).hasClass('required'))
				{
					if( valor == '')
						numero = 0;
					else
						numero = parseInt(valor) ;

					if(numero == 0)
			  		{
			  			alert('Este campo solo acepta valores númericos mayores de 0');
			  			theEvent.returnValue = false;
			    		if(theEvent.preventDefault) theEvent.preventDefault();
                        $(this).val('');
			    		//$(this).focus();
			  		}

				}
			  	
			}
		);

		this.formulario.delegate('#tablaOperarios .eliminarOperario', 'click' ,
			function(){ 
				var fila = $(this).closest('tr');
				var codigo = fila.attr('id');

				$(frm.formBuilder.operarios).each(function(){
					if(this.codigoActividad == codigo)
					{
						app.log.debug('operario encontrado', this);
						this.numero = nuevoValor;
						app.log.debug('operario modificado', this);
					}
				})

				$(fila).remove();
			}
		);

	},
	this.suscripciones = function () {
		app.eventos.subscribir('FormBuilder/Inicializar', $.proxy(this.Inicializar, this));
		app.eventos.subscribir('FormBuilder/HabilitarSeccion', $.proxy(this.habilitarSeccion, this));
		app.eventos.subscribir('FormBuilder/DeshabilitarSeccion', $.proxy(this.deshabilitarSeccion, this));
	},
	this.Inicializar = function(evento, respuesta){
        console.log('Inicializar');
        console.log(respuesta);
		this.init(respuesta[0],respuesta[1],respuesta[2]);
	},
	this.inicializarControlErrores = function(){
		var self = this;

		this.formulario.validate({
			invalidHandler: function(form, validator) {
				var errors = validator.numberOfInvalids();
				if (errors) {
					var message = errors == 1
					  ? 'Te falta de rellenar 1 campo. Ha sido resaltado.'
					  : 'Te faltan ' + errors + ' campos. Han sido resaltados.';

					self.panelErrores.html(message);
					self.visibilidadPanelErrores(true);
				} 
				else {
					self.visibilidadPanelErrores(false);
				}
		    }
		});

	},
	this.crearFormulario = function(vista){
		var self = this;
		switch(vista){
  			case 'Tabla':
  				this.vistaTabla();
  			break;
  			case 'MultiTabla':
				this.vistaMultiTabla();
  			break;
  			case 'Colapsables':
  				this.vistaColapsables();
  			break;
  			default:
	  			this.vistaTabla();
  			break;
  		}

  		this.cargarCombos();
  		this.cargarValoresPorDefecto();

  		app.eventos.publicar('FormBuilder/CargarRegistro');
	},
	this.cargarCombos = function(){
		var self = this;
  		$.each(this.esquema, function(){
  			var seccion = this;

			if(seccion.Seccion != "Produccion")
			{
	  			$.each(seccion.Campos,function(){
	  				if(this.tipo == 'combo'){

	  					var comprobacion = {};
	  					comprobacion.nombre = this.nombre;
	  					comprobacion.fuente = this.fuente;
	  					comprobacion.numeroRegistros = 0;
	  					comprobacion.cargado = false;
	  					
	  					self.ColeccionCombos.push( comprobacion );

	  					//app.log.debug('comprobacion', 	self.ColeccionCombos);

						var campo = this;

						$.ajax({
						    type: "POST",
						    contentType: "application/json; charset=utf-8",
							url: 'Ajax.aspx/Navision',
							dataType: 'json',
							data : "{'Fuente' : '" + campo.fuente + "'}",
							beforeSend: function(){
								$('#'+ campo.nombre).attr('disabled', 'disabled');
							},
							success: function(data, textStatus, jqXHR){
								var datos = JSON.parse(data.d);
								var resultado = [];

								var tieneDescription = datos[0].hasOwnProperty('Description');
								var tieneDescripcion = datos[0].hasOwnProperty('Descripcion');
								var tieneDescripcionTilde = datos[0].hasOwnProperty('Descripción');

								if(tieneDescription){
									if(campo.fuente == "rutasProducto" || campo.fuente == 'codigosArancelarios')
									{
										$(datos).each(function(){
											if(this.No != null || this.Description != null)
												resultado.push({valor:this.No, texto: this.Description});
										});
									}
									else
									{
										$(datos).each(function(){
											if(this.Code != null || this.Description != null)
												resultado.push({valor:this.Code, texto: this.Description});
										});	
									}
									
								}
								if(tieneDescripcion){
									$(datos).each(function(){
										if(this.Codigo != null || this.Descripcion != null)
											resultado.push({valor:this.Codigo, texto: this.Descripcion});
									});
								}
								if(tieneDescripcionTilde){
									$(datos).each(function(){
										if(this.Código != null || this.Descripción != null)
											resultado.push({valor:this.Código, texto: this.Descripción});
									});
								}
								if(campo.fuente == "bomProducto")
								{
									$(datos).each(function(){
										if(this.No != null )
											resultado.push({valor:this.No, texto: ''});
									});
								}
								if(campo.fuente == "divisionAlmacen")
								{
									$(datos).each(function(){
										if(this.C != null  && this.D != null)
											resultado.push({valor:this.C, texto: this.D});
									});	
								}

								//$('#'+ campo.nombre).removeAttr('disabled');
								var html = $('#comboTemplate').tmpl(resultado);
								$('#comboTemplate').tmpl(resultado).appendTo('#' + campo.nombre);

								//app.log.debug('Resultado consulta ' + campo.fuente , resultado);
								//app.log.debug('Resultado consulta html ' + campo.fuente , html);

								//$('#comboTemplate').tmpl(resultado).appendTo('#' + campo.nombre);
								//app.log.debug('HTML ' + campo.nombre, html);
								if(campo.defecto !== '')
								{
                                    $(html).val(campo.defecto);
									$('#' + campo.nombre).val(campo.defecto);	
									//setTimeout('cargarCampoDelay('+ campo.nombre +','+ campo.defecto +')',10000);
								}

								comprobacion.numeroRegistros = html.length;
								comprobacion.cargado = true;
								app.eventos.publicar('CargaCombos', campo);
							},
							error: function(jqXHR, textStatus, errorThrown){
								alert( '*** Error *** \n Metodo: Buscar \n Mensaje: ' +  errorThrown );
							}
						});	
	  				}
	  			});
			}

		});	
	},
	this.cargarValoresPorDefecto = function(){
		var self = this;
  		$.each(this.esquema, function(){
  			var seccion = this;
  			$.each(seccion.Campos,function(){
  				if(this.defecto != '')
  				{
	  				if(this.tipo == 'combo'){
	  					$('#' + this.nombre).val(this.defecto);	
	  					$('#' + this.nombre).addClass('required');
	  					$('#' + this.nombre).addClass('default');
	  					$('#' + this.nombre).attr('disabled', true);
	  				}
					else
					{	
	  					$('#' + this.nombre).val(this.defecto);	
	  					$('#' + this.nombre).addClass('required');
	  					$('#' + this.nombre).addClass('default');
	  					$('#' + this.nombre).attr('disabled', true);
	  				}
  				}
  			});
		});
	},
	this.cambiarVista = function(vista){},
	this.vistaTabla = function(){
		// Una tabla para todo con un colpsan 2 para los titulo
		$('<table id="tablaElementos" class="table table-bordered table-condensed"></table>').appendTo("#container");
		$('#seccionTemplate').tmpl(this.esquema).appendTo('#tablaElementos');
	},
	this.vistaMultiTabla = function(){
		// Tabla por seccion
		$('#seccionTablaTemplate').tmpl(this.esquema).appendTo('#container');
	},
	this.vistaColapsables = function(){
		// Divs colapsables por seccion
		$('#seccionCollapsableTemplate').tmpl(this.esquema).appendTo('#container');

		if( typeof this.buscarSeccion('Produccion') == 'object' )
		{
			app.servicios.operarios.Buscar('id_Resumen', this.id);
			app.servicios.navision.GetListado('operarios');
			app.eventos.subscribir('modelos.dominio.operarios.Buscar', $.proxy(this.RenderOperarios, this));
			app.eventos.subscribir('modelos.navision.operarios.Listado', $.proxy(this.RenderComboOperarios, this));
		}
	},
	this.visibilidadPanelErrores = function(visible){
		if(visible)
			this.panelErrores.show();
		else
			this.panelErrores.hide();
	},
	this.guardar = function(){
		var esValido = this.formulario.validate().form();
		if(!esValido)
		{
			alert('Hay errores en el formulario revisalos para guardar.');
			this.formulario.validate().focusInvalid();
		}
		else
		{
			alert('Formulario válido');
			$.publish('FormBuilder/guardar');	
		}
	},
	this.cancelar = function(){
		window.location = 'ResumenProducto.aspx';
	},
	this.esAlta = function(){
		return $('#id').val() == '0';
	},
	this.deshabilitarSeccion = function(evento, Idseccion){

		$('#'+ Idseccion +' input').each(function(){ $(this).attr('disabled', true) });
		$('#'+ Idseccion +' select').each(function(){ $(this).attr('disabled', true) });

		$('#'+ Idseccion).collapse('hide');
	},
	this.habilitarSeccion = function(evento, Idseccion){

		$('#'+ Idseccion +' input').each(function(){ if(!$(this).hasClass('default')) $(this).attr('disabled', false)});
		$('#'+ Idseccion +' select').each(function(){  if(!$(this).hasClass('default')) $(this).attr('disabled', false)});

		$('#'+ Idseccion).collapse('show');
	},
	this.buscarSeccion = function(Nombre){
		var Id =  Nombre;
		arr = jQuery.grep(this.esquema, function(n, i){
			return n.Id ==Id;
		});
		this.seccionActual = arr[0];
		app.eventos.publicar('buscarSeccion' , [arr[0]]);
		return arr[0];
	},
	this.RenderOperarios = function(evento, respuesta){
		var datos = JSON.parse(respuesta[0].d);
		this.operarios = datos;

		$('#filaOperarioTemplate').tmpl(datos).appendTo('#tablaOperarios tbody');	
	},
	this.RenderComboOperarios = function(evento, respuesta){
		var maestroOperarios =  JSON.parse(respuesta[0].d);
		app.log.debug('Combo Operarios', maestroOperarios);

		$('#comboOperariosTemplate').tmpl(maestroOperarios).appendTo('#cmbOperarios');
	},
	this.InsertarOperario = function(){
		cmbOperarios = $('#cmbOperarios');
		txtValorOperario = $('#valorActividad');
		//tablaOperarios = $('#tablaOperarios tbody');

		var codigo = cmbOperarios.val();

		$(this.operarios).each(function(){
			if(this.codigoActividad == codigo)
				alert('Repetido');
		});
		
		var nuevoOperario = {};
		nuevoOperario.id_Resumen = $.QueryString["i"];
		nuevoOperario.Title = null;
		nuevoOperario.numProducto = null;
		nuevoOperario.NumeroLinea = parseInt(this.operarios[this.operarios.length - 1].NumeroLinea) + 10000;
		nuevoOperario.NumeroActividad = cmbOperarios.val();
		nuevoOperario.codigoActividad = cmbOperarios.val();
		nuevoOperario.descripcion = $.trim($(':selected', cmbOperarios).text().replace(nuevoOperario.codigoActividad + ' - ', ''));
		nuevoOperario.numero = txtValorOperario.val();

		this.operarios.push(nuevoOperario);

		this.plantillaFilaOperario.tmpl(nuevoOperario).appendTo('#tablaOperarios tbody');

		cmbOperarios.val('');
		txtValorOperario.val('0,0');

		//this.formulario.insertarCampo(nuevoOperario);

		app.eventos.publicar('UI/InsercionOperario', [nuevoOperario]);
	}

}
