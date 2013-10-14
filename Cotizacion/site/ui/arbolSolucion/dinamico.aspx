<!DOCTYPE html>
<html>
<head>
    <title>Componente de arbol soluci&oacute;n</title>
    <link rel="stylesheet" href="css/arbolSolucion.css">
</head>
<body>
<span>aasdasdasdasd</span>
    <h3> Arbol de la soluci&oacute;n </h3>
    <div id="contenedorArbol"></div>

    <script type="text/template" id="solucionTemplate">
        <div id="solucion-${idSolucion}" class='solucion'>
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
                        <span>Agregar Embalaje</span>
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
            <span>${Nombre}</span>
            <a href="#">
                <span class='fam cancel'>X</span>
            </a>
            <div class="clearFix"></div>
        </li>
    </script>
    <script type="text/template" id="nivelTemplate">
        <div id="nivel-${IdNivel}" class='nivel'>
            <div class="header">
                <span>Nivel ${NumNivel}</span>
                <a href="#">Agregar Componente</a>
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
                <span class='fam cancel'>X</span>
            </a>
        </li>
    </script>

    <script type="text/javascript" src='../../../js/libs/jquery-1.7.1.min.js'></script>
    <script type="text/javascript" src='../../../js/libs/jquery-ui-1.8.18.custom.min.js'></script>
    <script type="text/javascript" src="../../../js/libs/jquery.layout.min.js"></script>
    <script type="text/javascript" src="../../../js/libs/jquery.tmpl.min.js"></script>
    <script type="text/javascript" src="../../../js/libs/underscore-min.js"></script>
    <script type="text/javascript" src="../../../js/base/Utils.js"></script>
    <script type="text/javascript" src="../../../js/base/framework.base.js"></script>
    <script type="text/javascript" src="../../../js/base/framework.project.js"></script>
    <script type="text/javascript" src="../../../js/clases/DataSource.js"></script>

    <script type="text/javascript" src="../../../js/controles/form.CheckBox.js"></script>
    <script type="text/javascript" src="../../../js/controles/form.Hidden.js"></script>
    <script type="text/javascript" src="../../../js/controles/form.Textbox.js"></script>
    <script type="text/javascript" src="../../../js/controles/form.TextboxCalendario.js"></script>
    <script type="text/javascript" src="../../../js/controles/form.TextboxNumerico.js"></script>
    <script type="text/javascript" src="../../../js/controles/form.ComboNavision.js"></script>
    <script type="text/javascript" src="../../../js/controles/form.ComboInterno.js"></script>

    <script type="text/javascript" src="../../../js/controles/ipkRemoteDataSource.js"></script>
    <script type="text/javascript" src="../../../js/controles/ipkToolbar.js"></script>
    <script type="text/javascript" src="../../../js/controles/ipkLista.js"></script>
    <script type="text/javascript" src="../../../js/controles/ipkTabla.js"></script>
    <script type="text/javascript" src="../../../js/controles/ipkFicha.js"></script>
    <script type="text/javascript" src="../../../js/controles/ipkRemoteTabla.js"></script>
    <script type="text/javascript" src="../../../js/controles/ipkTablaEditable.js"></script>
    <script type="text/javascript" src="../../../js/controles/ipkTablaHijos.js"></script>
    <script type="text/javascript" src="../../../js/controles/ipkTablaRelacion.js"></script>
    <script type="text/javascript" src="../../../js/controles/ipkMostrarElegir.js"></script>
    <script type="text/javascript" src="../../../js/controles/ipkRemoteFicha.js"></script>
    <script type="text/javascript" src="../../../js/controles/ipkRemoteInfraestructura.js"></script>
    <script type="text/javascript" src="../../../js/controles/ipkRemoteDataSourceNavision.js"></script>
    <script type="text/javascript" src="../../../js/controles/ipkFactory.js"></script>

    <script type="text/javascript" src="../../../js/componentes/arbolEstructura.js"></script>
    <script type="text/javascript" src="../../../js/componentes/IpkComportamientos.js"></script>
    <script type="text/javascript" src="../../../js/componentes/workflowManager.js"></script>
    <script type="text/javascript" src="../../../js/componentes/hojaCotizacionCliente.js"></script>
    <script type="text/javascript" src="../../../js/componentes/hojaCotizacionComercial.js"></script>
    <script type="text/javascript" src="../../../js/componentes/visorHojasCotizacion.js"></script>
    <script type="text/javascript" src="../../../js/componentes/listadoAdjuntos.js"></script>


    <script type="text/javascript" src="js/arbolSolucion.js"></script>
    <script type="text/javascript">
        var listadoSoluciones = undefined;
        var solucion = { "idSolucion":91,"Descripcion":"Solucion 1","PrecioCotizacion":2100,"Estado":"Aceptada","MotivoEstado":"Aceptada","FechaEstado":"10/01/2013","CotizEmbEnExterior":2000,"DisponibilidadProducto":"05/12/2012","DisponibilidadElementos":"06/12/2012","CostoEmbEnDirecto":100,"MargenEnDirecto":0.95,"PrecioEnExterior":null,"MargenEnExterior":0.9,"NumPersNecesariasEmbVRAC":12,"EmbaladoEnExt":true,"LineasEmbalado":"12","NumPersNecesariasEmbDirecto":12,"CostoEmbEnExterior":200,"PrecioEnDirecto":null,"CifraDeNegocio":null,"Observaciones":null,"Dossier":{"IdDossier":62,"TipoDossier":"VA","FechaPeticion":"05/12/2012","FechaCreacion":"29/01/2013","FechaCierre":"05/12/2012","NumDemanda":null,"NumDossier":"VA0001","DescripcionArt":"Descripcion","Mercado":"2701","Marca":"V06","Nomenclatura":false,"CodCliente":"-1","NombreClteSolicitante":"AFIK ILAN EFRAIM LTD","PaísCliente":"AL","JefeProyecto":"Maikel","CantidadAFabricar":12,"Tranchas":12,"Tolerancia":"12%","Entregas":"12+","FechaDisponibilidadNecesaria":"","PrecioNetoNecesario":14,"UnidadMedidaVenta":12,"ModoDeEnvio":"Aereo","Incoterm":"CAMION","Destino":"Bilbao","Observaciones":"Observaciones","Estado":"EnEstudio","UltimoLanzamientoWorkflow":"01/02/2013 10:03:07","CantidadPrimeraFabricacion":1,"CantidadPrevistaAño":12,"FechaLimiteRespuesta":"01/01/2013","Comercial":"V006","TipoSoplado":"GIRADO","FormaArt":null,"FormaEmb":null,"Solucion":null,"WorkflowEstados":null},"FormaArt":[{"idFormaArt":24,"refNavision":null,"TipoForma":"SOPORTE","Nombre":"Gota de vidrio","ProcesoFabricacion":"V02","NumPlano":null,"PesoBruto":120,"PesoNeto":150,"TratamientoTermico":"ODN","FilograbadoMP":true,"TratamientoCaliente":true,"HACCP":false,"Etiqueta":false,"Calidad":"","DECODimensiones":null,"DECOPosicion":null,"DECONumColores":null,"DECOTipoDeco":"CERRADO","DECOTipoEsmalte":"CONPLOMO","DECOMuestraDisponible":false,"DECOTratamientoTermico":"-1","DECOFilograbadoDeco":false,"DECONumPases":null,"DECOCantEsmalte":null,"DECOCantOroPlata":null,"DECOMaquina":null,"DECOVelocidad":null,"DECORendimiento":null,"DECONumPersEnMaquina":null,"DECONumPersTotal":null,"DECONumPersTotalDecoVRAC":null,"DECONuevo":false,"PRODMaquina":"45","PRODVelocidad":89,"PRODRendimiento":789,"MOLDHorasMtoMoldes":120,"UTILLInversion":12,"UTILLDuracion":12,"UTILLPLazoDiasElementosADesarrollar":23,"NumArts":87,"Comentarios":"Cometarios del articulo","EsDecorado":false,"Observaciones":null,"refCuerpo":null,"refPie":null,"TipoCollares":null,"CantMinimaFabDia":1,"DECORendimientoArticulo":null,"TipoPrensa":null,"TipoSEVP":null,"Dossier":null,"Solucion":null},{"idFormaArt":25,"refNavision":null,"TipoForma":"SEMITERMINADO","Nombre":"Otra cosa","ProcesoFabricacion":"V01","NumPlano":null,"PesoBruto":null,"PesoNeto":null,"TratamientoTermico":"-1","FilograbadoMP":false,"TratamientoCaliente":false,"HACCP":false,"Etiqueta":false,"Calidad":"ES","DECODimensiones":null,"DECOPosicion":null,"DECONumColores":null,"DECOTipoDeco":"CERRADO","DECOTipoEsmalte":null,"DECOMuestraDisponible":false,"DECOTratamientoTermico":"-1","DECOFilograbadoDeco":false,"DECONumPases":null,"DECOCantEsmalte":null,"DECOCantOroPlata":null,"DECOMaquina":null,"DECOVelocidad":null,"DECORendimiento":null,"DECONumPersEnMaquina":null,"DECONumPersTotal":null,"DECONumPersTotalDecoVRAC":null,"DECONuevo":false,"PRODMaquina":null,"PRODVelocidad":null,"PRODRendimiento":null,"MOLDHorasMtoMoldes":null,"UTILLInversion":null,"UTILLDuracion":null,"UTILLPLazoDiasElementosADesarrollar":null,"NumArts":10,"Comentarios":null,"EsDecorado":false,"Observaciones":null,"refCuerpo":null,"refPie":null,"TipoCollares":null,"CantMinimaFabDia":null,"DECORendimientoArticulo":null,"TipoPrensa":null,"TipoSEVP":null,"Dossier":null,"Solucion":null}],"FormaEmb":[{"idFormaEmb":34,"nNivel":1,"RefNavision":null,"Nombre":"Embalaje N1","NumArtsEmbalaje":100,"LongitudTotal":1254,"AnchuraTotal":1200,"CalidadEmbalaje":"1","CalidadImpresion":"01","NCompsPorPaletArtTerminado":12,"CosteCompEmb":123,"PALTipoPalet":"-1","PALCantidadPaletEnPiezas":null,"PALEmbalajePaletizadoDefinida":null,"PALPapelPlanchaEntrePisos":null,"PALCantPapelPlanchaEntrePisos":null,"PALPlanchaCartonEnBaseYSuperior":null,"PALPlasticoEnBase":false,"PALModoCompactarPalet":"-1","PALNumCompsEmbalado":null,"NivelPaletizado":false,"TipoEmbalaje":"RB","NumPoses":null,"CalidadMaterial":null,"Observaciones":null,"CalidadEmbalajeTexto":null,"Dossier":null,"Solucion":null,"Nivel":null},{"idFormaEmb":35,"nNivel":3,"RefNavision":null,"Nombre":"Embalaje N3","NumArtsEmbalaje":1000,"LongitudTotal":5000,"AnchuraTotal":5000,"CalidadEmbalaje":"3","CalidadImpresion":"1U","NCompsPorPaletArtTerminado":123,"CosteCompEmb":1321,"PALTipoPalet":"E03","PALCantidadPaletEnPiezas":123,"PALEmbalajePaletizadoDefinida":"13","PALPapelPlanchaEntrePisos":"13","PALCantPapelPlanchaEntrePisos":13,"PALPlanchaCartonEnBaseYSuperior":121,"PALPlasticoEnBase":false,"PALModoCompactarPalet":"V03","PALNumCompsEmbalado":12,"NivelPaletizado":true,"TipoEmbalaje":null,"NumPoses":null,"CalidadMaterial":null,"Observaciones":null,"CalidadEmbalajeTexto":null,"Dossier":null,"Solucion":null,"Nivel":null},{"idFormaEmb":42,"nNivel":2,"RefNavision":null,"Nombre":"Embalaje 2","NumArtsEmbalaje":10,"LongitudTotal":150,"AnchuraTotal":150,"CalidadEmbalaje":"0","CalidadImpresion":"1N","NCompsPorPaletArtTerminado":105,"CosteCompEmb":120,"PALTipoPalet":"-1","PALCantidadPaletEnPiezas":null,"PALEmbalajePaletizadoDefinida":null,"PALPapelPlanchaEntrePisos":null,"PALCantPapelPlanchaEntrePisos":null,"PALPlanchaCartonEnBaseYSuperior":null,"PALPlasticoEnBase":false,"PALModoCompactarPalet":"-1","PALNumCompsEmbalado":null,"NivelPaletizado":false,"TipoEmbalaje":"A","NumPoses":null,"CalidadMaterial":null,"Observaciones":null,"CalidadEmbalajeTexto":null,"Dossier":null,"Solucion":null,"Nivel":null},{"idFormaEmb":47,"nNivel":2,"RefNavision":null,"Nombre":"Embalaje 21","NumArtsEmbalaje":null,"LongitudTotal":null,"AnchuraTotal":null,"CalidadEmbalaje":"2","CalidadImpresion":"1L","NCompsPorPaletArtTerminado":null,"CosteCompEmb":null,"PALTipoPalet":"-1","PALCantidadPaletEnPiezas":null,"PALEmbalajePaletizadoDefinida":null,"PALPapelPlanchaEntrePisos":null,"PALCantPapelPlanchaEntrePisos":null,"PALPlanchaCartonEnBaseYSuperior":null,"PALPlasticoEnBase":false,"PALModoCompactarPalet":"-1","PALNumCompsEmbalado":null,"NivelPaletizado":false,"TipoEmbalaje":"RB","NumPoses":null,"CalidadMaterial":null,"Observaciones":null,"CalidadEmbalajeTexto":null,"Dossier":null,"Solucion":null,"Nivel":null}],"Nivel":[{"IdNivel":1,"NumNivel":"1","NivelPaletizado":true,"RefNavision":null,"CalidadEmbalaje":null,"CalidadImpresion":null,"TipoEmbalaje":null,"NumEmbalajesNivelAnterior":null,"TipoPalet":null,"CantidadPaletEnPiezas":null,"ModoCompactarPalet":null,"EmbalajePaletizacionDefinida":null,"Solucion":null,"FormaEmb":null}]};
        var dossier =  { "IdDossier":62,"TipoDossier":"VA","FechaPeticion":"05/12/2012","FechaCreacion":"29/01/2013","FechaCierre":"05/12/2012","NumDemanda":null,"NumDossier":"VA0001","DescripcionArt":"Descripcion","Mercado":"2701","Marca":"V06","Nomenclatura":false,"CodCliente":"-1","NombreClteSolicitante":"AFIK ILAN EFRAIM LTD","PaísCliente":"AL","JefeProyecto":"Maikel","CantidadAFabricar":12,"Tranchas":12,"Tolerancia":"12%","Entregas":"12+","FechaDisponibilidadNecesaria":"","PrecioNetoNecesario":14,"UnidadMedidaVenta":12,"ModoDeEnvio":"Aereo","Incoterm":"CAMION","Destino":"Bilbao","Observaciones":"Observaciones","Estado":"EnEstudio","UltimoLanzamientoWorkflow":"01/02/2013 10:03:07","CantidadPrimeraFabricacion":1,"CantidadPrevistaAño":12,"FechaLimiteRespuesta":"01/01/2013","Comercial":"V006","TipoSoplado":"GIRADO","FormaArt":[{"idFormaArt":24,"refNavision":null,"TipoForma":"SOPORTE","Nombre":"Gota de vidrio","ProcesoFabricacion":"V02","NumPlano":null,"PesoBruto":120,"PesoNeto":150,"TratamientoTermico":"ODN","FilograbadoMP":true,"TratamientoCaliente":true,"HACCP":false,"Etiqueta":false,"Calidad":"","DECODimensiones":null,"DECOPosicion":null,"DECONumColores":null,"DECOTipoDeco":"CERRADO","DECOTipoEsmalte":"CONPLOMO","DECOMuestraDisponible":false,"DECOTratamientoTermico":"-1","DECOFilograbadoDeco":false,"DECONumPases":null,"DECOCantEsmalte":null,"DECOCantOroPlata":null,"DECOMaquina":null,"DECOVelocidad":null,"DECORendimiento":null,"DECONumPersEnMaquina":null,"DECONumPersTotal":null,"DECONumPersTotalDecoVRAC":null,"DECONuevo":false,"PRODMaquina":"45","PRODVelocidad":89,"PRODRendimiento":789,"MOLDHorasMtoMoldes":120,"UTILLInversion":12,"UTILLDuracion":12,"UTILLPLazoDiasElementosADesarrollar":23,"NumArts":87,"Comentarios":"Cometarios del articulo","EsDecorado":false,"Observaciones":null,"refCuerpo":null,"refPie":null,"TipoCollares":null,"CantMinimaFabDia":1,"DECORendimientoArticulo":null,"TipoPrensa":null,"TipoSEVP":null,"Dossier":null,"Solucion":null},{"idFormaArt":25,"refNavision":null,"TipoForma":"SEMITERMINADO","Nombre":"Otra cosa","ProcesoFabricacion":"V01","NumPlano":null,"PesoBruto":null,"PesoNeto":null,"TratamientoTermico":"-1","FilograbadoMP":false,"TratamientoCaliente":false,"HACCP":false,"Etiqueta":false,"Calidad":"ES","DECODimensiones":null,"DECOPosicion":null,"DECONumColores":null,"DECOTipoDeco":"CERRADO","DECOTipoEsmalte":null,"DECOMuestraDisponible":false,"DECOTratamientoTermico":"-1","DECOFilograbadoDeco":false,"DECONumPases":null,"DECOCantEsmalte":null,"DECOCantOroPlata":null,"DECOMaquina":null,"DECOVelocidad":null,"DECORendimiento":null,"DECONumPersEnMaquina":null,"DECONumPersTotal":null,"DECONumPersTotalDecoVRAC":null,"DECONuevo":false,"PRODMaquina":null,"PRODVelocidad":null,"PRODRendimiento":null,"MOLDHorasMtoMoldes":null,"UTILLInversion":null,"UTILLDuracion":null,"UTILLPLazoDiasElementosADesarrollar":null,"NumArts":10,"Comentarios":null,"EsDecorado":false,"Observaciones":null,"refCuerpo":null,"refPie":null,"TipoCollares":null,"CantMinimaFabDia":null,"DECORendimientoArticulo":null,"TipoPrensa":null,"TipoSEVP":null,"Dossier":null,"Solucion":null},{"idFormaArt":28,"refNavision":"MP00103P","TipoForma":"SOPORTE","Nombre":"C ILUSIÓN 25 \u0027R\u0027 AG","ProcesoFabricacion":"V02","NumPlano":null,"PesoBruto":130,"PesoNeto":132,"TratamientoTermico":"V04","FilograbadoMP":false,"TratamientoCaliente":false,"HACCP":false,"Etiqueta":false,"Calidad":"ES","DECODimensiones":null,"DECOPosicion":null,"DECONumColores":null,"DECOTipoDeco":"CERRADO","DECOTipoEsmalte":"CONPLOMO","DECOMuestraDisponible":false,"DECOTratamientoTermico":"OBN","DECOFilograbadoDeco":false,"DECONumPases":12,"DECOCantEsmalte":12,"DECOCantOroPlata":null,"DECOMaquina":null,"DECOVelocidad":null,"DECORendimiento":null,"DECONumPersEnMaquina":null,"DECONumPersTotal":12,"DECONumPersTotalDecoVRAC":12,"DECONuevo":false,"PRODMaquina":"12","PRODVelocidad":90,"PRODRendimiento":75,"MOLDHorasMtoMoldes":12,"UTILLInversion":12,"UTILLDuracion":12,"UTILLPLazoDiasElementosADesarrollar":null,"NumArts":12,"Comentarios":null,"EsDecorado":true,"Observaciones":null,"refCuerpo":null,"refPie":null,"TipoCollares":null,"CantMinimaFabDia":null,"DECORendimientoArticulo":12,"TipoPrensa":false,"TipoSEVP":true,"Dossier":null,"Solucion":null},{"idFormaArt":41,"refNavision":null,"TipoForma":"SOPORTE","Nombre":"Gota de vidrio","ProcesoFabricacion":"V02","NumPlano":null,"PesoBruto":120,"PesoNeto":150,"TratamientoTermico":"ODN","FilograbadoMP":true,"TratamientoCaliente":true,"HACCP":false,"Etiqueta":false,"Calidad":"AG","DECODimensiones":null,"DECOPosicion":null,"DECONumColores":null,"DECOTipoDeco":"CERRADO","DECOTipoEsmalte":null,"DECOMuestraDisponible":false,"DECOTratamientoTermico":"-1","DECOFilograbadoDeco":false,"DECONumPases":null,"DECOCantEsmalte":null,"DECOCantOroPlata":null,"DECOMaquina":null,"DECOVelocidad":null,"DECORendimiento":null,"DECONumPersEnMaquina":null,"DECONumPersTotal":null,"DECONumPersTotalDecoVRAC":null,"DECONuevo":false,"PRODMaquina":"45","PRODVelocidad":89,"PRODRendimiento":789,"MOLDHorasMtoMoldes":120,"UTILLInversion":12,"UTILLDuracion":12,"UTILLPLazoDiasElementosADesarrollar":23,"NumArts":87,"Comentarios":"Cometarios del articulo","EsDecorado":false,"Observaciones":null,"refCuerpo":null,"refPie":null,"TipoCollares":null,"CantMinimaFabDia":null,"DECORendimientoArticulo":null,"TipoPrensa":null,"TipoSEVP":null,"Dossier":null,"Solucion":null}],"FormaEmb":[{"idFormaEmb":34,"nNivel":1,"RefNavision":null,"Nombre":"Embalaje N1","NumArtsEmbalaje":100,"LongitudTotal":1254,"AnchuraTotal":1200,"CalidadEmbalaje":"1","CalidadImpresion":"01","NCompsPorPaletArtTerminado":12,"CosteCompEmb":123,"PALTipoPalet":"-1","PALCantidadPaletEnPiezas":null,"PALEmbalajePaletizadoDefinida":null,"PALPapelPlanchaEntrePisos":null,"PALCantPapelPlanchaEntrePisos":null,"PALPlanchaCartonEnBaseYSuperior":null,"PALPlasticoEnBase":false,"PALModoCompactarPalet":"-1","PALNumCompsEmbalado":null,"NivelPaletizado":false,"TipoEmbalaje":"RB","NumPoses":null,"CalidadMaterial":null,"Observaciones":null,"CalidadEmbalajeTexto":null,"Dossier":null,"Solucion":null,"Nivel":null},{"idFormaEmb":35,"nNivel":3,"RefNavision":null,"Nombre":"Embalaje N3","NumArtsEmbalaje":1000,"LongitudTotal":5000,"AnchuraTotal":5000,"CalidadEmbalaje":"3","CalidadImpresion":"1U","NCompsPorPaletArtTerminado":123,"CosteCompEmb":1321,"PALTipoPalet":"E03","PALCantidadPaletEnPiezas":123,"PALEmbalajePaletizadoDefinida":"13","PALPapelPlanchaEntrePisos":"13","PALCantPapelPlanchaEntrePisos":13,"PALPlanchaCartonEnBaseYSuperior":121,"PALPlasticoEnBase":false,"PALModoCompactarPalet":"V03","PALNumCompsEmbalado":12,"NivelPaletizado":true,"TipoEmbalaje":null,"NumPoses":null,"CalidadMaterial":null,"Observaciones":null,"CalidadEmbalajeTexto":null,"Dossier":null,"Solucion":null,"Nivel":null},{"idFormaEmb":42,"nNivel":2,"RefNavision":null,"Nombre":"Embalaje 2","NumArtsEmbalaje":10,"LongitudTotal":150,"AnchuraTotal":150,"CalidadEmbalaje":"0","CalidadImpresion":"1N","NCompsPorPaletArtTerminado":105,"CosteCompEmb":120,"PALTipoPalet":"-1","PALCantidadPaletEnPiezas":null,"PALEmbalajePaletizadoDefinida":null,"PALPapelPlanchaEntrePisos":null,"PALCantPapelPlanchaEntrePisos":null,"PALPlanchaCartonEnBaseYSuperior":null,"PALPlasticoEnBase":false,"PALModoCompactarPalet":"-1","PALNumCompsEmbalado":null,"NivelPaletizado":false,"TipoEmbalaje":"A","NumPoses":null,"CalidadMaterial":null,"Observaciones":null,"CalidadEmbalajeTexto":null,"Dossier":null,"Solucion":null,"Nivel":null},{"idFormaEmb":46,"nNivel":1,"RefNavision":null,"Nombre":"Embalaje 11","NumArtsEmbalaje":null,"LongitudTotal":null,"AnchuraTotal":null,"CalidadEmbalaje":"0","CalidadImpresion":"1N","NCompsPorPaletArtTerminado":120,"CosteCompEmb":null,"PALTipoPalet":"-1","PALCantidadPaletEnPiezas":null,"PALEmbalajePaletizadoDefinida":null,"PALPapelPlanchaEntrePisos":null,"PALCantPapelPlanchaEntrePisos":null,"PALPlanchaCartonEnBaseYSuperior":null,"PALPlasticoEnBase":false,"PALModoCompactarPalet":"-1","PALNumCompsEmbalado":null,"NivelPaletizado":false,"TipoEmbalaje":"RB","NumPoses":null,"CalidadMaterial":null,"Observaciones":null,"CalidadEmbalajeTexto":null,"Dossier":null,"Solucion":null,"Nivel":null},{"idFormaEmb":47,"nNivel":2,"RefNavision":null,"Nombre":"Embalaje 21","NumArtsEmbalaje":null,"LongitudTotal":null,"AnchuraTotal":null,"CalidadEmbalaje":"2","CalidadImpresion":"1L","NCompsPorPaletArtTerminado":null,"CosteCompEmb":null,"PALTipoPalet":"-1","PALCantidadPaletEnPiezas":null,"PALEmbalajePaletizadoDefinida":null,"PALPapelPlanchaEntrePisos":null,"PALCantPapelPlanchaEntrePisos":null,"PALPlanchaCartonEnBaseYSuperior":null,"PALPlasticoEnBase":false,"PALModoCompactarPalet":"-1","PALNumCompsEmbalado":null,"NivelPaletizado":false,"TipoEmbalaje":"RB","NumPoses":null,"CalidadMaterial":null,"Observaciones":null,"CalidadEmbalajeTexto":null,"Dossier":null,"Solucion":null,"Nivel":null}],"Solucion":[{"idSolucion":91,"Descripcion":"Solucion 1","PrecioCotizacion":2100,"Estado":"Aceptada","MotivoEstado":"Aceptada","FechaEstado":"10/01/2013","CotizEmbEnExterior":2000,"DisponibilidadProducto":"05/12/2012","DisponibilidadElementos":"06/12/2012","CostoEmbEnDirecto":100,"MargenEnDirecto":0.95,"PrecioEnExterior":null,"MargenEnExterior":0.9,"NumPersNecesariasEmbVRAC":12,"EmbaladoEnExt":true,"LineasEmbalado":"12","NumPersNecesariasEmbDirecto":12,"CostoEmbEnExterior":200,"PrecioEnDirecto":null,"CifraDeNegocio":null,"Observaciones":null,"Dossier":null,"FormaArt":null,"FormaEmb":null,"Nivel":null},{"idSolucion":97,"Descripcion":"Solucion de prueba","PrecioCotizacion":15000,"Estado":"Rechazada","MotivoEstado":"Rechazada","FechaEstado":"10/01/2013","CotizEmbEnExterior":123,"DisponibilidadProducto":"09/01/2013","DisponibilidadElementos":"10/01/2013","CostoEmbEnDirecto":1200,"MargenEnDirecto":0.92,"PrecioEnExterior":null,"MargenEnExterior":0.99,"NumPersNecesariasEmbVRAC":213,"EmbaladoEnExt":false,"LineasEmbalado":"1","NumPersNecesariasEmbDirecto":12,"CostoEmbEnExterior":120,"PrecioEnDirecto":null,"CifraDeNegocio":12333,"Observaciones":null,"Dossier":null,"FormaArt":null,"FormaEmb":null,"Nivel":null},{"idSolucion":98,"Descripcion":"Solcuion de prueba 2","PrecioCotizacion":1000,"Estado":"Rechazada","MotivoEstado":"Rechazada","FechaEstado":"10/01/2013","CotizEmbEnExterior":null,"DisponibilidadProducto":"09/01/2013","DisponibilidadElementos":"10/01/2013","CostoEmbEnDirecto":120,"MargenEnDirecto":0.88,"PrecioEnExterior":null,"MargenEnExterior":0.5,"NumPersNecesariasEmbVRAC":null,"EmbaladoEnExt":false,"LineasEmbalado":"12","NumPersNecesariasEmbDirecto":null,"CostoEmbEnExterior":500,"PrecioEnDirecto":null,"CifraDeNegocio":15000,"Observaciones":null,"Dossier":null,"FormaArt":null,"FormaEmb":null,"Nivel":null},{"idSolucion":99,"Descripcion":"Otra Solucion de prueba","PrecioCotizacion":1000,"Estado":"Rechazada","MotivoEstado":"Rechazada","FechaEstado":"10/01/2013","CotizEmbEnExterior":null,"DisponibilidadProducto":"","DisponibilidadElementos":"","CostoEmbEnDirecto":789,"MargenEnDirecto":0.21,"PrecioEnExterior":null,"MargenEnExterior":0.54,"NumPersNecesariasEmbVRAC":null,"EmbaladoEnExt":false,"LineasEmbalado":"12","NumPersNecesariasEmbDirecto":null,"CostoEmbEnExterior":456,"PrecioEnDirecto":null,"CifraDeNegocio":null,"Observaciones":null,"Dossier":null,"FormaArt":null,"FormaEmb":null,"Nivel":null},{"idSolucion":104,"Descripcion":"Prueba","PrecioCotizacion":null,"Estado":"EnEstudio","MotivoEstado":null,"FechaEstado":"18/01/2013","CotizEmbEnExterior":null,"DisponibilidadProducto":"","DisponibilidadElementos":"","CostoEmbEnDirecto":null,"MargenEnDirecto":12,"PrecioEnExterior":null,"MargenEnExterior":12,"NumPersNecesariasEmbVRAC":null,"EmbaladoEnExt":false,"LineasEmbalado":"4","NumPersNecesariasEmbDirecto":null,"CostoEmbEnExterior":null,"PrecioEnDirecto":null,"CifraDeNegocio":23,"Observaciones":null,"Dossier":null,"FormaArt":null,"FormaEmb":null,"Nivel":null}],"WorkflowEstados":[{"IdWorkflowEstate":65,"IdElemento":91,"TipoElemento":"Solucion","Descripcion":"Solucion 1","Produccion":"Completada","Moldes":"Completada","Dnp":"Pendiente","Programacion":"Pendiente","Analitica":"Pendiente","Comercial":"Pendiente","FechaProduccion":"31/01/2013 17:57:36","FechaMoldes":"01/02/2013 10:04:41","FechaDnp":"31/01/2013 17:54:09","FechaProgramacion":"","FechaAnalitica":"","FechaComercial":"","Dossier":null},{"IdWorkflowEstate":76,"IdElemento":24,"TipoElemento":"FormaArt","Descripcion":"Gota de vidrio","Produccion":"Pendiente","Moldes":"Pendiente","Dnp":"Pendiente","Programacion":"Pendiente","Analitica":"Pendiente","Comercial":"Pendiente","FechaProduccion":"","FechaMoldes":"","FechaDnp":"","FechaProgramacion":"","FechaAnalitica":"","FechaComercial":"","Dossier":null},{"IdWorkflowEstate":78,"IdElemento":25,"TipoElemento":"FormaArt","Descripcion":"kkkskksks","Produccion":"Pendiente","Moldes":"Pendiente","Dnp":"Pendiente","Programacion":"Pendiente","Analitica":"Pendiente","Comercial":"Pendiente","FechaProduccion":"","FechaMoldes":"","FechaDnp":"","FechaProgramacion":"","FechaAnalitica":"","FechaComercial":"","Dossier":null},{"IdWorkflowEstate":81,"IdElemento":97,"TipoElemento":"Solucion","Descripcion":"Solucion de prueba","Produccion":"Completada","Moldes":"Completada","Dnp":"Pendiente","Programacion":"Pendiente","Analitica":"Pendiente","Comercial":"Pendiente","FechaProduccion":"31/01/2013 17:57:37","FechaMoldes":"01/02/2013 10:04:42","FechaDnp":"","FechaProgramacion":"","FechaAnalitica":"","FechaComercial":"","Dossier":null},{"IdWorkflowEstate":82,"IdElemento":98,"TipoElemento":"Solucion","Descripcion":"Solcuion de prueba 2","Produccion":"Completada","Moldes":"Completada","Dnp":"Pendiente","Programacion":"Pendiente","Analitica":"Pendiente","Comercial":"Pendiente","FechaProduccion":"31/01/2013 17:57:38","FechaMoldes":"01/02/2013 10:04:44","FechaDnp":"31/01/2013 17:15:02","FechaProgramacion":"31/01/2013 17:15:01","FechaAnalitica":"","FechaComercial":"","Dossier":null},{"IdWorkflowEstate":83,"IdElemento":99,"TipoElemento":"Solucion","Descripcion":"Otra Solucion de prueba","Produccion":"Completada","Moldes":"Pendiente","Dnp":"Pendiente","Programacion":"Pendiente","Analitica":"Pendiente","Comercial":"Pendiente","FechaProduccion":"01/02/2013 9:35:11","FechaMoldes":"31/01/2013 17:15:04","FechaDnp":"31/01/2013 17:15:03","FechaProgramacion":"","FechaAnalitica":"","FechaComercial":"","Dossier":null},{"IdWorkflowEstate":84,"IdElemento":28,"TipoElemento":"FormaArt","Descripcion":"C ILUSIÓN 25 \u0027R\u0027 AG","Produccion":"Completada","Moldes":"Pendiente","Dnp":"Pendiente","Programacion":"Pendiente","Analitica":"Pendiente","Comercial":"Pendiente","FechaProduccion":"31/01/2013 17:57:51","FechaMoldes":"","FechaDnp":"","FechaProgramacion":"","FechaAnalitica":"","FechaComercial":"","Dossier":null},{"IdWorkflowEstate":95,"IdElemento":104,"TipoElemento":"Solucion","Descripcion":"Prueba","Produccion":"Completada","Moldes":"Pendiente","Dnp":"Pendiente","Programacion":"Pendiente","Analitica":"Pendiente","Comercial":"Pendiente","FechaProduccion":"01/02/2013 9:35:12","FechaMoldes":"","FechaDnp":"","FechaProgramacion":"","FechaAnalitica":"","FechaComercial":"","Dossier":null}]};

        $(document).ready(function(){
            var opcionesArbol = {
                contenedor : 'contenedorArbol',
                plantilla  : '#solucionTemplate'
            };
            listadoSoluciones = new arbolEstructura(opcionesArbol);
            listadoSoluciones.cargarDossier(dossier);
            listadoSoluciones.onEliminarFormaClick = function(eventArgs){
                console.log(eventArgs);
            };
            listadoSoluciones.onVerHojaCotizacionClick= function(eventArgs){
                console.log(eventArgs);
            };
            listadoSoluciones.onAgregarNivelClick= function(eventArgs){
                console.log(eventArgs);
            };
            listadoSoluciones.onAgregarFormaClick= function(eventArgs){
                console.log(eventArgs);
            };
            listadoSoluciones.onAceptarSolucionClick= function(eventArgs){
                console.log(eventArgs);
            };
            listadoSoluciones.onRechazarSolucionClick= function(eventArgs){
                console.log(eventArgs);
            };
            listadoSoluciones.onEliminarFormaClick= function(eventArgs){
                console.log(eventArgs);
            };
            listadoSoluciones.onEliminarComponenteClick= function(eventArgs){
                console.log(eventArgs);
            };
            listadoSoluciones.onEditarNivelClick= function(eventArgs){
                console.log(eventArgs);
            };
            listadoSoluciones.onEliminarNivelClick= function(eventArgs){
                console.log(eventArgs);
            };

        });
    </script>

</body>
</html>

