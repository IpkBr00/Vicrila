var Formulario;

var UI = {
	nombreFormulario : "formulario",
	urlJson : "js/script/configuraciones/formularios/frmArticuloEmbalaje.json",
	urlDefaults : "js/script/configuraciones/formularios/frmArticuloEmbalaje.defaults.json",

	// METODOS INICIALIZACION FORMULARIO
	Init : function(){
		this.InicializarControlErrores();
		this.CrearFormulario();
		this.VincularEventos();
	},
	VincularEventos : function(){
		$("#tabContent").delegate(".listado tbody tr td", "click", function(){
			var seccion  = $("li.active a").attr('href').replace('#','');
    		$(".listado tbody tr").each(function(){$(this).removeClass('seleccion');});

    		var fila = $(this).closest("tr");
    		var campo = $("td", fila).eq(0).text();

    		fila.addClass('seleccion');

    		var obj = Formulario.BuscarCampo(seccion,campo);
    		$("#campo").val(obj.nombre);
    		$("#label").val(obj.label);
    		$("#tipo").val(obj.tipo);
    		$("#validacion").val(obj.validacion);
		});

	},
	InicializarControlErrores : function(){
	},
	CrearFormulario: function(vista)
	{
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
		  	},
		  	error: function(jqXHR, textStatus, errorThrown){ alert( 'Error CrearFormulario: \n' +  errorThrown );},
		  	complete: function (data){}
		});
	}, // METODOS VISTAS
	CambiarVista : function(vista){
		$('#container').html('');
		UI.CrearFormulario(vista);
	},
	VistaTabla : function(datos){
		// Una tabla para todo con un colpsan 2 para los titulo
		//$('<table id="tablaElementos" class="table table-bordered table-condensed"></table>').appendTo("#container");
		$('#seccionTemplate').tmpl(datos).appendTo('#tabContent');
		$('#tabTemplate').tmpl(datos).appendTo('#tabs');
 			
		Formulario = new FormularioAdmin("frmArticuloEmbalaje", datos);
	}
};


