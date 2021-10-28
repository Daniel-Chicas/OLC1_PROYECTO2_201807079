%{
    const {nodoArbol} = require('../dist/Instrucciones/nodoArbol.js')    
    const {Error_} = require('../dist/Error/Error.js')
%}

%lex

%options case-insensitive

%%

\s+                                         // se ignoran espacios en blanco
("//".*\r\n)|("//".*\n)|("//".*\r)              return "COMENTARIO";
"/*""/"*([^*/]|[^*]"/"|"*"[^/])*"*"*"*/"        return "COMENTARIO"; 
[\"]([^\"\n]|(\\\"))*[\"]                       return "FRASE";
[\']([^\"\n]|(\\\"))[\']                        return "CARACTER";

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
"DynamicList"           return "LISTA";
"append"                return "AGREGAR";
"getValue"              return "SACAR";
"setValue"              return "MODIFICAR";
"If"                    return "IF";
"switch"                return "SWITCH";
"Else"                  return "ELSE";
"Case"                  return "CASE";
"Default"               return "DEFAULT";
"While"                 return "WHILE";
"For"                   return "FOR";
"Do"                    return "DO";
"Break"                 return "BREAK";
"Continue"              return "CONTINUE";
"return"                return "RETURN";
"void"                  return "VOID";
"WriteLine"             return "IMPRIMIR";
"toLower"               return "MINUSCULAS";
"toUpper"               return "MAYUSCULAS";
"Length"                return "LENGTH";
"Truncate"              return "TRUNCATE";
"Round"                 return "ROUND";
"Typeof"                return "TYPEOF";
"toString"              return "TOSTRING";
"toCharArray"           return "TOCHARARRAY";
"Start"                 return "START";
"With"                  return "WITH";


//'dijofdjf'+${}'
[0-9]+(".")[0-9]+\b                             return 'DECIMAL';
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
"&&"                    return 'AND';
"!"                     return 'NOT';

//*/
','                     return 'COMA';
"+"                     return 'MAS';
"-"                     return 'MENOS';
"*"                     return 'POR';
"/"                     return 'DIVIDIR';
"^"                     return 'POTENCIA';
"="                     return 'IGUAL';
"%"                     return 'MOD';

<<EOF>>                 return 'EOF';
.                       {var nuevoError = new Error_(yylloc.first_line, yylloc.first_column, "Léxico", 'No se reconoce el texto:'+yytext); nuevoError.setError(nuevoError)}
/lex




%left 'INTERROGACION' 'DPUNTOS'
%left 'OR'
%left 'AND'
%left 'DIFERENCIA' 'IGUALACION'
%left 'MENOR_IGUAL' 'MAYOR_IGUAL' 'MENOR' 'MAYOR'
%left 'MAS' 'MENOS' 
%left 'POR' 'DIVIDIR'
%left 'POTENCIA' 'MOD'
%left 'COMA' 'IGUAL'
%left UMENOS
%right 'NOT'

%start ini

%% 

ini
    :general EOF        {       $$= new nodoArbol("RAIZ ARBOL","");
                                $$.agregarHijo($1);
                                return $$;
                        }
;

general
        :general cuerpo                                         {   $$ = new nodoArbol("GLOBAL","");
                                                                    $$.agregarHijo($1);
                                                                    $$.agregarHijo($2);
                                                                }
        |cuerpo                                                 {   $$ = new nodoArbol("GLOBAL","");   
                                                                    $$.agregarHijo($1);
                                                                }
;				

cuerpo
    :COMENTARIO                                                 {
                                                                    $$ = new nodoArbol("Comentario", "");
                                                                    $$.agregarHijo(new nodoArbol($1, "Cuerpo"))
                                                                }
    |funcionMetodo                                              {$$= $1}
    |START WITH ID PAR_ABRE PAR_CIERRA PCOMA                    {
                                                                    $$ = new nodoArbol("Inicio", "");
                                                                    $$.agregarHijo(new nodoArbol("Id: "+$3, "Id"))
                                                                }
    |START WITH ID PAR_ABRE expresion PAR_CIERRA PCOMA          {
                                                                    $$ = new nodoArbol("Inicio", "");
                                                                    $$.agregarHijo(new nodoArbol("Id: "+$3, "Id"))
                                                                    $$.agregarHijo($5)
                                                                    $$.agregarHijo($7)
                                                                }
    |decl                                                       {$$= $1}       
;

funcionMetodo
        :tipo ID PAR_ABRE parametros PAR_CIERRA LLABRE statement LLCIERRA                           {
                                                                                                        $$ = new nodoArbol("Función", "");
                                                                                                        $$.agregarHijo(new nodoArbol("Tipo: "+$1+", ID: "+$2, "Tipo"))
                                                                                                        $$.agregarHijo($4)
                                                                                                        $$.agregarHijo($7)
                                                                                                    }
        |tipo ID PAR_ABRE PAR_CIERRA LLABRE statement LLCIERRA                                      {
                                                                                                        $$ = new nodoArbol("Función", "");
                                                                                                        $$.agregarHijo(new nodoArbol("Tipo: "+$1+", ID: "+$2, "Tipo"))
                                                                                                        $$.agregarHijo($6)
                                                                                                    }
        
        |LISTA MENOR tipo MAYOR ID PAR_ABRE parametros PAR_CIERRA LLABRE statement LLCIERRA         {
                                                                                                        $$ = new nodoArbol("Función", "");
                                                                                                        $$.agregarHijo(new nodoArbol("Tipo: Lista "+$3+", ID: "+$5, "Tipo"))
                                                                                                        $$.agregarHijo($7)
                                                                                                        $$.agregarHijo($10)
                                                                                                    }
        |LISTA MENOR tipo MAYOR ID PAR_ABRE PAR_CIERRA LLABRE statement LLCIERRA                    {
                                                                                                        $$ = new nodoArbol("Función", "");
                                                                                                        $$.agregarHijo(new nodoArbol("Tipo: Lista"+$3+", ID: "+$5, "Tipo"))
                                                                                                        $$.agregarHijo($9)
                                                                                                    }
        
        |tipo ID CABRE CCIERRA PAR_ABRE parametros PAR_CIERRA LLABRE statement LLCIERRA             {
                                                                                                        $$ = new nodoArbol("Función", "");
                                                                                                        $$.agregarHijo(new nodoArbol("Tipo: Vector "+$1+", ID: "+$2, "Tipo"))
                                                                                                        $$.agregarHijo($6)
                                                                                                        $$.agregarHijo($9)
                                                                                                    }
        |tipo ID CABRE CCIERRA PAR_ABRE PAR_CIERRA LLABRE statement LLCIERRA                        {
                                                                                                        $$ = new nodoArbol("Función", "");
                                                                                                        $$.agregarHijo(new nodoArbol("Tipo: Vector"+$1+", ID: "+$2, "Tipo"))
                                                                                                        $$.agregarHijo($8)
                                                                                                    }
        
        |VOID ID PAR_ABRE parametros PAR_CIERRA LLABRE statement LLCIERRA                           {
                                                                                                        $$ = new nodoArbol("Método", "");
                                                                                                        $$.agregarHijo(new nodoArbol("Tipo: "+$1+", ID: "+$2, "Tipo"))
                                                                                                        $$.agregarHijo($4)
                                                                                                        $$.agregarHijo($7)
                                                                                                    }
        |VOID ID PAR_ABRE PAR_CIERRA LLABRE statement LLCIERRA                                      {
                                                                                                        $$ = new nodoArbol("Método", "");
                                                                                                        $$.agregarHijo(new nodoArbol("Tipo: "+$1+", ID: "+$2, "Tipo"))
                                                                                                        $$.agregarHijo($6)
                                                                                                    }
;

parametros
        :parametros COMA parametros                             {
                                                                    $$ = new nodoArbol("Parametros", "");
                                                                    $$.agregarHijo($1)
                                                                    $$.agregarHijo(new nodoArbol(",", "Coma"))
                                                                    $$.agregarHijo($3)
                                                                }
        |tipo ID                                                {   $$ = new nodoArbol($1+" "+$2,"Parametro")}
        |LISTA MENOR tipo MAYOR ID                              {   $$ = new nodoArbol($1+""+$2+""+$3+""+$4+" "+$5,"Parametro")}
        |tipo ID CABRE CCIERRA                                  {   $$ = new nodoArbol($1+" "+$2+""+$3+""+$4,"Expresion")}
;

cuerpoFunciones
                :cuerpoFunciones declaraciones                  {   $$ = new nodoArbol("Declaración","");
                                                                    $$.agregarHijo($1);
                                                                    $$.agregarHijo($2);
                                                                }
                |declaraciones                                  {   $$ = new nodoArbol("Declaración","");   
                                                                    $$.agregarHijo($1);}
;

declaraciones
            //YA ESTÁ
            :sentencias                                                     {$$= $1}
            |IMPRIMIR PAR_ABRE listaExpresiones PAR_CIERRA PCOMA            {
                                                                                $$ = new nodoArbol("Imprimir", "");
                                                                                $$.agregarHijo($3)
                                                                            }
            |BREAK PCOMA                                                    {$$ = new nodoArbol("Break", "")}
            |CONTINUE PCOMA                                                 {$$ = new nodoArbol("Continue", "")}
            |RETURN expresion PCOMA                                         {
                                                                                $$ = new nodoArbol("Return", "")
                                                                                $$.agregarHijo($2)
                                                                            }
            |RETURN PCOMA                                                   {$$ = new nodoArbol("Return", "")}
            |COMENTARIO                                                     {
                                                                                $$ = new nodoArbol("Comentario", "");
                                                                                $$.agregarHijo(new nodoArbol($1, "Cuerpo"))
                                                                            }
            
            |decl                                                           {$$= $1}
;

decl
    :variable                                                       {
                                                                        $$ = new nodoArbol("Declaración", "");
                                                                        $$.agregarHijo($1)
                                                                    }
    |vectores                                                       {
                                                                        $$ = new nodoArbol("Declaración", "");
                                                                        $$.agregarHijo($1)
                                                                    }
    |listas                                                         {
                                                                        $$ = new nodoArbol("Declaración", "");
                                                                        $$.agregarHijo($1)
                                                                    } 
    |error PCOMA                                                    {var nuevoError = new Error_(@1.first_line, @1.first_column, "Sintáctico", 'Tipo de Declaración incorrecta. Recuperado en esta línea, con \";\"".'); nuevoError.setError(nuevoError)}
;

sentencias
            :if             {$$= $1}
            |switch         {$$= $1}
            |while          {$$= $1}
            |for            {$$= $1}
            |dowhile        {$$= $1}
;

dowhile
        :DO LLABRE statement LLCIERRA WHILE PAR_ABRE expresion PAR_CIERRA PCOMA             {
                                                                                                $$ = new nodoArbol("Do-While", "");
                                                                                                $$.agregarHijo($3)
                                                                                                $$.agregarHijo($7)
                                                                                            }
;

for
    :FOR PAR_ABRE declaracionFor PCOMA expresion PCOMA declaracionFor PAR_CIERRA LLABRE statement LLCIERRA              {
                                                                                                                            $$ = new nodoArbol("For", "");
                                                                                                                            $$.agregarHijo($3)
                                                                                                                            $$.agregarHijo($5)
                                                                                                                            $$.agregarHijo($7)
                                                                                                                            $$.agregarHijo($10)
                                                                                                                        }
    |FOR PAR_ABRE declaracionFor PCOMA expresion PCOMA ID MAS MAS PAR_CIERRA LLABRE statement LLCIERRA                  {
                                                                                                                            $$ = new nodoArbol("For", "");
                                                                                                                            $$.agregarHijo($3)
                                                                                                                            $$.agregarHijo($5)
                                                                                                                            $$.agregarHijo(new nodoArbol($7+"++", ""))
                                                                                                                            $$.agregarHijo($12)
                                                                                                                        }
    |FOR PAR_ABRE declaracionFor PCOMA expresion PCOMA ID MENOS MENOS PAR_CIERRA LLABRE statement LLCIERRA              {
                                                                                                                            $$ = new nodoArbol("For", "");
                                                                                                                            $$.agregarHijo($3)
                                                                                                                            $$.agregarHijo($5)
                                                                                                                            $$.agregarHijo(new nodoArbol($7+"--", ""))
                                                                                                                            $$.agregarHijo($12)
                                                                                                                        }
;

declaracionFor
            :tipo ID IGUAL expresion                                            {
                                                                                    $$ = new nodoArbol("E", "");
                                                                                    $$.agregarHijo(new nodoArbol($1, "tipo"))
                                                                                    $$.agregarHijo(new nodoArbol($2, "Id"))
                                                                                    $$.agregarHijo(new nodoArbol("=", "igual"))
                                                                                    $$.agregarHijo($4)
                                                                                }
            |ID IGUAL expresion                                                 {
                                                                                    $$ = new nodoArbol("E", "");
                                                                                    $$.agregarHijo(new nodoArbol($1, "Id"))
                                                                                    $$.agregarHijo(new nodoArbol("=", "igual"))
                                                                                    $$.agregarHijo($3)
                                                                                }
            |tipo ID IGUAL casteos                                              {
                                                                                    $$ = new nodoArbol("E", "");
                                                                                    $$.agregarHijo(new nodoArbol($1, "tipo"))
                                                                                    $$.agregarHijo(new nodoArbol($2, "Id"))
                                                                                    $$.agregarHijo(new nodoArbol("=", "igual"))
                                                                                    $$.agregarHijo($4)
                                                                                }
            |ID IGUAL casteos                                                   {
                                                                                    $$ = new nodoArbol("E", "");
                                                                                    $$.agregarHijo(new nodoArbol($1, "Id"))
                                                                                    $$.agregarHijo(new nodoArbol("=", "igual"))
                                                                                    $$.agregarHijo($3)
                                                                                }
;

switch
    :SWITCH PAR_ABRE expresion PAR_CIERRA LLABRE casos LLCIERRA                     {
                                                                                        $$ = new nodoArbol("Switch", "");
                                                                                        $$.agregarHijo($3)
                                                                                        $$.agregarHijo($6)
                                                                                    }
;

if
    :IF PAR_ABRE expresion PAR_CIERRA LLABRE statement LLCIERRA else                            {
                                                                                                    $$ = new nodoArbol("if", "");
                                                                                                    $$.agregarHijo($3)
                                                                                                    $$.agregarHijo($6)
                                                                                                    if($8 != undefined){
                                                                                                        $$.agregarHijo($8)
                                                                                                    }
                                                                                                }
;

else
    :ELSE LLABRE statement LLCIERRA                                                             {
                                                                                                    $$ = new nodoArbol("Else", "");
                                                                                                    $$.agregarHijo($3)
                                                                                                }
    |ELSE if                                                                                    {
                                                                                                    $$ = new nodoArbol("Else if", "");
                                                                                                    $$.agregarHijo($2)
                                                                                                }
    |                                                                                           
;

while
    :WHILE PAR_ABRE expresion PAR_CIERRA LLABRE statement LLCIERRA                              {
                                                                                                    $$ = new nodoArbol("While", "");
                                                                                                    $$.agregarHijo($3)
                                                                                                    $$.agregarHijo($6)
                                                                                                }
;

statement
        :cuerpoFunciones                                                                        {
                                                                                                    $$ = new nodoArbol("CUERPO", "");
                                                                                                    $$.agregarHijo($1)
                                                                                                }
        |                                                                                       
;

casos 
    :casos caso                                 {   $$ = new nodoArbol("Casos","");
                                                    $$.agregarHijo($1);
                                                    $$.agregarHijo($2);
                                                }                                                  
    |caso                                       {   $$ = new nodoArbol("Caso","");
                                                    $$.agregarHijo($1);
                                                }        
;

caso 
    :CASE expresion DPUNTOS statement           {
                                                    $$ = new nodoArbol("Case", "");
                                                    $$.agregarHijo($2)
                                                    $$.agregarHijo($4)
                                                }
    |DEFAULT DPUNTOS statement                  {
                                                    $$ = new nodoArbol("Default", "");
                                                    $$.agregarHijo($3)
                                                }
;

variable
        :tipo identificadores PCOMA                                                             {
                                                                                                    $$ = new nodoArbol("Identificadores", "");
                                                                                                    $$.agregarHijo(new nodoArbol($1, "id"))
                                                                                                    $$.agregarHijo($2)
                                                                                                }
        |tipo identificadores IGUAL expresion PCOMA                                             {
                                                                                                    $$ = new nodoArbol("E", "");
                                                                                                    $$.agregarHijo(new nodoArbol($1, "id"))
                                                                                                    $$.agregarHijo($2)
                                                                                                    $$.agregarHijo(new nodoArbol("=", "Igual"))
                                                                                                    $$.agregarHijo($4)
                                                                                                }
        |identificadores IGUAL expresion PCOMA                                                  {
                                                                                                    $$ = new nodoArbol("E", "");
                                                                                                    $$.agregarHijo($1)
                                                                                                    $$.agregarHijo(new nodoArbol("=", "Igual"))
                                                                                                    $$.agregarHijo($3)
                                                                                                }
        |tipo identificadores IGUAL casteos                                                     {
                                                                                                    $$ = new nodoArbol("E", "");
                                                                                                    $$.agregarHijo($2)
                                                                                                    $$.agregarHijo(new nodoArbol("=", "Igual"))
                                                                                                    $$.agregarHijo($4)
                                                                                                }
        |identificadores IGUAL casteos                                                          {
                                                                                                    $$ = new nodoArbol("E", "");
                                                                                                    $$.agregarHijo($1)
                                                                                                    $$.agregarHijo(new nodoArbol("=", "Igual"))
                                                                                                    $$.agregarHijo($3)
                                                                                                }
        |ID MAS MAS PCOMA                                                                       {
                                                                                                    $$ = new nodoArbol("Incremento", "++");
                                                                                                    $$.agregarHijo(new nodoArbol($1, "Igual"))
                                                                                                }
        |ID MENOS MENOS PCOMA                                                                   {
                                                                                                    $$ = new nodoArbol("Decremento", "--");
                                                                                                    $$.agregarHijo(new nodoArbol($1, "Igual"))
                                                                                                }
        |ID PAR_ABRE expresion PAR_CIERRA PCOMA                                                 {
                                                                                                    $$ = new nodoArbol("LLAMADA", "");
                                                                                                    $$.agregarHijo(new nodoArbol($1, "Id"))
                                                                                                    $$.agregarHijo($3)
                                                                                                }
        |ID PAR_ABRE PAR_CIERRA PCOMA                                                           {
                                                                                                    $$ = new nodoArbol("LLAMADA", "");
                                                                                                    $$.agregarHijo(new nodoArbol($1, "Id"))
                                                                                                }
;

vectores
        :tipo ID CABRE CCIERRA IGUAL NUEVO tipo CABRE expresion CCIERRA PCOMA                   {
                                                                                                    $$ = new nodoArbol("new Vector[]", "");
                                                                                                    $$.agregarHijo(new nodoArbol("Tipo: "+$1+" Id:"+$2, "TipoId"))
                                                                                                    $$.agregarHijo($9)
                                                                                                }
        |tipo ID CABRE CCIERRA IGUAL LLABRE listaVectores LLCIERRA PCOMA                        {
                                                                                                    $$ = new nodoArbol("new Vector[]", "");
                                                                                                    $$.agregarHijo(new nodoArbol("Tipo: "+$1+" Id:"+$2, "TipoId"))
                                                                                                    $$.agregarHijo($7)
                                                                                                }
        |ID CABRE expresion CCIERRA IGUAL expresion PCOMA                                       {
                                                                                                    $$ = new nodoArbol("Modificar Vector", "");
                                                                                                    $$.agregarHijo(new nodoArbol($1, "Id"))
                                                                                                    $$.agregarHijo($3)
                                                                                                    $$.agregarHijo(new nodoArbol("=", "Igual"))
                                                                                                    $$.agregarHijo($6)
                                                                                                }
        |ID CABRE CCIERRA IGUAL NUEVO tipo CABRE expresion CCIERRA PCOMA                        {
                                                                                                    $$ = new nodoArbol("new Vector[]", "");
                                                                                                    $$.agregarHijo(new nodoArbol("Id:"+$1, "TipoId"))
                                                                                                    $$.agregarHijo($8)
                                                                                                }
        |ID CABRE CCIERRA IGUAL LLABRE listaVectores LLCIERRA PCOMA                             {
                                                                                                    $$ = new nodoArbol("Crear Vector Nuevo", "");
                                                                                                    $$.agregarHijo(new nodoArbol("Id: "+$1, "TipoId"))
                                                                                                    $$.agregarHijo(new nodoArbol("=", "Igual"))
                                                                                                    $$.agregarHijo($6)
                                                                                                }
;

listas
    :LISTA MENOR tipo MAYOR ID IGUAL NUEVO LISTA MENOR tipo MAYOR PCOMA                     {
                                                                                                $$ = new nodoArbol("new DynamicList", "");
                                                                                                $$.agregarHijo(new nodoArbol("Tipo: "+$3+" Id:"+$5, "TipoId"))
                                                                                            }
    |AGREGAR PAR_ABRE ID COMA expresion PAR_CIERRA PCOMA                                    {
                                                                                                $$ = new nodoArbol("append", "");
                                                                                                $$.agregarHijo(new nodoArbol($3, "Id"))
                                                                                                $$.agregarHijo($5)
                                                                                            }
    |MODIFICAR PAR_ABRE ID COMA aritmeticos COMA expresion PAR_CIERRA PCOMA                 {
                                                                                                $$ = new nodoArbol("setValue", "");
                                                                                                $$.agregarHijo(new nodoArbol($3, "Id"))
                                                                                                $$.agregarHijo($5)
                                                                                                $$.agregarHijo(new nodoArbol("=", "Igual"))
                                                                                                $$.agregarHijo($7)
                                                                                            }
    |LISTA MENOR tipo MAYOR ID IGUAL TOCHARARRAY PAR_ABRE expresion PAR_CIERRA  PCOMA       {
                                                                                                $$ = new nodoArbol("toCharArray", "toCharArray");
                                                                                                $$.agregarHijo(new nodoArbol($5, "TipoId"))
                                                                                                $$.agregarHijo(new nodoArbol("=", "Igual"))
                                                                                                $$.agregarHijo($9)
                                                                                            }
;

listaVectores
        :listaVectores COMA listaVectores           {
                                                        $$ = new nodoArbol("Expresiones", "");
                                                        $$.agregarHijo($1)
                                                        $$.agregarHijo(new nodoArbol(",", "Coma"))
                                                        $$.agregarHijo($3)
                                                    }
        |expresion                                  {
                                                        $$= new nodoArbol("E","Expresion")
                                                        $$.agregarHijo($1)
                                                    }
;

listaExpresiones
            :listaExpresiones COMA expresion                                {
                                                                                $$ = new nodoArbol("ListaExpresiones", "");
                                                                                $$.agregarHijo($1)
                                                                                $$.agregarHijo(new nodoArbol(",", "Coma"))
                                                                                $$.agregarHijo($3)
                                                                            }
            |expresion                                                      {
                                                                                $$= new nodoArbol("E","Expresion")
                                                                                $$.agregarHijo($1)
                                                                            }
;

aritmeticos
        :ID                                                                                         {   $$= new nodoArbol($1,"I")  }
        |aritmeticos MAS aritmeticos                                                                {
                                                                                                        $$ = new nodoArbol("E", "");
                                                                                                        $$.agregarHijo($1)
                                                                                                        $$.agregarHijo(new nodoArbol("+", "Suma"))
                                                                                                        $$.agregarHijo($3)
                                                                                                    }
        |aritmeticos MENOS aritmeticos                                                              {
                                                                                                        $$ = new nodoArbol("E", "");
                                                                                                        $$.agregarHijo($1)
                                                                                                        $$.agregarHijo(new nodoArbol("-", "Resta"))
                                                                                                        $$.agregarHijo($3)
                                                                                                    }
        |aritmeticos POR aritmeticos                                                                {
                                                                                                        $$ = new nodoArbol("E", "");
                                                                                                        $$.agregarHijo($1)
                                                                                                        $$.agregarHijo(new nodoArbol("*", "Multiplicación"))
                                                                                                        $$.agregarHijo($3)
                                                                                                    }
        |aritmeticos DIVIDIR aritmeticos                                                            {
                                                                                                        $$ = new nodoArbol("E", "");
                                                                                                        $$.agregarHijo($1)
                                                                                                        $$.agregarHijo(new nodoArbol("/", "División"))
                                                                                                        $$.agregarHijo($3)
                                                                                                    }
        |aritmeticos MOD aritmeticos                                                                {
                                                                                                        $$ = new nodoArbol("E", "");
                                                                                                        $$.agregarHijo($1)
                                                                                                        $$.agregarHijo(new nodoArbol("%", "Modulo"))
                                                                                                        $$.agregarHijo($3)
                                                                                                    }
        |aritmeticos POTENCIA aritmeticos                                                           {
                                                                                                        $$ = new nodoArbol("E", "");
                                                                                                        $$.agregarHijo($1)
                                                                                                        $$.agregarHijo(new nodoArbol("^", "Potencia"))
                                                                                                        $$.agregarHijo($3)
                                                                                                    }
        |PAR_ABRE aritmeticos PAR_CIERRA                                                            {
                                                                                                        $$ = new nodoArbol("E", "");
                                                                                                        $$.agregarHijo($2)
                                                                                                    }
        

        |ENTERO	                                                                                    {   $$= new nodoArbol($1,"Entero")}
        |DECIMAL                                                                                    {   $$= new nodoArbol($1,"Decimal")}
        |ID CABRE aritmeticos CCIERRA                                                               {
                                                                                                        $$ = new nodoArbol("Vector: "+$1+" Posición:", "");
                                                                                                        $$.agregarHijo($3)
                                                                                                    }
        
        |SACAR PAR_ABRE ID COMA aritmeticos PAR_CIERRA                                              {
                                                                                                        $$ = new nodoArbol("Valor de Lista: "+$3, "");
                                                                                                        $$.agregarHijo($5)
                                                                                                    }
;

casteos
        :PAR_ABRE tipo PAR_CIERRA expresion PCOMA       {
                                                            $$ = new nodoArbol("CASTEO", "");
                                                            $$.agregarHijo($4)
                                                            $$.agregarHijo(new nodoArbol("-->", "To"))
                                                            $$.agregarHijo(new nodoArbol($2, "Tipo"))
                                                        }
;

identificadores
            : identificadores COMA identificadores      {
                                                            $$ = new nodoArbol("Identificadores", "");
                                                            $$.agregarHijo($1)
                                                            $$.agregarHijo(new nodoArbol(",", "Coma"))
                                                            $$.agregarHijo($3)
                                                        }
            | ID                                        {   
                                                            $$= new nodoArbol($1,"ID")  
                                                        }
;


tipo
    :INT                                                {$$= $1}
    |BOOLEAN                                            {$$= $1}
    |DOUBLE                                             {$$= $1}
    |CHAR                                               {$$= $1}
    |STRING                                             {$$= $1}
;

expresion	
    :MENOS expresion %prec UMENOS                                                               {
                                                                                                    $$ = new nodoArbol("E: ", "");
                                                                                                    $$.agregarHijo(new nodoArbol("-1", "-1"))
                                                                                                    $$.agregarHijo(new nodoArbol("*", "Multiplicación"))
                                                                                                    $$.agregarHijo($2)
                                                                                                }
    //LÓGICOS
    |NOT expresion                                                                              {
                                                                                                    $$ = new nodoArbol("!", "");
                                                                                                    $$.agregarHijo($2)
                                                                                                }
    |expresion AND expresion                                                                    {
                                                                                                    $$ = new nodoArbol("E", "");
                                                                                                    $$.agregarHijo($1)
                                                                                                    $$.agregarHijo(new nodoArbol("&&", "And"))
                                                                                                    $$.agregarHijo($3)
                                                                                                }
    |expresion OR expresion                                                                     {
                                                                                                    $$ = new nodoArbol("E", "");
                                                                                                    $$.agregarHijo($1)
                                                                                                    $$.agregarHijo(new nodoArbol("||", "Or"))
                                                                                                    $$.agregarHijo($3)
                                                                                                }
    //ARITMÉTICOS
    |expresion MAS expresion                                                                    {
                                                                                                    $$ = new nodoArbol("E", "");
                                                                                                    $$.agregarHijo($1)
                                                                                                    $$.agregarHijo(new nodoArbol("+", "Suma"))
                                                                                                    $$.agregarHijo($3)
                                                                                                }
    |expresion MENOS expresion                                                                  {
                                                                                                    $$ = new nodoArbol("E", "");
                                                                                                    $$.agregarHijo($1)
                                                                                                    $$.agregarHijo(new nodoArbol("-", "Resta"))
                                                                                                    $$.agregarHijo($3)
                                                                                                }
    |expresion POR expresion                                                                    {
                                                                                                    $$ = new nodoArbol("E", "");
                                                                                                    $$.agregarHijo($1)
                                                                                                    $$.agregarHijo(new nodoArbol("*", "Multiplicación"))
                                                                                                    $$.agregarHijo($3)
                                                                                                }
    |expresion DIVIDIR expresion                                                                {
                                                                                                    $$ = new nodoArbol("E", "");
                                                                                                    $$.agregarHijo($1)
                                                                                                    $$.agregarHijo(new nodoArbol("/", "División"))
                                                                                                    $$.agregarHijo($3)
                                                                                                }
    |expresion MOD expresion                                                                    {
                                                                                                    $$ = new nodoArbol("E", "");
                                                                                                    $$.agregarHijo($1)
                                                                                                    $$.agregarHijo(new nodoArbol("%", "Modulo"))
                                                                                                    $$.agregarHijo($3)
                                                                                                }
    |expresion POTENCIA expresion                                                               {
                                                                                                    $$ = new nodoArbol("E", "");
                                                                                                    $$.agregarHijo($1)
                                                                                                    $$.agregarHijo(new nodoArbol("^", "Potencia"))
                                                                                                    $$.agregarHijo($3)
                                                                                                }
    |PAR_ABRE expresion PAR_CIERRA                                                              {
                                                                                                    $$ = new nodoArbol("E", "");
                                                                                                    $$.agregarHijo($2)
                                                                                                }
    //RELACIONALES
    |expresion IGUALACION expresion                                                             {
                                                                                                    $$ = new nodoArbol("E", "");
                                                                                                    $$.agregarHijo($1)
                                                                                                    $$.agregarHijo(new nodoArbol("==", "Igual"))
                                                                                                    $$.agregarHijo($3)
                                                                                                }
    |expresion DIFERENCIA expresion                                                             {
                                                                                                    $$ = new nodoArbol("E", "");
                                                                                                    $$.agregarHijo($1)
                                                                                                    $$.agregarHijo(new nodoArbol("!=", "Diferencia"))
                                                                                                    $$.agregarHijo($3)
                                                                                                }
    |expresion MAYOR_IGUAL expresion                                                            {
                                                                                                    $$ = new nodoArbol("E", "");
                                                                                                    $$.agregarHijo($1)
                                                                                                    $$.agregarHijo(new nodoArbol(">=", "Mayor_Igual"))
                                                                                                    $$.agregarHijo($3)
                                                                                                }
    |expresion MENOR_IGUAL expresion                                                            {
                                                                                                    $$ = new nodoArbol("E", "");
                                                                                                    $$.agregarHijo($1)
                                                                                                    $$.agregarHijo(new nodoArbol("<=", "Menor_Igual"))
                                                                                                    $$.agregarHijo($3)
                                                                                                }
    |expresion MAYOR expresion                                                                  {
                                                                                                    $$ = new nodoArbol("E", "");
                                                                                                    $$.agregarHijo($1)
                                                                                                    $$.agregarHijo(new nodoArbol(">", "Mayor"))
                                                                                                    $$.agregarHijo($3)
                                                                                                }
    |expresion MENOR expresion                                                                  {
                                                                                                    $$ = new nodoArbol("E", "");
                                                                                                    $$.agregarHijo($1)
                                                                                                    $$.agregarHijo(new nodoArbol("<", "Menor"))
                                                                                                    $$.agregarHijo($3)
                                                                                                }
    |expresion MAS MAS                                                                          {
                                                                                                    $$ = new nodoArbol("Incremento", "");
                                                                                                    $$.agregarHijo($1)
                                                                                                }
    |expresion MENOS MENOS                                                                      {
                                                                                                    $$ = new nodoArbol("Decremento", "");
                                                                                                    $$.agregarHijo($1)
                                                                                                }
    |ID                                                                                         {   $$= new nodoArbol($1, "ID") }

    |ID CABRE expresion CCIERRA                                                                 {
                                                                                                    $$ = new nodoArbol("Valor de Vector: "+$1, "");
                                                                                                    $$.agregarHijo($3)
                                                                                                }
    |SACAR PAR_ABRE ID COMA expresion PAR_CIERRA                                                {
                                                                                                    $$ = new nodoArbol("getValue", "");
                                                                                                    $$.agregarHijo(new nodoArbol($3, "ID"))
                                                                                                    $$.agregarHijo($5)
                                                                                                }
    //llamadas a métodos/funciones
    |ID PAR_ABRE listaExpresiones PAR_CIERRA                                                    {
                                                                                                    $$ = new nodoArbol("LLAMADA", "");
                                                                                                    $$.agregarHijo(new nodoArbol($1, "ID"))
                                                                                                    $$.agregarHijo($3)
                                                                                                }
    |ID PAR_ABRE PAR_CIERRA                                                                     {
                                                                                                    $$ = new nodoArbol("LLAMADA Función", "");
                                                                                                    $$.agregarHijo(new nodoArbol($1, "ID"))
                                                                                                }
    
    |MINUSCULAS PAR_ABRE expresion PAR_CIERRA                                                   {
                                                                                                    $$ = new nodoArbol("toLower", "toLower");
                                                                                                    $$.agregarHijo($3)
                                                                                                }
    |MAYUSCULAS PAR_ABRE expresion PAR_CIERRA                                                   {
                                                                                                    $$ = new nodoArbol("toUpper", "toUpper");
                                                                                                    $$.agregarHijo($3)
                                                                                                }
    |LENGTH PAR_ABRE expresion PAR_CIERRA                                                       {
                                                                                                    $$ = new nodoArbol("Length", "Length");
                                                                                                    $$.agregarHijo($3)
                                                                                                }
    |TRUNCATE PAR_ABRE expresion PAR_CIERRA                                                     {
                                                                                                    $$ = new nodoArbol("Truncate", "Truncate");
                                                                                                    $$.agregarHijo($3)
                                                                                                }
    |ROUND PAR_ABRE expresion PAR_CIERRA                                                        {
                                                                                                    $$ = new nodoArbol("Round", "Round");
                                                                                                    $$.agregarHijo($3)
                                                                                                }
    |TYPEOF PAR_ABRE expresion PAR_CIERRA                                                       {
                                                                                                    $$ = new nodoArbol("typeOf", "typeOf");
                                                                                                    $$.agregarHijo($3)
                                                                                                }
    |TOSTRING PAR_ABRE expresion PAR_CIERRA                                                     {
                                                                                                    $$ = new nodoArbol("toString", "toString");
                                                                                                    $$.agregarHijo($3)
                                                                                                }
    |TOCHARARRAY PAR_ABRE expresion PAR_CIERRA                                                  {
                                                                                                    $$ = new nodoArbol("toCharArray", "toCharArray");
                                                                                                    $$.agregarHijo($3)
                                                                                                }
    
	|ENTERO	                                                                                    {   $$= new nodoArbol($1,"Entero")}
    |DECIMAL                                                                                    {   $$= new nodoArbol($1,"Decimal")}
    |TRUE                                                                                       {   $$= new nodoArbol($1,"True")} 
    |FALSE                                                                                      {   $$= new nodoArbol($1,"False")}
    |CARACTER                                                                                   {
                                                                                                    var cadena = $1.slice(1);
                                                                                                    var guardar = cadena.slice(0,-1);
                                                                                                    $$= new nodoArbol(guardar,"Char");
                                                                                                }
	|FRASE                                                                                      {   
                                                                                                    var cadena = $1.slice(1);
                                                                                                    var guardar = cadena.slice(0,-1);
                                                                                                    $$= new nodoArbol(guardar,"String");
                                                                                                }
    |expresion INTERROGACION expresion DPUNTOS expresion PCOMA                                  {
                                                                                                    $$ = new nodoArbol("if", "toCharArray");
                                                                                                    $$.agregarHijo($1)
                                                                                                    $$.agregarHijo($3)
                                                                                                    $$.agregarHijo($5)
                                                                                                }
;