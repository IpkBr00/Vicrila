<html lang="es">
	<head>
		<title>Vista Completa Dossier</title>

        <script type="text/javascript" src="../js/libs/json2.js"></script>
        <link rel='stylesheet' type='text/css' href='../css/ipkweb/jquery-ui-1.8.18.custom.css' />
        <link rel='stylesheet' type='text/css' href='../css/base.css' />
        <link rel='stylesheet' type='text/css' href='../css/estilos.css' />

	</head>
	<body>
        <div class="ui-layout-center">
            <div id="vistaCompletaDossier">
                <div id="dossier" class="floatLeft"></div>
                <div id="soluciones" class="floatLeft"></div>
                <div id="articulos" class="floatLeft"></div>
                <div id="embalajes" class="floatLeft"></div>
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
        <script type="text/javascript" src="../js/controles/ipkRemoteDataSourceNavision.js"></script>
        <script type="text/javascript" src="../js/clases/DataSource.js"></script>
        <script type="text/javascript" src="../js/base/ipkContexto.js"></script>
        <script type="text/javascript" src="../js/controles/ipkModelInspector.js"></script>
        <script type="text/javascript" src="../js/componentes/vistaCompleta.js"></script>
        <script type="text/javascript" src="VistaCompletaDossier/appDummyData.js"></script>


        <script type="text/javascript">
            var esquema = undefined;
            var vistaCompleta = undefined;

            $(document).ready(function(){
                esquema = new appEsquema(true);
                esquema.onLoad = function(){
                    vistaCompleta = new VistaDosierCompleta({
                        contenedor : $('#vistaCompletaDossier'),
                        dosier : str,
                        soluciones : soluciones
                    });
                };
            });

        </script>

	</body>
</html>




