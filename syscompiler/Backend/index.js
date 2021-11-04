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

app.get('/', (req, res)=>{
    res.send("FUNCIONA");
})

app.post("/ejecutar", async (req, res)=>{
    const {entrada} = req.body
    var respuesta = Interprete(entrada)
    return res.send({message: respuesta})
})

app.post("/ast", async (req, res)=>{
    const {entrada} = req.body
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
    var errores = Errores(entrada)
    return res.send({message: errores})
})

app.listen(PORT, ()=>console.log("SERVIDOR INICIADO EN EL PUERTO: "+PORT))

function Interprete(datos){
    var ast;
    try {
        ast = parser.parse(datos);
    } catch (error) {
        console.log(error)
    }
    const err = require('./dist/Error/Error').Error_;
    var pruebaErrores = new err(0,0,"prueba", "")
    var listaErrores = pruebaErrores.getLista();
    pruebaErrores.clearLista();

    if(listaErrores.length != 0){
        var errores = []
        for (let i = 0; i < listaErrores.length; i++) {
            const element = listaErrores[i];
            errores.push("<--> Error "+element.tipo+": "+element.mensaje+", en la línea: "+element.linea+", columna: "+element.columna)
        }
        return errores
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
            var errores = []
            errores.push("<--> Error "+error.tipo+": "+error.mensaje+", en la línea: "+error.linea+", columna: "+error.columna)
            return errores
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
                            throw new error(retorno.line, retorno.column, "Semántico", "No se puede colocar return/break/continue fuera de un ciclo, función o método.")
                        }
                    }
                }else{
                    if(actual instanceof MetodosFunciones || actual instanceof Funciones || actual == ";"){
                        continue
                    }
                    var retorno =  actual.execute(env, tablaSimbolos);
                    if(retorno != null || retorno != undefined){
                        const error = require('./dist/Error/Error').Error_;
                        throw new error(retorno.line, retorno.column, "Semántico", "No se puede colocar return/break/continue fuera de un ciclo, función o método.")
                    }
                }
            }
            var imp = new Impresiones().getLista()
            return imp
        } catch (error) {
            var errores = []
            errores.push("<--> Error "+error.tipo+": "+error.mensaje+", en la línea: "+error.linea+", columna: "+error.columna)
            return errores
        }
    }
}

var abierto = false;

function DibujarArbol(datos){
    var raiz = new Recorrido_Arbol();
    var arbolast = parserAst.parse(datos)

    const err = require('./dist/Error/Error').Error_;
    var pruebaErrores = new err(0,0,"prueba", "")
    var listaErrores = pruebaErrores.getLista();
    pruebaErrores.clearLista();

    if(listaErrores.length != 0){
        return "hay error", listaErrores
    }else{
        var recorrido = "digraph G {\n";
        raiz.recorrer_arbolito3(arbolast, "./Reportes/DataReportes/ast.dot")
        var listaRec = raiz.getAST();
        raiz.clearAST();
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
        })
        if(!abierto){
            exec('ast.pdf', (error, stdout, stderr)=>{
                if(error){
                    console.log("error: "+error.message)
                    return
                }
                if(stderr){
                    console.log("stderr: "+stderr)
                    return
                }
            })
            abierto = true;
        }else{
            abierto = false;
        }
        
    }
}

function tablaS(datos){
    var ast;
    try {
        ast = parser.parse(datos);
    } catch (error) {
        console.log(error)
    }
    const err = require('./dist/Error/Error').Error_;
    var pruebaErrores = new err(0,0,"prueba", "")
    var listaErrores = pruebaErrores.getLista();
    pruebaErrores.clearLista();

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
            console.log(error)
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
            console.log(error)
        }
    }
}

function Errores(datos){
    var errores = [];
    var ast;
    try {
        ast = parser.parse(datos);
    } catch (error) {
        const err = require('./dist/Error/Error').Error_;
        if(error instanceof err){
            errores.push(error)
        }else{
            console.log(error)
        }
    }
    const err = require('./dist/Error/Error').Error_;
    var pruebaErrores = new err(0,0,"prueba", "")
    var listaErrores = pruebaErrores.getLista();
    pruebaErrores.clearLista();

    if(listaErrores.length != 0){
        for (let i = 0; i < listaErrores.length; i++) {
            const element = listaErrores[i];
            errores.push(element)
        }
    }

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
        const err = require('./dist/Error/Error').Error_;
        if(error instanceof err){
            errores.push(error)
        }else{
            console.log(error)
        }
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
    } catch (error) {
        const err = require('./dist/Error/Error').Error_;
        if(error instanceof err){
            errores.push(error)
        }else{
            console.log(error)
        }
    }
    return errores
}