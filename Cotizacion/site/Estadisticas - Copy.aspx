<html lang="es">
	<head>
		<title>Estadisticas</title>

        <script type="text/javascript" src="../js/libs/json2.js"></script>
        <link rel='stylesheet' type='text/css' href='../css/ipkweb/jquery-ui-1.8.18.custom.css' />
        <link rel='stylesheet' type='text/css' href='../css/base.css' />
        <link rel='stylesheet' type='text/css' href='../css/estilos.css' />

	</head>
	<body>
        <div class="ui-layout-center">
            <div id="estadistica_LeadTime">
                <h3>Estadistica LEAD TIME</h3>
                <br/>
                <div id="estadistica_LeadTime_Filtro">
                    <table>
                        <thead>
                            <tr>
                                <th><span>Fecha Inicio</span></th>
                                <th><span>Fecha Inicio</span></th>
                                <th><span>Cliente</span></th>
                                <th><span>Unidades</span></th>
                                <th>&nbsp;</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <input type="text" id="fechaInicio" class='datetimeControl' />
                                </td>
                                <td>
                                    <input type="text" id="fechaFin" class='datetimeControl' />
                                </td>
                                <td>
                                    <input type="text" id="cliente" style="width: 400px"/>
                                </td>
                                <td>
                                    <select id="unidades" class="width100p">
                                        <option value="D">D&iacute;as</option>
                                        <option value="H">Horas</option>
                                    </select>
                                </td>
                                <td>
                                    <input type="button" id="btnLanzarEstadistica" value="Lanzar"/>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <br />
                <div id="estadistica_LeadTime_Resultados">
                    <div id="withResults">
                        <div id="estadisticaPorTipos" class='listado width20p'>
                            <table>
                                <thead>
                                    <tr>
                                        <th>&nbsp;</th>
                                        <th>Nº</th>
                                        <th>Tiempo Medio</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Tipo Art&iacute;culo VA</td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>Tipo Art&iacute;culo + Decorado</td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>Tipo Decorado</td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>Tipo Embalaje</td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </tbody>
                                <tfoot>
                                    <tr class="bold">
                                        <td >TOTAL</td>
                                        <td class="totalCuenta center">SUMA</td>
                                        <td class="totalMedia center">MEDIA</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                        <br>
                        <div id="estadisticaPorDepartamentos"  class='listado width50p'>
                          <table>
                              <thead>
                                  <tr>
                                      <th>&nbsp;</th>
                                      <th>COMERCIAL</th>
                                      <th>PRODUCCION</th>
                                      <th>DNP</th>
                                      <th>MOLDES</th>
                                      <th>PROGRAMACION</th>
                                      <th>ANALITICA</th>
                                  </tr>
                              </thead>
                              <tbody></tbody>
                              <tfoot>
                                  <tr class="bold text_align_center">
                                      <td >TOTAL</td>
                                      <td class="MediaComercial center">${MediaComercial}</td>
                                      <td class="MediaProduccion center">${MediaProduccion}</td>
                                      <td class="MediaDnp center">${MediaDnp}</td>
                                      <td class="MediaMoldes center">${MediaMoldes}</td>
                                      <td class="MediaProgramacion center">${MediaProgramacion}</td>
                                      <td class="MediaAnalitica center">${MediaAnalitica}</td>
                                  </tr>
                              </tfoot>
                          </table>
                        </div>
                    </div>
                    <div id="withOutResults" style="display:none;">
                        NO HAY RESULTADOS
                    </div>
                </div>
                <br>
            </div>
    </div>

        <script type="text/template" id="filaEstadisticaPorTipo">
            <tr>
                <td>${TipoDossier}</td>
                <td class="center">${Cuenta}</td>
                <td class="center">${TiempoMedio}</td>
            </tr>
        </script>

        <script type="text/template" id="filaEstadisticaPorDepartamento______">
            <tr>
              <td>${TipoDossier}</td>
              <td class="center">${TR_Produccion}</td>
              <td class="center">${TR_Dnp}</td>
              <td class="center">${TR_Moldes}</td>
              <td class="center">${TR_Programacion}</td>
              <td class="center">${TR_Analitica}</td>
              <td class="center">${TR_Comercial}</td>
            </tr>
        </script>

        <script type="text/template" id="filaEstadisticaPorDepartamento">
                    <tr>
                      <td>${Titulo}</td>
                      <td class="center">${Comercial.MediaHoras}</td>
                      <td class="center">${Produccion.MediaHoras}</td>
                      <td class="center">${Dnp.MediaHoras}</td>
                      <td class="center">${Moldes.MediaHoras}</td>
                      <td class="center">${Programacion.MediaHoras}</td>
                      <td class="center">${Analitica.MediaHoras}</td>
                    </tr>
                </script>

        <script type="text/javascript" src='../js/libs/jquery-1.7.1.min.js'></script>
		<script type="text/javascript" src='../js/libs/jquery-ui-1.8.18.custom.min.js'></script>
		<script type="text/javascript" src="../js/libs/jquery.layout.min.js"></script>
		<script type="text/javascript" src="../js/libs/jquery.tmpl.min.js"></script>
		<script type="text/javascript" src="../js/libs/underscore-min.js"></script>

		<script type="text/javascript" src="../js/base/Utils.js"></script>
		<script type="text/javascript" src="../js/base/framework.base.js"></script>
        <script type="text/javascript" src="../js/base/framework.project.js"></script>
        <script type="text/javascript" src="../js/clases/DataSource.js"></script>

        <script type="text/javascript">
            function configurarDatepicker(){
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
            }
            function configurarControlesFecha(event){
                var $controlOrigen = $(event.target);
                if($controlOrigen.attr('id') == 'fechaInicio')

                    if(fechaInicio.val() === '')
                        fechaFin.datepicker('option',{
                            minDate : ''
                        });
                    else
                        fechaFin.datepicker('option',{
                            minDate : getDateFromString( fechaInicio.val() )
                        });
                else
                    if(fechaFin.val() === '')
                        fechaInicio.datepicker('option',{
                            maxDate : ''
                        });
                    else
                        fechaInicio.datepicker('option',{
                            maxDate : getDateFromString( fechaFin.val() )
                        });

            }
            function getDateFromString(dateString){
                var dia  = dateString.substr(0, 2);
                var mes  = dateString.substr(3, 2) - 1;
                var anyo = dateString.substr(6, 4);

                return new Date(anyo, mes , dia);
            }
            function getSerializedFormData(){
                return JSON.stringify(
                          {
                              FechaInicio: app.utils.Fecha.create( fechaInicio.val() ),
                              FechaFin: app.utils.Fecha.create( fechaFin.val() ),
                              Cliente: cliente.val(),
                              Unidades : unidades.val()
                          });
            }

            function onBtnLanzarClicked(){
                // Validamos las fechas introducidas
                    // Validamos que las fechas estén rellenas
                    // Validamos que el rango sea valido

                 if(validar())
                    lanzarConsulta();
                 else
                    alert('El comprueba los datos introducidos en el filtro.');

                // LanzarConsulta (Asincrono)
                    //  Lanzar estadistica por tipos
                    //  Lanzar estadistica por departamentos

            }

            function validar(){
                return validarFechasCompletadas() && validarRangoFechas();
            }
            function validarFechasCompletadas(){
                return ( fechaInicio.val().length > 0 && fechaFin.val().length > 0);
            }
            function validarRangoFechas(){
                return ( fechaInicio.datepicker('getDate') <= fechaFin.datepicker('getDate') );
            }

           function lanzarConsulta(){
                lanzarEstadisticaPorTipoDosier();
                lanzarEstadisticaPorDepartamento();
           }
           function lanzarEstadisticaPorTipoDosier(){
                app.modelos.especiales.Estadistica_TMR_Dossier_PorTipo(
                    getSerializedFormData()
                ).done(
                    formatearRespuestaEstadisticaPorTipoDosier
                );
           }
           function lanzarEstadisticaPorDepartamento(){
               app.modelos.especiales.Estadistica_TMR_Dossier_PorDepartamento(
                   getSerializedFormData()
               ).done(
                   formatearRespuestaEstadisticaPorDepartamento
               );
           }

           function formatearRespuestaEstadisticaPorTipoDosier(datos, estado, xhr){
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

               console.log(resultado);

                $('#estadisticaPorTipos tbody tr').remove();

                $('#filaEstadisticaPorTipo')
                    .tmpl(resultado)
                    .appendTo('#estadisticaPorTipos tbody');

                $('#estadisticaPorTipos tfoot td.totalCuenta').text(sumaCuenta);
                $('#estadisticaPorTipos tfoot td.totalMedia').text( Math.round( sumaLeadTime / sumaCuenta) );

               return resultado;
           }
           function formatearRespuestaEstadisticaPorDepartamento(datos, estado, xhr){
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
                  //console.log(registro );
                  objResultados[registro.Tipo][registro.Departamento] = registro;

                  datosHoras[registro.Departamento].horas = datosHoras[registro.Departamento].horas + registro.SumaHoras;
                  datosHoras[registro.Departamento].numDossieres = datosHoras[registro.Departamento].numDossieres + registro.Cuenta;
                  
                  /*resultado.push({
                      TipoDossier : dicTiposDossier[registro.TipoDossier],
                      TR_Produccion : registro.TR_Produccion,
                      TR_Dnp : registro.TR_Dnp,
                      TR_Moldes : registro.TR_Moldes,
                      TR_Programacion : registro.TR_Programacion,
                      TR_Analitica : registro.TR_Analitica,
                      TR_Comercial : registro.TR_Comercial
                  });*/
                }

                //console.log(resultado);
                //console.log(objResultados);
                console.log(datosHoras);

                $('#estadisticaPorDepartamentos tbody tr').remove();

                var $filaEstadisticaPorDepartamento = $('#filaEstadisticaPorDepartamento');

                if(ComprobarTipoDossierTieneDatos( objResultados.VA ) )
                {
                    $filaEstadisticaPorDepartamento
                        .tmpl(objResultados.VA)
                        .appendTo('#estadisticaPorDepartamentos tbody');
                }
                if(ComprobarTipoDossierTieneDatos( objResultados.VD ) )
                {
                    $filaEstadisticaPorDepartamento
                        .tmpl(objResultados.VD)
                        .appendTo('#estadisticaPorDepartamentos tbody');
                }
                if(ComprobarTipoDossierTieneDatos( objResultados.DE ) )
                {
                        $filaEstadisticaPorDepartamento
                            .tmpl(objResultados.DE)
                            .appendTo('#estadisticaPorDepartamentos tbody');
                }

                if(ComprobarTipoDossierTieneDatos( objResultados.EM ) )
                {
                    $filaEstadisticaPorDepartamento
                        .tmpl(objResultados.EM)
                        .appendTo('#estadisticaPorDepartamentos tbody');
                }


                var $estadisticaPorDepartamentos =  $('#estadisticaPorDepartamentos');
                $estadisticaPorDepartamentos.find('.MediaComercial').text( Math.round(datosHoras.Comercial.horas / datosHoras.Comercial.numDossieres));
                $estadisticaPorDepartamentos.find('.MediaProduccion').text( Math.round(datosHoras.Produccion.horas / datosHoras.Produccion.numDossieres));
                $estadisticaPorDepartamentos.find('.MediaDnp').text( Math.round(datosHoras.Dnp.horas / datosHoras.Dnp.numDossieres));
                $estadisticaPorDepartamentos.find('.MediaMoldes').text( Math.round(datosHoras.Moldes.horas / datosHoras.Moldes.numDossieres));
                $estadisticaPorDepartamentos.find('.MediaProgramacion').text( Math.round(datosHoras.Programacion.horas / datosHoras.Programacion.numDossieres));
                $estadisticaPorDepartamentos.find('.MediaAnalitica').text( Math.round(datosHoras.Analitica.horas / datosHoras.Analitica.numDossieres));


                return resultado;
           }

           function ComprobarTipoDossierTieneDatos(TipoDossier){
             return (!$.isEmptyObject( TipoDossier.Comercial ) || !$.isEmptyObject( TipoDossier.Produccion ) || !$.isEmptyObject( TipoDossier.Dnp ) ||
                     !$.isEmptyObject( TipoDossier.Moldes ) || !$.isEmptyObject( TipoDossier.Programacion ) || !$.isEmptyObject( TipoDossier.Analitica ) );
           }
        </script>

        <script type="text/javascript">
            var fechaInicio, fechaFin, cliente, btnLanzar;

            $(document).ready(function(){
                configurarDatepicker();

                fechaInicio = $('#fechaInicio').datepicker();
                fechaFin = $('#fechaFin').datepicker();
                cliente = $('#cliente');
                unidades = $('#unidades');
                btnLanzar = $('#btnLanzarEstadistica');

                fechaInicio.on('change',  configurarControlesFecha);
                fechaFin.on('change', configurarControlesFecha);
                btnLanzar.on('click', onBtnLanzarClicked);
            });
        </script>

	</body>
</html>




