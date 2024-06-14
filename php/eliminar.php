<?php
include 'conexion.php';

$data = json_decode(file_get_contents('php://input'), true);
$id = $data['id'];

$sql = "DELETE FROM tabla WHERE id=$id";
if ($conn->query($sql) === true) {
    echo "Registro eliminado correctamente";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
