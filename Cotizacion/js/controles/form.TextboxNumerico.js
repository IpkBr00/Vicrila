/**
 *
 *
 * @param campo
 * @param campo.Nombre
 * @param campo.Titulo
 * @param campo.EsNullable
 * @param campo.Tipo
 * @param options
 * @param options.aceptaDecimales
 * @param options.aceptaNegativos
 */
var TextboxNumerico = function(campo , options, ficha){
    this._defaults = {
        aceptaDecimales : true,
        aceptaNegativos : true
    };
    this.configuracion = $.extend( this._defaults , options);
    //TODO: 05/12/2012 Cambiar esto
    this.configuracion.aceptaDecimales = true;
    //this.configuracion.requerido = $(this.input).hasClass('requerido');
    this.configuracion.requerido = !campo.EsNullable;
    this.ficha = ficha;
    this.campo = campo;

    this.tipo = 'textboxNumerico';
    this.nombre = campo.Nombre;

    this.errores = [];
    this._control = undefined;

    this._control = this.render(campo);
    this.input = $('input', this._control);
    this.indicadorValido  = $('.noValido', this._control).hide();
    this.indicadorTipo = $('.indicadorTipo', this._control);

    if(this.configuracion.requerido)
        this.input.closest('div').addClass('requerido');

    $(this.indicadorTipo).attr('alt' , this.textoHoverTipo());
    $(this.indicadorTipo).attr('title' , this.textoHoverTipo());

    app.utils.extenderControl( this.input, campo.Eventos, this);
    this.inicializarEventos();

    return this;
};

TextboxNumerico.prototype.plantilla = function(){
    var plantilla = "<script type='text/template' id='campoTemplate'>";
    plantilla += "<div class='formElementWrapper medium textboxNumerico'>";
    plantilla += "<label class='formElementLabel' for='${Titulo}'>${Titulo} </label>";
    plantilla += "<span class='formElementRequiredIndicator'>&nbsp;</span>";
    plantilla += "<input type='text' class='formElement ${Tipo}' id='${Nombre}' name='${Nombre}' readonly='readonly' disabled='disabled' />";
    plantilla += "<span class='formElementType indicadorTipo'>";
    plantilla += "<i class='fam text_letter_omega'></i>";
    plantilla += "</span>";
    plantilla += "<span class='formElementErrorInfo noValido'>";
    plantilla += "<i class='fam error'></i>";
    plantilla += "</span>";
    plantilla += "<div class='clearFix'></div>";
    plantilla += "</div>";
    plantilla += "</script>";

    return plantilla;
};
TextboxNumerico.prototype.render = function(datos){
    var $elemento = $(this.plantilla()).tmpl(datos);

    $elemento.find('.noValido').hide();

    return $elemento;
};
TextboxNumerico.prototype.getValor = function(){
    return parseFloat(this.input.val());
};
TextboxNumerico.prototype.setValor = function(valor){
    this.input.val(valor);
};
TextboxNumerico.prototype.serializar = function(){
    var serializado = {};
    serializado[this.nombre] = this.getValor();

    return serializado;
};
TextboxNumerico.prototype.validar = function(){
    this.errores = [];

    var valor = $(this.input).val();

    if(valor.length > 0)
    {
        if( ! this.validarNumeros( valor  ) ) this.errores.push('Solo se permiten n\u00FAmeros');
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


TextboxNumerico.prototype.textoHoverTipo = function(){
    var txtAcepta = "N\u00FAmerico\n";
    if(this.configuracion.aceptaDecimales)
        txtAcepta += "\n- Acepta decimales";
    if(this.configuracion.aceptaNegativos)
        txtAcepta += "\n- Acepta negativos";

    return txtAcepta;
};
TextboxNumerico.prototype.inicializarEventos = function(){
    var self = this;

    $(this.input).on('blur', function(){
       self.validar();
    });

};

TextboxNumerico.prototype.mensajeErrores = function(strString){
    var cadenaErrores  = '';

    $(this.errores).each(function(){
        cadenaErrores += this ;
        cadenaErrores += '\n\n';

    });

    return cadenaErrores;
};
TextboxNumerico.prototype.validarNumeros = function(strString){
    var strValidChars = "0123456789";
    var strChar;
    var blnResult = true;

    if( this.configuracion.aceptaDecimales )  strValidChars+=".";
    if( this.configuracion.aceptaNegativos )  strValidChars+="-";

    if (strString.length == 0) return false;

    for (i = 0; i < strString.length && blnResult == true; i++)
    {
        strChar = strString.charAt(i);
        if (strValidChars.indexOf(strChar) == -1)
        {
            blnResult = false;
        }
    }

    return blnResult;
};
