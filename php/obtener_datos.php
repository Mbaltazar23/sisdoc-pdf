<?php
include 'conexion.php';

$sql = "SELECT id, fecha, resolucion, nombre, direccion FROM tabla";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $fecha_formateada = date("d-m-Y", strtotime($row['fecha']));
        echo "<tr data-id='{$row['id']}'>";
        echo "<td><a href='#' onclick='abrirFormulario(\"{$row['fecha']}\", \"{$row['resolucion']}\", \"{$row['nombre']}\", \"{$row['direccion']}\")' title='Ver datos'>{$row['id']}</a></td>";
        echo "<td>{$fecha_formateada}</td>";
        echo "<td>{$row['resolucion']}</td>";
        echo "<td>{$row['nombre']}</td>";
        echo "<td>{$row['direccion']}</td>";
        echo "<td>";
        echo "<button class='btn btn-primary' onclick='editarFila(this)'><i class='fas fa-pencil-alt'></i></button>&nbsp;&nbsp;";
        echo "<button class='btn btn-danger' onclick='eliminarFila(this)'><i class='far fa-trash-alt'></i></button>";
        echo "</td>";
        echo "</tr>";
    }
} else {
    echo "<tr><td colspan='6'>No hay datos disponibles</td></tr>";
}
$conn->close();
?>
