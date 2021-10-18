import { Expresion } from "./Expresion";
import { Retorno, Type } from "./Retorno"
import { Error_ } from "../Error/Error";
import { Entorno } from "../Ambitos/Entorno";

export class Aritmetica extends Expresion {

    constructor(private left: Expresion, private right: Expresion, private tipo: TipoAritmetica, line: number, column: number) {
        super(line, column);
        //var x = this.execute();
        //console.log(x)
    }

    public execute(entorno: Entorno): Retorno {
        const leftValue = this.left.execute(entorno);

        const rightValue = this.right.execute(entorno);

        if (this.tipo == TipoAritmetica.SUMA) {
            let dominante = this.tipoSum(leftValue.type, rightValue.type);
            if (dominante == Type.CADENA) {
                return { value: (leftValue.value.toString() + rightValue.value.toString()), type: Type.CADENA };
            }else if (dominante == Type.ENTERO){
                if(leftValue.type == Type.ENTERO && rightValue.type == Type.ENTERO){
                    return { value: Number(leftValue.value + rightValue.value), type: Type.ENTERO };
                }else if(leftValue.type == Type.BOOLEAN && rightValue.type == Type.ENTERO){
                    if(leftValue.value == "true"){
                        return { value: Number(1 + rightValue.value), type: Type.ENTERO };
                    }else{
                        return { value: Number(0 + rightValue.value), type: Type.ENTERO };
                    }
                }else if(leftValue.type == Type.ENTERO && rightValue.type == Type.BOOLEAN){
                    if(rightValue.value == "true"){
                        return { value: Number(leftValue.value + 1), type: Type.ENTERO };
                    }else{
                        return { value: Number(leftValue.value + 0), type: Type.ENTERO };
                    }
                }else if(leftValue.type == Type.CHAR && rightValue.type == Type.ENTERO){
                    return { value: Number(leftValue.value.charCodeAt(0) + rightValue.value), type: Type.ENTERO };
                }else if(leftValue.type == Type.ENTERO && rightValue.type == Type.CHAR){
                    return { value: Number(leftValue.value + rightValue.value.charCodeAt(0)), type: Type.ENTERO };
                }
            }else if(dominante == Type.DOUBLE){
                if(leftValue.type == Type.ENTERO && rightValue.type == Type.DOUBLE || leftValue.type == Type.DOUBLE && rightValue.type == Type.ENTERO || leftValue.type == Type.DOUBLE && rightValue.type == Type.DOUBLE){
                    return { value: Number(leftValue.value + rightValue.value), type: Type.DOUBLE };
                }else if(leftValue.type == Type.BOOLEAN && rightValue.type == Type.DOUBLE){
                    if(leftValue.value == "true"){
                        return { value: Number(1 + rightValue.value), type: Type.DOUBLE };
                    }else{
                        return { value: Number(0 + rightValue.value), type: Type.DOUBLE };
                    }
                }else if(leftValue.type == Type.DOUBLE && rightValue.type == Type.BOOLEAN){
                    if(rightValue.value == "true"){
                        return { value: Number(leftValue.value + 1), type: Type.DOUBLE };
                    }else{
                        return { value: Number(leftValue.value + 0), type: Type.DOUBLE };
                    }
                }else if(leftValue.type == Type.CHAR && rightValue.type == Type.DOUBLE){
                    return { value: Number(leftValue.value.charCodeAt(0) + rightValue.value), type: Type.DOUBLE };
                }else if(leftValue.type == Type.DOUBLE && rightValue.type == Type.CHAR){
                    return { value: Number(leftValue.value + rightValue.value.charCodeAt(0)), type: Type.DOUBLE };
                }
            }else if (dominante == Type.ERROR){
                throw new Error_(this.line, this.column, 'Semantico', 'No se puede sumar: ' + leftValue.type + ' y ' + rightValue.type);
            }
        }else if (this.tipo == TipoAritmetica.RESTA){
            let dominante = this.tipoRes(leftValue.type, rightValue.type);
            if (dominante == Type.ENTERO){
                if(leftValue.type == Type.ENTERO && rightValue.type == Type.ENTERO){
                    return { value: Number(leftValue.value - rightValue.value), type: Type.ENTERO };
                }else if(leftValue.type == Type.BOOLEAN && rightValue.type == Type.ENTERO){
                    if(leftValue.value == "true"){
                        return { value: Number(1 - rightValue.value), type: Type.ENTERO };
                    }else{
                        return { value: Number(0 - rightValue.value), type: Type.ENTERO };
                    }
                }else if(leftValue.type == Type.ENTERO && rightValue.type == Type.BOOLEAN){
                    if(rightValue.value == "true"){
                        return { value: Number(leftValue.value - 1), type: Type.ENTERO };
                    }else{
                        return { value: Number(leftValue.value - 0), type: Type.ENTERO };
                    }
                }else if(leftValue.type == Type.CHAR && rightValue.type == Type.ENTERO){
                    return { value: Number(leftValue.value.charCodeAt(0) - rightValue.value), type: Type.ENTERO };
                }else if(leftValue.type == Type.ENTERO && rightValue.type == Type.CHAR){
                    return { value: Number(leftValue.value - rightValue.value.charCodeAt(0)), type: Type.ENTERO };
                }
            }else if(dominante == Type.DOUBLE){
                if(leftValue.type == Type.ENTERO && rightValue.type == Type.DOUBLE || leftValue.type == Type.DOUBLE && rightValue.type == Type.ENTERO || leftValue.type == Type.DOUBLE && rightValue.type == Type.DOUBLE){
                    return { value: Number(leftValue.value - rightValue.value), type: Type.DOUBLE };
                }else if(leftValue.type == Type.BOOLEAN && rightValue.type == Type.DOUBLE){
                    if(leftValue.value == "true"){
                        return { value: Number(1 - rightValue.value), type: Type.DOUBLE };
                    }else{
                        return { value: Number(0 - rightValue.value), type: Type.DOUBLE };
                    }
                }else if(leftValue.type == Type.DOUBLE && rightValue.type == Type.BOOLEAN){
                    if(rightValue.value == "true"){
                        return { value: Number(leftValue.value - 1), type: Type.DOUBLE };
                    }else{
                        return { value: Number(leftValue.value - 0), type: Type.DOUBLE };
                    }
                }else if(leftValue.type == Type.CHAR && rightValue.type == Type.DOUBLE){
                    return { value: Number(leftValue.value.charCodeAt(0) - rightValue.value), type: Type.DOUBLE };
                }else if(leftValue.type == Type.DOUBLE && rightValue.type == Type.CHAR){
                    return { value: Number(leftValue.value - rightValue.value.charCodeAt(0)), type: Type.DOUBLE };
                }
            }else if (dominante == Type.ERROR){
                throw new Error_(this.line, this.column, 'Semantico', 'No se puede restar: ' + leftValue.type + ' y ' + rightValue.type);
            }
        }else if(this.tipo == TipoAritmetica.MULTIPLICACION){
            let dominante = this.tipoMul(leftValue.type, rightValue.type);
            if (dominante == Type.ENTERO){
                if(leftValue.type == Type.ENTERO && rightValue.type == Type.ENTERO){
                    return { value: Number(leftValue.value * rightValue.value), type: Type.ENTERO };
                }else if(leftValue.type == Type.CHAR && rightValue.type == Type.ENTERO){
                    return { value: Number(leftValue.value.charCodeAt(0) * rightValue.value), type: Type.ENTERO };
                }else if(leftValue.type == Type.ENTERO && rightValue.type == Type.CHAR){
                    return { value: Number(leftValue.value * rightValue.value.charCodeAt(0)), type: Type.ENTERO };
                }
            }else if(dominante == Type.DOUBLE){
                if(leftValue.type == Type.ENTERO && rightValue.type == Type.DOUBLE || leftValue.type == Type.DOUBLE && rightValue.type == Type.ENTERO || leftValue.type == Type.DOUBLE && rightValue.type == Type.DOUBLE){
                    return { value: Number(leftValue.value * rightValue.value), type: Type.DOUBLE };
                }else if(leftValue.type == Type.CHAR && rightValue.type == Type.DOUBLE){
                    return { value: Number(leftValue.value.charCodeAt(0) * rightValue.value), type: Type.DOUBLE };
                }else if(leftValue.type == Type.DOUBLE && rightValue.type == Type.CHAR){
                    return { value: Number(leftValue.value * rightValue.value.charCodeAt(0)), type: Type.DOUBLE };
                }
            }else if (dominante == Type.ERROR){
                throw new Error_(this.line, this.column, 'Semantico', 'No se puede multiplicar: ' + leftValue.type + ' y ' + rightValue.type);
            }
        }else if(this.tipo == TipoAritmetica.DIVISION){
            let dominante = this.tipoDiv(leftValue.type, rightValue.type);
            if (dominante == Type.DOUBLE && rightValue.value != 0){
                if(leftValue.type == Type.ENTERO && rightValue.type == Type.ENTERO || leftValue.type == Type.DOUBLE && rightValue.type == Type.DOUBLE || leftValue.type == Type.DOUBLE && rightValue.type == Type.ENTERO || leftValue.type == Type.ENTERO && rightValue.type == Type.DOUBLE){
                    return { value: Number(leftValue.value / rightValue.value), type: Type.DOUBLE };
                }else if(leftValue.type == Type.CHAR && rightValue.type == Type.ENTERO || leftValue.type == Type.CHAR && rightValue.type == Type.DOUBLE){
                    return { value: Number(leftValue.value.charCodeAt(0) / rightValue.value), type: Type.DOUBLE };
                }else if(leftValue.type == Type.ENTERO && rightValue.type == Type.CHAR || leftValue.type == Type.DOUBLE && rightValue.type == Type.CHAR){
                    return { value: Number(leftValue.value / rightValue.value.charCodeAt(0)), type: Type.DOUBLE };
                }
            }else if (dominante == Type.ERROR || rightValue.value == 0){
                throw new Error_(this.line, this.column, 'Semantico', 'No se puede dividir: ' + leftValue.type + ' y ' + rightValue.type);
            }
        }else if(this.tipo == TipoAritmetica.POTENCIA){
            let dominante = this.tipoPot(leftValue.type, rightValue.type);
            if (dominante == Type.ENTERO){
                    return { value: Math.pow(leftValue.value, rightValue.value), type: Type.ENTERO };
            }else if(dominante == Type.DOUBLE){
                if(leftValue.type == Type.ENTERO && rightValue.type == Type.DOUBLE || leftValue.type == Type.DOUBLE && rightValue.type == Type.ENTERO || leftValue.type == Type.DOUBLE && rightValue.type == Type.DOUBLE){
                    return { value: Math.pow(leftValue.value, rightValue.value), type: Type.DOUBLE };
                }
            } else if (dominante == Type.ERROR){
                throw new Error_(this.line, this.column, 'Semantico', 'No se puede elevar: ' + leftValue.type + ' a ' + rightValue.type);
            }
        }else if(this.tipo == TipoAritmetica.MODULO){
            let dominante = this.tipoMod(leftValue.type, rightValue.type);
            if (dominante == Type.DOUBLE){
                    return { value:Number(leftValue.value % rightValue.value), type: Type.ENTERO };
            }else if (dominante == Type.ERROR){
                throw new Error_(this.line, this.column, 'Semantico', 'No se puede hacer módulo de: ' + leftValue.type + ' y ' + rightValue.type);
            }
        }
        
        throw new Error_(this.line, this.column, 'Semantico', 'No se puede operar: ' + leftValue.value + ' y ' + rightValue.value);
    }
}

export enum TipoAritmetica {
    SUMA,
    RESTA,
    MULTIPLICACION,
    DIVISION,
    POTENCIA,
    MODULO
}