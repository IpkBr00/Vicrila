<%@ Assembly Name="SP_WebServices, Version=1.0.0.0, Culture=neutral, PublicKeyToken=d211fcac4eb9099b" %>
<%@ Import Namespace="Microsoft.SharePoint.ApplicationPages" %>
<%@ Register Tagprefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=14.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=14.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="asp" Namespace="System.Web.UI" Assembly="System.Web.Extensions, Version=3.5.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Import Namespace="Microsoft.SharePoint" %>
<%@ Assembly Name="Microsoft.Web.CommandUI, Version=14.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Estadisticas.aspx.cs" Inherits="SP_WebServices.Layouts.Cotizacion.site.Estadisticas" DynamicMasterPageFile="~masterurl/default.master" %>

<asp:Content ID="PageHead" ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
    <script type="text/javascript" src="../js/libs/json2.js"></script>
    <link rel='stylesheet' type='text/css' href='../css/ipkweb/jquery-ui-1.8.18.custom.css' />
    <link rel='stylesheet' type='text/css' href='../css/base.css' />
    <link rel='stylesheet' type='text/css' href='../css/estilos.css' />
</asp:Content>

<asp:Content ID="Main" ContentPlaceHolderID="PlaceHolderMain" runat="server">
        <div class='ui-layout-north' style='margin: 0; padding: 0; overflow: hidden;'>
            <div id='menuPlaceholder'></div>
        </div>
        <div class="ui-layout-center">
            <div id="estadistica_LeadTime">
                <h3>Estadistica LEAD TIME</h3>
                <br/>
                <div id="estadistica_LeadTime_Filtro">
                    <table>
                        <thead>
                            <tr>
                                <th><span>Fecha Inicio</span></th>
                                <th><span>Fecha Fin</span></th>
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
                    <div id="instrucciones">
                        <h4>Instrucciones</h4>
                        <p>Introduce un rango de fechas para el que deseas visualizar los tiempos de resoluci&oacute;n.</p>
                        <p>Puedes tambien introducir un cliente para afinar m&aacute;s la busqueda.</p>
                        <p>En el selector de unidades puedes seleccionar si los resultados se muestran en horas &oacute; d&iacute;as </p>
                    </div>
                    <div id="withResults"  style="display:none;">
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
                        NO HAY RESULTADOS PARA LOS VALORES INTRODUCIDOS
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

            <script type="text/javascript" src="../js/controles/form.CheckBox.js"></script>
            <script type="text/javascript" src="../js/controles/form.Hidden.js"></script>
            <script type="text/javascript" src="../js/controles/form.Textbox.js"></script>
            <script type="text/javascript" src="../js/controles/form.TextboxCalendario.js"></script>
            <script type="text/javascript" src="../js/controles/form.TextboxNumerico.js"></script>
            <script type="text/javascript" src="../js/controles/form.ComboNavision.js"></script>
            <script type="text/javascript" src="../js/controles/form.ComboInterno.js"></script>

            <script type="text/javascript" src="../js/controles/ipkRemoteDataSource.js"></script>
            <script type="text/javascript" src="../js/controles/ipkToolbar.js"></script>
            <script type="text/javascript" src="../js/controles/ipkLista.js"></script>
            <script type="text/javascript" src="../js/controles/ipkTabla.js"></script>
            <script type="text/javascript" src="../js/controles/ipkFicha.js"></script>
            <script type="text/javascript" src="../js/controles/ipkRemoteTabla.js"></script>
            <script type="text/javascript" src="../js/controles/ipkTablaEditable.js"></script>
            <script type="text/javascript" src="../js/controles/ipkTablaRelacion.js"></script>
            <script type="text/javascript" src="../js/controles/ipkTablaHijos.js"></script>
            <script type="text/javascript" src="../js/controles/ipkMostrarElegir.js"></script>
            <script type="text/javascript" src="../js/controles/ipkRemoteFicha.js"></script>
            <script type="text/javascript" src="../js/controles/ipkRemoteInfraestructura.js"></script>
            <script type="text/javascript" src="../js/controles/ipkRemoteDataSourceNavision.js"></script>
            <script type="text/javascript" src="../js/controles/ipkPaginador.js"></script>
            <script type="text/javascript" src="../js/componentes/IpkComportamientos.js"></script>
            <script type="text/javascript" src="../js/controles/ipkFactory.js"></script>
            <script type="text/javascript" src="../js/componentes/QueryBuilder/queryBuilder.js"></script>

            <script type="text/javascript" src="../js/vistas/Estadisticas.js"></script>

        <script type="text/javascript">

            var estadisticasPage = undefined;
            $(document).ready(function () {
                esconderNavSP();
                app.configuracion.navegacion();
                estadisticasPage = new EstadisticasPage();
            });
        </script>
</asp:Content>

<asp:Content ID="PageTitle" ContentPlaceHolderID="PlaceHolderPageTitle" runat="server">
Estadisticas
</asp:Content>

<asp:Content ID="PageTitleInTitleArea" ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server" >
Estadisticas
</asp:Content>
