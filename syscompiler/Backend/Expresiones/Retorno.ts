export enum Type{
    ENTERO = 0,
    DOUBLE = 1,
    BOOLEAN = 2,
    CHAR = 3,
    CADENA = 4,
    ERROR = 5,
    //EXTRAS
    VECTORENT = 60,
    VECTORDOU = 61,
    VECTORBOO = 62,
    VECTORCHA = 63,
    VECTORCAD = 64,
    LISTAENT = 70,
    LISTADOU = 71,
    LISTABOO = 72,
    LISTACHA = 73,
    LISTACAD = 74,
    COMENTARIO=100
}

export type Retorno = {
    value: any,
    type: Type
}

export const tiposSuma = [
    [ Type.ENTERO, Type.DOUBLE, Type.ENTERO, Type.ENTERO, Type.CADENA ],
    [ Type.DOUBLE, Type.DOUBLE, Type.DOUBLE, Type.DOUBLE, Type.CADENA ],
    [ Type.ENTERO, Type.DOUBLE, Type.ERROR,  Type.ERROR,  Type.CADENA ],
    [ Type.ENTERO, Type.DOUBLE, Type.ERROR,  Type.CADENA, Type.CADENA ],
    [ Type.CADENA, Type.CADENA, Type.CADENA, Type.CADENA, Type.CADENA ]
];

export const tiposResta = [
    [ Type.ENTERO, Type.DOUBLE, Type.ENTERO, Type.ENTERO, Type.ERROR ],
    [ Type.DOUBLE, Type.DOUBLE, Type.DOUBLE, Type.DOUBLE, Type.ERROR ],
    [ Type.ENTERO, Type.DOUBLE, Type.ERROR,  Type.ERROR,  Type.ERROR ],
    [ Type.ENTERO, Type.DOUBLE, Type.ERROR,  Type.ERROR,  Type.ERROR ],
    [ Type.ERROR,  Type.ERROR,  Type.ERROR,  Type.ERROR,  Type.ERROR ]
];

export const tiposMultiplicacion = [
    [ Type.ENTERO, Type.DOUBLE, Type.ERROR, Type.ENTERO, Type.ERROR ],
    [ Type.DOUBLE, Type.DOUBLE, Type.ERROR, Type.DOUBLE, Type.ERROR ],
    [ Type.ERROR,  Type.ERROR,  Type.ERROR, Type.ERROR,  Type.ERROR ],
    [ Type.ENTERO, Type.DOUBLE, Type.ERROR, Type.ERROR,  Type.ERROR ],
    [ Type.ERROR,  Type.ERROR,  Type.ERROR, Type.ERROR,  Type.ERROR ]
];

export const tiposDivision = [
    [ Type.DOUBLE, Type.DOUBLE, Type.ERROR, Type.DOUBLE, Type.ERROR ],
    [ Type.DOUBLE, Type.DOUBLE, Type.ERROR, Type.DOUBLE, Type.ERROR ],
    [ Type.ERROR,  Type.ERROR,  Type.ERROR, Type.ERROR,  Type.ERROR ],
    [ Type.DOUBLE, Type.DOUBLE, Type.ERROR, Type.ERROR,  Type.ERROR ],
    [ Type.ERROR,  Type.ERROR,  Type.ERROR, Type.ERROR,  Type.ERROR ]
];

export const tiposPotencia = [
    [ Type.ENTERO, Type.DOUBLE, Type.ERROR, Type.ERROR, Type.ERROR ],
    [ Type.DOUBLE, Type.DOUBLE, Type.ERROR, Type.ERROR, Type.ERROR ],
    [ Type.ERROR,  Type.ERROR,  Type.ERROR, Type.ERROR,  Type.ERROR ],
    [ Type.ERROR,  Type.ERROR,  Type.ERROR, Type.ERROR,  Type.ERROR ],
    [ Type.ERROR,  Type.ERROR,  Type.ERROR, Type.ERROR,  Type.ERROR ]
];

export const tiposModulo = [
    [ Type.DOUBLE, Type.DOUBLE, Type.ERROR, Type.ERROR, Type.ERROR ],
    [ Type.DOUBLE, Type.DOUBLE, Type.ERROR, Type.ERROR, Type.ERROR ],
    [ Type.ERROR,  Type.ERROR,  Type.ERROR, Type.ERROR,  Type.ERROR ],
    [ Type.ERROR,  Type.ERROR,  Type.ERROR, Type.ERROR,  Type.ERROR ],
    [ Type.ERROR,  Type.ERROR,  Type.ERROR, Type.ERROR,  Type.ERROR ]
];