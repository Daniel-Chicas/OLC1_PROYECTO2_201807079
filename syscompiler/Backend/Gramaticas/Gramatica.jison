%{
    const {Error_} = require('../dist/Error/Error.js')
    const {Literal,TipoLiteral} = require('../dist/Expresiones/Literal.js');
    const {Aritmetica,TipoAritmetica} = require('../dist/Expresiones/Aritmetica.js');
    const {Logica, TipoLogica} = require('../dist/Expresiones/Logica.js');
    const {Relacional, TipoRelacional} = require('../dist/Expresiones/Relacional.js');
    const {Casteo} = require('../dist/Expresiones/Casteo.js');
    const {Acceso, AccesoVectores, ModiVectores, AgregarLista, AccesoListas, ModificarLista} = require('../dist/Expresiones/Acceso.js');
    const {Minusculas, Mayusculas, Tamanio, Truncate, Round, Typeof, toString, toCharArray} = require('../dist/Expresiones/FuncionesCambios.js')


    const {Declaracion} = require('../dist/Instrucciones/Declaracion.js');
    const {Vectores} = require('../dist/Instrucciones/Vectores.js');
    const {Imprimir} = require('../dist/Instrucciones/Imprimir.js')

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
%left 'COMA' 'IGUAL'
%left UMENOS
%right 'NOT'

%start ini

%% 

ini
    :general EOF{
		return $1;
	}
;

general
        :general cuerpo                                         {$1.push($2); $$ = $1; }
        |cuerpo                                                 {$$ = [$1]; }
;				

cuerpo
    //YA ESTÁ
    :variable                                                   {$$= $1}
    
    //FALTA
    |COMENTARIO                                                 {$$= $1}
    |funcionMetodo                                              {$$= $1}
    |START WITH ID PAR_ABRE PAR_CIERRA PCOMA                    {$$= $1+" "+$2+" "+$3+" "+$4+" "+$5+" "+$6}
    |START WITH ID PAR_ABRE expresion PAR_CIERRA PCOMA          {$$= $1+" "+$2+" "+$3+" "+$4+" "+$5+" "+$6}
;

funcionMetodo
        :tipo ID PAR_ABRE parametros PAR_CIERRA LLABRE cuerpoFunciones LLCIERRA                         {$$= $1+" "+$2+" "+$3+" "+$4+" "+$5+" "+$6+" "+$7+" "+$8}
        |tipo ID PAR_ABRE PAR_CIERRA LLABRE cuerpoFunciones LLCIERRA                                    {$$= $1+" "+$2+" "+$3+" "+$4+" "+$5+" "+$6+" "+$7}
        |VOID ID PAR_ABRE parametros PAR_CIERRA LLABRE cuerpoFunciones LLCIERRA                         {$$= $1+" "+$2+" "+$3+" "+$4+" "+$5+" "+$6+" "+$7+" "+$8}
        |VOID ID PAR_ABRE PAR_CIERRA LLABRE cuerpoFunciones LLCIERRA                                    {$$= $1+" "+$2+" "+$3+" "+$4+" "+$5+" "+$6+" "+$7}
;

parametros
        :parametros COMA parametros                             {$$= $1+", "+$3}
        |tipo ID                                                {$$= $1+" "+$2}
;

cuerpoFunciones
                :cuerpoFunciones declaraciones                  {$1.push($2); $$= $1}
                |declaraciones                                  {$$= [$1]}
;

declaraciones
            //YA ESTÁ
            :variable                                                       {$$= $1} 

            //FALTA
            |COMENTARIO                                                     {$$= $1}
            |sentencias                                                     {$$= $1}
            |IMPRIMIR PAR_ABRE expresion PAR_CIERRA PCOMA                   {$$= new Imprimir($3, @1.first_line, @1.first_column)}
;

sentencias
            :IF PAR_ABRE expresion PAR_CIERRA LLABRE cuerpoFunciones  LLCIERRA                                              {$$= $1+" "+$2+" "+$3+" "+$4+" "+$5+" "+$6+" "+$7}
            |IF PAR_ABRE expresion PAR_CIERRA LLABRE cuerpoFunciones  LLCIERRA  ELSE LLABRE cuerpoFunciones  LLCIERRA       {$$= $1+" "+$2+" "+$3+" "+$4+" "+$5+" "+$6+" "+$7+" "+$8+" "+$9+" "+$10+" "+$11}
            |IF PAR_ABRE expresion PAR_CIERRA LLABRE cuerpoFunciones  LLCIERRA elifs                                        {$$= $1+" "+$2+" "+$3+" "+$4+" "+$5+" "+$6+" "+$7+" "+$8+" "+$9+" "+$10+" "+$11}
            |IF PAR_ABRE expresion PAR_CIERRA LLABRE cuerpoFunciones  LLCIERRA elifs ELSE LLABRE cuerpoFunciones  LLCIERRA  {$$= $1+" "+$2+" "+$3+" "+$4+" "+$5+" "+$6+" "+$7+" "+$8+" "+$9+" "+$10+" "+$11+" "+$12}
            |SWITCH PAR_ABRE expresion PAR_CIERRA LLABRE casos LLCIERRA                                                     {$$= $1+" "+$2+" "+$3+" "+$4+" "+$5+" "+$6+" "+$7}
            |WHILE PAR_ABRE expresion PAR_CIERRA LLABRE cuerpoFunciones LLCIERRA                                            {$$= $1+" "+$2+" "+$3+" "+$4+" "+$5+" "+$6+" "+$7}
            |FOR PAR_ABRE expresion PCOMA expresion PCOMA expresion PAR_CIERRA LLABRE cuerpoFunciones LLCIERRA              {$$= $1+" "+$2+" "+$3+" "+$4+" "+$5+" "+$6+" "+$7+" "+$8+" "+$9+" "+$10+" "+$11}
            |FOR PAR_ABRE INT ID IGUAL ENTERO  PCOMA expresion PCOMA expresion PAR_CIERRA LLABRE cuerpoFunciones LLCIERRA   {$$= $1+" "+$2+" "+$3+" "+$4+" "+$5+" "+$6+" "+$7+" "+$8+" "+$9+" "+$10+" "+$11+" "+$12+" "+$13+" "+$14}
            |DO LLABRE cuerpoFunciones LLCIERRA WHILE PAR_ABRE expresion PAR_CIERRA PCOMA                                   {$$= $1+" "+$2+" "+$3+" "+$4+" "+$5+" "+$6+" "+$7+" "+$8+" "+$9}
;

casos 
    :casos caso                                 {$1.push($2); $$=$1}                                                     
    |caso                                       {$$= [$1]}        
;

caso 
    :CASE expresion DPUNTOS cuerpoFunciones             {$$= $1+" "+$2+" "+$3+" "+$4}
    |DEFAULT DPUNTOS cuerpoFunciones                    {$$= $1+" "+$2+" "+$3}
;

elifs   
    :elifs  ELSE IF PAR_ABRE expresion PAR_CIERRA LLABRE cuerpoFunciones LLCIERRA                {$1.push($2+" "+$3+" "+$4+" "+$5+" "+$6+" "+$7+" "+$8+" "+$9); $$=$1}
    |ELSE IF PAR_ABRE expresion PAR_CIERRA LLABRE cuerpoFunciones LLCIERRA                       {$$= [$1+" "+$2+" "+$3+" "+$4+" "+$5+" "+$6+" "+$7+" "+$8]}
;


variable
        :tipo identificadores PCOMA                                                             {
                                                                                                    var arreglo = $2.split(",");
                                                                                                    var expresiones = [];
                                                                                                    for (let index = 0; index < arreglo.length; index++) {
                                                                                                        var valor;
                                                                                                        if($1.toString().toLowerCase() == "int"){
                                                                                                            var valor = new Literal(0,TipoLiteral.ENTERO, @1.first_line, @1.first_column)
                                                                                                        }else if($1.toString().toLowerCase() == "double"){
                                                                                                            var valor = new Literal(0.0,TipoLiteral.DOUBLE, @1.first_line, @1.first_column)
                                                                                                        }else if($1.toString().toLowerCase() == "boolean"){
                                                                                                            var valor = new Literal("true",TipoLiteral.BOOLEAN, @1.first_line, @1.first_column)
                                                                                                        }else if($1.toString().toLowerCase() == "char"){
                                                                                                            var valor = new Literal('0',TipoLiteral.CHAR, @1.first_line, @1.first_column)
                                                                                                        }else if($1.toString().toLowerCase() == "string"){
                                                                                                            var valor = new Literal("",TipoLiteral.CADENA, @1.first_line, @1.first_column)
                                                                                                        } 
                                                                                                        expresiones.push(new Declaracion($1, arreglo[index], valor,@1.first_line, @1.first_column))
                                                                                                    }
                                                                                                    $$ = expresiones;
                                                                                                }
        |tipo identificadores IGUAL expresion PCOMA                                             {  
                                                                                                    var arreglo = $2.split(",");
                                                                                                    var expresiones = [];
                                                                                                    for (let index = 0; index < arreglo.length; index++) {
                                                                                                        expresiones.push(new Declaracion($1, arreglo[index], $4,@1.first_line, @1.first_column))
                                                                                                    }
                                                                                                    $$ = expresiones;
                                                                                                } 
        |identificadores IGUAL expresion PCOMA                                                  {
                                                                                                    var arreglo = $1.split(",");
                                                                                                    var expresiones = [];
                                                                                                    for (let index = 0; index < arreglo.length; index++) {
                                                                                                        expresiones.push(new Declaracion("", arreglo[index], $3,@1.first_line, @1.first_column))
                                                                                                    }
                                                                                                    $$ = expresiones;
                                                                                                }
        |tipo identificadores IGUAL casteos                                                     {
                                                                                                    var arreglo = $2.split(",");
                                                                                                    var expresiones = [];
                                                                                                    for (let index = 0; index < arreglo.length; index++) {
                                                                                                        expresiones.push(new Declaracion($1, arreglo[index], $4,@1.first_line, @1.first_column))
                                                                                                    }
                                                                                                    $$ = expresiones;
                                                                                                }
        |identificadores IGUAL casteos                                                          {
                                                                                                    var arreglo = $1.split(",");
                                                                                                    var expresiones = [];
                                                                                                    for (let index = 0; index < arreglo.length; index++) {
                                                                                                        expresiones.push(new Declaracion("", arreglo[index], $3,@1.first_line, @1.first_column))
                                                                                                    }
                                                                                                    $$ = expresiones;
                                                                                                }
        |ID MAS MAS PCOMA                                                                       {$$= new Aritmetica(new Acceso($1, @1.first_line, @1.first_column), new Literal("1",TipoLiteral.ENTERO, @1.first_line, @1.first_column), TipoAritmetica.SUMA, @1.first_line, @1.first_column)}
        |ID MENOS MENOS PCOMA                                                                   {$$= new Aritmetica(new Acceso($1, @1.first_line, @1.first_column), new Literal("1",TipoLiteral.ENTERO, @1.first_line, @1.first_column), TipoAritmetica.RESTA, @1.first_line, @1.first_column)}
        
        //VECTORES
        |tipo ID CABRE CCIERRA IGUAL NUEVO tipo CABRE expresion CCIERRA PCOMA                   {
                                                                                                    if($1.toString().toLowerCase() == $7.toString().toLowerCase()){
                                                                                                        $$= new Declaracion("vector@si", $1+"&"+$2, $9, @1.first_line, @1.first_column)
                                                                                                    }else{
                                                                                                        throw new Error_(@1.first_line, @1.first_column, "Semántico", "La asignación del vector: "+$2.toString()+", no es del mismo tipo. ("+$1+" _ "+$7+")")
                                                                                                    }
                                                                                                }
        |tipo ID CABRE CCIERRA IGUAL LLABRE expresion LLCIERRA PCOMA                            {$$= new Declaracion("vector@no", $1+"&"+$2, $7, @1.first_line, @1.first_column)}
        |ID CABRE expresion CCIERRA IGUAL expresion PCOMA                                       {$$= new ModiVectores($1, $3, $6, @1.first_line, @1.first_column)}
        |ID CABRE CCIERRA IGUAL NUEVO tipo CABRE expresion CCIERRA PCOMA                        {$$= new Declaracion("vector@si", "&"+$1, $8,@1.first_line, @1.first_column)}
        |ID CABRE CCIERRA IGUAL LLABRE expresion LLCIERRA PCOMA                                 {$$= new Declaracion("vector@no", "&"+$1, $6, @1.first_line, @1.first_column)}

        //LISTAS DINÁMICAS
        |LISTA MENOR tipo MAYOR ID IGUAL NUEVO LISTA MENOR tipo MAYOR PCOMA                     {$$= new Declaracion("lista", $3+"&"+$5, "", @1.first_line, @1.first_column)}
        |AGREGAR PAR_ABRE ID COMA expresion PAR_CIERRA PCOMA                                    {$$= new AgregarLista($3, $5, @1.first_line, @1.first_column)}
        |MODIFICAR PAR_ABRE ID COMA aritmeticos COMA expresion PAR_CIERRA PCOMA                 {$$= new ModificarLista($3, $5, $7, @1.first_line, @1.first_column)}
        |LISTA MENOR tipo MAYOR ID IGUAL TOCHARARRAY PAR_ABRE expresion PAR_CIERRA  PCOMA       {$$= new Declaracion("listaChar", $3+"&"+$5, $9, @1.first_line, @1.first_column)}

        //SENTENCIAS DE TRANSFERENCIA
        |BREAK PCOMA                                                                            {$$= $1+" "+$2}
        |CONTINUE PCOMA                                                                         {$$= $1+" "+$2}
        |RETURN expresion PCOMA                                                                 {$$= $1+" "+$2}

        //ANULADOS
        //|ID CABRE CCIERRA IGUAL expresion PCOMA                                                 {$$= $1+" "+$2+" "+$3+" "+$4+" "+$5+" "+$6}
;

aritmeticos
        :ID                                                 {$$= new Acceso($1, @1.first_line, @1.first_column)}
        |aritmeticos MAS aritmeticos                        {$$= new Aritmetica($1,$3,TipoAritmetica.SUMA, @1.first_line, @1.first_column)}
        |aritmeticos MENOS aritmeticos                      {$$= new Aritmetica($1,$3,TipoAritmetica.RESTA, @1.first_line, @1.first_column)}
        |aritmeticos POR aritmeticos                        {$$= new Aritmetica($1,$3,TipoAritmetica.MULTIPLICACION, @1.first_line, @1.first_column)}
        |aritmeticos DIVIDIR aritmeticos                    {$$= new Aritmetica($1,$3,TipoAritmetica.DIVISION, @1.first_line, @1.first_column)}
        |aritmeticos MOD aritmeticos                        {$$= new Aritmetica($1,$3,TipoAritmetica.MODULO, @1.first_line, @1.first_column)}
        |aritmeticos POTENCIA aritmeticos                   {$$= new Aritmetica($1,$3,TipoAritmetica.POTENCIA, @1.first_line, @1.first_column)}
        |ENTERO	                                            {$$= new Literal($1,TipoLiteral.ENTERO, @1.first_line, @1.first_column)}
        |DECIMAL                                            {$$= new Literal($1,TipoLiteral.DOUBLE, @1.first_line, @1.first_column)}
        |ID CABRE expresion CCIERRA                         {$$= new AccesoVectores($1, $3, @1.first_line, @1.first_column)}
        |SACAR PAR_ABRE ID COMA expresion PAR_CIERRA        {$$= new AccesoListas($3, $5, @1.first_line, @1.first_column)}
        |PAR_ABRE aritmeticos PAR_CIERRA                    {$$= $2}
;

casteos
        :PAR_ABRE tipo PAR_CIERRA expresion PCOMA       {$$ = new Casteo($2, $4, @1.first_line, @1.first_column)}
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
    :MENOS expresion %prec UMENOS                       {$$= new Aritmetica($2,new Literal("-1",TipoLiteral.ENTERO, @1.first_line, @1.first_column),TipoAritmetica.MULTIPLICACION, @1.first_line, @1.first_column)}
    //LÓGICOS
    |NOT expresion                                      {$$= new Logica($1,"", TipoLogica.NOT, @1.first_line, @1.first_column)}
    |expresion AND expresion                            {$$= new Logica($1,$3, TipoLogica.AND, @1.first_line, @1.first_column)}
    |expresion OR expresion                             {$$= new Logica($1,$3, TipoLogica.OR, @1.first_line, @1.first_column)}
    //ARITMÉTICOS
    |expresion MAS expresion                            {$$= new Aritmetica($1,$3,TipoAritmetica.SUMA, @1.first_line, @1.first_column)}
    |expresion MENOS expresion                          {$$= new Aritmetica($1,$3,TipoAritmetica.RESTA, @1.first_line, @1.first_column)}
    |expresion POR expresion                            {$$= new Aritmetica($1,$3,TipoAritmetica.MULTIPLICACION, @1.first_line, @1.first_column)}
    |expresion DIVIDIR expresion                        {$$= new Aritmetica($1,$3,TipoAritmetica.DIVISION, @1.first_line, @1.first_column)}
    |expresion MOD expresion                            {$$= new Aritmetica($1,$3,TipoAritmetica.MODULO, @1.first_line, @1.first_column)}
    |expresion POTENCIA expresion                       {$$= new Aritmetica($1,$3,TipoAritmetica.POTENCIA, @1.first_line, @1.first_column)}
    |PAR_ABRE expresion PAR_CIERRA                      {$$= $2}
    //RELACIONALES
    |expresion IGUALACION expresion                     {$$= new Relacional($1,$3,TipoRelacional.IGUAL, @1.first_line, @1.first_column)}
    |expresion DIFERENCIA expresion                     {$$= new Relacional($1,$3,TipoRelacional.DIFERENCIA, @1.first_line, @1.first_column)}
    |expresion MAYOR_IGUAL expresion                    {$$= new Relacional($1,$3,TipoRelacional.MAYORI, @1.first_line, @1.first_column)}
    |expresion MENOR_IGUAL expresion                    {$$= new Relacional($1,$3,TipoRelacional.MENORI, @1.first_line, @1.first_column)}
    |expresion MAYOR expresion                          {$$= new Relacional($1,$3,TipoRelacional.MAYOR, @1.first_line, @1.first_column)}
    |expresion MENOR expresion                          {$$= new Relacional($1,$3,TipoRelacional.MENOR, @1.first_line, @1.first_column)}
    |expresion MAS MAS                                  {$$= new Aritmetica($1, new Literal("1",TipoLiteral.ENTERO, @1.first_line, @1.first_column),TipoAritmetica.SUMA, @1.first_line, @1.first_column)}
    |expresion MENOS MENOS                              {$$= new Aritmetica($1, new Literal("1",TipoLiteral.ENTERO, @1.first_line, @1.first_column),TipoAritmetica.RESTA, @1.first_line, @1.first_column)}
    
    |ID                                                 {$$= new Acceso($1, @1.first_line, @1.first_column)}
    |expresion COMA expresion                           {$$= new Vectores($1, $3, @1.first_line, @1.first_column)}

    //|expresion IGUAL expresion                          {$$= $1+" = "+$3}

    |ID CABRE expresion CCIERRA                         {$$= new AccesoVectores($1, $3, @1.first_line, @1.first_column)}
    |SACAR PAR_ABRE ID COMA expresion PAR_CIERRA        {$$= new AccesoListas($3, $5, @1.first_line, @1.first_column)}
    
    //llamadas a métodos/funciones
    |ID PAR_ABRE expresion PAR_CIERRA                   {$$= $1+" "+$2+" "+$3+" "+$4}
    |ID PAR_ABRE PAR_CIERRA                             {$$= $1+" "+$2+" "+$3}
    
    |MINUSCULAS PAR_ABRE expresion PAR_CIERRA           {$$= new Minusculas($3, @1.first_line, @1.first_column)}
    |MAYUSCULAS PAR_ABRE expresion PAR_CIERRA           {$$= new Mayusculas($3, @1.first_line, @1.first_column)}
    |LENGTH PAR_ABRE expresion PAR_CIERRA               {$$= new Tamanio($3, @1.first_line, @1.first_column)}
    |TRUNCATE PAR_ABRE expresion PAR_CIERRA             {$$= new Truncate($3, @1.first_line, @1.first_column)}
    |ROUND PAR_ABRE expresion PAR_CIERRA                {$$= new Round($3, @1.first_line, @1.first_column)}
    |TYPEOF PAR_ABRE expresion PAR_CIERRA               {$$= new Typeof($3, @1.first_line, @1.first_column)}
    |TOSTRING PAR_ABRE expresion PAR_CIERRA             {$$= new toString($3, @1.first_line, @1.first_column)}
    |TOCHARARRAY PAR_ABRE expresion PAR_CIERRA          {$$= new toCharArray($3, @1.first_line, @1.first_column)}
    
	|ENTERO	                                            {$$= new Literal($1,TipoLiteral.ENTERO, @1.first_line, @1.first_column)}
    |DECIMAL                                            {$$= new Literal($1,TipoLiteral.DOUBLE, @1.first_line, @1.first_column)}
    |TRUE                                               {$$= new Literal($1,TipoLiteral.BOOLEAN, @1.first_line, @1.first_column)}  
    |FALSE                                              {$$= new Literal($1,TipoLiteral.BOOLEAN, @1.first_line, @1.first_column)}
    |CARACTER                                           {   
                                                            var cadena = $1.slice(1)
                                                            var guardar = cadena.slice(0,-1)
                                                            $$= new Literal(guardar,TipoLiteral.CHAR, @1.first_line, @1.first_column)
                                                        }
	|FRASE                                              {   
                                                            var cadena = $1.slice(1)
                                                            var guardar = cadena.slice(0,-1)
                                                            $$= new Literal(guardar,TipoLiteral.CADENA, @1.first_line, @1.first_column)
                                                        }
;