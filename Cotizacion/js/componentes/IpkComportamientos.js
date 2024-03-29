var Comportamiento = function(){
    this.trigger = '';
    this.condicion = {};
    this.acciones = {};

    this.rulesManager = new RulesManager();
    this.actionsManager = new ActionsManager();

    return this;
};
Comportamiento.prototype.Configurar = function(comportamiento){
    this.trigger = comportamiento.trigger;
    this.condicion = comportamiento.condicion;
    this.acciones = comportamiento.acciones;

    $('#' + comportamiento.control).on(this.trigger, $.proxy(this.Execute, this));
    $('body').delegate( '#' + comportamiento.control , this.trigger, $.proxy(this.Execute, this));
};
Comportamiento.prototype.Execute = function(){
    var self = this;
    if(! $.isEmptyObject(this.condicion) )
    {
         if(this.rulesManager.Execute(this.condicion))
            this.actionsManager.Execute(this.acciones);
    }
    else
    {
        this.actionsManager.Execute(this.acciones);
    }

};

var Rules = function(elemento){
    return this;
};
Rules.prototype.control = function(options){
    return $('#' + options.options.control);
};
Rules.prototype.Equals = function(options){
    var resultado = false;
    var $control = this.control(options);
    if($control.attr('type') != undefined && $control.attr('type') == 'checkbox')
        resultado  = $control.attr('checked') == options.options.valor;
    else
        resultado = $control.val() == options.options.valor;

    return resultado;
};
Rules.prototype.NotEquals = function(options){
    return this.control(options).val() != options.options.valor;
};

var Actions = function(){
    return this;
};
Actions.prototype.control = function(options){
    return $('#' + options.options.control);
};
Actions.prototype.Enable = function(options){
    this.control(options).attr('disabled', false);
};
Actions.prototype.Disable = function(options){
    this.control(options).attr('disabled', true);
};
Actions.prototype.Hide = function(options){
    this.control(options).hide();
};
Actions.prototype.Show = function(options){
    this.control(options).show();
};
Actions.prototype.Set = function(options){
    this.control(options).val(options.options.valor);
};
Actions.prototype.Alert = function(options){
    alert(options.options.valor);
};
Actions.prototype.CargarNavision = function(options){
    var self = this;

    var navisionDS= new IpkRemoteDataSourceNavision();
    navisionDS.onEjecutarFiltro = function(respuesta){
        if(respuesta.estado = 'OK')
        {
            if(respuesta.datos.length == 0)
            {
                //alert("No hay resultados para la consulta");
            }
            else
            {
                var producto = respuesta.datos[0];
                if(producto.Item_Type != 3)
                {
                    switch(producto.Item_Type)
                    {
                        case 1:
                            respuesta.datos[0].Tipo_Articulo_Desc = 'TERMINADO';
                            break;
                        case 2:
                            respuesta.datos[0].Tipo_Articulo_Desc = 'SEMITERMINADO';
                            break;
                        case 5:
                            respuesta.datos[0].Tipo_Articulo_Desc = 'SOPORTE';
                            break;
                    }

                    //alert('Se ha cargado el producto desde navision');
                    $('#TipoForma').val((respuesta.datos[0].Tipo_Articulo_Desc).replace(' ', ''));
                    $('#Nombre', "#areaControlesFormaArt").val(respuesta.datos[0].Description);
                    $('#PesoBruto').val(respuesta.datos[0].Gross_Weight);
                    $('#PesoNeto').val(respuesta.datos[0].Net_Weight);
                    $('#ProcesoFabricacion').val(respuesta.datos[0].FDF);
                    $('#NumPlano').val(respuesta.datos[0].Code_plan);
                    $('#TratamientoTermico').val(respuesta.datos[0].Tratamiento_termico);
                    $('#HACCP').attr('checked', respuesta.datos[0].hccp);
                    $('#PRODRendimiento').val(respuesta.datos[0].Percent_Std_Efficience);
                    $('#PRODVelocidad').val(respuesta.datos[0].Std_Cadence);
                }
                else
                {
                    if(producto["Almacen_defecto"] != 15)
                    {
                        $('#Nombre', "#areaControlesFormaEmb").val(respuesta.datos[0].Description);
                        $('#LongitudTotal').val( respuesta.datos[0].Longitud_total );
                        $('#Anchura_total').val( respuesta.datos[0].Anchura_total );
                        $('#CalidadEmbalaje').val( respuesta.datos[0].Cod_calidad_carton );
                        $('#CalidadImpresion').val( respuesta.datos[0].Cod_datos_impresion_ext );
                    }
                    else
                    {
                        $('#Nombre', "#areaControlesFormaEmb").val(respuesta.datos[0].Description);
                    }
                }

            }
        }
        else
            alert(respuesta.mensaje);
    };
    var filtro = {
        "No" :  this.control(options).val()
    };

    navisionDS.EjecutarFiltro("ItemCardVCL",filtro, 0);
};
Actions.prototype.GenerarNumDossier = function(options){
    var self = this;

    var tipoDossier = $.trim($('#TipoDossier').val());
    app.modelos.especiales.GenerarNumDossier(JSON.stringify({TipoDossier: tipoDossier})).done(
        function(res){
            $('#NumDossier').val( app.ajax.procesarRespuesta([res]).datos.NumDossier );
        }
    );
};

var ActionsManager = function(){
    this.acciones = new Actions();

    return this;
};
ActionsManager.prototype.Execute = function(action){

    if( action instanceof Array)
    {
        var self = this;
        $.each(action, function(){
            self.acciones[this.nombre](this);
        });
    }
    else
    {
        this.acciones[action.nombre](action);
    }
};

var RulesManager = function(){
    this.rules = new Rules();

    return this;
};
RulesManager.prototype.Execute = function(rule){
    return this.rules[rule.nombre](rule);
};

var ComportamientosManager = function(){
    this.comportamientos = [];

    return this;
};
ComportamientosManager.prototype.Create = function(comportamiento){

    if( comportamiento instanceof Array)
    {
        var self = this;
        $.each(comportamiento, function(){
            var comportamientoTmp = new Comportamiento();
            comportamientoTmp.Configurar(this);
            self.comportamientos.push(comportamientoTmp);
        });
    }
    else
    {
        //this.acciones[comportamiento.nombre](action);
        var comportamientoTmp = new Comportamiento();
        comportamientoTmp.Configurar(this);
        this.comportamientos.push(comportamientoTmp);
    }


};
