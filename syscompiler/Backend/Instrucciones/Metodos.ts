import { Entorno } from "../Ambitos/Entorno";
import { Expresion } from "../Expresiones/Expresion";
import { TablaSimbolos } from "../Reportes/TablaSimbolos";
import { Instruccion } from "./Instruccion";

export class Metodos extends Instruccion{
    constructor(public id: string, public parametros: string, public cuerpo: Instruccion, line: number, column: number ){
        super(line, column)
    }

    public execute(entorno: Entorno, simbolos: TablaSimbolos){
        entorno.guardarMetodo(this.id, this)
    }
}