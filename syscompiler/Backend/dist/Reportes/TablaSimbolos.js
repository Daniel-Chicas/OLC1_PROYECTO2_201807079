"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TablaSimbolos = void 0;
class TablaSimbolos {
    constructor(simbolo) {
        this.simbolo = simbolo;
        this.variables = new Map();
    }
    setVariable(simbolo, id) {
        this.variables.set(id, simbolo);
    }
    grafica(simbolos) {
        var html = [];
        simbolos.variables.forEach(elemento => {
            html.push(elemento.id + "&" + elemento.dato + "&" + elemento.tipoDato + "&" + elemento.entorno + "&" + elemento.linea + "&" + elemento.columna);
        });
        return html;
    }
}
exports.TablaSimbolos = TablaSimbolos;
//# sourceMappingURL=TablaSimbolos.js.map