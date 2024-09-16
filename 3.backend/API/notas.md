# Puntos a recordar:
- La idea de trabajar por capas es para trabajar por partes, por un lado testeamos los controller y por otro los repositorios, ya que cada uno tiene su funcion y su finalidad.
- Recordamos que los middleware reciven req (request), res (response) y next.

## METODOS DE REPOSITORIO: 
// notes.mongo.repo.js
No crea la respuesta de la API, ni modifica, solo se encargan de contactar con la base de datos, leer/obtener unos datos y devolverlos.

- .find() hace un query como de " SELCET * FROM NoteModel, si se le pasa un criterio de busqueda, devolverá solo lo especificado.
- .exec() ejecuta la consulta y devuelve una promesa. En este caso, la función getAll espera (await) a que esta promesa se resuelva antes de continuar.

## METODOS CONTROLLER (MIDDLEWARE) 
// notes.controller.js
Manejadores/controladores, la finalidad principal de este controlador es manejar las solicitudes HTTP relacionadas con las "notas", interactuando con la capa de datos (el repositorio) y gestionando la respuesta al cliente.




