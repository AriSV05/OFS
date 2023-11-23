:-[utils].

generator( JSFilename, program( [ LI | LS ])) :- 
	open(JSFilename, write, Stream),
	generate_import(Stream, LI),
	generate_statements(Stream, LS),
	close(Stream)
.

generate_import(Stream,  imports([[id(IdList) | from(FromList)]]) ):- 
	flatten_list(IdList, I), concatenar(I,Id),
	flatten_list(FromList, F), concatenar(F,From),
	format(Stream, 'import ~s from \'~s\' \n', [Id, From])
.



generate_import(Stream,  imports([[corchete([id(IdList)])|from(FromList)]]) ):- 
	flatten_list(IdList, I), concatenar(I,Id),
	flatten_list(FromList, F), concatenar(F,From),
	format(Stream, 'import {~s} from  \'~s\' \n', [Id, From])
.

generate_import(_,imports([])).

/*generate_import(Stream,  imports([[corchete([id(IdList) | MR ])|from(FromList)]]) ):- 
	flatten_list(IdList, I), concatenar(I,Id),
	flatten_list(FromList, F), concatenar(F,From),
	forall(member(MoreId, MR), generate_moreIds(MoreId, More)),
	format(Stream, 'import {~s,~s} from  \'~s\' \n', [Id, More, From])
.
generate_moreIds( more_id( [id(IdList) | _] ), More):-
	flatten_list(IdList, I), concatenar(I,More)
.
*/

generate_statements(Stream, statements(LS) ):- 
	forall(member(Statement, LS), generate_state(Stream, Statement))
.

generate_statements(Stream, statements([LS]) ):- 
	generate_state(Stream, LS)
.

generate_statements(_, statements([]) ).

generate_state(Stream, comentario(LC)) :-
    flatten_list(LC, C),
    concatenar(C, Comment),
    format(Stream, '// ~s \n', [Comment])
.

generate_state(Stream, let([id(IdList) | RE]) ) :-
    flatten_list(IdList, I),
    concatenar(I, Id),
    format(Stream, '\nlet ~s \n', [Id]),
	generate_equal_exp(Stream,RE)
.

generate_state(Stream, const([id(IdList) | RE]) ) :-
    flatten_list(IdList, I),
    concatenar(I, Id),
    format(Stream, '\nconst ~s', [Id]),
	generate_equal_exp(Stream,RE)
.

generate_state(Stream, expression([LEX | Pipes]) ) :- 
	generate_expresion(Stream, LEX),
	generate_pipes(Stream,Pipes)
.

generate_state(Stream, S):-
	format(Stream, '//>>>> ~n~q NOT GENERATOR STATE<<<<<',[S])
.

generate_pipes(Stream, pipe(L) ):-
	generate_pipe(Stream,L)
.

generate_pipes(_, pipe([]) ).

generate_pipe(Stream,[L | RE]):-
	format(Stream, '.', []),
	generate_expresion(Stream,L),
	generate_pipe(Stream, RE)
.

generate_pipe(_, []).

generate_equal_exp(Stream, equal(L)):-
	format(Stream, ' = ', []),
	generate_state(Stream,L)
.

generate_equal_exp(_,[]).

generate_expresion(Stream, cut(L) ) :-
	format(Stream, 'cut(',[]),
	generate_state(Stream, L),
	format(Stream, ' )',[])
.

generate_expresion(Stream, iterate([E1 | E2])) :-
	format(Stream, 'iterate(',[]),
	generate_state(Stream, E1),
	format(Stream, ',',[]),
	generate_state(Stream, E2),
	format(Stream, ' )',[])
.

generate_expresion(Stream, map(E)) :-
	format(Stream, 'map(',[]),
	generate_state(Stream, E),
	format(Stream, ' )',[])
.

generate_expresion(Stream, filter(E)) :-
	format(Stream, 'filter(',[]),
	generate_state(Stream, E),
	format(Stream, ' )',[])
.

generate_expresion(Stream, es6(L) ) :-
	generate_es6(Stream, L)
.

generate_es6(Stream, boolean(L) ):-
	forall(member(Boo, L), generate_boolean(Stream, Boo))
.

generate_es6(Stream, boolean(L) ):-
	generate_boolean(Stream, L)
.

generate_es6(Stream, lambda([ L | RE ]) ):-
	generate_lambda(Stream, L),
	format(Stream, ' => ',[]),
	generate_state(Stream, RE)
.

generate_es6(Stream, condicional(LC )):-
	generate_condExpr(Stream, LC)
.

/*generate_condExpr(Stream, LC):-
   forall(member(Condi, LC), generet_cond_para(Stream, Condi))
.


generet_cond_para(Stream,[parenth(E)]):-
    format(Stream, ' ( ',[]),
	generate_state(Stream, E),
	format(Stream, ' ) ',[]),
	format(Stream, ' ? ',[])
.

generet_cond_para(Stream, E):-
	generate_state(Stream, E),
	format(Stream, ' : ',[])
.

generate_condi_dosPuntos(Stream, RE):-
	forall(member(Condi, RE), generate_Oper(Stream, Condi)),
	generate_state(Stream, Condi),
	format(Stream, ' : ',[])
.

generate_condExpr([E]):-  sin -> () <-  ???
	generate_state(Stream, E),
.*/

generate_lambda(Stream, id(List) ):-
	flatten_list(List, L),
    concatenar(L, ID),
    format(Stream, ' ~s ', [ID])
.


generate_boolean(Stream, [[literal(L) | RE]]):-
	generate_literal(Stream, L),
	forall(member(Ari, RE), generate_Oper(Stream, Ari))
.


generate_boolean(Stream, [ LS ]):-   %%resto
	%generate_simple(Stream, L),
	%forall(member(Ari, RE), generate_Oper(Stream, Ari))
	generate_list_simple(Stream, LS)
.

generate_boolean(Stream, [[simple(L) ]]):-   %%resto
	generate_simple(Stream, L)
.

/*generate_boolean(Stream, [[simple(L)] , RO | [AE] ]):- 
	generate_simple(Stream, L),
	generate_relat_opera(Stream, RO, AE)
.*/

generate_boolean(Stream, [[unary([ME | E]) ]]):- 
	generate_minus_excl(Stream, ME),
	generate_state(Stream, E)
.

generate_list_simple(Stream, LS ):-   %%resto
	forall(member(Ari, LS), generate_Oper(Stream, Ari))
.

generate_relat_opera(Stream, L , RE ):-
	generate_operator(Stream, L),
	generate_arith_exp(Stream, RE)
.


generate_Oper(Stream, [simple(L)]):-
	generate_simple(Stream, L)
.

generate_Oper(Stream, Ari):-
	generate_arith_exp(Stream, Ari)
.

generate_Oper(Stream, Ari):-
	generate_operator(Stream, Ari)
.

generate_operator(Stream, '=='):-
	format(Stream, ' == ', [])
.
generate_operator(Stream, '!='):-
	format(Stream, ' != ', [])
.
generate_operator(Stream, '<'):-
	format(Stream, ' < ', [])
.
generate_operator(Stream, '<='):-
	format(Stream, ' <= ', [])
.

generate_minus_excl(Stream, minus('-')):-
	format(Stream, ' - ', [])
.

generate_minus_excl(Stream, excl('!')):-
	format(Stream, ' ! ', [])
.

generate_arith_exp(Stream, '+'):-
	format(Stream, ' + ', [])
.
generate_arith_exp(Stream, '*'):-
	format(Stream, ' * ', [])
.
generate_arith_exp(Stream, '%'):-
	format(Stream, ' % ', [])
.
generate_arith_exp(Stream, '/'):-
	format(Stream, ' / ', [])
.
generate_arith_exp(Stream, '-'):-
	format(Stream, ' - ', [])
.


generate_arith_exp(Stream, literal(L)):-
	generate_literal(Stream, L)
.

generate_arith_exp(Stream, [literal(L)]):-
	generate_literal(Stream, L)
.

generate_arith_exp(Stream, simple(L)):-
	generate_simple(Stream, L)
.


/*generate_arith_exp(Stream, Ari):-
	format(Stream, '(', []),
	generate_state(Stream, Ari),
	format(Stream, ')', [])
.*/

generate_simple(Stream, [[L| RE] | RE2]):- %%aqui
	generate_accs_expre(Stream, L),
	generate_accs_point(Stream, RE),
	generate_parent_args(Stream, RE2)
.

generate_simple(Stream, [[L| RE]]):- %%aqui
	generate_accs_expre(Stream, L),
	generate_accs_point(Stream, RE)
.

generate_simple(Stream, [[L] | RE]):-
	generate_accs_expre(Stream, L),
	generate_parent_args(Stream, RE)
.

/*generate_simple(Stream, [[L]]):-
	generate_accs_expre(Stream, L),
.*/

generate_parent_args(Stream, parentArgs([R])):-
	format(Stream, '(', []),
	generate_state(Stream,R),
	format(Stream, ')', [])
.


generate_accs_point(Stream,point([A | P])):-
	format(Stream, '.', []),
	generate_accs_expre(Stream,A),
	generate_accs_point(Stream,P)
.

generate_accs_point(_,[]).

generate_accs_expre(Stream, id(List)):-  %%resto
	flatten_list(List, L),
    concatenar(L, ID),
    format(Stream, '~s', [ID])
.


generate_literal(Stream, number(ListNumber) ):-
    flatten_list(ListNumber, N),
    concatenar(N, Num),
    format(Stream, ' ~s ', [Num])
.

generate_literal(Stream, string(ListString) ):-
    flatten_list(ListString, S),
    concatenar(S, Str),
    format(Stream, '\'~s\' ', [Str])
.


generate_comment(Stream, Comment):-
	format(Stream, '//~s~n ',[Comment])
.
