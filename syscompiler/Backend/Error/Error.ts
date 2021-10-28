var lista = []

export class Error_ {
    constructor(public linea: number, public columna: number, public tipo: string, public mensaje: string) {
    }

    public setError(error: Error){
        lista.push(error)
    }

    public getLista(){
        return lista
    }
}