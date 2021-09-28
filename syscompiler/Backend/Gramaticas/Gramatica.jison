%{

%}

%lex

%options case-insensitive

%%

\s+                                         // se ignoran espacios en blanco
"//".*                                      // comentario simple línea
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]         // comentario multiple líneas

//palabras reservadas

"true"                  return 'TRUE';
"false"                 return 'FALSE';

//'dijofdjf'+${}'
[0-9]+("."[0-9]+)?\b    return 'ENTERO';
[0-9]+\b                return 'ENTERO';
([a-zA-Z])[a-zA-Z0-9_]* return 'IDENTIFICADOR';

"("                     return 'PAR_ABRE';
")"                     return 'PAR_CIERRA';

//logicos
"=="                    return 'D_IGUAL';
"<="                    return 'MENOR_IGUAL';
"<"                     return 'MENOR';
">="                    return 'MAYOR_IGUAL';                     
">"                     return 'MAYOR';
"!="                    return 'DIFERENTE';
//*/

','                     return 'COMA'
"+"                     return 'MAS';
"-"                     return 'MENOS';
"*"                     return 'POR';
"/"                     return 'DIVIDIR';

\"[^\"]*\"              { yytext = yytext.substr(1,yyleng-2); return 'CADENA'; }
\'[^\']*\'              { yytext = yytext.substr(1,yyleng-2); return 'CADENA'; }
<<EOF>>                 return 'EOF';
.                      {console.log(yylloc.first_line, yylloc.first_column,'Lexico',yytext)}
/lex


%left 'INTERROGACION' 'DOS_PUNTOS'
%left 'OR'
%left 'AND'
%left 'DIFERENTE' 'D_IGUAL'
%left 'MENOR_IGUAL' 'MAYOR_IGUAL' 'MENOR' 'MAYOR'
%left 'MAS' 'MENOS' 
%left 'POR' 'DIVIDIR'
%left UMENOS
%right 'NOT' 

%start ini

%% 

ini
    : expresion EOF{
        return $1;
    }
;

//EXPRESION

expresion
    :expresion MAS expresion            {$$= $1+$3} 
    |expresion MENOS expresion          {$$= $1-$3} 
    |expresion POR expresion            {$$= $1*$3}   
    |expresion DIVIDIR expresion        {$$= $1/$3} 
    |PAR_ABRE expresion PAR_CIERRA      {$$= $2}
    |ENTERO                             {$$= Number($1)}
;
