/**
 * Contructor de consultas para los modelos que permite anidad condiciones
 *
 * @class QueryBuilder
 * @param options Parametros de configuración del control
 * @return {QueryBuilder}
 * @constructor
 */
var QueryBuilder = function( options ){
    this.options = options;
    this.contenedorSelector = ( options.contenedor.substr(0,1) === '#' ) ? options.contenedor : '#' + options.contenedor ;
    this.contenedor = $(this.contenedorSelector);
    this.control = undefined;
    this.plantillas = {};
    this.loadedHtml = undefined;

    this.infraestructura = undefined;
    this.factoria = undefined;
    this.dataSource = undefined;
    this.datosListado = undefined;
    this.listado = undefined;
    this.campos = undefined;
    this.modelo = undefined;

    return this;
};

QueryBuilder.prototype.create = function(){
    this.loadedHtml = this.contenedor.load('html/queryBuilder.html', $.proxy(this.createTemplateCache, this));
};

QueryBuilder.prototype.createTemplateCache = function(html, xhr){
    this.inicializarPlantillas();
    this.inicializarComponentes();
    this.inicializarEventos();
};

QueryBuilder.prototype.inicializarPlantillas = function(){
    var that = this;
    var $html = $(this.loadedHtml);
    var plantillas = $html.find('script');
    $.each(plantillas, function(indice, plantilla){
        that.plantillas[ $(plantilla).attr('id') ]  = $(plantilla);
    });
};
QueryBuilder.prototype.inicializarComponentes = function(){
    var that = this;

    this.infraestructura = new IpkInfraestructura();
    this.infraestructura.getModelos();
    this.infraestructura.onGetModelos = $.proxy(this.crearComboEntidad, this);
    this.infraestructura.onGetModelo = $.proxy(this.crearTablaEntidad, this);

    this.factoria = new IpkRemoteFactory();
    this.factoria.onGetRemoteDataSource = function(respuesta){
        that.dataSource  = respuesta.control;
        that.dataSource.onListado = $.proxy(that.cachearListado, that);
        that.dataSource.onFiltrar = $.proxy(that.ponerDatosFiltroEnListado, that);
    };
    this.factoria.onGetListado = function(respuesta){
        that.listado = respuesta.control;
    };
};
QueryBuilder.prototype.inicializarUI = function(){};
QueryBuilder.prototype.inicializarEventos = function(){
    $('#entidad', this.contenedor).on('change', $.proxy(this.cambiarEntidad, this) );
    $('.addCondition', this.contenedor).on('click', $.proxy(this.crearFilaCondicion, this) );
    $('.entityActions input[type=button]').on('click', $.proxy( this.lanzarFiltro, this) );
};


QueryBuilder.prototype.cambiarEntidad = function(respuesta){
    this.infraestructura.getModeloById($('select#entidad').val());
};
QueryBuilder.prototype.cachearListado = function(respuesta){
    this.datosListado = respuesta.datos;
};
QueryBuilder.prototype.ponerDatosFiltroEnListado = function(respuesta){
    this.listado.setDatos(respuesta.datos);
};
QueryBuilder.prototype.cambioTipoDato = function(evento){
    var $combo = $(evento.currentTarget);
    var id = parseInt($combo.val());
    var campo = _.find(this.campos , function(campo){ return campo.IdCampoModelo == id; });

    $combo.closest('tr').find('td').eq(2).find('select').remove();
    $combo.closest('tr').find('td').eq(2).append(this.crearOperadorParaTipo(campo.Tipo));
    $combo.closest('tr').data('tipo' , campo.Tipo);
    $combo.closest('tr').find('td').eq(3).find('input').eq(0).autocomplete( { source : _.pluck(this.datosListado, campo.Nombre) } );
    $combo.closest('tr').find('td').eq(3).find('inpu,t').eq(0).autocomplete( { source : _.pluck(this.datosListado, campo.Nombre) } );
};
QueryBuilder.prototype.lanzarFiltro = function(){
    this.dataSource.Filtrar(this.getQuery());
};
QueryBuilder.prototype.getQuery = function (){
    var that = this;
    var query = '';
    var $filas = $('.conditionBuilder table tbody tr', this.contenedor);
    $.each($filas, function(indice, $fila){
        query += that.getCondition(indice, $fila);
    });

    return query;
};
QueryBuilder.prototype.getCondition = function (indice, $fila){
    var celdas = $('td', $fila);

    var condicion = {
        orden : indice,
        operadorLogico : (indice > 0) ? $('select' , celdas[0]).eq(0).val() : '',
        campo : $('select' , celdas[1]).eq(0).find('option:selected').text(),
        tipo : $($fila).data('tipo'),
        operador : $('select' , celdas[2]).eq(0).val(),
        valor: $('input' , celdas[3]).eq(0).val()
    };

    return this.getConditionString(condicion);
};
QueryBuilder.prototype.getConditionString = function ( condition ){
    var conditionString = '';

    conditionString += ' ' + condition.operadorLogico + ' ';
    conditionString += ' it.' + condition.campo + ' ';
    conditionString += ' ' + this.formatearOperador(condition.operador) + ' ';
    conditionString += ' ' + this.formatearValor(condition.valor, condition.tipo, condition.operador) + ' ';

    return conditionString;
};
QueryBuilder.prototype.formatearOperador = function(operador){
    var valorFormateado = '';

    switch (operador)
    {
        case 'empiezaPor':
            valorFormateado = " LIKE ";
            break;
        case 'terminaPor':
            valorFormateado = " LIKE ";
            break;
        case 'contiene':
            valorFormateado = " LIKE ";
            break;
        case 'menorIgual':
            valorFormateado = " <= ";
            break;
        case 'menor':
            valorFormateado = " < ";
            break;
        case 'igual':
            valorFormateado = " = ";
            break;
        case 'distinto':
            valorFormateado = " <> ";
            break;
        case 'mayor':
            valorFormateado = " > ";
            break;
        case 'mayorIgual':
            valorFormateado = " >= ";
            break;
    }
    return valorFormateado;
};
QueryBuilder.prototype.formatearValor = function( valor, tipo, operador){
    var valorFormateado = '';

    switch (tipo)
    {
        case 'String':
            valorFormateado = " '" + this.formatearValorString(valor, operador) + "' ";
            break;
        case 'Int32':
            valorFormateado = valor;
            break;
        case 'Double':
            valorFormateado = valor;
            break;
        case 'DateTime':
            valorFormateado = " DATETIME'" + valor.substring(valor.length - 4) +'-' + valor.substring(3, 5) + '-'  + valor.substring(0,2) + " 00:00' ";
            break;
        case 'Boolean':
            valorFormateado = " " + valor + " ";
            break;
        default:
            valorFormateado = valor;
            break;
    }
    return valorFormateado;
};
QueryBuilder.prototype.formatearValorString = function( valor, operador){
    var valorFormateado = '';

    switch (operador)
    {
        case 'empiezaPor':
            valorFormateado =  valor + "%";
            break;
        case 'terminaPor':
            valorFormateado =  "%" + valor ;
            break;
        case 'contiene':
            valorFormateado = "%" + valor  + "%";
            break;
        default :
            valorFormateado = valor;
            break;
    }
    return valorFormateado;
};


QueryBuilder.prototype.crearComboEntidad = function(listadoModelos){
    var $selectorEntidad = $('select#entidad', this.contenedor);
    $selectorEntidad.find('option').remove();

    this.plantillas['optionModelos'].tmpl(listadoModelos).appendTo($selectorEntidad);
    $selectorEntidad.prepend('<option value="-1">Selecciona una entidad</option>');
};
QueryBuilder.prototype.crearComboCampos = function(CamposModelo){
    var camposSeleccionables = _.filter(CamposModelo, function(campo){ return campo.Tipo != 'Reference' && campo.Tipo != 'Collection'; });

    var $select = $('<select></select>');
    $select.addClass('fieldSelector');
    this.plantillas['optionCamposTemplate'].tmpl(camposSeleccionables).appendTo($select);

    return $select;
};
QueryBuilder.prototype.crearTablaEntidad  = function(Modelo){
    $('.conditionBuilder table tbody tr', this.contenedor).remove();
    this.modelo = Modelo;
    this.campos = Modelo.zz_CamposModelos;
    this.factoria.getRemoteDataSource(Modelo.Nombre, 'dataSource');
    var configuracion = {
        contenedor : 'results',
        Nombre : 'results',
        Listado : Modelo.Nombre,
        Ficha : Modelo.Nombre
    };

    this.factoria.getTabla(Modelo.Nombre, 'listado', configuracion);
    this.comboCampos = this.crearComboCampos(Modelo.zz_CamposModelos);
};
QueryBuilder.prototype.crearFilaCondicion  = function(){
    var that = this;
    var fila = $(this.plantillas['filaCondicion'].html());

    $('.conditionBuilder table tbody').append( fila );
    if($('.conditionBuilder table tbody tr').length == 1) {
        $('td', fila).eq(0).find('select').remove();
    }

    this.dataSource.Listado();

    $('td', fila).eq(1).find('select').remove();
    $('td', fila).eq(1).append( $(this.comboCampos).clone() );
    $('td', fila).eq(1).find('select').eq(0).on('change', $.proxy(this.cambioTipoDato, this));
        /*function(){
        var id = parseInt($(this).val());
        var campo = _.find(that.campos , function(campo){ return campo.IdCampoModelo == id; });

        $(this).closest('tr').find('td').eq(2).find('select').remove();
        $(this).closest('tr').find('td').eq(2).append(that.crearOperadorParaTipo(campo.Tipo));
        $(this).closest('tr').data('tipo' , campo.Tipo);
        $(this).closest('tr').find('td').eq(3).find('input').eq(0).autocomplete( { source : _.pluck(that.datosListado, campo.Nombre) } );
    });*/

    $('td', fila).eq(2).find('select').remove();
};
QueryBuilder.prototype.crearOperadorParaTipo = function(Tipo){
    switch (Tipo)
    {
        case 'String':
            break;
        case 'Int32':
            break;
        case 'Double':
            break;
        case 'DateTime':
            break;
        case 'Boolean':
            break;
    }
    return $(this.plantillas['operador'+ Tipo +'Template']).html();
};

