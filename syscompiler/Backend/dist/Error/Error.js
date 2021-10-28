"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Error_ = void 0;
var lista = [];
class Error_ {
    constructor(linea, columna, tipo, mensaje) {
        this.linea = linea;
        this.columna = columna;
        this.tipo = tipo;
        this.mensaje = mensaje;
    }
    setError(error) {
        lista.push(error);
    }
    getLista() {
        return lista;
    }
}
exports.Error_ = Error_;
//# sourceMappingURL=Error.js.map