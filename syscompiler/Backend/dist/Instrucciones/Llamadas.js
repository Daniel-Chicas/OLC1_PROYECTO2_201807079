"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Llamadas = void 0;
const Entorno_1 = require("../Ambitos/Entorno");
const Error_1 = require("../Error/Error");
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
                var nuevoEntorno = new Entorno_1.Entorno(entorno, "llamada funcion");
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
                metodo.cuerpo.execute(nuevoEntorno, simbolos);
            }
        }
    }
}
exports.Llamadas = Llamadas;
//# sourceMappingURL=Llamadas.js.map