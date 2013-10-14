var UI = {
	Init: function(){
		this.CargarInfoProducto();
		this.CargarInfoArticulos();
	},
	CargarInfoProducto: function(producto){
		var producto = eval($('#jsonProducto').val());
		var titulo = producto[0].codigo + ' - ' + producto[0].denominacion;

		$('#tituloProducto').text(titulo);
		$('#descripcion').text(producto[0].descripcion);
	},
	CargarInfoArticulos: function(){
		var articulos = eval($('#jsonArticulo').val());
		$.each(articulos, function(){
			switch(this.tipo)
			{
				case 'SOPORTE':
					if(this.id_articulo == 0)					
						this.url = '/vicrila/NuevoProducto/index.php/ArticuloSoporte/Crear/' + this.id_resumen;
					else
						this.url = '/vicrila/NuevoProducto/index.php/ArticuloSoporte/ArticuloSoporte/' + this.id_articulo;
				break;
				case 'SEMITERMINADO':
					if(this.id_articulo == 0)					
						this.url = '/vicrila/NuevoProducto/index.php/ArticuloSemiterminado/Crear/' + this.id_resumen;
					else
						this.url = '/vicrila/NuevoProducto/index.php/Articulos/ArticuloSemiterminado/' + this.id_articulo;
				break;
				case 'TERMINADO':
					this.url = '/vicrila/NuevoProducto/index.php/Articulos/ArticuloTerminado/' + this.id_articulo;
				break;
				case 'EMBALAJE1':
					this.url = '/vicrila/NuevoProducto/index.php/Articulos/ArticuloEmbalaje/' + this.id_articulo;
				break;
				case 'EMBALAJE2':
					this.url = '/vicrila/NuevoProducto/index.php/Articulos/ArticuloEmbalaje/' + this.id_articulo;
				break;
				case 'EMBALAJE3':
					this.url = '/vicrila/NuevoProducto/index.php/Articulos/ArticuloEmbalaje/' + this.id_articulo;
				break;
			}
		});

		if($('#tablaElementos tbody tr').length > 0)
			$('#tablaElementos tbody tr').remove();
					
		$('#filaElementoTemplate').tmpl(articulos).appendTo('#tablaElementos');
	}
};