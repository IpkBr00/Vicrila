var appEsquema = function(autoCarga){
    this.i = new IpkInfraestructura();
    this.modelos = {};
    this.listados = {};
    this.fichas = {};
    this.fuentes = {};
    this.fuentesNavision = {};

    this.configurar();
    if(autoCarga)
        this.inicializar();

    return this;
};
appEsquema.prototype = {
    peticiones : {
        modelos :{},
        fichas :{},
        listados :{},
        fuentes :{},
        fuentesNavision :{}
    },
    tipos : {
        "Modelos": 'modelos',
        "Fichas": 'fichas',
        "Listados": 'listados',
        "FuentesInternas": 'fuentes',
        "FuentesNavision": 'fuentesNavision'
    },
    configurar : function(){
        this.i.onGetModelos = $.proxy(this.cargar, this);
        this.i.onGetFuenteInternas = $.proxy(this.cargarFuenteInternas , this);
        this.i.onGetFuentesNavision = $.proxy(this.cargarFuentesNavision, this);
        this.i.onGetModelo = $.proxy(this.registrarModelo, this);
        this.i.onGetListado = $.proxy(this.registrarListado, this);
        this.i.onGetFicha = $.proxy(this.registrarFicha, this);
        this.i.onGetFuenteInterna = $.proxy(this.registrarFuenteInterna, this);
        this.i.onGetFuenteNavision = $.proxy(this.registrarFuenteNavision, this);
    },
    inicializar : function(){

        this.i.getModelos();
        this.i.getfuentesInternas();
        this.i.getFuentesNavision();

        var that = this;
        //setTimeout( function(){

        that.intervalID = setInterval(function(){
            var pasa = true;

            $.each(that.peticiones, function(indice, elemento){
                $.each(elemento, function(jindice , e){
                    pasa = pasa && e;
                });
            });
            if(pasa){
                console.log('Esquema cargado');
                that.onLoad();
                clearInterval(that.intervalID);
            }
            else{
                console.log('Esquema cargando');
            }
        },1000);
        //} , 2000);

    },
    cargar : function(listadoModelos){
        for(var j in listadoModelos)
        {
            this.peticiones.modelos[listadoModelos[j].Nombre] = false;
            this.peticiones.listados[listadoModelos[j].Nombre] = false;
            this.peticiones.fichas[listadoModelos[j].Nombre] = false;

            this.i.getModeloByName(listadoModelos[j].Nombre);
            this.i.getListadoByName(listadoModelos[j].Nombre);
            this.i.getFichaByName(listadoModelos[j].Nombre);
        }
    },
    cargarFuenteInternas : function(listado){
        for(var j in listado)
        {
            this.peticiones.fuentes[listado[j].Nombre] = false;
            this.i.getFuenteInternaByName(listado[j].Nombre);
        }
    },
    cargarFuentesNavision : function(listado){
        for(var j in listado)
        {
            this.peticiones.fuentesNavision[listado[j].Nombre] = false;
            this.i.getFuenteNavisionByName(listado[j].Nombre);
        }
    },
    registrarModelo : function(modelo){
        this.modelos[modelo.Nombre] = modelo;
        this.peticiones.modelos[modelo.Nombre] = true;
    },
    registrarListado : function(listado){
        this.listados[listado.Nombre] = listado;
        this.peticiones.listados[listado.Nombre] = true;
    },
    registrarFicha : function(ficha){
        this.fichas[ficha.Nombre] = ficha;
        this.peticiones.fichas[ficha.Nombre] = true;
    },
    registrarFuenteInterna : function(fuente){
        this.fuentes[fuente.Nombre] = fuente;
        this.peticiones.fuentes[fuente.Nombre] = true;
    },
    registrarFuenteNavision : function(fuente){
        this.fuentesNavision[fuente.Nombre] = fuente;
        var that = this;
        app.modelos.navision.EjecutarFiltro(
            JSON.stringify(
                Utils.Converters.Navision.prepareConfig(JSON.parse(fuente.Configuracion))
            )
        ).done( function(){
            fuente.Cargada = true;
            fuente.Datos = app.ajax.procesarRespuesta(arguments).datos;
            that.peticiones.fuentesNavision[fuente.Nombre] = true;
        });
    },
    buscar : function(tipo, campo, valor){
        return _.find( this[tipo], function(elemento){ return elemento[campo] == valor;});
    },
    onLoad : function(){}
};
