<%@ Assembly Name="Lanzamiento_Nuevos_Productos, Version=1.0.0.0, Culture=neutral, PublicKeyToken=7d95c09ab090aee0" %>
<%@ Import Namespace="Microsoft.SharePoint.ApplicationPages" %>
<%@ Register Tagprefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=14.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=14.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="asp" Namespace="System.Web.UI" Assembly="System.Web.Extensions, Version=3.5.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Import Namespace="Microsoft.SharePoint" %>
<%@ Assembly Name="Microsoft.Web.CommandUI, Version=14.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ListadoFormularios.aspx.cs" Inherits="Lanzamiento_Nuevos_Productos.Layouts.Lanzamiento_Nuevos_Productos.Formularios" DynamicMasterPageFile="~masterurl/default.master" %>

<asp:Content ID="PageHead" ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">

</asp:Content>

<asp:Content ID="Main" ContentPlaceHolderID="PlaceHolderMain" runat="server">
<div class='container'>
	    <link rel='stylesheet' type='text/css' href='css/estilos.css' />
	    <link rel='stylesheet' type='text/css' href='css/bootstrap.min.css' />

	    <h2>Listado de formularios</h2>
	    <br>
	    <table id='listado' class='table table-striped table-bordered table-condensed'>
		    <thead>
			    <tr>
				    <th>Id</th>
				    <th>Nombre</th>
				    <th>Tipo</th>
			    </tr>
		    </thead>
		    <tbody>		
				
		    </tbody>
	    </table>

    </div>

	<script src="js/libs/jquery-1.7.1.min.js" type="text/javascript"></script>
	<script src="js/libs/jquery.tmpl.min.js" type="text/javascript"></script>
	<script src="js/libs/bootstrap.min.js" type="text/javascript"></script>
    <script src="js/base/framework.js" type="text/javascript"></script>
	<script src="js/base/ModeloBase.js" type="text/javascript"></script>
	<script src="js/vistas/ListadoFormularios.js" type="text/javascript"></script>
	<script type="text/javascript">
	    var frm = new ListadoFormularios();
	    frm.init();
	</script>
	

  <script	type="text/template" id="listadoTemplate">
	    <tr id='registro-${ID}'>
		    <td>${ID}</td>
		    <td>
			    <a href='EdicionFormulario.aspx?id=${ID}' class='irAFormulario'>
				    <span class='label label-success'>${nombre}</span>
			    </a>
		    </td>
		    <td>${tipo}</td>
	    </tr>
    </script>
</asp:Content>

<asp:Content ID="PageTitle" ContentPlaceHolderID="PlaceHolderPageTitle" runat="server">
Página de aplicación
</asp:Content>

<asp:Content ID="PageTitleInTitleArea" ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server" >
Mi página de aplicación
</asp:Content>
