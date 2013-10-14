<%@ Assembly Name="SP_WebServices, Version=1.0.0.0, Culture=neutral, PublicKeyToken=d211fcac4eb9099b" %>
<%@ Import Namespace="Microsoft.SharePoint.ApplicationPages" %>
<%@ Register Tagprefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=14.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=14.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="asp" Namespace="System.Web.UI" Assembly="System.Web.Extensions, Version=3.5.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Import Namespace="Microsoft.SharePoint" %>
<%@ Assembly Name="Microsoft.Web.CommandUI, Version=14.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="DossieresEnCurso.aspx.cs" Inherits="SP_WebServices.Layouts.Cotizacion.site.DossieresEnCurso" DynamicMasterPageFile="~masterurl/default.master" %>

<asp:Content ID="PageHead" ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
        <script type="text/javascript" src="../js/libs/json2.js"></script>
        <link rel='stylesheet' type='text/css' href='../css/ipkweb/jquery-ui-1.8.18.custom.css' />
        <link rel='stylesheet' type='text/css' href='../css/base.css' />
        <link rel='stylesheet' type='text/css' href='../css/estilos.css' />
        <style type="text/css">
         #paginador{
                        width: 25%;
                        margin: 5px auto;
                    }

                    #paginador>a, #paginador>span{
                        padding: 5px;
                    }

                    #paginador a.boton{
                        background-color:  #EEE;
                        border: 1px solid #DDD;
                    }

                    #paginador a.boton:hover{
                        border: 1px solid #AAA;
                        color: #000;
                        font-weight: bold;
                    }

                    #paginador span.info{
                         border-top: 1px solid #DDD;
                         border-bottom: 1px solid #DDD;
                    }
        </style>
</asp:Content>

<asp:Content ID="Main" ContentPlaceHolderID="PlaceHolderMain" runat="server">

<SharePoint:ScriptLink ID="ScriptLink1" language="javascript" name="SP.js" defer="true" runat="server" Localizable="false"/>

              <div class='ui-layout-north' style='margin: 0; padding: 0; overflow: hidden;'>
                <div id='menuPlaceholder'>
                </div>
            </div>
			<div class="ui-layout-center">
			    <div id="queryBuilder"></div>
			    <br>
			    <div id="panelFiltros">
			        <span>Filtros: </span>
			        <a href="#" id="todas">Todas</a>
			        <a href="#" id="proximasExpirar">Proximas a Expirar</a>
			        <a href="#" id="ultimasCreadas">Ultimas creadas</a>
			    </div>
			    <br>
                <div id='accionesTabla'></div>
                <div id='tablaPlaceholder' class='listado'></div>

                 <div id="paginador" style="display: none;">
                    <a href="#" class="boton btnAtras" alt="Ir atrás" title="Ir atrás">
                        <span style="font-weight: bold;"> < </span>
                    </a>
                    <span class="info paginaActual"> 1 </span>
                    <span class="info"> de </span>
                    <span class="info paginaTotal"> N </span>
                    <a href="#" class="boton btnAdelante" alt="Ir adelante" title="Ir adelante">
                        <span style="font-weight: bold;"> > </span>
                    </a>
                 </div>

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
        <script type="text/javascript" src="../js/controles/ipkPaginador.js"></script>
        <script type="text/javascript" src="../js/componentes/IpkComportamientos.js"></script>
        <script type="text/javascript" src="../js/controles/ipkFactory.js"></script>
        <script type="text/javascript" src="../js/componentes/QueryBuilder/queryBuilder.js"></script>

        <script type="text/javascript" src="../js/vistas/DossieresEnCurso.js"></script>


		<script type="text/javascript">
		    var pagina = undefined;

		    $(document).ready(function () {
		        esconderNavSP();
		        app.modelos.sharepoint.usuarios.GrupoUsuarioActual().done(
                    function (respuesta) {
                        app.seguridad.grupoActual = app.ajax.procesarRespuesta([respuesta]).datos;
                        pagina = new DossieresEnCursoPage();
                    }
                );

		    });
		</script>
</asp:Content>

<asp:Content ID="PageTitle" ContentPlaceHolderID="PlaceHolderPageTitle" runat="server">
Dossieres en curso
</asp:Content>

<asp:Content ID="PageTitleInTitleArea" ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server" >
Dossieres en curso
</asp:Content>
