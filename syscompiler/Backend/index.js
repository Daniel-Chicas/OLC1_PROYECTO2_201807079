const parser = require('./Gramaticas/Gramatica.js')
const entorno = require('./dist/Ambitos/Entorno').Entorno;
const simbolos = require('./dist/Reportes/TablaSimbolos').TablaSimbolos;
const MetodosFunciones = require('./dist/Instrucciones/MetodosFunciones').MetodosFunciones;
const Funciones = require('./dist/Instrucciones/MetodosFunciones').Funciones;
const Impresiones = require('./dist/Instrucciones/Imprimir').Impresiones;
const parserAst = require('./Ast/ast')
const Recorrido_Arbol = require('./dist/Instrucciones/nodoArbol').Recorrido_Arbol
const os = require("os")
const express = require('express')
const app = express()
const cors = require('cors')
const fs = require("fs")

app.use(cors())

app.use(express.json())

const PORT = 5000
var entro = false

app.post("/ejecutar", async (req, res)=>{
    const {entrada} = req.body
    var respuesta = Interprete(entrada)
    console.log(respuesta)
    return res.send({message: respuesta})
    
})

app.post("/ast", async (req, res)=>{
    const {entrada} = req.body
    var ast = DibujarArbol(entrada)
    return res.send({message: ast})
})

app.listen(PORT, ()=>console.log("SERVIDOR INICIADO EN EL PUERTO: "+PORT))

function Interprete(datos){
    var ast;
    try {
        ast = parser.parse(datos);
    } catch (error) {
        var er = []
        er.push(error)
        return er
    }
    const err = require('./dist/Error/Error').Error_;
    var errores = new err(0,0,"prueba", "")
    var listaErrores = errores.getLista();

    if(listaErrores.length != 0){
        return listaErrores
    }else{
        const env = new entorno(null, "Global")
        const tablaSimbolos = new simbolos("", null)

        try {
            for (const actual of ast) {
                if(actual.length > 0){
                    for (const actual2 of actual) {
                        if(actual2 instanceof MetodosFunciones || actual2 instanceof Funciones){
                            actual2.execute(env, tablaSimbolos)
                        }
                    }
                }else{
                    if(actual instanceof MetodosFunciones || actual instanceof Funciones){
                        actual.execute(env, tablaSimbolos)
                    }
                }
            }
        } catch (error) {
            var er = []
            er.push(error)
            return er
        }


        try {
            for (const actual of ast) {
                if(actual.length > 0){
                    for (const actual2 of actual) {
                        if(actual2 instanceof MetodosFunciones || actual2 instanceof Funciones || actual2 == ";"){
                            continue
                        }
                        var retorno = actual2.execute(env, tablaSimbolos);
                        if(retorno != null || retorno != undefined){
                            const error = require('./dist/Error/Error').Error_;
                            throw new error(retorno.line, retorno.column, "Semántico", "No se puede colocar return/break/continue fuera de un ciclo o función o método.")
                        }
                    }
                }else{
                    if(actual instanceof MetodosFunciones || actual instanceof Funciones || actual == ";"){
                        continue
                    }
                    var retorno =  actual.execute(env, tablaSimbolos);
                    if(retorno != null || retorno != undefined){
                        const error = require('./dist/Error/Error').Error_;
                        throw new error(retorno.line, retorno.column, "Semántico", "No se puede colocar return/break/continue fuera de un ciclo o función o método.")
                    }
                }
            }
            var imp = new Impresiones().getLista()
            
            //TABLA DE SÍMBOLOS
            var tablaS = tablaSimbolos.grafica(tablaSimbolos);
            const archivo = './Reportes/DataReportes/tablaSimbolos.html'
            if(fs.existsSync(archivo)){
                fs.writeFileSync(archivo, tablaS, (err)=>console.log("hubo un error al crearel archivo."))
            }else{
                fs.appendFileSync(archivo, tablaS, (err)=>console.log("hubo un error al crearel archivo."))
            }

            return imp
        } catch (error) {
            var er = []
            er.push(error)
            return er
        }
    }
}

function DibujarArbol(datos){
    var raiz = new Recorrido_Arbol();
    var arbolast = parserAst.parse(datos)

    const err = require('./dist/Error/Error').Error_;
    var errores = new err(0,0,"prueba", "")
    var listaErrores = errores.getLista();
    if(listaErrores.length != 0){
        return "hay error", listaErrores
    }else{
        var recorrido = "digraph G {\n";
        raiz.recorrer_arbolito3(arbolast, "./Reportes/DataReportes/ast.dot")
        var listaRec = raiz.getAST();
        for (let i = 0; i < listaRec.length; i++) {
            recorrido +=  listaRec[i]+"\n"
        }
        recorrido += "}";
        os.create("C:\\Users\\Daniel Chicas\\Desktop\\prueba.txt")
        return recorrido
    }
}
