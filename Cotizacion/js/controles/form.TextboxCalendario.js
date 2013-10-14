var TextboxCalendario = function(campo, options,ficha){
    this._defaults = {
    };
    this.configuracion = $.extend( this._defaults , options);
    this.configuracion.requerido = !campo.EsNullable;
    this.ficha = ficha;
    this.campo = campo;

    this.tipo = 'textboxFecha';
    this.nombre = campo.Nombre;

    this.errores = [];
    this._control = undefined;

    this._control = this.render(campo);
    this.input = $('input', this._control);
    this.indicadorValido  = $('.noValido', this._control).hide();
    this.indicadorTipo = $('#indicadorTipo', this._control);

    if(this.configuracion.requerido)
        this.input.closest('div').addClass('requerido');


    app.utils.extenderControl( this.input, campo.Eventos, this);

    $(this.indicadorTipo).attr('alt' , this.textoHoverTipo());
    $(this.indicadorTipo).attr('title' , this.textoHoverTipo());


    app.utils.extenderControl( this.input, campo.Eventos);
    this.inicializarEventos();

    return this;
};

TextboxCalendario.prototype.plantilla = function(){
    var plantilla = "<script type='text/template' id='campoTemplate'>";
    plantilla += "<div class='formElementWrapper medium textboxNumerico'>";
    plantilla += "<label class='formElementLabel' for='${Titulo}'>${Titulo} </label>";
    plantilla += "<span class='formElementRequiredIndicator'>&nbsp;</span>";
    plantilla += "<input type='text' class='formElement ${Tipo}' id='${Nombre}' name='${Nombre}' readonly='readonly' disabled='disabled' />";
    plantilla += "<span class='formElementType indicadorTipo'>";
    plantilla += "<i class='fam date'></i>";
    plantilla += "</span>";
    plantilla += "<span class='formElementErrorInfo noValido'>";
    plantilla += "<i class='fam error'></i>";
    plantilla += "</span>";
    plantilla += "<div class='clearFix'></div>";
    plantilla += "</div>";
    plantilla += "</script>";

    return plantilla;
};
TextboxCalendario.prototype.render = function(datos){
    var control = $(this.plantilla()).tmpl(datos);

    $.datepicker.regional['es'] = {
        closeText: 'Cerrar',
        prevText: '<Ant',
        nextText: 'Sig>',
        currentText: 'Hoy',
        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        monthNamesShort: ['Ene','Feb','Mar','Abr', 'May','Jun','Jul','Ago','Sep', 'Oct','Nov','Dic'],
        dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
        dayNamesShort: ['Dom','Lun','Mar','Mié','Juv','Vie','Sáb'],
        dayNamesMin: ['Do','Lu','Ma','Mi','Ju','Vi','Sa'],
        weekHeader: 'Sm',
        dateFormat: 'dd/mm/yy',
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ''};
    $.datepicker.setDefaults($.datepicker.regional['es']);
    $('#' + datos.Nombre, control).datepicker({
        showButtonPanel: true,
        changeMonth: true,
        changeYear: true,
        buttonImage: "../../img/calendario.png",
        buttonImageOnly: true,
        onSelect: function(dateText){
            $('#' + datos.Nombre, control).blur();
        }
    });



    return control;
};
TextboxCalendario.prototype.getValor = function(){
    return this.input.val();
};
TextboxCalendario.prototype.setValor = function(valor){
    this.input.val(valor);
};
TextboxCalendario.prototype.serializar = function(){
    var serializado = {};
    serializado[this.nombre] = "'" + this.getValor() + "'";

    return serializado;
};
TextboxCalendario.prototype.validar = function(){
    this.errores = [];
    var re = /^\d{1,2}\/\d{1,2}\/\d{4}$/;

    var valor = $(this.input).val();

    if(valor.length > 0)
    {
        if (valor.match(re)==null) this.errores.push('El campo no tiene el formato correcto.');
    }
    else
    {
        if(this.configuracion.requerido) this.errores.push('El campo no puede ser vacio.');
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

TextboxCalendario.prototype.inicializarEventos = function(){
    var self = this;

    $(this.input).on('blur', function(){
        self.validar();
    });

};

TextboxCalendario.prototype.textoHoverTipo = function(){
    var txtAcepta = "Fecha";

    return txtAcepta;
};
TextboxCalendario.prototype.mensajeErrores = function(strString){
    var cadenaErrores  = '';

    $(this.errores).each(function(){
        cadenaErrores += this ;
        cadenaErrores += '\n\n';

    });

    return cadenaErrores;
};
