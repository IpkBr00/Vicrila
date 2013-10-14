<%@ Assembly Name="SP_WebServices, Version=1.0.0.0, Culture=neutral, PublicKeyToken=d211fcac4eb9099b" %>
<%@ Import Namespace="Microsoft.SharePoint.ApplicationPages" %>
<%@ Register Tagprefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=14.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=14.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="asp" Namespace="System.Web.UI" Assembly="System.Web.Extensions, Version=3.5.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Import Namespace="Microsoft.SharePoint" %>
<%@ Assembly Name="Microsoft.Web.CommandUI, Version=14.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Modelos.aspx.cs" Inherits="SP_WebServices.Layouts.Cotizacion.administracion.Modelos" DynamicMasterPageFile="~masterurl/default.master" %>

<asp:Content ID="PageHead" ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
        <title>Administraci&oacute;n de modelos</title>

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

                <div id='listaPlaceholder'>
                </div>
            </div>
			<div class="ui-layout-center">
                <div id='accionesTablaPlaceholder'>
                </div>
                <div id='tablaPlaceholder' class='listado'>
                </div>
            </div>
            <div class="ui-layout-east">
                <div id='fichaPlaceholder'>
                    <div id='accionesFichaPlaceholder'>
                    </div>
                    <span class='block-Title'>Propiedades</span>
                    <div id='panelPropiedades'>
                        <label for='nombreCampo'>Nombre:</label>
                        <br>
                        <input type='text' id='nombreCampo' name='nombreCampo' style='width:100%;'/>
                        <br>
                        <input type='checkbox' id='esClave' /> <span style='font-size:10px;'>Clave Primaria</span>
                        <br>
                        <input type='checkbox' id='esIndice' /> <span style='font-size:10px;'>Indice Unico</span>
                        <br>
                        <input type='checkbox' id='obligatorio' /> <span style='font-size:10px;'>Acepta Nulos</span>
                        <br>
                        <label for='tipoCampo'>Tipo:</label>
                        <br>
                        <select id='tipoCampo' name='tipoCampo' style='width:100%;'>
                            <option value='String'>Texto</option>
                            <option value='Int32'>Numerico</option>
                            <option value='DateTime'>Fecha</option>
                            <option value='Boolean'>Checkbox</option>

                            <option value='Reference'>Referencia</option>
                            <option value='Collection'>Colecci&oacute;n</option>
                        </select>
                        <select id='referencia' name='referencia' style='width:100%;' class='noDisplay'>
                        </select>
                        <br>
                    </div>
                    <div id='botoneraPropiedades'>
                        <input type='button' id='btnGuardar' value='Guardar' />
                        <input type='button' id='btnCancelar' value='Cancelar' />
                    </div>
                </div>
            </div>

            <script	type="text/template" id="comboReferenciasTemplate">
                <option value="${IdModelo}">${Nombre}</option>
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
        <script type="text/javascript" src="../js/vistas/Administracion/Modelos.js"></script>


		<script type="text/javascript">
		    var pagina = undefined;

		    $(document).ready(function () {
		        pagina = new ModelosPage();
		    });
		</script>
</asp:Content>

<asp:Content ID="PageTitle" ContentPlaceHolderID="PlaceHolderPageTitle" runat="server">
Página de aplicación
</asp:Content>

<asp:Content ID="PageTitleInTitleArea" ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server" >
Mi página de aplicación
</asp:Content>
