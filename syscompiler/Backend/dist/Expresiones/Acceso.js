"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModificarLista = exports.AccesoListas = exports.AgregarLista = exports.ModiVectores = exports.AccesoVectores = exports.Acceso = void 0;
const Error_1 = require("../Error/Error");
const Expresion_1 = require("./Expresion");
const Literal_1 = require("./Literal");
const Retorno_1 = require("./Retorno");
class Acceso extends Expresion_1.Expresion {
    constructor(id, line, column) {
        super(line, column);
        this.id = id;
    }
    execute(entorno, simbolos) {
        const val = entorno.getVariable(this.id);
        if (val != null) {
            return { value: val.valor, type: val.type };
        }
        else {
            throw new Error_1.Error_(this.line, this.column, "Semántico", "No se encontró la variable: " + this.id + ".");
        }
    }
}
exports.Acceso = Acceso;
class AccesoVectores extends Expresion_1.Expresion {
    constructor(id, pos, line, column) {
        super(line, column);
        this.id = id;
        this.pos = pos;
    }
    execute(entorno, simbolos) {
        const val = entorno.getVariable(this.id);
        const posi = this.pos.execute(entorno, simbolos);
        if (val != null) {
            if (val.type < 10) {
                throw new Error_1.Error_(this.line, this.column, "Semántico", "Debe ingresar un vector, lista o cadena para encontrar el tamaño: " + this.id);
            }
            if (posi.type == Retorno_1.Type.ENTERO) {
                if (posi.value >= val.valor.length) {
                    throw new Error_1.Error_(this.line, this.column, "Semántico", "No se puede ingresar a la posición: " + posi.value + ".");
                }
                return { value: val.valor[posi.value].value, type: val.type - 60 };
            }
            else {
                throw new Error_1.Error_(this.line, this.column, "Semántico", "Debe colocar un entero para declarar el tamaño del vector.");
            }
        }
        else {
            throw new Error_1.Error_(this.line, this.column, "Semántico", "No se encontró la variable: " + this.id);
        }
    }
}
exports.AccesoVectores = AccesoVectores;
class ModiVectores extends Expresion_1.Expresion {
    constructor(id, pos, valor, line, column) {
        super(line, column);
        this.id = id;
        this.pos = pos;
        this.valor = valor;
    }
    execute(entorno, simbolos) {
        const val = entorno.getVariable(this.id);
        const posi = this.pos.execute(entorno, simbolos);
        const value = this.valor.execute(entorno, simbolos);
        if (val != null) {
            const aux = val.valor;
            if (posi.value > aux.length) {
                throw new Error_1.Error_(this.line, this.column, "Semántico", "El vector: " + this.id + ", es de tamaño: " + aux.length + ", no se puede agregar un valor en la posición: " + posi.value);
            }
            else if (posi.type == Retorno_1.Type.ENTERO) {
                if (val.type - 60 == value.type) {
                    var tipo = 0;
                    if (value.type == 0) {
                        tipo = Retorno_1.Type.ENTERO;
                    }
                    else if (value.type == 1) {
                        tipo = Retorno_1.Type.DOUBLE;
                    }
                    else if (value.type == 2) {
                        tipo = Retorno_1.Type.BOOLEAN;
                    }
                    else if (value.type == 3) {
                        tipo = Retorno_1.Type.CHAR;
                    }
                    else if (value.type == 4) {
                        tipo = Retorno_1.Type.CADENA;
                    }
                    aux[posi.value] = new Literal_1.Literal(value.value, tipo, this.line, this.column);
                    entorno.setVariable(val.id, aux, val.type, this.line, this.column, simbolos);
                }
                else if (val.type - 60 == Retorno_1.Type.ENTERO && value.type == Retorno_1.Type.DOUBLE) {
                    aux[posi.value] = new Literal_1.Literal(Math.trunc(value.value), val.type - 60, this.line, this.column);
                    entorno.setVariable(val.id, aux, val.type, this.line, this.column, simbolos);
                }
                else if (val.type - 60 == Retorno_1.Type.DOUBLE && value.type == Retorno_1.Type.ENTERO) {
                    aux[posi.value] = new Literal_1.Literal(Math.trunc(value.value), val.type - 60, this.line, this.column);
                    entorno.setVariable(val.id, aux, val.type, this.line, this.column, simbolos);
                }
                else {
                    throw new Error_1.Error_(this.line, this.column, "Semántico", "No se encontró la variable de tipo Vector.");
                }
            }
            else {
                throw new Error_1.Error_(this.line, this.column, "Semántico", "Debe ingresar un entero para encontrar la posición del vector.");
            }
        }
        else {
            throw new Error_1.Error_(this.line, this.column, "Semántico", "No se encontró la variable: " + this.id);
        }
    }
}
exports.ModiVectores = ModiVectores;
//LISTAS
class AgregarLista extends Expresion_1.Expresion {
    constructor(id, valor, line, column) {
        super(line, column);
        this.id = id;
        this.valor = valor;
    }
    execute(entorno, simbolos) {
        const val = entorno.getVariable(this.id);
        const value = this.valor.execute(entorno, simbolos);
        if (val != null) {
            if (val.type - 70 == Retorno_1.Type.ENTERO || val.type - 70 == Retorno_1.Type.DOUBLE || val.type - 70 == Retorno_1.Type.BOOLEAN || val.type - 70 == Retorno_1.Type.CHAR || val.type - 70 == Retorno_1.Type.CADENA) {
                if (val.type - 70 == value.type) {
                    const aux = val.valor;
                    aux.push(new Literal_1.Literal(value.value, val.type - 70, this.line, this.column));
                    entorno.setVariable(val.id, aux, val.type, this.line, this.column, simbolos);
                }
                else if (val.type - 70 == Retorno_1.Type.ENTERO && value.type == Retorno_1.Type.DOUBLE) {
                    const aux = val.valor;
                    aux.push(new Literal_1.Literal(Math.trunc(value.value), val.type - 70, this.line, this.column));
                    entorno.setVariable(val.id, aux, val.type, this.line, this.column, simbolos);
                }
                else if (val.type - 70 == Retorno_1.Type.DOUBLE && value.type == Retorno_1.Type.ENTERO) {
                    const aux = val.valor;
                    aux.push(new Literal_1.Literal(value.value, val.type - 70, this.line, this.column));
                    entorno.setVariable(val.id, aux, val.type, this.line, this.column, simbolos);
                }
                else {
                    throw new Error_1.Error_(this.line, this.column, "Semántico", "El valor que desea asignar no es el mismo al tipo del vector.");
                }
            }
            else {
                throw new Error_1.Error_(this.line, this.column, "Semántico", "No se encontró la lista: " + this.id);
            }
        }
        else {
            throw new Error_1.Error_(this.line, this.column, "Semántico", "No se encontró la variable: " + this.id);
        }
    }
}
exports.AgregarLista = AgregarLista;
class AccesoListas extends Expresion_1.Expresion {
    constructor(id, pos, line, column) {
        super(line, column);
        this.id = id;
        this.pos = pos;
    }
    execute(entorno, simbolos) {
        const val = entorno.getVariable(this.id);
        const posi = this.pos.execute(entorno, simbolos);
        if (val != null) {
            if (posi.type == Retorno_1.Type.ENTERO) {
                return { value: val.valor[posi.value].value, type: val.type - 70 };
            }
            else {
                throw new Error_1.Error_(this.line, this.column, "Semántico", "Debe colocar un entero para declarar el tamaño de la lista, no: " + posi.value + ".");
            }
        }
        else {
            throw new Error_1.Error_(this.line, this.column, "Semántico", "No se encontró la variable: " + this.id);
        }
    }
}
exports.AccesoListas = AccesoListas;
class ModificarLista extends Expresion_1.Expresion {
    constructor(id, pos, value, line, column) {
        super(line, column);
        this.id = id;
        this.pos = pos;
        this.value = value;
    }
    execute(entorno, simbolos) {
        const val = entorno.getVariable(this.id);
        const posi = this.pos.execute(entorno, simbolos);
        const value = this.value.execute(entorno, simbolos);
        if (val != null) {
            const aux = val.valor;
            if (posi.value > aux.length) {
                throw new Error_1.Error_(this.line, this.column, "Semántico", "El vector: " + this.id + ", es de tamaño: " + aux.length + ", no se puede agregar un valor en la posición: " + posi.value);
            }
            else if (posi.type == Retorno_1.Type.ENTERO) {
                if (val.type - 70 == value.type) {
                    aux[posi.value] = new Literal_1.Literal(value.value, val.type - 70, this.line, this.column);
                    entorno.setVariable(val.id, aux, val.type, this.line, this.column, simbolos);
                }
                else if (val.type - 70 == Retorno_1.Type.ENTERO && value.type == Retorno_1.Type.DOUBLE) {
                    const aux = val.valor;
                    aux[posi.value] = new Literal_1.Literal(Math.trunc(value.value), val.type - 70, this.line, this.column);
                    entorno.setVariable(val.id, aux, val.type, this.line, this.column, simbolos);
                }
                else if (val.type - 70 == Retorno_1.Type.DOUBLE && value.type == Retorno_1.Type.ENTERO) {
                    const aux = val.valor;
                    aux[posi.value] = new Literal_1.Literal(value.value, val.type - 70, this.line, this.column);
                    entorno.setVariable(val.id, aux, val.type, this.line, this.column, simbolos);
                }
                else {
                    throw new Error_1.Error_(this.line, this.column, "Semántico", "El valor que desea asignar no es el mismo al tipo del vector.");
                }
            }
            else {
                throw new Error_1.Error_(this.line, this.column, "Semántico", "Debe ingresar un valor de tipo entero para la posición del vector. Línea:" + this.line + ".");
            }
        }
        else {
            throw new Error_1.Error_(this.line, this.column, "Semántico", "No se encontró la variable: " + this.id);
        }
    }
}
exports.ModificarLista = ModificarLista;
//# sourceMappingURL=Acceso.js.map