var Hidden = function(campo, options, ficha){
    this._defaults = {};
    this.configuracion = $.extend( this._defaults , options);
    this.configuracion.requerido = !campo.EsNullable;
    this.ficha = ficha;
    this.campo = campo;

    this.tipo = 'hidden';
    this.nombre = campo.Nombre;

    this.errores = [];
    this._control = undefined;

    this._control = this.render(campo);
    this.input = $('input', this._control);

    app.utils.extenderControl( this.input, campo.Eventos, this);
    this.inicializarEventos();

    return this;
};

Hidden.prototype.plantilla = function(){
    var plantilla = "<script type='text/template' id='campoTemplate'>";
    plantilla += "<input type='hidden' name='${Nombre}' id='${Nombre}' class='${Tipo}' readonly='readonly' disabled='disabled'/>";
    plantilla += "</script>";

    return plantilla;
};
Hidden.prototype.render = function(datos){
    return $(this.plantilla()).tmpl(datos);
};
Hidden.prototype.getValor = function(){
    return this.input.val();
};
Hidden.prototype.setValor = function(valor){
    this.input.val(valor);
};
Hidden.prototype.inicializarEventos = function(){
    var self = this;

};
