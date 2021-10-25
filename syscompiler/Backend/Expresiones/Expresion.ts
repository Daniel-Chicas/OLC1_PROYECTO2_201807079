import { Entorno } from "../Ambitos/Entorno";
import { TablaSimbolos } from "../Reportes/TablaSimbolos";
import { tiposSuma, Type, Retorno, tiposResta, tiposMultiplicacion, tiposDivision, tiposPotencia, tiposModulo } from "./Retorno"

export abstract class Expresion {
    public line: number;
    public column: number;
    constructor(line: number, column: number) {
        this.line = line
        this.column = column
    }

    public abstract execute(entorno: Entorno, simbolos: TablaSimbolos): Retorno;

    public tipoSum(tipo1: Type, tipo2: Type): Type {
        return tiposSuma[tipo1][tipo2];
    }
    
    public tipoRes(tipo1: Type, tipo2: Type): Type {
        return tiposResta[tipo1][tipo2];
    }
    
    public tipoMul(tipo1: Type, tipo2: Type): Type {
        return tiposMultiplicacion[tipo1][tipo2];
    }
    
    public tipoDiv(tipo1: Type, tipo2: Type): Type {
        return tiposDivision[tipo1][tipo2];
    }
    
    public tipoPot(tipo1: Type, tipo2: Type): Type {
        return tiposPotencia[tipo1][tipo2];
    }
    
    public tipoMod(tipo1: Type, tipo2: Type): Type {
        return tiposModulo[tipo1][tipo2];
    }
}