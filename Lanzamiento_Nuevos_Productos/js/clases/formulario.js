function Formulario(){
	this.seccionActual = {};
	this.campoActual = {};

	this.init = function(id, tipo, nombre, esquema, operarios){
		this.ID = id;
		this.tipo = tipo;
		this.nombre = nombre; 
		this.esquema = esquema;
		this.operarios = (operarios == null) ? []: operarios;
	},
	this.buscarSeccion = function(Nombre){
		var Id =  Nombre;
		arr = jQuery.grep(this.esquema, function(n, i){
			return n.Id ==Id;
		});
		this.seccionActual = arr[0];
		$.publish('buscarSeccion' , [arr[0]]);
		return arr[0];
	},
	this.buscarCampo = function(seccion , campo){
		var seccion = this.buscarSeccion(seccion);
		arr = jQuery.grep(seccion.Campos, function(n, i){
	  		return n.nombre == campo;
		});
		this.campoActual = arr[0];
		$.publish('buscarCampo' , [arr[0]]);
		return arr[0];
	},
	this.insertarSeccion = function(nombre){
		var nueva = {Id: nombre, Seccion: nombre, Campos: []};
		this.esquema.push(nueva);
		$.publish('seccionInsertada' , [nueva]);
	},
	this.insertarCampo = function(campo){
		this.seccionActual.Campos.push(campo);
		$.publish('campoInsertado' , [campo]);
	},
	this.insertarOperario = function(campo){
		this.operarios.push(campo);
		$.publish('campoOperarioInsertado' , [campo]);
	},
	this.toPersist = function(){
		var obj = {};
		obj.ID = this.ID;
		obj.tipo = this.tipo;
		obj.nombre = this.nombre;	
		obj.esquema =  this.esquema;
		obj.operarios = this.operarios;

		return obj;
	}
}

