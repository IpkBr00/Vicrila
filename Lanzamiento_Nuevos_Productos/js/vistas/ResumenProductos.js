function ResumenProductos( options ){
	this.idLanzamiento = 0,
	this.init = function(){
		esconderNavSP();
		this.cache();
		this.vincularEventos();
		this.suscripciones();

		app.servicios.resumen.Listado();
		app.servicios.sharepoint.GrupoUsuario();
	},
	this.cache = function(){
		this.tituloProducto = $('#tituloProducto');
		this.descripcion = $('#descripcion');
		this.tablaElementos = $('#tablaElementos');
		
		this.btnNuevoProducto = $('#btnNuevoProducto');

		this.btnNuevoProducto.button();
		this.formularioAlta = $('#nuevoProductoDialogo');
		
		var self = this;

		this.formularioAlta.dialog(
			{
				title:'Añadir producto',
				autoOpen : false,
				modal: true,
				width: 'auto',
				buttons : {
					'Guardar' : function(){ 
						var resumen = {};
						var productos = [];
						var producto = {};

						
						producto.tipo = self.formularioAlta.find('#tipo').val();
						producto.codigo = self.formularioAlta.find('#codigo').val();
						producto.descripcion = self.formularioAlta.find('#descripcion').val();
						producto.esNavision  = (self.formularioAlta.find('span').css('display') == 'block') ? "True" : "False";

						if(producto.tipo !== '' && producto.codigo	!== '' && producto.descripcion !== '')
						{
							resumen.codigo = self.idLanzamiento;
							productos.push(producto);
							resumen.elementos = JSON.stringify(productos);

							var datos = JSON.stringify({ Registro: resumen });
							app.log.debug('Datos', datos);
							app.servicios.resumen.Insertar(datos);
							$(this).dialog('close');
						}


					},
					'Cancelar' : function(){ $(this).dialog('close'); }
				},
				close : function(event, ui)
				{
					self.formularioAlta.find('input').each(function(){
						$(this).val('');
						$(this).attr('disabled',false);
					});

					self.formularioAlta.find('span').each(function(){
						$(this).hide();
					})
				}
			}
		);
	},
	this.vincularEventos = function(){
		var self = this;

		this.btnNuevoProducto.on('click', function(){
			self.formularioAlta.dialog('open');
		});
		$('#codigo', this.formularioAlta).on('blur', function(){
			var formulario = $(this).closest('div');
	    	var tipo = formulario.find('select').val();
	    	var codigo = $(this).val();

	    	if(codigo != '')
	    	{
				$(this).addClass('loading');
	    		app.servicios.navision.ExisteProducto(tipo, codigo);
	    	}

	   		app.log.debug('Blur', [formulario,tipo,codigo]);
		});
		this.tablaElementos.delegate(' .pasarNavision', 'click', function(){
			var idEnlace =  $(this).closest('a').attr('id');
			var tipo = idEnlace.split('-')[0];
			var idResumen = idEnlace.split('-')[1];

			alert('Iniciamos el paso a Navision, espere hasta que aparezca el resultado de la operación.');

			app.servicios.navision.PasoANavision(tipo, idResumen);
		});
        this.tablaElementos.delegate('.btnEliminar', 'click', function(){
            var idEnlace =  $(this).attr('id'),
                tipo = idEnlace.split('-')[0],
                idResumen = idEnlace.split('-')[1],
                confirmacion = false,
                dobleConfirmacion = false;

            confirmacion = confirm('¿Está seguro que desea borrar el registro ?');
            if(confirmacion){
                dobleConfirmacion = confirm('¿Confirma que realmente desea borrar el registro?');
                if(dobleConfirmacion)
                    app.servicios.articulos.Eliminar(tipo, idResumen);
            }

            console.log('Tipo: ' + tipo);
            console.log('IdResumen: ' + idResumen);

        });
	},
	this.suscripciones = function(){

		app.eventos.subscribir("modelos.dominio.resumen.Listado", $.proxy(this.Render, this));
		app.eventos.subscribir("modelos.navision.productos.PasoANavision", $.proxy(this.PostPasoANavision,this));
		app.eventos.subscribir('modelos.navision.productos.ExisteProducto', $.proxy(this.CargarBusquedaNavision, this));
		app.eventos.subscribir('modelos.dominio.resumen.Insertar', $.proxy(this.ProductoInsertado, this));
		app.eventos.subscribir('modelos.dominio.resumen.Eliminar', function(){app.servicios.resumen.Listado();} );
		app.eventos.subscribir('sharepoint.GrupoUsuario', $.proxy(this.HabilitarCrearProductos, this));
	},
	this.Render = function(evento, respuesta){
		var datos =JSON.parse(respuesta[0].d);
		var producto = JSON.parse(datos.Producto);
		var resumen = JSON.parse(datos.Resumen);

		this.RenderDatosLanzamiento(producto);
		$.proxy(this.RenderArticulos(resumen) ,this);
	},
	this.HabilitarCrearProductos = function(evento, respuesta){
		var grupo = respuesta[0].d;
		app.log.debug('Grupo', grupo);
		if(grupo == 'DesarrolloProducto')
			this.btnNuevoProducto.show();
		else
			this.btnNuevoProducto.hide();
	},
	this.ProductoInsertado = function(evento, respuesta){

		app.servicios.resumen.Listado();
	},
	this.CargarBusquedaNavision = function(evento , respuesta){
		var datos = JSON.parse(respuesta[0].d);

		if(datos.Estado == 'OK')
		{
			var operacion = JSON.parse(datos["Operacion "]);
			var loading =  $(".loading");
			if(operacion.Existe == 'True')
			{
				var fila = loading.closest('tr');
				var celdas = fila.find('td');
				var tag = $(celdas[celdas.length - 1]).find('span');
				var descripcion = $(fila.find('td input[type=text]')[1]);
				tag.css('display','block');
				descripcion.val(operacion.descripcion);
				descripcion.attr('disabled','disabled');
			}

			loading.removeClass('loading');
		}
	},
	this.RenderDatosLanzamiento = function(producto){
		var titulo = producto.codigo + ' - ' + producto.denominacion;

		this.tituloProducto.text(titulo);
		this.descripcion.text(producto.descripcion);

		this.idLanzamiento = producto.codigo;
	},
	this.RenderArticulos = function(resumen){
		if(resumen.length > 0)
		{
			var self = this;

			if($('#tablaElementos tbody tr').length > 0)
				$('#tablaElementos tbody tr').remove();
			
			$(resumen).each(function(){
				self.RenderProducto(this);
			});
		}
		else
		{
			alert('No se han obtenido resultados para el resumen del producto.');
		}
	},
	this.RenderProducto = function(producto)
	{
		producto.esNavision = false;

        if(producto.NewColumn1 != null){
        	$('th.acciones').css('width','50px');
        	producto.esNavision = true;
        }

        switch(producto.tipo)
        {
        	case "SOPORTE":
        		producto.color = 'bgGreen';
        	break;
        	case "SEMITERMINADO":
        		producto.color = 'bgMagenta';
        	break;
        	case "TERMINADO":
        		producto.color = 'bgOrange';
        	break;
        	case "EMBALAJE":
        		producto.color = 'bgBlue';
        	break;
        }

		$('#filaElementoTemplate').tmpl(producto).appendTo('#tablaElementos');
	},
	this.PostPasoANavision = function(evento, respuesta){
		var mensaje = JSON.parse(respuesta[0].d);
		
		app.log.debug('Postpaso a navision', respuesta);

		if(mensaje.Estado == 'Error')
		{
			alert(mensaje["Mensaje"] + "\n" + mensaje["Detalles Error"]);
		}
		else
		{
			alert(mensaje["Mensaje"]);	
		}
	}
};

