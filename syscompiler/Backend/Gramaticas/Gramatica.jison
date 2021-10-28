%{
    const {Error_} = require('../dist/Error/Error.js')
    const {Literal,TipoLiteral} = require('../dist/Expresiones/Literal.js');
    const {Aritmetica,TipoAritmetica} = require('../dist/Expresiones/Aritmetica.js');
    const {Logica, TipoLogica} = require('../dist/Expresiones/Logica.js');
    const {Relacional, TipoRelacional} = require('../dist/Expresiones/Relacional.js');
    const {Casteo} = require('../dist/Expresiones/Casteo.js');
    const {Acceso, AccesoVectores, ModiVectores, AgregarLista, AccesoListas, ModificarLista} = require('../dist/Expresiones/Acceso.js');
    const {Minusculas, Mayusculas, Tamanio, Truncate, Round, Typeof, toString, toCharArray} = require('../dist/Expresiones/FuncionesCambios.js');


    const {Declaracion} = require('../dist/Instrucciones/Declaracion.js');
    const {Vectores} = require('../dist/Instrucciones/Vectores.js');
    const {Imprimir} = require('../dist/Instrucciones/Imprimir.js');
    const {Break, Continue, Return} = require('../dist/Instrucciones/SentenciasTransferencia.js');
    const {CuerpoSentencias} = require('../dist/Instrucciones/CuerpoSentencias.js');
    const {If, IfAlterno} = require('../dist/Instrucciones/If.js');
    const {While} = require('../dist/Instrucciones/While.js');
    const {Case} = require('../dist/Instrucciones/Case.js');
    const {Switch} = require('../dist/Instrucciones/Switch.js');
    const {For} = require('../dist/Instrucciones/For.js');
    const {DoWhile} = require('../dist/Instrucciones/DoWhile.js');
    const {MetodosFunciones} = require('../dist/Instrucciones/MetodosFunciones.js');
    const {Funciones} = require('../dist/Instrucciones/MetodosFunciones.js');
    const {Llamadas, LlamadasFunciones} = require('../dist/Instrucciones/Llamadas.js');
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
    :general EOF{
		return $1;
	}
;

general
        :general cuerpo                                         {$1.push($2); $$ = $1; }
        |cuerpo                                                 {$$ = [$1]; }
;				

cuerpo
    :COMENTARIO                                                 {$$= new Declaracion("comentario", "", $1, @1.first_line, @1.first_column)}
    |funcionMetodo                                              {$$= $1}
    |START WITH ID PAR_ABRE PAR_CIERRA PCOMA                    {$$= new Llamadas($3, [], @1.first_line, @1.first_column)}
    |START WITH ID PAR_ABRE expresion PAR_CIERRA PCOMA          {$$= new Llamadas($3, $5, @1.first_line, @1.first_column)}
    |decl                                                       {$$= $1}       
;

funcionMetodo
        :tipo ID PAR_ABRE parametros PAR_CIERRA LLABRE statement LLCIERRA                           {$$= new Funciones($1,$2, $4, $7, @1.first_line, @1.first_column)}
        |tipo ID PAR_ABRE PAR_CIERRA LLABRE statement LLCIERRA                                      {$$= new Funciones($1,$2, [], $7, @1.first_line, @1.first_column)}
        
        |LISTA MENOR tipo MAYOR ID PAR_ABRE parametros PAR_CIERRA LLABRE statement LLCIERRA         {$$= new Funciones("lista&"+$3,$5, $7, $10, @1.first_line, @1.first_column)}
        |LISTA MENOR tipo MAYOR ID PAR_ABRE PAR_CIERRA LLABRE statement LLCIERRA                    {$$= new Funciones("lista&"+$3,$5, [], $9, @1.first_line, @1.first_column)}
        
        |tipo ID CABRE CCIERRA PAR_ABRE parametros PAR_CIERRA LLABRE statement LLCIERRA             {$$= new Funciones("vector&"+$1, $6, $7, $9, @1.first_line, @1.first_column)}
        |tipo ID CABRE CCIERRA PAR_ABRE PAR_CIERRA LLABRE statement LLCIERRA                        {$$= new Funciones("vector&"+$1, [], $7, $8, @1.first_line, @1.first_column)}
        
        |VOID ID PAR_ABRE parametros PAR_CIERRA LLABRE statement LLCIERRA                           {$$= new MetodosFunciones($2, $4, $7, @1.first_line, @1.first_column)}
        |VOID ID PAR_ABRE PAR_CIERRA LLABRE statement LLCIERRA                                      {$$= new MetodosFunciones($2, [], $6, @1.first_line, @1.first_column)}
;

parametros
        :parametros COMA parametros                         {$$= $1+","+$3}
        |tipo ID                                            {$$ = $1+"-"+$2}
        |LISTA MENOR tipo MAYOR ID                          {$$ = "lista&"+$3+"-"+$5}
        |tipo ID CABRE CCIERRA                              {$$ = "vector&"+$1+"-"+$2}
;

cuerpoFunciones
                :cuerpoFunciones declaraciones                  {$1.push($2); $$ = $1;}
                |declaraciones                                  {$$= [$1];}
;

declaraciones
            :sentencias                                                     {$$= $1}
            |IMPRIMIR PAR_ABRE listaExpresiones PAR_CIERRA PCOMA            {$$= new Imprimir($3, @1.first_line, @1.first_column)}           
            //SENTENCIAS DE TRANSFERENCIA
            |BREAK PCOMA                                                    {$$=new Break(@1.first_line, @1.first_column)}
            |CONTINUE PCOMA                                                 {$$=new Continue(@1.firstfirst_line, @1.first_column)}
            |RETURN expresion PCOMA                                         {$$=new Return($2, @1.first_line, @1.first_column)}
            |RETURN PCOMA                                                   {$$=new Return(new Literal("undefined",TipoLiteral.CADENA, @1.first_line, @1.first_column), @1.first_line, @1.first_column)}
            |COMENTARIO                                                     {$$= new Declaracion("comentario", "", $1, @1.first_line, @1.first_column)}
            |decl                                                           {$$= $1}
;

decl
    :variable                                                       {$$= $1} 
    |vectores                                                       {$$= $1}
    |listas                                                         {$$ = $1}
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
        :DO LLABRE statement LLCIERRA WHILE PAR_ABRE expresion PAR_CIERRA PCOMA             { $$ = new DoWhile($7, $3,  @1.first_line, @1.first_column)}
;

for
    :FOR PAR_ABRE declaracionFor PCOMA expresion PCOMA declaracionFor PAR_CIERRA LLABRE statement LLCIERRA              { $$ = new For($3, $5, $7, $10,  @1.first_line, @1.first_column)}
    |FOR PAR_ABRE declaracionFor PCOMA expresion PCOMA ID MAS MAS PAR_CIERRA LLABRE statement LLCIERRA                  { $$ = new For($3, $5, new Declaracion("", $7, new Aritmetica(new Acceso($7, @1.first_line, @1.first_column), new Literal("1",TipoLiteral.ENTERO, @1.first_line, @1.first_column), TipoAritmetica.SUMA, @1.first_line, @1.first_column),@1.first_line, @1.first_column), $12,  @1.first_line, @1.first_column)}
    |FOR PAR_ABRE declaracionFor PCOMA expresion PCOMA ID MENOS MENOS PAR_CIERRA LLABRE statement LLCIERRA              { $$ = new For($3, $5, new Declaracion("", $7, new Aritmetica(new Acceso($7, @1.first_line, @1.first_column), new Literal("1",TipoLiteral.ENTERO, @1.first_line, @1.first_column), TipoAritmetica.RESTA, @1.first_line, @1.first_column),@1.first_line, @1.first_column), $12,  @1.first_line, @1.first_column)}
;

declaracionFor
            :tipo ID IGUAL expresion                                              {$$= new Declaracion($1, $2, $4,@1.first_line, @1.first_column)} 
            |ID IGUAL expresion                                                   {$$= new Declaracion("", $1, $3,@1.first_line, @1.first_column)}
            |tipo ID IGUAL casteos                                                {$$= new Declaracion($1, $2, $4,@1.first_line, @1.first_column)}
            |ID IGUAL casteos                                                     {$$= new Declaracion("", $1, $3,@1.first_line, @1.first_column)}
;

switch
    :SWITCH PAR_ABRE expresion PAR_CIERRA LLABRE casos LLCIERRA                     {$$= new Switch($3, $6, @1.first_line, @1.first_column)}
;

if
    :IF PAR_ABRE expresion PAR_CIERRA LLABRE statement LLCIERRA else                                            {$$= new If($3, $6, $8, @1.first_line, @1.first_column)}
;

else
    :ELSE LLABRE statement LLCIERRA                                                             {$$ = $3}
    |ELSE if                                                                                    {$$ = $2}
    |                                                                                           {$$ = null}
;

while
    :WHILE PAR_ABRE expresion PAR_CIERRA LLABRE statement LLCIERRA                              { $$ = new While($3, $6,  @1.first_line, @1.first_column)}
;

statement
        :cuerpoFunciones                                                                        {
                                                                                                    let arregloInstrucciones = [];
                                                                                                    for(let x = 0; x < $1.length; x++){
                                                                                                        if($1[x].length > 0){
                                                                                                            for(let y = 0; y < $1[x].length; y++){
                                                                                                                arregloInstrucciones.push($1[x][y])
                                                                                                            }
                                                                                                        }else{
                                                                                                            arregloInstrucciones.push($1[x])
                                                                                                        }
                                                                                                    }
                                                                                                    $$= new CuerpoSentencias(arregloInstrucciones, @1.first_line, @1.first_column)
                                                                                                }
        |                                                                                       {$$= new CuerpoSentencias([], @1.first_line, @1.first_column)}
;

casos 
    :casos caso                                 {$1.push($2); $$=$1}                                                     
    |caso                                       {$$= [$1]}        
;

caso 
    :CASE expresion DPUNTOS statement             {$$= new Case($2, $4, @1.first_line, @1.first_column);}
    |DEFAULT DPUNTOS statement                    {$$= new Case(new Literal("default",TipoLiteral.CADENA, @1.first_line, @1.first_column), $3, @1.first_line, @1.first_column)}
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
        |ID MAS MAS PCOMA                                                                       {$$= new Declaracion("", $1, new Aritmetica(new Acceso($1, @1.first_line, @1.first_column), new Literal("1",TipoLiteral.ENTERO, @1.first_line, @1.first_column), TipoAritmetica.SUMA, @1.first_line, @1.first_column),@1.first_line, @1.first_column)}
        |ID MENOS MENOS PCOMA                                                                   {$$= new Declaracion("", $1, new Aritmetica(new Acceso($1, @1.first_line, @1.first_column), new Literal("1",TipoLiteral.ENTERO, @1.first_line, @1.first_column), TipoAritmetica.RESTA, @1.first_line, @1.first_column),@1.first_line, @1.first_column)}
        |ID PAR_ABRE listaExpresiones PAR_CIERRA PCOMA                                          {$$= new Llamadas($1, $3, @1.first_line, @1.first_column)}
        |ID PAR_ABRE PAR_CIERRA PCOMA                                                           {$$= new Llamadas($1, [], @1.first_line, @1.first_column)}
;

vectores
        :tipo ID CABRE CCIERRA IGUAL NUEVO tipo CABRE expresion CCIERRA PCOMA                       {
                                                                                                    if($1.toString().toLowerCase() == $7.toString().toLowerCase()){
                                                                                                        $$= new Declaracion("vector@si", $1+"&"+$2, $9, @1.first_line, @1.first_column)
                                                                                                    }else{
                                                                                                        throw new Error_(@1.first_line, @1.first_column, "Semántico", "La asignación del vector: "+$2.toString()+", no es del mismo tipo. ("+$1+" _ "+$7+")")
                                                                                                    }
                                                                                                }
        |tipo ID CABRE CCIERRA IGUAL LLABRE listaVectores LLCIERRA PCOMA                            {$$= new Declaracion("vector@no", $1+"&"+$2, $7, @1.first_line, @1.first_column)}
        |ID CABRE expresion CCIERRA IGUAL expresion PCOMA                                           {$$= new ModiVectores($1, $3, $6, @1.first_line, @1.first_column)}
        |ID CABRE CCIERRA IGUAL NUEVO tipo CABRE expresion CCIERRA PCOMA                            {$$= new Declaracion("vector@si", "&"+$1, $8,@1.first_line, @1.first_column)}
        |ID CABRE CCIERRA IGUAL LLABRE listaVectores LLCIERRA PCOMA                                 {$$= new Declaracion("vector@no", "&"+$1, $6, @1.first_line, @1.first_column)}
;

listas
    :LISTA MENOR tipo MAYOR ID IGUAL NUEVO LISTA MENOR tipo MAYOR PCOMA                     {$$= new Declaracion("lista", $3+"&"+$5, "", @1.first_line, @1.first_column)}
    |AGREGAR PAR_ABRE ID COMA expresion PAR_CIERRA PCOMA                                    {$$= new AgregarLista($3, $5, @1.first_line, @1.first_column)}
    |MODIFICAR PAR_ABRE ID COMA aritmeticos COMA expresion PAR_CIERRA PCOMA                 {$$= new ModificarLista($3, $5, $7, @1.first_line, @1.first_column)}
    |LISTA MENOR tipo MAYOR ID IGUAL TOCHARARRAY PAR_ABRE expresion PAR_CIERRA  PCOMA       {$$= new Declaracion("listaChar", $3+"&"+$5, new toCharArray($9, @1.first_line, @1.first_column), @1.first_line, @1.first_column)}
;

listaVectores
        :listaVectores COMA listaVectores           {$$= new Vectores($1, $3, @1.first_line, @1.first_column)}
        |expresion                                  {$$= $1}
;

listaExpresiones
            :listaExpresiones COMA expresion                                {$1.push($3); $$= $1}
            |expresion                                                      {$$= [$1]}
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
    :MENOS expresion %prec UMENOS                                                               {$$= new Aritmetica($2,new Literal("-1",TipoLiteral.ENTERO, @1.first_line, @1.first_column),TipoAritmetica.MULTIPLICACION, @1.first_line, @1.first_column)}
    //LÓGICOS
    |NOT expresion                                                                              {$$= new Logica($1,"", TipoLogica.NOT, @1.first_line, @1.first_column)}
    |expresion AND expresion                                                                    {$$= new Logica($1,$3, TipoLogica.AND, @1.first_line, @1.first_column)}
    |expresion OR expresion                                                                     {$$= new Logica($1,$3, TipoLogica.OR, @1.first_line, @1.first_column)}
    //ARITMÉTICOS
    |expresion MAS expresion                                                                    {$$= new Aritmetica($1,$3,TipoAritmetica.SUMA, @1.first_line, @1.first_column)}
    |expresion MENOS expresion                                                                  {$$= new Aritmetica($1,$3,TipoAritmetica.RESTA, @1.first_line, @1.first_column)}
    |expresion POR expresion                                                                    {$$= new Aritmetica($1,$3,TipoAritmetica.MULTIPLICACION, @1.first_line, @1.first_column)}
    |expresion DIVIDIR expresion                                                                {$$= new Aritmetica($1,$3,TipoAritmetica.DIVISION, @1.first_line, @1.first_column)}
    |expresion MOD expresion                                                                    {$$= new Aritmetica($1,$3,TipoAritmetica.MODULO, @1.first_line, @1.first_column)}
    |expresion POTENCIA expresion                                                               {$$= new Aritmetica($1,$3,TipoAritmetica.POTENCIA, @1.first_line, @1.first_column)}
    |PAR_ABRE expresion PAR_CIERRA                                                              {$$= $2}
    //RELACIONALES
    |expresion IGUALACION expresion                                                             {$$= new Relacional($1,$3,TipoRelacional.IGUAL, @1.first_line, @1.first_column)}
    |expresion DIFERENCIA expresion                                                             {$$= new Relacional($1,$3,TipoRelacional.DIFERENCIA, @1.first_line, @1.first_column)}
    |expresion MAYOR_IGUAL expresion                                                            {$$= new Relacional($1,$3,TipoRelacional.MAYORI, @1.first_line, @1.first_column)}
    |expresion MENOR_IGUAL expresion                                                            {$$= new Relacional($1,$3,TipoRelacional.MENORI, @1.first_line, @1.first_column)}
    |expresion MAYOR expresion                                                                  {$$= new Relacional($1,$3,TipoRelacional.MAYOR, @1.first_line, @1.first_column)}
    |expresion MENOR expresion                                                                  {$$= new Relacional($1,$3,TipoRelacional.MENOR, @1.first_line, @1.first_column)}
    |expresion MAS MAS                                                                          {$$= new Aritmetica($1, new Literal("1",TipoLiteral.ENTERO, @1.first_line, @1.first_column), TipoAritmetica.SUMA, @1.first_line, @1.first_column)}
    |expresion MENOS MENOS                                                                      {$$= new Aritmetica($1, new Literal("1",TipoLiteral.ENTERO, @1.first_line, @1.first_column), TipoAritmetica.RESTA, @1.first_line, @1.first_column)}
    
    |ID                                                                                         {$$= new Acceso($1, @1.first_line, @1.first_column)}

    |ID CABRE expresion CCIERRA                                                                 {$$= new AccesoVectores($1, $3, @1.first_line, @1.first_column)}
    |SACAR PAR_ABRE ID COMA expresion PAR_CIERRA                                                {$$= new AccesoListas($3, $5, @1.first_line, @1.first_column)}
    
    //llamadas a métodos/funciones
    |ID PAR_ABRE listaExpresiones PAR_CIERRA                                                    {$$= new LlamadasFunciones($1, $3, @1.first_line, @1.first_column)}
    |ID PAR_ABRE PAR_CIERRA                                                                     {$$= new LlamadasFunciones($1, $3, @1.first_line, @1.first_column)}
    
    |MINUSCULAS PAR_ABRE expresion PAR_CIERRA                                                   {$$= new Minusculas($3, @1.first_line, @1.first_column)}
    |MAYUSCULAS PAR_ABRE expresion PAR_CIERRA                                                   {$$= new Mayusculas($3, @1.first_line, @1.first_column)}
    |LENGTH PAR_ABRE expresion PAR_CIERRA                                                       {$$= new Tamanio($3, @1.first_line, @1.first_column)}
    |TRUNCATE PAR_ABRE expresion PAR_CIERRA                                                     {$$= new Truncate($3, @1.first_line, @1.first_column)}
    |ROUND PAR_ABRE expresion PAR_CIERRA                                                        {$$= new Round($3, @1.first_line, @1.first_column)}
    |TYPEOF PAR_ABRE expresion PAR_CIERRA                                                       {$$= new Typeof($3, @1.first_line, @1.first_column)}
    |TOSTRING PAR_ABRE expresion PAR_CIERRA                                                     {$$= new toString($3, @1.first_line, @1.first_column)}
    |TOCHARARRAY PAR_ABRE expresion PAR_CIERRA                                                  {$$= new toCharArray($3, @1.first_line, @1.first_column)}
    
	|ENTERO	                                                                                    {$$= new Literal($1,TipoLiteral.ENTERO, @1.first_line, @1.first_column)}
    |DECIMAL                                                                                    {$$= new Literal($1,TipoLiteral.DOUBLE, @1.first_line, @1.first_column)}
    |TRUE                                                                                       {$$= new Literal($1,TipoLiteral.BOOLEAN, @1.first_line, @1.first_column)}  
    |FALSE                                                                                      {$$= new Literal($1,TipoLiteral.BOOLEAN, @1.first_line, @1.first_column)}
    |CARACTER                                                                                   {   
                                                                                                    var cadena = $1.slice(1)
                                                                                                    var guardar = cadena.slice(0,-1)
                                                                                                    $$= new Literal(guardar,TipoLiteral.CHAR, @1.first_line, @1.first_column)
                                                                                                }
	|FRASE                                                                                      {   
                                                                                                    var cadena = $1.slice(1)
                                                                                                    var guardar = cadena.slice(0,-1)
                                                                                                    $$= new Literal(guardar,TipoLiteral.CADENA, @1.first_line, @1.first_column)
                                                                                                }
    |expresion INTERROGACION expresion DPUNTOS expresion PCOMA                                  {$$= new IfAlterno($1, $3, $5, @1.first_line, @1.first_column)}
;