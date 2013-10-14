<%@ Assembly Name="Lanzamiento_Nuevos_Productos, Version=1.0.0.0, Culture=neutral, PublicKeyToken=7d95c09ab090aee0" %>
<%@ Import Namespace="Microsoft.SharePoint.ApplicationPages" %>
<%@ Register Tagprefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=14.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=14.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="asp" Namespace="System.Web.UI" Assembly="System.Web.Extensions, Version=3.5.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Import Namespace="Microsoft.SharePoint" %>
<%@ Assembly Name="Microsoft.Web.CommandUI, Version=14.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ResumenProducto.aspx.cs" Inherits="Lanzamiento_Nuevos_Productos.Layouts.Lanzamiento_Nuevos_Productos.ResumenProductos" DynamicMasterPageFile="~masterurl/default.master" %>


<asp:Content ID="PageHead" ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">

</asp:Content>
<asp:Content ID="Main" ContentPlaceHolderID="PlaceHolderMain" runat="server">
    	<link rel='stylesheet' type='text/css' href='css/estilos.css' />
		<link rel='stylesheet' type='text/css' href='css/bootstrap.min.css' />
		
		<link rel='stylesheet' type='text/css' href='css/ipkblue/jquery-ui-1.8.18.custom.css' />
		<link rel='stylesheet' type='text/css' href='css/base.css' />
		<div class='container'>		
			
			<h2>Resumen de lanzamiento comercial</h2>
			<br />
			<div class='well'>
				<h3 id='tituloProducto'></h3>
				<p id='descripcion'></p>
			</div>
			<div id='nuevoProductoBloque'>
				<button type='button' id='btnNuevoProducto' accesskey='n'>Nuevo producto</button>
				<div id='nuevoProductoDialogo'>
					<table>
						<tr>
							<td>Tipo</td>
							<td>C&oacute;digo</td>
							<td>Descripci&oacute;n</td>
							<td>&nbsp;</td>
						</tr>
						<tr>
							<td>
								<select id='tipo' name='tipo'>
									<option value='Soporte'>Soporte</option>
									<option value='Semiterminado'>Semiterminado</option>
									<option value='Terminado'>Terminado</option>
									<option value='Embalaje'>Embalaje</option>
								</select>
							</td>
							<td>
								<input type='text' id='codigo' name='codigo'/>	
							</td>
							<td>
								<input type='text' id='descripcion' name='descripcion' />	
							</td>
							<td>
								<td>
									<span class='tag bgRed' style='display:none;' alt='Producto de navision'>Nav</span>
								</td>
							</td>
						</tr>
					</table>

				</div>
			</div>
			<br>
			<table id='tablaElementos' class='table table-bordered table-condensed' style='font-size: 12px;'>
				<thead>
					<tr>
						<th>TIPO</th>
						<th>CODIGO</th>
						<th>DESCRIPCION</th>
						<th class='noPad'>DESARROLLO</th>
						<th>COMPRAS</th>
						<th>SUPPLY CHAIN</th>
						<th>COMERCIAL</th>
						<th>FINANZAS</th>
						<th>PRODUCCION</th>
						<th class='acciones'></th>
					</tr>
				</thead>
				<tbody>
				</tbody>	
			</table>
		</div>

		<script	type="text/template" id="filaElementoTemplate">
			<tr>
				<td>
					<span class='tag ${color}'>${tipo}</span>
				</td>
				<td>${codigo} </td>
				<td>${descripcion}</td>
				<td class='${desarrollo}'></td>
				<td class='${compras}'></td>
				<td class='${supplyChain}'></td>
				<td class='${comercial}'></td>
				<td class='${finanzas}'></td>
				<td class='${produccion}'></td>
				<td class='acciones' >
					<a class='ver' href='Articulo.aspx?t=${tipo}&i=${ID}&N=${esNavision}'>
						<i class="icon-list-alt" alt='Editar' title='Editar'></i>
					</a>
					{{if esNavision == true}}
					<span class='tag bgRed' alt='Producto de navision'>Nav</span>
					<!--<a class='pasarNavision' href='#' id='${tipo}-${ID}'>
						<i class="icon-share" alt='Pasar a Navision' title='Pasar a Navision'></i>
					</a>-->
					{{else}}
					    <a id="${tipo}-${ID}" class='btnEliminar' href='#' >
                            <i  class="icon-trash" alt='Eliminar' title='Eliminar'></i>
                        </a>
					{{/if}}
				</td>
			</tr>
		</script>

		<script src="js/libs/jquery-1.7.1.min.js" type="text/javascript"></script>
		<script src="js/libs/jquery-ui-1.8.18.custom.min.js" type="text/javascript"></script>
		<script src="js/libs/jquery.tmpl.min.js" type="text/javascript"></script>
		<script src="js/libs/json2.js" type="text/javascript"></script>
		<script src="js/base/framework.js" type="text/javascript"></script>
		<script src="js/base/Utils.js" type="text/javascript"></script>
        <script src="js/base/framework.js" type="text/javascript"></script>
		<script src="js/vistas/ResumenProductos.js" type="text/javascript"></script>
		<script type="text/javascript">
		    var frm = new ResumenProductos();
		    frm.init();
		</script>
		
</asp:Content>

<asp:Content ID="PageTitle" ContentPlaceHolderID="PlaceHolderPageTitle" runat="server">
Resumen de lanzamiento comercial
</asp:Content>

<asp:Content ID="PageTitleInTitleArea" ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server" >
Resumen de lanzamiento comercial
</asp:Content>
