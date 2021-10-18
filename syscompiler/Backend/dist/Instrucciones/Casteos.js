"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Casteos = void 0;
const Error_1 = require("../Error/Error");
const Instruccion_1 = require("./Instruccion");
class Casteos extends Instruccion_1.Instruccion {
    constructor(tipo, id, tipoCasteo, value, line, column) {
        super(line, column);
        this.tipo = tipo;
        this.id = id;
        this.tipoCasteo = tipoCasteo;
        this.value = value;
    }
    execute(entorno) {
        const val = this.value.execute(entorno);
        if (this.tipo.toLowerCase() == "int" && this.tipoCasteo.toLocaleLowerCase() == "double") {
            entorno.setVariable(this.id, val.value, val.type, this.line, this.column);
        }
        else if (this.tipo.toLowerCase() == "int" && this.tipoCasteo.toLocaleLowerCase() == "double") {
            entorno.setVariable(this.id, val.value, val.type, this.line, this.column);
        }
        throw new Error_1.Error_(this.line, this.column, "Semántico", "No es posible asignar asignar el valor: " + val.value + ", a la variable tipo de tipo: " + this.tipo);
    }
}
exports.Casteos = Casteos;
//# sourceMappingURL=Casteos.js.map