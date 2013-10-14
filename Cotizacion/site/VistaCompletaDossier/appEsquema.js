var appEsquema = function(autoCarga){
    this.i = new IpkInfraestructura();
    this.modelos = {};
    this.listados = {};
    this.fichas = {};
    this.fuentes = {};

    this.configurar();
    if(autoCarga)
        this.inicializar();

    return this;
};
appEsquema.prototype = {
    configurar : function(){
        this.i.onGetModelos = $.proxy(this.cargar, this);
        this.i.onGetFuenteInternas = $.proxy(this.cargarFuenteInternas , this);
        this.i.onGetModelo = $.proxy(this.registrarModelo, this);
        this.i.onGetListado = $.proxy(this.registrarListado, this);
        this.i.onGetFicha = $.proxy(this.registrarFicha, this);
        this.i.onGetFuenteInterna = $.proxy(this.registrarFuenteInterna, this);
    },
    inicializar : function(){


        this.i.getModelos();
        this.i.getfuentesInternas();

    },
    cargar : function(listadoModelos){
        console.log('Listado de Modelos');
        console.log('*************************');
        console.log(listadoModelos);
        for(var j in listadoModelos)
        {
            this.i.getModeloByName(listadoModelos[j].Nombre);
            this.i.getListadoByName(listadoModelos[j].Nombre);
            this.i.getFichaByName(listadoModelos[j].Nombre);
        }
    },
    cargarFuenteInternas : function(listado){
        console.log('Listado de Fuentes Internas');
        console.log('*************************');
        console.log(listado);
        for(var j in listado)
        {
            this.i.getFuenteInternaByName(listado[j].Nombre);
        }
    },
    registrarModelo : function(modelo){
        console.log('Get de Modelos');
        console.log('*************************');
        console.log(modelo.Nombre);
        console.log(modelo);
        this.modelos[modelo.Nombre] = modelo;
    },
    registrarListado : function(listado){
        console.log('Get de Listado');
        console.log('*************************');
        console.log(listado.Nombre);
        console.log(listado);
        this.listados[listado.Nombre] = listado;
    },
    registrarFicha : function(ficha){
        console.log('Get de Fichas');
        console.log('*************************');
        console.log(ficha.Nombre);
        console.log(ficha);
        this.fichas[ficha.Nombre] = ficha;
    },
    registrarFuenteInterna : function(fuente){
        console.log('Get de fuente');
        console.log('*************************');
        console.log(fuente.Nombre);
        console.log(fuente);
        this.fuentes[fuente.Nombre] = fuente;
    }
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

