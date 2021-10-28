"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CuerpoSentencias = void 0;
const Error_1 = require("../Error/Error");
const Instruccion_1 = require("./Instruccion");
const MetodosFunciones_1 = require("./MetodosFunciones");
class CuerpoSentencias extends Instruccion_1.Instruccion {
    constructor(codigo, line, column) {
        super(line, column);
        this.codigo = codigo;
    }
    execute(entorno, simbolos) {
        for (const instruccion of this.codigo) {
            if (instruccion instanceof MetodosFunciones_1.MetodosFunciones) {
                throw new Error_1.Error_(this.line, this.column, "Semántico", "No se permiten funciones anidadas.");
            }
            const elemento = instruccion.execute(entorno, simbolos);
            if (elemento != null || elemento != undefined) {
                return elemento;
            }
        }
    }
}
exports.CuerpoSentencias = CuerpoSentencias;
//# sourceMappingURL=CuerpoSentencias.js.map