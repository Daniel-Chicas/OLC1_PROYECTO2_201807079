"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CuerpoSentencias = void 0;
const Entorno_1 = require("../Ambitos/Entorno");
const Error_1 = require("../Error/Error");
const Instruccion_1 = require("./Instruccion");
const Metodos_1 = require("./Metodos");
class CuerpoSentencias extends Instruccion_1.Instruccion {
    constructor(codigo, line, column) {
        super(line, column);
        this.codigo = codigo;
    }
    execute(entorno, simbolos) {
        const sentencia = new Entorno_1.Entorno(entorno, "Sentencia");
        for (const instruccion of this.codigo) {
            try {
                if (instruccion instanceof Metodos_1.Metodos) {
                    throw new Error_1.Error_(this.line, this.column, "Semántico", "No se permiten funciones anidadas.");
                }
                const elemento = instruccion.execute(sentencia, simbolos);
                if (elemento != null || elemento != undefined) {
                    return elemento;
                }
            }
            catch (error) {
                console.log(error);
            }
        }
    }
}
exports.CuerpoSentencias = CuerpoSentencias;
//# sourceMappingURL=CuerpoSentencias.js.map