import { Error_ } from "../Error/Error";
import { Type } from "../Expresiones/Retorno";
import { Simbolo } from "./Simbolo";

export class Entorno{
    public variables: Map<string, Simbolo>;

    constructor(public anterior: Entorno | null, public id: string){
        this.variables = new Map()
    }

    public getVariable(id: string): Simbolo{
        let env: Entorno | null = this;
        while(env != null){
            if(env.variables.has(id)){
                return env.variables.get(id)
            }
            env = env.anterior;
        }
        return null
    }

    public setVariable(id: string, valor: any, type: Type, line: number, column: number){
        let env: Entorno | null = this
        while(env != null){
            if(env.variables.has(id)){
                const variable = env.variables.get(id);
                if(variable.type == type){
                    env.variables.set(id, new Simbolo(valor, id, type))
                }else{
                    throw new Error_(line, column, "Semántico", "No se puede ligar un nuevo tipo a la variable: "+id+". Linea: "+line+", Columna: "+column+".")
                }
            }
            env = env.anterior;
        }
        this.variables.set(id, new Simbolo(valor, id, type))
    }


}