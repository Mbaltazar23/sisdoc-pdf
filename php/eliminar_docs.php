<?php
$directories = ['../doc/word/', '../doc/pdf/'];

foreach ($directories as $directory) {
    $files = glob($directory . '*'); // Obtener todos los archivos en el directorio

    foreach ($files as $file) { // Recorrer todos los archivos
        if (is_file($file)) { // Verificar si es un archivo
            unlink($file); // Eliminar el archivo
        }
    }
}

echo json_encode(['success' => true]);
?>
