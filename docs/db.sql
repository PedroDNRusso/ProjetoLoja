CREATE DATABASE loja;
USE loja;

CREATE TABLE CD(
    cd_id INTEGER PRIMARY KEY AUTO_INCREMENT,
    capa LONGBLOB NOT NULL,
    nome VARCHAR(255) NOT NULL,
    lancamento DATE NOT NULL,
    valor VARCHAR NOT NULL
);

CREATE TABLE DISCOS(
    discos_id INTEGER PRIMARY KEY AUTO_INCREMENT,
    capa LONGBLOB NOT NULL,
    nome VARCHAR(255) NOT NULL,
    lancamento DATE NOT NULL,
    valor VARCHAR NOT NULL
);