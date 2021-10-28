"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Declaracion = void 0;
const Error_1 = require("../Error/Error");
const Literal_1 = require("../Expresiones/Literal");
const Retorno_1 = require("../Expresiones/Retorno");
const Instruccion_1 = require("./Instruccion");
var comentarios = 0;
class Declaracion extends Instruccion_1.Instruccion {
    constructor(tipo, id, value, line, column) {
        super(line, column);
        this.tipo = tipo;
        this.id = id;
        this.value = value;
    }
    execute(entorno, simbolos) {
        var vec = this.tipo.split("@");
        if (this.tipo == "comentario") {
            entorno.setVariable("C_" + comentarios, this.value, Retorno_1.Type.COMENTARIO, this.line, this.column, simbolos);
            comentarios++;
        }
        else if (vec[0] == "listaChar") {
            var tipoId = this.id.split("&");
            var value = this.value.execute(entorno, simbolos);
            entorno.setVariable(tipoId[1], value.value, Retorno_1.Type.LISTACHA, this.line, this.column, simbolos);
        }
        else if (vec[0] == "lista") {
            var tipoId = this.id.split("&");
            if (tipoId[0] != "") {
                let vector = [];
                if (tipoId[0].toLowerCase() == "int") {
                    entorno.setVariable(tipoId[1], vector, Retorno_1.Type.LISTAENT, this.line, this.column, simbolos);
                }
                else if (tipoId[0].toLowerCase() == "double") {
                    entorno.setVariable(tipoId[1], vector, Retorno_1.Type.LISTADOU, this.line, this.column, simbolos);
                }
                else if (tipoId[0].toLowerCase() == "boolean") {
                    entorno.setVariable(tipoId[1], vector, Retorno_1.Type.LISTABOO, this.line, this.column, simbolos);
                }
                else if (tipoId[0].toLowerCase() == "char") {
                    entorno.setVariable(tipoId[1], vector, Retorno_1.Type.LISTACHA, this.line, this.column, simbolos);
                }
                else if (tipoId[0].toLowerCase() == "string") {
                    entorno.setVariable(tipoId[1], vector, Retorno_1.Type.LISTACAD, this.line, this.column, simbolos);
                }
                else {
                    throw new Error_1.Error_(this.line, this.column, "Semántico", "Tipo de vector inválido: " + tipoId[0] + ".");
                }
            }
        }
        else if (vec[0] == "vector") {
            if (vec[1] == "si") {
                var aux = this.value.execute(entorno, simbolos);
                if (aux.type == Retorno_1.Type.ENTERO) {
                    var tipoId = this.id.split("&");
                    if (tipoId[0] != "") {
                        let vector = [];
                        if (tipoId[0].toLowerCase() == "int") {
                            for (let index = 0; index < aux.value; index++) {
                                const nuevo = new Literal_1.Literal(0, Literal_1.TipoLiteral.ENTERO, 0, 0);
                                vector.push(nuevo);
                            }
                            entorno.setVariable(tipoId[1], vector, Retorno_1.Type.VECTORENT, this.line, this.column, simbolos);
                        }
                        else if (tipoId[0].toLowerCase() == "double") {
                            for (let index = 0; index < aux.value; index++) {
                                const nuevo = new Literal_1.Literal(0.0, Literal_1.TipoLiteral.DOUBLE, this.line, this.column);
                                vector.push(nuevo);
                            }
                            entorno.setVariable(tipoId[1], vector, Retorno_1.Type.VECTORDOU, this.line, this.column, simbolos);
                        }
                        else if (tipoId[0].toLowerCase() == "boolean") {
                            for (let index = 0; index < aux.value; index++) {
                                const nuevo = new Literal_1.Literal(true, Literal_1.TipoLiteral.BOOLEAN, this.line, this.column);
                                vector.push(nuevo);
                            }
                            entorno.setVariable(tipoId[1], vector, Retorno_1.Type.VECTORBOO, this.line, this.column, simbolos);
                        }
                        else if (tipoId[0].toLowerCase() == "char") {
                            for (let index = 0; index < aux.value; index++) {
                                const nuevo = new Literal_1.Literal('0', Literal_1.TipoLiteral.CHAR, this.line, this.column);
                                vector.push(nuevo);
                            }
                            entorno.setVariable(tipoId[1], vector, Retorno_1.Type.VECTORCHA, this.line, this.column, simbolos);
                        }
                        else if (tipoId[0].toLowerCase() == "string") {
                            for (let index = 0; index < aux.value; index++) {
                                const nuevo = new Literal_1.Literal("", Literal_1.TipoLiteral.CADENA, this.line, this.column);
                                vector.push(nuevo);
                            }
                            entorno.setVariable(tipoId[1], vector, Retorno_1.Type.VECTORCAD, this.line, this.column, simbolos);
                        }
                        else {
                            throw new Error_1.Error_(this.line, this.column, "Semántico", "Tipo de vector inválido: " + tipoId[0] + ".");
                        }
                    }
                    else if (tipoId[0] == "") {
                        const entornoIngresa = entorno;
                        while (entorno != null) {
                            if (entorno.variables.has(tipoId[1])) {
                                const variable = entorno.variables.get(tipoId[1]);
                                const val = this.value.execute(entornoIngresa, simbolos);
                                if (variable.type == 60 + val.type) {
                                    let vector = [];
                                    if (val.type == Retorno_1.Type.ENTERO) {
                                        for (let index = 0; index < aux.value; index++) {
                                            const nuevo = new Literal_1.Literal(0, Literal_1.TipoLiteral.ENTERO, 0, 0);
                                            vector.push(nuevo);
                                        }
                                        entorno.setVariable(tipoId[1], vector, Retorno_1.Type.VECTORENT, this.line, this.column, simbolos);
                                    }
                                    else if (val.type == Retorno_1.Type.DOUBLE) {
                                        for (let index = 0; index < aux.value; index++) {
                                            const nuevo = new Literal_1.Literal(0.0, Literal_1.TipoLiteral.DOUBLE, this.line, this.column);
                                            vector.push(nuevo);
                                        }
                                        entorno.setVariable(tipoId[1], vector, Retorno_1.Type.VECTORDOU, this.line, this.column, simbolos);
                                    }
                                    else if (val.type == Retorno_1.Type.BOOLEAN) {
                                        for (let index = 0; index < aux.value; index++) {
                                            const nuevo = new Literal_1.Literal(true, Literal_1.TipoLiteral.BOOLEAN, this.line, this.column);
                                            vector.push(nuevo);
                                        }
                                        entorno.setVariable(tipoId[1], vector, Retorno_1.Type.VECTORBOO, this.line, this.column, simbolos);
                                    }
                                    else if (val.type == Retorno_1.Type.CHAR) {
                                        for (let index = 0; index < aux.value; index++) {
                                            const nuevo = new Literal_1.Literal('0', Literal_1.TipoLiteral.CHAR, this.line, this.column);
                                            vector.push(nuevo);
                                        }
                                        entorno.setVariable(tipoId[1], vector, Retorno_1.Type.VECTORCHA, this.line, this.column, simbolos);
                                    }
                                    else if (val.type == Retorno_1.Type.CADENA) {
                                        for (let index = 0; index < aux.value; index++) {
                                            const nuevo = new Literal_1.Literal("", Literal_1.TipoLiteral.CADENA, this.line, this.column);
                                            vector.push(nuevo);
                                        }
                                        entorno.setVariable(tipoId[1], vector, Retorno_1.Type.VECTORCAD, this.line, this.column, simbolos);
                                    }
                                }
                                else {
                                    throw new Error_1.Error_(this.line, this.column, "Semántico", "No es posible asignar asignar este valor a la variable: " + tipoId[1]);
                                }
                            }
                            entorno = entorno.anterior;
                        }
                    }
                }
                else {
                    throw new Error_1.Error_(this.line, this.column, "Semántico", "Debe colocar un entero para declarar el tamaño del vector, no: " + aux.value + ".");
                }
            }
            else if (vec[1] == "no") {
                var aux = this.value.execute(entorno, simbolos);
                var tipoId = this.id.split("&");
                if (tipoId[0] != "") {
                    let vector = [];
                    if (tipoId[0].toLowerCase() == "int" && aux.type == Retorno_1.Type.ENTERO) {
                        var data = aux.value.split("|");
                        for (let index = 0; index < data.length; index++) {
                            const nuevo = new Literal_1.Literal(data[index], Literal_1.TipoLiteral.ENTERO, this.line, this.column);
                            vector.push(nuevo);
                        }
                        entorno.setVariable(tipoId[1], vector, Retorno_1.Type.VECTORENT, this.line, this.column, simbolos);
                    }
                    else if (tipoId[0].toLowerCase() == "double" && aux.type == Retorno_1.Type.DOUBLE) {
                        var data = aux.value.split("|");
                        for (let index = 0; index < data.length; index++) {
                            const nuevo = new Literal_1.Literal(data[index], Literal_1.TipoLiteral.DOUBLE, this.line, this.column);
                            vector.push(nuevo);
                        }
                        entorno.setVariable(tipoId[1], vector, Retorno_1.Type.VECTORDOU, this.line, this.column, simbolos);
                    }
                    else if (tipoId[0].toLowerCase() == "boolean" && aux.type == Retorno_1.Type.BOOLEAN) {
                        var data = aux.value.split("|");
                        for (let index = 0; index < data.length; index++) {
                            if (data[index] == "true") {
                                const nuevo = new Literal_1.Literal(true, Literal_1.TipoLiteral.BOOLEAN, this.line, this.column);
                                vector.push(nuevo);
                            }
                            else {
                                const nuevo = new Literal_1.Literal(false, Literal_1.TipoLiteral.BOOLEAN, this.line, this.column);
                                vector.push(nuevo);
                            }
                        }
                        entorno.setVariable(tipoId[1], vector, Retorno_1.Type.VECTORBOO, this.line, this.column, simbolos);
                    }
                    else if (tipoId[0].toLowerCase() == "char" && aux.type == Retorno_1.Type.CHAR) {
                        var data = aux.value.split("|");
                        for (let index = 0; index < data.length; index++) {
                            const nuevo = new Literal_1.Literal(data[index], Literal_1.TipoLiteral.CHAR, this.line, this.column);
                            vector.push(nuevo);
                        }
                        entorno.setVariable(tipoId[1], vector, Retorno_1.Type.VECTORCHA, this.line, this.column, simbolos);
                    }
                    else if (tipoId[0].toLowerCase() == "string" && aux.type == Retorno_1.Type.CADENA) {
                        var data = aux.value.split("|");
                        for (let index = 0; index < data.length; index++) {
                            const nuevo = new Literal_1.Literal(data[index], Literal_1.TipoLiteral.CADENA, this.line, this.column);
                            vector.push(nuevo);
                        }
                        entorno.setVariable(tipoId[1], vector, Retorno_1.Type.VECTORCAD, this.line, this.column, simbolos);
                    }
                    else if (tipoId[0].toLowerCase() == "int" && aux.type == Retorno_1.Type.DOUBLE) {
                        var data = aux.value.split("|");
                        for (let index = 0; index < data.length; index++) {
                            const nuevo = new Literal_1.Literal(Math.trunc(data[index]), Literal_1.TipoLiteral.ENTERO, this.line, this.column);
                            vector.push(nuevo);
                        }
                        entorno.setVariable(tipoId[1], vector, Retorno_1.Type.VECTORENT, this.line, this.column, simbolos);
                    }
                    else if (tipoId[0].toLowerCase() == "double" && aux.type == Retorno_1.Type.ENTERO) {
                        var data = aux.value.split("|");
                        for (let index = 0; index < data.length; index++) {
                            const nuevo = new Literal_1.Literal(data[index], Literal_1.TipoLiteral.DOUBLE, this.line, this.column);
                            vector.push(nuevo);
                        }
                        entorno.setVariable(tipoId[1], vector, Retorno_1.Type.VECTORDOU, this.line, this.column, simbolos);
                    }
                    else {
                        throw new Error_1.Error_(this.line, this.column, "Semántico", "El tipo del vector no coincide con el tipo dato que desea ingresar. ");
                    }
                }
                else if (tipoId[0] == "") {
                    const entornoIngresa = entorno;
                    while (entorno != null) {
                        if (entorno.variables.has(tipoId[1])) {
                            const variable = entorno.variables.get(tipoId[1]);
                            const val = this.value.execute(entornoIngresa, simbolos);
                            if (variable.type == 60 + val.type) {
                                let vector = [];
                                if (val.type == Retorno_1.Type.ENTERO) {
                                    var data = aux.value.split("|");
                                    for (let index = 0; index < data.length; index++) {
                                        const nuevo = new Literal_1.Literal(data[index], Literal_1.TipoLiteral.ENTERO, this.line, this.column);
                                        vector.push(nuevo);
                                    }
                                    entorno.setVariable(tipoId[1], vector, Retorno_1.Type.VECTORENT, this.line, this.column, simbolos);
                                }
                                else if (val.type == Retorno_1.Type.DOUBLE) {
                                    var data = aux.value.split("|");
                                    for (let index = 0; index < data.length; index++) {
                                        const nuevo = new Literal_1.Literal(data[index], Literal_1.TipoLiteral.DOUBLE, this.line, this.column);
                                        vector.push(nuevo);
                                    }
                                    entorno.setVariable(tipoId[1], vector, Retorno_1.Type.VECTORDOU, this.line, this.column, simbolos);
                                }
                                else if (val.type == Retorno_1.Type.BOOLEAN) {
                                    var data = aux.value.split("|");
                                    for (let index = 0; index < data.length; index++) {
                                        for (let index = 0; index < data.length; index++) {
                                            if (data[index] == "true") {
                                                const nuevo = new Literal_1.Literal(true, Literal_1.TipoLiteral.BOOLEAN, this.line, this.column);
                                                vector.push(nuevo);
                                            }
                                            else {
                                                const nuevo = new Literal_1.Literal(false, Literal_1.TipoLiteral.BOOLEAN, this.line, this.column);
                                                vector.push(nuevo);
                                            }
                                        }
                                    }
                                    entorno.setVariable(tipoId[1], vector, Retorno_1.Type.VECTORBOO, this.line, this.column, simbolos);
                                }
                                else if (val.type == Retorno_1.Type.CHAR) {
                                    var data = aux.value.split("|");
                                    for (let index = 0; index < data.length; index++) {
                                        const nuevo = new Literal_1.Literal(data[index], Literal_1.TipoLiteral.CHAR, this.line, this.column);
                                        vector.push(nuevo);
                                    }
                                    entorno.setVariable(tipoId[1], vector, Retorno_1.Type.VECTORCHA, this.line, this.column, simbolos);
                                }
                                else if (val.type == Retorno_1.Type.CADENA) {
                                    var data = aux.value.split("|");
                                    for (let index = 0; index < data.length; index++) {
                                        const nuevo = new Literal_1.Literal(data[index], Literal_1.TipoLiteral.CADENA, this.line, this.column);
                                        vector.push(nuevo);
                                    }
                                    entorno.setVariable(tipoId[1], vector, Retorno_1.Type.VECTORCAD, this.line, this.column, simbolos);
                                }
                            }
                            else {
                                throw new Error_1.Error_(this.line, this.column, "Semántico", "No es posible asignar asignar este valor a la variable: " + tipoId[1]);
                            }
                        }
                        entorno = entorno.anterior;
                    }
                }
            }
        }
        else if (this.tipo != "") {
            var aprobado = false;
            const val = this.value.execute(entorno, simbolos);
            if (this.tipo.toLowerCase() == "int" && val.type == 0) {
                aprobado = true;
            }
            else if (this.tipo.toLowerCase() == "double" && val.type == 1) {
                aprobado = true;
            }
            else if (this.tipo.toLowerCase() == "boolean" && val.type == 2) {
                aprobado = true;
            }
            else if (this.tipo.toLowerCase() == "char" && val.type == 3) {
                aprobado = true;
            }
            else if (this.tipo.toLowerCase() == "string" && val.type == 4) {
                aprobado = true;
            }
            else if (this.tipo.toLowerCase() == "int" && val.type == 1) {
                var valor = Math.trunc(val.value);
                val.value = valor;
                val.type = Retorno_1.Type.ENTERO;
                aprobado = true;
            }
            else if (this.tipo.toLowerCase() == "double" && val.type == 0) {
                val.type = Retorno_1.Type.DOUBLE;
                aprobado = true;
            }
            if (aprobado) {
                entorno.setVariable(this.id, val.value, val.type, this.line, this.column, simbolos);
            }
            else {
                throw new Error_1.Error_(this.line, this.column, "Semántico", "No es posible asignar asignar este valor a la variable: " + this.id);
            }
        }
        else {
            const entornoIngresa = entorno;
            while (entorno != null) {
                if (entorno.variables.has(this.id)) {
                    const variable = entorno.variables.get(this.id);
                    const val = this.value.execute(entornoIngresa, simbolos);
                    if (variable.type == val.type) {
                        entorno.setVariable(this.id, val.value, val.type, this.line, this.column, simbolos);
                    }
                    else if (variable.type == Retorno_1.Type.ENTERO && val.type == Retorno_1.Type.DOUBLE) {
                        entorno.setVariable(this.id, Math.trunc(val.value), variable.type, this.line, this.column, simbolos);
                    }
                    else if (variable.type == Retorno_1.Type.DOUBLE && val.type == Retorno_1.Type.ENTERO) {
                        entorno.setVariable(this.id, val.value, variable.type, this.line, this.column, simbolos);
                    }
                    else {
                        throw new Error_1.Error_(this.line, this.column, "Semántico", "No es posible asignar asignar este valor a la variable: " + tipoId[1]);
                    }
                }
                entorno = entorno.anterior;
            }
        }
    }
}
exports.Declaracion = Declaracion;
//# sourceMappingURL=Declaracion.js.map