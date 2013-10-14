<html lang="es">
	<head>
		<title>Vista Completa Dossier</title>

        <script type="text/javascript" src="../js/libs/json2.js"></script>
        <link rel='stylesheet' type='text/css' href='../css/ipkweb/jquery-ui-1.8.18.custom.css' />
        <link rel='stylesheet' type='text/css' href='../css/base.css' />
        <link rel='stylesheet' type='text/css' href='../css/estilos.css' />

        <style type="text/css">
            .toTable table{
                border-top: 1px solid #c8c8c8;
                border-left: 1px solid #c8c8c8;
                font-size: 10px;
                width: 400px;
            }
            .toTable table thead tr{
                background-color: #e8e8e8;
            }
            .toTable table thead tr th{
                padding: 3px 5px;
                border-right : 1px solid #c8c8c8;
                border-bottom: 1px solid #c8c8c8;
                width: 50%;
                text-align: left;
            }
            .toTable table tbody tr td{
                padding: 3px 5px;
                border-right : 1px solid #c8c8c8;
                border-bottom: 1px solid #c8c8c8;
                width: 50%;
                text-align: left;
            }
            .toTable table caption{
                /*background-color: #2ECC71;
                color: #FFF;*/
                padding: 3px 5px;
                font-size: 15px;
                font-weight: bold;
                text-align: left;
            }
            .toTable table caption:hover{
                /*background-color: #27AE60;*/
            }

            .colTurquoise{ background-color: #1ABC9C;   color: #FFF;}
            .colGreenSea{ background-color: #16A085;   color: #FFF;}
            .colEmerland{ background-color: #2ECC71;   color: #FFF;}
            .colNephritis{ background-color: #27AE60;   color: #FFF;}
            .colPeterRiver{ background-color: #3498DB;   color: #FFF;}
            .colBelizeHole{ background-color: #2980B9;   color: #FFF;}
            .colAmethyst{ background-color: #9B59B6;  color: #FFF; }
            .colWisteria{ background-color: #8E44AD;  color: #FFF; }
            .colWetAsphalt{ background-color: #34495E;   color: #FFF;}
            .colMidnigthBlue{ background-color: #2C3E50;   color: #FFF;}
            .colSunFlower{ background-color: #F1C40F;   color: #FFF;}
            .colOrange{ background-color: #F39C12;   color: #FFF;}
            .colCarrot{ background-color: #E67E22;   color: #FFF;}
            .colPumpkin{ background-color: #D35400;   color: #FFF;}
            .colAlizarin{ background-color: #E74C3C;   color: #FFF;}
            .colPomergranate{ background-color: #C0392B;   color: #FFF;}
            .colClouds{ background-color: #ECF0F1;  color: #000; }
            .colSilver{ background-color: #BDC3C7;  color: #FFF; }
            .colConcrete{ background-color: #95A5A6;   color: #FFF;}
            .colAsbestos{ background-color: #7F8C8D;   color: #FFF;}

             .nivel1{ margin-left : 15px;}
             .nivel2{ margin-left : 30px;}
             .nivel3{ margin-left : 45px;}
        </style>
        <script type="text/javascript">
            var str = {
                "IdDossier":93,
                "TipoDossier":"VA",
                "FechaPeticion":"",
                "FechaCreacion":"15/02/2013",
                "FechaCierre":"",
                "NumDemanda":null,
                "NumDossier":"VA0553",
                "DescripcionArt":"V CHILE 2013 67CL R FA6 RA",
                "Mercado":"-1",
                "Marca":"V00",
                "Nomenclatura":false,
                "CodCliente":"CL00023",
                "NombreClteSolicitante":"RASTAL GMBH &amp; CO. KG",
                "PaísCliente":"DE",
                "JefeProyecto":"LAURA GALLEGO",
                "CantidadAFabricar":null,
                "Tranchas":null,
                "Tolerancia":null,
                "Entregas":null,
                "FechaDisponibilidadNecesaria":"20/02/2013",
                "PrecioNetoNecesario":null,
                "UnidadMedidaVenta":1,
                "ModoDeEnvio":null,
                "Incoterm":"-1",
                "Destino":null,
                "Observaciones":null,
                "Estado":"EnEstudio",
                "UltimoLanzamientoWorkflow":"15/02/2013 10:35:52",
                "CantidadPrimeraFabricacion":null,
                "CantidadPrevistaAño":250000,
                "FechaLimiteRespuesta":"20/02/2013",
                "Comercial":"Z001",
                "GrupoActualWorkflow":"Comercial",
                "FormaArt":[{"idFormaArt":57,"refNavision":null,"TipoForma":"SEMITERMINADO","Nombre":"V CHILE 2013 67CL R FA6 RA","ProcesoFabricacion":"V06","NumPlano":null,"PesoBruto":460,"PesoNeto":388,"TratamientoTermico":"V04","FilograbadoMP":false,"TratamientoCaliente":false,"HACCP":false,"Etiqueta":false,"Calidad":"ES","DECODimensiones":null,"DECOPosicion":null,"DECONumColores":null,"DECOTipoDeco":"CERRADO","DECOTipoEsmalte":"CONPLOMO","DECOMuestraDisponible":false,"DECOTratamientoTermico":"-1","DECOFilograbadoDeco":false,"DECONumPases":null,"DECOCantEsmalte":null,"DECOCantOroPlata":null,"DECOMaquina":null,"DECOVelocidad":null,"DECORendimiento":null,"DECONumPersEnMaquina":null,"DECONumPersTotal":null,"DECONumPersTotalDecoVRAC":null,"DECONuevo":false,"PRODMaquina":"VI13","PRODVelocidad":45,"PRODRendimiento":80,"MOLDHorasMtoMoldes":23.3,"UTILLInversion":30800,"UTILLDuracion":4,"UTILLPLazoDiasElementosADesarrollar":120,"NumArts":250000,"Comentarios":null,"EsDecorado":false,"Observaciones":"5 dias de produccion","refCuerpo":null,"refPie":null,"TipoCollares":"127 soplado fijo","CantMinimaFabDia":51840,"DECORendimientoArticulo":null,"TipoSEVP":false,"TipoSoplado":"FIJO","Dossier":null,"Solucion":null}],
                "FormaEmb":[{"idFormaEmb":92,"nNivel":1,"RefNavision":null,"Nombre":"FA6","NumArtsEmbalaje":null,"LongitudTotal":895,"AnchuraTotal":635,"CalidadEmbalaje":"C01","CalidadImpresion":"13","NCompsPorPaletArtTerminado":114,"CosteCompEmb":0.34,"PALTipoPalet":"-1","PALCantidadPaletEnPiezas":null,"PALEmbalajePaletizadoDefinida":null,"PALPapelPlanchaEntrePisos":null,"PALCantPapelPlanchaEntrePisos":null,"PALPlanchaCartonEnBaseYSuperior":null,"PALPlasticoEnBase":false,"PALModoCompactarPalet":"-1","PALNumCompsEmbalado":null,"NivelPaletizado":false,"TipoEmbalaje":"F","CalidadMaterial":null,"Observaciones":null,"CalidadEmbalajeTexto":null,"Dossier":null,"Solucion":null,"Nivel":null},{"idFormaEmb":93,"nNivel":3,"RefNavision":"0057415","Nombre":"PALLET EUROPEO DE 80X120","NumArtsEmbalaje":null,"LongitudTotal":null,"AnchuraTotal":null,"CalidadEmbalaje":"-1","CalidadImpresion":"-1","NCompsPorPaletArtTerminado":null,"CosteCompEmb":null,"PALTipoPalet":"0057415","PALCantidadPaletEnPiezas":"684","PALEmbalajePaletizadoDefinida":null,"PALPapelPlanchaEntrePisos":"1","PALCantPapelPlanchaEntrePisos":null,"PALPlanchaCartonEnBaseYSuperior":1,"PALPlasticoEnBase":true,"PALModoCompactarPalet":"V02","PALNumCompsEmbalado":null,"NivelPaletizado":true,"TipoEmbalaje":"-1","CalidadMaterial":null,"Observaciones":null,"CalidadEmbalajeTexto":null,"Dossier":null,"Solucion":null,"Nivel":null},{"idFormaEmb":134,"nNivel":3,"RefNavision":"8581609","Nombre":"Plastico en la base","NumArtsEmbalaje":null,"LongitudTotal":1400,"AnchuraTotal":null,"CalidadEmbalaje":"-1","CalidadImpresion":"-1","NCompsPorPaletArtTerminado":1,"CosteCompEmb":null,"PALTipoPalet":"-1","PALCantidadPaletEnPiezas":null,"PALEmbalajePaletizadoDefinida":null,"PALPapelPlanchaEntrePisos":null,"PALCantPapelPlanchaEntrePisos":null,"PALPlanchaCartonEnBaseYSuperior":null,"PALPlasticoEnBase":false,"PALModoCompactarPalet":null,"PALNumCompsEmbalado":null,"NivelPaletizado":false,"TipoEmbalaje":null,"CalidadMaterial":null,"Observaciones":null,"CalidadEmbalajeTexto":null,"Dossier":null,"Solucion":null,"Nivel":null},{"idFormaEmb":135,"nNivel":3,"RefNavision":"8491684","Nombre":"Plastico en la base","NumArtsEmbalaje":null,"LongitudTotal":null,"AnchuraTotal":null,"CalidadEmbalaje":"915","CalidadImpresion":"-1","NCompsPorPaletArtTerminado":1,"CosteCompEmb":null,"PALTipoPalet":"-1","PALCantidadPaletEnPiezas":null,"PALEmbalajePaletizadoDefinida":null,"PALPapelPlanchaEntrePisos":null,"PALCantPapelPlanchaEntrePisos":null,"PALPlanchaCartonEnBaseYSuperior":null,"PALPlasticoEnBase":false,"PALModoCompactarPalet":null,"PALNumCompsEmbalado":null,"NivelPaletizado":false,"TipoEmbalaje":null,"CalidadMaterial":null,"Observaciones":null,"CalidadEmbalajeTexto":null,"Dossier":null,"Solucion":null,"Nivel":null}],
                "Solucion":[{"idSolucion":138,"Descripcion":"FA6 EN PAL DE 80X120 DE ... PIEZAS","PrecioCotizacion":null,"Estado":"EnEstudio","MotivoEstado":null,"FechaEstado":"01/03/2013","CotizEmbEnExterior":null,"DisponibilidadProducto":"12/07/2013","DisponibilidadElementos":"01/06/2013","CostoEmbEnDirecto":49.05,"MargenEnDirecto":null,"PrecioEnExterior":null,"MargenEnExterior":null,"NumPersNecesariasEmbVRAC":1,"EmbaladoEnExt":false,"LineasEmbalado":"VI13 embalado manual","NumPersNecesariasEmbDirecto":3,"CostoEmbEnExterior":null,"PrecioEnDirecto":null,"CifraDeNegocio":null,"Observaciones":null,"ComentariosEmbaladores":"En el embalado uno es espejo y no incluye el maqfdl y en el VRAC es el maquinista","PosicionArticulo":"BOCA ABAJO","ModoCompactarPalet":"V02","FechaValidez":"","MOQ":null,"CosteTransporte":20,"LeadTime":null,"Dossier":null,"FormaArt":null,"FormaEmb":null,"Nivel":null}],
                "WorkflowEstados":[{"IdWorkflowEstate":128,"IdElemento":57,"TipoElemento":"FormaArt","Descripcion":"V CHILE 2013 67CL R FA6 RA","Produccion":"Completada","Moldes":"Completada","Dnp":"Completada","Programacion":"Completada","Analitica":"Completada","Comercial":"Pendiente","FechaProduccion":"15/02/2013 14:44:08","FechaMoldes":"19/02/2013 11:10:07","FechaDnp":"11/03/2013 10:49:45","FechaProgramacion":"20/02/2013 16:47:14","FechaAnalitica":"06/03/2013 12:43:03","FechaComercial":"","Dossier":null},{"IdWorkflowEstate":129,"IdElemento":138,"TipoElemento":"Solucion","Descripcion":"FA6 EN PAL DE 80X120 DE ... PIEZAS","Produccion":"Completada","Moldes":"Completada","Dnp":"Completada","Programacion":"Completada","Analitica":"Completada","Comercial":"Pendiente","FechaProduccion":"15/02/2013 14:44:02","FechaMoldes":"15/02/2013 16:24:35","FechaDnp":"11/03/2013 10:49:45","FechaProgramacion":"20/02/2013 12:53:38","FechaAnalitica":"06/03/2013 12:43:03","FechaComercial":"","Dossier":null}]};

            var soluciones = [{
            "idSolucion":138,
            "Descripcion":"FA6 EN PAL DE 80X120 DE ... PIEZAS",
            "PrecioCotizacion":null,
            "Estado":"EnEstudio",
            "MotivoEstado":null,
            "FechaEstado":"01/03/2013",
            "CotizEmbEnExterior":null,
            "DisponibilidadProducto":"12/07/2013",
            "DisponibilidadElementos":"01/06/2013",
            "CostoEmbEnDirecto":49.05,
            "MargenEnDirecto":null,
            "PrecioEnExterior":null,
            "MargenEnExterior":null,
            "NumPersNecesariasEmbVRAC":1,
            "EmbaladoEnExt":false,
            "LineasEmbalado":"VI13 embalado manual",
            "NumPersNecesariasEmbDirecto":3,
            "CostoEmbEnExterior":null,
            "PrecioEnDirecto":null,
            "CifraDeNegocio":null,
            "Observaciones":null,
            "ComentariosEmbaladores":"En el embalado uno es espejo y no incluye el maqfdl y en el VRAC es el maquinista",
            "PosicionArticulo":"BOCA ABAJO",
            "ModoCompactarPalet":"V02",
            "FechaValidez":"",
            "MOQ":null,
            "CosteTransporte":20,
            "LeadTime":null,
            "Dossier":null,
            "FormaArt":[{"idFormaArt":57,"refNavision":null,"TipoForma":"SEMITERMINADO","Nombre":"V CHILE 2013 67CL R FA6 RA","ProcesoFabricacion":"V06","NumPlano":null,"PesoBruto":460,"PesoNeto":388,"TratamientoTermico":"V04","FilograbadoMP":false,"TratamientoCaliente":false,"HACCP":false,"Etiqueta":false,"Calidad":"ES","DECODimensiones":null,"DECOPosicion":null,"DECONumColores":null,"DECOTipoDeco":"CERRADO","DECOTipoEsmalte":"CONPLOMO","DECOMuestraDisponible":false,"DECOTratamientoTermico":"-1","DECOFilograbadoDeco":false,"DECONumPases":null,"DECOCantEsmalte":null,"DECOCantOroPlata":null,"DECOMaquina":null,"DECOVelocidad":null,"DECORendimiento":null,"DECONumPersEnMaquina":null,"DECONumPersTotal":null,"DECONumPersTotalDecoVRAC":null,"DECONuevo":false,"PRODMaquina":"VI13","PRODVelocidad":45,"PRODRendimiento":80,"MOLDHorasMtoMoldes":23.3,"UTILLInversion":30800,"UTILLDuracion":4,"UTILLPLazoDiasElementosADesarrollar":120,"NumArts":250000,"Comentarios":null,"EsDecorado":false,"Observaciones":"5 dias de produccion","refCuerpo":null,"refPie":null,"TipoCollares":"127 soplado fijo","CantMinimaFabDia":51840,"DECORendimientoArticulo":null,"TipoSEVP":false,"TipoSoplado":"FIJO","Dossier":null,"Solucion":null}],
            "FormaEmb":[{"idFormaEmb":92,"nNivel":1,"RefNavision":null,"Nombre":"FA6","NumArtsEmbalaje":null,"LongitudTotal":895,"AnchuraTotal":635,"CalidadEmbalaje":"C01","CalidadImpresion":"13","NCompsPorPaletArtTerminado":114,"CosteCompEmb":0.34,"PALTipoPalet":"-1","PALCantidadPaletEnPiezas":null,"PALEmbalajePaletizadoDefinida":null,"PALPapelPlanchaEntrePisos":null,"PALCantPapelPlanchaEntrePisos":null,"PALPlanchaCartonEnBaseYSuperior":null,"PALPlasticoEnBase":false,"PALModoCompactarPalet":"-1","PALNumCompsEmbalado":null,"NivelPaletizado":false,"TipoEmbalaje":"F","CalidadMaterial":null,"Observaciones":null,"CalidadEmbalajeTexto":null,"Dossier":null,"Solucion":null,"Nivel":null},{"idFormaEmb":93,"nNivel":3,"RefNavision":"0057415","Nombre":"PALLET EUROPEO DE 80X120","NumArtsEmbalaje":null,"LongitudTotal":null,"AnchuraTotal":null,"CalidadEmbalaje":"-1","CalidadImpresion":"-1","NCompsPorPaletArtTerminado":null,"CosteCompEmb":null,"PALTipoPalet":"0057415","PALCantidadPaletEnPiezas":"684","PALEmbalajePaletizadoDefinida":null,"PALPapelPlanchaEntrePisos":"1","PALCantPapelPlanchaEntrePisos":null,"PALPlanchaCartonEnBaseYSuperior":1,"PALPlasticoEnBase":true,"PALModoCompactarPalet":"V02","PALNumCompsEmbalado":null,"NivelPaletizado":true,"TipoEmbalaje":"-1","CalidadMaterial":null,"Observaciones":null,"CalidadEmbalajeTexto":null,"Dossier":null,"Solucion":null,"Nivel":null}],
            "Nivel":[{"IdNivel":34,"NumNivel":"1","NivelPaletizado":false,"RefNavision":null,"CalidadEmbalaje":"2","CalidadImpresion":"11","TipoEmbalaje":"F","NumEmbalajesNivelAnterior":null,"TipoPalet":null,"CantidadPaletEnPiezas":null,"EmbalajePaletizacionDefinida":null,"Observaciones":null,"Etiqueta":null,"Descripcion":null,
            "Solucion":{"idSolucion":138,"Descripcion":"FA6 EN PAL DE 80X120 DE ... PIEZAS","PrecioCotizacion":null,"Estado":"EnEstudio","MotivoEstado":null,"FechaEstado":"01/03/2013","CotizEmbEnExterior":null,"DisponibilidadProducto":"12/07/2013","DisponibilidadElementos":"01/06/2013","CostoEmbEnDirecto":49.05,"MargenEnDirecto":null,"PrecioEnExterior":null,"MargenEnExterior":null,"NumPersNecesariasEmbVRAC":1,"EmbaladoEnExt":false,"LineasEmbalado":"VI13 embalado manual","NumPersNecesariasEmbDirecto":3,"CostoEmbEnExterior":null,"PrecioEnDirecto":null,"CifraDeNegocio":null,"Observaciones":null,"ComentariosEmbaladores":"En el embalado uno es espejo y no incluye el maqfdl y en el VRAC es el maquinista","PosicionArticulo":"BOCA ABAJO","ModoCompactarPalet":"V02","FechaValidez":"","MOQ":null,"CosteTransporte":20,"LeadTime":null,"Dossier":null,"FormaArt":null,"FormaEmb":null,"Nivel":null},
            "FormaEmb":[{"idFormaEmb":92,"nNivel":1,"RefNavision":null,"Nombre":"FA6","NumArtsEmbalaje":null,"LongitudTotal":895,"AnchuraTotal":635,"CalidadEmbalaje":"C01","CalidadImpresion":"13","NCompsPorPaletArtTerminado":114,"CosteCompEmb":0.34,"PALTipoPalet":"-1","PALCantidadPaletEnPiezas":null,"PALEmbalajePaletizadoDefinida":null,"PALPapelPlanchaEntrePisos":null,"PALCantPapelPlanchaEntrePisos":null,"PALPlanchaCartonEnBaseYSuperior":null,"PALPlasticoEnBase":false,"PALModoCompactarPalet":"-1","PALNumCompsEmbalado":null,"NivelPaletizado":false,"TipoEmbalaje":"F","CalidadMaterial":null,"Observaciones":null,"CalidadEmbalajeTexto":null,"Dossier":null,"Solucion":null,"Nivel":null}]},{"IdNivel":35,"NumNivel":"3","NivelPaletizado":true,"RefNavision":null,"CalidadEmbalaje":"-1","CalidadImpresion":"-1","TipoEmbalaje":"-1","NumEmbalajesNivelAnterior":null,"TipoPalet":null,"CantidadPaletEnPiezas":null,"EmbalajePaletizacionDefinida":null,"Observaciones":null,"Etiqueta":null,"Descripcion":null,"Solucion":{"idSolucion":138,"Descripcion":"FA6 EN PAL DE 80X120 DE ... PIEZAS","PrecioCotizacion":null,"Estado":"EnEstudio","MotivoEstado":null,"FechaEstado":"01/03/2013","CotizEmbEnExterior":null,"DisponibilidadProducto":"12/07/2013","DisponibilidadElementos":"01/06/2013","CostoEmbEnDirecto":49.05,"MargenEnDirecto":null,"PrecioEnExterior":null,"MargenEnExterior":null,"NumPersNecesariasEmbVRAC":1,"EmbaladoEnExt":false,"LineasEmbalado":"VI13 embalado manual","NumPersNecesariasEmbDirecto":3,"CostoEmbEnExterior":null,"PrecioEnDirecto":null,"CifraDeNegocio":null,"Observaciones":null,"ComentariosEmbaladores":"En el embalado uno es espejo y no incluye el maqfdl y en el VRAC es el maquinista","PosicionArticulo":"BOCA ABAJO","ModoCompactarPalet":"V02","FechaValidez":"","MOQ":null,"CosteTransporte":20,"LeadTime":null,"Dossier":null,"FormaArt":null,"FormaEmb":null,"Nivel":null},"FormaEmb":[{"idFormaEmb":93,"nNivel":3,"RefNavision":"0057415","Nombre":"PALLET EUROPEO DE 80X120","NumArtsEmbalaje":null,"LongitudTotal":null,"AnchuraTotal":null,"CalidadEmbalaje":"-1","CalidadImpresion":"-1","NCompsPorPaletArtTerminado":null,"CosteCompEmb":null,"PALTipoPalet":"0057415","PALCantidadPaletEnPiezas":"684","PALEmbalajePaletizadoDefinida":null,"PALPapelPlanchaEntrePisos":"1","PALCantPapelPlanchaEntrePisos":null,"PALPlanchaCartonEnBaseYSuperior":1,"PALPlasticoEnBase":true,"PALModoCompactarPalet":"V02","PALNumCompsEmbalado":null,"NivelPaletizado":true,"TipoEmbalaje":"-1","CalidadMaterial":null,"Observaciones":null,"CalidadEmbalajeTexto":null,"Dossier":null,"Solucion":null,"Nivel":null}]}]}];

            var usuario = {
                id : 1,
                nombre : 'Maikel',
                apellidos : 'Merillas Granado',
                telefono : '619987273',
                email : 'jmmerillas@ipartek.com',
                usuario : 'mg01',
                paswword : 'hsjdfuienc%&/',
                administrador : 'false',
                activo : true
            };

            var Utils = {
                HtmlHelpers : {
                     toTable : function(obj, options){
                        var comodinClave = "$clave$";
                        var comodinValor = "$valor$";
                        var tmplFila = "<tr><td>$clave$</td><td>$valor$</td></tr>";
                        var filas = "";
                        var strTitulo = "";

                        if( options.titulo )
                            strTitulo = "<caption class='"+ options.clase +"'>"+  options.titulo  +"</caption>";
                        else
                            strTitulo = "<caption class='"+ options.clase +"'>  SIN TITULO  </caption>";

                        for(var clave in obj)
                        {
                            if(obj[clave] == null || obj[clave] == -1)
                                obj[clave] = "";

                            if(typeof obj[clave] !== "object")
                                filas = filas + tmplFila.replace(comodinClave, clave).replace(comodinValor, obj[clave]);
                        }

                        return "<div class='toTable " + ((options.nivel)? "nivel" + options.nivel : "")  + "'><table cellspacing='0' cellpadding='0'>" + strTitulo + "<thead><tr><th>PROPIEDAD</th><th>VALOR</th></tr></thead><tbody>" + filas + "</tbody></table></div>";
                    }
                }
            };
            var ObjectInspector = function($contenedor, registro, options){

                this.$contenedor = $contenedor;
                this.$table = undefined;
                this.registro = registro;
                this.options = options;

                return this;
            };
            ObjectInspector.prototype = {
                toTable : function(){
                    return Utils.HtmlHelpers.toTable(this.registro, this.options );
                },
                toggleTable : function (event){
                    var caption = $(event.currentTarget);
                    caption.parent().find('thead').toggle();
                    caption.parent().find('tbody').toggle();
                },
                render : function(){
                    this.$table = $(this.toTable());
                    this.$contenedor.append(this.$table);

                    if(this.options.colapsable)
                    {
                        this.$table.find('caption').on('click' , this.toggleTable);
                        this.$table.find('caption').trigger('click');
                    }
                }
            }

        </script>

	</head>
	<body>
        <div class="ui-layout-center">
            <div id="vistaCompletaDossier">
                <h3>Vista Completa</h3>
                <br/>
                <div id="dossier" class="floatLeft"></div>
                <div id="contenido" class="floatLeft"></div>
            </div>
    </div>

        <script type="text/javascript" src='../js/libs/jquery-1.7.1.min.js'></script>
		<script type="text/javascript" src='../js/libs/jquery-ui-1.8.18.custom.min.js'></script>
		<script type="text/javascript" src="../js/libs/jquery.layout.min.js"></script>
		<script type="text/javascript" src="../js/libs/jquery.tmpl.min.js"></script>
		<script type="text/javascript" src="../js/libs/underscore-min.js"></script>

		<script type="text/javascript" src="../js/base/Utils.js"></script>
		<script type="text/javascript" src="../js/base/framework.base.js"></script>
        <script type="text/javascript" src="../js/base/framework.project.js"></script>
        <script type="text/javascript" src="../js/controles/ipkRemoteDataSource.js"></script>
        <script type="text/javascript" src="../js/controles/ipkRemoteInfraestructura.js"></script>
        <script type="text/javascript" src="../js/clases/DataSource.js"></script>
        <script type="text/javascript" src="../js/vistas/VistaCompletaDossier.js"></script>

        <script type="text/javascript">

            var page = undefined;
            $(document).ready(function(){
                var $dossierHolder = $('#dossier');
                var $contenido = $('#contenido');
                var saltoLinea = $('<br>');

                var objInspector = new ObjectInspector($dossierHolder, str, { titulo : 'DOSIER' , clase: 'colEmerland' });
                objInspector.render();

                 $dossierHolder.append( saltoLinea );
                 for(var i = 0; i < soluciones.length; i++)
                 {
                     new ObjectInspector($contenido, soluciones[i], { titulo : 'SOLUCION' , clase: 'colPeterRiver', colapsable: true}).render();

                     $contenido.append( saltoLinea );
                     for(var j = 0; j < soluciones[i].FormaArt.length; j++)
                         new ObjectInspector($contenido, soluciones[i].FormaArt[j], { titulo : 'ARTICULO' , clase: 'colCarrot', colapsable: true, nivel : 1}).render();

                     $dossierHolder.append( saltoLinea );
                     for(var k = 0; k < soluciones[i].Nivel.length; k++)
                     {
                         new ObjectInspector($contenido, soluciones[i].Nivel[k], { titulo : 'NIVEL' , clase: 'colAmethyst', colapsable: true, nivel : 2}).render();

                        $dossierHolder.append( saltoLinea );
                         for(var l = 0; l < soluciones[i].Nivel[k].FormaEmb.length; l++)
                             new ObjectInspector($contenido, soluciones[i].Nivel[k].FormaEmb[l], { titulo : 'EMBALAJE' , clase: 'colAlizarin', colapsable: true, nivel : 3}).render();
                     }
                 }




                
                /*
                    var saltoLinea = $('<br>');
                    $dossierHolder.append( toTable(str , "Dossier" ) );

                    $dossierHolder.append( saltoLinea );
                    for(var i = 0; i < str.Solucion.length; i++)
                        $dossierHolder.append( toTable(str.Solucion[i] , "Soluciones" ) );

                    $dossierHolder.append( saltoLinea );
                    for(var j = 0; j < str.FormaArt.length; j++)
                        $dossierHolder.append( toTable(str.FormaArt[j] , "Formas" ) );

                    $dossierHolder.append( saltoLinea );
                    for(var k = 0; k < str.FormaEmb.length; k++)
                        $dossierHolder.append( toTable(str.FormaEmb[k] , "Embalajes" ) );

                    $dossierHolder.append( saltoLinea );

                    for(var l = 0; l < str.WorkflowEstados.length; l++)
                        $dossierHolder.append( toTable(str.WorkflowEstados[l] , "Workflow Estados" ) );

                    $dossierHolder.append( saltoLinea );
                    */
                //$('body').delegate('.toTable caption', 'click' , toggleTable);
            });

        </script>

	</body>
</html>




