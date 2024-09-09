concatenar([], '').
concatenar([H|T], Resultado) :-
    concatenar(T, Resto),
    atom_concat(H, Resto, Resultado).

flatten_list(List, FlatList) :-
    flatten(List, FlatList).