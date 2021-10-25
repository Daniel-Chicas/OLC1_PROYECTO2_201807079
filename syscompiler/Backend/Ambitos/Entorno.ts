import { Error_ } from "../Error/Error";
import { Type } from "../Expresiones/Retorno";
import { Metodos } from "../Instrucciones/Metodos";
import { simboloT } from "../Reportes/simboloT";
import { TablaSimbolos } from "../Reportes/TablaSimbolos";
import { Simbolo } from "./Simbolo";

export class Entorno{
    public variables: Map<string, Simbolo>;
    public metodos: Map<string, Metodos>

    constructor(public anterior: Entorno | null, public id: string){
        this.variables = new Map()
        this.metodos = new Map()
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

    public setVariable(id: string, valor: any, type: Type, line: number, column: number, tabla: TablaSimbolos){
        var existe = false;
        let env: Entorno | null = this
        while(env != null){
            if(env.variables.has(id)){
                const variable = env.variables.get(id);
                if(variable.type == type){
                    existe = true;
                    env.variables.set(id, new Simbolo(valor, id, type, line, column))
                }else{
                    throw new Error_(line, column, "Semántico", "No se puede ligar un nuevo tipo a la variable: "+id+". Linea: "+line+", Columna: "+column+".")
                }
            }
            env = env.anterior;
        }
        this.variables.set(id, new Simbolo(valor, id, type, line, column))
        if(type == Type.ENTERO){
            var simbTab = new simboloT(id, "VARIABLE", "ENTERO", this.id, line, column)
            tabla.setVariable(simbTab, id+"-"+this.id)
        }else if(type == Type.DOUBLE){
            var simbTab = new simboloT(id, "VARIABLE", "DECIMAL", this.id, line, column)
            tabla.setVariable(simbTab, id+"-"+this.id)
        }else if(type == Type.BOOLEAN){
            var simbTab = new simboloT(id, "VARIABLE", "BOOLEAN", this.id, line, column)
            tabla.setVariable(simbTab, id+"-"+this.id)
        }else if(type == Type.CHAR){
            var simbTab = new simboloT(id, "VARIABLE", "CHAR", this.id, line, column)
            tabla.setVariable(simbTab, id+"-"+this.id)
        }else if(type == Type.CADENA){
            var simbTab = new simboloT(id, "VARIABLE", "STRING", this.id, line, column)
            tabla.setVariable(simbTab, id+"-"+this.id)
        }else if(type == Type.VECTORENT){
            var simbTab = new simboloT(id, "VECTOR", "ENTERO", this.id, line, column)
            tabla.setVariable(simbTab, id+"-"+this.id)
        }else if(type == Type.VECTORDOU){
            var simbTab = new simboloT(id, "VECTOR", "DECIMAL", this.id, line, column)
            tabla.setVariable(simbTab, id+"-"+this.id)
        }else if(type == Type.VECTORBOO){
            var simbTab = new simboloT(id, "VECTOR", "BOOLEAN", this.id, line, column)
            tabla.setVariable(simbTab, id+"-"+this.id)
        }else if(type == Type.VECTORCHA){
            var simbTab = new simboloT(id, "VECTOR", "CHAR", this.id, line, column)
            tabla.setVariable(simbTab, id+"-"+this.id)
        }else if(type == Type.VECTORCAD){
            var simbTab = new simboloT(id, "VECTOR", "STRING", this.id, line, column)
            tabla.setVariable(simbTab, id+"-"+this.id)
        }else if(type == Type.LISTAENT){
            var simbTab = new simboloT(id, "LISTA", "ENTERO", this.id, line, column)
            tabla.setVariable(simbTab, id+"-"+this.id)
        }else if(type == Type.LISTADOU){
            var simbTab = new simboloT(id, "LISTA", "DECIMAL", this.id, line, column)
            tabla.setVariable(simbTab, id+"-"+this.id)
        }else if(type == Type.LISTABOO){
            var simbTab = new simboloT(id, "LISTA", "BOOLEAN", this.id, line, column)
            tabla.setVariable(simbTab, id+"-"+this.id)
        }else if(type == Type.LISTACHA){
            var simbTab = new simboloT(id, "LISTA", "CHAR", this.id, line, column)
            tabla.setVariable(simbTab, id+"-"+this.id)
        }else if(type == Type.LISTACAD){
            var simbTab = new simboloT(id, "LISTA", "STRING", this.id, line, column)
            tabla.setVariable(simbTab, id+"-"+this.id)
        }else if(type == Type.COMENTARIO){
            var simbTab = new simboloT(id, "COMENTARIO", "COMENTARIO", this.id, line, column)
            tabla.setVariable(simbTab, id+"-"+this.id)
        }
    }

    public guardarMetodo(id: string, metodo: Metodos){
        this.metodos.set(id, metodo)
    }

    public getMetodo(id: string){
        let env: Entorno | null = this;
        while(env != null){
            if(env.metodos.has(id)){
                return env.metodos.get(id)
            }
            env = env.anterior;
        }
        return null
    }
}