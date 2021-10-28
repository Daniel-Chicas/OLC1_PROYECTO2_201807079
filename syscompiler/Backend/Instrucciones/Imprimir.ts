import { Entorno } from "../Ambitos/Entorno";
import { Expresion } from "../Expresiones/Expresion";
import { TablaSimbolos } from "../Reportes/TablaSimbolos";
import { Instruccion } from "./Instruccion";

var imprimir = [];

export class Imprimir extends Instruccion{
    private expresiones: Expresion[];
    constructor(expresiones: Expresion[], line: number, column: number){
        imprimir = []
        super(line, column)
        this.expresiones = expresiones;
    }

    public execute(entorno: Entorno, simbolos: TablaSimbolos){
        for (const expresion of this.expresiones) {
            const value = expresion.execute(entorno, simbolos)
            if(value.type > 10){
                for (let i = 0; i < value.value.length; i++) {
                    const val = value.value[i].execute(entorno, simbolos);
                    imprimir.push(val.value)
                }
            }else{
                imprimir.push(value.value)
            }
        }
    }

}

export class Impresiones{
    public getLista(){
        return imprimir
    }

}