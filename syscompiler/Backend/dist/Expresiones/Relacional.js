"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TipoRelacional = exports.Relacional = void 0;
const Expresion_1 = require("./Expresion");
const Retorno_1 = require("./Retorno");
const Error_1 = require("../Error/Error");
class Relacional extends Expresion_1.Expresion {
    constructor(left, right, tipo, line, column) {
        super(line, column);
        this.left = left;
        this.right = right;
        this.tipo = tipo;
        //var x = this.execute();
        //console.log(x)
    }
    execute(entorno) {
        const leftValue = this.left.execute(entorno);
        const rightValue = this.right.execute(entorno);
        if (this.tipo == TipoRelacional.IGUAL) {
            const result = leftValue.value == rightValue.value;
            return { value: result, type: Retorno_1.Type.BOOLEAN };
        }
        else if (this.tipo == TipoRelacional.DIFERENCIA) {
            const result = leftValue.value != rightValue.value;
            return { value: result, type: Retorno_1.Type.BOOLEAN };
        }
        else if (this.tipo == TipoRelacional.MENOR) {
            const result = leftValue.value < rightValue.value;
            return { value: result, type: Retorno_1.Type.BOOLEAN };
        }
        else if (this.tipo == TipoRelacional.MENORI) {
            const result = leftValue.value <= rightValue.value;
            return { value: result, type: Retorno_1.Type.BOOLEAN };
        }
        else if (this.tipo == TipoRelacional.MAYOR) {
            const result = leftValue.value > rightValue.value;
            return { value: result, type: Retorno_1.Type.BOOLEAN };
        }
        else if (this.tipo == TipoRelacional.MAYORI) {
            const result = leftValue.value >= rightValue.value;
            return { value: result, type: Retorno_1.Type.BOOLEAN };
        }
        throw new Error_1.Error_(this.line, this.column, 'Semantico', 'No se puede operar: ' + leftValue.value + ' y ' + rightValue.value);
    }
}
exports.Relacional = Relacional;
var TipoRelacional;
(function (TipoRelacional) {
    TipoRelacional[TipoRelacional["IGUAL"] = 0] = "IGUAL";
    TipoRelacional[TipoRelacional["DIFERENCIA"] = 1] = "DIFERENCIA";
    TipoRelacional[TipoRelacional["MENOR"] = 2] = "MENOR";
    TipoRelacional[TipoRelacional["MENORI"] = 3] = "MENORI";
    TipoRelacional[TipoRelacional["MAYOR"] = 4] = "MAYOR";
    TipoRelacional[TipoRelacional["MAYORI"] = 5] = "MAYORI";
})(TipoRelacional = exports.TipoRelacional || (exports.TipoRelacional = {}));
//# sourceMappingURL=Relacional.js.map