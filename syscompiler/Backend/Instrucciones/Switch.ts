import { Entorno } from "../Ambitos/Entorno";
import { Error_ } from "../Error/Error";
import { Expresion } from "../Expresiones/Expresion";
import { Type } from "../Expresiones/Retorno";
import { TablaSimbolos } from "../Reportes/TablaSimbolos";
import { Case } from "./Case";
import { Instruccion } from "./Instruccion";

export class Switch extends Instruccion{
    constructor(private condicion: Expresion, private cuerpo: Case[], line: number, column: number){
        super(line, column)
    }

    public execute(entorno: Entorno, simbolos: TablaSimbolos){
        var nuevoEntorno = new Entorno(entorno, "Switch")
        const cond = this.condicion.execute(nuevoEntorno, simbolos);
        for (const caso of this.cuerpo) {
            var casoC = caso.execute(nuevoEntorno, simbolos);
            var condC = casoC.condicion.execute(nuevoEntorno, simbolos);
            if(cond.value == condC.value && cond.type == cond.type){
                var retorno = casoC.cuerpo.execute(nuevoEntorno, simbolos);
                if(retorno != null || retorno != undefined){
                    if(retorno.type == "break"){
                        break
                    }else if(retorno.type == "continue"){
                        continue
                    }else if(retorno.type == "return"){
                        return retorno.value
                    }
                }
            }else if(condC.value == "default"){
                var retorno = casoC.cuerpo.execute(nuevoEntorno, simbolos);
                if(retorno != null || retorno != undefined){
                    if(retorno.type == "break"){
                        break
                    }else if(retorno.type == "continue"){
                        continue
                    }else if(retorno.type == "return"){
                        return retorno.value
                    }
                }
            }
        }
    }

}