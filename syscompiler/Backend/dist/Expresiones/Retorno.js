"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tiposModulo = exports.tiposPotencia = exports.tiposDivision = exports.tiposMultiplicacion = exports.tiposResta = exports.tiposSuma = exports.Type = void 0;
var Type;
(function (Type) {
    Type[Type["ENTERO"] = 0] = "ENTERO";
    Type[Type["DOUBLE"] = 1] = "DOUBLE";
    Type[Type["BOOLEAN"] = 2] = "BOOLEAN";
    Type[Type["CHAR"] = 3] = "CHAR";
    Type[Type["CADENA"] = 4] = "CADENA";
    Type[Type["ERROR"] = 5] = "ERROR";
    //EXTRAS
    Type[Type["VECTORENT"] = 60] = "VECTORENT";
    Type[Type["VECTORDOU"] = 61] = "VECTORDOU";
    Type[Type["VECTORBOO"] = 62] = "VECTORBOO";
    Type[Type["VECTORCHA"] = 63] = "VECTORCHA";
    Type[Type["VECTORCAD"] = 64] = "VECTORCAD";
    Type[Type["LISTAENT"] = 70] = "LISTAENT";
    Type[Type["LISTADOU"] = 71] = "LISTADOU";
    Type[Type["LISTABOO"] = 72] = "LISTABOO";
    Type[Type["LISTACHA"] = 73] = "LISTACHA";
    Type[Type["LISTACAD"] = 74] = "LISTACAD";
})(Type = exports.Type || (exports.Type = {}));
exports.tiposSuma = [
    [Type.ENTERO, Type.DOUBLE, Type.ENTERO, Type.ENTERO, Type.CADENA],
    [Type.DOUBLE, Type.DOUBLE, Type.DOUBLE, Type.DOUBLE, Type.CADENA],
    [Type.ENTERO, Type.DOUBLE, Type.ERROR, Type.ERROR, Type.CADENA],
    [Type.ENTERO, Type.DOUBLE, Type.ERROR, Type.CADENA, Type.CADENA],
    [Type.CADENA, Type.CADENA, Type.CADENA, Type.CADENA, Type.CADENA]
];
exports.tiposResta = [
    [Type.ENTERO, Type.DOUBLE, Type.ENTERO, Type.ENTERO, Type.ERROR],
    [Type.DOUBLE, Type.DOUBLE, Type.DOUBLE, Type.DOUBLE, Type.ERROR],
    [Type.ENTERO, Type.DOUBLE, Type.ERROR, Type.ERROR, Type.ERROR],
    [Type.ENTERO, Type.DOUBLE, Type.ERROR, Type.ERROR, Type.ERROR],
    [Type.ERROR, Type.ERROR, Type.ERROR, Type.ERROR, Type.ERROR]
];
exports.tiposMultiplicacion = [
    [Type.ENTERO, Type.DOUBLE, Type.ERROR, Type.ENTERO, Type.ERROR],
    [Type.DOUBLE, Type.DOUBLE, Type.ERROR, Type.DOUBLE, Type.ERROR],
    [Type.ERROR, Type.ERROR, Type.ERROR, Type.ERROR, Type.ERROR],
    [Type.ENTERO, Type.DOUBLE, Type.ERROR, Type.ERROR, Type.ERROR],
    [Type.ERROR, Type.ERROR, Type.ERROR, Type.ERROR, Type.ERROR]
];
exports.tiposDivision = [
    [Type.DOUBLE, Type.DOUBLE, Type.ERROR, Type.DOUBLE, Type.ERROR],
    [Type.DOUBLE, Type.DOUBLE, Type.ERROR, Type.DOUBLE, Type.ERROR],
    [Type.ERROR, Type.ERROR, Type.ERROR, Type.ERROR, Type.ERROR],
    [Type.DOUBLE, Type.DOUBLE, Type.ERROR, Type.ERROR, Type.ERROR],
    [Type.ERROR, Type.ERROR, Type.ERROR, Type.ERROR, Type.ERROR]
];
exports.tiposPotencia = [
    [Type.ENTERO, Type.DOUBLE, Type.ERROR, Type.ERROR, Type.ERROR],
    [Type.DOUBLE, Type.DOUBLE, Type.ERROR, Type.ERROR, Type.ERROR],
    [Type.ERROR, Type.ERROR, Type.ERROR, Type.ERROR, Type.ERROR],
    [Type.ERROR, Type.ERROR, Type.ERROR, Type.ERROR, Type.ERROR],
    [Type.ERROR, Type.ERROR, Type.ERROR, Type.ERROR, Type.ERROR]
];
exports.tiposModulo = [
    [Type.DOUBLE, Type.DOUBLE, Type.ERROR, Type.ERROR, Type.ERROR],
    [Type.DOUBLE, Type.DOUBLE, Type.ERROR, Type.ERROR, Type.ERROR],
    [Type.ERROR, Type.ERROR, Type.ERROR, Type.ERROR, Type.ERROR],
    [Type.ERROR, Type.ERROR, Type.ERROR, Type.ERROR, Type.ERROR],
    [Type.ERROR, Type.ERROR, Type.ERROR, Type.ERROR, Type.ERROR]
];
//# sourceMappingURL=Retorno.js.map