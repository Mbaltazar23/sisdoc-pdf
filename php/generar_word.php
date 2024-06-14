<?php
require '../vendor/autoload.php';

use PhpOffice\PhpWord\IOFactory;
use PhpOffice\PhpWord\PhpWord;

// Obtener datos del formulario (en este ejemplo se asume que los datos se envían mediante POST)
$fecha = isset($_POST['fecha']) ? $_POST['fecha'] : '';
$nombre = isset($_POST['nombre']) ? $_POST['nombre'] : '';
$direccion = isset($_POST['direccion']) ? $_POST['direccion'] : '';
$resolucion = isset($_POST['resolucion']) ? $_POST['resolucion'] : '';
$detalles = isset($_POST['detalles']) ? $_POST['detalles'] : '';

// Formatear la fecha
$fecha_formateada = '____ / ____ / _______';
if ($fecha) {
    $timestamp = strtotime($fecha);
    $dia = date('d', $timestamp);
    $mes = date('m', $timestamp);
    $año = date('Y', $timestamp);
    $fecha_formateada = "$dia / $mes / $año";
}

// Generar un nombre único para el archivo
$fileName = uniqid('documento_', true) . '.docx';
$outputPath = '../doc/word/' . $fileName;

// Crear un nuevo documento de Word
$phpWord = new PhpWord();
$section = $phpWord->addSection();

// Definir el estilo de texto en español
$spanishTextStyle = [
    'lang' => 'es-ES'
];

// Agregar el contenido al documento con las líneas y el formato específico
$section->addText("Acta de Resolución en fecha __ $fecha_formateada _____", $spanishTextStyle);
$section->addText("Nombre del Interesado _______ $nombre ___________________________", $spanishTextStyle);
$section->addText("Dirección ____________________ $direccion ________________________", $spanishTextStyle);
$section->addText("Contenido del escrito __________ $resolucion _____________________", $spanishTextStyle);
$section->addText("Detalles:", $spanishTextStyle);
$section->addText("_______________________ $detalles ________________________________", $spanishTextStyle);
$section->addText("__________________________________________________________________", $spanishTextStyle);

// Guardar el documento
$writer = IOFactory::createWriter($phpWord, 'Word2007');
$writer->save($outputPath);

// Enviar nombre del archivo generado al cliente
echo json_encode(['fileName' => $fileName]);

exit;
?>
