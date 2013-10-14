<%@ Assembly Name="SP_WebServices, Version=1.0.0.0, Culture=neutral, PublicKeyToken=d211fcac4eb9099b" %>
<%@ Import Namespace="Microsoft.SharePoint.ApplicationPages" %>
<%@ Register Tagprefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=14.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=14.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="asp" Namespace="System.Web.UI" Assembly="System.Web.Extensions, Version=3.5.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Import Namespace="Microsoft.SharePoint" %>
<%@ Assembly Name="Microsoft.Web.CommandUI, Version=14.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Estructura.aspx.cs" Inherits="SP_WebServices.Layouts.Cotizacion.site.Estructura" DynamicMasterPageFile="~masterurl/default.master" %>

<asp:Content ID="PageHead" ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
 <script type="text/javascript" src="../js/libs/json2.js"></script>
        <link rel='stylesheet' type='text/css' href='../css/base.css' />
        <link rel='stylesheet' type='text/css' href='../css/ipkweb/jquery-ui-1.8.18.custom.css' />
        <link rel='stylesheet' type='text/css' href='../css/estilos.css' />
        <link rel="stylesheet" type='text/css' href="../css/famfamfam.css">

        <style type="text/css">
            #resumenDossier{
                background-color: #f8f8f8;
                border-top   : 1px solid #DDD;
                border-left  : 1px solid #DDD;
                border-right : 1px solid #DDD;
                padding: 10px;
            }


            #estructura{
                font-family: Arial;
                /*border   : 1px solid #DDD;*/
            }
            #estructura ul {
                list-style: none;
                margin-top:  2px;
                margin-bottom:  2px;
                padding-left: 15px;
            }

            /*.areaSolucion:hover .headerSolucion{ background-color: #D2D2D2; }*/
            .headerSolucion{
                background-color: #F1F1F1;
                height: 25px;
                padding: 10px;
                cursor: pointer;
            }

            .headerSolucion.EnEstudio{ background-color: #FFFA88; }
            .headerSolucion.EnEstudio:hover { background-color: #FFFA88; }
            .headerSolucion.Aceptada { background-color: #CFFDAD; }
            .headerSolucion.Aceptada:hover { background-color: #CFFDAD; }
            .headerSolucion.Rechazada{ background-color: #FFDADA; }
            .headerSolucion.Rechazada:hover{ background-color: #FFDADA; }
            .contentSolucion{

            }

            .headerFormas{
                background-color: #a6c9e2;
                padding: 5px;
                padding-left:  10px;
                cursor: pointer;
            }
            .contentFormas {
                background-color: #FFF;
                border-top      : 1px solid #a6c9e2;
                border-bottom   : 1px solid #a6c9e2;
                border-left     : 1px solid #a6c9e2;
                border-right    : 1px solid #a6c9e2;

            }
            .contentFormas ul li{
                padding-left : 15px;
                height: 30px;
                display: block;
            }
            .contentFormas ul li:hover{
                /*background-color: #F7DA9C;*/
            }
            .headerEmbalajes{
                background-color: #8DDB99;
                padding: 5px;
                padding-left:  10px;
                   cursor: pointer;
            }

            .contentEmbalajes{
                background-color: #FFF;
                border-top: 1px solid #8DDB99;
                border-bottom   : 1px solid #8DDB99;
                border-left     : 1px solid #8DDB99;
                border-right    : 1px solid #8DDB99;
            }
            .contentEmbalajes ul li{
                padding-left : 15px;
                height: 30px;
            }
            .contentEmbalajess ul li:hover{
                /*background-color: #F7DA9C;*/
            }

        </style>
</asp:Content>

<asp:Content ID="Main" ContentPlaceHolderID="PlaceHolderMain" runat="server">
<SharePoint:ScriptLink ID="ScriptLink1" language="javascript" name="SP.js" defer="true" runat="server" Localizable="false"/>


<div class='ui-layout-north' style='margin: 0; padding: 0; overflow: hidden;'>
                <div id='menuPlaceholder'></div>
			</div>
			<div class="ui-layout-center">
				<div id='center-content' class="width100p">
                    <h3 id='tituloCentro'>Estructura de dossier</h3>
                    <input type="button" class='boton' id='editarDossier' value='Ficha dossier'/>
                    <input type="button" class='boton' id='btnAbrirWorkflow' value='Ver workflow'/>
                    <input type="button" class='boton' id='btnSubirDocumento' value='Subir documento'/>
                    <input type="button" class='boton' id='btnVistaCompleta' value='Vista completa'/>
                    <div id="vistaCompletaDossier" style=' overflow: scroll; display:none;'>
                        <div class='actions'>
                            <input type="button" class="boton print" value="Imprimir" />
                        </div>
                        <div class='content'>
                            <div id="dossier" class="floatLeft"></div>
                            <div id="soluciones" class="floatLeft"></div>
                            <div id="articulos" class="floatLeft"></div>
                            <div id="embalajes" class="floatLeft"></div>
                        </div>
                    </div>
                    <div id='workflowPlaceHolder'></div>
                    <div id='hojaCotizacionPlaceHolder'></div>
                    <div id='listadoAdjuntosPlaceHolder'></div>
                    <br>
                    <br>
                    <div id='contenedorFicha1'></div>
                    <div id='contenedorFichaNivel'></div>

                    <div id='resumenDossier'>
                        <span >Nun. Dossier:</span>
                        <span id='rsNumDossier' class='bold'></span>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                        <span>Tipo Dossier:</span>
                        <span id='rsTipoDossier' class='bold'></span>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                        <span>F. Creaci&oacute;n:</span>
                        <span id='rsFechaCreacion' class='bold'></span>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                        <span>F. Cierre:</span>
                        <span id='rsFechaCierre' class='bold'></span>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                        <span>Estado:</span>
                        <span id='rsEstado' class='bold'></span>
                        <br>
                        <span>Descripci&oacute;n:</span>
                        <span id='rsDescripcion' class='bold'></span>
                        <br>
                        <span>Observaciones:</span>
                        <span id='rsObservaciones' class='bold'></span>
                    </div>
                    <div id='relaciones' class="miniToolbar">
                        <ul >
                            <li>
                                <a href="#" id='verSoluciones'>
                                    <span class='icon-book'>&nbsp;</span>
                                    <span>Soluciones</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" id='verArticulos'>
                                    <span class='icon-glass'>&nbsp;</span>
                                    <span>Articulos</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" id='verEmbalajes'>
                                    <span class='icon-inbox'>&nbsp;</span>
                                    <span>Embalajes</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" id='verAdjuntos'>
                                    <span class='icon-file'>&nbsp;</span>
                                    <span>Adjuntos</span>
                                </a>
                            </li>
                        </ul>
                        <div class="clearFix"></div>
                    </div>
                    <br>
                    <div id='contenedorTablaSoluciones' class='listado'></div>
                    <div id='contenedorTablaEmbalajes' class='listado'></div>
                    <div id='contenedorTablaArticulos' class='listado'></div>
                    <div id='listaEmbalajesME' class='listado'></div>
                    <div id='listaArticulosME' class='listado'></div>
                    <div id='estructura' class='estructura'>

                    </div>
                    <br>
			    </div>
            </div>

            <script type="text/template" id="solucionTemplate">
                <div id="solucion-${idSolucion}" class='solucion ${Estado}'>
                    <div class='header'>
                        <span class='headerText'>${Descripcion}</span>
                        <div class='actions'>
                            <a id='btnVerHojaCotizacion' href="#" >
                                <span class='icon-search'>&nbsp;</span>
                                <span>Ver Hoja</span>
                            </a>
                            <a id='btnAgregarArticulo' href="#" >
                                <span class='icon-plus'>&nbsp;</span>
                                <span>Agregar Forma</span>
                            </a>
                            <a id='btnAgregarEmbalaje' href="#" >
                                <span class='icon-plus'>&nbsp;</span>
                                <span>Agregar Nivel</span>
                            </a>
                            <a id="btnAceptarSolucion" href="#" >
                                <span class='icon-ok'>&nbsp;</span>
                                <span>Aceptar Solucion</span>
                            </a>
                            <a id="btnRechazarSolucion" href="#" >
                                <span class='icon-remove'>&nbsp;</span>
                                <span>Rechazar Solucion</span>
                            </a>
                        </div>
                        <div class="clearFix"></div>
                    </div>
                    <div class='content'>
                        <div class='formasContenedor'>
                            <div class="formasHeader">
                                FORMAS  <span class="numeroFormas">(#)</span>
                            </div>
                            <div class='formasList'>
                                <ul></ul>
                            </div>
                        </div>
                        <div class='embalajesContenedor'>
                            <div class="embalajesHeader">
                                EMBALAJES <span class="numeroEmbalajes">(#)</span>
                            </div>
                            <div class='embalajesList'>
                                <div class='niveles'></div>
                            </div>
                        </div>
                    </div>
                </div>
                <br>
            </script>
            <script type="text/template" id="formaTemplate">
                 <li id="forma-${idFormaArt}">
                    <span>${TipoForma} - ${Nombre}</span>
                    <a href="#" alt="Elminar la forma" title="Elminar la forma">
                        <span class='fam cancel'></span>
                    </a>
                    <div class="clearFix"></div>
                </li>
            </script>
            <script type="text/template" id="nivelTemplate">
                <div id="nivel-${IdNivel}" class='nivel'>
                    <div class="header">
                        <span>Nivel ${NumNivel} - ${Descripcion}</span>
                         <a class='btnEliminarNivel' href="#" alt="Eliminar el nivel" title="Eliminar el nivel" >
                            <span class='fam cancel'></span>
                        </a>
                        <a class='btnEditarNivel' href="#" alt="Editar el nivel" title="Editar el nivel">
                            <span class='fam application_form_edit'></span>
                        </a>
                        <a href="#" class='btnAgregarComponente' alt="Agregar un componente" title="Agregar un componente">Agregar Componente</a>
                    </div>
                    <div class="content">
                        <ul></ul>
                    </div>
                </div>
            </script>
            <script type="text/template" id="embalajeTemplate">
                <li id="embalaje-${idFormaEmb}">
                    <span>${Nombre}</span>
                    <a href="#">
                        <span class='fam cancel'></span>
                    </a>
                </li>
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
            <script type="text/javascript" src="../js/libs/jquery.printElement.min.js"></script>

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
            <script type="text/javascript" src="../js/controles/ipkTablaHijos.js"></script>
            <script type="text/javascript" src="../js/controles/ipkTablaRelacion.js"></script>
            <script type="text/javascript" src="../js/controles/ipkMostrarElegir.js"></script>
            <script type="text/javascript" src="../js/controles/ipkRemoteFicha.js"></script>
            <script type="text/javascript" src="../js/controles/ipkRemoteInfraestructura.js"></script>
            <script type="text/javascript" src="../js/controles/ipkRemoteDataSourceNavision.js"></script>
            <script type="text/javascript" src="../js/controles/ipkModelInspector.js"></script>
            <script type="text/javascript" src="../js/controles/ipkFactory.js"></script>
            <script type="text/javascript" src="../js/base/ipkContexto.js"></script>

            <!-- <script type="text/javascript" src="../js/componentes/arbolEstructura.js"></script> -->
            <script type="text/javascript" src="../js/componentes/IpkComportamientos.js"></script>
            <script type="text/javascript" src="../js/componentes/workflowManager.js"></script>
            <script type="text/javascript" src="../js/componentes/hojaCotizacionCliente.js"></script>
            <script type="text/javascript" src="../js/componentes/hojaCotizacionComercial.js"></script>
            <script type="text/javascript" src="../js/componentes/visorHojasCotizacion.js"></script>
            <script type="text/javascript" src="../js/componentes/listadoAdjuntos.js"></script>
            <script type="text/javascript" src="../js/componentes/vistaCompleta.js"></script>

            <link rel="stylesheet" href="ui/arbolSolucion/css/arbolSolucion.css">
            <script type="text/javascript" src="ui/arbolSolucion/js/arbolSolucion.js"></script>

            <script type="text/javascript" src="../js/vistas/Estructura_Test.js"></script>

		<script type="text/javascript">
		    var controller = null;
		    var listado = null;
		    var listadoEmb = null;
		    var listadoArt = null;
		    var estructura = null;
		    var esquema = null;


		    $(document).ready(function () {
		        esconderNavSP();

		        $('body').layout({
		            north: {
		                resizable: false,
		                closable: false,
		                size: '30'
		            }
		        });
		        app.modelos.sharepoint.usuarios.GrupoUsuarioActual().done(
                    function (respuesta) {
                        app.seguridad.grupoActual = app.ajax.procesarRespuesta([respuesta]).datos;
                        esquema = new appEsquema(true);
                        esquema.onLoad = function () {
                            estructura = new Estructura();
                        };
                    }
                );
		    });
		</script>
</asp:Content>

<asp:Content ID="PageTitle" ContentPlaceHolderID="PlaceHolderPageTitle" runat="server">
Estructura del dossier
</asp:Content>

<asp:Content ID="PageTitleInTitleArea" ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server" >
Estructura del dossier
</asp:Content>
