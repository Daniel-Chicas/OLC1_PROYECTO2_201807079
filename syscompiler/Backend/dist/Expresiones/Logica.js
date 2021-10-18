"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TipoLogica = exports.Logica = void 0;
const Expresion_1 = require("./Expresion");
const Retorno_1 = require("./Retorno");
const Error_1 = require("../Error/Error");
class Logica extends Expresion_1.Expresion {
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
        if (this.tipo == TipoLogica.AND) {
            const result = leftValue.value && rightValue.value;
            return { value: result, type: Retorno_1.Type.BOOLEAN };
        }
        else if (this.tipo == TipoLogica.OR) {
            const result = leftValue.value && rightValue.value;
            return { value: result, type: Retorno_1.Type.BOOLEAN };
        }
        else if (this.tipo == TipoLogica.NOT) {
            const result = !leftValue.value;
            return { value: result, type: Retorno_1.Type.BOOLEAN };
        }
        throw new Error_1.Error_(this.line, this.column, 'Semantico', 'No se puede operar: ' + leftValue.value + ' y ' + rightValue.value);
    }
}
exports.Logica = Logica;
var TipoLogica;
(function (TipoLogica) {
    TipoLogica[TipoLogica["AND"] = 0] = "AND";
    TipoLogica[TipoLogica["OR"] = 1] = "OR";
    TipoLogica[TipoLogica["NOT"] = 2] = "NOT";
})(TipoLogica = exports.TipoLogica || (exports.TipoLogica = {}));
//# sourceMappingURL=Logica.js.map