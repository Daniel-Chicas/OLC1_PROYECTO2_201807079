"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TipoAritmetica = exports.Aritmetica = void 0;
const Expresion_1 = require("./Expresion");
const Retorno_1 = require("./Retorno");
const Error_1 = require("../Error/Error");
class Aritmetica extends Expresion_1.Expresion {
    constructor(left, right, tipo, line, column) {
        super(line, column);
        this.left = left;
        this.right = right;
        this.tipo = tipo;
        //var x = this.execute();
        //console.log(x)
    }
    execute(entorno, simbolos) {
        const leftValue = this.left.execute(entorno, simbolos);
        const rightValue = this.right.execute(entorno, simbolos);
        if (this.tipo == TipoAritmetica.SUMA) {
            let dominante = this.tipoSum(leftValue.type, rightValue.type);
            if (dominante == Retorno_1.Type.CADENA) {
                return { value: (leftValue.value.toString() + rightValue.value.toString()), type: Retorno_1.Type.CADENA };
            }
            else if (dominante == Retorno_1.Type.ENTERO) {
                if (leftValue.type == Retorno_1.Type.ENTERO && rightValue.type == Retorno_1.Type.ENTERO) {
                    return { value: Number(leftValue.value + rightValue.value), type: Retorno_1.Type.ENTERO };
                }
                else if (leftValue.type == Retorno_1.Type.BOOLEAN && rightValue.type == Retorno_1.Type.ENTERO) {
                    if (leftValue.value == "true") {
                        return { value: Number(1 + rightValue.value), type: Retorno_1.Type.ENTERO };
                    }
                    else {
                        return { value: Number(0 + rightValue.value), type: Retorno_1.Type.ENTERO };
                    }
                }
                else if (leftValue.type == Retorno_1.Type.ENTERO && rightValue.type == Retorno_1.Type.BOOLEAN) {
                    if (rightValue.value == "true") {
                        return { value: Number(leftValue.value + 1), type: Retorno_1.Type.ENTERO };
                    }
                    else {
                        return { value: Number(leftValue.value + 0), type: Retorno_1.Type.ENTERO };
                    }
                }
                else if (leftValue.type == Retorno_1.Type.CHAR && rightValue.type == Retorno_1.Type.ENTERO) {
                    return { value: Number(leftValue.value.charCodeAt(0) + rightValue.value), type: Retorno_1.Type.ENTERO };
                }
                else if (leftValue.type == Retorno_1.Type.ENTERO && rightValue.type == Retorno_1.Type.CHAR) {
                    return { value: Number(leftValue.value + rightValue.value.charCodeAt(0)), type: Retorno_1.Type.ENTERO };
                }
            }
            else if (dominante == Retorno_1.Type.DOUBLE) {
                if (leftValue.type == Retorno_1.Type.ENTERO && rightValue.type == Retorno_1.Type.DOUBLE || leftValue.type == Retorno_1.Type.DOUBLE && rightValue.type == Retorno_1.Type.ENTERO || leftValue.type == Retorno_1.Type.DOUBLE && rightValue.type == Retorno_1.Type.DOUBLE) {
                    return { value: Number(leftValue.value + rightValue.value), type: Retorno_1.Type.DOUBLE };
                }
                else if (leftValue.type == Retorno_1.Type.BOOLEAN && rightValue.type == Retorno_1.Type.DOUBLE) {
                    if (leftValue.value == "true") {
                        return { value: Number(1 + rightValue.value), type: Retorno_1.Type.DOUBLE };
                    }
                    else {
                        return { value: Number(0 + rightValue.value), type: Retorno_1.Type.DOUBLE };
                    }
                }
                else if (leftValue.type == Retorno_1.Type.DOUBLE && rightValue.type == Retorno_1.Type.BOOLEAN) {
                    if (rightValue.value == "true") {
                        return { value: Number(leftValue.value + 1), type: Retorno_1.Type.DOUBLE };
                    }
                    else {
                        return { value: Number(leftValue.value + 0), type: Retorno_1.Type.DOUBLE };
                    }
                }
                else if (leftValue.type == Retorno_1.Type.CHAR && rightValue.type == Retorno_1.Type.DOUBLE) {
                    return { value: Number(leftValue.value.charCodeAt(0) + rightValue.value), type: Retorno_1.Type.DOUBLE };
                }
                else if (leftValue.type == Retorno_1.Type.DOUBLE && rightValue.type == Retorno_1.Type.CHAR) {
                    return { value: Number(leftValue.value + rightValue.value.charCodeAt(0)), type: Retorno_1.Type.DOUBLE };
                }
            }
            else if (dominante == Retorno_1.Type.ERROR) {
                throw new Error_1.Error_(this.line, this.column, 'Semantico', 'No se puede sumar: ' + leftValue.type + ' y ' + rightValue.type);
            }
        }
        else if (this.tipo == TipoAritmetica.RESTA) {
            let dominante = this.tipoRes(leftValue.type, rightValue.type);
            if (dominante == Retorno_1.Type.ENTERO) {
                if (leftValue.type == Retorno_1.Type.ENTERO && rightValue.type == Retorno_1.Type.ENTERO) {
                    return { value: Number(leftValue.value - rightValue.value), type: Retorno_1.Type.ENTERO };
                }
                else if (leftValue.type == Retorno_1.Type.BOOLEAN && rightValue.type == Retorno_1.Type.ENTERO) {
                    if (leftValue.value == "true") {
                        return { value: Number(1 - rightValue.value), type: Retorno_1.Type.ENTERO };
                    }
                    else {
                        return { value: Number(0 - rightValue.value), type: Retorno_1.Type.ENTERO };
                    }
                }
                else if (leftValue.type == Retorno_1.Type.ENTERO && rightValue.type == Retorno_1.Type.BOOLEAN) {
                    if (rightValue.value == "true") {
                        return { value: Number(leftValue.value - 1), type: Retorno_1.Type.ENTERO };
                    }
                    else {
                        return { value: Number(leftValue.value - 0), type: Retorno_1.Type.ENTERO };
                    }
                }
                else if (leftValue.type == Retorno_1.Type.CHAR && rightValue.type == Retorno_1.Type.ENTERO) {
                    return { value: Number(leftValue.value.charCodeAt(0) - rightValue.value), type: Retorno_1.Type.ENTERO };
                }
                else if (leftValue.type == Retorno_1.Type.ENTERO && rightValue.type == Retorno_1.Type.CHAR) {
                    return { value: Number(leftValue.value - rightValue.value.charCodeAt(0)), type: Retorno_1.Type.ENTERO };
                }
            }
            else if (dominante == Retorno_1.Type.DOUBLE) {
                if (leftValue.type == Retorno_1.Type.ENTERO && rightValue.type == Retorno_1.Type.DOUBLE || leftValue.type == Retorno_1.Type.DOUBLE && rightValue.type == Retorno_1.Type.ENTERO || leftValue.type == Retorno_1.Type.DOUBLE && rightValue.type == Retorno_1.Type.DOUBLE) {
                    return { value: Number(leftValue.value - rightValue.value), type: Retorno_1.Type.DOUBLE };
                }
                else if (leftValue.type == Retorno_1.Type.BOOLEAN && rightValue.type == Retorno_1.Type.DOUBLE) {
                    if (leftValue.value == "true") {
                        return { value: Number(1 - rightValue.value), type: Retorno_1.Type.DOUBLE };
                    }
                    else {
                        return { value: Number(0 - rightValue.value), type: Retorno_1.Type.DOUBLE };
                    }
                }
                else if (leftValue.type == Retorno_1.Type.DOUBLE && rightValue.type == Retorno_1.Type.BOOLEAN) {
                    if (rightValue.value == "true") {
                        return { value: Number(leftValue.value - 1), type: Retorno_1.Type.DOUBLE };
                    }
                    else {
                        return { value: Number(leftValue.value - 0), type: Retorno_1.Type.DOUBLE };
                    }
                }
                else if (leftValue.type == Retorno_1.Type.CHAR && rightValue.type == Retorno_1.Type.DOUBLE) {
                    return { value: Number(leftValue.value.charCodeAt(0) - rightValue.value), type: Retorno_1.Type.DOUBLE };
                }
                else if (leftValue.type == Retorno_1.Type.DOUBLE && rightValue.type == Retorno_1.Type.CHAR) {
                    return { value: Number(leftValue.value - rightValue.value.charCodeAt(0)), type: Retorno_1.Type.DOUBLE };
                }
            }
            else if (dominante == Retorno_1.Type.ERROR) {
                throw new Error_1.Error_(this.line, this.column, 'Semantico', 'No se puede restar: ' + leftValue.type + ' y ' + rightValue.type);
            }
        }
        else if (this.tipo == TipoAritmetica.MULTIPLICACION) {
            let dominante = this.tipoMul(leftValue.type, rightValue.type);
            if (dominante == Retorno_1.Type.ENTERO) {
                if (leftValue.type == Retorno_1.Type.ENTERO && rightValue.type == Retorno_1.Type.ENTERO) {
                    return { value: Number(leftValue.value * rightValue.value), type: Retorno_1.Type.ENTERO };
                }
                else if (leftValue.type == Retorno_1.Type.CHAR && rightValue.type == Retorno_1.Type.ENTERO) {
                    return { value: Number(leftValue.value.charCodeAt(0) * rightValue.value), type: Retorno_1.Type.ENTERO };
                }
                else if (leftValue.type == Retorno_1.Type.ENTERO && rightValue.type == Retorno_1.Type.CHAR) {
                    return { value: Number(leftValue.value * rightValue.value.charCodeAt(0)), type: Retorno_1.Type.ENTERO };
                }
            }
            else if (dominante == Retorno_1.Type.DOUBLE) {
                if (leftValue.type == Retorno_1.Type.ENTERO && rightValue.type == Retorno_1.Type.DOUBLE || leftValue.type == Retorno_1.Type.DOUBLE && rightValue.type == Retorno_1.Type.ENTERO || leftValue.type == Retorno_1.Type.DOUBLE && rightValue.type == Retorno_1.Type.DOUBLE) {
                    return { value: Number(leftValue.value * rightValue.value), type: Retorno_1.Type.DOUBLE };
                }
                else if (leftValue.type == Retorno_1.Type.CHAR && rightValue.type == Retorno_1.Type.DOUBLE) {
                    return { value: Number(leftValue.value.charCodeAt(0) * rightValue.value), type: Retorno_1.Type.DOUBLE };
                }
                else if (leftValue.type == Retorno_1.Type.DOUBLE && rightValue.type == Retorno_1.Type.CHAR) {
                    return { value: Number(leftValue.value * rightValue.value.charCodeAt(0)), type: Retorno_1.Type.DOUBLE };
                }
            }
            else if (dominante == Retorno_1.Type.ERROR) {
                throw new Error_1.Error_(this.line, this.column, 'Semantico', 'No se puede multiplicar: ' + leftValue.type + ' y ' + rightValue.type);
            }
        }
        else if (this.tipo == TipoAritmetica.DIVISION) {
            let dominante = this.tipoDiv(leftValue.type, rightValue.type);
            if (dominante == Retorno_1.Type.DOUBLE && rightValue.value != 0) {
                if (leftValue.type == Retorno_1.Type.ENTERO && rightValue.type == Retorno_1.Type.ENTERO || leftValue.type == Retorno_1.Type.DOUBLE && rightValue.type == Retorno_1.Type.DOUBLE || leftValue.type == Retorno_1.Type.DOUBLE && rightValue.type == Retorno_1.Type.ENTERO || leftValue.type == Retorno_1.Type.ENTERO && rightValue.type == Retorno_1.Type.DOUBLE) {
                    return { value: Number(leftValue.value / rightValue.value), type: Retorno_1.Type.DOUBLE };
                }
                else if (leftValue.type == Retorno_1.Type.CHAR && rightValue.type == Retorno_1.Type.ENTERO || leftValue.type == Retorno_1.Type.CHAR && rightValue.type == Retorno_1.Type.DOUBLE) {
                    return { value: Number(leftValue.value.charCodeAt(0) / rightValue.value), type: Retorno_1.Type.DOUBLE };
                }
                else if (leftValue.type == Retorno_1.Type.ENTERO && rightValue.type == Retorno_1.Type.CHAR || leftValue.type == Retorno_1.Type.DOUBLE && rightValue.type == Retorno_1.Type.CHAR) {
                    return { value: Number(leftValue.value / rightValue.value.charCodeAt(0)), type: Retorno_1.Type.DOUBLE };
                }
            }
            else if (dominante == Retorno_1.Type.ERROR || rightValue.value == 0) {
                throw new Error_1.Error_(this.line, this.column, 'Semantico', 'No se puede dividir: ' + leftValue.type + ' y ' + rightValue.type);
            }
        }
        else if (this.tipo == TipoAritmetica.POTENCIA) {
            let dominante = this.tipoPot(leftValue.type, rightValue.type);
            if (dominante == Retorno_1.Type.ENTERO) {
                return { value: Math.pow(leftValue.value, rightValue.value), type: Retorno_1.Type.ENTERO };
            }
            else if (dominante == Retorno_1.Type.DOUBLE) {
                if (leftValue.type == Retorno_1.Type.ENTERO && rightValue.type == Retorno_1.Type.DOUBLE || leftValue.type == Retorno_1.Type.DOUBLE && rightValue.type == Retorno_1.Type.ENTERO || leftValue.type == Retorno_1.Type.DOUBLE && rightValue.type == Retorno_1.Type.DOUBLE) {
                    return { value: Math.pow(leftValue.value, rightValue.value), type: Retorno_1.Type.DOUBLE };
                }
            }
            else if (dominante == Retorno_1.Type.ERROR) {
                throw new Error_1.Error_(this.line, this.column, 'Semantico', 'No se puede elevar: ' + leftValue.type + ' a ' + rightValue.type);
            }
        }
        else if (this.tipo == TipoAritmetica.MODULO) {
            let dominante = this.tipoMod(leftValue.type, rightValue.type);
            if (dominante == Retorno_1.Type.DOUBLE) {
                return { value: Number(leftValue.value % rightValue.value), type: Retorno_1.Type.ENTERO };
            }
            else if (dominante == Retorno_1.Type.ERROR) {
                throw new Error_1.Error_(this.line, this.column, 'Semantico', 'No se puede hacer módulo de: ' + leftValue.type + ' y ' + rightValue.type);
            }
        }
        throw new Error_1.Error_(this.line, this.column, 'Semantico', 'No se puede operar: ' + leftValue.value + ' y ' + rightValue.value);
    }
}
exports.Aritmetica = Aritmetica;
var TipoAritmetica;
(function (TipoAritmetica) {
    TipoAritmetica[TipoAritmetica["SUMA"] = 0] = "SUMA";
    TipoAritmetica[TipoAritmetica["RESTA"] = 1] = "RESTA";
    TipoAritmetica[TipoAritmetica["MULTIPLICACION"] = 2] = "MULTIPLICACION";
    TipoAritmetica[TipoAritmetica["DIVISION"] = 3] = "DIVISION";
    TipoAritmetica[TipoAritmetica["POTENCIA"] = 4] = "POTENCIA";
    TipoAritmetica[TipoAritmetica["MODULO"] = 5] = "MODULO";
})(TipoAritmetica = exports.TipoAritmetica || (exports.TipoAritmetica = {}));
//# sourceMappingURL=Aritmetica.js.map