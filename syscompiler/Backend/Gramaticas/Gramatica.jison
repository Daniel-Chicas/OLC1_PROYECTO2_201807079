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
    :variable                                                   {$$= $1}
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
            :variable                                                       {$$= $1}
            |COMENTARIO                                                     {$$= $1}
            |sentencias                                                     {$$= $1}
            |IMPRIMIR PAR_ABRE expresion PAR_CIERRA PCOMA                   {$$= $1+" "+$2+" "+$3+" "+$4+" "+$5}
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
        :tipo identificadores PCOMA                                                             {$$= $1+" "+$2+";"}
        |tipo identificadores IGUAL expresion PCOMA                                             {$$= $1+" "+$2+" = "+$4+";"}
        |identificadores IGUAL expresion PCOMA                                                  {$$= $1+" = "+$3+";"}
        |tipo identificadores IGUAL casteos                                                     {$$= $1+" "+$2+"="+$4}
        |identificadores IGUAL casteos                                                          {$$= $1+"="+$3}
        |ID MAS MAS PCOMA                                                                       {$$= $1+"++;"}
        |ID MENOS MENOS PCOMA                                                                   {$$= $1+"--;"}
        
        //VECTORES
        |tipo ID CABRE CCIERRA IGUAL NUEVO tipo CABRE ENTERO CCIERRA PCOMA                      {$$= $1+" "+$2+" "+$3+" "+$4+" "+$5+" "+$6+" "+$7+" "+$8+" "+$9+" "+$10+" "+$11}
        |ID CABRE CCIERRA IGUAL NUEVO tipo CABRE ENTERO CCIERRA PCOMA                           {$$= $1+" "+$2+" "+$3+" "+$4+" "+$5+" "+$6+" "+$7+" "+$8+" "+$9+" "+$10}
        |tipo ID CABRE CCIERRA IGUAL LLABRE expresion LLCIERRA PCOMA                            {$$= $1+" "+$2+" "+$3+" "+$4+" "+$5+" "+$6+" "+$7+" "+$8+" "+$9}
        |ID CABRE CCIERRA IGUAL LLABRE expresion LLCIERRA PCOMA                                 {$$= $1+" "+$2+" "+$3+" "+$4+" "+$5+" "+$6+" "+$7+" "+$8}
        |ID CABRE CCIERRA IGUAL expresion PCOMA                                                 {$$= $1+" "+$2+" "+$3+" "+$4+" "+$5+" "+$6}
        |ID CABRE ENTERO CCIERRA IGUAL expresion PCOMA                                          {$$= $1+" "+$2+" "+$3+" "+$4+" "+$5+" "+$6+" "+$7}

        //LISTAS DINÁMICAS
        |LISTA MENOR tipo MAYOR ID IGUAL NUEVO LISTA MENOR tipo MAYOR PCOMA                     {$$= $1+" "+$2+" "+$3+" "+$4+" "+$5+" "+$6+" "+$7+" "+$8+" "+$9+" "+$10+" "+$11+" "+$12}
        |LISTA MENOR tipo MAYOR ID IGUAL TOCHARARRAY PAR_ABRE expresion PAR_CIERRA  PCOMA       {$$= $1+" "+$2+" "+$3+" "+$4+" "+$5+" "+$6+" "+$7+" "+$8+" "+$9+" "+$10+" "+$11}
        |AGREGAR PAR_ABRE ID COMA expresion PAR_CIERRA PCOMA                                    {$$= $1+" "+$2+" "+$3+" "+$4+" "+$5+" "+$6+" "+$7}
        |MODIFICAR PAR_ABRE ID COMA ENTERO COMA expresion PAR_CIERRA PCOMA                      {$$= $1+" "+$2+" "+$3+" "+$4+" "+$5+" "+$6+" "+$7+" "+$8+" "+$9}

        //SENTENCIAS DE TRANSFERENCIA
        |BREAK PCOMA                                                                            {$$= $1+" "+$2}
        |CONTINUE PCOMA                                                                         {$$= $1+" "+$2}
        |RETURN expresion PCOMA                                                                 {$$= $1+" "+$2}
;

casteos
        :PAR_ABRE tipo PAR_CIERRA expresion PCOMA       {$$="("+$2+")"+$4+";"}
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
    |NOT expresion                                      {$$= "!"+$1}
    |expresion IGUAL expresion                          {$$= $1+" = "+$3}
    |expresion AND expresion                            {$$= $1+" && "+$3}
    |expresion OR expresion                             {$$= $1+" || "+$3}
    |expresion COMA expresion                           {$$= $1+" , "+$3}
    |expresion MAS expresion                            {$$= $1+"+"+$3}
    |expresion MENOS expresion                          {$$= $1+"-"+$3}
    |expresion POR expresion                            {$$= $1+"*"+$3}
    |expresion DIVIDIR expresion                        {$$= $1+"/"+$3}
    |expresion IGUALACION expresion                     {$$= $1+"=="+$3}
    |expresion DIFERENCIA expresion                     {$$= $1+"!="+$3}
    |expresion MAYOR_IGUAL expresion                    {$$= $1+"<="+$3}
    |expresion MENOR_IGUAL expresion                    {$$= $1+">="+$3}
    |expresion MAYOR expresion                          {$$= $1+">"+$3}
    |expresion MENOR expresion                          {$$= $1+"<"+$3}
    |PAR_ABRE expresion PAR_CIERRA                      {$$= "("+$2+")"}
    |expresion MOD expresion                            {$$= $1+"%"+$3}
    |expresion POTENCIA expresion                       {$$= $1+"^"+$3}
	|ENTERO	                                            {$$= Number($1)}
	|FRASE                                              {$$= $1}
    |TRUE                                               {$$= $1}    
    |FALSE                                              {$$= $1}
    |ID                                                 {$$= $1}
    |expresion MAS MAS                                  {$$= $1+"++"}
    |expresion MENOS MENOS                              {$$= $1+"--"}
    |ID CABRE ENTERO CCIERRA                            {$$= $1+" "+$2+" "+$3+" "+$4}
    |SACAR PAR_ABRE ID COMA expresion PAR_CIERRA        {$$= $1+" "+$2+" "+$3+" "+$4+" "+$5+" "+$6}
    |ID PAR_ABRE expresion PAR_CIERRA                   {$$= $1+" "+$2+" "+$3+" "+$4}
    |ID PAR_ABRE PAR_CIERRA                             {$$= $1+" "+$2+" "+$3}
    |MINUSCULAS PAR_ABRE expresion PAR_CIERRA           {$$= $1+" "+$2+" "+$3+" "+$4}
    |MAYUSCULAS PAR_ABRE expresion PAR_CIERRA           {$$= $1+" "+$2+" "+$3+" "+$4}
    |LENGTH PAR_ABRE expresion PAR_CIERRA               {$$= $1+" "+$2+" "+$3+" "+$4}
    |TRUNCATE PAR_ABRE expresion PAR_CIERRA             {$$= $1+" "+$2+" "+$3+" "+$4}
    |ROUND PAR_ABRE expresion PAR_CIERRA                {$$= $1+" "+$2+" "+$3+" "+$4}
    |TYPEOF PAR_ABRE expresion PAR_CIERRA               {$$= $1+" "+$2+" "+$3+" "+$4}
    |TOSTRING PAR_ABRE expresion PAR_CIERRA             {$$= $1+" "+$2+" "+$3+" "+$4}
    |TOCHARARRAY PAR_ABRE expresion PAR_CIERRA          {$$= $1+" "+$2+" "+$3+" "+$4}
;
