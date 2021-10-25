import { Entorno } from "../Ambitos/Entorno";
import { Error_ } from "../Error/Error";
import { Expresion } from "../Expresiones/Expresion";
import { Type } from "../Expresiones/Retorno";
import { TablaSimbolos } from "../Reportes/TablaSimbolos";
import { Instruccion } from "./Instruccion";

export class DoWhile extends Instruccion{
    constructor(private condicion: Expresion, private cuerpo: Instruccion, line: number, column: number){
        super(line, column);
    }

    public execute(entorno: Entorno, simbolos: TablaSimbolos){
        var nuevoEntorno = new Entorno(entorno, "Do-While")
        var value = this.condicion.execute(nuevoEntorno, simbolos);

        if(value.type != Type.BOOLEAN){
            throw new Error_(this.line, this.column, "Semántico", "La condición a evaluar en el if no es de tipo boolean.")
        }else{
            do {
                const retorno = this.cuerpo.execute(nuevoEntorno, simbolos);
                if(retorno != null || retorno != undefined){
                    if(retorno.type == "break"){
                        break
                    }else if(retorno.type == "continue"){
                        continue
                    }else if(retorno.type == "return"){
                        return retorno.value
                    }
                }
                value = this.condicion.execute(nuevoEntorno, simbolos)
            } while (value.value);
        }

    }
}
