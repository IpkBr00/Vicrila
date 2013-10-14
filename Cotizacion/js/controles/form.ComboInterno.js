var ComboInterno = function(campo, options, ficha){
    this._defaults = {
        Tamano : 250
    };
    this.configuracion = $.extend( this._defaults , options);
    this.configuracion.requerido = !campo.EsNullable;
    this.ficha = ficha;
    this.campo = campo;

    this.valor = '';
    if(options.valor)
        this.valor = options.valor;

    this.fuente = {};
    this.fuentesInternasDS = {};

    this.tipo = 'ComboInterno';
    this.nombre = campo.Nombre;

    this.errores = [];
    this._control = undefined;


    this._control = this.render(campo);
    this.select = $('select', this._control);
    this.indicadorValido  = $('.noValido', this._control).hide();

    if(this.configuracion.requerido)
        this.select.closest('div').addClass('requerido');


    if(typeof campo.comportamientos == "string")
    {
        campo.comportamientos = JSON.parse(campo.comportamientos);
        this.comportamiento = new ComportamientosManager();
        this.comportamiento.Create(campo.comportamientos);
    }

    app.utils.extenderControl( this.select, campo.Eventos, this);
    this.inicializarEventos();
    this.crearFuentesInternasDS();
    this.obtenerFuente(campo.IdReferencia);

    return this;
};

ComboInterno.prototype.getValor = function(){
    return this.select.val();
};
ComboInterno.prototype.setValor = function(valor){
    this.select.val(valor);
};

ComboInterno.prototype.plantilla = function(){
    var plantilla = "<script type='text/template' id='campoTemplate'>";
    plantilla += "<div class='formElementWrapper medium ComboInterno'>";
    plantilla += "<label class='formElementLabel' for='${Nombre}'>${Titulo} </label>";
    plantilla += "<span class='formElementRequiredIndicator'>&nbsp;</span>";
    plantilla += "<select class='formElement ${Tipo}' name='${Nombre}' id='${Nombre}' class='${Tipo}' disabled='disabled'></select>";
    plantilla += "<span class='formElementType indicadorTipo'>";
    plantilla += "<i class='fam find'></i>";
    plantilla += "</span>";
    plantilla += "<span class='formElementErrorInfo noValido'>";
    plantilla += "<i class='fam error'></i>";
    plantilla += "</span>";
    plantilla += "<div class='clearFix'></div>";
    plantilla += "</div>";
    plantilla += "</script>";

    return plantilla;
};
ComboInterno.prototype.render = function(datos){
    var $elemento = $(this.plantilla()).tmpl(datos);

    $elemento.find('.noValido').hide();

    return $elemento;
};
ComboInterno.prototype.inicializarEventos = function(){
    var self = this;

    $(this.select).on('blur', function(){
        self.validar();
    });
};
ComboInterno.prototype.validar = function(){
    this.errores = [];

    var valor = $(this.select).val();

    if(valor == -1)
    {
        if(this.configuracion.requerido)
        {
            this.errores.push('Debe seleccionar un valor.');

            this.indicadorValido.show();
            this.indicadorValido.attr('alt', this.mensajeErrores());
            this.indicadorValido.attr('title', this.mensajeErrores());

            $(this.select).closest('div').addClass('noValido');
            $(this.select).closest('div').addClass('error');
        }
    }
    else
    {
        app.log.debug('validate', 'OK');
        this.indicadorValido.hide();
        this.indicadorValido.attr('alt', '');
        this.indicadorValido.attr('title', '');
        $(this.select).closest('div').removeClass('noValido');
        $(this.select).closest('div').removeClass('error');
    }

    return (this.errores.length == 0);
};

ComboInterno.prototype.mensajeErrores = function(strString){
    var cadenaErrores  = '';

    $(this.errores).each(function(){
        cadenaErrores += this ;
        cadenaErrores += '\n\n';

    });

    return cadenaErrores;
};

ComboInterno.prototype.cargarCombo = function(datos){
    var self = this;
    var plantilla = "<script type'text/template'><option value='${Valor}'>${Texto}</option></script>";

    datos = this.limpiarDatos(datos);
    datos = this.ordenarDatos(datos);

    $(plantilla).tmpl(datos).appendTo(this.select);

    if(this.configuracion.requerido)
        this.select.prepend('<option value="-1">Selecciona una opci&oacute;n</option>');

    if(this.valor != '')
        this.setValor(this.valor);
    else
        this.setValor("-1");
};
ComboInterno.prototype.limpiarDatos = function(datos){
    var self = this;
    var datosLimpios = [];

    datosLimpios = _.filter(datos, function(registro){ return $.trim(registro["Valor"]) !== ''; });

    return datosLimpios;
};
ComboInterno.prototype.ordenarDatos = function(datos){
    var self = this;
    var datosOrdenados = [];

    datosOrdenados= _.sortBy(datos, function(registro){ return registro["Valor"]; });

    return datosOrdenados;
};

ComboInterno.prototype.crearFuentesInternasDS = function(){
    var self = this;
    this.fuentesInternasDS = new IpkRemoteDataSource(
        {
            entidad : 'zz_FuentesInternas',
            clave   : 'IdFuente'
        }
    );
    this.fuentesInternasDS.onBuscar = function(respuesta){
        if(respuesta.estado = 'OK')
        {
            if(respuesta.datos.length == 0)
                alert("No hay resultados para la consulta");
            else
            {
                self.fuente = respuesta.datos[0];
                self.fuente.Datos = JSON.parse(self.fuente.Datos);
                self.fuente.Configuracion = JSON.parse(self.fuente.Configuracion);

                self.cargarCombo(self.fuente.Datos);
            }
        }
        else
            alert(respuesta.mensaje);
    };
};
ComboInterno.prototype.obtenerFuente = function(Id){
    var where = {
        IdFuente : Id
    };

    this.fuentesInternasDS.Buscar(where, false, false);
};
