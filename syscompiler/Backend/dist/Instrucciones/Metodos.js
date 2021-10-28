"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetodosFunciones = void 0;
const Instruccion_1 = require("./Instruccion");
class MetodosFunciones extends Instruccion_1.Instruccion {
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
exports.MetodosFunciones = MetodosFunciones;
//# sourceMappingURL=Metodos.js.map