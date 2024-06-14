<?php
include 'conexion.php';


$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['id'])) {
    // Update existing record
    $id = $data['id'];
    $fecha = $data['fecha'];
    $resolucion = $data['resolucion'];
    $nombre = $data['nombre'];
    $direccion = $data['direccion'];

    $sql = "UPDATE tabla SET fecha='$fecha', resolucion='$resolucion', nombre='$nombre', direccion='$direccion' WHERE id=$id";
    if ($conn->query($sql) === TRUE) {
        echo "Registro actualizado correctamente";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
} else {
    // Insert new record
    $fecha = $data['fecha'];
    $resolucion = $data['resolucion'];
    $nombre = $data['nombre'];
    $direccion = $data['direccion'];

    $sql = "INSERT INTO tabla (fecha, resolucion, nombre, direccion) VALUES ('$fecha', '$resolucion', '$nombre', '$direccion')";
    if ($conn->query($sql) === TRUE) {
        echo "Registro insertado correctamente";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

$conn->close();
?>
