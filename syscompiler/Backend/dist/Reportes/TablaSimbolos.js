"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TablaSimbolos = void 0;
class TablaSimbolos {
    constructor(simbolo) {
        this.simbolo = simbolo;
        this.variables = new Map();
    }
    setVariable(simbolo, id) {
        this.variables.set(id, simbolo);
    }
    grafica(simbolos) {
        var html = "";
        html += "<!DOCTYPE html>\n";
        html += "<html>\n";
        html += "<head>\n";
        html += "<meta charset=\"utf-8\">\n";
        html += "<meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n";
        html += "<title>TABLA DE SÍMBOLOS</title>\n";
        html += "</head>\n";
        html += "<body BGCOLOR=\"DFC89C\">\n";
        html += "<h2>TABLA DE SÍMBOLOS </h2>\n";
        html += "<table BORDER WIDTH=\"50%\">\n";
        html += "<tr>\n";
        html += "<th scope=\"col\" BGCOLOR=\"2ECC9C\">ID</th>\n";
        html += "<th scope=\"col\" BGCOLOR=\"2ECC9C\">DATO</th>\n";
        html += "<th scope=\"col\" BGCOLOR=\"2ECC9C\">TIPO</th>\n";
        html += "<th scope=\"col\" BGCOLOR=\"2ECC9C\">ENTORNO</th>\n";
        html += "<th scope=\"col\" BGCOLOR=\"2ECC9C\">LINEA</th>\n";
        html += "<th scope=\"col\" BGCOLOR=\"2ECC9C\">COLUMNA</th>\n";
        html += "</tr>\n";
        simbolos.variables.forEach(elemento => {
            html += "<tr>\n";
            html += "<td BGCOLOR=\"D3F0F7\">" + elemento.id + "</td>";
            html += "<td BGCOLOR=\"D3F0F7\">" + elemento.dato + "</td>";
            html += "<td BGCOLOR=\"D3F0F7\">" + elemento.tipoDato + "</td>";
            html += "<td BGCOLOR=\"D3F0F7\">" + elemento.entorno + "</td>";
            html += "<td BGCOLOR=\"D3F0F7\">" + elemento.linea + "</td>";
            html += "<td BGCOLOR=\"D3F0F7\">" + elemento.columna + "</td>";
            html += "</tr>\n";
        });
        html += "</tr>\n";
        html += "</table>\n";
        html += "</body>\n";
        html += "</html>\n";
        return html;
    }
}
exports.TablaSimbolos = TablaSimbolos;
//# sourceMappingURL=TablaSimbolos.js.map