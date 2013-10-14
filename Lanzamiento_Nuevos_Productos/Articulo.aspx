<%@ Assembly Name="Lanzamiento_Nuevos_Productos, Version=1.0.0.0, Culture=neutral, PublicKeyToken=7d95c09ab090aee0" %>
<%@ Import Namespace="Microsoft.SharePoint.ApplicationPages" %>
<%@ Register Tagprefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=14.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=14.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="asp" Namespace="System.Web.UI" Assembly="System.Web.Extensions, Version=3.5.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Import Namespace="Microsoft.SharePoint" %>
<%@ Assembly Name="Microsoft.Web.CommandUI, Version=14.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Articulo.aspx.cs" Inherits="Lanzamiento_Nuevos_Productos.Layouts.Lanzamiento_Nuevos_Productos.Articulo" DynamicMasterPageFile="~masterurl/default.master" %>

<asp:Content ID="PageHead" ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
    <link rel='stylesheet' type='text/css' href='css/bootstrap.min.css' />
    <link rel='stylesheet' type='text/css' href='css/estilos.css' />
    <link rel='stylesheet' type='text/css' href='css/ipkblue/jquery-ui-1.8.18.custom.css' />
    <link rel='stylesheet' type='text/css' href='css/base.css' />

    <style type="text/css">
    	.ipkMenu {
    		font-size : 13px;
    		background-color: #F5F5F5;
    		padding: 10px 0px 0px 5px;
    	}

    	#tablaOperarios{ font-size : 13px; }
    </style>
</asp:Content>

<asp:Content ID="Main" ContentPlaceHolderID="PlaceHolderMain" runat="server">

	<input type='hidden' id='soporteBase' name='soporteBase' />
	<input type='hidden' id='semiterminadoBase' name='semiterminadoBase' />

<div id='ipkContainer'>	
	<div id='contenedor' class='container'>
		
		<div id='herenciaSoporte' class='width100p noDisplay'>
			<div id='herenciaSoporteCabecera' class='fWhite'>
				<span>Soporte Base:</span>
				&nbsp;
				<span id='soporteBaseText' class='bold'></span>
				<input type='button' id='cambiarSoporte' value='Cambiar' class='btn floatRight'/>
				<input type='button' id='cancelarCambioSoporte' value='Cancelar' class='btn floatRight noDisplay'/>
				<input type='button' id='aceptarCambioSoporte' value='Aceptar' class='btn floatRight noDisplay'/>
				<div class='clearFix'></div>
			</div>
			<div id='herenciaSoporteBloque' class='noDisplay fBlack'>
				<table id='basesSoporte' class='tabla tabla-bordered tabla-condensed width100p' style='margin-bottom:0px;'>
					<thead class='bgLigthGray'>
						<tr>
							<th>&nbsp;</th>
							<th>C&oacute;digo</th>
							<th>Descripci&oacute;n</th>
							<th>Clase Vidrio</th>
							<th>Trat. Termico</th>
							<th>Fdf</th>
							<th>Peso Neto</th>
							<th>Cadencia Estandar</th>
							<th>Rendimiento Estandar</th>
						</tr>
					</thead>
					<tbody>
					</tbody>
				</table>
			</div>
		</div>
		<br>
		<div id='herenciaSemiterminado' class='width100p noDisplay'>
			<div id='herenciaSemiterminadoCabecera' class='fWhite'>
				<span>Semiterminado Base:</span>
				&nbsp;
				<span id='semiterminadoBaseText' class='bold'></span>
				<input type='button' id='cambiarSemiterminado' value='Cambiar' class='btn floatRight'/>
				<input type='button' id='cancelarCambioSemiterminado' value='Cancelar' class='btn floatRight noDisplay'/>
				<input type='button' id='aceptarCambioSemiterminado' value='Aceptar' class='btn floatRight noDisplay'/>
				<div class='clearFix'></div>
			</div>

			<div id='herenciaSemiterminadoBloque' class='noDisplay fBlack'>
				<table id='basesSemiterminado' class='tabla tabla-bordered tabla-condensed width100p' style='margin-bottom:0px;'>
					<thead class='bgLigthGray'>
						<tr>
							<th class='width10p'>&nbsp;</th>
							<th>C&oacute;digo</th>
							<th>Descripci&oacute;n</th>
							<th>Serie</th>
							<th>Decorado</th>
						</tr>
					</thead>
					<tbody>
					</tbody>
				</table>
			</div>
		</div>
	   	<br />
	   	<br />
	   	<div id='informacionProducto' class='width100p cabecera bgGPlusBlack fWhite'>
			<span class='bold'>INFORMACI&Oacute;N DEL PRODUCTO</span>
			<div class='cabecera mgT_3 bgWhite fBlack'>
				<span>Tipo de producto: </span><span id='infoTipo' class='bold'></span>
				&nbsp;&nbsp;
				<span>C&oacute;digo: </span><span id='infoCodigo' class='bold'></span>
				&nbsp;&nbsp;
				<span>Descripci&oacute;n:</span><span id='infoDescripcion' class='bold'></span>
			</div>
		</div>
		<br />
	   	<!-- <div style='clear:both;'></div> -->
		<div id='errores' class='alert alert-error'>
		</div>
		<form id='formulario'>
			<div id='container'>
                <input type='hidden' id='id_Resumen' name='id_Resumen' value='' />
            </div>
			<div id='botones'>
				<input type='button' class='btn' id='btnCancelar' value='Cancelar'>
				<input type='button' class='btn btn-primary' id='btnGuardar' value='Guardar'>
			</div>
		</form>
	</div>
	</div>

		<!-- PLANTILLA TABLA UNICA -->
		<script	type="text/x-jquery-tmpl" id="seccionTemplate">
			<tr>
				<td colspan='2' class='tituloSeccion'>${Seccion}</td>
			</tr>
			{{tmpl(Campos) "#campoTemplate"}} 
		</script>

		<!-- PLANTILLA TABLA SEPARADA -->
		<script	type="text/x-jquery-tmpl" id="seccionTablaTemplate">
			<table id='tablaSeccion' class='table table-bordered table-condensed'>
				<tbody>
				<tr>
					<td colspan='2' class='tituloSeccion'>${Seccion}</td>
				</tr>
				{{tmpl(Campos) "#campoTemplate"}} 
				</tbody>	
			</table>
			<br/>
		</script>

		<!-- PLANTILLA DIVS COLAPSABLE -->
		<script	type="text/x-jquery-tmpl" id="seccionCollapsableTemplate">
			<div class='tituloSeccion' data-toggle="collapse" data-target="#${Id}" >
				${Seccion}
			</div>
			{{if Seccion == 'Produccion' || Seccion == 'Desarrollo Producto'}}
                <div id='${Id}' class="collapse in" style='overflow-y:scroll;'>
			{{else}}
			<div id='${Id}' class="collapse in">
			{{/if}}
				<table id='tablaSeccion' class='table table-bordered table-condensed'>
					<tbody>
						{{tmpl(Campos) "#campoTemplate"}} 
					</tbody>	
				</table>

				{{if Seccion == 'Produccion'}}
				<div id='bloqueOperarios' class='width80p centered'>
					<div class='width100p height30px cabecera bgBlackL fWhite bold'>
						<span>GAMA DE PERSONAL</span>
					</div>
					<div id='menu' class='ipkMenu'>
						<div id='formOperario'>
							Añadir nueva actividad: 
							<select id='cmbOperarios'>
							</select>
							<input type='text' id='valorActividad' value='0,0'/>
							<input type='button' id='btnAddOperario' class='btn' value='Añadir'>
						</div>
					</div>
					<table id='tablaOperarios' class='table table-bordered table-condensed' >
						<thead>
							<tr>
								<th>C&oacute;d. Actividad</th>
								<th>Descripci&oacute;n</th>
								<th>Valor</th>
								<th>&nbsp;</th>
							</tr>
						</thead>
						<tbody>
						</tbody>
					</table>
					<div class="clearFix">&nbsp;</div>
				</div>
				{{/if}}
				{{if Seccion == 'Desarrollo Producto'}}
                    <div id='bloqueUnidadesMedida' class='width90p centered noDisplay'>
                        <div id="formularioUnidadesMedida" class="noDisplay">
                            <label for="Code">C&oacute;digo</label>
                            <!--<input type="text" id="Code" class="width90p"/>-->
                            <select  id="Code" class="width90p"></select>
                            <br>
                            <label for="QtyPerUnitOfMeasure">Cdad. por unidad medida</label>
                            <input type="text" id="QtyPerUnitOfMeasure" class="width90p"/>
                            <br>
                            <label for="QtyPerPalet">Cdad. x palet</label>
                            <input type="text" id="QtyPerPalet" class="width90p"/>
                            <br>
                            <label for="Height">Alto</label>
                            <input type="text" id="Height" class="width90p"/>
                            <br>
                            <label for="Width">Ancho</label>
                            <input type="text" id="Width" class="width90p"/>
                            <br>
                            <label for="Length">Longitud</label>
                            <input type="text" id="Length" class="width90p"/>
                            <br>
                            <label for="Cubage">Cubicaje</label>
                            <input type="text" id="Cubage" class="width90p"/>
                            <br>
                            <label for="Weight">Peso BRUTO</label>
                            <input type="text" id="Weight" class="width90p"/>
                            <br>
                        </div>
                        <div class='width100p height30px cabecera bgBlackL fWhite bold'>
                            <span>UNIDADES DE MEDIDA</span>
                        </div>

                        <div id='menu' class='ipkMenu'>
                            <input type="button" id="btnAddUnidadMedida" value="Nueva Unidad de Medida" />
                        </div>

                        <table id='tablaUnidadesMedidad' class='table table-bordered table-condensed' >
                            <thead>
                                <tr>
                                    <th>C&oacute;digo</th>
                                    <th>Cdad. por unidad medida</th>
                                    <th>Cdad. x palet</th>
                                    <th>Alto</th>
                                    <th>Ancho</th>
                                    <th>Longitud</th>
                                    <th>Cubicaje</th>
                                    <th>Peso BRUTO</th>
                                    <th>&nbsp;</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                        <div class="clearFix">&nbsp;</div>
                    </div>
                    
                     <div id='bloqueReferenciasCruzadas' class='width90p centered noDisplay'>
                        <div id="formularioReferenciasCruzadas" class="noDisplay">
                            <label for="TipoReferencia">Tipo Referencia</label>
                            <input type="text" id="TipoReferencia" class="width90p"/>
                            <br>
                            <label for="NoTipoReferencia">N&uacute;m. Tipo Referencia</label>
                            <input type="text" id="NoTipoReferencia" class="width90p"/>
                            <br>
                            <label for="NoReferencia">N&uacute;m. Referencia</label>
                            <input type="text" id="NoReferencia" class="width90p"/>
                            <br>
                            <label for="CodVariante">C&oacute;d. Variante</label>
                            <input type="text" id="CodVariante" class="width90p"/>
                            <br>
                            <label for="UnidadMedida">Unidad Medida</label>
                            <!--<input type="text" id="UnidadMedida" class="width90p"/>-->
                            <select id="UnidadMedida" class="width90p" > </select>
                            <br>
                            <label for="Descripcion">Descripcion</label>
                            <input type="text" id="Descripcion" class="width90p"/>
                            <br>
                            <label for="Volcar">Volcar</label>
                            <input type="checkbox" id="Volcar" class="width90p"/>
                        </div>
                        <div class='width100p height30px cabecera bgBlackL fWhite bold'>
                            <span>REFERENCIAS CRUZADAS</span>
                        </div>
                        <!--
                        <div id='menu' class='ipkMenu'>
                            <input type="button" id="btnAddReferenciaCruzada" value="Nueva Referencia Cruzada" />
                        </div>
                        -->
                        <table id='tablaReferenciasCruzadas' class='table table-bordered table-condensed' >
                            <thead>
                                <tr>
                                    <th>Tipo Ref.</th>
                                    <th>Num. Tipo Ref.</th>
                                    <th>Num. Ref.</th>
                                    <th>C&oacute;d. Variante</th>
                                    <th>Unidad Medida</th>
                                    <th>Descripci&oacute;n</th>
                                    <th>Volcar</th>
                                    <th>&nbsp;</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                        <div class="clearFix">&nbsp;</div>
                    </div>
                {{/if}}
                {{if Seccion == 'Comercial'}}
                  <div id='bloqueReferenciasCruzadasClientes' class='width90p centered noDisplay'>
                     <div id="formularioReferenciasCruzadasClientes" class="noDisplay">
                         <label for="TipoReferenciaClientes">Tipo Referencia</label>
                         <input type="text" id="TipoReferenciaClientes" class="width90p"/>
                         <br>
                         <label for="NoTipoReferenciaClientes">N&uacute;m. Tipo Referencia</label>
                         <input type="text" id="NoTipoReferenciaClientes" class="width90p"/>
                         <br>
                         <label for="NoReferenciaClientes">N&uacuet;m. Referencia</label>
                         <input type="text" id="NoReferenciaClientes" class="width90p"/>
                         <br>
                         <label for="CodVarianteClientes">C&oacute;d. Variante</label>
                         <input type="text" id="CodVarianteClientes" class="width90p"/>
                         <br>
                         <label for="UnidadMedidaClientes">Unidad Medida</label>
                         <!-- <input type="text" id="UnidadMedidaClientes" class="width90p"/> -->
                         <select id="UnidadMedidaClientes" class="width90p" > </select>
                         <br>
                         <label for="DescripcionClientes">Descripci&oacute;n</label>
                         <input type="text" id="DescripcionClientes" class="width90p"/>
                         <br>
                         <label for="ImpresionFichaPalet">Impresi&oacute;n Ficha Palet</label>
                         <input type="checkbox" id="ImpresionFichaPalet" class="width90p"/>
                     </div>
                     <div class='width100p height30px cabecera bgBlackL fWhite bold'>
                         <span>CLIENTES</span>
                     </div>
                     <div id='menu' class='ipkMenu'>
                         <input type="button" id="btnAddReferenciaCruzadaClientes" value="Nueva Referencia Cruzada Cliente" />
                     </div>
                     <table id='tablaReferenciasCruzadasClientes' class='table table-bordered table-condensed' >
                         <thead>
                             <tr>
                                 <th>Tipo Ref.</th>
                                 <th>Num. Tipo Ref.</th>
                                 <th>Num. Ref.</th>
                                 <th>C&oacute;d. Variante</th>
                                 <th>Unidad Medida</th>
                                 <th>Descripci&oacute;n</th>
                                 <th>Impresi&oacute;n</th>
                                 <th>&nbsp;</th>
                             </tr>
                         </thead>
                         <tbody>
                         </tbody>
                     </table>
                     <div class="clearFix">&nbsp;</div>
                 </div>
                 {{/if}}
			</div>	
			<br />
		</script>

		<script	type="text/template" id="filaReferenciaCruzadaClientesTemplate">
                    <tr id='referenciaCruzadaClientes-${Id}' class='filaReferenciaCruzada'>
                        <td class='width5p'>${TipoReferencia}</td>
                        <td class='width20p'>${NoTipoReferencia}</td>
                        <td class='width10p'>${NoReferencia}</td>
                        <td class='width5p'>${CodVariante}</td>
                        <td class='width5p'>${UnidadMedida}</td>
                        <td class='width5p'>${Descripcion}</td>
                        <td class='width5p'>
                        {{if ImpresionFichaPalet == true}}
                            S&iacute;
                        {{/if}}
                        </td>
                        <td class='width5p'>
                            <a class='btnEditarReferenciaCruzadaClientes'><i class="icon-pencil"></i></a>
                            {{if (UnidadMedida != 'UD' && UnidadMedida != 'PALET')}}
                            <a class='btnEliminarReferenciaCruzadaClientes'><i class="icon-trash"></i></a>
                             {{/if}}
                        </td>
                    </tr>
                </script>

		<script	type="text/template" id="filaReferenciaCruzadaTemplate">
            <tr id='referenciaCruzada-${Id}' class='filaReferenciaCruzada'>
                <td class='width5p'>${TipoReferencia}</td>
                <td class='width20p'>${NoTipoReferencia}</td>
                <td class='width10p'>${NoReferencia}</td>
                <td class='width5p'>${CodVariante}</td>
                <td class='width5p'>${UnidadMedida}</td>
                <td class='width5p'>${Descripcion}</td>
                <td class='width5p'>
                    {{if Volcar == true}}
                        S&iacute;
                    {{/if}}
                </td>
                <td class='width5p'>
                    <a class='btnEditarReferenciaCruzada'><i class="icon-pencil"></i></a>
                    {{if (UnidadMedida != 'UD' && UnidadMedida != 'PALET')}}
                     {{if (UnidadMedida == 'CAJA' && TipoProducto == 'TERMINADO') }}
                     {{else}}
                            <a class='btnEliminarReferenciaCruzada'><i class="icon-trash"></i></a>
                     {{/if}}
                    
                    {{/if}}
                </td>
            </tr>
        </script>

		<script	type="text/template" id="filaUnidaMedidaTemplate">
        			<tr id='unidadMedida-${Id}' class='filaUnidadMedida'>
        				<td class='width5p'>${Code}</td>
        				<td class='width20p'>${QtyPerUnitOfMeasure}</td>
        				<td class='width10p'>${QtyPerPalet}</td>
        				<td class='width5p'>${Height}</td>
        				<td class='width5p'>${Width}</td>
        				<td class='width5p'>${Length}</td>
        				<td class='width5p'>${Cubage}</td>
        				<td class='width10p'>${Weight}</td>
        				<td class='width5p'>
        				    <a class='btnEditarUnidadMedida'><i class="icon-pencil"></i></a>
        				    {{if ( (Code != 'UD' && Code != 'PALET') ) }}
                                {{if (Code == 'CAJA' && TipoProducto == 'TERMINADO') }}
                                {{else}}
                                    <a class='btnEliminarUnidadMedida'><i class="icon-trash"></i></a>
                                {{/if}}
        					{{/if}}
        				</td>
        			</tr>
        		</script>

		<script	type="text/template" id="filaOperarioTemplate">
			<tr id='operario-${ID}' class='filaOperarios'>
				<td class='width15p'>${codigoActividad}</td>
				<td style='width:200px;'>${descripcion}</td>
				<td style='width:250px;'>
					<input type='text' id='${codigoActividad}'  value='${numero}' class='valorOperario required' style='margin-bottom: 3px; width: 95%;'>
				</td>
				<td class='width5p'>
					<a class='btnEliminar'><i class="icon-trash"></i></a>
				</td>
			</tr>
		</script>
			
		<!-- PALNTILLA FILA CAMPO -->	
		<script	type="text/x-jquery-tmpl" id="campoTemplate">
			<tr>
				<td style='width:200px;'>
					{{if validacion == 'required'}}
						<label	for='${nombre}' class='${validacion}'>${label} (*)</label>
					{{else}}
						<label	for='${nombre}' class='${validacion}'>${label}</label>
					{{/if}}
				</td>
				<td style='width:350px;'>
					{{if tipo == 'text'}}
						<input type='${tipo}' id='${nombre}' name='${nombre}' value='' class='${validacion}' style='margin-bottom: 3px; width: 95%;'>
					{{else tipo == 'combo'}}
						<select id='${nombre}' name='${nombre}' class='${validacion}' style='margin-bottom: 3px; width: 99%;'>
							<option value=''> Seleccione una opci&oacute;n </option>
						</select>			
					{{else tipo == 'checkbox'}}
						<select id='${nombre}' name='${nombre}' class='${validacion}' style='margin-bottom: 3px; width: 99%;'>
							<option value=''> Seleccione una opci&oacute;n </option>
							<option value='SI'> SI </option>
							<option value='NO'> NO </option>
						</select>
						<!--<input type='checkbox' id='${nombre}' name='${nombre}' class='${validacion}' style='margin-bottom: 3px; width: 95%;' />	-->
					{{/if}}
				</td>
				<td>
					<p class="help-block">${observaciones}</p>
				</td>
			</tr>
		</script>

		<script	type="text/template" id="comboTemplate">
			<option value='${valor}'>${valor} - ${texto}</option>
		</script>	
		<script	type="text/template" id="comboOperariosTemplate">
			<option value='${Code}'> ${Code} - ${Description}</option>
		</script>	

		<!-- PLANTILLA BASE SOPORTE -->
		<script type="text/template" id='templateBaseSoporte'>
			<tr>
				<td>
					<input type='radio' name='seleccionSoporteBase' id='${codigo}' value='${codigo}' />
				</td>
				<td> ${codigo} </td>
				<td> ${descripcion} </td>
				<td> ${claseVidrio} </td>
				<td> ${tratamientoTermico} </td>
				<td> ${fdf} </td>
				<td> ${pesoNeto} </td>
				<td> ${cadenciaEstandar} </td>
				<td> ${rendimientoEstandar} </td>
			</tr>
		</script>

		<!-- PLANTILLA BASE SEMITERMINADO -->
		<script type="text/template" id='templateBaseSemiterminado'>
			<tr style='display: table-row;'>
				<td class='width10p'>
					<input type='radio' name='seleccionSemiterminadoBase' id='${codigo}' value='${codigo}' />
				</td>
				<td> ${codigo} </td>
				<td> ${descripcion} </td>
				<td> ${serie} </td>
				<td> ${decorado} </td>
			</tr>
		</script>

		<script src="js/libs/jquery-1.7.1.min.js" type="text/javascript"></script>
		<script src="js/libs/jquery-ui-1.8.18.custom.min.js" type="text/javascript"></script>
		<script src="js/libs/jquery.tmpl.min.js" type="text/javascript"></script>
		<script src="js/libs/jquery.validate.min.js" type="text/javascript"></script>
		<script src="js/libs/json2.js" type="text/javascript"></script>
		<script src="js/libs/bootstrap.min.js" type="text/javascript"></script>
		<script src="js/base/Utils.js" type="text/javascript"></script>
		<script src="js/base/framework.js" type="text/javascript"></script>
		
		<script src="js/base/FormBuilder.js" type="text/javascript"></script>
		<script src="js/vistas/Articulos.js" type="text/javascript"></script>
		<script src="js/controles/GridEditable.js" type="text/javascript"></script>
		<script type="text/javascript">

		    $('#s4-leftpanel').hide();
		    $('#MSO_ContentTable').css('margin-left', '25px');

		    var frm = new Articulos();
		    frm.init();

		    $('#btnAddUnidadMedida').on('click', function () {
		        alert('Creando un nuevo elemento en unidades de medida');
		        API_Sharepoint.CrearElementoEnLista('UnidadesDeMedida', setFn);
		        API_Sharepoint.ElementosEnLista('UnidadesDeMedida').done(renderUnidadesMedida);
		    });
		</script>
	<style type="text/css">
		#herenciaSoporte{
			background-color: #ED7256;
			background-color: #9F9A8A;
			border: 1px solid #999;
			padding: 3px 5px;
		}
		#herenciaSoporteCabecera{
			vertical-align: text-bottom;
		}
		#herenciaSoporteCabecera span{
			vertical-align: text-bottom;
		}
		#herenciaSoporteBloque{
			background-color: #FFF;
		}
		#herenciaSemiterminado{
			background-color: #ED7256;
			background-color: #9F9A8A;
			border: 1px solid #999;
			padding: 3px 5px;
		}
		#herenciaSemiterminadoCabecera{
			vertical-align: text-bottom;
		}
		#herenciaSemiterminadoCabecera span{
			vertical-align: text-bottom;
		}
		#herenciaSemiterminadoBloque{
			background-color: #FFF;
		}
	</style>

</asp:Content>
<asp:Content ID="PageTitle" ContentPlaceHolderID="PlaceHolderPageTitle" runat="server">
Página de aplicación
</asp:Content>

<asp:Content ID="PageTitleInTitleArea" ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server" >
Mi página de aplicación
</asp:Content>
