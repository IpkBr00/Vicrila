var Modelo = function(options){
	this.entidad = options.entidad;
	this.urlBase = options.urlBase;
	this.urlListado = this.urlBase + options.Listado;
	this.urlBuscar = this.urlBase + options.Buscar;
	this.urlFiltrar = this.urlBase + options.Filtrar;
	this.urlInsertar = this.urlBase + options.Insertar;
	this.urlActualizar = this.urlBase + options.Actualizar;
	this.urlBorrar = this.urlBase + options.Borrar;		
};
Modelo.prototype.Init = function(){
};
Modelo.prototype.Listado = function(){


	var modelo = this;
	$.ajax({
	    type: "POST",
	    contentType: "application/json; charset=utf-8",
	    url: this.urlListado,
	    dataType: 'json',
	    success: function (data, textStatus, jqXHR) {
	        $.publish(modelo.entidad + "/listado", [data.d]);
	    },
	    error: function (jqXHR, textStatus, errorThrown) {
	        alert('*** Error *** \n Metodo: Listado \n Mensaje: ' + errorThrown);
	    },
	    complete: function () { }
	});	
};
Modelo.prototype.Buscar =  function(Campo , Valor){
	var modelo = this;
	$.ajax({
	    type: "POST",
	    contentType: "application/json; charset=utf-8",
		url: this.urlBuscar,
		dataType: 'json',
		data : "{'Campo' : '" + Campo + "', 'Valor' : '" + Valor + "'}",
		success: function(data, textStatus, jqXHR){
			$.publish(modelo.entidad + "/buscar", [data.d]);
		},
		error: function(jqXHR, textStatus, errorThrown){
			alert( '*** Error *** \n Metodo: Buscar \n Mensaje: ' +  errorThrown );
		},
		complete: function(){}
	});	
};
Modelo.prototype.BuscarOptions = function(datos){
	var modelo = this;
	$.ajax({
	    type: "POST",
	    contentType: "application/json; charset=utf-8",
		url: this.urlBuscar,
		dataType: 'json',
		data : datos,
		success: function(data, textStatus, jqXHR){
			$.publish(modelo.entidad + "/buscar", [data.d]);
		},
		error: function(jqXHR, textStatus, errorThrown){
			alert( '*** Error *** \n Metodo: Buscar \n Mensaje: ' +  errorThrown );
		},
		complete: function(){}
	});	
};
Modelo.prototype.Filtrar =  function(campo, valor){
	var modelo = this;
	$.ajax({
	    type: "POST",
	    contentType: "application/json; charset=utf-8",
		url: this.urlFiltrar,
		dataType: 'json',
		data: {'campo': campo, 'valor': valor}, 
		success: function(data, textStatus, jqXHR){
			$.publish(modelo.entidad + "/filtrar", [data]);
		},
		error: function(jqXHR, textStatus, errorThrown){
			alert( '*** Error *** \n Metodo: Filtrar \n Mensaje: ' +  errorThrown );
		},
		complete: function(){}
	});	
};
Modelo.prototype.Insertar =  function(data){
	var modelo = this;

	$.ajax({
	    type: "POST",
	    contentType: "application/json; charset=utf-8",
		url: this.urlInsertar,
		dataType: 'text',
		data : data,
		success: function(data, textStatus, jqXHR){
			$.publish(modelo.entidad + "/insertar", [data]);
		},
		error: function(jqXHR, textStatus, errorThrown){
			alert( '*** Error *** \n Metodo: Insertar \n Mensaje: ' +  errorThrown );
		},
		complete: function(){}
	});	
};

Modelo.prototype.Actualizar =  function(data){
	var modelo = this;
	$.ajax({
		type: 'POST',
		contentType: "application/json; charset=utf-8",
		url: this.urlActualizar,
		dataType: 'json',
		data : data,
		success: function(data, textStatus, jqXHR){
			$.publish(modelo.entidad + "/actualizar" , [data.d]);
		},
		error: function(jqXHR, textStatus, errorThrown){
			alert( '*** Error *** \n Metodo: Actualizar \n Mensaje: ' +  errorThrown );
		},
		complete: function(){}
	});	
};

Modelo.prototype.Eliminar =  function(data){
	var modelo = this;
	$.ajax({
		type: 'POST',
		url: this.urlBorrar,
		dataType: 'text',
		data : data,
		success: function(data, textStatus, jqXHR){
			$.publish(modelo.entidad + "/eliminar", [data]);
		},
		error: function(jqXHR, textStatus, errorThrown){
			alert( '*** Error *** \n Metodo: Eliminar \n Mensaje: ' +  errorThrown );
		},
		complete: function(){}
	});	
};

