function agregarFila() {
    if (!hayFilasSinGuardar()) {
        var table = document.getElementById("tabla");
        var row = table.insertRow(-1);
        var nroCell = row.insertCell(0);
        var fechaCell = row.insertCell(1);
        var resolucionCell = row.insertCell(2);
        var nombreCell = row.insertCell(3);
        var direccionCell = row.insertCell(4);
        var accionesCell = row.insertCell(5);

        nroCell.innerHTML = '#';
        fechaCell.innerHTML = '<input type="date" name="fecha[]">';
        resolucionCell.innerHTML = '<input type="text" name="resolucion[]">';
        nombreCell.innerHTML = '<input type="text" name="nombre[]">';
        direccionCell.innerHTML = '<input type="text" name="direccion[]">';
        accionesCell.innerHTML = '<button class="btn btn-primary" onclick="editarFila(this)" disabled><i class="fas fa-pencil-alt"></i></button>&nbsp;&nbsp;<button class="btn btn-secondary" onclick="eliminarFilaTemporal(this)"><i class="far fa-trash-alt"></i></button>';

        document.getElementById("addContentButton").disabled = false;
    } else {
        swal("Error", "Guarda el contenido de la fila actual antes de agregar una nueva.", "warning");
    }
}

function eliminarFilaTemporal(button) {
    swal({
        title: "Eliminar Fila a insertar",
        text: "¿Estás seguro de que deseas eliminar esta fila?",
        icon: "warning",
        dangerMode: true,
        buttons: true
    }).then((isClosed) => {
        if (isClosed) {
            var row = button.parentNode.parentNode;
            row.remove();
            document.getElementById("addContentButton").disabled = true;
            swal("Eliminado !!", "La fila ha sido eliminada.", "success");
        }
    });
}

function hayFilasSinGuardar() {
    var rows = document.querySelectorAll('#tabla tbody tr');
    var haySinGuardar = false;
    rows.forEach(function (row) {
        var cells = row.getElementsByTagName('td');
        if (cells[0].innerText === '#') {
            haySinGuardar = true;
        }
    });
    return haySinGuardar;
}

function agregarContenido() {
    var rows = document.querySelectorAll('#tabla tbody tr');
    var errorFound = false;

    rows.forEach(function (row) {
        var cells = row.getElementsByTagName('td');
        if (cells[0].innerText === '#') {
            var fecha = cells[1].getElementsByTagName('input')[0].value;
            var resolucion = cells[2].getElementsByTagName('input')[0].value;
            var nombre = cells[3].getElementsByTagName('input')[0].value;
            var direccion = cells[4].getElementsByTagName('input')[0].value;

            var errorMsg = "";
            if (fecha === "") errorMsg += "Fecha es requerida.\n";
            if (resolucion === "") errorMsg += "Resolución es requerida.\n";
            if (nombre === "") errorMsg += "Nombre es requerido.\n";
            if (direccion === "") errorMsg += "Dirección es requerida.\n";

            if (errorMsg !== "") {
                swal("Error", errorMsg, "error");
                errorFound = true;
                return;
            }

            var data = {
                fecha: fecha,
                resolucion: resolucion,
                nombre: nombre,
                direccion: direccion
            };

            var xhr = new XMLHttpRequest();
            xhr.open("POST", "php/guardar.php", true);
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    var respuesta = JSON.parse(xhr.responseText);
                    cells[0].innerHTML = respuesta.id;
                    cells[1].innerHTML = fecha.split('-').reverse().join('-');
                    cells[2].innerHTML = resolucion;
                    cells[3].innerHTML = nombre;
                    cells[4].innerHTML = direccion;
                    cells[5].innerHTML = '<button class="btn btn-primary" onclick="editarFila(this)"><i class="fas fa-pencil-alt"></i></button>&nbsp;&nbsp;<button class="btn btn-danger" onclick="eliminarFila(this)"><i class="far fa-trash-alt"></i></button>';

                    document.getElementById("addRowButton").disabled = false; // Habilitar el botón para agregar otra fila
                    swal("Exito !!", "Fila Insertada Exitosamente !!", "success")
                }
            };
            xhr.send(JSON.stringify(data));
        }
    });

    if (!errorFound) {
        document.getElementById("addContentButton").disabled = true;
    }
}

function editarFila(button) {
    var row = button.parentNode.parentNode;
    var cells = row.getElementsByTagName('td');
    button.innerHTML = '<i class="fas fa-save"></i>';
    button.setAttribute('onclick', 'guardarFila(this)');
    var fecha = cells[1].innerText.split('-').reverse().join('-');
    cells[1].innerHTML = '<input type="date" value="' + fecha + '">';
    cells[2].innerHTML = '<input type="text" value="' + cells[2].innerText + '">';
    cells[3].innerHTML = '<input type="text" value="' + cells[3].innerText + '">';
    cells[4].innerHTML = '<input type="text" value="' + cells[4].innerText + '">';

    // Desactivar el botón de eliminar
    var deleteButton = row.querySelector('.btn-danger');
    if (deleteButton) {
        deleteButton.disabled = true;
    }
}

function guardarFila(button) {
    var row = button.parentNode.parentNode;
    var cells = row.getElementsByTagName('td');
    var fecha = cells[1].getElementsByTagName('input')[0].value;
    var fecha_formateada = fecha.split('-').reverse().join('-');

    var data = {
        id: row.getAttribute("data-id"),
        fecha: fecha,
        resolucion: cells[2].getElementsByTagName("input")[0].value,
        nombre: cells[3].getElementsByTagName("input")[0].value,
        direccion: cells[4].getElementsByTagName("input")[0].value
    };

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "php/guardar.php", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            cells[1].innerHTML = fecha_formateada;
            cells[2].innerHTML = data.resolucion;
            cells[3].innerHTML = data.nombre;
            cells[4].innerHTML = data.direccion;
            button.innerHTML = '<i class="fas fa-pencil-alt"></i>';
            button.setAttribute('onclick', 'editarFila(this)');

            // Habilitar el botón para agregar otra fila
            var deleteButton = row.querySelector('.btn-danger');
            if (deleteButton) {
                deleteButton.disabled = false;
            }
            swal("Guardado", "La Fila ha sido actualizada correctamente.", "success");
        }
    };
    xhr.send(JSON.stringify(data));
}

function eliminarFila(button) {
    swal({
        title: "Confirmar eliminación",
        text: "¿Estás seguro de que deseas eliminar esta fila?",
        icon: "warning",
        dangerMode: true,
        buttons: true
    }).then((isClosed) => {
        if (isClosed) {
            var row = button.parentNode.parentNode;
            var data = {
                id: row.getAttribute("data-id")
            };

            var xhr = new XMLHttpRequest();
            xhr.open("POST", "php/eliminar.php", true);
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    row.remove();
                    document.getElementById("addRowButton").disabled = false; // Habilitar el botón para agregar otra fila
                    swal("Eliminado", "La fila ha sido eliminada.", "success");
                }
            };
            xhr.send(JSON.stringify(data));
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {
    var generateWordBtn = document.getElementById('generateWordBtn');

    generateWordBtn.addEventListener('click', function () {
        swal({
            title: "Confirmar generación",
            text: "¿Desea generar el documento?",
            icon: "info",
            dangerMode: false,
            buttons: true
        }).then((isClosed) => {
            if (isClosed) {
                generateWordBtn.disabled = true; // Deshabilitar el botón mientras se procesa
                var form = document.getElementById('formEdicion');
                var formData = new FormData(form);
                fetch('php/generar_word.php', {
                        method: 'POST',
                        body: formData
                    })
                    .then(response => response.json())
                    .then(data => {
                        var fileName = localStorage.getItem('generatedFileName');
                        if (data.fileName) {
                            if (fileName) {
                                swal({
                                    title: "Archivo existente",
                                    text: "Ya existe un archivo generado. ¿Desea sobrescribirlo?",
                                    icon: "warning",
                                    dangerMode: false,
                                    buttons: true
                                }).then((isClosed) => {
                                    if (isClosed) {
                                        swal("Sobrescrito", "El documento ha sido sobrescrito.", "success");
                                        var downloadLink = document.createElement('a');
                                        downloadLink.href = 'doc/word/' + data.fileName;
                                        downloadLink.download = data.fileName;
                                        downloadLink.click();
                                        document.getElementById('previsualizarPdfBtn').style.display = 'inline-block';
                                        localStorage.setItem('generatedFileName', data.fileName);
                                    }
                                });
                            } else {
                                swal("Generado", "El documento ha sido generado.", "success");
                                var downloadLink = document.createElement('a');
                                downloadLink.href = 'doc/word/' + data.fileName;
                                downloadLink.download = data.fileName;
                                downloadLink.click();
                                document.getElementById('previsualizarPdfBtn').style.display = 'inline-block';
                                localStorage.setItem('generatedFileName', data.fileName);
                            }
                        } else {
                            console.error('No se encontró un nombre de archivo generado en la respuesta del servidor.');
                        }
                        generateWordBtn.disabled = false;
                    })
                    .catch(error => {
                        console.error('Error:', error);
                        generateWordBtn.disabled = false;
                    });
            }
        });
    });

    document.getElementById('previsualizarPdfBtn').addEventListener('click', function () {
        var fileName = localStorage.getItem('generatedFileName');
        if (fileName) {
            var formData = new FormData();
            formData.append('fileName', fileName);

            fetch('php/convertir_word_pdf.php', {
                    method: 'POST',
                    body: formData
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        var pdfViewer = document.getElementById('pdfViewer');
                        pdfViewer.src = 'doc/pdf/' + data.fileName;
                        $('#modalPdf').modal('show');
                    } else {
                        swal('Error al convertir el archivo Word a PDF:', data.error, "error");
                    }
                })
                .catch(error => {
                    swal('Error al convertir el archivo Word a PDF:', error, "error");
                });
        }
    });
});

function abrirFormulario(fecha, resolucion, nombre, direccion) {

    // Cambiar el título cuando se abre el formulario y se cambia de pagina
    document.title = 'Generar documento Word insertado';
    document.querySelector(".titleWeb").textContent = "Generar Documentacion Word y PDF";

    document.getElementById('modalFecha').value = fecha;
    document.getElementById('modalResolucion').value = resolucion;
    document.getElementById('modalNombre').value = nombre;
    document.getElementById('modalDireccion').value = direccion;
    document.getElementById('modalDetalles').value = '';

    document.getElementById('form-table').style.display = 'none';
    document.getElementById('formularioEdicion').style.display = 'block';

    var fileName = localStorage.getItem('generatedFileName');
    if (fileName) {
        document.getElementById('previsualizarPdfBtn').style.display = 'inline-block';
    } else {
        document.getElementById('previsualizarPdfBtn').style.display = 'none';
    }
}

function cerrarFormulario() {
    var fileName = localStorage.getItem('generatedFileName');

    if (fileName) {
        swal({
            title: "Confirmar cierre",
            text: "Si cierras el formulario, perderás los documentos generados. ¿Deseas continuar?",
            icon: "warning",
            dangerMode: false,
            buttons: true
        }).then((isClosed) => {
            if (isClosed) {
                document.getElementById('form-table').style.display = 'block';
                document.getElementById('formularioEdicion').style.display = 'none';
                var fileName = localStorage.getItem('generatedFileName');
                if (fileName) {
                    eliminarWord(fileName);
                    localStorage.removeItem('generatedFileName');
                    document.getElementById('previsualizarPdfBtn').style.display = 'none';
                    swal("Cerrado", "El formulario ha sido cerrado y los documentos generados han sido eliminados.", "success");
                }
            }
        });
    } else {
        // Si no hay documento generado, simplemente ocultar el formulario
        document.getElementById('form-table').style.display = 'block';
        document.getElementById('formularioEdicion').style.display = 'none';
        document.title = 'Sistema de Gestión de Documentos';
        document.querySelector(".titleWeb").textContent = "Sistema de Generacion Word y convertir a PDF";
    }
}

function eliminarWord(fileName) {
    var formData = new FormData();
    formData.append('fileName', fileName);

    fetch('php/eliminar_docs.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                localStorage.removeItem('generatedFileName');
                document.getElementById('previsualizarPdfBtn').style.display = 'none';
            }
        })
        .catch(error => {
            swal('Error al eliminar el documento:', error, "error");
        });
}