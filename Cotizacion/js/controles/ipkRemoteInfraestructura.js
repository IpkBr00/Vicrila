/**
 * Created by Maikel Merillas
 * User: mg01
 * Date: 17/09/12
 * Time: 10:17
 */

/**
 * Componente para encapsular las llamadas a los metodos del servicio web correspondientes con
 * la configuración del la aplicaión.
 *
 * @class       IpkInfraestructura
 * @name        IpkInfraestructura
 * @constructor
 *
 * @requires    IpkRemoteDataSource
 */
var IpkInfraestructura = function(){

    this.modelosDS = {};
    this.listadosDS = {};
    this.fichasDS = {};

    this.crearModelosDS();
    this.crearListadosDS();
    this.crearFichasDS();

    this.fuentesInternaDS = {};
    this.crearFuentesInternasDS();

    this.fuentesNavisionDS = {};
    this.crearFuentesNavisionDS();
};

/**
 * Funcion interna que crea el IpkRemoteDataSource para consultar zz_Modelos
 *
 * @function
 * @private
 * @memberOf    IpkInfraestructura
 * @name        crearModelosDS
 */
IpkInfraestructura.prototype.crearModelosDS = function(){
    var self = this;
    this.modelosDS = new IpkRemoteDataSource({
        entidad : 'zz_Modelos',
        clave : 'IdModelo'
    });

    this.modelosDS.onListado = function(respuesta){
        if(respuesta.estado = 'OK')
        {
            if(respuesta.datos.length == 0)
                alert("No hay resultados para la consulta");
            else
            {
                if(self['onGetModelos'])
                    self['onGetModelos'].apply(self, [respuesta.datos] );
            }
        }
        else
            alert(respuesta.mensaje);
    };
    this.modelosDS.onBuscar = function(respuesta){
        if(respuesta.estado = 'OK')
        {
            if(respuesta.datos.length == 0)
                alert("No hay resultados para la consulta");
            else
            {
                self.modelo = respuesta.datos[0];

                if(self['onGetModelo'])
                    self['onGetModelo'].apply(self, [self.modelo] );
            }
        }
        else
            alert(respuesta.mensaje);
    };
};
/**
 * Ejecuta el listado de modelos
 *
 * @function
 * @private
 * @memberOf    IpkInfraestructura
 * @name        getModelos
 */
IpkInfraestructura.prototype.getModelos = function(){
    this.modelosDS.Listado();
};
/**
 * Ejecuta la busqueda del modelo por los parametros de busqueda indicados
 *
 * @function
 * @private
 * @memberOf    IpkInfraestructura
 * @name        getModeloBy
 * @param       {Object}   Filtro  Objeto clave/valor con las condiciones del filtro
 */
IpkInfraestructura.prototype.getModeloBy = function(Filtro){
    this.modelosDS.Buscar(Filtro , true, true);
};
/**
 * Obtiene a información del modelo indicado
 *
 * @function
 * @public
 * @memberOf    IpkInfraestructura
 * @name        getModeloById
 * @param       {int}   Id  Id del modelo que queremos recuperar la información
 */
IpkInfraestructura.prototype.getModeloById = function(Id){
    var where = {
        "IdModelo" : Id
    };

    this.getModeloBy(where);
};
/**
 * Obtiene a información del modelo indicado
 *
 * @function
 * @public
 * @memberOf    IpkInfraestructura
 * @name        getModeloByName
 * @param       {string}    Nombre  Nombre del modelo que queremos recuperar la información
 */
IpkInfraestructura.prototype.getModeloByName = function(Nombre){
    var where = {
        "Nombre" : "'" + Nombre + "'"
    };
    this.getModeloBy(where);
};

/**
 * Funcion interna que crea el IpkRemoteDataSource para consultar zz_Listados
 *
 * @function
 * @private
 * @memberOf    IpkInfraestructura
 * @name        crearListadosDS
 */
IpkInfraestructura.prototype.crearListadosDS = function(){
    var self = this;
    this.listadosDS = new IpkRemoteDataSource({
        entidad : 'zz_Listados',
        clave : 'IdListado'
    });

    this.listadosDS.onBuscar = function(respuesta){
        if(respuesta.estado = 'OK')
        {
            if(respuesta.datos.length == 0)
                alert("No hay resultados para la consulta");
            else
            {
                self.listado = respuesta.datos[0];

                if(self['onGetListado'])
                    self['onGetListado'].apply(self, [self.listado] );
            }
        }
        else
            alert(respuesta.mensaje);
    };
};
/**
 * Ejecuta la busqueda del listado por los parametros de busqueda indicados
 *
 * @function
 * @public
 * @memberOf    IpkInfraestructura
 * @name        getListadoBy
 * @param       {Object}   Filtro  Objeto clave/valor con las condiciones del filtro
 */
IpkInfraestructura.prototype.getListadoBy = function(Filtro){
    this.listadosDS.Buscar(Filtro , true, true);
};
/**
 * Obtiene a información del listado indicado
 *
 * @function
 * @public
 * @memberOf    IpkInfraestructura
 * @name        getListadoById
 * @param       {int}   Id  Id del listado que queremos recuperar la información
 */
IpkInfraestructura.prototype.getListadoById = function(Id){
    var where = {
        "IdListado" : Id
    };

    this.getListadoBy(where);
};
/**
 * Obtiene a información del listado indicado
 *
 * @function
 * @public
 * @memberOf    IpkInfraestructura
 * @name        getListadoByName
 * @param       {string}    Nombre  Nombre del listado que queremos recuperar la información
 */
IpkInfraestructura.prototype.getListadoByName = function(Nombre){
    var where = {
        "Nombre" : "'" + Nombre + "'"
    };
    this.getListadoBy(where);
};

/**
 * Funcion interna que crea el IpkRemoteDataSource para consultar zz_Fichas
 *
 * @function
 * @private
 * @memberOf    IpkInfraestructura
 * @name        crearFichasDS
 */
IpkInfraestructura.prototype.crearFichasDS = function(){
    var self = this;
    this.fichasDS = new IpkRemoteDataSource({
        entidad : 'zz_Fichas',
        clave : 'IdFicha'
    });

    this.fichasDS.onBuscar = function(respuesta){
        if(respuesta.estado = 'OK')
        {
            if(respuesta.datos.length == 0)
                alert("No hay resultados para la consulta");
            else
            {
                self.ficha = respuesta.datos[0];

                if(self['onGetFicha'])
                    self['onGetFicha'].apply(self, [self.ficha] );
            }
        }
        else
            alert(respuesta.mensaje);
    };
};
/**
 * Ejecuta la busqueda de la ficha por los parametros de busqueda indicados
 *
 * @function
 * @private
 * @memberOf    IpkInfraestructura
 * @name        getFichaBy
 * @param       {Object}   Filtro  Objeto clave/valor con las condiciones del filtro
 */
IpkInfraestructura.prototype.getFichaBy = function(Filtro){
    this.fichasDS.Buscar(Filtro , true, true);
};
/**
 * Ejecuta la busqueda de la ficha por los parametros de busqueda indicados
 *
 * @function
 * @public
 * @memberOf    IpkInfraestructura
 * @name        getFichaById
 * @param       {int}   Id  Id de la ficha que queremos recuperar la información
 */
IpkInfraestructura.prototype.getFichaById = function(Id){
    var where = {
        "IdFicha" : Id
    };

    this.getFichaBy(where);
};
/**
 * Obtiene a información de la ficha indicada
 *
 * @function
 * @public
 * @memberOf    getFichaByName
 * @name        getListadoByName
 * @param       {string}    Nombre  Nombre de la ficha  que queremos recuperar la información
 */
IpkInfraestructura.prototype.getFichaByName = function(Nombre){
    var where = {
        "Nombre" : "'" + Nombre + "'"
    };
    this.getFichaBy(where);
};

/**
 * Se lanza cuando se completa el listado de modelos
 *
 * @event
 * @name        onGetModelos
 * @memberOf    IpkInfraestructura
 * @param       {Object}    Modelo  Informacion del modelo
 */
IpkInfraestructura.prototype.onGetModelos = function(Modelo){};
/**
 * Se lanza cuando se completa la busqueda de la información del modelo
 *
 * @event
 * @name        onGetModelo
 * @memberOf    IpkInfraestructura
 * @param       {Object}    Modelo  Informacion del modelo
 */
IpkInfraestructura.prototype.onGetModelo = function(Modelo){};
/**
 * Se lanza cuando se completa la busqueda de la información del listado
 *
 * @event
 * @name    onGetListado
 * @memberOf    IpkInfraestructura
 * @param   {Object}    Listado  Informacion del listado
 */
IpkInfraestructura.prototype.onGetListado = function(Listado){};
/**
 * Se lanza cuando se completa la busqueda de la información de la ficha
 *
 * @event
 * @name    onGetFicha
 * @memberOf    IpkInfraestructura
 * @param   {Object}    Ficha  Informacion de la ficha
 */
IpkInfraestructura.prototype.onGetFicha = function(Ficha){};

/**
 * Funcion interna que crea el IpkRemoteDataSource para consultar zz_Fichas
 *
 * @function
 * @private
 * @memberOf    IpkInfraestructura
 * @name        crearFichasDS
 */
IpkInfraestructura.prototype.crearFuentesInternasDS = function(){
    var self = this;
    this.fuentesInternaDS = new IpkRemoteDataSource({
        entidad : 'zz_FuentesInternas',
        clave : 'IdFuente'
    });

    this.fuentesInternaDS.onListado = function(respuesta){
        if(respuesta.estado = 'OK')
        {
            if(respuesta.datos.length == 0)
                alert("No hay resultados para la consulta");
            else
            {
                if(self['onGetFuenteInternas'])
                    self['onGetFuenteInternas'].apply(self, [respuesta.datos] );
            }
        }
        else
            alert(respuesta.mensaje);
    };

    this.fuentesInternaDS.onBuscar = function(respuesta){
        if(respuesta.estado = 'OK')
        {
            if(respuesta.datos.length == 0)
                alert("No hay resultados para la consulta");
            else
            {
                self.fuenteInterna = respuesta.datos[0];

                if(self['onGetFuenteInterna'])
                    self['onGetFuenteInterna'].apply(self, [self.fuenteInterna] );
            }
        }
        else
            alert(respuesta.mensaje);
    };
};
/**
 * Ejecuta el listado de modelos
 *
 * @function
 * @private
 * @memberOf    IpkInfraestructura
 * @name        getModelos
 */
IpkInfraestructura.prototype.getfuentesInternas = function(){
    this.fuentesInternaDS.Listado();
};
/**
 * Ejecuta la busqueda del modelo por los parametros de busqueda indicados
 *
 * @function
 * @private
 * @memberOf    IpkInfraestructura
 * @name        getModeloBy
 * @param       {Object}   Filtro  Objeto clave/valor con las condiciones del filtro
 */
IpkInfraestructura.prototype.getFuenteInternaBy = function(Filtro){
    this.fuentesInternaDS.Buscar(Filtro , true, true);
};
/**
 * Obtiene a información del modelo indicado
 *
 * @function
 * @public
 * @memberOf    IpkInfraestructura
 * @name        getModeloById
 * @param       {int}   Id  Id del modelo que queremos recuperar la información
 */
IpkInfraestructura.prototype.getFuenteInternaById = function(Id){
    var where = {
        "IdFuente" : Id
    };

    this.getFuenteInternaBy(where);
};
/**
 * Obtiene a información del modelo indicado
 *
 * @function
 * @public
 * @memberOf    IpkInfraestructura
 * @name        getModeloByName
 * @param       {string}    Nombre  Nombre del modelo que queremos recuperar la información
 */
IpkInfraestructura.prototype.getFuenteInternaByName = function(Nombre){
    var where = {
        "Nombre" : "'" + Nombre + "'"
    };
    this.getFuenteInternaBy(where);
};

/**
 * Funcion interna que crea el IpkRemoteDataSource para consultar zz_Fichas
 *
 * @function
 * @private
 * @memberOf    IpkInfraestructura
 * @name        crearFichasDS
 */
IpkInfraestructura.prototype.crearFuentesNavisionDS = function(){
    var self = this;
    this.fuentesNavisionDS = new IpkRemoteDataSource({
        entidad : 'zz_FuentesNavision',
        clave : 'IdFuente'
    });

    this.fuentesNavisionDS.onListado = function(respuesta){
        if(respuesta.estado = 'OK')
        {
            if(respuesta.datos.length == 0)
                alert("No hay resultados para la consulta");
            else
            {
                if(self['onGetFuentesNavision'])
                    self['onGetFuentesNavision'].apply(self, [respuesta.datos] );
            }
        }
        else
            alert(respuesta.mensaje);
    };

    this.fuentesNavisionDS.onBuscar = function(respuesta){
        if(respuesta.estado = 'OK')
        {
            if(respuesta.datos.length == 0)
                alert("No hay resultados para la consulta");
            else
            {
                self.fuenteNavision = respuesta.datos[0];

                if(self['onGetFuenteNavision'])
                    self['onGetFuenteNavision'].apply(self, [self.fuenteNavision] );
            }
        }
        else
            alert(respuesta.mensaje);
    };
};
/**
 * Ejecuta el listado de modelos
 *
 * @function
 * @private
 * @memberOf    IpkInfraestructura
 * @name        getModelos
 */
IpkInfraestructura.prototype.getFuentesNavision = function(){
    this.fuentesNavisionDS.Listado();
};
/**
 * Ejecuta la busqueda del modelo por los parametros de busqueda indicados
 *
 * @function
 * @private
 * @memberOf    IpkInfraestructura
 * @name        getModeloBy
 * @param       {Object}   Filtro  Objeto clave/valor con las condiciones del filtro
 */
IpkInfraestructura.prototype.getFuenteNavisionBy = function(Filtro){
    this.fuentesNavisionDS.Buscar(Filtro , true, true);
};
/**
 * Obtiene a información del modelo indicado
 *
 * @function
 * @public
 * @memberOf    IpkInfraestructura
 * @name        getModeloById
 * @param       {int}   Id  Id del modelo que queremos recuperar la información
 */
IpkInfraestructura.prototype.getFuenteNavisionById = function(Id){
    var where = {
        "IdFuente" : Id
    };

    this.getFuenteNavisionBy(where);
};
/**
 * Obtiene a información del modelo indicado
 *
 * @function
 * @public
 * @memberOf    IpkInfraestructura
 * @name        getModeloByName
 * @param       {string}    Nombre  Nombre del modelo que queremos recuperar la información
 */
IpkInfraestructura.prototype.getFuenteNavisionByName = function(Nombre){
    var where = {
        "Nombre" : "'" + Nombre + "'"
    };
    this.getFuenteNavisionBy(where);
};
