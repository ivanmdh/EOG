// Archivo de inicialización para agentes y scripts automáticos
// Última actualización: 22/04/2025

/*
Resumen de estructura y convenciones del proyecto EOG
-----------------------------------------------------

- El backend (Laravel) está en: eogBE/
    - Comandos artisan y migraciones deben ejecutarse dentro de este directorio.
    - Factories y seeders están en: eogBE/database/factories y eogBE/database/seeders
    - Modelos en: eogBE/app/Models
    - Migraciones en: eogBE/database/migrations
    - El archivo artisan está en la raíz de eogBE
    - Para ejecutar migraciones y seeders: php artisan migrate:refresh --seed (desde eogBE)

- El frontend (Next.js) está en: eogFE/
    - Código fuente en: eogFE/src
    - Configuración y entrypoints en: eogFE/app

- Consideraciones para factories y seeders:
    - Los modelos deben usar el trait HasFactory para que funcionen los factories.
    - Si se usa faker para campos de texto, respetar la longitud máxima definida en la migración (ejemplo: tinyText = 255 caracteres).
    - Si hay errores de longitud, limitar el texto en el factory.

- Ejemplo de error común y solución:
    - Error: Data too long for column 'observaciones'...
    - Solución: Limitar el texto generado por faker a 255 caracteres en el factory.

- Rutas importantes:
    - eogBE/artisan
    - eogBE/app/Models
    - eogBE/database/factories
    - eogBE/database/migrations
    - eogFE/src

- Para scripts automáticos o agentes:
    - No intentes hacer cd eogBE si ya estás dentro de ese directorio.
    - Usa rutas relativas desde la raíz del workspace.
    - Si necesitas ejecutar comandos artisan, asegúrate de estar en eogBE o usar la ruta correcta.
    - Si necesitas modificar un factory, revisa primero la longitud de los campos en la migración correspondiente.

*/

/*
NOTA PARA AGENTES Y DESARROLLADORES:
------------------------------------
Al finalizar cada sesión de trabajo o edición automatizada, integra en este archivo (AGENTE_INIT.md) un resumen de los cambios, decisiones y rutas relevantes que puedan servir para alimentar el contexto de futuras automatizaciones o agentes.

Esto ayuda a evitar búsquedas innecesarias y mantiene el conocimiento actualizado sobre la estructura, convenciones y problemas resueltos en el proyecto.
*/
