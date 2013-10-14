var UI = {
	nombreFormulario : "formulario",
	urlJson : "js/script/configuraciones/formularios/frmArticuloSoporte.json",
	urlDefaults : "js/script/configuraciones/formularios/frmArticuloSoporte.defaults.json",
	
	// METODOS INICIALIZACION FORMULARIO
	Init : function(){
	    this.PanelErrores(false);
		this.VincularEventos();
		this.InicializarControlErrores();
		this.CrearFormulario();
	},
	VincularEventos : function(){
		// EVENTOS VISTAS
		$('#btnViewTabla').click( function(){UI.CambiarVista('Tabla'); });
		$('#btnViewMultipleTablas').click( function(){UI.CambiarVista('MultiTabla');});
		$('#btnViewColapsables').click( function(){UI.CambiarVista('Colapsables');});

		// EVENTOS BOTONES ACCIONES
		$('#btnCancelar').click( function(){ UI.Cancelar(); });
		$('#btnGuardar').click( function(){ UI.Guardar(); });		
	},
	InicializarControlErrores : function(){
		$('#formulario').validate(
		{
  		  invalidHandler: function(form, validator) {
		      var errors = validator.numberOfInvalids();
		      if (errors) {
		        var message = errors == 1
		          ? 'Te falta de rellenar 1 campo. Ha sido resaltado.'
		          : 'Te faltan ' + errors + ' campos. Han sido resaltados.';
		        $("#errores").html(message);
		        UI.PanelErrores(true);
		      } else {
		        UI.PanelErrores(false);
		      }
		    }
		 }
		);
	},
	CrearFormulario: function(vista){
		$.ajax({
			url: this.urlJson,	
		  	dataType: 'json',
		  	success: function(data, textStatus, jqXHR){ 	
		  		switch(vista){
		  			case 'Tabla':
		  				UI.VistaTabla(data);
		  			break;
		  			case 'MultiTabla':
						UI.VistaMultiTabla(data);
		  			break;
		  			case 'Colapsables':
		  				UI.VistaColapsables(data);
		  			break;
		  			default:
			  			UI.VistaTabla(data);
		  			break;
		  		}
		  		UI.CargarValoresPorDefecto();
		  		UI.CargarRegistro();
		  	},
		  	error: function(jqXHR, textStatus, errorThrown){ alert( errorThrown );},
		  	complete: function (data){}
		});
	},
	CargarValoresPorDefecto : function(){
		$.ajax({
			url: this.urlDefaults,	
		  	dataType: 'json',
		  	success: function(data, textStatus, jqXHR){ 	
		  		$.each(data, function(){
		  			var seccion = this;
		  			$.each(seccion.Campos,function(){
		  				if(this.tipo == 'combo'){
		  				}
	  					else
	  					{		  					
		  					$('#' + this.nombre).val(this.valor);	
		  					$('#' + this.nombre).addClass('default');
		  				}
		  			});
		  		});
		  	},
		  	error: function(jqXHR, textStatus, errorThrown){ alert( errorThrown );},
		  	complete: function (data){}
		});
	},
	CargarRegistro : function(){
		if(!UI.EsAlta())
		{
			var elemento = eval($('#jsonProducto').val());
			
			$.each(elemento[0], function(k,v){
				$('#' + k).val(v);
			});
		}
	}, // METODOS VISTAS
	CambiarVista : function(vista){
		$('#container').html('');
		UI.CrearFormulario(vista);
	},
	VistaTabla : function(datos){
		// Una tabla para todo con un colpsan 2 para los titulo
		$('<table id="tablaElementos" class="table table-bordered table-condensed"></table>').appendTo("#container");
		$('#seccionTemplate').tmpl(datos).appendTo('#tablaElementos');
	},
	VistaMultiTabla : function(datos){
		// Tabla por seccion
		$('#seccionTablaTemplate').tmpl(datos).appendTo('#container');
	},
	VistaColapsables : function(datos){
		// Divs colapsables por seccion
		$('#seccionCollapsableTemplate').tmpl(datos).appendTo('#container');
	}, // METODOS ERRORES
	PanelErrores : function(visible){
		if(visible)
			$("#errores").show();
		else
			$("#errores").hide();
	}, // METODOS BOTONES DE ACCIONES
	Guardar : function(){
		var esValido = $('#' +  UI.nombreFormulario).validate().form();
		if(!esValido)
		{
			$('#' +  UI.nombreFormulario).validate().focusInvalid();		
		}
		else
		{
			if(UI.EsAlta())
				ArticuloSoporte.Insertar();
			else
				ArticuloSoporte.Actualizar();
		}		
	},
	Cancelar : function(){
		$('#formulario').validate().resetForm();
		UI.PanelErrores(false);
	},
	EsAlta : function(){

		return $('#id').val() == '0';
	},
	DeshabilitarSeccion : function(Idseccion){
		$('#'+ Idseccion +' input').each(function(){ $(this).attr('disabled', true)});
		$('#'+ Idseccion +' select').each(function(){ $(this).attr('disabled', true)});

		$('#'+ Idseccion).collapse('hide');
	},
	HabilitarSeccion : function(Idseccion){
		$('#'+ Idseccion +' input').each(function(){ $(this).attr('disabled', false)});
		$('#'+ Idseccion +' select').each(function(){ $(this).attr('disabled', false)});
	}
};
/*
		$.each(datos, function(){
			$.each(this.Campos, function(){
				console.debug('$this->input->post("'+ this.nombre + '", true)');		
			});
		});
*/	