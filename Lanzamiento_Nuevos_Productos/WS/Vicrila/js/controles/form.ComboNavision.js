var ComboNavision = function(campo, options){
    this._defaults = {
        Tamano : 250
    };
    this.configuracion = $.extend( this._defaults , options);
    this.configuracion.requerido = !campo.EsNullable;

    this.valor = '';
    if(options.valor)
        this.valor = options.valor;

    this.fuente = {};
    this.fuentesNavisionDS = {};
    this.navisionDS = {};

    this.tipo = 'ComboNavision';
    this.nombre = campo.Nombre;

    this.errores = [];
    this._control = undefined;

    this._control = this.render(campo);
    this.select = $('select', this._control);

    this.inicializarEventos();
    this.crearNavisionDS();
    this.crearFuentesNavisionDS();
    this.obtenerFuente(campo.IdReferencia);

    return this;
};


ComboNavision.prototype.getValor = function(){
    return this.select.val();
};
ComboNavision.prototype.setValor = function(valor){
    this.select.val(valor);
};

ComboNavision.prototype.plantilla = function(){
    var plantilla = '<script	type="text/template" id="campoTemplate">';
    plantilla += '<div class="comboNavision floatLeft">';
    plantilla += '<label for="${Nombre}" class="">${Titulo}</label>';
    plantilla += '<select name="${Nombre}" id="${Nombre}" class="${Tipo}" disabled="disabled"></select>';
    plantilla += '</div>';
    plantilla += '</script>';

    return plantilla;
};
ComboNavision.prototype.render = function(datos){
    return $(this.plantilla()).tmpl(datos);
};
ComboNavision.prototype.inicializarEventos = function(){
    var self = this;
};
ComboNavision.prototype.mensajeErrores = function(strString){
    var cadenaErrores  = '';

    $(this.errores).each(function(){
        cadenaErrores += this ;
        cadenaErrores += '\n\n';

    });

    return cadenaErrores;
};

ComboNavision.prototype.limpiarDatos = function(datos){
    var self = this;
    var datosLimpios = [];

    datosLimpios = _.filter(datos, function(registro){ return $.trim(registro[self.fuente.CampoMostrar]) !== ''; });

    return datosLimpios;
};
ComboNavision.prototype.cargarCombo = function(datos){
    var self = this;
    var plantilla = "" ;
    if(this.fuente.Concatenar)
        plantilla =  "<script type'text/template'><option value='${" + this.fuente.CampoValor + "}'>${" + this.fuente.CampoValor + "} - ${" + this.fuente.CampoMostrar +"}</option></script>";
    else
        plantilla =  "<script type'text/template'><option value='${" + this.fuente.CampoValor + "}'>${"+ this.fuente.CampoMostrar +"}</option></script>";

    datos  = this.limpiarDatos(datos);
    datos = this.ordenarDatos(datos);

    $(plantilla).tmpl(datos).appendTo(this.select);

    if(this.configuracion.requerido)
        this.select.prepend('<option>Selecciona una opci&oacute;n</option>');


    if(this.valor !='')
        this.setValor(this.valor);

};
ComboNavision.prototype.ordenarDatos = function(datos){
    var self = this;
    var datosOrdenados = [];

    datosOrdenados= _.sortBy(datos, function(registro){ return registro[self.fuente.CampoMostrar]; });

    return datosOrdenados;
};

ComboNavision.prototype.crearNavisionDS = function(){
    var self = this;

    this.navisionDS= new IpkRemoteDataSourceNavision();
    this.navisionDS.onEjecutarFiltro = function(respuesta){
        if(respuesta.estado = 'OK')
        {
            if(respuesta.datos.length == 0)
                alert("No hay resultados para la consulta");
            else
            {
                self.cargarCombo(respuesta.datos);
            }

        }
        else
            alert(respuesta.mensaje);
    };
};
ComboNavision.prototype.crearFuentesNavisionDS = function(){
    var self = this;
    this.fuentesNavisionDS = new IpkRemoteDataSource(
        {
            entidad : 'zz_FuentesNavision',
            clave   : 'IdFuente'
        }
    );
    this.fuentesNavisionDS.onBuscar = function(respuesta){
        if(respuesta.estado = 'OK')
        {
            if(respuesta.datos.length == 0)
                alert("No hay resultados para la consulta");
            else
            {
                self.fuente = respuesta.datos[0];
                self.fuente.Configuracion = JSON.parse(self.fuente.Configuracion);

                self.navisionDS.EjecutarFiltro(self.fuente.Configuracion.Pagina, self.fuente.Configuracion.Filtro, self.fuente.Configuracion.Tamanyo)
            }


        }
        else
            alert(respuesta.mensaje);
    };
};
ComboNavision.prototype.obtenerFuente = function(Id){
    var where = {
        IdFuente : Id
    };

    this.fuentesNavisionDS.Buscar(where, false, false);
};
