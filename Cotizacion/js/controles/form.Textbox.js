var Textbox = function(campo, options, ficha){
    this._defaults = {
        Tamano : 250
    };
    this.configuracion = $.extend( this._defaults , options);
    this.configuracion.requerido = !campo.EsNullable;
    this.ficha = ficha;
    this.campo = campo;

    this.tipo = 'textbox';
    this.nombre = campo.Nombre;

    this.errores = [];
    this._control = undefined;

    this._control = this.render(campo);
    this.input = $('input', this._control);
    this.indicadorValido  = $('.noValido', this._control).hide();
    this.indicadorTipo = $('#indicadorTipo', this._control);

    if(this.configuracion.requerido)
        this.input.closest('div').addClass('requerido');

    if(typeof campo.comportamientos == "string")
    {
        campo.comportamientos = JSON.parse(campo.comportamientos);
        this.comportamiento = new ComportamientosManager();
        this.comportamiento.Create(campo.comportamientos);
    }

    $(this.indicadorTipo).attr('alt' , this.textoHoverTipo());
    $(this.indicadorTipo).attr('title' , this.textoHoverTipo());

    app.utils.extenderControl( this.input, campo.Eventos, this);
    this.inicializarEventos();

    return this;
};


Textbox.prototype.getValor = function(){
    return this.input.val();
};
Textbox.prototype.setValor = function(valor){
    this.input.val(valor);
};
Textbox.prototype.plantilla = function(){
    var plantilla = "<script type='text/template' id='campoTemplate'>";
    plantilla += "<div class='formElementWrapper medium textboxNumerico'>";
    plantilla += "<label class='formElementLabel' for='${Titulo}'>${Titulo} </label>";
    plantilla += "<span class='formElementRequiredIndicator'>&nbsp;</span>";
    plantilla += "<input type='text' class='formElement ${Tipo}' id='${Nombre}' name='${Nombre}' readonly='readonly' disabled='disabled' />";
    plantilla += "<span class='formElementType indicadorTipo'>";
    plantilla += "<i class='fam style'></i>";
    plantilla += "</span>";
    plantilla += "<span class='formElementErrorInfo noValido'>";
    plantilla += "<i class='fam error'></i>";
    plantilla += "</span>";
    plantilla += "<div class='clearFix'></div>";
    plantilla += "</div>";
    plantilla += "</script>";

    return plantilla;
};
Textbox.prototype.render = function(datos){
    var $elemento = $(this.plantilla()).tmpl(datos);

    $elemento.find('.noValido').hide();
    return $elemento;
};
Textbox.prototype.inicializarEventos = function(){
    var self = this;

    $(this.input).on('blur', function(){
       self.validar();
    });

};
Textbox.prototype.serializar = function(){
    var serializado = {};
    serializado[this.nombre] = "'" + this.getValor() + "'";

    return serializado;
};
Textbox.prototype.validar = function(){

    this.errores = [];

    var valor = $(this.input).val();

    if(valor.length > 0)
    {
        if(this.configuracion.tamano>0 && valor.length > this.configuracion.tamano ) this.errores.push('Tama\u00f1o Maximo de ' + this.configuracion.tamano + ' caracteres.');
    }
    else
    {
        if(this.configuracion.requerido) this.errores.push('El campo no puede ser vacio');
    }

    if(this.errores.length > 0)
    {
        app.log.debug('validate', this.errores);
        this.indicadorValido.show();
        this.indicadorValido.attr('alt', this.mensajeErrores());
        this.indicadorValido.attr('title', this.mensajeErrores());
        $(this.input).closest('div').addClass('noValido');
        $(this.input).closest('div').addClass('error');
    }

    else
    {
        app.log.debug('validate', 'OK');
        this.indicadorValido.hide();
        this.indicadorValido.attr('alt', '');
        this.indicadorValido.attr('title', '');
        $(this.input).closest('div').removeClass('noValido');
        $(this.input).closest('div').removeClass('error');
    }

    return (this.errores.length == 0);
};

Textbox.prototype.textoHoverTipo = function(){
    var txtAcepta = "Texto";
    if(this.configuracion.tamano)
        txtAcepta += "\n- Tama\u00f1o Maximo: " + this.configuracion.tamano;

    return txtAcepta;
};
Textbox.prototype.mensajeErrores = function(strString){
    var cadenaErrores  = '';

    $(this.errores).each(function(){
        cadenaErrores += this ;
        cadenaErrores += '\n\n';

    });

    return cadenaErrores;
};

