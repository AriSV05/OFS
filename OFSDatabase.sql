CREATE DATABASE OFS;
USE OFS;
CREATE TABLE ABOUT (
    id INT AUTO_INCREMENT PRIMARY KEY,
    integrantes JSON,
    universidad VARCHAR(255),
    escuela VARCHAR(255),
    asignatura VARCHAR(255),
    proyecto VARCHAR(255),
    ciclo VARCHAR(255)
);
INSERT INTO ABOUT (
        integrantes,
        universidad,
        escuela,
        asignatura,
        proyecto,
        ciclo
    )
VALUES (
        '["Nicole Araya", "Ariana Solano"]',
        'Universidad Nacional de Costa Rica (UNA)',
        'Escuela de Informática',
        'Paradigmas de programación',
        'Proyecto OneFlowStream',
        'II ciclo - 2023'
    );
CREATE TABLE scripts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    body TEXT
);
INSERT INTO scripts (name, body)
VALUES (
        '333',
        'console.log(Ciclo for:);for (let i = 1; i <= 5; i++) { console.log(i);}'
    ),
    (
        'RRRRR',
        'console.log(Ciclo while:);let j = 6;while (j <= 10) { console.log(j); j++;}'
    ),
    ('prueba2', 'break case \na b c\ntry\ntry\n'),
    ('return 0', 'return 0');
COMMIT;