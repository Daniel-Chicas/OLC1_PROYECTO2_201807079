import { Entorno } from "../Ambitos/Entorno";
import { Error_ } from "../Error/Error";
import { TablaSimbolos } from "../Reportes/TablaSimbolos";
import { Expresion } from "./Expresion";
import { Literal, TipoLiteral } from "./Literal";
import { Retorno, Type } from "./Retorno";

export class Minusculas extends Expresion{
    constructor(private valor: Expresion, line: number, column: number){
        super(line, column)
    }

    public execute(entorno: Entorno, simbolos: TablaSimbolos): Retorno{
        var value = this.valor.execute(entorno, simbolos);
        if(value.type == Type.CADENA){
            return {value: value.value.toLowerCase(), type: value.type}
        }else{
            throw new Error_(this.line, this.column, "Semántico", "Se esperaba una cadena. En vez de: "+value.value+".")
        }
    }
}

export class Mayusculas extends Expresion{
    constructor(private valor: Expresion, line: number, column: number){
        super(line, column)
    }

    public execute(entorno: Entorno, simbolos: TablaSimbolos): Retorno{
        var value = this.valor.execute(entorno, simbolos);
        if(value.type == Type.CADENA){
            return {value: value.value.toUpperCase(), type: value.type}
        }else{
            throw new Error_(this.line, this.column, "Semántico", "Se esperaba una cadena. En vez de: "+value.value+".")
        }
    }
}

export class Tamanio extends Expresion{
    constructor(private valor: Expresion, line: number, column: number){
        super(line, column)
    }

    public execute(entorno: Entorno, simbolos: TablaSimbolos): Retorno{
        var value = this.valor.execute(entorno, simbolos);
        if(value.type == Type.CADENA ){
            return {value: value.value.length, type: 0}
        }else if(value.type == Type.VECTORENT || value.type == Type.VECTORDOU || value.type == Type.VECTORBOO || value.type == Type.VECTORCHA || value.type == Type.VECTORCAD ){
            return {value: value.value.length, type: 0}
        }else if(value.type == Type.LISTAENT || value.type == Type.LISTADOU || value.type == Type.LISTABOO || value.type == Type.LISTACHA || value.type == Type.LISTACAD){
            return {value: value.value.length, type: 0}
        }
        throw new Error_(this.line, this.column, "Semántico", "Solo se puede obtener el tamaño de Listas, Vectores o Cadenas. No se obtuvo el tamaño de: "+value.value+".")
    }
}

export class Truncate extends Expresion{
    constructor(private valor: Expresion, line: number, column: number){
        super(line, column)
    }
    
    public execute(entorno: Entorno, simbolos: TablaSimbolos): Retorno{
        var value = this.valor.execute(entorno, simbolos);
        if(value.type == Type.ENTERO  || value.type== Type.DOUBLE){
            return {value: Math.trunc(value.value), type: Type.ENTERO}
        }
        throw new Error_(this.line, this.column, "Semántico", "Solo se aceptan valores numéricos, se ingresó "+value.value+".")
        
    }
}

export class Round extends Expresion{
    constructor(private valor: Expresion, line: number, column: number){
        super(line, column)
    }
    
    public execute(entorno: Entorno, simbolos: TablaSimbolos): Retorno{
        var value = this.valor.execute(entorno, simbolos);
        if(value.type == Type.ENTERO  || value.type== Type.DOUBLE){
            return {value: Math.round(value.value), type: Type.ENTERO}
        }
        throw new Error_(this.line, this.column, "Semántico", "Solo se aceptan valores numéricos, se ingresó: "+value.value+".")

    }
}

export class Typeof extends Expresion{
    constructor(private valor: Expresion, line: number, column: number){
        super(line, column)
    }

    public execute(entorno: Entorno, simbolos: TablaSimbolos): Retorno{
            var value = this.valor.execute(entorno, simbolos);
            if(value.type == Type.CADENA){
                return {value: "string", type: Type.CADENA}
            }else if(value.type == Type.ENTERO){
                return {value: "int", type: Type.CADENA}
            }else if(value.type == Type.DOUBLE){
                return {value: "double", type: Type.CADENA}
            }else if(value.type == Type.BOOLEAN){
                return {value: "boolean", type: Type.CADENA}
            }else if(value.type == Type.CHAR){
                return {value: "char", type: Type.CADENA}
            }else if(value.type == 60 || value.type == 61 || value.type == 62 || value.type == 63 || value.type == 64){
                return {value: "vector", type: Type.CADENA}
            }else if(value.type == 70 || value.type == 71 || value.type == 72 || value.type == 73 || value.type == 74){
                return {value: "lista", type: Type.CADENA}
            }
            throw new Error_(this.line, this.column, "Semántico", "Tipo de dato irreconocible. Valor: "+value.value+".")
    }
}

export class toString extends Expresion{
    constructor(private valor: Expresion, line: number, column: number){
        super(line, column)
    }

    public execute(entorno: Entorno, simbolos: TablaSimbolos): Retorno{
            var value = this.valor.execute(entorno, simbolos);
            if(value.type == Type.CADENA){
                return {value: value.value.toString(), type: Type.CADENA}
            }else if(value.type == Type.ENTERO){
                return {value: value.value.toString(), type: Type.CADENA}
            }else if(value.type == Type.DOUBLE){
                return {value: value.value.toString(), type: Type.CADENA}
            }else if(value.type == Type.BOOLEAN){
                return {value: value.value.toString(), type: Type.CADENA}
            }else if(value.type == Type.CHAR){
                return {value: value.value.toString(), type: Type.CADENA}
            }
            throw new Error_(this.line, this.column, "Semántico", "No se aceptan vectores o listas para este método.")
    }
}

export class toCharArray extends Expresion{
    constructor(private valor: Expresion, line: number, column: number){
        super(line, column)
    }

    public execute(entorno: Entorno, simbolos: TablaSimbolos): Retorno{
            var value = this.valor.execute(entorno, simbolos);
            if(value.type == Type.CADENA){
                var vector = [];
                for (let i = 0; i < value.value.toString().split("").length; i++) {
                    vector.push(new Literal(value.value.toString().split("")[i], TipoLiteral.CHAR, this.line, this.column))                   
                }
                return {value:vector, type: Type.LISTACHA}
            }
            throw new Error_(this.line, this.column, "Semántico", "Solo se aceptan valores de tipo String para este método.")
    }
}