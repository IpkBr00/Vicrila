function ListadoProductos(options) {

	this.init = function () {
        var self = this;

        this.paginador = new Paginador();
        this.paginador.configurar({
            control : $('#paginador')
        });

        this.paginador.onBtnAtrasClick = function(eventArgs){
            var datos  = (self.datosMostrados) ? self.datosMostrados : self.datosCache;
            var datosPaginados = datos.slice((eventArgs.irAPaginaNumero - 1) * eventArgs.tamanyoPagina, eventArgs.irAPaginaNumero * eventArgs.tamanyoPagina);

            self.DibujarListado(datosPaginados);
        };
        this.paginador.onBtnAdelanteClick = function(eventArgs){
            var datos  = (self.datosMostrados) ? self.datosMostrados : self.datosCache;
            var datosPaginados = datos.slice((eventArgs.irAPaginaNumero - 1) * eventArgs.tamanyoPagina, eventArgs.irAPaginaNumero * eventArgs.tamanyoPagina);

            self.DibujarListado(datosPaginados);
        };
        this.paginador.onResetear = function(eventArgs){
            var datos  = (self.datosMostrados) ? self.datosMostrados : self.datosCache;
            var datosPaginados = datos.slice((eventArgs.paginaActual - 1) * eventArgs.tamanyoPagina, eventArgs.paginaActual * eventArgs.tamanyoPagina);

            self.DibujarListado(datosPaginados);
        };

		esconderNavSP();
		var linkRef = $('#ctl00_PlaceHolderSiteName_onetidProjectPropertyTitle').attr('href');
		linkRef += '_layouts/Lanzamiento_Nuevos_Productos/ListadoProductos.aspx';
		$('#ctl00_PlaceHolderSiteName_onetidProjectPropertyTitle').attr('href', linkRef);
		$('#ctl00_onetidProjectPropertyTitleGraphic').attr('href', linkRef);
		//$('.root.static>li>a').hide() 
		//$('#siteactiontd').hide() 
		

	    this.cache();
	    this.vincularEventos();
	    this.suscripciones();
	    app.servicios.productos.Listado();
	    app.servicios.sharepoint.GrupoUsuario();

	},
	this.cache = function () {
		var self = this;

	    this.btnAlta = $('#btnAlta');
	    this.formulario = $('#dialogoAlta');
	    this.formularioToolbar = this.formulario.find('#toolbarElementos');
	    this.listado = $('#listado');

	    // ELEMENTOS UI 
		this.btnAlta.button( { icons : { primary: "ui-icon-plus"} } ).hide();

		$('#btnA').button( { icons : { primary: "ui-icon-plus"} } );
	    this.formulario.dialog(
			{
				title : 'Nuevo lanzamiento comercial',
				modal: true,
				autoOpen: false,
				closeOnEscape: false,
				width: ($.browser.msie == true) ? '600px': 600,
				height: 'auto',
				buttons : {
					'Guardar' : function(){  self.Guardar(); },
					'Cancelar' : function(){ $(this).dialog('close'); }
				}
			}
		);		
	},
	this.vincularEventos = function () {
	    var self = this;

	    this.btnAlta.on('click', function () {
	    	self.formulario.dialog('open');
	    });
	    $('li#add', this.formularioToolbar).on('click' , function(){
			var opciones = {'id': $('#elementos tbody tr').length};
			$('#productoTemplate').tmpl(opciones).appendTo('#elementos tbody');
		});
		$('li#delete', this.formularioToolbar).on('click' , function(){
			var seleccionados = $('#elementos tbody tr input[type=checkbox]:checked');

			$(seleccionados).each(function(){  
				$(this).closest('tr').remove();
			});
		});
	    this.listado.delegate('a.btnEditar', 'click', function () {
	        var id = self.idFilaProducto(this);
	        self.producto.Buscar('ID', id);
	    });
        this.listado.delegate('a.btnEliminar', 'click', function () {
            var id = self.idFilaProducto(this),
                confirmacion = false,
                dobleConfirmacion = false;

            confirmacion = confirm('¿Está seguro que desea borrar el Lanzamiento comercial?');
            if(confirmacion){
                dobleConfirmacion = confirm('¿Confirma que realmente desea borrar el Lanzamiento comercial?');
                if(dobleConfirmacion)
                    app.servicios.productos.Eliminar(id);
            }
        });

	    this.formulario.delegate('.codigo', 'blur', function(){
	    	var fila = $(this).closest('tr');
	    	var tipo = fila.find('select').val();
	    	var codigo = $(this).val();

	    	if(codigo != '')
	    	{
				$(this).addClass('loading');
	    		app.servicios.navision.ExisteProducto(tipo, codigo);
	    	}

	   		app.log.debug('Blur', [fila,tipo,codigo]);
	    });

        $('#lanzamientosTodos').on('click', function(){
            self.filtro = "Todos";
            self.cambiarSeleccionFiltro();
            self.datosFiltrados = self.datosCache;
            self.datosMostrados =  self.datosFiltrados;
            self.DibujarListado(self.datosMostrados);
            self.FiltrarListado();
        });
        $('#lanzamientosCompletados').on('click', function(){
            self.filtro = "Completados";
            self.cambiarSeleccionFiltro();
            self.datosFiltrados = _.filter( self.datosCache, function(reg){
               return reg.estado == 'completado';
            });
            self.datosMostrados =  self.datosFiltrados;
            self.DibujarListado(self.datosMostrados);
            self.FiltrarListado();
        });
        $('#lanzamientosNoCompletados').on('click', function(){
            self.filtro = "NoCompletados";
            self.cambiarSeleccionFiltro();
            self.datosFiltrados = _.filter( self.datosCache, function(reg){
                return reg.estado != 'completado';
            });
            self.datosMostrados =  self.datosFiltrados;
            self.DibujarListado(self.datosMostrados);
            self.FiltrarListado();
        });

        $('#btnBuscar').on('click', function(){
            self.FiltrarListado();
        });
	},
	this.suscripciones = function () {
		app.eventos.subscribir('modelos.dominio.productos.Listado', $.proxy(this.RenderListado, this) );
		app.eventos.subscribir('modelos.dominio.productos.Insertar', $.proxy(this.DespuesGuardar, this));
		app.eventos.subscribir('modelos.dominio.productos.Actualizar', $.proxy(this.DespuesGuardar, this));
		app.eventos.subscribir('modelos.dominio.productos.Eliminar', function(){app.servicios.productos.Listado();});
		app.eventos.subscribir('modelos.dominio.productos.Buscar', $.proxy(this.CargarRegistro, this));
		app.eventos.subscribir('modelos.navision.productos.ExisteProducto', $.proxy(this.CargarBusquedaNavision, this));
		app.eventos.subscribir('modelos.sharepoint.info.getGrupoUsuario', $.proxy(this.HabilitarCrearProductos, this));
	},
	this.idFilaProducto = function (elemento) {

	    return $(elemento).closest('tr').attr('id').replace('producto-', '');
	},
	this.RenderListado = function (evento, respuesta) {
		var datos = eval(respuesta[0].d);
        this.datosCache = _.sortBy(datos, function(reg){
            return reg.codigo;
        });

        this.DibujarListado( this.datosCache );
        $('#lanzamientosNoCompletados').trigger('click');
	},
    this.DibujarListado = function (datos) {
        var self = this;

        if (datos.length > 0) {
            if ($('#listado tbody tr').length > 0)
                $('#listado tbody tr').remove();

            $(datos).each(function(){
                if(this.estado == "completado")
                    this.clase = "bgGreen";
                else
                    this.clase = "bgMagenta";

                this.articulos = [];
                if(parseInt(this.articuloSoporte) > 0)
                {
                    for (var i = 0; i < parseInt(this.articuloSoporte); i++) {
                        this.articulos.push({'tipo':'Soporte'})
                    };
                }
                if(parseInt(this.ArticuloSemiterminado) > 0)
                {
                    for (var i = 0; i < parseInt(this.ArticuloSemiterminado); i++) {
                        this.articulos.push({'tipo':'Semiterminado'})
                    };
                }
                if(parseInt(this.ArticuloTerminado) > 0)
                {
                    for (var i = 0; i < parseInt(this.ArticuloTerminado); i++) {
                        this.articulos.push({'tipo':'Terminado'})
                    };
                }
                if(parseInt(this.Embalaje1) > 0)
                {
                    for (var i = 0; i < parseInt(this.Embalaje1); i++) {
                        this.articulos.push({'tipo':'Embalaje'})
                    };
                }


                
                if(this.estado != "completado" && self.grupoActual == "DesarrolloProducto")
                    this.canBeDeleted = "S";
                else
                    this.canBeDeleted = "F";

                app.log.debug("RenderListado", this);
            });

            $('#listadoTemplate').tmpl(datos).appendTo('#listado');
        }
        else {
            alert('No se han obtenido resultados para producto');
        }

        /*
        this.paginador.resetear({
            paginaTotal : (datos.length > 0) ? Math.round(datos.length/ 15): 0,
            tamanyoPagina : 15
        });
        */
    },
    this.FiltrarListado = function () {
        var datosFiltrados  = (this.datosFiltrados) ? this.datosFiltrados : this.datosCache;
        var codigo = $('#codigoBuscar').val();
        var denominacion = $('#denominacionBuscar').val();
        var fechaDesde   = $('#fechaCompletadoDesdeBuscar').val();
        var fechaHasta   = $('#fechaCompletadoHastaBuscar').val();

        if(codigo != '')
            datosFiltrados = _.filter(datosFiltrados, function(reg){
            return reg.codigo.indexOf(codigo) != -1;
        });
        if(denominacion != '')
            datosFiltrados = _.filter(datosFiltrados, function(reg){
                return reg.denominacion.indexOf(denominacion) != -1;
            });
        if(fechaDesde != '' || fechaHasta != '')
        {
            if(fechaDesde == fechaHasta ){                                  // Fecha Desde igual Fecha Hasta
                datosFiltrados = _.filter(datosFiltrados, function(reg){
                    return reg.fechaCompletado == fechaDesde;
                });
            }
            if(fechaDesde != '' && fechaHasta == ''){                       // Fecha desde sin Fecha Hasta
                var comparar =  app.utils.Fecha.create(fechaDesde).valueOf();
                datosFiltrados = _.filter(datosFiltrados, function(reg){

                    return (reg.fechaCompletado != null) ? app.utils.Fecha.create(reg.fechaCompletado).valueOf()  >= comparar : false;
                });
            }
            if(fechaDesde == '' && fechaHasta != ''){                       // Fecha Hasta sin Fecha Desde
                var dinamico = undefined;
                var comparar =  app.utils.Fecha.create(fechaHasta);
                var resultado = false;

                datosFiltrados = _.filter(datosFiltrados, function(reg){
                    if(reg.fechaCompletado != null)
                    {
                        dinamico =  app.utils.Fecha.extraer(reg.fechaCompletado);
                        comparar =  app.utils.Fecha.extraer(fechaHasta);
                        resultado = (new Date(dinamico.anyo, dinamico.mes, dinamico.dia, 0 , 0 ,0 ,0) <= new Date(comparar.anyo, comparar.mes, comparar.dia, 0 , 0 ,0 ,0));
                    }
                    else
                        resultado = false;

                    return  resultado;
                    //return  (reg.fechaCompletado != null) ? app.utils.Fecha.create(reg.fechaCompletado)  <= comparar : false;
                });
            }
            if(fechaDesde != '' && fechaHasta != ''){                       // Rango
                var compararDesde =  app.utils.Fecha.create(fechaDesde).valueOf();
                var compararHasta =  app.utils.Fecha.create(fechaHasta).valueOf();

                datosFiltrados = _.filter(datosFiltrados, function(reg){
                    return (reg.fechaCompletado != null) ? (app.utils.Fecha.create(reg.fechaCompletado).valueOf()  >= compararDesde && app.utils.Fecha.create(reg.fechaCompletado).valueOf()  <= compararHasta) : false;
                });
            }

        }


        this.datosMostrados =  datosFiltrados;
        this.DibujarListado(this.datosMostrados);

        //this.DibujarListado(datosFiltrados);
        this.paginador.resetear({
            paginaTotal : (datosFiltrados.length > 0) ? Math.round(datosFiltrados.length/ 15): 0,
            tamanyoPagina : 15
        });
    },
	this.CargarRegistro = function (evento, respuesta) {
		var objeto = eval(respuesta[0].d);

	    $('#id').val(objeto.id_producto);
	    $('#codigo').val(objeto.codigo);
	    $('#denominacion').val(objeto.denominacion);
	    $('#descripcion').val(objeto.descripcion);
	    $('#articuloSoporte').attr('checked', objeto.articuloSoporte == "True" ? true : false);
	    $('#articuloSemiterminado').attr('checked', objeto.articuloSemiterminado == "True" ? true : false);
	    $('#articuloTerminado').attr('checked', objeto.articuloTerminado == "True" ? true : false);
	    $('#embalaje1').attr('checked', objeto.embalaje1 == "True" ? true : false);
	    $('#embalaje2').attr('checked', objeto.embalaje2 == "True" ? true : false);
	    $('#embalaje3').attr('checked', objeto.embalaje3 == "True" ? true : false);

	    this.formulario.dialog('open');
	},
	this.CargarBusquedaNavision = function(evento , respuesta){
		var datos = JSON.parse(respuesta[0].d);

		if(datos.Estado == 'OK')
		{
			var operacion = JSON.parse(datos["Operacion "]);
			var loading =  $(".codigo.loading");

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
	this.HabilitarCrearProductos = function(evento, respuesta){
		var grupo = respuesta[0].d;

        this.grupoActual = grupo;
		if(grupo == 'DesarrolloProducto')
            this.btnAlta.show();

	},
	this.LimpiarFormulario = function () {
	    $('#dialogoAlta input[type=hidden]').each(function () { $(this).val(''); });
	    $('#dialogoAlta input[type=text]').each(function () { $(this).val(''); });
	    $('#dialogoAlta input[type=checkbox]').each(function () { $(this).attr('checked', false); });
	    $('#dialogoAlta textarea').each(function () { $(this).val(''); });
	},
    this.cambiarSeleccionFiltro = function(){
        var panelFiltro =  $('#filtroLanzamientos');
        var seleccion = this.filtro;
        if(!seleccion || seleccion == '')
            seleccion = 'Todos';

        panelFiltro.find('a').removeClass('activo');
        panelFiltro.find('a#lanzamientos'+ seleccion).addClass('activo');

        if(seleccion != "Completados")
        {
            $('#fechaCompletadoDesdeBuscar').val('');
            $('#fechaCompletadoHastaBuscar').val('');

            $('#fechaCompletadoDesdeBuscar').hide();
            $('#fechaCompletadoHastaBuscar').hide();

            $('#fechaCompletadoDesdeBuscar').closest('td').hide();
            $('#fechaCompletadoHastaBuscar').closest('td').hide();

            $('label[for=fechaCompletadoDesdeBuscar]').hide();
            $('label[for=fechaCompletadoHastaBuscar]').hide();
        }
        else
        {
            $('#fechaCompletadoDesdeBuscar').val('');
            $('#fechaCompletadoHastaBuscar').val('');

            $('#fechaCompletadoDesdeBuscar').show();
            $('#fechaCompletadoHastaBuscar').show();

            $('#fechaCompletadoDesdeBuscar').closest('td').show();
            $('#fechaCompletadoHastaBuscar').closest('td').show();

            $('label[for=fechaCompletadoDesdeBuscar]').show();
            $('label[for=fechaCompletadoHastaBuscar]').show();
        }

    },
	
	this.Guardar = function(){
		//((Dictionary<string,object>)((object[])Registro["prueba"])[0])["codigo"]
		if(this.Validar())
		{

			var lanzamiento = {};
			var productos = $('#elementos tbody tr select');
			var filasElementos = $('#elementos tbody tr');
			
			var elementos = [];
			
			

			lanzamiento.id = $('#id').val();
			lanzamiento.codigo = $('#codigo').val();
			lanzamiento.denominacion = $('#denominacion').val();
			lanzamiento.descripcion = $('#descripcion').val();
			lanzamiento.articuloSoporte = 0;
			lanzamiento.articuloSemiterminado = 0;
			lanzamiento.articuloTerminado = 0;
			lanzamiento.embalaje = 0;
		
			filasElementos.each(function(){
				var elemento = {};

				elemento.tipo = $(this).find('select').val();
				elemento.codigo = $(this).find('input[type=text]').eq(0).val();
				elemento.descripcion = $(this).find('input[type=text]').eq(1).val();
				elemento.esNavision  = ($(this).find('span').css('display') == 'block') ? "True" : "False";

				elementos.push(elemento);
			});

			lanzamiento.elementos = JSON.stringify(elementos);

			productos.each(function(){
				switch($(this).val())
				{
					case "Soporte":
						lanzamiento.articuloSoporte++;
					break;
					case "Semiterminado":
						lanzamiento.articuloSemiterminado++;
					break;
					case "Terminado":
						lanzamiento.articuloTerminado++;
					break;
					case "Embalaje":
						lanzamiento.embalaje++;
					break;
				}
			});

			var datos = JSON.stringify({ Registro: lanzamiento });

			if ($('#id').val() == '') {
				$('a.ui-dialog-titlebar-close').hide();
    			$('.ui-dialog-buttonset .ui-button').each(function(){ $(this).button('disable');})
    			$('#overlayLoading').addClass('ui-widget-overlay').show();
    			$('.ui-dialog-buttonpane').append('<div id="mensajeOperacion"> &nbsp;&nbsp;&nbsp;<span>Operaci&oacute;n en curso</span><br><img src="img/ajax-loader.gif"/><div id="progressbar"></div></div>');
    			
				app.servicios.productos.Insertar(datos);
			 	
			}
			else {
			 	//this.producto.Actualizar(datos);
			}
		}        
	},
	this.DespuesGuardar = function(evento, respuesta){
		alert('Lanzamiento comercial creado.');
		$('a.ui-dialog-titlebar-close').show();
		$('.ui-dialog-buttonset .ui-button').each(function(){ $(this).button('enable');});
    	$('#overlayLoading').removeClass('ui-widget-overlay').hide();
    	$('#mensajeOperacion').remove();
		this.LimpiarFormulario();
		
		this.formulario.dialog('close');
		//app.servicios.productos.Listado();
	},
	this.Validar = function(){
		var resultado = true;

		if($('#codigo').val() == '')
		{
			alert('Debes rellenar el código del producto.');
			resultado = false;
		}
			
		if ($('#denominacion').val() == '')
		{
			alert('Debes rellenar la denominación del producto.');
			resultado = false;
		}

		/*
		if ($('#descripcion').val() == '')
		{
			alert('Debes rellenar la descripción del producto.');
			resultado = false;
		}
		*/
		
		var cuentaProductos = {};
		cuentaProductos.articuloSoporte = 0;
		cuentaProductos.articuloSemiterminado = 0;
		cuentaProductos.articuloTerminado = 0;
		cuentaProductos.embalaje = 0;

		var productos = $('#elementos tbody tr select');
		var productosValidos = true;

		productos.each(function(){
			switch($(this).val())
			{
				case "Soporte":
					cuentaProductos.articuloSoporte++;
				break;
				case "Semiterminado":
					cuentaProductos.articuloSemiterminado++;
				break;
				case "Terminado":
					cuentaProductos.articuloTerminado++;
				break;
				case "Embalaje":
					cuentaProductos.embalaje++;
				break;
			}

			var codigo = $(this).closest('tr').find('input[type=text]').eq(0).val();
			var descripcion = $(this).closest('tr').find('input[type=text]').eq(1).val();

			//productosValidos = productosValidos && ((codigo != '') &&(descripcion != ''));
			productosValidos = productosValidos && ((codigo != ''));
		});

		if(!productosValidos)
		{
			alert('Todos los productos deben tener código y descripción.');		
			resultado = false;
		}

		if( cuentaProductos.articuloSoporte == 0 && cuentaProductos.articuloSemiterminado == 0 &&
			cuentaProductos.articuloTerminado == 0 && cuentaProductos.embalaje == 0)
		{
			alert('No se puede crear un lanzamiento comercial sin productos.');		
			resultado = false;
		}

		if(cuentaProductos.articuloSemiterminado > 0 && cuentaProductos.articuloSoporte == 0)
		{
			alert('Para crear un producto Semiterminado debes seleccionar un producto soporte.');	
			resultado = false;
		}

		if(cuentaProductos.articuloTerminado > 0 && 
		   (cuentaProductos.articuloSemiterminado == 0 || cuentaProductos.articuloSoporte == 0) ) 
		{
			alert('Para crear un producto terminado debes seleccionar un producto soporte y un producto semiterminado.');
			resultado = false;
		}

		return resultado;
	}
}

