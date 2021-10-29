


export class nodoArbol{
    public contador = 1;
    public hijos;
    public id = 0;
    constructor(public valor: any, public tipo: any){
        this.id;
        this.valor = valor;
        this.tipo = tipo;
        this.hijos = [];
    }

    public getValor(){
        this.valor
    }

    public getTipo(){
        this.tipo
    }

    public agregarHijo(hijo: any){
        this.hijos.push(hijo)
    }

}

var id_n = 1; 
var ast = []

export class Recorrido_Arbol{
    constructor(private nombre: string){ 
    }
    recorrer_arbolito3(nodo){
        var concatena= "";
        if(nodo == undefined){
            console.error("NODO UNDEFINED")
            return
        }
        if(nodo.id==0){
            nodo.id=id_n;
            id_n++;
        }
        concatena = nodo.id + ' [label= "'+ nodo.valor +'" fillcolor="#d62728" shape="circle"];'
        ast.push(concatena)
        if(nodo.hijos != undefined){
            nodo.hijos.forEach(element => {
                concatena = nodo.id+'->'+ id_n +";"
                ast.push(concatena)
                this.recorrer_arbolito3(element);
            });
        }else{
            console.error("NODO HIJOS UNDEFINED"+nodo)
        }
    }

    public getAST(){
        return ast
    }

    public clearAST(){
        ast = []
    }

}