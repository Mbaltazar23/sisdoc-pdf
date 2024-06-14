CREATE DATABASE bd_sis;
USE bd_sis;

CREATE TABLE tabla (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fecha DATE NOT NULL,
    resolucion VARCHAR(255) NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    direccion VARCHAR(255) NOT NULL
);
