"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoWhile = void 0;
const Entorno_1 = require("../Ambitos/Entorno");
const Error_1 = require("../Error/Error");
const Retorno_1 = require("../Expresiones/Retorno");
const Instruccion_1 = require("./Instruccion");
class DoWhile extends Instruccion_1.Instruccion {
    constructor(condicion, cuerpo, line, column) {
        super(line, column);
        this.condicion = condicion;
        this.cuerpo = cuerpo;
    }
    execute(entorno, simbolos) {
        var nuevoEntorno = new Entorno_1.Entorno(entorno, "Do-While");
        var value = this.condicion.execute(nuevoEntorno, simbolos);
        if (value.type != Retorno_1.Type.BOOLEAN) {
            throw new Error_1.Error_(this.line, this.column, "Semántico", "La condición a evaluar en el if no es de tipo boolean.");
        }
        else {
            do {
                const retorno = this.cuerpo.execute(nuevoEntorno, simbolos);
                if (retorno != null || retorno != undefined) {
                    if (retorno.type == "break") {
                        break;
                    }
                    else if (retorno.type == "continue") {
                        continue;
                    }
                    else if (retorno.type == "return") {
                        return retorno.value;
                    }
                }
                value = this.condicion.execute(nuevoEntorno, simbolos);
            } while (value.value);
        }
    }
}
exports.DoWhile = DoWhile;
//# sourceMappingURL=DoWhile.js.map