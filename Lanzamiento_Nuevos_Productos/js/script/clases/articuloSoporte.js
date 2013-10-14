var urlBase = 'index.php/ArticuloSoporte/';
var urlListado = urlBase + 'read';
var urlBuscar = urlBase + 'find/';
var urlFiltrar = urlBase + 'Filtrar';
var urlInsertar = urlBase + 'Insertar';
var urlActualizar = urlBase + 'Actualizar';
var urlBorrar = urlBase + 'Eliminar';
var formulario = 'formulario';

var ArticuloSoporte = {
	// Obtiene todos los coches
	"Listado" : function(cbSuccess){
		$.ajax({
			url: urlListado, 
			dataType: 'json',
			success: cbSuccess,
			error: function(){
				alert('No se ha encontrado la página de consulta.');			
			}
		});
	},
	// Busca un coche dado un Id
	"Buscar" : function(Id , cbSuccess){
		$.ajax({
			url: urlBuscar + Id,
			dataType: 'json',
			success: cbSuccess,
			error: function(){
				alert('No se ha encontrado la página de consulta.');			
			}
		});	
	},
	"Filtrar" : function(campo, valor, cbSuccess){
		$.ajax({
			type: 'POST',
			url: urlFiltrar,
			dataType: 'json',
			data: {'campo': campo, 'valor': valor}, 
			success: cbSuccess,
			error: function(){
				alert('No se ha encontrado la página de consulta.');			
			}
		});	
	},
	// Añade un coche a la tabla
	"Insertar" : function(cbSuccess){
		$.ajax({
			type: 'POST',
			url: urlInsertar,
			dataType: 'text',
			data : $('#'+ formulario).serialize(),
			success: cbSuccess,
			error: function(){
				alert('No se ha encontrado la página de consulta.');			
			}
		});	
	},
	// Modifica un coche ya existente
	"Actualizar" : function(cbSuccess){

		$.ajax({
			type: 'POST',
			url: urlActualizar,
			dataType: 'text',
			data : $('#' + formulario).serialize(),
			success: cbSuccess,
			error: function(){
				alert('No se ha encontrado la página de consulta.');			
			}
		});		
	},
	// Elimina el registro con el Id indicado
	"Eliminar" : function(Id, cbSuccess){

		$.ajax({
			type: 'POST',
			url: urlBorrar,
			dataType: 'text',
			data : { 'id': Id},
			success: cbSuccess,
			error: function(){
				alert('No se ha encontrado la página de consulta.');			
			}
		});	
	}
};