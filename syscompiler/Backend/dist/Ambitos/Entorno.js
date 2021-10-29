"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entorno = void 0;
const Error_1 = require("../Error/Error");
const Retorno_1 = require("../Expresiones/Retorno");
const simboloT_1 = require("../Reportes/simboloT");
const Simbolo_1 = require("./Simbolo");
class Entorno {
    constructor(anterior, id) {
        this.anterior = anterior;
        this.id = id;
        this.variables = new Map();
        this.metodos = new Map();
        this.funciones = new Map();
    }
    getVariable(id) {
        let env = this;
        while (env != null) {
            if (env.variables.has(id)) {
                return env.variables.get(id);
            }
            env = env.anterior;
        }
        return null;
    }
    setVariable(id, valor, type, line, column, tabla) {
        var existe = false;
        let env = this;
        while (env != null) {
            if (env.variables.has(id)) {
                const variable = env.variables.get(id);
                if (variable.type == type) {
                    existe = true;
                    env.variables.set(id, new Simbolo_1.Simbolo(valor, id, type, line, column));
                }
                else {
                    throw new Error_1.Error_(line, column, "Semántico", "No se puede ligar un nuevo tipo a la variable: " + id + ". Linea: " + line + ", Columna: " + column + ".");
                }
            }
            env = env.anterior;
        }
        this.variables.set(id, new Simbolo_1.Simbolo(valor, id, type, line, column));
        if (type == Retorno_1.Type.ENTERO) {
            var simbTab = new simboloT_1.simboloT(id, "VARIABLE", "INT", this.id, line, column);
            tabla.setVariable(simbTab, id + "-" + this.id);
        }
        else if (type == Retorno_1.Type.DOUBLE) {
            var simbTab = new simboloT_1.simboloT(id, "VARIABLE", "DOUBLE", this.id, line, column);
            tabla.setVariable(simbTab, id + "-" + this.id);
        }
        else if (type == Retorno_1.Type.BOOLEAN) {
            var simbTab = new simboloT_1.simboloT(id, "VARIABLE", "BOOLEAN", this.id, line, column);
            tabla.setVariable(simbTab, id + "-" + this.id);
        }
        else if (type == Retorno_1.Type.CHAR) {
            var simbTab = new simboloT_1.simboloT(id, "VARIABLE", "CHAR", this.id, line, column);
            tabla.setVariable(simbTab, id + "-" + this.id);
        }
        else if (type == Retorno_1.Type.CADENA) {
            var simbTab = new simboloT_1.simboloT(id, "VARIABLE", "STRING", this.id, line, column);
            tabla.setVariable(simbTab, id + "-" + this.id);
        }
        else if (type == Retorno_1.Type.VECTORENT) {
            var simbTab = new simboloT_1.simboloT(id, "VECTOR", "INT", this.id, line, column);
            tabla.setVariable(simbTab, id + "-" + this.id);
        }
        else if (type == Retorno_1.Type.VECTORDOU) {
            var simbTab = new simboloT_1.simboloT(id, "VECTOR", "DOUBLE", this.id, line, column);
            tabla.setVariable(simbTab, id + "-" + this.id);
        }
        else if (type == Retorno_1.Type.VECTORBOO) {
            var simbTab = new simboloT_1.simboloT(id, "VECTOR", "BOOLEAN", this.id, line, column);
            tabla.setVariable(simbTab, id + "-" + this.id);
        }
        else if (type == Retorno_1.Type.VECTORCHA) {
            var simbTab = new simboloT_1.simboloT(id, "VECTOR", "CHAR", this.id, line, column);
            tabla.setVariable(simbTab, id + "-" + this.id);
        }
        else if (type == Retorno_1.Type.VECTORCAD) {
            var simbTab = new simboloT_1.simboloT(id, "VECTOR", "STRING", this.id, line, column);
            tabla.setVariable(simbTab, id + "-" + this.id);
        }
        else if (type == Retorno_1.Type.LISTAENT) {
            var simbTab = new simboloT_1.simboloT(id, "LISTA", "INT", this.id, line, column);
            tabla.setVariable(simbTab, id + "-" + this.id);
        }
        else if (type == Retorno_1.Type.LISTADOU) {
            var simbTab = new simboloT_1.simboloT(id, "LISTA", "DOUBLE", this.id, line, column);
            tabla.setVariable(simbTab, id + "-" + this.id);
        }
        else if (type == Retorno_1.Type.LISTABOO) {
            var simbTab = new simboloT_1.simboloT(id, "LISTA", "BOOLEAN", this.id, line, column);
            tabla.setVariable(simbTab, id + "-" + this.id);
        }
        else if (type == Retorno_1.Type.LISTACHA) {
            var simbTab = new simboloT_1.simboloT(id, "LISTA", "CHAR", this.id, line, column);
            tabla.setVariable(simbTab, id + "-" + this.id);
        }
        else if (type == Retorno_1.Type.LISTACAD) {
            var simbTab = new simboloT_1.simboloT(id, "LISTA", "STRING", this.id, line, column);
            tabla.setVariable(simbTab, id + "-" + this.id);
        }
    }
    guardarMetodo(id, metodo, tabla) {
        this.metodos.set(id, metodo);
        var simbTab = new simboloT_1.simboloT(id, "MÉTODO", "VOID", this.id, metodo.line, metodo.column);
        tabla.setVariable(simbTab, id + "-" + this.id);
    }
    guardarFuncion(id, funcion, tabla) {
        this.funciones.set(id, funcion);
        if (funcion.tipo.toString().toLowerCase() == "int") {
            var simbTab = new simboloT_1.simboloT(id, "FUNCION", "INT", this.id, funcion.line, funcion.column);
            tabla.setVariable(simbTab, id + "-" + this.id);
        }
        else if (funcion.tipo.toString().toLowerCase() == "double") {
            var simbTab = new simboloT_1.simboloT(id, "FUNCION", "DOUBLE", this.id, funcion.line, funcion.column);
            tabla.setVariable(simbTab, id + "-" + this.id);
        }
        else if (funcion.tipo.toString().toLowerCase() == "boolean") {
            var simbTab = new simboloT_1.simboloT(id, "FUNCION", "BOOLEAN", this.id, funcion.line, funcion.column);
            tabla.setVariable(simbTab, id + "-" + this.id);
        }
        else if (funcion.tipo.toString().toLowerCase() == "char") {
            var simbTab = new simboloT_1.simboloT(id, "FUNCION", "CHAR", this.id, funcion.line, funcion.column);
            tabla.setVariable(simbTab, id + "-" + this.id);
        }
        else if (funcion.tipo.toString().toLowerCase() == "string") {
            var simbTab = new simboloT_1.simboloT(id, "FUNCION", "STRING", this.id, funcion.line, funcion.column);
            tabla.setVariable(simbTab, id + "-" + this.id);
        }
        else if (funcion.tipo.toString().toLowerCase() == "int") {
            var simbTab = new simboloT_1.simboloT(id, "FUNCION", "INT", this.id, funcion.line, funcion.column);
            tabla.setVariable(simbTab, id + "-" + this.id);
        }
        else if (funcion.tipo.toString().toLowerCase() == "double") {
            var simbTab = new simboloT_1.simboloT(id, "FUNCION", "DOUBLE", this.id, funcion.line, funcion.column);
            tabla.setVariable(simbTab, id + "-" + this.id);
        }
        else {
            var vecli = funcion.tipo.split("&");
            if (vecli[0].toString().toLowerCase() == "vector") {
                if (vecli[1].toString().toLowerCase() == "int") {
                    var simbTab = new simboloT_1.simboloT(id, "FUNCION", "VECTOR INT", this.id, funcion.line, funcion.column);
                    tabla.setVariable(simbTab, id + "-" + this.id);
                }
                else if (vecli[1].toString().toLowerCase() == "double") {
                    var simbTab = new simboloT_1.simboloT(id, "FUNCION", "VECTOR DOUBLE", this.id, funcion.line, funcion.column);
                    tabla.setVariable(simbTab, id + "-" + this.id);
                }
                else if (vecli[1].toString().toLowerCase() == "boolean") {
                    var simbTab = new simboloT_1.simboloT(id, "FUNCION", "VECTOR BOOLEAN", this.id, funcion.line, funcion.column);
                    tabla.setVariable(simbTab, id + "-" + this.id);
                }
                else if (vecli[1].toString().toLowerCase() == "char") {
                    var simbTab = new simboloT_1.simboloT(id, "FUNCION", "VECTOR CHAR", this.id, funcion.line, funcion.column);
                    tabla.setVariable(simbTab, id + "-" + this.id);
                }
                else if (vecli[1].toString().toLowerCase() == "string") {
                    var simbTab = new simboloT_1.simboloT(id, "FUNCION", "VECTOR STRING", this.id, funcion.line, funcion.column);
                    tabla.setVariable(simbTab, id + "-" + this.id);
                }
                else if (vecli[1].toString().toLowerCase() == "int") {
                    var simbTab = new simboloT_1.simboloT(id, "FUNCION", "VECTOR INT", this.id, funcion.line, funcion.column);
                    tabla.setVariable(simbTab, id + "-" + this.id);
                }
                else if (vecli[1].toString().toLowerCase() == "double") {
                    var simbTab = new simboloT_1.simboloT(id, "FUNCION", "VECTOR DOUBLE", this.id, funcion.line, funcion.column);
                    tabla.setVariable(simbTab, id + "-" + this.id);
                }
            }
            else if (vecli[0].toString().toLowerCase() == "lista") {
                if (vecli[1].toString().toLowerCase() == "int") {
                    var simbTab = new simboloT_1.simboloT(id, "FUNCION", "LISTA INT", this.id, funcion.line, funcion.column);
                    tabla.setVariable(simbTab, id + "-" + this.id);
                }
                else if (vecli[1].toString().toLowerCase() == "double") {
                    var simbTab = new simboloT_1.simboloT(id, "FUNCION", "LISTA DOUBLE", this.id, funcion.line, funcion.column);
                    tabla.setVariable(simbTab, id + "-" + this.id);
                }
                else if (vecli[1].toString().toLowerCase() == "boolean") {
                    var simbTab = new simboloT_1.simboloT(id, "FUNCION", "LISTA BOOLEAN", this.id, funcion.line, funcion.column);
                    tabla.setVariable(simbTab, id + "-" + this.id);
                }
                else if (vecli[1].toString().toLowerCase() == "char") {
                    var simbTab = new simboloT_1.simboloT(id, "FUNCION", "LISTA CHAR", this.id, funcion.line, funcion.column);
                    tabla.setVariable(simbTab, id + "-" + this.id);
                }
                else if (vecli[1].toString().toLowerCase() == "string") {
                    var simbTab = new simboloT_1.simboloT(id, "FUNCION", "LISTA STRING", this.id, funcion.line, funcion.column);
                    tabla.setVariable(simbTab, id + "-" + this.id);
                }
                else if (vecli[1].toString().toLowerCase() == "int") {
                    var simbTab = new simboloT_1.simboloT(id, "FUNCION", "LISTA INT", this.id, funcion.line, funcion.column);
                    tabla.setVariable(simbTab, id + "-" + this.id);
                }
                else if (vecli[1].toString().toLowerCase() == "double") {
                    var simbTab = new simboloT_1.simboloT(id, "FUNCION", "LISTA DOUBLE", this.id, funcion.line, funcion.column);
                    tabla.setVariable(simbTab, id + "-" + this.id);
                }
            }
        }
    }
    getMetodo(id) {
        let env = this;
        while (env != null) {
            if (env.metodos.has(id)) {
                return env.metodos.get(id);
            }
            env = env.anterior;
        }
        return null;
    }
    getFuncion(id) {
        let env = this;
        while (env != null) {
            if (env.funciones.has(id)) {
                return env.funciones.get(id);
            }
            env = env.anterior;
        }
        return null;
    }
}
exports.Entorno = Entorno;
//# sourceMappingURL=Entorno.js.map