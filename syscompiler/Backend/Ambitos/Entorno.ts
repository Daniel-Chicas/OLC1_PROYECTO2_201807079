import { Error_ } from "../Error/Error";
import { Type } from "../Expresiones/Retorno";
import { Funciones, MetodosFunciones } from "../Instrucciones/MetodosFunciones";
import { simboloT } from "../Reportes/simboloT";
import { TablaSimbolos } from "../Reportes/TablaSimbolos";
import { Simbolo } from "./Simbolo";

export class Entorno{
    public variables: Map<string, Simbolo>;
    public metodos: Map<string, MetodosFunciones>;
    public funciones: Map<string, Funciones>;

    constructor(public anterior: Entorno | null, public id: string){
        this.variables = new Map()
        this.metodos = new Map()
        this.funciones = new Map()
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
            var simbTab = new simboloT(id, "VARIABLE", "INT", this.id, line, column)
            tabla.setVariable(simbTab, id+"-"+this.id)
        }else if(type == Type.DOUBLE){
            var simbTab = new simboloT(id, "VARIABLE", "DOUBLE", this.id, line, column)
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
            var simbTab = new simboloT(id, "VECTOR", "INT", this.id, line, column)
            tabla.setVariable(simbTab, id+"-"+this.id)
        }else if(type == Type.VECTORDOU){
            var simbTab = new simboloT(id, "VECTOR", "DOUBLE", this.id, line, column)
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
            var simbTab = new simboloT(id, "LISTA", "INT", this.id, line, column)
            tabla.setVariable(simbTab, id+"-"+this.id)
        }else if(type == Type.LISTADOU){
            var simbTab = new simboloT(id, "LISTA", "DOUBLE", this.id, line, column)
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

    public guardarMetodo(id: string, metodo: MetodosFunciones, tabla: TablaSimbolos){
        this.metodos.set(id, metodo)
        var simbTab = new simboloT(id, "MÉTODO", "VOID", this.id, metodo.line, metodo.column)
        tabla.setVariable(simbTab, id+"-"+this.id)
    }

    public guardarFuncion(id: string, funcion: Funciones, tabla: TablaSimbolos){
        this.funciones.set(id, funcion)
        if(funcion.tipo.toString().toLowerCase() == "int" ){
            var simbTab = new simboloT(id, "FUNCION", "INT", this.id, funcion.line, funcion.column)
            tabla.setVariable(simbTab, id+"-"+this.id)
        }else if(funcion.tipo.toString().toLowerCase() == "double"){
            var simbTab = new simboloT(id, "FUNCION", "DOUBLE", this.id, funcion.line, funcion.column)
            tabla.setVariable(simbTab, id+"-"+this.id)
        }else if(funcion.tipo.toString().toLowerCase() == "boolean"){
            var simbTab = new simboloT(id, "FUNCION", "BOOLEAN", this.id, funcion.line, funcion.column)
            tabla.setVariable(simbTab, id+"-"+this.id)
        }else if(funcion.tipo.toString().toLowerCase() == "char"){
            var simbTab = new simboloT(id, "FUNCION", "CHAR", this.id, funcion.line, funcion.column)
            tabla.setVariable(simbTab, id+"-"+this.id)
        }else if(funcion.tipo.toString().toLowerCase() == "string"){
            var simbTab = new simboloT(id, "FUNCION", "STRING", this.id, funcion.line, funcion.column)
            tabla.setVariable(simbTab, id+"-"+this.id)
        }else if(funcion.tipo.toString().toLowerCase() == "int"){
            var simbTab = new simboloT(id, "FUNCION", "INT", this.id, funcion.line, funcion.column)
            tabla.setVariable(simbTab, id+"-"+this.id)
        }else if(funcion.tipo.toString().toLowerCase() == "double"){
            var simbTab = new simboloT(id, "FUNCION", "DOUBLE", this.id, funcion.line, funcion.column)
            tabla.setVariable(simbTab, id+"-"+this.id)
        }else{
            var vecli = funcion.tipo.split("&")
            if(vecli[0].toString().toLowerCase() == "vector"){
                if(vecli[1].toString().toLowerCase() == "int"){
                    var simbTab = new simboloT(id, "FUNCION", "VECTOR INT", this.id, funcion.line, funcion.column)
                    tabla.setVariable(simbTab, id+"-"+this.id)
                }else if(vecli[1].toString().toLowerCase() == "double"){
                    var simbTab = new simboloT(id, "FUNCION", "VECTOR DOUBLE", this.id, funcion.line, funcion.column)
                    tabla.setVariable(simbTab, id+"-"+this.id)
                }else if(vecli[1].toString().toLowerCase() == "boolean"){
                    var simbTab = new simboloT(id, "FUNCION", "VECTOR BOOLEAN", this.id, funcion.line, funcion.column)
                    tabla.setVariable(simbTab, id+"-"+this.id)
                }else if(vecli[1].toString().toLowerCase() == "char"){
                    var simbTab = new simboloT(id, "FUNCION", "VECTOR CHAR", this.id, funcion.line, funcion.column)
                    tabla.setVariable(simbTab, id+"-"+this.id)
                }else if(vecli[1].toString().toLowerCase() == "string"){
                    var simbTab = new simboloT(id, "FUNCION", "VECTOR STRING", this.id, funcion.line, funcion.column)
                    tabla.setVariable(simbTab, id+"-"+this.id)
                }else if(vecli[1].toString().toLowerCase() == "int"){
                    var simbTab = new simboloT(id, "FUNCION", "VECTOR INT", this.id, funcion.line, funcion.column)
                    tabla.setVariable(simbTab, id+"-"+this.id)
                }else if(vecli[1].toString().toLowerCase() == "double"){
                    var simbTab = new simboloT(id, "FUNCION", "VECTOR DOUBLE", this.id, funcion.line, funcion.column)
                    tabla.setVariable(simbTab, id+"-"+this.id)
                }
            }else if(vecli[0].toString().toLowerCase() == "lista"){
                if(vecli[1].toString().toLowerCase() == "int"){
                    var simbTab = new simboloT(id, "FUNCION", "LISTA INT", this.id, funcion.line, funcion.column)
                    tabla.setVariable(simbTab, id+"-"+this.id)
                }else if(vecli[1].toString().toLowerCase() == "double"){
                    var simbTab = new simboloT(id, "FUNCION", "LISTA DOUBLE", this.id, funcion.line, funcion.column)
                    tabla.setVariable(simbTab, id+"-"+this.id)
                }else if(vecli[1].toString().toLowerCase() == "boolean"){
                    var simbTab = new simboloT(id, "FUNCION", "LISTA BOOLEAN", this.id, funcion.line, funcion.column)
                    tabla.setVariable(simbTab, id+"-"+this.id)
                }else if(vecli[1].toString().toLowerCase() == "char"){
                    var simbTab = new simboloT(id, "FUNCION", "LISTA CHAR", this.id, funcion.line, funcion.column)
                    tabla.setVariable(simbTab, id+"-"+this.id)
                }else if(vecli[1].toString().toLowerCase() == "string"){
                    var simbTab = new simboloT(id, "FUNCION", "LISTA STRING", this.id, funcion.line, funcion.column)
                    tabla.setVariable(simbTab, id+"-"+this.id)
                }else if(vecli[1].toString().toLowerCase() == "int"){
                    var simbTab = new simboloT(id, "FUNCION", "LISTA INT", this.id, funcion.line, funcion.column)
                    tabla.setVariable(simbTab, id+"-"+this.id)
                }else if(vecli[1].toString().toLowerCase() == "double"){
                    var simbTab = new simboloT(id, "FUNCION", "LISTA DOUBLE", this.id, funcion.line, funcion.column)
                    tabla.setVariable(simbTab, id+"-"+this.id)
                }
            }
        }
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


    public getFuncion(id: string){
        let env: Entorno | null = this;
        while(env != null){
            if(env.funciones.has(id)){
                return env.funciones.get(id)
            }
            env = env.anterior;
        }
        return null
    }

}