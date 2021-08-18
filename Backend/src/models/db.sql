
CREATE DATABASE mysqldb;
USE mysqldb;
DESCRIBE users;

CREATE TABLE IF NOT EXISTS Examen(
    id_examen INT AUTO_INCREMENT,
    nombre VARCHAR(30) NOT NULL,
    cant_preguntas INT NOT NULL,
    PRIMARY KEY(id_examen)
);

CREATE TABLE IF NOT EXISTS Preguntas(
    id_pregunta INT AUTO_INCREMENT,
    id_examen INT NOT NULL,
    descripcion VARCHAR(50) NOT NULL,
    respuesta1 VARCHAR(50) NOT NULL,
    band_r1 BOOLEAN NOT NULL,
    respuesta2 VARCHAR(50) NOT NULL,
    band_r2 BOOLEAN NOT NULL,
    respuesta3 VARCHAR(50) NOT NULL,
    band_r3 BOOLEAN NOT NULL,
    PRIMARY KEY(id_pregunta),
    FOREIGN KEY(id_examen) REFERENCES Examen(id_examen)
);



SELECT * FROM Examen;
