import { Entorno } from "../Ambitos/Entorno";
import { simboloT } from "../Reportes/simboloT";
import { TablaSimbolos } from "../Reportes/TablaSimbolos";
import { Instruccion } from "./Instruccion";

export class MetodosFunciones extends Instruccion{
    constructor(public id: string, public parametros: string, public cuerpo: Instruccion, line: number, column: number ){
        super(line, column)
    }

    public execute(entorno: Entorno, simbolos: TablaSimbolos){
        entorno.guardarMetodo(this.id, this, simbolos)
    }
}

export class Funciones extends Instruccion{
    constructor(public tipo: string, public id: string, public parametros: string, public cuerpo: Instruccion, line: number, column: number ){
        super(line, column)
    }

    public execute(entorno: Entorno, simbolos: TablaSimbolos){
        entorno.guardarFuncion(this.id, this, simbolos)
    }
}