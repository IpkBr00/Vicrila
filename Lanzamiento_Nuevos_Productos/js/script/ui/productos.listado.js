var UI = {
	producto : new Modelo({urlBase : 'index.php/Productos/'}),

	"MantenimientoProductos": {
		"Init" : function(){

			//Productos.Listado(UI.MantenimientoProductos.CargarListado);

			
			UI.producto.onListadoCompletado.add(UI.MantenimientoProductos.CargarListado);
			UI.producto.onBuscarCompletado.add(UI.MantenimientoProductos.CargarFormulario);

			UI.producto.Listado();

			$('#listado').delegate('a.editar','click', function(){
				var fila = $(this).closest('tr');

				var celdaId = $('td' , fila).eq(0);

				//Productos.Buscar(celdaId.text(), UI.MantenimientoProductos.CargarFormulario);
				UI.producto.Buscar(celdaId.text());
			});

			// btnEliminar
			$('#listado').delegate('a.eliminar','click', function(){
				var fila = $(this).closest('tr');

				var celdaId = $('td' , fila).eq(0);

				Productos.Buscar(celdaId.text(), UI.MantenimientoProductos.Eliminar);
			});

			$('#btnGuardar').click(function(){
				if($('#id').val() == '')
				{
					//Productos.Filtrar('codigo', $("#codigo").val(),)
					Productos.Insertar(UI.MantenimientoProductos.InsercionCorrecta);
				}
				else
				{
					Productos.Actualizar(UI.MantenimientoProductos.ActualizacionCorrecta);	
				}
			});
				
			$('#alta').click(function(){
				UI.MantenimientoProductos.Formulario();
			});
			$('#formulario').on('hidden', function(){
				UI.MantenimientoProductos.LimpiarFormulario();
			});
		},
		"CargarListado": function(listado){
			if(listado.length > 0)
			{
				if($('#listado tbody tr').length > 0)
					$('#listado tbody tr').remove();
					
				$('#listadoTemplate').tmpl(listado).appendTo('#listado');
			}
			else
			{
				alert('No se han obtenido resultados para producto');
			}
		},
		"CargarFormulario": function(response){
			if(response.length > 0)
			{
				var objeto = response[0]
				
				$('#id').val(objeto.id_producto);
				$('#codigo').val(objeto.codigo);	
				$('#denominacion').val(objeto.denominacion);
				$('#descripcion').val(objeto.descripcion);
				$('#articuloSoporte').attr('checked' , objeto.articuloSoporte == 1 ? true : false );
				$('#articuloSemiterminado').attr('checked' , objeto.articuloSemiterminado == 1 ? true : false );
				$('#articuloTerminado').attr('checked' , objeto.articuloTerminado == 1 ? true : false );
				$('#embalaje1').attr('checked' , objeto.embalaje1 == 1 ? true : false );
				$('#embalaje2').attr('checked' , objeto.embalaje2 == 1 ? true : false );
				$('#embalaje3').attr('checked' , objeto.embalaje3 == 1 ? true : false );
		
				UI.MantenimientoProductos.Formulario();
			}
			else
			{
				alert('No se han obtenido resultados para producto');
			}
		},
		"Formulario" : function(){
			$('#formulario').modal();			
		},
		"LimpiarFormulario" : function(){
			$('#formulario input[type=hidden]').each(function(){$(this).val('');} );
			$('#formulario input[type=text]').each(function(){$(this).val('');} );
			$('#formulario input[type=checkbox]').each(function(){$(this).attr('checked', false);} );
			$('#formulario textarea').each(function(){$(this).val('');} );
		},
		"InsercionCorrecta" : function(response){
			if(response.length > 0)
			{
				Productos.Listado(UI.MantenimientoProductos.CargarListado);
				$('#formulario').modal('hide');
			}
			else
			{
				
			}
		},
		"ActualizacionCorrecta" : function(response){

			if(response.length > 0)
			{
				Productos.Listado(UI.MantenimientoProductos.CargarListado);
				$('#formulario').modal('hide');
			}
			else
			{
			}
		},
		"EliminacionCorrecta" : function(response){
			if(response.length > 0)
			{
				Productos.Listado(UI.MantenimientoProductos.CargarListado);
			}
			else
			{
			}
		},
		"Eliminar": function(response){
			if(response.length > 0)
			{
				alert('Se va ha eliminar el producto con id ' + response[0].id_producto);
				Productos.Eliminar(response[0].id_producto, UI.MantenimientoProductos.EliminacionCorrecta);
			}
			else
			{
			}
		}
	}
};
