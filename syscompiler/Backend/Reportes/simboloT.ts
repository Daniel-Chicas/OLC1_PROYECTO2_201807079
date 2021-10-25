export class simboloT{
    public id: string;
    public dato: string;
    public tipoDato: string;
    public entorno: string;
    public linea: number;
    public columna: number;

    constructor(id: string, dato: string, tipoDato: string, entorno: string, linea: number, columna: number){
        this.id = id;
        this.dato = dato;
        this.tipoDato = tipoDato;
        this.entorno = entorno;
        this.linea = linea;
        this.columna = columna;
    }
}