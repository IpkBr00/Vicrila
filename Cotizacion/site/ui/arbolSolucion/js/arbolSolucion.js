var arbolEstructura = function(configuracion){
    this.defaults = {};
    this.propiedades = $.extend( this.defaults, configuracion );

    this.elemento = {};
    this.dossier = {};
    this.soluciones = {};

    this.crear();

    this.subscripciones();
    this.vincularEventos();

    this.dsNiveles = undefined;
    var that = this;

    this.factoria = new IpkRemoteFactory();
    this.factoria.onGetRemoteDataSource = function(respuesta){
        that.dsNiveles  = respuesta.control;
        that.dsNiveles.onListado = $.proxy(that.cachearListado, that);
        that.dsNiveles.onFiltrar = $.proxy(that.ponerDatosFiltroEnListado, that);
        that.dsNiveles.onBuscar = function(respuesta){
            if(respuesta.estado == "OK")
            {
                if(respuesta.datos.length > 0)
                {
                    var nivelCompleto = respuesta.datos[0];
                    var solucion =_.find(that.soluciones, function(solucion){ return solucion.idSolucion == nivelCompleto.Solucion.idSolucion;});
                    if(solucion.Nivel == null)  solucion.Nivel = [];
                    _.each(solucion.Nivel, function(nivel, indice, lista){
                        if(nivel.IdNivel == nivelCompleto.IdNivel)
                            lista[indice] = nivelCompleto;
                    });

                    //solucion.Nivel.push(nivel);
                    that.renderComponentes( nivelCompleto.IdNivel, nivelCompleto.FormaEmb);
                }
            }
        }
    };
    this.factoria.onGetListado = function(respuesta){
        that.listado = respuesta.control;
    };
    this.factoria.getRemoteDataSource('Nivel', 'dsNiveles');

    return this;
};

arbolEstructura.prototype.subscripciones = function(){
    var self = this;
    app.eventos.escuchar('BuscarEstructuraSolucion', 'Solucion', function(evento, respuesta){
        app.log.debug('BuscarEstructuraSolucion Maikel', respuesta);
        if(respuesta.estado ='OK')
        {
            var solucion = respuesta.datos[0];
            self.soluciones[solucion.idSolucion] = solucion;
            self.renderFormas(solucion.idSolucion);
            self.renderEmbalajes(solucion.idSolucion);
        }
        else
            alert(respuesta.mensaje);
    });



};
arbolEstructura.prototype.vincularEventos = function(){
    var that = this;

    function toggleContent(evento){
        var $elemento = $(evento.target);
        var clase = $elemento.attr('class') || "1";

        if(clase.toLowerCase().indexOf('header') != -1)
        {
            if(evento.target.tagName == "DIV")
                $elemento.next().toggle();
        }
    }
    function getIdSolucion(elemento){
        var solucionHTML = $(elemento).closest('div.solucion');
        var idSolucion = solucionHTML.attr('id').replace('solucion-', '');

        return idSolucion;
    }
    function getIdNivel(elemento){
        var nivelHTML = $(elemento).closest('div.nivel');
        return  nivelHTML.attr('id').replace('nivel-', '');
    }

    $(this.elemento).delegate('.solucion>.header','click', toggleContent);
    $(this.elemento).delegate('.formasHeader'    ,'click', toggleContent);
    $(this.elemento).delegate('.embalajesHeader' ,'click', toggleContent);
    $(this.elemento).delegate('.nivel>.header'   ,'click', toggleContent);

    $(this.elemento).delegate('.nivel>.content>ul>li>a .cancel','click', function(){

        var idSolucion = getIdSolucion(this),
            idNivel    = getIdNivel(this);

        var componenteHTML = $(this).closest('li');
        var idComponente = componenteHTML.attr('id').replace('embalaje-', '');

        var eventArgs = {
            idSolucion : idSolucion,
            idNivel : idNivel,
            idComponente : idComponente,
            sender : componenteHTML
        };
        that.onEliminarComponenteClick(eventArgs);
    });
    $(this.elemento).delegate('.formasContenedor>.formasList>ul>li>a .cancel','click', function(){

        var formaHTML = $(this).closest('li');
        var idForma = formaHTML.attr('id').replace('forma-', '');
        var solucionHTML = $(this).closest('div.solucion');
        var idSolucion = solucionHTML.attr('id').replace('solucion-', '');

        var eventArgs = {
            idSolucion : idSolucion,
            idForma : idForma,
            sender : formaHTML
        };
        that.onEliminarFormaClick(eventArgs);
    });
    $(this.elemento).delegate('#btnVerHojaCotizacion','click', function(e){
        var idSolucion = getIdSolucion(this);
        var eventArgs = {
            idSolucion : idSolucion
        };
        that.onVerHojaCotizacionClick(eventArgs);
    });
    $(this.elemento).delegate('#btnAgregarEmbalaje','click', function(e){
        var idSolucion = getIdSolucion(this);
        var eventArgs = {
            idSolucion : idSolucion
        };
        that.onAgregarNivelClick(eventArgs);
    });
    $(this.elemento).delegate('#btnAgregarArticulo','click', function(e){
        var idSolucion = getIdSolucion(this);
        var eventArgs = {
            idSolucion : idSolucion
        };
        that.onAgregarFormaClick(eventArgs);
    });
    $(this.elemento).delegate('#btnAceptarSolucion','click', function(e){
        var idSolucion = getIdSolucion(this);
        var eventArgs = {
            idSolucion : idSolucion
        };
        that.onAceptarSolucionClick(eventArgs);
    });
    $(this.elemento).delegate('#btnRechazarSolucion','click', function(e){
        var idSolucion = getIdSolucion(this);
        var eventArgs = {
            idSolucion : idSolucion
        };
        that.onRechazarSolucionClick(eventArgs);
    });
    $(this.elemento).delegate('.btnAgregarComponente','click', function(e){
        var nivelHTML = $(this).closest('div.nivel');
        var idNivel= nivelHTML.attr('id').replace('nivel-', '');

        var eventArgs = {
            idSolucion : getIdSolucion(this),
            idNivel : idNivel
        };
        that.seleccionarSolucion(eventArgs.idSolucion);
        that.onAgregarComponenteClick(eventArgs);
    });
    $(this.elemento).delegate('.btnEliminarNivel','click', function(e){
        var eventArgs = {
            idSolucion : getIdSolucion(this),
            idNivel : getIdNivel(this)
        };

        that.seleccionarSolucion(parseInt(eventArgs.idSolucion));
        var nivelSeleccionado = _.find(that.solucionSeleccionada.Nivel, function(nivel){ return nivel["IdNivel"] == parseInt(eventArgs.idNivel)});
        if(nivelSeleccionado.FormaEmb == null)
        {
            that.onEliminarNivelClick(eventArgs);
        }
        else
            if(nivelSeleccionado.FormaEmb.length > 0)
                alert('No se puede eliminar el nivel porque tiene componentes asociados');
            else
                that.onEliminarNivelClick(eventArgs);
    });
    $(this.elemento).delegate('.btnEditarNivel','click', function(e){
        var idSolucion = getIdSolucion(this),
            idNivel = getIdNivel(this);

        that.seleccionarSolucion( parseInt(idSolucion) );
        var nivelSeleccionado = _.find(that.solucionSeleccionada.Nivel, function(nivel){ return nivel["IdNivel"] == parseInt(idNivel)});

        var eventArgs = {
            idSolucion : idSolucion,
            idNivel : idNivel,
            nivel : nivelSeleccionado
        };

        that.onEditarNivelClick(eventArgs);
    });

};

arbolEstructura.prototype.crear = function(){
    var contenedor = $('#'+ this.propiedades.contenedor);
    this.elemento = $('<div class="arbolEstructura"></div>');

    //this.crearToolbar(this.elemento);
    this.crearAreaContenido(this.elemento);
    contenedor.append(this.elemento);
};
arbolEstructura.prototype.crearAreaContenido = function(div){
    var areaContenido = $('<div id="arbolEstructuraContenido" ></div>');
    div.append(areaContenido);
};

arbolEstructura.prototype.render = function(){
    var self = this;
    var soluciones = this.dossier.Solucion;
    var solucionElement = {};

    $('.estructura .arbolEstructura *').remove();

    $.each(soluciones, function(k,v){
        solucionElement = $(self.propiedades.plantilla).tmpl(this).appendTo(self.elemento);
    });

    this.aplicarSeguridad();
};
arbolEstructura.prototype.renderFormas = function(idSolucion){
    var formas = this.soluciones[idSolucion].FormaArt;
    formas = _.sortBy(formas , function (forma) { return forma.TipoForma;});
    var destino = $('.formasList ul',  '#solucion-' + idSolucion);

    $('#solucion-' + idSolucion).find('.numeroFormas').text('('+ formas.length +')');

    $('.formasList ul *',  '#solucion-' + idSolucion).remove();

    $('#formaTemplate').tmpl(formas).appendTo(destino);

    this.aplicarSeguridad();
};
arbolEstructura.prototype.renderEmbalajes = function(idSolucion){
    var nivelesM = this.soluciones[idSolucion].Nivel;
    var formas = this.soluciones[idSolucion].FormaEmb;
    var $solucion = $('#solucion-' + idSolucion);
    var $destino = $('.niveles',  $solucion);
    var $numeroEmbalajes = $solucion.find('.numeroEmbalajes');

    var niveles = _.pluck(formas, 'nNivel');
    var porNiveles = _.groupBy(formas, function(embalaje){ return embalaje.nNivel; });

    $numeroEmbalajes.text('('+ formas.length +')');

    var that = this;

    $('.niveles *',  $solucion).remove();

    if(nivelesM)
    {
        if(nivelesM.length > 0)
        {
            $.each(nivelesM, function(k,v){
                $('#nivelTemplate').tmpl(v).appendTo($destino);
                if(that.dsNiveles)
                    that.dsNiveles.Buscar( {IdNivel : v.IdNivel} , true, true);
                else
                    setTimeout(function(){that.dsNiveles.Buscar( {IdNivel : v.IdNivel} , true, true);}, 2000);
            });
        }
    }
    this.aplicarSeguridad();
};

arbolEstructura.prototype.renderComponentes = function(idNivel, componentes){
    var that = this;

    if(componentes)
    {
        var $nivel = $('#nivel-' + idNivel);
        var $destino = $('.content>ul',  $nivel);
        $('*', $destino).remove();

        if(componentes.length > 0)
        {
            $.each(componentes, function(k,v){
                $('#embalajeTemplate').tmpl(v).appendTo($destino);
            });
        }
    }

    this.aplicarSeguridad();
};

arbolEstructura.prototype.aplicarSeguridad = function(){
    if(app.seguridad.grupoActual == 'cotiz_comercial' || app.seguridad.grupoActual == 'cotiz_dnp' )
    {
        $('.solucion>.header>.actions').show();

        if(app.seguridad.grupoActual == 'cotiz_dnp')
        {
            $('.solucion>.header>.actions>a').hide();
            $('.solucion>.header>.actions>a#btnAgregarEmbalaje').show();
        }


        $('.formasList>ul>li>a').show();
        $('.nivel>.header>a').show();
        $('.nivel>.content a').show();
    }
    else
    {
        $('.solucion>.header>.actions').hide();
        $('.formasList>ul>li>a').hide();
        $('.nivel>.header>a').hide();
        $('.nivel>.content a').hide();
    }
};

arbolEstructura.prototype.cargarDossier = function(dossier){
    var self = this;
    this.dossier = dossier;

    this.render();

    $.each(this.dossier.Solucion, function(){
        if(this !== undefined)
            self.cargarSolucion(this);
    });

    $('.estructura .contentSolucion').hide();
    $('.solucion>.content').hide();

    this.aplicarSeguridad();
};
arbolEstructura.prototype.cargarSolucion = function(solucion){
    var where = {
        IdSolucion : solucion.idSolucion
    };

    var parametros = {
        Entidad : "Solucion",
        Where   : where,
        Referencias :false,
        Colecciones : true,
        Alias   : "BuscarEstructuraSolucion"
    };

    app.servicios.generales.Buscar(JSON.stringify(parametros));
    app.log.debug('IdSolucion', solucion.idSolucion);
};
arbolEstructura.prototype.agregarForma = function(forma){
    this.solucionSeleccionada.FormaArt.push(forma);
    this.renderFormas( this.solucionSeleccionada.idSolucion );
};
arbolEstructura.prototype.quitarForma = function(idForma){
    this.solucionSeleccionada.FormaArt = _.reject(this.solucionSeleccionada.FormaArt, function(registro){ return registro["idFormaArt"] == idForma});
    this.renderFormas( this.solucionSeleccionada.idSolucion );
};
arbolEstructura.prototype.agregarNivel = function(nivel){
    this.solucionSeleccionada.Nivel.push(nivel);
    this.renderEmbalajes( this.solucionSeleccionada.idSolucion );
};
arbolEstructura.prototype.actualizarNivel = function(nivelActualizado){
    _.each(this.solucionSeleccionada.Nivel, function(nivel, indice, lista){
        if(nivel.IdNivel == nivelActualizado.IdNivel)
            lista[indice] = nivelActualizado;
    });
    this.renderEmbalajes( this.solucionSeleccionada.idSolucion );
};
arbolEstructura.prototype.quitarNivel= function(idNivel){
    this.solucionSeleccionada.Nivel = _.reject(this.solucionSeleccionada.Nivel, function(registro){ return registro["IdNivel"] == idNivel});
    this.renderEmbalajes( this.solucionSeleccionada.idSolucion );
};
arbolEstructura.prototype.agregarEmbalaje = function(idNivel, forma){
    //this.solucionSeleccionada.FormaEmb.push(forma);
    //this.renderEmbalajes( this.solucionSeleccionada.idSolucion );

    _.each(this.solucionSeleccionada.Nivel, function(nivel, indice, lista){
        if(nivel.IdNivel == idNivel)
        {
            if(lista[indice].FormaEmb)
            {
                if(lista[indice].FormaEmb == null)
                {
                    lista[indice].FormaEmb = [];
                }
            }
            else
            {
                lista[indice].FormaEmb = [];
            }

            lista[indice].FormaEmb.push(forma);
        }
    });
    this.renderEmbalajes( this.solucionSeleccionada.idSolucion );
};
arbolEstructura.prototype.quitarEmbalaje= function(idSolucion, idNivel, idEmbalaje){
    this.seleccionarSolucion(idSolucion);
    _.each(this.solucionSeleccionada.Nivel, function(nivel, indice, lista){
        if(nivel.IdNivel == idNivel)
        {
            if(lista[indice].FormaEmb)
                if(lista[indice].FormaEmb != null && lista[indice].FormaEmb.length > 0)
                    lista[indice].FormaEmb = _.reject(lista[indice].FormaEmb, function(registro){ return registro["idFormaEmb"] == idEmbalaje});
        }
    });
    //this.solucionSeleccionada.FormaEmb = _.reject(this.solucionSeleccionada.FormaEmb, function(registro){ return registro["idFormaEmb"] == idEmbalaje});
    this.renderEmbalajes( this.solucionSeleccionada.idSolucion );
};

arbolEstructura.prototype.seleccionarSolucion = function(idSolucion){
    this.solucionSeleccionada = this.soluciones[idSolucion];
};

arbolEstructura.prototype.onVerHojaCotizacionClick= function(eventArgs){};
arbolEstructura.prototype.onAgregarNivelClick= function(eventArgs){};
arbolEstructura.prototype.onAgregarFormaClick= function(eventArgs){};
arbolEstructura.prototype.onAceptarSolucionClick= function(eventArgs){};
arbolEstructura.prototype.onRechazarSolucionClick= function(eventArgs){};
arbolEstructura.prototype.onEliminarFormaClick= function(eventArgs){};
arbolEstructura.prototype.onEliminarComponenteClick= function(eventArgs){};
arbolEstructura.prototype.onEditarNivelClick= function(eventArgs){};
arbolEstructura.prototype.onEliminarNivelClick= function(eventArgs){};
arbolEstructura.prototype.onAgregarComponenteClick= function(eventArgs){};

