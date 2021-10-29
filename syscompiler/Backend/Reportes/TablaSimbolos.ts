import { simboloT } from "./simboloT";


export class TablaSimbolos{
    public variables: Map<string,simboloT>;

    constructor(public simbolo: simboloT){
        this.variables = new Map()
    }

    public setVariable(simbolo: simboloT, id: string){
        this.variables.set(id, simbolo)
    }

    grafica(simbolos) {
        var html = [];
        simbolos.variables.forEach(elemento => {
            html.push(elemento.id+"&"+elemento.dato+"&"+elemento.tipoDato+"&"+elemento.entorno+"&"+elemento.linea+"&"+elemento.columna);
        });
        return html;
    }


}
