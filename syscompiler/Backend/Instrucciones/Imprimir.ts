import { Entorno } from "../Ambitos/Entorno";
import { Expresion } from "../Expresiones/Expresion";
import { TablaSimbolos } from "../Reportes/TablaSimbolos";
import { Instruccion } from "./Instruccion";

export class Imprimir extends Instruccion{
    private expresiones: Expresion[];
    constructor(expresiones: Expresion[], line: number, column: number){
        super(line, column)
        this.expresiones = expresiones;
    }

    public execute(entorno: Entorno, simbolos: TablaSimbolos){
        for (const expresion of this.expresiones) {
            const value = expresion.execute(entorno, simbolos)
            console.log(value.value)
        }
    }
}