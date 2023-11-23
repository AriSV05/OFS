:-[gramatica].
:- [generador].
:- use_module(library(readutil)).


test_parser(Filename):-
	read_file_to_codes(Filename, Codes, []),
	ofs_program(AST,Codes,[]), !,
	atomic_list_concat([Filename, js], '.', JSFilename),
	generator(JSFilename, AST).
/*generator( Filename, AST) :- 
	open(Filename, write, Stream),
	format(Stream, '~n ~q ~n' , [AST]),
	close(Stream)
.*/