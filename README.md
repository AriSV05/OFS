## Integrantes:
Ariana Solano Vallejos | Nicole Araya Ballestero
##
OFS Paradigmas de Programacion - 2023
UNA

# Descarga

Se descarga la aplicación del correo del profesor en formato zip

## Instalación

Una vez descargado el zip se descomprime

Abrimos el cmd(símbolo de sistema) en donde se hizo la debida descompresión del proyecto

Entramos en la carpeta del proyecto con el comando

```
cd EIF400_II_2023_OFS
```

Seguidamente se deben instalar todas las dependencias que necesita la aplicación para funcionar con :

```
npm install 
```
## Ejecución

Para ejecutar el servidor 'Node.js server'. Next.js utiliza Node.js como su entorno de ejecución para renderizar páginas y servir contenido en el lado del cliente. Se correra en modo build.
```
npm run build
npm start
```

Para ejecutar el sevidor de prolog, quien se encargara de transpilar los archivos generados en el cliente, se corre de la siguiente manera.
```
cd prolog
swipl http_server.pl
```
