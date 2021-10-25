"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IfAlterno = exports.If = void 0;
const Entorno_1 = require("../Ambitos/Entorno");
const Error_1 = require("../Error/Error");
const Expresion_1 = require("../Expresiones/Expresion");
const Retorno_1 = require("../Expresiones/Retorno");
const Instruccion_1 = require("./Instruccion");
class If extends Instruccion_1.Instruccion {
    constructor(condicion, cuerpo, Else, line, column) {
        super(line, column);
        this.condicion = condicion;
        this.cuerpo = cuerpo;
        this.Else = Else;
    }
    execute(entorno, simbolos) {
        var nuevoEntorno = new Entorno_1.Entorno(entorno, "If");
        const valor = this.condicion.execute(nuevoEntorno, simbolos);
        if (valor.type != Retorno_1.Type.BOOLEAN) {
            throw new Error_1.Error_(this.line, this.column, "Semántico", "La condición a evaluar en el if no es de tipo boolean.");
        }
        else {
            if (valor.value) {
                return this.cuerpo.execute(nuevoEntorno, simbolos);
            }
            else if (this.Else != null) {
                var nuevoEntorno = new Entorno_1.Entorno(entorno, "else");
                return this.Else.execute(nuevoEntorno, simbolos);
            }
        }
    }
}
exports.If = If;
class IfAlterno extends Expresion_1.Expresion {
    constructor(condicion, cuerpo, Else, line, column) {
        super(line, column);
        this.condicion = condicion;
        this.cuerpo = cuerpo;
        this.Else = Else;
    }
    execute(entorno, simbolos) {
        var nuevoEntorno = new Entorno_1.Entorno(entorno, "If");
        const valor = this.condicion.execute(nuevoEntorno, simbolos);
        if (valor.type != Retorno_1.Type.BOOLEAN) {
            throw new Error_1.Error_(this.line, this.column, "Semántico", "La condición a evaluar en el if no es de tipo boolean.");
        }
        else {
            if (valor.value) {
                var value = this.cuerpo.execute(nuevoEntorno, simbolos);
                return { value: value.value, type: value.type };
            }
            else if (this.Else != null) {
                var nuevoEntorno = new Entorno_1.Entorno(entorno, "else");
                var valueElse = this.Else.execute(nuevoEntorno, simbolos);
                return { value: valueElse.value, type: valueElse.type };
            }
        }
    }
}
exports.IfAlterno = IfAlterno;
//# sourceMappingURL=If.js.map