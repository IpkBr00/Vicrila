<%@ Assembly Name="Lanzamiento_Nuevos_Productos, Version=1.0.0.0, Culture=neutral, PublicKeyToken=7d95c09ab090aee0" %>
<%@ Import Namespace="Microsoft.SharePoint.ApplicationPages" %>
<%@ Register Tagprefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=14.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=14.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="asp" Namespace="System.Web.UI" Assembly="System.Web.Extensions, Version=3.5.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Import Namespace="Microsoft.SharePoint" %>
<%@ Assembly Name="Microsoft.Web.CommandUI, Version=14.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ListadoProductos.aspx.cs" Inherits="Lanzamiento_Nuevos_Productos.Layouts.Lanzamiento_Nuevos_Productos.ListadoProductos" DynamicMasterPageFile="~masterurl/default.master" %>

<asp:Content ID="PageHead" ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
</asp:Content>

<asp:Content ID="Main" ContentPlaceHolderID="PlaceHolderMain" runat="server">
 <div id='ipkContainer' class='container'>
	    <link rel='stylesheet' type='text/css' href='css/estilos.css' />
	    <link rel='stylesheet' type='text/css' href='css/ipkblue/jquery-ui-1.8.18.custom.css' />
 		<link rel='stylesheet' type='text/css' href='css/base.css' />
        <style type="text/css">
            #buscarLanzamientos{
                background-color: #F2FDFF;
                border: 1px solid #79CADF;
                width: 75%;

                margin-bottom: 10px;
            }

            #buscarLanzamientos span{
                background-color: #5AAFC5;
                color: white;
                display: inline-block;
                font-weight: bold;
                font-size: 14px;
                height: 35px;
                padding-top: 18px;
                padding-left: 10px;
                padding-right: 10px;
                vertical-align: top;
            }

            #buscarLanzamientos table{
                display: inline-block;
            }

            #filtroLanzamientos{
                background-color: #F2FDFF;
                border: 1px solid #79CADF;
                font-size: 14px;
                width: 75%;
            }

            #filtroLanzamientos span{
                background-color: #5AAFC5;
                color: white;
                display: inline-block;
                font-weight: bold;
                height: 27px;
                padding-left: 10px;
                padding-right: 10px;
                padding-top: 10px;
                vertical-align: top;
            }

            #filtroLanzamientos a{
                color: #444;
                display: inline-block;
                font-weight: bold;
                margin: 10px 15px;
            }

            #filtroLanzamientos a.activo{
                color: #777;
                font-weight: bold;
                text-decoration: underline;
            }

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

	    <h2>Listado de lanzamientos comerciales</h2>
	    
	  	<button type='button' name='btnAlta' id='btnAlta' accesskey="n">Nuevo lanzamiento comercial</button>
	    <br>
	    <br>
	    <div id="filtroLanzamientos">
            <span>Filtro:</span>
            <a id="lanzamientosTodos" href="#">Todos</a>
            <a id="lanzamientosCompletados" href="#">Completados</a>
            <a id="lanzamientosNoCompletados" href="#">No Completados</a>
	    </div>
	    <br>
	    <div id="buscarLanzamientos">
	        <span>Busqueda:</span>
	        <table>
                <thead>
                     <tr>
                         <th style="text-align: left;" >
                             <label for="codigoBuscar">C&oacute;digo</label>
                         </th>
                         <th style="text-align: left;" >
                            <label for="denominacionBuscar">Denominaci&oacute;n</label>
                        </th>
                        <th style="text-align: left;" >
                            <label for="fechaCompletadoDesdeBuscar">F. Completado Desde</label>
                        </th>
                         <th style="text-align: left;" >
                            <label for="fechaCompletadoHastaBuscar">F. Completado Hasta</label>
                        </th>
                         <th style="text-align: left;" >&nbsp;</th>
                     </tr>
                </thead>
                <tbody>
                     <tr>
                         <td >
                             <input type="text" id="codigoBuscar" />
                         </td>
                         <td >
                             <input type="text" id="denominacionBuscar" style="width: 400px;"/>
                         </td>
                         <td >
                            <input type="text" id="fechaCompletadoDesdeBuscar" style="width: 150px;"/>
                         </td>
                         <td >
                            <input type="text" id="fechaCompletadoHastaBuscar" style="width: 150px;"/>
                         </td>
                         <td >
                            <input type="button" id="btnBuscar" value="Buscar" />
                         </td>
                     </tr>
                </tbody>
            </table>
	    </div>
	    <table id='listado' class='tabla tabla-striped tabla-bordered tabla-condensed width75p'>
		    <thead>
			    <tr>
				    <!--<th>Id</th>-->
				    <th>C&oacute;digo</th>
				    <th>Denominaci&oacute;n</th>
				    <th>Elementos</th>
				    <th>F. Completado</th>
				    <!--<th>Acciones</th>-->
			    </tr>
		    </thead>
		    <tbody>		
				
		    </tbody>
	    </table>

        <div id="paginador">
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
	    <div id='dialogoAlta' class=''>		    
	    	<div id='overlayLoading' style='display:none;'></div>
	    	<input type='hidden' id='id' name='id' value=''>		
	    	<br>
	    	<table class='width100p'>
	    		<tbody>
	    			<tr >
	    				<td class='width25p'>
	    					<label for='codigo' class=''>C&oacute;digo: </label>	
	    				</td>
	    				<td>
						<input type='text'  class='width100p' id='codigo' name='codigo' accesskey='c' value=''/>
	    				</td>
	    			</tr>
					<tr>
	    				<td class='width25p'>
	    				    <label for='denominacion' class=''>Denominaci&oacute;n: </label>
	    				</td>
	    				<td>
						<input type='text'  class='width100p' id='denominacion' name='denominacion' accesskey='d' value=''/>
	    				</td>
	    			</tr>
	    			<tr>
	    				<td  class='width25p'>
	    				    <label for='descripcion' class=''>Descripcion: </label>
	    				</td>
	    				<td>
						<textarea class='width100p' id='descripcion' name='descripcion' accesskey='s' value=''></textarea>
	    				</td>
	    			</tr>
	    			
	    				</tbody>
	    	</table>
	    	<br>
	    	<table id='elementos' class='width100p'>
	    		<thead>
		    		<tr>
		    			<td colspan='5'>
	    					<span class='cabecera bgBlackL fWhite'>ELEMENTOS</span>
	    					<div id='toolbarElementos' class='miniToolbar'>
								<ul>
									<li title='A&ntilde;adir producto' id='add'>
										<a href="#" class='ui-icon ui-icon-plusthick' id='add' ></a>
										<ul id='float' style='display:none;'>
											<li>Soporte</li>
											<li>Semiterminado</li>
											<li>Terminado</li>
											<li>Embalaje</li>
										</ul>
									</li>
									<li title='Eliminar productos seleccionados' id='delete'>
										<a href="#" class='ui-icon ui-icon-trash' ></a>
									</li>
								</ul>
								<div class='clearFix'></div>
							</div>
	    				</td>
	    			</tr>
				</thead>
				<tbody>
				</tbody>
	    	</table>
	    </div>
    </div>
	<script type="text/template" id='productoTemplate'>
		<tr id='${id}'>
			<td class='width5p'>
				<input type='checkbox' id='${id}' />
			</td>
			<td class='width20p'>
				<select class='width100p'>
					<option value='Soporte'>Soporte</option>
					<option value='Semiterminado'>Semiterminado</option>
					<option value='Terminado'>Terminado</option>
					<option value='Embalaje'>Embalaje</option>
				</select>		    							
			</td>
			<td class='width15p'>
				<input type='text' class='codigo' />
			</td>
			<td class='width55p'>
				<input type='text' class='width100p'/>
			</td>
			<td >
				<span class='tag bgRed' style='display:none;' alt='Producto de navision'>Nav</span>
			</td>
		</tr>
	</script>
	<script	type="text/template" id="listadoTemplate">
	    <tr id='producto-${ID}'>
		    <!--<td>${ID}</td>-->
		    <td>
			    <a href='../../${codigo}/_layouts/Lanzamiento_Nuevos_Productos/ResumenProducto.aspx' class='irAProducto'>
				    <span class='tag ${clase}'>${codigo}</span>
			    </a>
		    </td>
		    <td>${denominacion} </td>
		    <td>
		    	{{each articulos}}
					{{if $value.tipo == "Soporte"}}
						<span class='tag bgGreen' title='Articulo Soporte' alt='Articulo Soporte'>P</span>
					{{/if}}
					{{if $value.tipo == "Semiterminado"}}
						<span class='tag bgMagenta' title='Articulo SemiTerminado' alt='Articulo SemiTerminado'>S</span>
					{{/if}}
					{{if $value.tipo == "Terminado"}}
						<span class='tag bgOrange' title='Articulo Terminado' alt='Articulo Terminado'>T</span>
					{{/if}}
					{{if $value.tipo == "Embalaje"}}
						<span class='tag bgBlue' title='Embalaje' alt='Embalaje'>E</span>
					{{/if}}
				{{/each}}
		    </td>
            <td>${fechaCompletado} </td>
            {{if canBeDeleted == "S"}}
	        <td class='acciones'>
			<!--
			        <a class='btnVer'><i class="icon-find"></i></a>
	                <a class='btnEditar'><i class="icon-pencil"></i></a>
	        -->
                <a href="#" class='ui-icon ui-icon-trash btnEliminar' ></a>
		    </td>
		    {{/if}}

	    </tr>
	</script>

    <script src="js/libs/jquery-1.7.1.min.js" type="text/javascript"></script>
    <script src="js/libs/jquery-ui-1.8.18.custom.min.js" type="text/javascript"></script>
    <script src="js/libs/jquery.tmpl.min.js" type="text/javascript"></script>
    <script src="js/libs/json2.js" type="text/javascript"></script>
    <script src="js/libs/underscore-min.js" type="text/javascript"></script>
    <script src="js/base/Utils.js" type="text/javascript"></script>
    <script src="js/base/framework.js" type="text/javascript"></script>
    <script src="js/controles/Paginador.js" type="text/javascript"></script>
    <script src="js/vistas/ListadoProductos.js" type="text/javascript"></script>
    <script type="text/javascript">
        var frm;
        frm = new ListadoProductos({ valor: '' });
        frm.init();
    </script>

</asp:Content>

<asp:Content ID="PageTitle" ContentPlaceHolderID="PlaceHolderPageTitle" runat="server">
Listado de lanzamientos comerciales
</asp:Content>

<asp:Content ID="PageTitleInTitleArea" ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server" >
Listado de lanzamientos comerciales
</asp:Content>
