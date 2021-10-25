import { Entorno } from "../Ambitos/Entorno";
import { Error_ } from "../Error/Error";
import { Expresion } from "../Expresiones/Expresion";
import { Retorno, Type } from "../Expresiones/Retorno";
import { TablaSimbolos } from "../Reportes/TablaSimbolos";
import { Instruccion } from "./Instruccion";

export class If extends Instruccion{
    constructor(private condicion: Expresion, private cuerpo: Instruccion, private Else: Instruccion, line: number, column: number){
        super(line, column)
    }

    public execute(entorno: Entorno, simbolos: TablaSimbolos){
        var nuevoEntorno = new Entorno(entorno, "If")
        const valor = this.condicion.execute(nuevoEntorno, simbolos)
    
        if(valor.type != Type.BOOLEAN){
            throw new Error_(this.line, this.column, "Semántico", "La condición a evaluar en el if no es de tipo boolean.")
        }else{
            if(valor.value){
                return this.cuerpo.execute(nuevoEntorno, simbolos);
            }else if (this.Else != null){
                var nuevoEntorno = new Entorno(entorno, "else")
                return this.Else.execute(nuevoEntorno, simbolos);
            }
        }
    }

}

export class IfAlterno extends Expresion{
    constructor(private condicion: Expresion, private cuerpo: Expresion, private Else: Instruccion, line: number, column: number){
        super(line, column)
    }

    public execute(entorno: Entorno, simbolos: TablaSimbolos): Retorno{
        var nuevoEntorno = new Entorno(entorno, "If")
        const valor = this.condicion.execute(nuevoEntorno, simbolos)
    
        if(valor.type != Type.BOOLEAN){
            throw new Error_(this.line, this.column, "Semántico", "La condición a evaluar en el if no es de tipo boolean.")
        }else{
            if(valor.value){
                var value = this.cuerpo.execute(nuevoEntorno, simbolos);
                return { value: value.value, type: value.type };
            }else if (this.Else != null){
                var nuevoEntorno = new Entorno(entorno, "else")
                var valueElse = this.Else.execute(nuevoEntorno, simbolos);
                return { value: valueElse.value, type: valueElse.type };
            }
        }
    }

}