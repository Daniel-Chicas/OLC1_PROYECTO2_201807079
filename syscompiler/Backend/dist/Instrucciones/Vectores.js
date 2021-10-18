"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vectores = void 0;
const Error_1 = require("../Error/Error");
const Instruccion_1 = require("./Instruccion");
class Vectores extends Instruccion_1.Instruccion {
    constructor(Izquierda, Derecha, line, column) {
        super(line, column);
        this.Izquierda = Izquierda;
        this.Derecha = Derecha;
    }
    execute(entorno) {
        var der = this.Derecha.execute(entorno);
        var izq = this.Izquierda.execute(entorno);
        if (der.type == izq.type) {
            return { value: izq.value + "|" + der.value, type: der.type };
        }
        else {
            throw new Error_1.Error_(this.line, this.column, "Semántico", "No es posible asignar distintos tipos de datos en un vector.");
        }
    }
}
exports.Vectores = Vectores;
//# sourceMappingURL=Vectores.js.map