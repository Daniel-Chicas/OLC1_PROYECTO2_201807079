import { Expresion } from "./Expresion";
import { Retorno, Type } from "./Retorno"
import { Error_ } from "../Error/Error";
import { Entorno } from "../Ambitos/Entorno";
import { TablaSimbolos } from "../Reportes/TablaSimbolos";

export class Logica extends Expresion{
    constructor(private left: Expresion, private right: Expresion, private tipo: TipoLogica, line: number, column: number) {
        super(line, column);
        //var x = this.execute();
        //console.log(x)
    }

    public execute(entorno: Entorno, simbolos: TablaSimbolos): Retorno {
        const leftValue = this.left.execute(entorno, simbolos);
        const rightValue = this.right.execute(entorno, simbolos);

        if (this.tipo == TipoLogica.AND) {
            const result = leftValue.value && rightValue.value
            return { value: result, type: Type.BOOLEAN }
        }else if (this.tipo == TipoLogica.OR){
            const result = leftValue.value || rightValue.value
            return { value: result, type: Type.BOOLEAN }
        }else if (this.tipo == TipoLogica.NOT){
            const result = !leftValue.value
            return { value: result, type: Type.BOOLEAN }
        }
        throw new Error_(this.line, this.column, 'Semantico', 'No se puede operar: ' + leftValue.value + ' y ' + rightValue.value);
    }
}

export enum TipoLogica {
    AND,
    OR,
    NOT
}