import { Entorno } from "../Ambitos/Entorno";
import { Error_ } from "../Error/Error";
import { TablaSimbolos } from "../Reportes/TablaSimbolos";
import { Instruccion } from "./Instruccion";
import { MetodosFunciones } from "./MetodosFunciones";

export class CuerpoSentencias extends Instruccion{
    constructor(private codigo: Instruccion[], line: number, column: number){
        super(line, column)
    }

    public execute(entorno: Entorno, simbolos: TablaSimbolos){
        for (const instruccion of this.codigo) {
            
            if(instruccion instanceof MetodosFunciones){
                throw new Error_(this.line, this.column, "Semántico", "No se permiten funciones anidadas.");
            }

            const elemento = instruccion.execute(entorno, simbolos)

            if(elemento !=  null || elemento != undefined){
                return elemento
            }
        }
    }
}