const parser = require('./Gramaticas/Gramatica.js')
const entorno = require('./dist/Ambitos/Entorno').Entorno;
const simbolos = require('./dist/Reportes/TablaSimbolos').TablaSimbolos;
const MetodosFunciones = require('./dist/Instrucciones/MetodosFunciones').MetodosFunciones;
const Funciones = require('./dist/Instrucciones/MetodosFunciones').Funciones;
const Impresiones = require('./dist/Instrucciones/Imprimir').Impresiones;
const fs = require("fs")
const parserAst = require('./Ast/ast')
const Recorrido_Arbol = require('./dist/Instrucciones/nodoArbol').Recorrido_Arbol
const {exec} = require('child_process')


const express = require('express')
const app = express()
const cors = require('cors')


app.use(cors())

app.use(express.json())

const PORT = 5000

app.post("/ejecutar", async (req, res)=>{
    const {entrada} = req.body
    var respuesta = Interprete(entrada)
    return res.send({message: respuesta})
})

app.post("/ast", async (req, res)=>{
    const {entrada} = req.body
    console.log("dibujando...")
    var ast = DibujarArbol(entrada)
    return res.send({message: ast})
})

app.post("/simbolos", (req, res)=>{
    const {entrada} = req.body
    var tabla = tablaS(entrada)
    return res.send({message: tabla})
})

app.post("/errores", async (req, res)=>{
    const {entrada} = req.body
    var errores = tablaS(entrada)
    return res.send({tabla: errores})
})

app.listen(PORT, ()=>console.log("SERVIDOR INICIADO EN EL PUERTO: "+PORT))

function Interprete(datos){
    var ast;
    try {
        ast = parser.parse(datos);
    } catch (error) {
        var er = []
        er.push("Error")
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
            er.push("Error")
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
            return imp
        } catch (error) {
            var er = []
            er.push("Error")
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
        var archivo = './ast.dot'
        if(fs.existsSync(archivo)){
            fs.writeFileSync(archivo, recorrido, (err)=>{
                if(err){
                    console.log("hubo un error al crear el archivo.")
                }
                console.log("se ha escrito correctamente")
            })
        }else{
            fs.appendFileSync(archivo, recorrido, (err)=>{
                if(err){
                    console.log("hubo un error al crear el archivo.")
                }
                console.log("se ha escrito correctamente")
            })
        }
        exec('dot -T pdf ast.dot -o ast.pdf', (error, stdout, stderr)=>{
            if(error){
                console.log("error: "+error.message)
                return
            }
            if(stderr){
                console.log("stderr: "+stderr)
                return
            }
            console.log("stdout: "+stdout)
        })
        fs.renameSync("./ast.pdf", "../Frontend/src/Archivospdf/ast.pdf", (error)=>{
            console.log(error)
        })
        raiz.clearAST();
        return "fin"
    }
}

function tablaS(datos){
    var ast;
    try {
        ast = parser.parse(datos);
    } catch (error) {
        var er = []
        er.push("Error")
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
            er.push("Error")
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
            
            var tablaSi = tablaSimbolos.grafica(tablaSimbolos);
            return tablaSi;
        } catch (error) {
            var er = []
            er.push("Error")
            er.push(error)
            return er
        }
    }
}