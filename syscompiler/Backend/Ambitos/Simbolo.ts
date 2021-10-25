import { Type } from "../Expresiones/Retorno";

export class Simbolo{
    public valor: any;
    public id: string;
    public type: Type;
    public line: number;
    public column: number;

    constructor(valor: any, id:string, type: Type, line:number, column: number) {
        this.valor = valor;
        this.id = id;
        this.type = type;
        this.line = line;
        this.column = column;
    }
}