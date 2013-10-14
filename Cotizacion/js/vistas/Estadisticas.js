var EstadisticasPage = function(){
    this.configurarDatepicker();

    this.fechaInicio = $('#fechaInicio').datepicker({ changeMonth: true,      changeYear: true});
    this.fechaFin = $('#fechaFin').datepicker({ changeMonth: true,      changeYear: true});
    this.cliente = $('#cliente');
    this.unidades = $('#unidades');
    this.btnLanzar = $('#btnLanzarEstadistica');

    this.fechaInicio.on('change', $.proxy(this.configurarControlesFecha, this));
    this.fechaFin.on('change', $.proxy(this.configurarControlesFecha, this));
    this.btnLanzar.on('click', $.proxy(this.onBtnLanzarClicked, this));
};
EstadisticasPage.prototype = {
    configurarDatepicker: function(){
        $.datepicker.regional['es'] = {
            closeText: 'Cerrar',
            prevText: '<Ant',
            nextText: 'Sig>',
            currentText: 'Hoy',
            monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
            monthNamesShort: ['Ene','Feb','Mar','Abr', 'May','Jun','Jul','Ago','Sep', 'Oct','Nov','Dic'],
            dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
            dayNamesShort: ['Dom','Lun','Mar','Mié','Juv','Vie','Sáb'],
            dayNamesMin: ['Do','Lu','Ma','Mi','Ju','Vi','Sa'],
            weekHeader: 'Sm',
            dateFormat: 'dd/mm/yy',
            firstDay: 1,
            isRTL: false,
            showMonthAfterYear: false,
            yearSuffix: ''};
        $.datepicker.setDefaults($.datepicker.regional['es']);
    },
    configurarControlesFecha: function(event){
        var $controlOrigen = $(event.target);
        if($controlOrigen.attr('id') == 'fechaInicio')

            if(this.fechaInicio.val() === '')
                this.fechaFin.datepicker('option',{
                    minDate : ''
                });
            else
                this.fechaFin.datepicker('option',{
                    minDate : this.getDateFromString( this.fechaInicio.val() )
                });
        else
        if(this.fechaFin.val() === '')
            this.fechaInicio.datepicker('option',{
                maxDate : ''
            });
        else
            this.fechaInicio.datepicker('option',{
                maxDate : this.getDateFromString( this.fechaFin.val() )
            });

    },
    getDateFromString: function(dateString){
        var dia  = dateString.substr(0, 2);
        var mes  = dateString.substr(3, 2) - 1;
        var anyo = dateString.substr(6, 4);

        return new Date(anyo, mes , dia);
    },
    getSerializedFormData: function(){
        return JSON.stringify(
        {
            FechaInicio: app.utils.Fecha.create( this.fechaInicio.val() ),
            FechaFin: app.utils.Fecha.create( this.fechaFin.val() ),
            Cliente: this.cliente.val(),
            Unidades : this.unidades.val()
        });
    },
    onBtnLanzarClicked: function(){
        if(this.validar())
            this.lanzarConsulta();
        else
            alert('El comprueba los datos introducidos en el filtro.');
    },
    validar: function(){
        return this.validarFechasCompletadas() && this.validarRangoFechas();
    },
    validarFechasCompletadas: function(){
        return ( this.fechaInicio.val().length > 0 && this.fechaFin.val().length > 0);
    },
    validarRangoFechas: function(){
        return ( this.fechaInicio.datepicker('getDate') <= this.fechaFin.datepicker('getDate') );
    },
    lanzarConsulta: function (){
        this.tieneDatos = false;
        this.lanzarEstadisticaPorTipoDosier();
        this.lanzarEstadisticaPorDepartamento();
    },
    lanzarEstadisticaPorTipoDosier: function(){
        var that = this;
        app.modelos.especiales.Estadistica_TMR_Dossier_PorTipo(
            that.getSerializedFormData()
        ).done(
            $.proxy(that.formatearRespuestaEstadisticaPorTipoDosier, that)
        );
    },
    lanzarEstadisticaPorDepartamento: function(){
        var that = this;
        app.modelos.especiales.Estadistica_TMR_Dossier_PorDepartamento(
            that.getSerializedFormData()
        ).done(
            $.proxy(that.formatearRespuestaEstadisticaPorDepartamento, that)
        );
    },
    formatearRespuestaEstadisticaPorTipoDosier: function(datos, estado, xhr){
        var dicTiposDossier = {
            'DE' : 'Tipo Decorado',
            'EM' : 'Tipo Embalaje',
            'VA' : 'Tipo Artículo',
            'VD' : 'Tipo Artículo + Decorado'
        };

        var respuesta = app.ajax.procesarRespuesta(arguments);
        var sumaCuenta = 0;
        var sumaLeadTime = 0;
        var resultado = [];

        for(var i = 0, registro = undefined; i < respuesta.datos.length; i++ ){
            registro = respuesta.datos[i];
            sumaCuenta += registro.Cuenta;
            sumaLeadTime += registro.LeadTime;

            resultado.push({
                TipoDossier : dicTiposDossier[registro.TipoDossier],
                Cuenta      : registro.Cuenta,
                TiempoMedio : registro.Promedio
            });
        }

        this.tieneDatos =  this.tieneDatos || (respuesta.datos.length > 0);
        console.log(resultado);

        $('#estadisticaPorTipos tbody tr').remove();

        $('#filaEstadisticaPorTipo')
            .tmpl(resultado)
            .appendTo('#estadisticaPorTipos tbody');

        $('#estadisticaPorTipos tfoot td.totalCuenta').text(sumaCuenta);
        $('#estadisticaPorTipos tfoot td.totalMedia').text( Math.round( sumaLeadTime / sumaCuenta) );

        return resultado;
    },
    formatearRespuestaEstadisticaPorDepartamento: function(datos, estado, xhr){
        var dicTiposDossier = {
            'DE' : 'Tipo Decorado',
            'EM' : 'Tipo Embalaje',
            'VA' : 'Tipo Artículo',
            'VD' : 'Tipo Artículo + Decorado'
        };
        var objResultados = {
            'DE' : {
                'Comercial' : {},
                'Produccion' : {},
                'Dnp' : {},
                'Moldes' : {},
                'Programacion' : {},
                'Analitica' : {},
                'Titulo' :'Tipo Decorado'
            },
            'EM' : {
                'Comercial' : {},
                'Produccion' : {},
                'Dnp' : {},
                'Moldes' : {},
                'Programacion' : {},
                'Analitica' : {},
                'Titulo' :'Tipo Embalaje'
            },
            'VA' : {
                'Comercial' : {},
                'Produccion' : {},
                'Dnp' : {},
                'Moldes' : {},
                'Programacion' : {},
                'Analitica' : {},
                'Titulo' :'Tipo Artículo'
            },
            'VD' : {
                'Comercial' : {},
                'Produccion' : {},
                'Dnp' : {},
                'Moldes' : {},
                'Programacion' : {},
                'Analitica' : {},
                'Titulo' :'Tipo Artículo + Decorado'
            }
        };
        var respuesta = app.ajax.procesarRespuesta(arguments);
        var resultado = [];
        var datosHoras = {
            'Comercial' : {
                horas : 0,
                numDossieres : 0
            },
            'Produccion' : {
                horas : 0,
                numDossieres : 0
            },
            'Dnp' : {
                horas : 0,
                numDossieres : 0
            },
            'Moldes' : {
                horas : 0,
                numDossieres : 0
            },
            'Programacion' : {
                horas : 0,
                numDossieres : 0
            },
            'Analitica' : {
                horas : 0,
                numDossieres : 0
            }
        };

        for(var i = 0, registro = undefined; i < respuesta.datos.length; i++ ){
            registro = respuesta.datos[i];
            objResultados[registro.Tipo][registro.Departamento] = registro;

            datosHoras[registro.Departamento].horas = datosHoras[registro.Departamento].horas + registro.SumaHoras;
            datosHoras[registro.Departamento].numDossieres = datosHoras[registro.Departamento].numDossieres + registro.Cuenta;
        }
        this.tieneDatos =  this.tieneDatos || (respuesta.datos.length > 0);


        var $filaEstadisticaPorDepartamento = $('#filaEstadisticaPorDepartamento');
        var $tablaEstadisticaPorDepartamentos = $('#estadisticaPorDepartamentos');

        $tablaEstadisticaPorDepartamentos.find('tbody tr').remove();

        if(this.ComprobarTipoDossierTieneDatos( objResultados.VA ) )
        {
            $filaEstadisticaPorDepartamento
                .tmpl(objResultados.VA)
                .appendTo('#estadisticaPorDepartamentos tbody');
        }
        if(this.ComprobarTipoDossierTieneDatos( objResultados.VD ) )
        {
            $filaEstadisticaPorDepartamento
                .tmpl(objResultados.VD)
                .appendTo('#estadisticaPorDepartamentos tbody');
        }
        if(this.ComprobarTipoDossierTieneDatos( objResultados.DE ) )
        {
            $filaEstadisticaPorDepartamento
                .tmpl(objResultados.DE)
                .appendTo('#estadisticaPorDepartamentos tbody');
        }
        if(this.ComprobarTipoDossierTieneDatos( objResultados.EM ) )
        {
            $filaEstadisticaPorDepartamento
                .tmpl(objResultados.EM)
                .appendTo('#estadisticaPorDepartamentos tbody');
        }

        $tablaEstadisticaPorDepartamentos.find('.MediaComercial').text( Math.round(datosHoras.Comercial.horas / datosHoras.Comercial.numDossieres));
        $tablaEstadisticaPorDepartamentos.find('.MediaProduccion').text( Math.round(datosHoras.Produccion.horas / datosHoras.Produccion.numDossieres));
        $tablaEstadisticaPorDepartamentos.find('.MediaDnp').text( Math.round(datosHoras.Dnp.horas / datosHoras.Dnp.numDossieres));
        $tablaEstadisticaPorDepartamentos.find('.MediaMoldes').text( Math.round(datosHoras.Moldes.horas / datosHoras.Moldes.numDossieres));
        $tablaEstadisticaPorDepartamentos.find('.MediaProgramacion').text( Math.round(datosHoras.Programacion.horas / datosHoras.Programacion.numDossieres));
        $tablaEstadisticaPorDepartamentos.find('.MediaAnalitica').text( Math.round(datosHoras.Analitica.horas / datosHoras.Analitica.numDossieres));


        var $panelDatos = $('#withResults');
        var $panelNoDatos = $('#withOutResults');
        var $panelInstrucciones = $('#instrucciones');

        if(this.tieneDatos)
        {
            $panelDatos.show();
            $panelNoDatos.hide();
            $panelInstrucciones.hide();
        }
        else
        {
            $panelNoDatos.show();
            $panelDatos.hide();
            $panelInstrucciones.hide();
        }


        return resultado;
    },
    ComprobarTipoDossierTieneDatos: function(TipoDossier){
        return (!$.isEmptyObject( TipoDossier.Comercial ) || !$.isEmptyObject( TipoDossier.Produccion ) || !$.isEmptyObject( TipoDossier.Dnp ) ||
                !$.isEmptyObject( TipoDossier.Moldes ) || !$.isEmptyObject( TipoDossier.Programacion ) || !$.isEmptyObject( TipoDossier.Analitica ) );
    }
};

















