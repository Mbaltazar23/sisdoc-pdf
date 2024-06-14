<div id="formularioEdicion" style="display: none;">
        <form id="formEdicion">
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="modalFecha">Fecha</label>
                    <input type="date" class="form-control" id="modalFecha" name="fecha" readonly>
                </div>
                <div class="form-group col-md-6">
                    <label for="modalResolucion">Resolución</label>
                    <input type="text" class="form-control" id="modalResolucion" name="resolucion" readonly>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="modalNombre">Nombre</label>
                    <input type="text" class="form-control" id="modalNombre" name="nombre" readonly>
                </div>
                <div class="form-group col-md-6">
                    <label for="modalDireccion">Dirección</label>
                    <input type="text" class="form-control" id="modalDireccion" name="direccion" readonly>
                </div>
            </div>
            <div class="form-group">
                <label for="modalDetalles">Detalles</label>
                <textarea class="form-control" id="modalDetalles" name="detalles"></textarea>
            </div>
            <button type="button" class="btn btn-secondary" onclick="cerrarFormulario()">Volver al Inicio</button>
            <button type="submit" form="formEdicion" class="btn btn-primary" id="generateWordBtn" >Generar Word</button>
            <button type="button" id="previsualizarPdfBtn" class="btn btn-info" style="display: none;">Previsualizar PDF</button>
        </form>
    </div>
</div>