"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Expresion = void 0;
const Retorno_1 = require("./Retorno");
class Expresion {
    constructor(line, column) {
        this.line = line;
        this.column = column;
    }
    tipoSum(tipo1, tipo2) {
        return Retorno_1.tiposSuma[tipo1][tipo2];
    }
    tipoRes(tipo1, tipo2) {
        return Retorno_1.tiposResta[tipo1][tipo2];
    }
    tipoMul(tipo1, tipo2) {
        return Retorno_1.tiposMultiplicacion[tipo1][tipo2];
    }
    tipoDiv(tipo1, tipo2) {
        return Retorno_1.tiposDivision[tipo1][tipo2];
    }
    tipoPot(tipo1, tipo2) {
        return Retorno_1.tiposPotencia[tipo1][tipo2];
    }
    tipoMod(tipo1, tipo2) {
        return Retorno_1.tiposModulo[tipo1][tipo2];
    }
}
exports.Expresion = Expresion;
//# sourceMappingURL=Expresion.js.map