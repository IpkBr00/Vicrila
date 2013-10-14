<%@ Assembly Name="SP_WebServices, Version=1.0.0.0, Culture=neutral, PublicKeyToken=d211fcac4eb9099b" %>
<%@ Import Namespace="Microsoft.SharePoint.ApplicationPages" %>
<%@ Register Tagprefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=14.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=14.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="asp" Namespace="System.Web.UI" Assembly="System.Web.Extensions, Version=3.5.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Import Namespace="Microsoft.SharePoint" %>
<%@ Assembly Name="Microsoft.Web.CommandUI, Version=14.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Inicio.aspx.cs" Inherits="SP_WebServices.Layouts.Cotizacion.Inicio" DynamicMasterPageFile="~masterurl/default.master" %>

<asp:Content ID="PageHead" ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
        <script type="text/javascript" src="../js/libs/json2.js"></script>
        <script type="text/javascript" src='../js/libs/jquery-1.7.1.min.js'></script>
        <script type="text/javascript" src="../js/base/Utils.js"></script>
        <script type="text/javascript" src="../js/base/framework.base.js"></script>
        <script type="text/javascript" src="../js/base/framework.project.js"></script>

        <link rel='stylesheet' type='text/css' href='../css/ipkweb/jquery-ui-1.8.18.custom.css' />
        <link rel='stylesheet' type='text/css' href='../css/base.css' />
        <link rel='stylesheet' type='text/css' href='../css/estilos.css' />
</asp:Content>

<asp:Content ID="Main" ContentPlaceHolderID="PlaceHolderMain" runat="server">

<SharePoint:ScriptLink ID="ScriptLink1" language="javascript" name="SP.js" defer="true" runat="server" Localizable="false"/>

  <h2>FUNCIONALIDADES DE LA APLICACION</h2>
        <br>

        <div id='menuComercial'>
            <ol>
                <li>
                    <h3><a href="CreacionDossier.aspx" accesskey="1">Nuevo Dossier en Blanco</a></h3>
                    <p>
                        Selecciona un tipo de dossier y crea el dossier desde cero.
                    </p>
                </li>
                <li>
                    <h3><a href="CopiaDossieres.aspx" accesskey="2">Nuevo Dossier a partir de uno existente</a></h3>
                    <p>
                        Selecciona un dossier ya existente y a partir de el se genera&aacute; uno nuevo con  los datos del anterior.
                    </p>

                </li>
                <li>
                    <h3><a href="DossieresEnCurso.aspx" accesskey="3">Cotizaciones en curso</a></h3>
                    <p>
                        Ver los dossieres en curso y el estado de cada uno. Permite entra a editar los datos.
                    </p>
                </li>
                <li>
                    <h3><a href="Dossieres.aspx" accesskey="4">Cotizaciones Completadas</a></h3>
                    <p>
                        Acceso a dossieres mediante una busqueda. Permite acceder a los datos y docuemntacion del dossier.
                    </p>
                </li>
                <li>
                    <h3><a href="Estadisticas.aspx" accesskey="5">Estadisiticas LEAD TIME</a></h3>
                    <p>
                        Acceso a las estadisticas de tiempo de resoluci&oacute;n de dosieres.
                    </p>
                </li>
            </ol>
        </div>
        <div id='menuGeneral'>
            <ol>
                <li>
                    <h3><a href="DossieresEnCurso.aspx" accesskey="1">Cotizaciones en curso</a></h3>
                    <p>
                        Ver los dossieres en curso y el estado de cada uno. Permite entra a editar los datos.
                    </p>
                </li>
                <li>
                    <h3><a href="Dossieres.aspx" accesskey="2">Cotizaciones Completadas</a></h3>
                    <p>
                        Acceso a dossieres mediante una busqueda. Permite acceder a los datos y docuemntacion del dossier.
                    </p>
                </li>
                 <li>
                    <h3><a href="Estadisticas.aspx" accesskey="3">Estadisiticas LEAD TIME</a></h3>
                    <p>
                        Acceso a las estadisticas de tiempo de resoluci&oacute;n de dosieres.
                    </p>
                </li>
            </ol>
        </div>


        <script type="text/javascript">
            var menu = undefined;

            $(document).ready(function () {
                esconderNavSP();
                app.modelos.sharepoint.usuarios.GrupoUsuarioActual().done(
                    function (respuesta) {
                        app.seguridad.grupoActual = app.ajax.procesarRespuesta([respuesta]).datos;
                        if (app.seguridad.grupoActual == 'cotiz_comercial') {
                            $('#menuComercial').show();
                            $('#menuGeneral').hide();
                        }
                        else {
                            $('#menuComercial').hide();
                            $('#menuGeneral').show();
                        }
                    }
                );

            });
        </script>
</asp:Content>

<asp:Content ID="PageTitle" ContentPlaceHolderID="PlaceHolderPageTitle" runat="server">
Inicio de la aplicación - PROCESO COTIZACION
</asp:Content>

<asp:Content ID="PageTitleInTitleArea" ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server" >
Inicio de la aplicación - PROCESO COTIZACION
</asp:Content>
