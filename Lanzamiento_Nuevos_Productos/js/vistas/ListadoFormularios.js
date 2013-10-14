(function ($) {

    var o = $({});

    $.subscribe = function () {
        o.on.apply(o, arguments);
    };

    $.unsubscribe = function () {
        o.off.apply(o, arguments);
    };

    $.publish = function () {
        o.trigger.apply(o, arguments);
    };

} (jQuery));
function inputToJson(container){
	var obj = {};	

	$.each($( container + ' input[type != button],' + container + ' textarea'), function(){
			if(this.type == 'checkbox')
				obj[this.name] = $(this).attr('checked') == 'checked' ? "True" : "False";
			else
				obj[this.name] = $(this).val();
	});

	return obj;
	//return JSON.stringify(obj);
};
function ListadoFormularios(options) {
	var cofiguracion = {
		entidad: 'Formulario',
		urlBase: 'Ajax.aspx/',
		Listado :'ListadoFormularios',
		Buscar :'BuscarFormulario',
		Filtrar :'FiltrarFormularios',
		Insertar :'CrearFormulario',
		Actualizar :'ActualizarFormulario',
		Borrar :'EliminarFormulario'
	};
    this.modelo = new Modelo(cofiguracion);

	this.init = function () {
	    this.cache();
	    //this.formulario.hide();
	    this.vincularEventos();
	    this.suscripciones();
	    this.modelo.Listado();

	},
	this.cache = function () {
	    //this.btnAlta = $('#btnAlta');

	    //this.formulario = $('#formulario');
	    //this.btnCerrar = $('#formulario a.close');
	    //this.btnGuardar = $('#btnGuardar');

	    this.listado = $('#listado');
	},
	this.vincularEventos = function () {
	    var self = this;

	    // this.btnAlta.on('click', function () {
	    //     self.formulario.show();
	    // });
	    // this.btnCerrar.on('click', function () {
	    // 	self.LimpiarFormulario();
	    //     self.formulario.hide();
	    // });
	    // this.btnGuardar.on('click', $.proxy(this.Guardar, this) );
	    this.listado.delegate('a.btnEditar', 'click', function () {
	        var id = self.idFila(this);
	        self.modelo.Buscar('ID', id);
	    });
	    this.listado.delegate('a.btnEliminar', 'click', function () {
	    	alert('Sin implementar');
	        /*var id = self.idFilaProducto(this);
	        self.producto.Buscar(id);*/
	    });
	    this.listado.delegate('a.btnVer', 'click', function () {
	    	alert('Sin implementar');
	    });
	},
	this.suscripciones = function () {
	    $.subscribe("Formulario/listado", this.RenderListado);
	    $.subscribe("Producto/eliminar", this.RenderListado);
	    $.subscribe("Producto/buscar", $.proxy(this.CargarRegistro, this));
	    $.subscribe("Producto/filtrar", this.RenderListado);
	},
	this.idFila = function (elemento) {
	    return $(elemento).closest('tr').attr('id').replace('registro-', '');
	},
	this.RenderListado = function (evento, respuesta) {
		var datos = eval(respuesta);
	    if (datos.length > 0) {
	        if ($('#listado tbody tr').length > 0)
	            $('#listado tbody tr').remove();

	        $('#listadoTemplate').tmpl(datos).appendTo('#listado');
	    }
	    else {
	        alert('No se han obtenido resultados para producto');
	    }
	},
	this.LimpiarFormulario = function () {
	    $('#formulario input[type=hidden]').each(function () { $(this).val(''); });
	    $('#formulario input[type=text]').each(function () { $(this).val(''); });
	    $('#formulario input[type=checkbox]').each(function () { $(this).attr('checked', false); });
	    $('#formulario textarea').each(function () { $(this).val(''); });
	}
};

