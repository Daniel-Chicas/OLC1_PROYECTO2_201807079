"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Casteo = void 0;
const Error_1 = require("../Error/Error");
const Expresion_1 = require("./Expresion");
const Retorno_1 = require("./Retorno");
class Casteo extends Expresion_1.Expresion {
    constructor(tipoCasteo, value, line, column) {
        super(line, column);
        this.tipoCasteo = tipoCasteo;
        this.value = value;
    }
    execute(entorno) {
        const valor = this.value.execute(entorno);
        if (valor.type == Retorno_1.Type.ENTERO && this.tipoCasteo.toLowerCase() == "double") {
            //console.log(Number((valor.value).toFixed(2)))
            return { value: Number((valor.value).toFixed(2)), type: Retorno_1.Type.DOUBLE };
        }
        else if (valor.type == Retorno_1.Type.ENTERO && this.tipoCasteo.toLowerCase() == "char") {
            //console.log(String.fromCharCode(valor.value))
            return { value: String.fromCharCode(valor.value), type: Retorno_1.Type.CHAR };
        }
        else if (valor.type == Retorno_1.Type.DOUBLE && this.tipoCasteo.toLowerCase() == "int") {
            //console.log(valor.value | 0)
            return { value: valor.value | 0, type: Retorno_1.Type.ENTERO };
        }
        else if (valor.type == Retorno_1.Type.CHAR && this.tipoCasteo.toLowerCase() == "int") {
            //console.log(valor.value.charCodeAt(0))
            return { value: valor.value.charCodeAt(0) | 0, type: Retorno_1.Type.ENTERO };
        }
        else if (valor.type == Retorno_1.Type.CHAR && this.tipoCasteo.toLowerCase() == "double") {
            //console.log(Number(valor.value.charCodeAt(0).toFixed(2)))
            return { value: Number(valor.value.charCodeAt(0).toFixed(2)), type: Retorno_1.Type.DOUBLE };
        }
        throw new Error_1.Error_(this.line, this.column, "Semántico", "No es posible convertir el valor: " + valor.type + ", al tipo: " + this.tipoCasteo);
    }
}
exports.Casteo = Casteo;
//# sourceMappingURL=Casteo.js.map