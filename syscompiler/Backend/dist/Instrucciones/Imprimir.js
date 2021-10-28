"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Impresiones = exports.Imprimir = void 0;
const Instruccion_1 = require("./Instruccion");
var imprimir = [];
class Imprimir extends Instruccion_1.Instruccion {
    constructor(expresiones, line, column) {
        imprimir = [];
        super(line, column);
        this.expresiones = expresiones;
    }
    execute(entorno, simbolos) {
        for (const expresion of this.expresiones) {
            const value = expresion.execute(entorno, simbolos);
            if (value.type > 10) {
                for (let i = 0; i < value.value.length; i++) {
                    const val = value.value[i].execute(entorno, simbolos);
                    imprimir.push(val.value);
                }
            }
            else {
                imprimir.push(value.value);
            }
        }
    }
}
exports.Imprimir = Imprimir;
class Impresiones {
    getLista() {
        return imprimir;
    }
}
exports.Impresiones = Impresiones;
//# sourceMappingURL=Imprimir.js.map