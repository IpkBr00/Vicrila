
function EdicionFormularios(options) {
    this.formulario = new Formulario();
    this.operarios = [];

	this.init = function () {
	    this.cache();
	    this.vincularEventos();
	    this.suscripciones();
	    this.formularioCampo.hide();
	    this.btnGuardar.hide();
	    
	    app.servicios.formularios.Buscar('ID', $.QueryString["id"]);
	},
	this.cache = function () {
		this.formularioCampo = $('#tableForm');
		this.tabs = $('ul#tabs');
		this.contenidoTab = $('#tabContent');
		this.tablaOperarios = $('#tablaOperarios');

		this.plantillaSeccion = $('#seccionTemplate');
		this.plantillaTab = $('#tabTemplate');
		this.plantillaFila = $('#filaTemplate');
		this.plantillaFilaOperario = $('#filaOperarioTemplate');

		this.btnNuevaSeccion = $('#btnNuevaSeccion');
		this.btnNuevoCampo = $('#btnNuevoCampo');
		this.btnAddCampo = $('#btnAddCampo');
		this.btnCancelarCampo = $('#btnCancelarCampo');
		this.btnGuardar = $('#btnGuardar');
		this.nombreFormulario = $('#nombreFormulario');
		this.tipoFormulario = $('#tipoFormulario');

		//FORMULARIO OPERARIO
		this.cmbOperarios = $('#cmbOperarios');
		this.txtValorOperario = $('#valorActividad');
		this.btnAddOperario = $('#btnAddOperario');
	},
	this.vincularEventos = function () {
	    var self = this;
	    
		this.btnNuevaSeccion.click( $.proxy( this.nuevaSeccion, this) );
    	this.btnNuevoCampo.click( $.proxy( this.nuevoCampo, this) );
    	this.btnAddCampo.click( $.proxy( this.insertarCampo, this) );
    	this.btnGuardar.click( $.proxy( this.Guardar, this) );
    	this.btnCancelarCampo.click( function(){ self.formularioCampo.hide();}); 
    	//this.btnAddOperario.click( $.proxy( this.insertarOperario, this) );

		this.tabs.delegate("a", "click", function(){
	    	var seccion  = $(this).attr('href').replace('#','');
			
			if(seccion == 'Produccion')
		    	self.formulario.buscarSeccion(seccion);
	    });

	    this.contenidoTab.delegate("#btnAddOperario", "click", function(){
	    	self.insertarOperario();
	    });

	    this.contenidoTab.delegate(".listado tbody tr td", "click", function(){
			var seccion  = $("li.active a").attr('href').replace('#','');
    		$(".listado tbody tr").each(function(){$(this).removeClass('seleccion');});

    		var fila = $(this).closest("tr");
    		var campo = $("td", fila).eq(0).text();

    		fila.addClass('seleccion');
		});

		this.contenidoTab.delegate(".listado tbody tr td .btnEditar", "click", function(){
			var seccion  = $("li.active a").attr('href').replace('#','');
    		$(".listado tbody tr").each(function(){$(this).removeClass('seleccion');});

    		var fila = $(this).closest("tr");
    		var campo = $("td", fila).eq(0).text();

    		fila.addClass('seleccion');

    		var obj = self.formulario.buscarCampo(seccion,campo);
    		$("#campo").val(obj.nombre);
    		$("#label").val(obj.label);
    		$("#tipo").val(obj.tipo);
    		$("#fuente").val(obj.fuente);
    		$("#defecto").val(obj.defecto);
    		$("#observaciones").val(obj.observaciones);
    		$("#validacion").val(obj.validacion);
			this.accion = 'Editar';

    		self.formularioCampo.show();
		});

		this.contenidoTab.delegate(".listado tbody tr td .btnEliminar", "click", function(){
			var seccion  = $("li.active a").attr('href').replace('#','');
    		$(".listado tbody tr").each(function(){$(this).removeClass('seleccion');});

    		var fila = $(this).closest("tr");
    		var campo = $("td", fila).eq(0).text();
    		fila.addClass('seleccion');

    		var seleccion = self.formulario.buscarCampo(seccion,campo);
    		var indice = self.formulario.seccionActual.Campos.indexOf(seleccion);

    		self.formulario.seccionActual.Campos.splice(indice,1);
		});

		this.contenidoTab.delegate("#tablaOperarios tbody tr td .btnEliminar", "click", function(){
    		var fila = $(this).closest("tr");
    		var campo = $("td", fila).eq(0).text();

    		var seleccion = -1;
			$(self.formulario.operarios).each(function(k, v){
				if(this.codigo == campo)
					seleccion = k;
			})

			if(seleccion != -1)
			{
				self.formulario.operarios.splice(seleccion, 1);
				fila.remove();
				app.eventos.publicar("UI/NecesitaGuardar", []);
				alert('Operario eliminado.');
			}

		});


		//frm.formulario.seccionActual.Campos.splice(frm.formulario.seccionActual.Campos.indexOf(frm.formulario.campoActual),1)
	},
	this.suscripciones = function () {
	    $.subscribe("seccionInsertada", $.proxy(this.InsertarSeccion, this));
	    $.subscribe("campoInsertado", $.proxy(this.InsertarCampo, this));
	    app.eventos.subscribir('UI/NecesitaGuardar', $.proxy(this.NecesitaGuardar, this));

		app.eventos.subscribir('modelos.dominio.formularios.Buscar', $.proxy(this.RenderRegistro, this))
		app.eventos.subscribir('modelos.dominio.formularios.Actualizar', function(){ alert('Formulario actualizado');})

		app.eventos.subscribir('modelos.navision.operarios.Listado', $.proxy(this.CargarOperarios, this))
	},
	this.idFila = function (elemento) {

	    return $(elemento).closest('tr').attr('id').replace('registro-', '');
	},
	this.RenderRegistro = function (evento, respuesta){
		app.log.debug('Render Registro' , respuesta[0].d);
		var datos = JSON.parse(respuesta[0].d);
		var esquema = JSON.parse(datos.esquema);
		var operarios = JSON.parse(datos.operarios);

		app.log.debug('OPERARIO', datos);

		$(this.plantillaSeccion).tmpl(esquema).appendTo(this.contenidoTab);
		$(this.plantillaTab).tmpl(esquema).appendTo(this.tabs);

		this.formulario.init(datos.ID, datos.tipo, datos.nombre , esquema, operarios);

		this.nombreFormulario.text(datos.nombre);
		this.tipoFormulario.text(datos.tipo);

		//if( typeof this.formulario.buscarSeccion('Produccion') == 'object' )
		if( operarios != null )
		{
			var esquemaOperarios = {};
			esquemaOperarios.Id = 'Operarios';
			esquemaOperarios.Seccion = 'Operarios';
			esquemaOperarios.Campos = operarios;

			$(this.plantillaSeccion).tmpl(esquemaOperarios).appendTo(this.contenidoTab);
			$(this.plantillaTab).tmpl(esquemaOperarios).appendTo(this.tabs);

			app.servicios.navision.GetListado('operarios');
		}


	},
	this.UnrenderRegistro = function(){
		this.tabs.html('');
		this.contenidoTab.find('.tab-pane').each(function(){
			$(this).remove();
		});
	},
	this.CargarOperarios = function(evento, respuesta){
		var maestroOperarios =  JSON.parse(respuesta[0].d);
		$('#comboTemplate').tmpl(maestroOperarios).appendTo('#cmbOperarios');
	},
	this.Guardar = function(){
		var datos = JSON.stringify({ Registro: this.formulario.toPersist() });
		app.servicios.formularios.Actualizar(datos);

	},
	this.InsertarSeccion = function(evento, datos){
		$(this.plantillaTab).tmpl(datos).appendTo(this.tabs);
		$(this.plantillaSeccion).tmpl(datos).appendTo(this.contenidoTab);

	},
	this.InsertarCampo = function(evento, datos){

		var contenidoActivo = this.contenidoTab.find('.active table tbody');

		if(datos.tipo == undefined)
			$(this.plantillaFilaOperario).tmpl(datos).appendTo(contenidoActivo);
		else
	 		$(this.plantillaFila).tmpl(datos).appendTo(contenidoActivo);

	 	this.formularioCampo.hide();
	},
	this.LimpiarFormulario = function () {
	    $('#formulario input[type=hidden]').each(function () { $(this).val(''); });
	    $('#formulario input[type=text]').each(function () { $(this).val(''); });
	    $('#formulario input[type=checkbox]').each(function () { $(this).attr('checked', false); });
	    $('#formulario textarea').each(function () { $(this).val(''); });

	}, // EVENTOS
	this.nuevaSeccion = function(){
		var nombre = prompt ("Nombre de la sección","");
	
		if(nombre == '' || nombre == null )
			alert('No debes introducir un valor en el campo nombre.');
		else
			this.formulario.insertarSeccion(nombre);
	},
	this.nuevoCampo = function(){
		this.accion = 'Alta';
		$("#campo").val('');
		$("#label").val('');
		$("#tipo").val('');
		$("#fuente").val('');
		$("#defecto").val('');
		$("#observaciones").val('');
		$("#validacion").val('');

		this.formularioCampo.show();
	},
	this.insertarCampo = function(){
		
		if(this.accion == 'Alta'){
			var campo = {};
			campo.nombre = $("#campo").val();
			campo.label = $("#label").val();
			campo.tipo = $("#tipo").val();
			campo.fuente = $("#fuente").val();
			campo.defecto = $("#defecto").val();
			campo.observaciones = $("#observaciones").val();
			campo.validacion = $("#validacion").val();

			//VALIDACION 
			this.formulario.insertarCampo(campo);
		}
		else
		{
			this.formulario.campoActual.nombre = $("#campo").val();
			this.formulario.campoActual.label = $("#label").val();
			this.formulario.campoActual.tipo = $("#tipo").val();
			this.formulario.campoActual.fuente = $("#fuente").val();
			this.formulario.campoActual.defecto = $("#defecto").val();
			this.formulario.campoActual.observaciones = $("#observaciones").val();
			this.formulario.campoActual.validacion = $("#validacion").val();

			this.formularioCampo.hide();
		}

		app.eventos.publicar("UI/NecesitaGuardar", []);
	},
	this.insertarOperario = function(){
		cmbOperarios = $('#cmbOperarios');
		txtValorOperario = $('#valorActividad');
		tablaOperarios = $('#tablaOperarios');

		var codigo = cmbOperarios.val();

		$(this.operarios).each(function(){
			if(this.codigo == codigo)
				alert('Repetido');
		});

		var nuevoOperario = {};

		nuevoOperario.codigo = cmbOperarios.val();
		nuevoOperario.descripcion = $(':selected', cmbOperarios).text().replace(nuevoOperario.codigo + ' - ', '');
		nuevoOperario.valor = txtValorOperario.val();

		this.operarios.push(nuevoOperario);

		this.plantillaFilaOperario.tmpl(nuevoOperario).appendTo(tablaOperarios);

		cmbOperarios.val('');
		txtValorOperario.val('0,0');

		this.formulario.insertarOperario(nuevoOperario);
		//this.formulario.insertarCampo(nuevoOperario);

		app.eventos.publicar('UI/NecesitaGuardar', []);
	},
	this.NecesitaGuardar = function(){
		//this.btnGuardar.click();
		
		this.btnGuardar.show();
		//this.btnGuardar.click();
	},
	this.escribir = function(){
		app.log.debug('Funcion escribir', arguments);
	}
};




