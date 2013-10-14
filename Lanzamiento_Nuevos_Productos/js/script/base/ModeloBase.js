var Modelo = function(options){
	this.urlBase = options.urlBase;
	this.urlListado = this.urlBase + 'read';
	this.urlBuscar = this.urlBase + 'find/';
	this.urlFiltrar = this.urlBase + 'Filtrar';
	this.urlInsertar = this.urlBase + 'Insertar';
	this.urlActualizar = this.urlBase + 'Actualizar';
	this.urlBorrar = this.urlBase + 'Eliminar';

	this.onListadoCompletado = $.Callbacks("unique");
	this.onBuscarCompletado = $.Callbacks("unique");
	this.onFiltrarCompletado = $.Callbacks("unique");
	this.onInsertarCompletado = $.Callbacks("unique");
	this.onActualizarCompletado = $.Callbacks("unique");
	this.onEliminarCompletado = $.Callbacks("unique");
	
		
};
Modelo.prototype.Init = function(){
};
Modelo.prototype.Listado = function(){


	var modelo = this;
	$.ajax({
		url: this.urlListado, 
		dataType: 'json',
		success: function(data, textStatus, jqXHR){
			$.publish("listado", [data]);
			modelo.onListadoCompletado.fire(data);
		},
		error: function(jqXHR, textStatus, errorThrown){
			alert( '*** Error *** \n Metodo: Listado \n Mensaje: ' +  errorThrown );
		},
		complete: function(){}
	});	
};
Modelo.prototype.Buscar =  function(Id){
	var modelo = this;
	$.ajax({
		url: this.urlBuscar + Id,
		dataType: 'json',
		success: function(data, textStatus, jqXHR){
			modelo.onBuscarCompletado.fire(data);
			$.publish("buscar", [data]);
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
		type: 'POST',
		url: this.urlFiltrar,
		dataType: 'json',
		data: {'campo': campo, 'valor': valor}, 
		success: function(data, textStatus, jqXHR){
			modelo.onFiltrarCompletado.fire(data);
			$.publish("filtrar", [data]);
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
		type: 'POST',
		url: this.urlInsertar,
		dataType: 'text',
		data : data,
		success: function(data, textStatus, jqXHR){
			modelo.onInsertarCompletado.fire(data);
			$.publish("insertar", [data]);
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
		url: this.urlActualizar,
		dataType: 'text',
		data : data,
		success: function(data, textStatus, jqXHR){
			modelo.onActualizarCompletado.fire(data);
			$.publish("actualizar" , [data]);
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
			modelo.onEliminarCompletado.fire(data);
			$.publish("eliminar", [data]);
		},
		error: function(jqXHR, textStatus, errorThrown){
			alert( '*** Error *** \n Metodo: Eliminar \n Mensaje: ' +  errorThrown );
		},
		complete: function(){}
	});	
};

