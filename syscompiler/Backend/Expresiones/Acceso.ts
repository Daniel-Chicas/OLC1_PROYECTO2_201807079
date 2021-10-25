import { Entorno } from "../Ambitos/Entorno";
import { Error_ } from "../Error/Error";
import { TablaSimbolos } from "../Reportes/TablaSimbolos";
import { Expresion } from "./Expresion";
import { Literal } from "./Literal";
import { Retorno, Type } from "./Retorno";

export class Acceso extends Expresion{
    constructor (private id: string, line: number, column: number){
        super(line, column)
    }

    public execute(entorno: Entorno, simbolos: TablaSimbolos): Retorno{
        const val = entorno.getVariable(this.id);
        if(val != null){
                return {value: val.valor, type: val.type}
        }else{
            throw new Error_(this.line, this.column, "Semántico", "No se encontró la variable: "+this.id+".")
        }
    }

}

export class AccesoVectores extends Expresion{
    constructor (private id: string, private pos: Expresion, line: number, column: number){
        super(line, column)
    }

    public execute(entorno: Entorno, simbolos: TablaSimbolos): Retorno{
        const val = entorno.getVariable(this.id);
        const posi = this.pos.execute(entorno, simbolos);
        if(val != null){
            if(val.type < 10){
                throw new Error_(this.line, this.column, "Semántico", "Debe ingresar un vector, lista o cadena para encontrar el tamaño: "+this.id)
            }
            if(posi.type == Type.ENTERO){
                return {value: val.valor[posi.value].value, type: val.type-60}
            }else{
                throw new Error_(this.line, this.column, "Semántico", "Debe colocar un entero para declarar el tamaño del vector.")
            }
        }else{
            throw new Error_(this.line, this.column, "Semántico", "No se encontró la variable: "+this.id)
        }
    }
}

export class ModiVectores extends Expresion{
    constructor (private id: string, private pos: Expresion, private valor: Expresion, line: number, column: number){
        super(line, column)
    }

    public execute(entorno: Entorno, simbolos: TablaSimbolos): any{
        const val = entorno.getVariable(this.id);
        const posi = this.pos.execute(entorno, simbolos);
        const value = this.valor.execute(entorno, simbolos);
        if(val != null){
            const aux = val.valor
            if(posi.value > aux.length){
                throw new Error_(this.line, this.column, "Semántico", "El vector: "+this.id+", es de tamaño: "+aux.length+", no se puede agregar un valor en la posición: "+posi.value)
            }else if(posi.type == Type.ENTERO){
                if(val.type-60 == value.type){
                    var tipo = 0;
                    if(value.type == 0){
                        tipo = Type.ENTERO
                    }else if(value.type == 1){
                        tipo = Type.DOUBLE
                    }else if(value.type == 2){
                        tipo = Type.BOOLEAN
                    }else if(value.type == 3){
                        tipo = Type.CHAR
                    }else if(value.type == 4){
                        tipo = Type.CADENA
                    }
                    aux[posi.value] = new Literal(value.value, tipo, this.line, this.column)
                    entorno.setVariable(val.id, aux, val.type, this.line, this.column, simbolos)
                }else if(val.type-60 == Type.ENTERO && value.type == Type.DOUBLE ){
                    aux[posi.value] = new Literal(Math.trunc(value.value), val.type-60, this.line, this.column)
                    entorno.setVariable(val.id, aux, val.type, this.line, this.column, simbolos)
                }else if(val.type-60 == Type.DOUBLE && value.type == Type.ENTERO ){
                    aux[posi.value] = new Literal(Math.trunc(value.value), val.type-60, this.line, this.column)
                    entorno.setVariable(val.id, aux, val.type, this.line, this.column, simbolos)
                }else{
                    throw new Error_(this.line, this.column, "Semántico", "No se encontró la variable de tipo Vector.")
                }
            }else{
                throw new Error_(this.line, this.column, "Semántico", "Debe ingresar un entero para encontrar la posición del vector.")
            }
        }else{
            throw new Error_(this.line, this.column, "Semántico", "No se encontró la variable: "+this.id)
        }
    }
}


//LISTAS
export class AgregarLista extends Expresion{
    constructor (private id: string, private valor: Expresion, line: number, column: number){
        super(line, column)
    }

    public execute(entorno: Entorno, simbolos: TablaSimbolos): any{
        const val = entorno.getVariable(this.id);
        const value = this.valor.execute(entorno, simbolos);
        if(val != null){
            if(val.type-70 == Type.ENTERO || val.type-70 == Type.DOUBLE || val.type-70 == Type.BOOLEAN || val.type-70 == Type.CHAR || val.type-70 == Type.CADENA){
                if(val.type-70 == value.type){
                    const aux = val.valor
                    aux.push(new Literal(value.value, val.type-70, this.line, this.column))
                    entorno.setVariable(val.id, aux, val.type, this.line, this.column, simbolos)
                }else if(val.type-70 == Type.ENTERO && value.type == Type.DOUBLE ){
                    const aux = val.valor
                    aux.push(new Literal(Math.trunc(value.value), val.type-70, this.line, this.column))
                    entorno.setVariable(val.id, aux, val.type, this.line, this.column, simbolos)
                }else if(val.type-70 == Type.DOUBLE && value.type == Type.ENTERO ){
                    const aux = val.valor
                    aux.push(new Literal(value.value, val.type-70, this.line, this.column))
                    entorno.setVariable(val.id, aux, val.type, this.line, this.column, simbolos)
                }else{
                    throw new Error_(this.line, this.column, "Semántico", "El valor que desea asignar no es el mismo al tipo del vector.")
                }
            }else{
                throw new Error_(this.line, this.column, "Semántico", "No se encontró la lista: "+this.id)
            }
        }else{
            throw new Error_(this.line, this.column, "Semántico", "No se encontró la variable: "+this.id)
        }
    }
}

export class AccesoListas extends Expresion{
    constructor (private id: string, private pos: Expresion, line: number, column: number){
        super(line, column)
    }

    public execute(entorno: Entorno, simbolos: TablaSimbolos): Retorno{
        const val = entorno.getVariable(this.id);
        const posi = this.pos.execute(entorno, simbolos);
        if(val != null){
            if(posi.type == Type.ENTERO){
                return {value: val.valor[posi.value].value, type: val.type-70}
            }else{
                throw new Error_(this.line, this.column, "Semántico", "Debe colocar un entero para declarar el tamaño de la lista, no: "+posi.value+".")
            }
        }else{
            throw new Error_(this.line, this.column, "Semántico", "No se encontró la variable: "+this.id)
        }
    }
}

export class ModificarLista extends Expresion{
    constructor (private id: string, private pos: Expresion, private value: Expresion, line: number, column: number){
        super(line, column)
    }

    public execute(entorno: Entorno, simbolos: TablaSimbolos): any{
        const val = entorno.getVariable(this.id);
        const posi = this.pos.execute(entorno, simbolos);
        const value = this.value.execute(entorno, simbolos);
        if(val != null){
            const aux = val.valor
            if(posi.value > aux.length){
                throw new Error_(this.line, this.column, "Semántico", "El vector: "+this.id+", es de tamaño: "+aux.length+", no se puede agregar un valor en la posición: "+posi.value)
            }else if(posi.type == Type.ENTERO){
                if(val.type-70 == value.type){
                    aux[posi.value] = new Literal(value.value, val.type-70, this.line, this.column)
                    entorno.setVariable(val.id, aux, val.type, this.line, this.column, simbolos)
                }else if(val.type-70 == Type.ENTERO && value.type == Type.DOUBLE ){
                    const aux = val.valor
                    aux[posi.value] = new Literal(Math.trunc(value.value), val.type-70, this.line, this.column)
                    entorno.setVariable(val.id, aux, val.type, this.line, this.column, simbolos)
                }else if(val.type-70 == Type.DOUBLE && value.type == Type.ENTERO ){
                    const aux = val.valor
                    aux[posi.value] = new Literal(value.value, val.type-70, this.line, this.column)
                    entorno.setVariable(val.id, aux, val.type, this.line, this.column, simbolos)
                }else{
                    throw new Error_(this.line, this.column, "Semántico", "El valor que desea asignar no es el mismo al tipo del vector.")
                }
            }else{
                throw new Error_(this.line, this.column, "Semántico", "Debe ingresar un valor de tipo entero para la posición del vector. Línea:"+this.line+".")
            }
        }else{
            throw new Error_(this.line, this.column, "Semántico", "No se encontró la variable: "+this.id)
        }
    }
}