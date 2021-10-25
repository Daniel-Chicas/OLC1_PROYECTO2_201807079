import { Expresion } from "../Expresiones/Expresion";
import { Instruccion } from "./Instruccion";

export type RetornoIns = {
    condicion: Expresion,
    cuerpo: Instruccion
}
