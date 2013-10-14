var VisorHojasCotizacion = function(options){
    this.propiedades = options;

    this.tabs = undefined;

    this.hojaCotizacionCliente = undefined;
    this.hojaCotizacionComercial = undefined;

    return this;
};

VisorHojasCotizacion.prototype.create = function(){
    var that = this,
        contenedor = "body";

    if(this.propiedades && this.propiedades.contenedor)
        contenedor = this.propiedades.contenedor;

    $(contenedor).append("<div id='dialogVisorHojasCotizacion'><div id='tabsHojasCotizacion' class='width100p'><ul><li><a href='#tabCliente'>Cliente</a></li><li><a href='#tabComercial'>Comercial</a></li></ul><div id='tabCliente' class='listado'></div><div id='tabComercial' class='listado'></div></div>");
    this.tabs  = $('#tabsHojasCotizacion').tabs();

    this.hojaCotizacionCliente = new HojaCotizacionCliente({
        contenedor : '#tabCliente',
        trigger    : '#btnAbrirHojaCotizacion'
    });
    this.hojaCotizacionCliente.create();
    this.hojaCotizacionComercial = new HojaCotizacionComercial({
        contenedor : '#tabComercial',
        trigger    : '#btnAbrirHojaCotizacion'
    });
    this.hojaCotizacionComercial.create();

    this.inicializarUI();
};
VisorHojasCotizacion.prototype.inicializarUI = function(){
    this.dialogo = $('#dialogVisorHojasCotizacion').dialog(
        {
            title       : 'Hojas de cotización',
            autoOpen    : false,
            modal       : true,
            width       : '1000',
            height      : 'auto'
        }
    );
};
VisorHojasCotizacion.prototype.inicializarEventos = function(){
    var that = this;

    $(this.propiedades.trigger).on('click', function(){
        that.abrir();
    });
};

VisorHojasCotizacion.prototype.cargarSolucion = function(Id, Dossier){
    this.hojaCotizacionCliente.cargarSolucion(Id, Dossier);
    this.hojaCotizacionComercial.cargarSolucion(Id, Dossier);
};

VisorHojasCotizacion.prototype.abrir = function(){
    this.dialogo.dialog('open');
};
VisorHojasCotizacion.prototype.cerrar = function(){
    this.dialogo.dialog('close');
};


