const parser = require('./Gramaticas/Gramatica.js')
const entorno = require('./dist/Ambitos/Entorno').Entorno;
const fs = require("fs"),
NOMBRE_ARCHIVO = "C://Users//Daniel Chicas//Desktop//funciones.txt";
fs.readFile(NOMBRE_ARCHIVO, 'utf8', (error, datos) => {
    if (error) throw error;
    try {
        const env = new entorno(null, "Global")
        const ast = parser.parse(datos);
        for (const actual of ast) {
            if(actual.length > 0){
                for (const actual2 of actual) {
                    actual2.execute(env);
                }
            }else{
                actual.execute(env);
            }
        }
        console.log("fin")
    } catch (error) {
        console.log(error)
    }
});