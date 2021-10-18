"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entorno = void 0;
const Error_1 = require("../Error/Error");
const Simbolo_1 = require("./Simbolo");
class Entorno {
    constructor(anterior, id) {
        this.anterior = anterior;
        this.id = id;
        this.variables = new Map();
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
    setVariable(id, valor, type, line, column) {
        let env = this;
        while (env != null) {
            if (env.variables.has(id)) {
                const variable = env.variables.get(id);
                if (variable.type == type) {
                    env.variables.set(id, new Simbolo_1.Simbolo(valor, id, type));
                }
                else {
                    throw new Error_1.Error_(line, column, "Semántico", "No se puede ligar un nuevo tipo a la variable: " + id + ". Linea: " + line + ", Columna: " + column + ".");
                }
            }
            env = env.anterior;
        }
        this.variables.set(id, new Simbolo_1.Simbolo(valor, id, type));
    }
}
exports.Entorno = Entorno;
//# sourceMappingURL=Entorno.js.map