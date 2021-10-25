"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Switch = void 0;
const Entorno_1 = require("../Ambitos/Entorno");
const Instruccion_1 = require("./Instruccion");
class Switch extends Instruccion_1.Instruccion {
    constructor(condicion, cuerpo, line, column) {
        super(line, column);
        this.condicion = condicion;
        this.cuerpo = cuerpo;
    }
    execute(entorno, simbolos) {
        var nuevoEntorno = new Entorno_1.Entorno(entorno, "Switch");
        const cond = this.condicion.execute(nuevoEntorno, simbolos);
        for (const caso of this.cuerpo) {
            var casoC = caso.execute(nuevoEntorno, simbolos);
            var condC = casoC.condicion.execute(nuevoEntorno, simbolos);
            if (cond.value == condC.value && cond.type == cond.type) {
                var retorno = casoC.cuerpo.execute(nuevoEntorno, simbolos);
                if (retorno != null || retorno != undefined) {
                    if (retorno.type == "break") {
                        break;
                    }
                    else if (retorno.type == "continue") {
                        continue;
                    }
                    else if (retorno.type == "return") {
                        return retorno.value;
                    }
                }
            }
            else if (condC.value == "default") {
                var retorno = casoC.cuerpo.execute(nuevoEntorno, simbolos);
                if (retorno != null || retorno != undefined) {
                    if (retorno.type == "break") {
                        break;
                    }
                    else if (retorno.type == "continue") {
                        continue;
                    }
                    else if (retorno.type == "return") {
                        return retorno.value;
                    }
                }
            }
        }
    }
}
exports.Switch = Switch;
//# sourceMappingURL=Switch.js.map