"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.For = void 0;
const Entorno_1 = require("../Ambitos/Entorno");
const Error_1 = require("../Error/Error");
const Retorno_1 = require("../Expresiones/Retorno");
const Instruccion_1 = require("./Instruccion");
class For extends Instruccion_1.Instruccion {
    constructor(variable, condicion, actualizacion, cuerpo, line, column) {
        super(line, column);
        this.variable = variable;
        this.condicion = condicion;
        this.actualizacion = actualizacion;
        this.cuerpo = cuerpo;
    }
    execute(entorno, simbolos) {
        var nuevoEntorno = new Entorno_1.Entorno(entorno, "For");
        this.variable.execute(nuevoEntorno, simbolos);
        var value = this.condicion.execute(nuevoEntorno, simbolos);
        if (value.type != Retorno_1.Type.BOOLEAN) {
            throw new Error_1.Error_(this.line, this.column, "Semántico", "La condición a evaluar en el if no es de tipo boolean.");
        }
        else {
            while (value.value) {
                const retorno = this.cuerpo.execute(nuevoEntorno, simbolos);
                if (retorno != null || retorno != undefined) {
                    if (retorno.type == "break") {
                        break;
                    }
                    else if (retorno.type == "continue") {
                        this.actualizacion.execute(nuevoEntorno, simbolos);
                        value = this.condicion.execute(nuevoEntorno, simbolos);
                        continue;
                    }
                    else if (retorno.type == "return") {
                        return retorno.value;
                    }
                }
                else {
                    this.actualizacion.execute(nuevoEntorno, simbolos);
                }
                value = this.condicion.execute(nuevoEntorno, simbolos);
            }
        }
    }
}
exports.For = For;
//# sourceMappingURL=For.js.map