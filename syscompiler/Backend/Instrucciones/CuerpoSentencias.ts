import { Entorno } from "../Ambitos/Entorno";
import { Error_ } from "../Error/Error";
import { TablaSimbolos } from "../Reportes/TablaSimbolos";
import { Instruccion } from "./Instruccion";
import { Metodos } from "./Metodos";

export class CuerpoSentencias extends Instruccion{
    constructor(private codigo: Instruccion[], line: number, column: number){
        super(line, column)
    }

    public execute(entorno: Entorno, simbolos: TablaSimbolos){
        const sentencia = new Entorno(entorno, "Sentencia")

        for (const instruccion of this.codigo) {
            
            try{
                if(instruccion instanceof Metodos){
                    throw new Error_(this.line, this.column, "Semántico", "No se permiten funciones anidadas.");
                }

                const elemento = instruccion.execute(sentencia, simbolos)

                if(elemento !=  null || elemento != undefined){
                    return elemento
                }
            }catch(error){
                console.log(error)
            }
        }
    }
}