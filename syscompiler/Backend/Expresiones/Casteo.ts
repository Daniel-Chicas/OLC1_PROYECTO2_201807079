import { Entorno } from '../Ambitos/Entorno';
import { Error_ } from '../Error/Error';
import { Expresion } from './Expresion';
import { Retorno, Type } from './Retorno';

export class Casteo extends Expresion{

    constructor(private tipoCasteo: string, private value: Expresion, line: number, column: number){
        super(line, column);
    }

    public execute(entorno: Entorno): Retorno {
        const valor = this.value.execute(entorno);
        if( valor.type == Type.ENTERO && this.tipoCasteo.toLowerCase() == "double"){
            //console.log(Number((valor.value).toFixed(2)))
            return { value: Number((valor.value).toFixed(2)), type: Type.DOUBLE }
        }else if( valor.type == Type.ENTERO && this.tipoCasteo.toLowerCase() == "char"){
            //console.log(String.fromCharCode(valor.value))
            return { value: String.fromCharCode(valor.value), type: Type.CHAR }
        }else if( valor.type == Type.DOUBLE && this.tipoCasteo.toLowerCase() == "int"){
            //console.log(valor.value | 0)
            return { value: valor.value | 0, type: Type.ENTERO }
        }else if( valor.type == Type.CHAR && this.tipoCasteo.toLowerCase() == "int"){
            //console.log(valor.value.charCodeAt(0))
            return { value: valor.value.charCodeAt(0) | 0, type: Type.ENTERO }
        }else if( valor.type == Type.CHAR && this.tipoCasteo.toLowerCase() == "double"){
            //console.log(Number(valor.value.charCodeAt(0).toFixed(2)))
            return { value: Number(valor.value.charCodeAt(0).toFixed(2)) , type: Type.DOUBLE }
        }

        throw new Error_(this.line, this.column, "Semántico", "No es posible convertir el valor: "+valor.type+", al tipo: "+this.tipoCasteo)
    }
}
