minus_excl(minus('-')) --> spaces, "-".
minus_excl(excl('!')) --> spaces, "!".

ident(id(R)) --> id(R).

id([F, R]) --> spaces, [C], {code_type(C, csymf), atom_codes(F, [C]) }, rest_ident(R).
rest_ident([F, R]) --> [C], { code_type(C, csym), C \= "-",atom_codes(F, [C]) }, rest_ident(R).
rest_ident([]) --> [].

number(N) --> num(N).

num([F,R]) --> spaces, [D], { code_type(D, digit), atom_codes(F, [D]) }, number_rest(R).
number_rest([F,R]) --> [D], { code_type(D, digit), atom_codes(F, [D]) }, number_rest(R).
number_rest([]) -->[].

boolean(true) --> spaces, "true".
boolean(false) --> spaces, "false".

relational_operator('==') --> spaces, "==".
relational_operator('!=') --> spaces, "!=".
relational_operator('<') --> spaces, "<".
relational_operator('<=') --> spaces, "<=".

boolean_operator('&&') --> spaces, "&&".
boolean_operator('||') --> spaces, "||".

arith_operator('*') --> spaces, "*".
arith_operator('%') --> spaces, "%".
arith_operator('/') --> spaces, "/".
arith_operator('+') --> spaces, "+".
arith_operator('-') --> spaces, "-".

string(S) --> stringC(S).

stringC(S) --> spaces, "'",spaces, content(S) , spaces, "'".
content([S,R]) --> [C], { code_type(C, csym); member(C,[42,58])}, rest_content(R),  {atom_codes(S, [C])}.
rest_content([S,R]) --> spaces, [C], { code_type(C, csym); member(C,[42,58,92]) }, rest_content(R),  {atom_codes(S, [C])}.
rest_content([]) --> [].

space --> " ";"\t"; "\n"; "\r".
spaces --> space, spaces.
spaces-->[].

comment([S,R]) --> [C], { C \= "\n", atom_codes(S, [C]) },  comment(R).        %%HACER
comment([]) --> [].