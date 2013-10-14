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
    },
    refresh : function(registro){
        this.registro = registro;
        this.$table.remove();
        this.render();
    }
};