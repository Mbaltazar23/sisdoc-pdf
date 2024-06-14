<?php
require '../vendor/autoload.php';

use PhpOffice\PhpWord\IOFactory;
use PhpOffice\PhpWord\Settings;

// Establecer la carpeta temporal para PhpWord
Settings::setTempDir('../doc/word');

// Obtener el nombre del archivo Word desde el formulario (en este ejemplo se asume que el nombre se envía mediante POST)
$wordFileName = isset($_POST['fileName']) ? $_POST['fileName'] : '';

if (!$wordFileName) {
    die(json_encode(['success' => false, 'error' => 'Nombre de archivo Word no especificado']));
}

$wordFilePath = '../doc/word/' . $wordFileName;
$pdfFilePath = '../doc/pdf/' . pathinfo($wordFileName, PATHINFO_FILENAME) . '.pdf';

// Verificar si el archivo Word existe
if (!file_exists($wordFilePath)) {
    die(json_encode(['success' => false, 'error' => 'Archivo Word no encontrado']));
}

// Configurar el renderizador PDF
$renderName = Settings::PDF_RENDERER_TCPDF;
$renderLibraryPath = '../vendor/tecnickcom/tcpdf'; // Asegúrate de que la ruta sea correcta

if (!Settings::setPdfRenderer($renderName, $renderLibraryPath)) {
    die("Proporcione la biblioteca de renderizado y la ruta");
}

// Convertir el documento Word a PDF
try {
    $contents = IOFactory::load($wordFilePath);
    $pdfWriter = IOFactory::createWriter($contents, 'PDF');
    $pdfWriter->save($pdfFilePath);
    
    // Enviar nombre del archivo PDF generado al cliente
    echo json_encode(['success' => true, 'fileName' => pathinfo($pdfFilePath, PATHINFO_BASENAME)]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'error' => 'Error al procesar el archivo Word: ' . $e->getMessage()]);
}

exit;
?>
