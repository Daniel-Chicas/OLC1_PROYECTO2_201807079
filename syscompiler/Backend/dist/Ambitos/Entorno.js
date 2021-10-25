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
            var simbTab = new simboloT_1.simboloT(id, "VARIABLE", "ENTERO", this.id, line, column);
            tabla.setVariable(simbTab, id + "-" + this.id);
        }
        else if (type == Retorno_1.Type.DOUBLE) {
            var simbTab = new simboloT_1.simboloT(id, "VARIABLE", "DECIMAL", this.id, line, column);
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
            var simbTab = new simboloT_1.simboloT(id, "VECTOR", "ENTERO", this.id, line, column);
            tabla.setVariable(simbTab, id + "-" + this.id);
        }
        else if (type == Retorno_1.Type.VECTORDOU) {
            var simbTab = new simboloT_1.simboloT(id, "VECTOR", "DECIMAL", this.id, line, column);
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
            var simbTab = new simboloT_1.simboloT(id, "LISTA", "ENTERO", this.id, line, column);
            tabla.setVariable(simbTab, id + "-" + this.id);
        }
        else if (type == Retorno_1.Type.LISTADOU) {
            var simbTab = new simboloT_1.simboloT(id, "LISTA", "DECIMAL", this.id, line, column);
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
        else if (type == Retorno_1.Type.COMENTARIO) {
            var simbTab = new simboloT_1.simboloT(id, "COMENTARIO", "COMENTARIO", this.id, line, column);
            tabla.setVariable(simbTab, id + "-" + this.id);
        }
    }
    guardarMetodo(id, metodo) {
        this.metodos.set(id, metodo);
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
}
exports.Entorno = Entorno;
//# sourceMappingURL=Entorno.js.map