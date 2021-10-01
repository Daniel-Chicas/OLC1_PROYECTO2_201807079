const parser = require('./Gramaticas/Gramatica')


const fs = require("fs"),
NOMBRE_ARCHIVO = "C://Users//Daniel Chicas//Desktop//funciones.txt";

fs.readFile(NOMBRE_ARCHIVO, 'utf8', (error, datos) => {
    if (error) throw error;
    console.log(parser.parse(datos))
});