concatenar([], '').
concatenar([H|T], Resultado) :-
    concatenar(T, Resto),
    atom_concat(H, Resto, Resultado).

aplanar_lista([], []).
aplanar_lista([H| T], Aplanada) :-
    aplanar_lista(H, HPlana),
    aplanar_lista(T, TPlana),
    append(HPlana, TPlana, Aplanada).
aplanar_lista([H| T], [H|TPlana]) :-
    aplanar_lista(T, TPlana).

flatten_list(List, FlatList) :-
    flatten(List, FlatList).