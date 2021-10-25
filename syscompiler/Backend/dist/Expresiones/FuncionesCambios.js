"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toCharArray = exports.toString = exports.Typeof = exports.Round = exports.Truncate = exports.Tamanio = exports.Mayusculas = exports.Minusculas = void 0;
const Error_1 = require("../Error/Error");
const Expresion_1 = require("./Expresion");
const Literal_1 = require("./Literal");
const Retorno_1 = require("./Retorno");
class Minusculas extends Expresion_1.Expresion {
    constructor(valor, line, column) {
        super(line, column);
        this.valor = valor;
    }
    execute(entorno, simbolos) {
        var value = this.valor.execute(entorno, simbolos);
        if (value.type == Retorno_1.Type.CADENA) {
            return { value: value.value.toLowerCase(), type: value.type };
        }
        else {
            throw new Error_1.Error_(this.line, this.column, "Semántico", "Se esperaba una cadena. En vez de: " + value.value + ".");
        }
    }
}
exports.Minusculas = Minusculas;
class Mayusculas extends Expresion_1.Expresion {
    constructor(valor, line, column) {
        super(line, column);
        this.valor = valor;
    }
    execute(entorno, simbolos) {
        var value = this.valor.execute(entorno, simbolos);
        if (value.type == Retorno_1.Type.CADENA) {
            return { value: value.value.toUpperCase(), type: value.type };
        }
        else {
            throw new Error_1.Error_(this.line, this.column, "Semántico", "Se esperaba una cadena. En vez de: " + value.value + ".");
        }
    }
}
exports.Mayusculas = Mayusculas;
class Tamanio extends Expresion_1.Expresion {
    constructor(valor, line, column) {
        super(line, column);
        this.valor = valor;
    }
    execute(entorno, simbolos) {
        var value = this.valor.execute(entorno, simbolos);
        if (value.type == Retorno_1.Type.CADENA) {
            return { value: value.value.length, type: 0 };
        }
        else if (value.type == Retorno_1.Type.VECTORENT || value.type == Retorno_1.Type.VECTORDOU || value.type == Retorno_1.Type.VECTORBOO || value.type == Retorno_1.Type.VECTORCHA || value.type == Retorno_1.Type.VECTORCAD) {
            return { value: value.value.length, type: 0 };
        }
        else if (value.type == Retorno_1.Type.LISTAENT || value.type == Retorno_1.Type.LISTADOU || value.type == Retorno_1.Type.LISTABOO || value.type == Retorno_1.Type.LISTACHA || value.type == Retorno_1.Type.LISTACAD) {
            return { value: value.value.length, type: 0 };
        }
        throw new Error_1.Error_(this.line, this.column, "Semántico", "Solo se puede obtener el tamaño de Listas, Vectores o Cadenas. No se obtuvo el tamaño de: " + value.value + ".");
    }
}
exports.Tamanio = Tamanio;
class Truncate extends Expresion_1.Expresion {
    constructor(valor, line, column) {
        super(line, column);
        this.valor = valor;
    }
    execute(entorno, simbolos) {
        var value = this.valor.execute(entorno, simbolos);
        if (value.type == Retorno_1.Type.ENTERO || value.type == Retorno_1.Type.DOUBLE) {
            return { value: Math.trunc(value.value), type: Retorno_1.Type.ENTERO };
        }
        throw new Error_1.Error_(this.line, this.column, "Semántico", "Solo se aceptan valores numéricos, se ingresó " + value.value + ".");
    }
}
exports.Truncate = Truncate;
class Round extends Expresion_1.Expresion {
    constructor(valor, line, column) {
        super(line, column);
        this.valor = valor;
    }
    execute(entorno, simbolos) {
        var value = this.valor.execute(entorno, simbolos);
        if (value.type == Retorno_1.Type.ENTERO || value.type == Retorno_1.Type.DOUBLE) {
            return { value: Math.round(value.value), type: Retorno_1.Type.ENTERO };
        }
        throw new Error_1.Error_(this.line, this.column, "Semántico", "Solo se aceptan valores numéricos, se ingresó: " + value.value + ".");
    }
}
exports.Round = Round;
class Typeof extends Expresion_1.Expresion {
    constructor(valor, line, column) {
        super(line, column);
        this.valor = valor;
    }
    execute(entorno, simbolos) {
        var value = this.valor.execute(entorno, simbolos);
        if (value.type == Retorno_1.Type.CADENA) {
            return { value: "string", type: Retorno_1.Type.CADENA };
        }
        else if (value.type == Retorno_1.Type.ENTERO) {
            return { value: "int", type: Retorno_1.Type.CADENA };
        }
        else if (value.type == Retorno_1.Type.DOUBLE) {
            return { value: "double", type: Retorno_1.Type.CADENA };
        }
        else if (value.type == Retorno_1.Type.BOOLEAN) {
            return { value: "boolean", type: Retorno_1.Type.CADENA };
        }
        else if (value.type == Retorno_1.Type.CHAR) {
            return { value: "char", type: Retorno_1.Type.CADENA };
        }
        else if (value.type == 60 || value.type == 61 || value.type == 62 || value.type == 63 || value.type == 64) {
            return { value: "vector", type: Retorno_1.Type.CADENA };
        }
        else if (value.type == 70 || value.type == 71 || value.type == 72 || value.type == 73 || value.type == 74) {
            return { value: "lista", type: Retorno_1.Type.CADENA };
        }
        throw new Error_1.Error_(this.line, this.column, "Semántico", "Tipo de dato irreconocible. Valor: " + value.value + ".");
    }
}
exports.Typeof = Typeof;
class toString extends Expresion_1.Expresion {
    constructor(valor, line, column) {
        super(line, column);
        this.valor = valor;
    }
    execute(entorno, simbolos) {
        var value = this.valor.execute(entorno, simbolos);
        if (value.type == Retorno_1.Type.CADENA) {
            return { value: value.value.toString(), type: Retorno_1.Type.CADENA };
        }
        else if (value.type == Retorno_1.Type.ENTERO) {
            return { value: value.value.toString(), type: Retorno_1.Type.CADENA };
        }
        else if (value.type == Retorno_1.Type.DOUBLE) {
            return { value: value.value.toString(), type: Retorno_1.Type.CADENA };
        }
        else if (value.type == Retorno_1.Type.BOOLEAN) {
            return { value: value.value.toString(), type: Retorno_1.Type.CADENA };
        }
        else if (value.type == Retorno_1.Type.CHAR) {
            return { value: value.value.toString(), type: Retorno_1.Type.CADENA };
        }
        throw new Error_1.Error_(this.line, this.column, "Semántico", "No se aceptan vectores o listas para este método.");
    }
}
exports.toString = toString;
class toCharArray extends Expresion_1.Expresion {
    constructor(valor, line, column) {
        super(line, column);
        this.valor = valor;
    }
    execute(entorno, simbolos) {
        var value = this.valor.execute(entorno, simbolos);
        if (value.type == Retorno_1.Type.CADENA) {
            var vector = [];
            for (let i = 0; i < value.value.toString().split("").length; i++) {
                vector.push(new Literal_1.Literal(value.value.toString().split("")[i], Literal_1.TipoLiteral.CHAR, this.line, this.column));
            }
            return { value: vector, type: Retorno_1.Type.LISTACHA };
        }
        throw new Error_1.Error_(this.line, this.column, "Semántico", "Solo se aceptan valores de tipo String para este método.");
    }
}
exports.toCharArray = toCharArray;
//# sourceMappingURL=FuncionesCambios.js.map