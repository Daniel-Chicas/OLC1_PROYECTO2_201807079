const parser = require('./Gramaticas/Gramatica.js')
const entorno = require('./dist/Ambitos/Entorno').Entorno;
const simbolos = require('./dist/Reportes/TablaSimbolos').TablaSimbolos;
const Metodos = require('./dist/Instrucciones/Metodos').Metodos;
const fs = require("fs"),
NOMBRE_ARCHIVO = "C://Users//Daniel Chicas//Desktop//funciones.txt";
const parserAst = require('./Ast/ast')
const Recorrido_Arbol = require('./dist/Instrucciones/nodoArbol').Recorrido_Arbol

var r_toRadians;
var r_sine;
function toRadians(angle) {
    r_toRadians = angle * 3.141592653589793 / 180;
}

function sine(x) {
    var sin = 0.0;
    var fact;
    var i = 1;
    while (i <= 10) {
        fact = 1;
        var j = 1;
        while (j <= 2 * i - 1) {
            fact = fact * j;
            j = j + 1;
        }
        sin = sin + ((x^(2*i-1)) / fact);
        i = i + 1;
    }
    r_sine = sin;
}


function drawTree(x1, y1, angle, depth){
    if (depth != 0) {
        toRadians(angle);
        sine(3.141592653589793 / 2 + r_toRadians);
        var x2 = x1 + (r_sine * depth * 10.0);
        toRadians(angle);
        sine(r_toRadians);
        var y2 = y1 + (r_sine * depth * 10.0);
        console.log(x1 + " " + y1 + " " + x2 + " " + y2 + "");
        drawTree(x2, y2, angle - 20, depth - 1);
        drawTree(x2, y2, angle + 20, depth - 1);
    }
}


function Principal() {
    console.log("===============¿SI SALE?=================");
    drawTree(250.0, 500.0, -90.0, 4);
    console.log("================ FIN ====================");
}

var x = Principal();




fs.readFile(NOMBRE_ARCHIVO, 'utf8', (error, datos) => {
    if (error) throw error;
    const ast = parser.parse(datos);
    const env = new entorno(null, "Global")
    const tablaSimbolos = new simbolos("", null)

    try {
        for (const actual of ast) {
            if(actual.length > 0){
                for (const actual2 of actual) {
                    if(actual2 instanceof Metodos){
                        actual2.execute(env, tablaSimbolos)
                    }
                }
            }else{
                if(actual instanceof Metodos){
                    actual.execute(env, tablaSimbolos)
                }
            }
        }
    } catch (error) {
        console.log(error)
    }


    try {
        for (const actual of ast) {
            if(actual.length > 0){
                for (const actual2 of actual) {
                    if(actual2 instanceof Metodos){
                        continue
                    }
                    var retorno = actual2.execute(env, tablaSimbolos);
                    if(retorno != null || retorno != undefined){
                        const error = require('./dist/Error/Error').Error_;
                        throw new error(retorno.line, retorno.column, "Semántico", "No se puede colocar return/break/continue fuera de un ciclo o función o método.")
                    }
                }
            }else{
                if(actual instanceof Metodos){
                    continue
                }
                var retorno =  actual.execute(env, tablaSimbolos);
                if(retorno != null || retorno != undefined){
                    const error = require('./dist/Error/Error').Error_;
                    throw new error(retorno.line, retorno.column, "Semántico", "No se puede colocar return/break/continue fuera de un ciclo o función o método.")
                }
            }
        }
        console.log("fin")
    } catch (error) {
        console.log(error)
    }
});

/*
    PARA DIBUJAR EL ÁRBOL AST:
                var raiz = new Recorrido_Arbol();
                var arbolast = parserAst.parse(datos)
                console.log(raiz.recorrer_arbolito3(arbolast, 1));
*/

/*
    HACER LA TABLA DE SÍMBOLOS
                var tablaS = tablaSimbolos.grafica(tablaSimbolos);
                const archivo = './Reportes/DataReportes/tablaSimbolos.html'
                if(fs.existsSync(archivo)){
                    fs.writeFileSync(archivo, tablaS, (err)=>console.log("hubo un error al crearel archivo."))
                }else{
                    fs.appendFileSync(archivo, tablaS, (err)=>console.log("hubo un error al crearel archivo."))
                }
*/