<%@ Assembly Name="SP_WebServices, Version=1.0.0.0, Culture=neutral, PublicKeyToken=d211fcac4eb9099b" %>
<%@ Import Namespace="Microsoft.SharePoint.ApplicationPages" %>
<%@ Register Tagprefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=14.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=14.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="asp" Namespace="System.Web.UI" Assembly="System.Web.Extensions, Version=3.5.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Import Namespace="Microsoft.SharePoint" %>
<%@ Assembly Name="Microsoft.Web.CommandUI, Version=14.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Listados.aspx.cs" Inherits="SP_WebServices.Layouts.Cotizacion.administracion.Listados" DynamicMasterPageFile="~masterurl/default.master" %>

<asp:Content ID="PageHead" ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
    <title>Administraci&oacute;n de listados</title>

    <link rel='stylesheet' type='text/css' href='../css/ipkweb/jquery-ui-1.8.18.custom.css' />
    <link rel='stylesheet' type='text/css' href='../css/base.css' />
    <link rel='stylesheet' type='text/css' href='../css/estilos.css' />
</asp:Content>

<asp:Content ID="Main" ContentPlaceHolderID="PlaceHolderMain" runat="server">
 <div class='ui-layout-north' style='margin: 0; padding: 0; overflow: hidden;'>
                <div id='navegacionPlaceholder'>
                </div>
            </div>
            <div class="ui-layout-west">
                <div id='listadosPlaceholder'>
                </div>
            </div>
            <div class="ui-layout-east">
                <div id='edicionCampo'></div>
            </div>
			<div class="ui-layout-center">
                <div id='propiedadesPlaceholder'>
                    <span id='titulo' class='bold' style='font-size: 20px;'> TITULO </span> <small id='tituloDescripcion' class='' style='color: #999'></small>
                    <div id='panelPropiedades'>
                        <label for='nombre' class='width45p'>Nombre:</label>
                        <label for='clave' class='width25p' style='margin-left: 6%;'>Clave:</label>
                        <label for='esME' class='width10p' style='margin-left: 4%;'>Es ME:</label>
                        <br>
                        <input type='text' id='nombre' name='nombre' class='width45p' />
                        <input type='text' id='clave' name='clave' class='width25p' style='margin-left: 6%;'/>
                        <input type='checkbox' id='esME' name='esME' class='width10p'/>
                        <br>

                        <label for='descripcion'>Descripci&oacute;n:</label>
                        <br>
                        <textarea id='descripcion' name='descripcion' class='width100p'></textarea>
                    </div>
                </div>
                <br>
                <div id='accionesTablaPlaceholder'>
                </div>
                <div id='tablaPlaceholder' class='listado'>
                </div>
            </div>

            <div id='dlgAltaListado'>
                <label for='nombreAlta' class='display width75p'>Nombre:</label>
                <input type='text' id='nombreAlta' name='nombreAlta' class='width100p'/>
                <br>
                <label for='claveAlta' class='display width75p'>Clave:</label>
                <input type='text' id='claveAlta' name='claveAlta' class='width100p'/>
                <br>
                <label for='modeloAlta' class='display width100p'>Modelo:</label>
                <select name="modeloAlta" id="modeloAlta" class='width100p'>
                </select>
                <br>
            </div>

            <div id='dlgAltaCampoListado'>
                <label for='textoColumna' class='display width75p'>Cabecera:</label>
                <input type='text' id='textoColumna' name='textoColumna' class='width100p'/>
                <br>
                <label for='camposModelo' class='display width100p'>Campo:</label>
                <select name="camposModelo" id="camposModelo" class='width100p'>
                </select>
                <br>
                <br>
                <input type="checkbox" id='busquedaInterna'> Busqueda </input>
                <br>
                <input type="checkbox" id='esClave'> Clave</input>
                <br>
                <input type="checkbox" id='esDescripcion'> Descripci&oacute;n</input>
                <br>
            </div>

            <script	type="text/template" id="comboModeloTemplate">
                <option value='${IdModelo}'>${Nombre}</option>
            </script>

            <script	type="text/template" id="campoModeloTemplate">
                <option value='${IdCampoModelo}'>${Nombre} - ${Tipo}</option>
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
        <script type="text/javascript" src="../js/controles/ipkRemoteDataSource.js"></script>
        <script type="text/javascript" src="../js/controles/ipkToolbar.js"></script>
        <script type="text/javascript" src="../js/controles/ipkLista.js"></script>
        <script type="text/javascript" src="../js/controles/ipkTabla.js"></script>
        <script type="text/javascript" src="../js/componentes/editorCampoListado.js"></script>
        <script type="text/javascript" src="../js/vistas/Administracion/Listados.js"></script>


		<script type="text/javascript">
		    var pagina = undefined;

		    $(document).ready(function () {
		        pagina = new ListadosPage();
		    });
		</script>
</asp:Content>

<asp:Content ID="PageTitle" ContentPlaceHolderID="PlaceHolderPageTitle" runat="server">
Página de aplicación
</asp:Content>

<asp:Content ID="PageTitleInTitleArea" ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server" >
Mi página de aplicación
</asp:Content>
