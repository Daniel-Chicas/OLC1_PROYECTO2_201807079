"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsignacionVector = void 0;
const Error_1 = require("../Error/Error");
const Expresion_1 = require("../Expresiones/Expresion");
class AsignacionVector extends Expresion_1.Expresion {
    constructor(id, pos, line, column) {
        super(line, column);
        this.id = id;
        this.pos = pos;
    }
    execute(entorno) {
        const val = entorno.getVariable(this.id);
        if (val != null) {
            return { value: val.valor, type: val.type };
        }
        else {
            throw new Error_1.Error_(this.line, this.column, "Semántico", "No se encontró la variable: " + this.id);
        }
    }
}
exports.AsignacionVector = AsignacionVector;
//# sourceMappingURL=AsignacionVector.js.map