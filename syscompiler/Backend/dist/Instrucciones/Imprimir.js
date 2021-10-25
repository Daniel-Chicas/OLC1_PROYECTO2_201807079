"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Imprimir = void 0;
const Instruccion_1 = require("./Instruccion");
class Imprimir extends Instruccion_1.Instruccion {
    constructor(expresiones, line, column) {
        super(line, column);
        this.expresiones = expresiones;
    }
    execute(entorno, simbolos) {
        for (const expresion of this.expresiones) {
            const value = expresion.execute(entorno, simbolos);
            console.log(value.value);
        }
    }
}
exports.Imprimir = Imprimir;
//# sourceMappingURL=Imprimir.js.map