import { Entorno } from "../Ambitos/Entorno";
import { Error_ } from "../Error/Error";
import { Expresion } from "../Expresiones/Expresion";
import { Type } from "../Expresiones/Retorno";
import { TablaSimbolos } from "../Reportes/TablaSimbolos";
import { Instruccion } from "./Instruccion";
import { RetornoIns } from "./RetornoIns";

export class Case extends Instruccion{
    constructor(private condicion: Expresion, private cuerpo: Instruccion, line: number, column: number){
        super(line, column)
    }

    public execute(entorno: Entorno, simbolos: TablaSimbolos): RetornoIns{
        const condicion = this.condicion
        const cuerpo = this.cuerpo
        return {condicion: condicion, cuerpo: cuerpo}
    }

}