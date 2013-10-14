var FormularioAdmin = function(Nombre , datos){
	this.Nombre = Nombre;
	this.secciones = datos;
}

FormularioAdmin.prototype.BuscarSeccion = function(Nombre){
	var Id =  Nombre;
	arr = jQuery.grep(this.secciones, function(n, i){
		return n.Id ==Id;
	});
	return arr[0];
}

FormularioAdmin.prototype.BuscarCampo = function (Seccion, Nombre){
	var seccion = this.BuscarSeccion(Seccion);
	arr = jQuery.grep(seccion.Campos, function(n, i){
	  return n.nombre == Nombre;
	});
	return arr[0];
};
