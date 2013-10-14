var Paginador = function(options){

    this.control = undefined;
    this.paginaActual  = 1;
    this.paginaTotal   = 10;
    this.tamanyoPagina = 15;

    if(options)
        this.configurar(options);

    return this;
};

Paginador.prototype.configurar = function(options){
    this.control = options.contenedor;

    this.inicializar_componente();
};
Paginador.prototype.resetear = function(options){
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
Paginador.prototype.inicializar_componente = function(){
    this.inicializar_eventos();
    this.actualizarTextos();
};
Paginador.prototype.inicializar_eventos = function(){
    $('.btnAtras'   , this.control).on('click', $.proxy( this.btnAtrasPulsado   , this));
    $('.btnAdelante', this.control).on('click', $.proxy( this.btnAdelantePulsado, this));
};

Paginador.prototype.actualizarTextos = function(){
    $('.paginaActual' , this.control).text( this.paginaActual );
    $('.paginaTotal' , this.control).text( this.paginaTotal );
};
Paginador.prototype.btnAtrasPulsado = function(){
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
Paginador.prototype.btnAdelantePulsado = function(){
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
Paginador.prototype.onResetear = function(eventArgs){};
Paginador.prototype.onBtnAtrasClick = function(eventArgs){};
Paginador.prototype.onBtnAdelanteClick = function(eventArgs){};
