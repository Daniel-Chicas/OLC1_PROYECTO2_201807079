"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Metodos = void 0;
const Instruccion_1 = require("./Instruccion");
class Metodos extends Instruccion_1.Instruccion {
    constructor(id, parametros, cuerpo, line, column) {
        super(line, column);
        this.id = id;
        this.parametros = parametros;
        this.cuerpo = cuerpo;
    }
    execute(entorno, simbolos) {
        entorno.guardarMetodo(this.id, this);
    }
}
exports.Metodos = Metodos;
//# sourceMappingURL=Metodos.js.map