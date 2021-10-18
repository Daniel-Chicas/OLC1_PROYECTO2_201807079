import { Entorno } from "../Ambitos/Entorno";
import { Simbolo } from "../Ambitos/Simbolo";
import { Error_ } from "../Error/Error";
import { Expresion } from "../Expresiones/Expresion";
import { Literal, TipoLiteral } from "../Expresiones/Literal";
import { Type } from "../Expresiones/Retorno";
import { Instruccion } from "./Instruccion";

export class Declaracion extends Instruccion{
    constructor(private tipo: string, private id: string, private value: Expresion, line: number, column: number){
        super(line, column)
    }

    public execute(entorno: Entorno){
        var vec = this.tipo.split("@")
        if(vec[0] == "listaChar"){
            var tipoId = this.id.split("&");
            var value = this.value.execute(entorno);
            if(value.type == Type.CADENA){
                let vector = value.value.toString().split("")
                entorno.setVariable(tipoId[1], vector, Type.LISTACHA, this.line, this.column)
            }else{
                throw new Error_(this.line, this.column, "Semántico", "Se esperaba una cadena para hacer la lista de caracteres. Se ingresó: "+value.value+".")
            }
        }else if(vec[0] == "lista"){
            var tipoId = this.id.split("&")
            if(tipoId[0] != ""){
                let vector = []
                if(tipoId[0].toLowerCase() == "int"){
                    entorno.setVariable(tipoId[1], vector, Type.LISTAENT, this.line, this.column)
                }else if(tipoId[0].toLowerCase() == "double"){
                    entorno.setVariable(tipoId[1], vector, Type.LISTADOU, this.line, this.column)
                }else if(tipoId[0].toLowerCase() == "boolean"){
                    entorno.setVariable(tipoId[1], vector, Type.LISTABOO, this.line, this.column)
                }else if(tipoId[0].toLowerCase() == "char"){
                    entorno.setVariable(tipoId[1], vector, Type.LISTACHA, this.line, this.column)
                }else if(tipoId[0].toLowerCase() == "string"){
                    entorno.setVariable(tipoId[1], vector, Type.LISTACAD, this.line, this.column)
                }else{
                    throw new Error_(this.line, this.column, "Semántico", "Tipo de vector inválido: "+tipoId[0]+".")
                }
            }
        }else if(vec[0] == "vector"){
            if(vec[1] == "si"){
                var aux = this.value.execute(entorno)
                if(aux.type == Type.ENTERO){
                    var tipoId = this.id.split("&")
                    if(tipoId[0] != ""){
                        let vector = []
                        if(tipoId[0].toLowerCase() == "int"){
                            for (let index = 0; index < aux.value; index++) {
                                const nuevo = new Literal(0, TipoLiteral.ENTERO, 0,0);
                                vector.push(nuevo)
                            }
                            entorno.setVariable(tipoId[1], vector, Type.VECTORENT, this.line, this.column)
                        }else if(tipoId[0].toLowerCase() == "double"){
                            for (let index = 0; index < aux.value; index++) {
                                const nuevo = new Literal(0.0, TipoLiteral.DOUBLE, this.line, this.column);
                                vector.push(nuevo)
                            }
                            entorno.setVariable(tipoId[1], vector, Type.VECTORDOU, this.line, this.column)
                        }else if(tipoId[0].toLowerCase() == "boolean"){
                            for (let index = 0; index < aux.value; index++) {
                                const nuevo = new Literal(true, TipoLiteral.BOOLEAN, this.line, this.column);
                                vector.push(nuevo)
                            }
                            entorno.setVariable(tipoId[1], vector, Type.VECTORBOO, this.line, this.column)
                        }else if(tipoId[0].toLowerCase() == "char"){
                            for (let index = 0; index < aux.value; index++) {
                                const nuevo = new Literal('0', TipoLiteral.CHAR, this.line, this.column);
                                vector.push(nuevo)
                            }
                            entorno.setVariable(tipoId[1], vector, Type.VECTORCHA, this.line, this.column)
                        }else if(tipoId[0].toLowerCase() == "string"){
                            for (let index = 0; index < aux.value; index++) {
                                const nuevo = new Literal("", TipoLiteral.CADENA, this.line, this.column);
                                vector.push(nuevo)
                            }
                            entorno.setVariable(tipoId[1], vector, Type.VECTORCAD, this.line, this.column)
                        }else{
                            throw new Error_(this.line, this.column, "Semántico", "Tipo de vector inválido: "+tipoId[0]+".")
                        }
                    }else if (tipoId[0] == ""){
                        while(entorno != null){
                            if(entorno.variables.has(tipoId[1])){
                                const variable = entorno.variables.get(tipoId[1]);
                                const val = this.value.execute(entorno);
                                if(variable.type == 60+val.type){
                                    let vector = []
                                    if(val.type == Type.ENTERO){
                                        for (let index = 0; index < aux.value; index++) {
                                            const nuevo = new Literal(0, TipoLiteral.ENTERO, 0,0);
                                            vector.push(nuevo)
                                        }
                                        entorno.setVariable(tipoId[1], vector, Type.VECTORENT, this.line, this.column)
                                    }else if(val.type == Type.DOUBLE){
                                        for (let index = 0; index < aux.value; index++) {
                                            const nuevo = new Literal(0.0, TipoLiteral.DOUBLE, this.line, this.column);
                                            vector.push(nuevo)
                                        }
                                        entorno.setVariable(tipoId[1], vector, Type.VECTORDOU, this.line, this.column)
                                    }else if(val.type == Type.BOOLEAN){
                                        for (let index = 0; index < aux.value; index++) {
                                            const nuevo = new Literal(true, TipoLiteral.BOOLEAN, this.line, this.column);
                                            vector.push(nuevo)
                                        }
                                        entorno.setVariable(tipoId[1], vector, Type.VECTORBOO, this.line, this.column)
                                    }else if(val.type == Type.CHAR){
                                        for (let index = 0; index < aux.value; index++) {
                                            const nuevo = new Literal('0', TipoLiteral.CHAR, this.line, this.column);
                                            vector.push(nuevo)
                                        }
                                        entorno.setVariable(tipoId[1], vector, Type.VECTORCHA, this.line, this.column)
                                    }else if(val.type == Type.CADENA){
                                        for (let index = 0; index < aux.value; index++) {
                                            const nuevo = new Literal("", TipoLiteral.CADENA, this.line, this.column);
                                            vector.push(nuevo)
                                        }
                                        entorno.setVariable(tipoId[1], vector, Type.VECTORCAD, this.line, this.column)
                                    }
                                }else{
                                    throw new Error_(this.line, this.column, "Semántico", "No es posible asignar asignar este valor a la variable: "+tipoId[1])
                                }
                            }
                            entorno = entorno.anterior;
                        }
                    }
                }else{
                    throw new Error_(this.line, this.column, "Semántico", "Debe colocar un entero para declarar el tamaño del vector, no: "+aux.value+".")
                }
            }else if(vec[1] == "no"){
                var aux = this.value.execute(entorno)
                var tipoId = this.id.split("&")
                
                if(tipoId[0]!=""){
                    let vector = []
                    if(tipoId[0].toLowerCase() == "int" && aux.type == Type.ENTERO){
                        var data = aux.value.split("|")
                        for (let index = 0; index < data.length; index++) {
                            const nuevo = new Literal(data[index], TipoLiteral.ENTERO, this.line, this.column);
                            vector.push(nuevo)
                        }
                        entorno.setVariable(tipoId[1], vector, Type.VECTORENT, this.line, this.column)
                    }else if(tipoId[0].toLowerCase() == "double" && aux.type == Type.DOUBLE){
                        var data = aux.value.split("|")
                        for (let index = 0; index < data.length; index++) {
                            const nuevo = new Literal(data[index], TipoLiteral.DOUBLE, this.line, this.column);
                            vector.push(nuevo)
                        }
                        entorno.setVariable(tipoId[1], vector, Type.VECTORDOU, this.line, this.column)
                    }else if(tipoId[0].toLowerCase() == "boolean" && aux.type == Type.BOOLEAN){
                        var data = aux.value.split("|")
                        for (let index = 0; index < data.length; index++) {
                            if(data[index] == "true"){
                                const nuevo = new Literal(true, TipoLiteral.BOOLEAN, this.line, this.column);
                                vector.push(nuevo)
                            }else{
                                const nuevo = new Literal(false, TipoLiteral.BOOLEAN, this.line, this.column);
                                vector.push(nuevo)
                            }
                        }
                        entorno.setVariable(tipoId[1], vector, Type.VECTORBOO, this.line, this.column)
                    }else if(tipoId[0].toLowerCase() == "char" && aux.type == Type.CHAR){
                        var data = aux.value.split("|")
                        for (let index = 0; index < data.length; index++) {
                            const nuevo = new Literal(data[index], TipoLiteral.CHAR, this.line, this.column);
                            vector.push(nuevo)
                        }
                        entorno.setVariable(tipoId[1], vector, Type.VECTORCHA, this.line, this.column)
                    }else if(tipoId[0].toLowerCase() == "string" && aux.type == Type.CADENA ){
                        var data = aux.value.split("|")
                        for (let index = 0; index < data.length; index++) {
                            const nuevo = new Literal(data[index], TipoLiteral.CADENA, this.line, this.column);
                            vector.push(nuevo)
                        }
                        entorno.setVariable(tipoId[1], vector, Type.VECTORCAD, this.line, this.column)
                    }else{
                        throw new Error_(this.line, this.column, "Semántico", "El tipo del vector no coincide con el tipo dato que desea ingresar. ")
                    }
                }else if (tipoId[0] == ""){
                    while(entorno != null){
                        if(entorno.variables.has(tipoId[1])){
                            const variable = entorno.variables.get(tipoId[1]);
                            const val = this.value.execute(entorno);
                            if(variable.type == 60+val.type){
                                let vector = []
                                if(val.type == Type.ENTERO){
                                    var data = aux.value.split("|")
                                    for (let index = 0; index < data.length; index++) {
                                        const nuevo = new Literal(data[index], TipoLiteral.ENTERO, this.line, this.column);
                                        vector.push(nuevo)
                                    }
                                    entorno.setVariable(tipoId[1], vector, Type.VECTORENT, this.line, this.column)
                                }else if(val.type == Type.DOUBLE){
                                    var data = aux.value.split("|")
                                    for (let index = 0; index < data.length; index++) {
                                        const nuevo = new Literal(data[index], TipoLiteral.DOUBLE, this.line, this.column);
                                        vector.push(nuevo)
                                    }
                                    entorno.setVariable(tipoId[1], vector, Type.VECTORDOU, this.line, this.column)
                                }else if(val.type == Type.BOOLEAN){
                                    var data = aux.value.split("|")
                                    for (let index = 0; index < data.length; index++) {
                                        for (let index = 0; index < data.length; index++) {
                                            if(data[index] == "true"){
                                                const nuevo = new Literal(true, TipoLiteral.BOOLEAN, this.line, this.column);
                                                vector.push(nuevo)
                                            }else{
                                                const nuevo = new Literal(false, TipoLiteral.BOOLEAN, this.line, this.column);
                                                vector.push(nuevo)
                                            }
                                        }
                                    }
                                    entorno.setVariable(tipoId[1], vector, Type.VECTORBOO, this.line, this.column)
                                }else if(val.type == Type.CHAR){
                                    var data = aux.value.split("|")
                                    for (let index = 0; index < data.length; index++) {
                                        const nuevo = new Literal(data[index], TipoLiteral.CHAR, this.line, this.column);
                                        vector.push(nuevo)
                                    }
                                    entorno.setVariable(tipoId[1], vector, Type.VECTORCHA, this.line, this.column)
                                }else if(val.type == Type.CADENA){
                                    var data = aux.value.split("|")
                                    for (let index = 0; index < data.length; index++) {
                                        const nuevo = new Literal(data[index], TipoLiteral.CADENA, this.line, this.column);
                                        vector.push(nuevo)
                                    }
                                    entorno.setVariable(tipoId[1], vector, Type.VECTORCAD, this.line, this.column)
                                }
                            }else{
                                throw new Error_(this.line, this.column, "Semántico", "No es posible asignar asignar este valor a la variable: "+tipoId[1])
                            }
                        }
                        entorno = entorno.anterior;
                    }
                }
            }
        }else if(this.tipo != ""){
            var aprobado = false;
            const val = this.value.execute(entorno)
            if(this.tipo.toLowerCase() == "int" && val.type == 0){
                aprobado = true;
            }else if(this.tipo.toLowerCase() == "double" && val.type == 1){
                aprobado = true;
            }else if(this.tipo.toLowerCase() == "boolean" && val.type == 2){
                aprobado = true;
            }else if(this.tipo.toLowerCase() == "char" && val.type == 3){
                aprobado = true;
            }else if(this.tipo.toLowerCase() == "string" && val.type == 4){
                aprobado = true;
            }
            if(aprobado){
                entorno.setVariable(this.id, val.value, val.type, this.line, this.column)
            }else{
                throw new Error_(this.line, this.column, "Semántico", "No es posible asignar asignar este valor a la variable: "+tipoId[1])
            }
        }else{
            while(entorno != null){
                if(entorno.variables.has(this.id)){
                    const variable = entorno.variables.get(this.id);
                    const val = this.value.execute(entorno);
                    if(variable.type == val.type){
                        entorno.variables.set(this.id, new Simbolo(val.value, this.id, val.type))
                    }else{
                        throw new Error_(this.line, this.column, "Semántico", "No es posible asignar asignar este valor a la variable: "+tipoId[1])
                    }
                }
                entorno = entorno.anterior;
            }
        }        
    }

}


