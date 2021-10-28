"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LlamadasFunciones = exports.Llamadas = void 0;
const Entorno_1 = require("../Ambitos/Entorno");
const Error_1 = require("../Error/Error");
const Expresion_1 = require("../Expresiones/Expresion");
const Instruccion_1 = require("./Instruccion");
class Llamadas extends Instruccion_1.Instruccion {
    constructor(id, parametros, linea, columna) {
        super(linea, columna);
        this.id = id;
        this.parametros = parametros;
    }
    execute(entorno, simbolos) {
        const metodo = entorno.getMetodo(this.id);
        if (metodo == null) {
            throw new Error_1.Error_(this.line, this.column, "Semántico", "No se encontró el método: " + this.id);
        }
        else {
            var parametros = [];
            if (metodo.parametros != "") {
                parametros = metodo.parametros.split(",");
            }
            if (parametros.length != this.parametros.length) {
                throw new Error_1.Error_(this.line, this.column, "Semántico", "No coincide la cantidad de parámetros de la llamada con el método.");
            }
            else {
                for (let i = 0; i < this.parametros.length; i++) {
                    var aprobado = false;
                    var tipoId = parametros[i].split("-");
                    var comprueba = this.parametros[i].execute(entorno, simbolos);
                    if (tipoId[0].toString().toLowerCase() == "int" && comprueba.type == 0) {
                        aprobado = true;
                    }
                    else if (tipoId[0].toString().toLowerCase() == "double" && comprueba.type == 1) {
                        aprobado = true;
                    }
                    else if (tipoId[0].toString().toLowerCase() == "boolean" && comprueba.type == 2) {
                        aprobado = true;
                    }
                    else if (tipoId[0].toString().toLowerCase() == "char" && comprueba.type == 3) {
                        aprobado = true;
                    }
                    else if (tipoId[0].toString().toLowerCase() == "string" && comprueba.type == 4) {
                        aprobado = true;
                    }
                    else if (tipoId[0].toString().toLowerCase() == "int" && comprueba.type == 1) {
                        aprobado = true;
                    }
                    else if (tipoId[0].toString().toLowerCase() == "double" && comprueba.type == 0) {
                        aprobado = true;
                    }
                    else {
                        var veclis = tipoId[0].split("&");
                        if (veclis[0].toString().toLowerCase() == "vector") {
                            if (veclis[1].toString().toLowerCase() == "int" && comprueba.type == 60) {
                                aprobado = true;
                            }
                            else if (veclis[1].toString().toLowerCase() == "double" && comprueba.type == 61) {
                                aprobado = true;
                            }
                            else if (veclis[1].toString().toLowerCase() == "boolean" && comprueba.type == 62) {
                                aprobado = true;
                            }
                            else if (veclis[1].toString().toLowerCase() == "char" && comprueba.type == 63) {
                                aprobado = true;
                            }
                            else if (veclis[1].toString().toLowerCase() == "string" && comprueba.type == 64) {
                                aprobado = true;
                            }
                            else if (veclis[1].toString().toLowerCase() == "int" && comprueba.type == 61) {
                                aprobado = true;
                            }
                            else if (veclis[1].toString().toLowerCase() == "double" && comprueba.type == 60) {
                                aprobado = true;
                            }
                        }
                        else if (veclis[0].toString().toLowerCase() == "lista") {
                            if (veclis[1].toString().toLowerCase() == "int" && comprueba.type == 70) {
                                aprobado = true;
                            }
                            else if (veclis[1].toString().toLowerCase() == "double" && comprueba.type == 71) {
                                aprobado = true;
                            }
                            else if (veclis[1].toString().toLowerCase() == "boolean" && comprueba.type == 72) {
                                aprobado = true;
                            }
                            else if (veclis[1].toString().toLowerCase() == "char" && comprueba.type == 73) {
                                aprobado = true;
                            }
                            else if (veclis[1].toString().toLowerCase() == "string" && comprueba.type == 74) {
                                aprobado = true;
                            }
                            else if (veclis[1].toString().toLowerCase() == "int" && comprueba.type == 71) {
                                aprobado = true;
                            }
                            else if (veclis[1].toString().toLowerCase() == "double" && comprueba.type == 70) {
                                aprobado = true;
                            }
                        }
                    }
                    if (!aprobado) {
                        throw new Error_1.Error_(this.line, this.column, "Semántico", "Los tipos de datos de la llamada al método no coinciden con los esperados.");
                    }
                }
                var aux = entorno;
                var env;
                while (entorno != null) {
                    if (entorno.anterior == null)
                        env = entorno;
                    entorno = entorno.anterior;
                }
                entorno = aux;
                var nuevoEntorno = new Entorno_1.Entorno(env, metodo.id);
                for (let i = 0; i < this.parametros.length; i++) {
                    var tipoId = parametros[i].split("-");
                    const value = this.parametros[i].execute(entorno, simbolos);
                    var tipo = -1;
                    if (tipoId[0].toString().toLowerCase() == "int" && value.type == 0) {
                        var tipo = 0;
                    }
                    else if (tipoId[0].toString().toLowerCase() == "double" && value.type == 1) {
                        var tipo = 1;
                    }
                    else if (tipoId[0].toString().toLowerCase() == "boolean" && value.type == 2) {
                        var tipo = 2;
                    }
                    else if (tipoId[0].toString().toLowerCase() == "char" && value.type == 3) {
                        var tipo = 3;
                    }
                    else if (tipoId[0].toString().toLowerCase() == "string" && value.type == 4) {
                        var tipo = 4;
                    }
                    else if (tipoId[0].toString().toLowerCase() == "int" && value.type == 1) {
                        var tipo = 0;
                    }
                    else if (tipoId[0].toString().toLowerCase() == "double" && value.type == 0) {
                        var tipo = 1;
                    }
                    else {
                        var veclis = tipoId[0].split("&");
                        if (veclis[0].toString().toLowerCase() == "vector") {
                            var tipo = -1;
                            if (veclis[1].toString().toLowerCase() == "int" && value.type == 60) {
                                var tipo = 60;
                            }
                            else if (veclis[1].toString().toLowerCase() == "double" && value.type == 61) {
                                var tipo = 61;
                            }
                            else if (veclis[1].toString().toLowerCase() == "boolean" && value.type == 62) {
                                var tipo = 62;
                            }
                            else if (veclis[1].toString().toLowerCase() == "char" && value.type == 63) {
                                var tipo = 63;
                            }
                            else if (veclis[1].toString().toLowerCase() == "string" && value.type == 64) {
                                var tipo = 64;
                            }
                            else if (veclis[1].toString().toLowerCase() == "int" && value.type == 61) {
                                var tipo = 60;
                            }
                            else if (veclis[1].toString().toLowerCase() == "double" && value.type == 60) {
                                var tipo = 61;
                            }
                        }
                        else if (veclis[0].toString().toLowerCase() == "lista") {
                            var tipo = -1;
                            if (veclis[1].toString().toLowerCase() == "int" && value.type == 70) {
                                var tipo = 70;
                            }
                            else if (veclis[1].toString().toLowerCase() == "double" && value.type == 71) {
                                var tipo = 71;
                            }
                            else if (veclis[1].toString().toLowerCase() == "boolean" && value.type == 72) {
                                var tipo = 72;
                            }
                            else if (veclis[1].toString().toLowerCase() == "char" && value.type == 73) {
                                var tipo = 73;
                            }
                            else if (veclis[1].toString().toLowerCase() == "string" && value.type == 74) {
                                var tipo = 74;
                            }
                            else if (veclis[1].toString().toLowerCase() == "int" && value.type == 71) {
                                var tipo = 70;
                            }
                            else if (veclis[1].toString().toLowerCase() == "double" && value.type == 70) {
                                var tipo = 71;
                            }
                        }
                    }
                    if (tipo != -1) {
                        nuevoEntorno.setVariable(tipoId[1], value.value, tipo, this.line, this.column, simbolos);
                    }
                }
                var retorna = metodo.cuerpo.execute(nuevoEntorno, simbolos);
                if (retorna != null || retorna != undefined) {
                    throw new Error_1.Error_(this.line, this.column, "Semántico", "Los métodos no retornan ningún valor.");
                }
            }
        }
    }
}
exports.Llamadas = Llamadas;
//FUNCIONES
class LlamadasFunciones extends Expresion_1.Expresion {
    constructor(id, parametros, linea, columna) {
        super(linea, columna);
        this.id = id;
        this.parametros = parametros;
    }
    execute(entorno, simbolos) {
        const funcion = entorno.getFuncion(this.id);
        if (funcion == null) {
            throw new Error_1.Error_(this.line, this.column, "Semántico", "No se encontró la función: " + this.id);
        }
        else {
            var parametros = [];
            if (funcion.parametros != "") {
                parametros = funcion.parametros.split(",");
            }
            if (parametros.length != this.parametros.length) {
                throw new Error_1.Error_(this.line, this.column, "Semántico", "No coincide la cantidad de parámetros de la llamada con la función.");
            }
            else {
                for (let i = 0; i < this.parametros.length; i++) {
                    var aprobado = false;
                    var tipoId = parametros[i].split("-");
                    var comprueba = this.parametros[i].execute(entorno, simbolos);
                    if (tipoId[0].toString().toLowerCase() == "int" && comprueba.type == 0) {
                        aprobado = true;
                    }
                    else if (tipoId[0].toString().toLowerCase() == "double" && comprueba.type == 1) {
                        aprobado = true;
                    }
                    else if (tipoId[0].toString().toLowerCase() == "boolean" && comprueba.type == 2) {
                        aprobado = true;
                    }
                    else if (tipoId[0].toString().toLowerCase() == "char" && comprueba.type == 3) {
                        aprobado = true;
                    }
                    else if (tipoId[0].toString().toLowerCase() == "string" && comprueba.type == 4) {
                        aprobado = true;
                    }
                    else if (tipoId[0].toString().toLowerCase() == "int" && comprueba.type == 1) {
                        aprobado = true;
                    }
                    else if (tipoId[0].toString().toLowerCase() == "double" && comprueba.type == 0) {
                        aprobado = true;
                    }
                    else {
                        var veclis = tipoId[0].split("&");
                        if (veclis[0].toString().toLowerCase() == "vector") {
                            if (veclis[1].toString().toLowerCase() == "int" && comprueba.type == 60) {
                                aprobado = true;
                            }
                            else if (veclis[1].toString().toLowerCase() == "double" && comprueba.type == 61) {
                                aprobado = true;
                            }
                            else if (veclis[1].toString().toLowerCase() == "boolean" && comprueba.type == 62) {
                                aprobado = true;
                            }
                            else if (veclis[1].toString().toLowerCase() == "char" && comprueba.type == 63) {
                                aprobado = true;
                            }
                            else if (veclis[1].toString().toLowerCase() == "string" && comprueba.type == 64) {
                                aprobado = true;
                            }
                            else if (veclis[1].toString().toLowerCase() == "int" && comprueba.type == 61) {
                                aprobado = true;
                            }
                            else if (veclis[1].toString().toLowerCase() == "double" && comprueba.type == 60) {
                                aprobado = true;
                            }
                        }
                        else if (veclis[0].toString().toLowerCase() == "lista") {
                            if (veclis[1].toString().toLowerCase() == "int" && comprueba.type == 70) {
                                aprobado = true;
                            }
                            else if (veclis[1].toString().toLowerCase() == "double" && comprueba.type == 71) {
                                aprobado = true;
                            }
                            else if (veclis[1].toString().toLowerCase() == "boolean" && comprueba.type == 72) {
                                aprobado = true;
                            }
                            else if (veclis[1].toString().toLowerCase() == "char" && comprueba.type == 73) {
                                aprobado = true;
                            }
                            else if (veclis[1].toString().toLowerCase() == "string" && comprueba.type == 74) {
                                aprobado = true;
                            }
                            else if (veclis[1].toString().toLowerCase() == "int" && comprueba.type == 71) {
                                aprobado = true;
                            }
                            else if (veclis[1].toString().toLowerCase() == "double" && comprueba.type == 70) {
                                aprobado = true;
                            }
                        }
                    }
                    if (!aprobado) {
                        throw new Error_1.Error_(this.line, this.column, "Semántico", "Los tipos de datos de la llamada la función no coinciden con los esperados.");
                    }
                }
                var aux = entorno;
                var env;
                while (entorno != null) {
                    if (entorno.anterior == null)
                        env = entorno;
                    entorno = entorno.anterior;
                }
                entorno = aux;
                var nuevoEntorno = new Entorno_1.Entorno(env, funcion.id);
                for (let i = 0; i < this.parametros.length; i++) {
                    var tipoId = parametros[i].split("-");
                    const value = this.parametros[i].execute(entorno, simbolos);
                    var tipo = -1;
                    if (tipoId[0].toString().toLowerCase() == "int" && value.type == 0) {
                        var tipo = 0;
                    }
                    else if (tipoId[0].toString().toLowerCase() == "double" && value.type == 1) {
                        var tipo = 1;
                    }
                    else if (tipoId[0].toString().toLowerCase() == "boolean" && value.type == 2) {
                        var tipo = 2;
                    }
                    else if (tipoId[0].toString().toLowerCase() == "char" && value.type == 3) {
                        var tipo = 3;
                    }
                    else if (tipoId[0].toString().toLowerCase() == "string" && value.type == 4) {
                        var tipo = 4;
                    }
                    else if (tipoId[0].toString().toLowerCase() == "int" && value.type == 1) {
                        var tipo = 0;
                    }
                    else if (tipoId[0].toString().toLowerCase() == "double" && value.type == 0) {
                        var tipo = 1;
                    }
                    else {
                        var veclis = tipoId[0].split("&");
                        if (veclis[0].toString().toLowerCase() == "vector") {
                            var tipo = -1;
                            if (veclis[1].toString().toLowerCase() == "int" && value.type == 60) {
                                var tipo = 60;
                            }
                            else if (veclis[1].toString().toLowerCase() == "double" && value.type == 61) {
                                var tipo = 61;
                            }
                            else if (veclis[1].toString().toLowerCase() == "boolean" && value.type == 62) {
                                var tipo = 62;
                            }
                            else if (veclis[1].toString().toLowerCase() == "char" && value.type == 63) {
                                var tipo = 63;
                            }
                            else if (veclis[1].toString().toLowerCase() == "string" && value.type == 64) {
                                var tipo = 64;
                            }
                            else if (veclis[1].toString().toLowerCase() == "int" && value.type == 61) {
                                var tipo = 60;
                            }
                            else if (veclis[1].toString().toLowerCase() == "double" && value.type == 60) {
                                var tipo = 61;
                            }
                        }
                        else if (veclis[0].toString().toLowerCase() == "lista") {
                            var tipo = -1;
                            if (veclis[1].toString().toLowerCase() == "int" && value.type == 70) {
                                var tipo = 70;
                            }
                            else if (veclis[1].toString().toLowerCase() == "double" && value.type == 71) {
                                var tipo = 71;
                            }
                            else if (veclis[1].toString().toLowerCase() == "boolean" && value.type == 72) {
                                var tipo = 72;
                            }
                            else if (veclis[1].toString().toLowerCase() == "char" && value.type == 73) {
                                var tipo = 73;
                            }
                            else if (veclis[1].toString().toLowerCase() == "string" && value.type == 74) {
                                var tipo = 74;
                            }
                            else if (veclis[1].toString().toLowerCase() == "int" && value.type == 71) {
                                var tipo = 70;
                            }
                            else if (veclis[1].toString().toLowerCase() == "double" && value.type == 70) {
                                var tipo = 71;
                            }
                        }
                    }
                    if (tipo != -1) {
                        nuevoEntorno.setVariable(tipoId[1], value.value, tipo, this.line, this.column, simbolos);
                    }
                }
                var retorna = funcion.cuerpo.execute(nuevoEntorno, simbolos);
                if (retorna != null || retorna != undefined) {
                    if (retorna == null) {
                        throw new Error_1.Error_(this.line, this.column, "Semántico", "No se permite un retorno de tipo null.");
                    }
                    else {
                        var tipo = -1;
                        if (funcion.tipo.toString().toLowerCase() == "int") {
                            var tipo = 0;
                        }
                        else if (funcion.tipo.toString().toLowerCase() == "double") {
                            var tipo = 1;
                        }
                        else if (funcion.tipo.toString().toLowerCase() == "boolean") {
                            var tipo = 2;
                        }
                        else if (funcion.tipo.toString().toLowerCase() == "char") {
                            var tipo = 3;
                        }
                        else if (funcion.tipo.toString().toLowerCase() == "string") {
                            var tipo = 4;
                        }
                        else if (funcion.tipo.toString().toLowerCase() == "int") {
                            var tipo = 0;
                        }
                        else if (funcion.tipo.toString().toLowerCase() == "double") {
                            var tipo = 1;
                        }
                        else {
                            var vecli = funcion.tipo.split("&");
                            if (vecli[0].toString().toLowerCase() == "vector") {
                                var tipo = -1;
                                if (vecli[1].toString().toLowerCase() == "int") {
                                    var tipo = 60;
                                }
                                else if (vecli[1].toString().toLowerCase() == "double") {
                                    var tipo = 61;
                                }
                                else if (vecli[1].toString().toLowerCase() == "boolean") {
                                    var tipo = 62;
                                }
                                else if (vecli[1].toString().toLowerCase() == "char") {
                                    var tipo = 63;
                                }
                                else if (vecli[1].toString().toLowerCase() == "string") {
                                    var tipo = 64;
                                }
                                else if (vecli[1].toString().toLowerCase() == "int") {
                                    var tipo = 60;
                                }
                                else if (vecli[1].toString().toLowerCase() == "double") {
                                    var tipo = 61;
                                }
                            }
                            else if (vecli[0].toString().toLowerCase() == "lista") {
                                var tipo = -1;
                                if (vecli[1].toString().toLowerCase() == "int") {
                                    var tipo = 70;
                                }
                                else if (vecli[1].toString().toLowerCase() == "double") {
                                    var tipo = 71;
                                }
                                else if (vecli[1].toString().toLowerCase() == "boolean") {
                                    var tipo = 72;
                                }
                                else if (vecli[1].toString().toLowerCase() == "char") {
                                    var tipo = 73;
                                }
                                else if (vecli[1].toString().toLowerCase() == "string") {
                                    var tipo = 74;
                                }
                                else if (vecli[1].toString().toLowerCase() == "int") {
                                    var tipo = 70;
                                }
                                else if (vecli[1].toString().toLowerCase() == "double") {
                                    var tipo = 71;
                                }
                            }
                        }
                        if (retorna.value.type == undefined) {
                            if (retorna.value == "undefined") {
                                return { value: "", type: 4 };
                            }
                            else if (retorna.type != tipo) {
                                if (retorna.value.type != 1 && tipo != 0) {
                                    if (retorna.value.type != 0 && tipo != 1) {
                                        throw new Error_1.Error_(this.line, this.column, "Semántico", "No se permite un retorno de tipo distinto al de la función.");
                                    }
                                }
                            }
                        }
                        else if (retorna.value.value == "undefined") {
                            return { value: "", type: 4 };
                        }
                        else if (retorna.value.type != tipo) {
                            if (retorna.value.type != 1 && tipo != 0) {
                                if (retorna.value.type != 0 && tipo != 1) {
                                    throw new Error_1.Error_(this.line, this.column, "Semántico", "No se permite un retorno de tipo distinto al de la función.");
                                }
                            }
                        }
                    }
                    return retorna.value;
                }
            }
        }
    }
}
exports.LlamadasFunciones = LlamadasFunciones;
//# sourceMappingURL=Llamadas.js.map