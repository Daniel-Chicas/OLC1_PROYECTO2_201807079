import { Entorno } from "../Ambitos/Entorno";
import { TablaSimbolos } from "../Reportes/TablaSimbolos";

export abstract class Funciones_Metodos{
    constructor(public line: number, public column: number){
        this.line = line;
        this.column = column;
    }

    public abstract execute(entorno: Entorno, simbolos: TablaSimbolos): any;
}