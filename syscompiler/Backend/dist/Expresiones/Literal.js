"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TipoLiteral = exports.Literal = void 0;
const Expresion_1 = require("./Expresion");
const Retorno_1 = require("./Retorno");
//const { Expresion } = require('./Expresion')
//const { Retorno, Type } = require('./Retorno')
class Literal extends Expresion_1.Expresion {
    constructor(value, tipo, line, column) {
        super(line, column);
        this.value = value;
        this.tipo = tipo;
    }
    execute(entorno) {
        if (this.tipo == 0) {
            return { value: Number(this.value), type: Retorno_1.Type.ENTERO };
        }
        else if (this.tipo == 1) {
            return { value: Number(this.value), type: Retorno_1.Type.DOUBLE };
        }
        else if (this.tipo == 2) {
            if (this.value.toString().toLowerCase() == "true") {
                return { value: true, type: Retorno_1.Type.BOOLEAN };
            }
            return { value: false, type: Retorno_1.Type.BOOLEAN };
        }
        else if (this.tipo == 3) {
            return { value: this.value.toString(), type: Retorno_1.Type.CHAR };
        }
        else if (this.tipo == 4) {
            return { value: this.value.toString(), type: Retorno_1.Type.CADENA };
        }
        return { value: "ERROR", type: Retorno_1.Type.ERROR };
    }
}
exports.Literal = Literal;
var TipoLiteral;
(function (TipoLiteral) {
    TipoLiteral[TipoLiteral["ENTERO"] = 0] = "ENTERO";
    TipoLiteral[TipoLiteral["DOUBLE"] = 1] = "DOUBLE";
    TipoLiteral[TipoLiteral["BOOLEAN"] = 2] = "BOOLEAN";
    TipoLiteral[TipoLiteral["CHAR"] = 3] = "CHAR";
    TipoLiteral[TipoLiteral["CADENA"] = 4] = "CADENA";
    TipoLiteral[TipoLiteral["ERROR"] = 5] = "ERROR";
})(TipoLiteral = exports.TipoLiteral || (exports.TipoLiteral = {}));
//# sourceMappingURL=Literal.js.map