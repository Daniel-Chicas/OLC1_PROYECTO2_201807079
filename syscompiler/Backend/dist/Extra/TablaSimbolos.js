"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TablaSimbolos = void 0;
class TablaSimbolos {
    constructor(id, tipo, dato, entorno, linea, columna) {
        this.id = id;
        this.tipo = tipo;
        this.dato = dato;
        this.entorno = entorno;
        this.linea = linea;
        this.columna = columna;
    }
    setVariable(id, tipo, dato, entorno, linea, columna) {
        var simbolo = new TablaSimbolos(id, tipo, dato, entorno, linea, columna);
        console.log(simbolo);
    }
    getLista() {
        return TablaSimbolos.data;
    }
}
exports.TablaSimbolos = TablaSimbolos;
//# sourceMappingURL=TablaSimbolos.js.map