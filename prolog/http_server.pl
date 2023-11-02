:- use_module(library(http/thread_httpd)).
:- use_module(library(http/http_dispatch)).
:- use_module(library(http/json)).
:- use_module(library(http/http_json)).
:- use_module(library(http/http_log)).

:- use_module(library(http/http_cors)).

:- use_module(library(http/html_write)).



:- http_handler('/transpilador', handle_transpilador, [method(post)]).
:- http_handler('/', home, []).



handle_transpilador(Request) :-
    http_read_json_dict(Request, Query),
    solve(Query, Solution),
    reply_json_dict(Solution).


% Predicado para buscar un script por ID en un archivo JSON
solve(_{id: Id}, Response) :-
    read_json_file('scripts.json', JSON),
    (member(Element, JSON), Element.id = Id -> Response = Element.script; Response = 'Error: script not found').



% Predicado para leer un archivo JSON y convertirlo en una lista de términos
read_json_file(File, JSON) :-
    open(File, read, Stream),
    json_read_dict(Stream, JSON),
    close(Stream).


server(Port) :-
    http_server(http_dispatch, [port(Port)]).

set_setting(http:logfile, 'service_log_file.log').



home(_Request) :-
        reply_html_page(title(' Service Prolog'),
                        [ h1('hii')]).


:- initialization
    format('*** Starting Server ***~n', []),
    (current_prolog_flag(argv, [SPort | _]) -> true ; SPort='8000'),
    atom_number(SPort, Port),
    format('*** Serving on port ~d *** ~n', [Port]),
    set_setting_default(http:cors, [*]), % Allows cors for every
    server(Port).