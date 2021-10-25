"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Case = void 0;
const Instruccion_1 = require("./Instruccion");
class Case extends Instruccion_1.Instruccion {
    constructor(condicion, cuerpo, line, column) {
        super(line, column);
        this.condicion = condicion;
        this.cuerpo = cuerpo;
    }
    execute(entorno, simbolos) {
        const condicion = this.condicion;
        const cuerpo = this.cuerpo;
        return { condicion: condicion, cuerpo: cuerpo };
    }
}
exports.Case = Case;
//# sourceMappingURL=Case.js.map