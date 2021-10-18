import { Expresion } from "./Expresion";
import { Retorno, Type } from "./Retorno"
import { Error_ } from "../Error/Error";
import { Entorno } from "../Ambitos/Entorno";

export class Relacional extends Expresion{
    constructor(private left: Expresion, private right: Expresion, private tipo: TipoRelacional, line: number, column: number) {
        super(line, column);
        //var x = this.execute();
        //console.log(x)
    }

    public execute(entorno: Entorno): Retorno {
        const leftValue = this.left.execute(entorno);
        const rightValue = this.right.execute(entorno);

        if (this.tipo == TipoRelacional.IGUAL) {
            const result = leftValue.value == rightValue.value
            return { value: result, type: Type.BOOLEAN }
        }else if (this.tipo == TipoRelacional.DIFERENCIA) {
            const result = leftValue.value != rightValue.value
            return { value: result, type: Type.BOOLEAN }
        }else if (this.tipo == TipoRelacional.MENOR) {
            const result = leftValue.value < rightValue.value
            return { value: result, type: Type.BOOLEAN }
        }else if (this.tipo == TipoRelacional.MENORI) {
            const result = leftValue.value <= rightValue.value
            return { value: result, type: Type.BOOLEAN }
        }else if (this.tipo == TipoRelacional.MAYOR) {
            const result = leftValue.value > rightValue.value
            return { value: result, type: Type.BOOLEAN }
        }else if (this.tipo == TipoRelacional.MAYORI) {
            const result = leftValue.value >= rightValue.value
            return { value: result, type: Type.BOOLEAN }
        }
        throw new Error_(this.line, this.column, 'Semantico', 'No se puede operar: ' + leftValue.value + ' y ' + rightValue.value);
    }
}

export enum TipoRelacional {
    IGUAL,
    DIFERENCIA,
    MENOR,
    MENORI,
    MAYOR,
    MAYORI
}