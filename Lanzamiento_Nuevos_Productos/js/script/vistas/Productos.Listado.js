var frmProductoListado = function(){
	this.producto = new Modelo({urlBase : 'index.php/Productos/'});

	this.producto.onListadoCompletado.add(this.CargarListado);
	this.producto.onBuscarCompletado.add( $.proxy(this.CargarFormulario, this) );

	this.Cache();
	this.VincularEventos();
	this.Init();
}
frmProductoListado.prototype.Cache = function(){

	this.listado = $("#listado");
	this.btnAlta = $('#alta');
	this.btnGuardar = $('#btnGuardar');
	this.formulario = $('#formulario');
};
frmProductoListado.prototype.Init = function(){
	
	this.producto.Listado(); 
};


frmProductoListado.prototype.IdSeleccion = function(elemento){
	var fila = $(elemento).closest('tr');
	var celdaId = $('td' , fila).eq(0);

	return celdaId.text();
};

frmProductoListado.prototype.VincularEventos = function(){
	var self = this;
	
	self.listado.delegate('a.editar','click', function(){
		self.producto.Buscar(self.IdSeleccion(this));
	});
	self.listado.delegate('a.eliminar','click', function(){
		self.producto.Buscar(self.IdSeleccion(this));
	});
	self.btnGuardar.on("click" , self.Guardar );
	self.btnAlta.on("click", self.AbrirFormulario );
	self.formulario.on('hidden', self.LimpiarFormulario);
};
frmProductoListado.prototype.Guardar = function(){
	var datos = formulario.serialize();
	if($('#id').val() == '')
	{	
		this.productos.Insertar(datos);
	}
	else
	{
		this.productos.Actualizar(datos);	
	}
};
frmProductoListado.prototype.CargarListado = function(datos){
	if(datos.length > 0)
	{
		if($('#listado tbody tr').length > 0)
			$('#listado tbody tr').remove();
			
		$('#listadoTemplate').tmpl(datos).appendTo('#listado');
	}
	else
	{
		alert('No se han obtenido resultados para producto');
	}
};
frmProductoListado.prototype.CargarFormulario = function(datos){
	var formulario = this;
	
	if(datos.length > 0)
	{
		var objeto = datos[0];

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

		formulario.AbrirFormulario();
	}
	else
	{
		alert('No se han obtenido resultados para producto');
	}
};
frmProductoListado.prototype.AbrirFormulario = function(){

	$('#formulario').modal(); 
};
frmProductoListado.prototype.CerrarFormulario = function(){ 

	$('#formulario').modal('hide'); 
};
frmProductoListado.prototype.LimpiarFormulario = function(){ 
	$('#formulario input[type=hidden]').each(function(){$(this).val('');} );
	$('#formulario input[type=text]').each(function(){$(this).val('');} );
	$('#formulario input[type=checkbox]').each(function(){$(this).attr('checked', false);} );
	$('#formulario textarea').each(function(){$(this).val('');} );
};
frmProductoListado.prototype.InsercionCorrecta = function(datos){
	var formulario = this;

	if(datos.length > 0)
	{
		formulario.producto.Listado();
		formulario.CerrarFormulario();
	}
	else
	{
	}
};
frmProductoListado.prototype.ActualizacionCorrecta = function(datos){
	var formulario = this;
	
	if(datos.length > 0)
	{
		formulario.producto.Listado();
		formulario.CerrarFormulario();
	}
	else
	{
	}
};
frmProductoListado.prototype.EliminacionCorrecta = function(datos){
	var formulario = this;
	
	if(datos.length > 0)
	{
		formulario.producto.Listado();
	}
	else
	{
	}
};
frmProductoListado.prototype.Eliminar = function(datos){
	var formulario = this;

	if(datos.length > 0)
	{
		alert('Se va ha eliminar el producto con id ' + datos[0].id_producto);
		formulario.producto.Eliminar(datos[0].id_producto);
	}
	else
	{
	}
};
