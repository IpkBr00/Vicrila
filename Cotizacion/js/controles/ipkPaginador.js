var ipkPaginador = function(options){

    this.control = undefined;
    this.paginaActual  = 1;
    this.paginaTotal   = 10;
    this.tamanyoPagina = 15;

    if(options)
        this.configurar(options);

    return this;
};

ipkPaginador.prototype.configurar = function(options){
    this.control = options.contenedor;

    this.inicializar_componente();
};
ipkPaginador.prototype.resetear = function(options){
    this.paginaActual = 1;
    this.paginaTotal = (options.paginaTotal) ? options.paginaTotal : 1;
    this.tamanyoPagina = (options.tamanyoPagina) ? options.tamanyoPagina : 15;

    this.actualizarTextos();
    this.onResetear(
        {
            paginaActual : this.paginaActual,
            tamanyoPagina   : this.tamanyoPagina
        }
    );
};
ipkPaginador.prototype.inicializar_componente = function(){
    this.inicializar_eventos();
    this.actualizarTextos();
};
ipkPaginador.prototype.inicializar_eventos = function(){
    $('.btnAtras'   , this.control).on('click', $.proxy( this.btnAtrasPulsado   , this));
    $('.btnAdelante', this.control).on('click', $.proxy( this.btnAdelantePulsado, this));
};

ipkPaginador.prototype.actualizarTextos = function(){
    $('.paginaActual' , this.control).text( this.paginaActual );
    $('.paginaTotal' , this.control).text( this.paginaTotal );
};
ipkPaginador.prototype.btnAtrasPulsado = function(){
    var irAPaginaNumero = this.paginaActual - 1;

    if(irAPaginaNumero >= 1)
    {
        this.paginaActual = irAPaginaNumero;
        this.onBtnAtrasClick(
            {
                irAPaginaNumero : irAPaginaNumero,
                tamanyoPagina   : this.tamanyoPagina
            }
        );
        this.actualizarTextos();
    }
    else
        alert('Estás en la primera página, no se puede ir atrás.');

};
ipkPaginador.prototype.btnAdelantePulsado = function(){
    var irAPaginaNumero = this.paginaActual + 1;

    if(irAPaginaNumero <= this.paginaTotal)
    {
        this.paginaActual = irAPaginaNumero;
        this.onBtnAdelanteClick(
            {
                irAPaginaNumero : irAPaginaNumero,
                tamanyoPagina   : this.tamanyoPagina
            }
        );
        this.actualizarTextos();
    }
    else
        alert('Estás en la ultima página, no se puede ir adelente.');
};

// EVENTOS
ipkPaginador.prototype.onResetear = function(eventArgs){};
ipkPaginador.prototype.onBtnAtrasClick = function(eventArgs){};
ipkPaginador.prototype.onBtnAdelanteClick = function(eventArgs){};
