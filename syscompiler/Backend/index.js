const parser = require('./Gramaticas/Gramatica.js')
const entorno = require('./dist/Ambitos/Entorno').Entorno;
const simbolos = require('./dist/Reportes/TablaSimbolos').TablaSimbolos;
const MetodosFunciones = require('./dist/Instrucciones/MetodosFunciones').MetodosFunciones;
const Funciones = require('./dist/Instrucciones/MetodosFunciones').Funciones;
const Impresiones = require('./dist/Instrucciones/Imprimir').Impresiones;

const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())

app.use(express.json())

const PORT = 5000
var entro = false
app.post("/", async (req, res)=>{
    const {entrada} = req.body
    console.log(entrada)
    return res.send({message: "recibido puto: "+entrada})
    
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
    var errores = new err(0,0,"prueba", "")
    var listaErrores = errores.getLista();
    if(listaErrores.length != 0){
        console.log("hay errores:", listaErrores)
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
            var imp = new Impresiones().getLista()
            console.log(imp)
        } catch (error) {
            console.log(error)
        }
    }
}