import { Entorno } from "../Ambitos/Entorno";
import { Simbolo } from "../Ambitos/Simbolo";
import { Error_ } from "../Error/Error";
import { Expresion } from "../Expresiones/Expresion";
import { Literal } from "../Expresiones/Literal";
import { Retorno } from "../Expresiones/Retorno";
import { Instruccion } from "./Instruccion";

export class Vectores extends Instruccion{
    constructor(private Izquierda: Literal, private Derecha: Literal, line: number, column: number){
        super(line, column)
    }

    public execute(entorno: Entorno): Retorno{
        var der = this.Derecha.execute(entorno);
        var izq = this.Izquierda.execute(entorno);
        if(der.type == izq.type){
            return {value: izq.value +"|"+ der.value, type: der.type}
        }else{
            throw new Error_(this.line, this.column, "Semántico", "No es posible asignar distintos tipos de datos en un vector.")
        }
    }

}
