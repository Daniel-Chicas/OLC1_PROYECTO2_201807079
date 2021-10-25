"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Return = exports.Continue = exports.Break = void 0;
const Instruccion_1 = require("./Instruccion");
class Break extends Instruccion_1.Instruccion {
    constructor(line, column) {
        super(line, column);
    }
    execute(entorno) {
        return { type: "break", line: this.line, column: this.column };
    }
}
exports.Break = Break;
class Continue extends Instruccion_1.Instruccion {
    constructor(line, column) {
        super(line, column);
    }
    execute(entorno) {
        return { type: "continue", line: this.line, column: this.column };
    }
}
exports.Continue = Continue;
class Return extends Instruccion_1.Instruccion {
    constructor(devuelve, line, column) {
        super(line, column);
        this.devuelve = devuelve;
    }
    execute(entorno, simbolos) {
        var value = this.devuelve.execute(entorno, simbolos);
        return { value: value, type: "return", line: this.line, column: this.column };
    }
}
exports.Return = Return;
//# sourceMappingURL=SentenciasTransferencia.js.map