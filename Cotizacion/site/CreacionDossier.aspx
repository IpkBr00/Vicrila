<%@ Assembly Name="SP_WebServices, Version=1.0.0.0, Culture=neutral, PublicKeyToken=d211fcac4eb9099b" %>
<%@ Import Namespace="Microsoft.SharePoint.ApplicationPages" %>
<%@ Register Tagprefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=14.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=14.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="asp" Namespace="System.Web.UI" Assembly="System.Web.Extensions, Version=3.5.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Import Namespace="Microsoft.SharePoint" %>
<%@ Assembly Name="Microsoft.Web.CommandUI, Version=14.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="CreacionDossier.aspx.cs" Inherits="SP_WebServices.Layouts.Cotizacion.site.CreacionDossier" DynamicMasterPageFile="~masterurl/default.master" %>

<asp:Content ID="PageHead" ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
    <script type="text/javascript" src="../js/libs/json2.js"></script>
    <link rel='stylesheet' type='text/css' href='../css/ipkweb/jquery-ui-1.8.18.custom.css' />
    <link rel='stylesheet' type='text/css' href='../css/base.css' />
    <link rel='stylesheet' type='text/css' href='../css/estilos.css' />
</asp:Content>

<asp:Content ID="Main" ContentPlaceHolderID="PlaceHolderMain" runat="server">
<SharePoint:ScriptLink ID="ScriptLink1" language="javascript" name="SP.js" defer="true" runat="server" Localizable="false"/>
    <div class='ui-layout-north' style='margin: 0; padding: 0; overflow: hidden;'>
            <div id='menuPlaceholder'></div>
        </div>
        <div class="ui-layout-center">
            <div id='fichaPlaceholder'></div>
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
        <script type="text/javascript" src="../js/controles/ipkFactory.js"></script>

        <script type="text/javascript" src="../js/componentes/IpkComportamientos.js"></script>

        <script type="text/javascript" src="../js/vistas/CreacionDossier.js"></script>

		<script type="text/javascript">
		    var pagina = undefined;

		    $(document).ready(function () {
		        esconderNavSP();

		        app.modelos.sharepoint.usuarios.GrupoUsuarioActual().done(
                    function (respuesta) {
                        app.seguridad.grupoActual = app.ajax.procesarRespuesta([respuesta]).datos;
                        pagina = new CreacionDossierPage();
                    }
                );
		    });
		</script>
</asp:Content>

<asp:Content ID="PageTitle" ContentPlaceHolderID="PlaceHolderPageTitle" runat="server">
Creación de dossier en blanco
</asp:Content>

<asp:Content ID="PageTitleInTitleArea" ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server" >
Creación de dossier en blanco
</asp:Content>
