"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Recorrido_Arbol = exports.nodoArbol = void 0;
class nodoArbol {
    constructor(valor, tipo) {
        this.valor = valor;
        this.tipo = tipo;
        this.contador = 1;
        this.id = 0;
        this.id;
        this.valor = valor;
        this.tipo = tipo;
        this.hijos = [];
    }
    getValor() {
        this.valor;
    }
    getTipo() {
        this.tipo;
    }
    agregarHijo(hijo) {
        this.hijos.push(hijo);
    }
}
exports.nodoArbol = nodoArbol;
var id_n = 1;
class Recorrido_Arbol {
    constructor(nombre) {
        this.nombre = nombre;
    }
    recorrer_arbolito3(nodo) {
        var concatena;
        if (nodo == undefined) {
            console.error("NODO UNDEFINED");
            return;
        }
        if (nodo.id == 0) {
            nodo.id = id_n;
            id_n++;
        }
        console.log(nodo.id + ' [label= "' + nodo.valor + '" fillcolor="#d62728" shape="circle"];');
        if (nodo.hijos != undefined) {
            nodo.hijos.forEach(element => {
                console.log(nodo.id + '->' + id_n + ";");
                concatena += this.recorrer_arbolito3(element);
            });
        }
        else {
            console.error("NODO HIJOS UNDEFINED" + nodo);
        }
        return concatena;
    }
}
exports.Recorrido_Arbol = Recorrido_Arbol;
//# sourceMappingURL=nodoArbol.js.map