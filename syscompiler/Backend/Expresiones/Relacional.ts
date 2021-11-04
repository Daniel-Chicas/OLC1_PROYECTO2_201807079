import { Expresion } from "./Expresion";
import { Retorno, Type } from "./Retorno"
import { Error_ } from "../Error/Error";
import { Entorno } from "../Ambitos/Entorno";
import { TablaSimbolos } from "../Reportes/TablaSimbolos";

export class Relacional extends Expresion{
    constructor(private left: Expresion, private right: Expresion, private tipo: TipoRelacional, line: number, column: number) {
        super(line, column);
    }

    public execute(entorno: Entorno, simbolos: TablaSimbolos): Retorno {
        const leftValue = this.left.execute(entorno, simbolos);
        const rightValue = this.right.execute(entorno, simbolos);

        if (this.tipo == TipoRelacional.IGUAL) {
            if(leftValue.type == 0 && rightValue.type == 0){
                const result = Number(leftValue.value) == Number(rightValue.value)
                return { value: result, type: Type.BOOLEAN }
            }else if(leftValue.type == 1 && rightValue.type == 1){
                const result = Number(leftValue.value) == Number(rightValue.value)
                return { value: result, type: Type.BOOLEAN }
            }else if(leftValue.type == 1 && rightValue.type == 0){
                const result = Number(leftValue.value) == Number(rightValue.value)
                return { value: result, type: Type.BOOLEAN }
            }else if(leftValue.type == 0 && rightValue.type == 1){
                const result = Number(leftValue.value) == Number(rightValue.value)
                return { value: result, type: Type.BOOLEAN }
            }
            const result = leftValue.value == rightValue.value
            return { value: result, type: Type.BOOLEAN }
        }else if (this.tipo == TipoRelacional.DIFERENCIA) {
            if(leftValue.type == 0 && rightValue.type == 0){
                const result = Number(leftValue.value) != Number(rightValue.value)
                return { value: result, type: Type.BOOLEAN }
            }else if(leftValue.type == 1 && rightValue.type == 1){
                const result = Number(leftValue.value) != Number(rightValue.value)
                return { value: result, type: Type.BOOLEAN }
            }else if(leftValue.type == 1 && rightValue.type == 0){
                const result = Number(leftValue.value) != Number(rightValue.value)
                return { value: result, type: Type.BOOLEAN }
            }else if(leftValue.type == 0 && rightValue.type == 1){
                const result = Number(leftValue.value)!= Number(rightValue.value)
                return { value: result, type: Type.BOOLEAN }
            }
            const result = leftValue.value != rightValue.value
            return { value: result, type: Type.BOOLEAN }
        }else if (this.tipo == TipoRelacional.MENOR) {
            if(leftValue.type == 0 && rightValue.type == 0){
                const result = Number(leftValue.value) < Number(rightValue.value)
                return { value: result, type: Type.BOOLEAN }
            }else if(leftValue.type == 1 && rightValue.type == 1){
                const result = Number(leftValue.value) < Number(rightValue.value)
                return { value: result, type: Type.BOOLEAN }
            }else if(leftValue.type == 1 && rightValue.type == 0){
                const result = Number(leftValue.value) < Number(rightValue.value)
                return { value: result, type: Type.BOOLEAN }
            }else if(leftValue.type == 0 && rightValue.type == 1){
                const result = Number(leftValue.value) < Number(rightValue.value)
                return { value: result, type: Type.BOOLEAN }
            }
            const result = leftValue.value < rightValue.value
            return { value: result, type: Type.BOOLEAN }
        }else if (this.tipo == TipoRelacional.MENORI) {
            if(leftValue.type == 0 && rightValue.type == 0){
                const result = Number(leftValue.value) <=  Number(rightValue.value)
                return { value: result, type: Type.BOOLEAN }
            }else if(leftValue.type == 1 && rightValue.type == 1){
                const result = Number(leftValue.value) <=  Number(rightValue.value)
                return { value: result, type: Type.BOOLEAN }
            }else if(leftValue.type == 1 && rightValue.type == 0){
                const result = Number(leftValue.value) <=  Number(rightValue.value)
                return { value: result, type: Type.BOOLEAN }
            }else if(leftValue.type == 0 && rightValue.type == 1){
                const result = Number(leftValue.value) <=  Number(rightValue.value)
                return { value: result, type: Type.BOOLEAN }
            }
            const result = leftValue.value <= rightValue.value
            return { value: result, type: Type.BOOLEAN }
        }else if (this.tipo == TipoRelacional.MAYOR) {
            if(leftValue.type == 0 && rightValue.type == 0){
                const result = Number(leftValue.value) >  Number(rightValue.value)
                return { value: result, type: Type.BOOLEAN }
            }else if(leftValue.type == 1 && rightValue.type == 1){
                const result = Number(leftValue.value) >  Number(rightValue.value)
                return { value: result, type: Type.BOOLEAN }
            }else if(leftValue.type == 1 && rightValue.type == 0){
                const result = Number(leftValue.value) >  Number(rightValue.value)
                return { value: result, type: Type.BOOLEAN }
            }else if(leftValue.type == 0 && rightValue.type == 1){
                const result = Number(leftValue.value) >  Number(rightValue.value)
                return { value: result, type: Type.BOOLEAN }
            }
            const result = leftValue.value > rightValue.value
            return { value: result, type: Type.BOOLEAN }
        }else if (this.tipo == TipoRelacional.MAYORI) {
            if(leftValue.type == 0 && rightValue.type == 0){
                const result = Number(leftValue.value) >=  Number(rightValue.value)
                return { value: result, type: Type.BOOLEAN }
            }else if(leftValue.type == 1 && rightValue.type == 1){
                const result = Number(leftValue.value) >=  Number(rightValue.value)
                return { value: result, type: Type.BOOLEAN }
            }else if(leftValue.type == 1 && rightValue.type == 0){
                const result = Number(leftValue.value) >=  Number(rightValue.value)
                return { value: result, type: Type.BOOLEAN }
            }else if(leftValue.type == 0 && rightValue.type == 1){
                const result = Number(leftValue.value) >=  Number(rightValue.value)
                return { value: result, type: Type.BOOLEAN }
            }
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