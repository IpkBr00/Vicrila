var Checkbox = function(campo, options, ficha){
    this._defaults = {};
    this.configuracion = $.extend( this._defaults , options);
    this.configuracion.requerido = !campo.EsNullable;
    this.ficha = ficha;
    this.campo = campo;


    this.tipo = 'checkbox';
    this.nombre = campo.Nombre;

    this._control = this.render(campo);
    this.input = $('input', this._control);

    app.utils.extenderControl( this.input, campo.Eventos, this);
    this.inicializarEventos();

    return this;
};

Checkbox.prototype.plantilla = function(){
    var plantilla = "<script type='text/template' id='campoTemplate'>";
    plantilla += "<div class='formElementWrapper medium textboxNumerico'>";
    plantilla += "<label class='formElementLabel' for='${Titulo}'>${Titulo} </label>";
    plantilla += "<span class='formElementRequiredIndicator'>&nbsp;</span>";
    plantilla += "<input type='checkbox' class='formElement ${Tipo}' name='${Nombre}' id='${Nombre}' readonly='readonly' disabled='disabled' style='width: 217px' />";
    plantilla += "<div class='clearFix'></div>";
    plantilla += "</div>";
    plantilla += "</script>";

    return plantilla;
};
Checkbox.prototype.render = function(datos){
    return $(this.plantilla()).tmpl(datos);
};
Checkbox.prototype.setValor = function(valor){
    this.input.attr('checked', valor);
};
Checkbox.prototype.getValor = function(valor){
    return this.input.attr('checked') == 'checked' ? true : false;
};

Checkbox.prototype.serializar = function(){
    var serializado = {};
    serializado[this.nombre] = this.getValor();

    return serializado;
};


Checkbox.prototype.inicializarEventos = function(){
    var self = this;

};
