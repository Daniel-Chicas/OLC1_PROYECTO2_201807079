"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Funciones = void 0;
const Expresion_1 = require("../Expresiones/Expresion");
class Funciones extends Expresion_1.Expresion {
    constructor(tipo, id, value, line, column) {
        super(line, column);
        this.tipo = tipo;
        this.id = id;
        this.value = value;
    }
    execute(entorno, simbolos) {
        return { value: "", type: 0 };
    }
}
exports.Funciones = Funciones;
//# sourceMappingURL=Funciones.js.map