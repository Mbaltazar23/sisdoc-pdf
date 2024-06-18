<?php include 'templates/header.php';?>

<div class="container">
    <h2 class="mt-5 titleWeb">Sistema de Generacion Word y convertir a PDF</h2>
    <br>
    <div id="form-table">
       <div class="mb-3">
        <button class="btn btn-primary" onclick="agregarFila()">Agregar a la tabla</button>
        <button class="btn btn-secondary" id="addContentButton" onclick="agregarContenido()" disabled>Agregar contenido</button>
    </div>
    <table id="tabla" class="table table-bordered table-responsive-lg" style="width: 100%">
        <thead>
            <tr>
                <th>Nro (Generar Doc's)</th>
                <th>Fecha</th>
                <th>Resolución</th>
                <th>Nombre</th>
                <th>Dirección</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
        <?php include 'php/obtener_datos.php';?>
        </tbody>
    </table>
    </div>

    <?php include 'templates/form.php';?>
    <?php include 'templates/modal.php';?>
</div>

<?php include 'templates/footer.php';?>
