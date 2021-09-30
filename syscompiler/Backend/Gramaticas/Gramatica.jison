%{

%}

%lex

%options case-insensitive

%%

\s+                                         // se ignoran espacios en blanco
("//".*\r\n)|("//".*\n)|("//".*\r)              return "COMENTARIO";
"/*""/"*([^*/]|[^*]"/"|"*"[^/])*"*"*"*/"        return "COMENTARIO"; 
[\"|\']([^\"\n]|(\\\"))*[\"|\']                 return "FRASE";

//palabras reservadas

"true"                  return 'TRUE';
"false"                 return 'FALSE';
"Int"                   return "INT";
"Double"                return "DOUBLE";
"Boolean"               return "BOOLEAN";
"Char"                  return "CHAR";
"String"                return "STRING";
"new"                   return "NUEVO"
"\n"                    return "SALTO";
"\\"                    return "BARRAI";
"\""                    return "COMILLAD";
"\t"                    return "TAB";
"\'"                    return "COMILLAS";


//'dijofdjf'+${}'
[0-9]+("."[0-9]+)?\b                            return 'ENTERO';
[0-9]+\b                                        return 'ENTERO';
[a-zA-ZáéíóúÁÉÍÓÚ]+["_"0-9A-Za-záéíóúÁÉÍÓÚ]*    return "ID";
"("                                             return 'PAR_ABRE';
")"                                             return 'PAR_CIERRA';
"{"                                             return 'LLABRE'
"}"                                             return 'LLCIERRA'
"["                                             return 'CABRE'
"]"                                             return 'CCIERRA'
"?"                                             return 'INTERROGACION';
":"                                             return "DPUNTOS";
";"                                             return "PCOMA";


//RELACIONALES
"=="                    return 'IGUALACION';
"<="                    return 'MENOR_IGUAL';
"<"                     return 'MENOR';
">="                    return 'MAYOR_IGUAL';                     
">"                     return 'MAYOR';
"!="                    return 'DIFERENCIA';

//LOGICOS
"||"                    return 'OR';
"&&"                    return 'AND'
"!"                     return 'NOT'

//*/
','                     return 'COMA';
"+"                     return 'MAS';
"-"                     return 'MENOS';
"*"                     return 'POR';
"/"                     return 'DIVIDIR';
"^"                     return 'POTENCIA';
"="                     return 'IGUAL'
"%"                     return 'MOD';

<<EOF>>                 return 'EOF';
.                       {console.log(yylloc.first_line, yylloc.first_column,'Lexico',yytext)}
/lex




%left 'INTERROGACION' 'DPUNTOS'
%left 'OR'
%left 'AND'
%left 'DIFERENCIA' 'IGUALACION'
%left 'MENOR_IGUAL' 'MAYOR_IGUAL' 'MENOR' 'MAYOR'
%left 'MAS' 'MENOS' 
%left 'POR' 'DIVIDIR'
%left 'POTENCIA' 'MOD'
%left 'COMA'
%left UMENOS
%right 'NOT'

%start ini

%% 

ini
    :general EOF 
;

general
        :general cuerpo
        | cuerpo
;

cuerpo
    :variable                                           {console.log($1)}
    |COMENTARIO                                         {console.log($1)}
    |vectores                                           {console.log($1)}
;

vectores
        :tipo ID CABRE CCIERRA IGUAL NUEVO tipo CABRE ENTERO CCIERRA PCOMA      {$$= $1+" "+$2+" "+$3+" "+$4+" "+$5+" "+$6+" "+$7+" "+$8+" "+$9+" "+$10+" "+$11}
        |ID CABRE CCIERRA IGUAL NUEVO tipo CABRE ENTERO CCIERRA PCOMA           {$$= $1+" "+$2+" "+$3+" "+$4+" "+$5+" "+$6+" "+$7+" "+$8+" "+$9+" "+$10}
        |tipo ID CABRE CCIERRA IGUAL LLABRE arreglo LLCIERRA PCOMA              {$$= $1+" "+$2+" "+$3+" "+$4+" "+$5+" "+$6+" "+$7+" "+$8+" "+$9}
        |ID CABRE CCIERRA IGUAL LLABRE arreglo LLCIERRA PCOMA                   {$$= $1+" "+$2+" "+$3+" "+$4+" "+$5+" "+$6+" "+$7+" "+$8}
        |tipo identificadores IGUAL ID CABRE ENTERO CCIERRA PCOMA               {$$= $1+" "+$2+" "+$3+" "+$4+" "+$5+" "+$6+" "+$7+" "+$8}
        |identificadores IGUAL ID CABRE ENTERO CCIERRA PCOMA                    {$$= $1+" "+$2+" "+$3+" "+$4+" "+$5+" "+$6+" "+$7}
        |ID CABRE CCIERRA IGUAL expresion PCOMA                                 {$$= $1+" "+$2+" "+$3+" "+$4+" "+$5+" "+$6}
        |ID CABRE ENTERO CCIERRA IGUAL expresion PCOMA                                 {$$= $1+" "+$2+" "+$3+" "+$4+" "+$5+" "+$6+" "+$7}
        
;

arreglo
        : arreglo COMA arreglo              {$$= $1+","+$3}
        | expresion                         {$$= $1}
;

variable
        :tipo identificadores PCOMA                                             {$$= $1+" "+$2+";"}
        |tipo identificadores IGUAL expresion PCOMA                             {$$= $1+" "+$2+" = "+$4+";"}
        |identificadores IGUAL expresion PCOMA                                  {$$= $1+" = "+$3+";"}
        |tipo identificadores IGUAL casteos                                     {$$= $1+" "+$2+"="+$4}
        |identificadores IGUAL casteos                                          {$$= $1+"="+$3}
        |ID MAS MAS PCOMA                                                       {$$= $1+"++;"}
        |ID MENOS MENOS PCOMA                                                   {$$= $1+"--;"}
;



casteos
        :PAR_ABRE tipo PAR_CIERRA expresion PCOMA           {$$="("+$2+")"+$4+";"}
;

identificadores
            : identificadores COMA identificadores      {$$= $1+","+$3}
            | ID                                        {$$= $1}
;

tipo
    :INT                                                {$$= $1}
    |BOOLEAN                                            {$$= $1}
    |DOUBLE                                             {$$= $1}
    |CHAR                                               {$$= $1}
    |STRING                                             {$$= $1}
;

expresion	
    :MENOS expresion %prec UMENOS                       {$$= "-"+$2}
    |expresion MAS expresion                            {$$= $1+"+"+$3}
    |expresion MENOS expresion                          {$$= $1+"-"+$3}
    |expresion POR expresion                            {$$= $1+"*"+$3}
    |expresion DIVIDIR expresion                        {$$= $1+"/"+$3}
    |expresion IGUALACION expresion                     {$$= $1+"=="+$3}
    |expresion DIFERENCIA expresion                     {$$= $1+"!="+$3}
    |expresion MAYOR_IGUAL expresion                    {$$= $1+"<="+$3}
    |expresion MENOR_IGUAL expresion                    {$$= $1+">="+$3}
    |expresion MAYOR expresion                          {$$= $1+"<"+$3}
    |expresion MENOR expresion                          {$$= $1+">"+$3}
    |PAR_ABRE expresion PAR_CIERRA                      {$$= "("+$2+")"}
    |expresion MOD expresion                            {$$= $1+"%"+$3}
    |expresion POTENCIA expresion                       {$$= $1+"^"+$3}
	|ENTERO	                                            {$$= Number($1)}
	|FRASE                                              {$$= $1}
    |TRUE                                               {$$= $1}    
    |FALSE                                              {$$= $1}
    |ID                                                 {$$=$1}
    |expresion MAS MAS                                  {$$= $1+"++"}
    |expresion MENOS MENOS                              {$$= $1+"--"}
;
