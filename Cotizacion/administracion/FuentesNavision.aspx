<%@ Assembly Name="SP_WebServices, Version=1.0.0.0, Culture=neutral, PublicKeyToken=d211fcac4eb9099b" %>
<%@ Import Namespace="Microsoft.SharePoint.ApplicationPages" %>
<%@ Register Tagprefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=14.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=14.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="asp" Namespace="System.Web.UI" Assembly="System.Web.Extensions, Version=3.5.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Import Namespace="Microsoft.SharePoint" %>
<%@ Assembly Name="Microsoft.Web.CommandUI, Version=14.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="FuentesNavision.aspx.cs" Inherits="SP_WebServices.Layouts.Cotizacion.administracion.FuentesNavision" DynamicMasterPageFile="~masterurl/default.master" %>

<asp:Content ID="PageHead" ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
    <title>Fuentes de datos de navision</title>

    <script type="text/javascript" src="../js/libs/json2.js"></script>
    <link rel='stylesheet' type='text/css' href='../css/ipkweb/jquery-ui-1.8.18.custom.css' />
    <link rel='stylesheet' type='text/css' href='../css/base.css' />
    <link rel='stylesheet' type='text/css' href='../css/estilos.css' />


    <style type="text/css">
        .filtro{
            border-left: 1px solid #DDD;
            border-right: 1px solid #DDD;
            border-bottom: 1px solid #DDD;


            overflow: hidden;
        }
        .filtro .contenido{
            padding: 10px;
        }
        .filtro .contenido label{
            width : 150px;
            display: inline-block;
            text-align: right;

            margin-right: 5px;
        }
    </style>
</asp:Content>

<asp:Content ID="Main" ContentPlaceHolderID="PlaceHolderMain" runat="server">
 <div class='ui-layout-north' style='margin: 0; padding: 0; overflow: hidden;'>
            <div id='navegacionPlaceholder'>
            </div>
        </div>
        <div class="ui-layout-west">
            <div id='lista'></div>
        </div>
        <div class="ui-layout-center">


            <div class='filtro'>
                <span id='tituloFuente' class='block-Title textAlignIzquierda' style='font-size: 17px;'>Fuente de datos no seleccionada, seleccione una de la lista de la izquierda</span>
                <div id='accionesFiltro'></div>
                <div class='contenido'>
                    <div id='info' class='floatLeft'>
                        <label for="campoValor">Campo Valor</label>
                        <select  name="campoValor" id="campoValor"></select>
                        <br>
                        <label for="campoMostrar">Campos Mostrar</label>
                        <select  name="campoMostrar" id="campoMostrar"></select>
                        <br>
                        <label for="concatenar">Concatenar</label>
                        <input type="checkbox" id='concatenar' name='concatenar' />
                    </div>
                    <div id='areaFiltro' class='width20p floatRight'>
                        <span class='block-Title textAlignIzquierda' style='font-size: 17px;'>Filtro</span>
                        <div id='camposFuente' class='listado'>
                            <table>
                                <thead>
                                <tr>
                                    <th>Campo</th>
                                    <th>Valor</th>
                                </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                        </div>
                        <br>
                    </div>
                </div>
            </div>
            <br>
            <br>
            <div id='tablaPlaceholder' class='listado'>
                <table>
                    <thead></thead>
                    <tbody></tbody>
                </table>
            </div>

            <br>
            <div id='contenedorPreview'>
                <input type="button" id='btnPreview' value='Preview' />
                <div id='controlComboNavision'></div>
            </div>

        </div>

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

        <script type="text/javascript" src="../js/controles/ipkRemoteDataSource.js"></script>
        <script type="text/javascript" src="../js/controles/ipkRemoteDataSourceNavision.js"></script>
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

        <script type="text/javascript" src="../js/vistas/Administracion/PruebasWSNavision.js"></script>

        <div id='dlgAltaListado'>
            <label for="nombreAlta">Nombre</label>
            <input type='text' name="nombreAlta" id="nombreAlta" />
            <br>
            <label for="paginasAlta">P&aacute;ginas</label>
            <select  name='paginasAlta' id="paginasAlta"></select>
        </div>

        <div id='dlgCampos'>
            <label for="campos">Campos</label>
            <select  name="campos" id="campos"></select>
            <br>
            <label for="filtro">Filtro</label>
            <input type='text' name="filtro" id="filtro" />
        </div>

            
        <script id='optionTemplate' type="text/template">
            <option value="${value}">${text}</option>
        </script>

        <script id='camposTemplate' type="text/template">
            <tr>
                <td>${Campo}</td>
                <td>${Valor}</td>
            </tr>
        </script>



		<script type="text/javascript">
		    var pagina = undefined;

		    $(document).ready(function () {
		        pagina = new NavisioWSPage();
		    });
		</script>
</asp:Content>

<asp:Content ID="PageTitle" ContentPlaceHolderID="PlaceHolderPageTitle" runat="server">
Página de aplicación
</asp:Content>

<asp:Content ID="PageTitleInTitleArea" ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server" >
Mi página de aplicación
</asp:Content>
