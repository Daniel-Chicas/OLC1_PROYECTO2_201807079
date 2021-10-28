import { Entorno } from "../Ambitos/Entorno";
import { Expresion } from "../Expresiones/Expresion";
import { TablaSimbolos } from "../Reportes/TablaSimbolos";
import { Instruccion } from "./Instruccion";

export class Break extends Instruccion{
    constructor(line: number, column: number){
        super(line, column)
    }

    public execute(entorno: Entorno){
        return {type: "break", line: this.line, column: this.column }
    }
}

export class Continue extends Instruccion{
    constructor(line: number, column: number){
        super(line, column)
    }

    public execute(entorno: Entorno){
        return {type: "continue", line: this.line, column: this.column }
    }
}

export class Return extends Instruccion{
    constructor(private devuelve: Expresion | null, line: number, column: number){
        super(line, column)
    }

    public execute(entorno: Entorno, simbolos: TablaSimbolos){
        if(this.devuelve == null){
            return {value: null, type: "return", line: this.line, column: this.column }
        }else{
            var value = this.devuelve.execute(entorno, simbolos)
            return {value: value, type: "return", line: this.line, column: this.column }
        }
    }
}