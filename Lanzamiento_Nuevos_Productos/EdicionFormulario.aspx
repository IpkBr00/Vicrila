<%@ Assembly Name="Lanzamiento_Nuevos_Productos, Version=1.0.0.0, Culture=neutral, PublicKeyToken=7d95c09ab090aee0" %>
<%@ Import Namespace="Microsoft.SharePoint.ApplicationPages" %>
<%@ Register Tagprefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=14.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=14.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="asp" Namespace="System.Web.UI" Assembly="System.Web.Extensions, Version=3.5.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Import Namespace="Microsoft.SharePoint" %>
<%@ Assembly Name="Microsoft.Web.CommandUI, Version=14.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="EdicionFormulario.aspx.cs" Inherits="Lanzamiento_Nuevos_Productos.Layouts.Lanzamiento_Nuevos_Productos.EdicionFormulario" DynamicMasterPageFile="~masterurl/default.master" %>

<asp:Content ID="PageHead" ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
	<link rel='stylesheet' type='text/css' href='css/estilos.css' />
		<link rel='stylesheet' type='text/css' href='css/bootstrap.min.css' />
	<style>
		table input{
			font-size: 13px;
			line-height : 13px;
			height : 10px;
		}
		table select{
			font-size: 10px;
			line-height : 10px;
			height : 23px;
		}
		table input, table select{
			margin-bottom: 1px;
		}

		.table-condensed th, .table-condensed td {
			   padding: 2px 5px;
		}
		.seleccion{
			font-weight: bold;
			background-color: #FCF8E3;
		}
		ul#tabs{
			height : 33px;
		}
	</style>
</asp:Content>
<asp:Content ID="Main" ContentPlaceHolderID="PlaceHolderMain" runat="server">
	
		<h2>Edici&oacute;n de formularios</h2>
		<br>
		<div id='info' class='well'>
			Nombre : <b><span id='nombreFormulario'></span></b>
			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			Tipo de formulario : <b><span id='tipoFormulario'></span></b>
		</div>
		<input type='button' class='btn' id='btnNuevaSeccion' value='Nueva Secci&oacute;n' />
		<input type='button' class='btn' id='btnNuevoCampo' value='Nuevo Campo' />
		<input type='button' class='btn btn-primary' id='btnGuardar' value='Guardar' />
		<br>
		<br>
		<div class="tabbable">
			<ul id='tabs' class="nav nav-tabs">
			</ul>
			<div id='tabContent' class="tab-content">
				<div id='tableForm'>
					<table>
						<thead>
						<tr>
							<th>Campo</th>
							<th>Label</th>
							<th>Tipo</th>
							<th>Fuente</th>
							<th>Defecto</th>
							<th>Observaciones</th>
							<th>Validaci&oacute;n</th>
						</tr>
					</thead>
					<tbody>
					<tr>
						<td>
							<input type='text' name='campo' id='campo' value='' size='20' style='widtd:150px' />
						</td>
						<td>
							<input type='text' name='label' id='label' value='' size='20' style='widtd:155px' />
						</td>
						<td>
							<select name='tipo' id='tipo' style='width:75px' >
								<option value='text'>Texto</option>
								<option value='combo'>Combo</option>
								<option value='checkbox'>Checkbox</option>
							</select>
						</td>
						<td>
							<input type='text' name='fuente' id='fuente' value='' size='20' style='widtd:150px' />
						</td>
						<td>
							<input type='text' name='defecto' id='defecto' value='' size='20' style='widtd:150px' />
						</td>
						<td>
							<input type='text' name='observaciones' id='observaciones' value='' size='20' style='widtd:160px' />
						</td>
						<td>
							<input type='text' name='validacion' id='validacion' value='' size='20' style='widtd:100px' />
						</td>
						<td>
							<input type='button' class='btn btn-mini' id='btnAddCampo' value='Añadir' />
							<input type='button' class='btn btn-mini' id='btnCancelarCampo' value='Cancelar' />
						</td>
					</tr>		
					</tbody>
					</table>
				</div>
			</div>
		</div>

	<script	type="text/template" id="tabTemplate">
		<li>
			<a href='#${Id}' data-toggle="tab">${Seccion}</a>
		</li>
	</script>

	<script	type="text/template" id="seccionTemplate">
		{{if Id != 'Operarios'}}
		<div id='${Id}' class="tab-pane">
			<table id='listado' class='table table-striped table-bordered table-condensed listado'>
				<thead>
					<tr>
						<th style="width: 50px;">Campo</th>
						<th style="width: 50px;">Label</th>
						<th style="width: 50px;">Tipo</th>
						<th style="width: 50px;">Fuente</th>
						<th style="width: 50px;">Defecto</th>
						<th style="width: 50px;">Observaciones</th>
						<th style="width: 50px;">Validaci&oacute;n</th>
						<th>Acciones</th>
					</tr>
				</thead>
				<tbody>		
					{{tmpl(Campos) "#filaTemplate"}}
				</tbody>
			</table>
		</div>
		{{else}}
		<div id='Operarios' class="tab-pane">
			<div id='menu' class='ipkMenu'>
				<div id='formOperario'>
					Añadir nueva actividad: 
					<select id='cmbOperarios'>
					</select>
					<input type='text' id='valorActividad' name='valorActividad' value='0,0'/>
					<input type='button' id='btnAddOperario' class='btn' value='Añadir'>
				</div>
			</div>
			<table id='tablaOperarios' class='table table-bordered table-condensed'>
				<thead>
					<tr>
						<th>C&oacute;d. Actividad</th>
						<th>Descripci&oacute;n</th>
						<th>Valor</th>
						<th>&nbsp;</th>
					</tr>
				</thead>
				<tbody>
					{{tmpl(Campos) "#filaOperarioTemplate"}}
				</tbody>
			</table>
		</div>
		{{/if}}
	</script>

	<style type="text/css">
		.ipkMenu{
			/*background-color: whitesmoke;
			border-bottom : 1px solid #E5E5E5;*/

			padding : 5px;
			margin-bottom : 5px;
		}

		.ipkBoton{
			font-size: 11px;
			
			padding: 3px 10px;
			margin: 0;
		}

	</style>


	

	<script	type="text/template" id="filaTemplate">
		<tr>
			<td style='width:125px' >${nombre}</td>
			<td style='width:125px' >${label}</td>
			<td style='width:50px' >${tipo}</td>
			<td style='width:50px' >${fuente}</td>
			<td style='width:100px' >${defecto}</td>
			<td style='width:100px' >${observaciones}</td>
			<td style='width:75px' >${validacion}</td>
			<td style='width:50px' >
				<a class='btnEditar'><i class="icon-pencil"></i></a>
			    <a class='btnEliminar'><i class="icon-trash"></i></a>
			</td>
		</tr>
	</script>

	<script	type="text/template" id="comboTemplate">
		<option value='${Code}'> ${Code} - ${Description}</option>
	</script>

	<script	type="text/template" id="filaOperarioTemplate">
		<tr>

			<td>${codigo}</td>
			<td>${descripcion}</td>
			<td>${valor}</td>
			<td>
				<a class='btnEliminar'><i class="icon-trash"></i></a>
			</td>
		</tr>
	</script>

	<script src="js/libs/jquery-1.7.1.min.js" type="text/javascript"></script>
	<script src="js/libs/jquery.tmpl.min.js" type="text/javascript"></script>
	<script src="js/libs/bootstrap.min.js" type="text/javascript"></script>
	<script src="js/base/framework.js" type="text/javascript"></script>
	<script src="js/base/Utils.js" type="text/javascript"></script>
	<script src="js/clases/formulario.js" type="text/javascript"></script>
	<script src="js/base/ModeloBase.js" type="text/javascript"></script>
	<script src="js/vistas/EdicionFormularios.js" type="text/javascript"></script>
	<script type="text/javascript">

	    $('#s4-leftpanel').hide();
	    $('#MSO_ContentTable').css('margin-left', '25px');

	    var frm = new EdicionFormularios();
	    frm.init();
	</script>
</asp:Content>

<asp:Content ID="PageTitle" ContentPlaceHolderID="PlaceHolderPageTitle" runat="server">
Página de aplicación
</asp:Content>

<asp:Content ID="PageTitleInTitleArea" ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server" >
Mi página de aplicación
</asp:Content>
