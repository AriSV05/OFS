:-[lexer].

ofs_program(program([I | S])) --> import(I), statements(S).

import(imports(I)) --> import_start(I).
import_start([S | R]) --> import_statement(S), import_start(R).
import_start([]) --> [].

import_statement([I | R]) --> spaces, "import", spaces, imported_symbols(I), spaces, fromStatement(R).
fromStatement(from(S)) --> "from", spaces, string(S), spaces.

imported_symbols(corchete([I | R]) ) --> "{", spaces, ident(I), spaces, rest_idents(R), "}".
imported_symbols(I) --> ident(I).

rest_idents(more_id([I,R])) --> spaces, ",", spaces, ident(I), spaces, rest_idents(R).
rest_idents([]) --> [].

statements(statements(S)) --> statement_start(S).

statement_start([S | R]) --> statement(S), statement_start(R).
statement_start([]) --> [].

statement(D) --> declaration(D), spaces.
statement(Ex) --> expression(Ex), spaces.
statement(E) --> empty(E), spaces.
statement(comentario(C)) --> comentario(C), spaces.

declaration(let(L)) --> let_declaration(L).
declaration(const(C)) --> const_declaration(C).


let_declaration([I | E]) --> spaces, "let", spaces, ident(I), equalExp(E).
const_declaration([I | E]) --> spaces, "const", spaces, ident(I), equalExp(E).

equalExp(equal(E)) --> spaces,"=", spaces, expression(E).
equalExp([]) --> [].

expression(expression(E)) --> pipe_expression(E).

pipe_expression([O | R]) --> ofs_expression(O), pipe(R). 

pipe(pipe(P)) --> rest_pipe(P).

rest_pipe([O | R]) --> spaces, ">>", spaces, ofs_expression(O), rest_pipe(R).
rest_pipe([]) --> [].

ofs_expression(iterate(I)) --> iterate_expression(I).
ofs_expression(map(M)) --> map_expression(M).
ofs_expression(filter(F)) --> filter_expression(F).
ofs_expression(cut(C)) --> cut_expression(C).
ofs_expression(es6(E)) --> es6_expression(E).

iterate_expression([E1 | E2]) --> spaces, "[*", spaces, expression(E1), spaces, ",", spaces,  expression(E2), spaces, "]".
map_expression(E) --> spaces, "[>", spaces, expression(E), spaces, "]".
filter_expression(E) --> spaces, "[?", spaces, expression(E), spaces, "]".
cut_expression(E) --> spaces, "[!", spaces, expression(E), spaces, "]".

es6_expression(lambda(L)) --> lambda_expression(L).
es6_expression(boolean(B)) --> boolean_expression(B).
es6_expression(condicional(C)) --> conditional_expression(C).
es6_expression(array(A)) --> array_expression(A).

boolean_expression([R | RE]) --> relational_expression(R), rest_boolean_expr(RE). 

rest_boolean_expr([B, R| RE]) --> boolean_operator(B), relational_expression(R), rest_boolean_expr(RE).
rest_boolean_expr([]) --> [].

relational_expression([A | R]) --> arith_expression(A), rest_relationa_expr(R).

rest_relationa_expr([R, A| RE]) --> relational_operator(R), arith_expression(A), rest_relationa_expr(RE).
rest_relationa_expr([]) --> [].

conditional_expression([R, E1| E2]) --> relational_expression(R), spaces, "?", spaces, expression(E1), spaces, ":", spaces, expression(E2).

arith_expression([F | R]) --> factor_expression(F), rest_arith_expression(R).

rest_arith_expression([A, F | R]) --> arith_operator(A), factor_expression(F), rest_arith_expression(R).
rest_arith_expression([]) --> [].

factor_expression(literal(L)) --> literal_expression(L). 
factor_expression(simple(S)) --> simple_expression(S).
factor_expression(unary(U)) --> unary_expression(U).
factor_expression(parenth(P)) --> parenthesis_expression(P).

literal_expression(number(N)) --> number(N).
literal_expression(string(S)) --> string(S).
literal_expression(boolean(B)) --> boolean(B).

simple_expression([Q | R]) --> qualifiable_id(Q), rest_simple_expr(R).
rest_simple_expr(E) --> spaces, "=", spaces, expression(E).
rest_simple_expr(A) --> args_expression(A).
rest_simple_expr([]) --> [].

unary_expression([M | E]) --> minus_excl(M), expression(E).

parenthesis_expression(E) --> spaces, "(", spaces, expression(E), spaces, ")".

qualifiable_id([A | P]) --> access_expression(A), point_access_expression(P).
point_access_expression(point([A | P])) --> ".", access_expression(A), point_access_expression(P).
%point_access_expression(E) --> expression(E).
point_access_expression([]) --> [].

args_expression(parentArgs(R)) --> spaces, "(", spaces, rest_expression(R), spaces, ")".

rest_expression([E | C]) --> expression(E), comma_expr(C).
rest_expression([]) --> [].

comma_expr(comma([E | C])) --> spaces, ",",  spaces, expression(E), comma_expr(C).
comma_expr([]) --> [].

access_expression(I) --> ident(I), spaces.
access_expression(E) --> spaces, "[", spaces, expression(E), spaces, "]".

array_expression([R | P]) --> spaces, "[", spaces, rest_expression(R), spaces, "]" , plus_expr(P).

plus_expr(plus(E)) --> spaces, "+" , spaces, expression(E), plus_expr.
plus_expr([]) --> [].

lambda_expression([P | E]) --> params_expression(P), spaces, "->", spaces, expression(E).

params_expression(I) --> ident(I).
params_expression(parentesis([I | R])) --> spaces, "(",spaces, ident(I), rest_idents(R), spaces, ")".

empty(;) --> spaces, ";".
comentario(C) --> "//", comment(C).