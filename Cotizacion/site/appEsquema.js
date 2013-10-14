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
        /*
        console.log('Listado de Modelos');
        console.log('*************************');
        console.log(listadoModelos);
        */
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
        /*
        console.log('Listado de Fuentes Internas');
        console.log('*************************');
        console.log(listado);
        */
        for(var j in listado)
        {
            this.peticiones.fuentes[listado[j].Nombre] = false;
            this.i.getFuenteInternaByName(listado[j].Nombre);
        }
    },
    cargarFuentesNavision : function(listado){
        /*
        console.log('Listado de Fuentes Navision');
        console.log('*************************');
        console.log(listado);
        */
        for(var j in listado)
        {
            this.peticiones.fuentesNavision[listado[j].Nombre] = false;
            this.i.getFuenteNavisionByName(listado[j].Nombre);
        }
    },
    registrarModelo : function(modelo){
        /*
        console.log('Get de Modelos');
        console.log('*************************');
        console.log(modelo.Nombre);
        console.log(modelo);
        */
        this.modelos[modelo.Nombre] = modelo;
        this.peticiones.modelos[modelo.Nombre] = true;
    },
    registrarListado : function(listado){
        /*
        console.log('Get de Listado');
        console.log('*************************');
        console.log(listado.Nombre);
        console.log(listado);
        */
        this.listados[listado.Nombre] = listado;
        this.peticiones.listados[listado.Nombre] = true;
    },
    registrarFicha : function(ficha){
        /*
        console.log('Get de Fichas');
        console.log('*************************');
        console.log(ficha.Nombre);
        console.log(ficha);
        */
        this.fichas[ficha.Nombre] = ficha;
        this.peticiones.fichas[ficha.Nombre] = true;
    },
    registrarFuenteInterna : function(fuente){
        /*
        console.log('Get de fuente');
        console.log('*************************');
        console.log(fuente.Nombre);
        console.log(fuente);
        */
        this.fuentes[fuente.Nombre] = fuente;
        this.peticiones.fuentes[fuente.Nombre] = true;
    },
    registrarFuenteNavision : function(fuente){
        /*
        console.log('Get de fuente navision');
        console.log('*************************');
        console.log(fuente.Nombre);
        console.log(fuente);
        */
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

var Utils = {
    HtmlHelpers : {
        toTable : function(obj, options){
            var comodinClave = "$clave$";
            var comodinValor = "$valor$";
            var tmplFila = "<tr><td>$clave$</td><td>$valor$</td></tr>";
            var filas = "";
            var strTitulo = "";

            if( options.titulo )
                strTitulo = "<caption class='"+ options.clase +"'>"+  options.titulo  +"</caption>";
            else
                strTitulo = "<caption class='"+ options.clase +"'>  SIN TITULO  </caption>";

            for(var clave in obj)
            {
                if(obj[clave] == null || obj[clave] == -1)
                    obj[clave] = "";

                if(typeof obj[clave] !== "object")
                    filas = filas + tmplFila.replace(comodinClave, clave).replace(comodinValor, obj[clave]);
            }

            return "<div class='toTable " + ((options.nivel)? "nivel" + options.nivel : "")  + "'><table cellspacing='0' cellpadding='0'>" + strTitulo + "<thead><tr><th>PROPIEDAD</th><th>VALOR</th></tr></thead><tbody>" + filas + "</tbody></table></div>";
        }
    },
    Converters : {
        Navision : {
            prepareConfig: function(configuracion){
                return {
                    Pagina : configuracion.Pagina,
                    Filtro : configuracion.Filtro,
                    TamanyoPagina : configuracion.Tamanyo
                };
            }
        }
    }
};

var ObjectInspector = function($contenedor, registro, options){

    this.$contenedor = $contenedor;
    this.$table = undefined;
    this.registro = registro;
    this.options = options;

    return this;
};
ObjectInspector.prototype = {
    toTable : function(){
        return Utils.HtmlHelpers.toTable(this.registro, this.options );
    },
    toggleTable : function (event){
        var caption = $(event.currentTarget);
        caption.parent().find('thead').toggle();
        caption.parent().find('tbody').toggle();
    },
    render : function(){
        if(this.preRender)
            this.preRender();

        this.$table = $(this.toTable());
        this.$contenedor.append(this.$table);

        if(this.options.colapsable)
        {
            this.$table.find('caption').on('click' , this.toggleTable);
            if(this.options.autoColapse)
                this.$table.find('caption').trigger('click');
        }

        if(this.postRender)
            this.postRender();
    }
};


var ModelInspector = function($contenedor, registro, options){
    this.defaults = {
        titulo : 'Sin Titulo',
        clase : 'colPeterRiver',
        colapsable: true,
        autocolapsable: false
    };
    this.$contenedor = $contenedor;
    this.registro = registro;
    this.options = $.extend( {}, this.defaults, options);

    this.$table = undefined;

    var self = this;

    this.navisionDS= new IpkRemoteDataSourceNavision();
    this.navisionDS.onEjecutarFiltro = function(respuesta){
        if(respuesta.estado = 'OK')
        {
            if(respuesta.datos.length == 0)
                alert("No hay resultados para la consulta");
            else
            {
                console.log(respuesta.datos);
            }

        }
        else
            alert(respuesta.mensaje);
    };

    return this;
};
ModelInspector .prototype = {
    toTable : function(){
       return Utils.HtmlHelpers.toTable( this.generateInternalRecord(), this.options );
    },
    toggleTable : function (event){
        var caption = $(event.currentTarget);
        caption.parent().find('thead').toggle();
        caption.parent().find('tbody').toggle();
    },
    render : function(){
        if(this.preRender)
            this.preRender();

        this.$table = $(this.toTable());
        this.$contenedor.append(this.$table);

        if(this.options.colapsable)
        {
            this.$table.find('caption').on('click' , this.toggleTable);
            if(this.options.autoColapse)
                this.$table.find('caption').trigger('click');
        }

        if(this.postRender)
            this.postRender();
    },
    generateInternalRecord : function(){
        var camposModelo = esquema.modelos[this.options.modelo].zz_CamposModelos;
        var camposFicha = _.sortBy(esquema.fichas[this.options.modelo].zz_CamposFichas, 'Orden');

        var buscarCampoFicha = function(nombre){
            return _.find(camposFicha, function(campo){ return campo.Nombre == nombre;})
        };
        var buscarValorComboInterno = function(id, valor){
            var fuenteInterna = undefined;
            var comboInterno = undefined;
            var seleccion = undefined;

            try{
                fuenteInterna = esquema.buscar(esquema.tipos.FuentesInternas, "IdFuente", id);
                comboInterno = JSON.parse(fuenteInterna.Datos);
                seleccion = _.find(comboInterno, function(registro){ return registro.Valor == valor;});
            }catch(err){
                console.log(err);
            }

            return seleccion;
        };
        var buscarConfiguracionComboNavision = function(id){
            var fuenteInterna = undefined;
            var configuracion = undefined;

            try{
                fuenteInterna = esquema.buscar(esquema.tipos.FuentesNavision, "IdFuente", id);
                configuracion = JSON.parse(fuenteInterna.Configuracion);
            }catch(err){
                console.log(err);
            }

            return configuracion;
        };
        var buscarValorComboNavision = function(id, valor){
            var fuenteInterna = undefined;
            var comboInterno = undefined;
            var seleccion = undefined;

            try{
                fuenteInterna = esquema.buscar(esquema.tipos.FuentesNavision, "IdFuente", id);
                comboInterno = fuenteInterna.Datos;
                configuracion = JSON.parse(fuenteInterna.Configuracion);
                seleccion = _.find(comboInterno, function(registro){ return registro[fuenteInterna.CampoValor] == valor;});

            }catch(err){
                console.log(err);
            }

            return seleccion;
        };

        var infoCampo = undefined;
        var internalRecord = {};
        var that = this;

        $.each( camposFicha, function(indice, campo){
            infoCampo = buscarCampoFicha(campo.Nombre);

            if(infoCampo)
            {
                //if(infoCampo.Grupo == 'cotiz_comercial')
                switch(infoCampo.Tipo)
                {
                    case "ComboInterno":
                        if(that.registro[campo.Nombre] && that.registro[campo.Nombre] != '-1')
                            internalRecord[infoCampo.Titulo] = buscarValorComboInterno(campo.IdReferencia, that.registro[campo.Nombre]).Texto;
                        break;
                    case "ComboNavision":
                        if(that.registro[campo.Nombre] && that.registro[campo.Nombre] != '-1')
                        {
                            var fuenteNavision = _.find(esquema.fuentesNavision, function(fuente){ return fuente.IdFuente == campo.IdReferencia;});
                            var valor = buscarValorComboNavision(campo.IdReferencia, that.registro[campo.Nombre]);
                            if(valor)
                                internalRecord[infoCampo.Titulo] = valor[fuenteNavision.CampoMostrar] + ' - (Navision)';
                            else
                                internalRecord[infoCampo.Titulo] = 'SIN VALOR - N - ' + that.registro[campo.Nombre];
                        }
                        break;
                    case "Boolean":
                        internalRecord[infoCampo.Titulo] = (that.registro[campo.Nombre]) ? "Sí" : "No";
                        break;
                    default :
                        internalRecord[infoCampo.Titulo] = that.registro[campo.Nombre];
                        break;
                }
            }
        } );

        return internalRecord;
    }
};