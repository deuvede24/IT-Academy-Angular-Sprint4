# IT-Academy-Angular-Sprint4

## SPRINT 4

### Descripción del Proyecto

Este proyecto es una aplicación web diseñada para una empresa de coaching que está llevando a cabo un experimento sobre el impacto del humor en la productividad de las empresas en Barcelona. La aplicación muestra chistes a los trabajadores antes de comenzar su jornada laboral.

En resumen, nuestra app muestra chistes aleatorios a los usuarios y les permite votar por ellos (a min puntaicón, 3 máxima). Además muestra datos meteorológicos de la ciduad de Barcelona. La app también permite cambiar el fondo de la página de manera aleatoria conforme al dar click a un botón se muestra el chiste.

### Funciones empleadas en el proyecto

- `getDadJoke()`: Esta función realiza una solicitud a la API 'icanhazdadjoke.com' para obtener un chiste aleatorio. Si la solicitud es exitosa, devuelve el chiste en formato JSON.
- `getChuckNorrisJoke()`: Similar a la función anterior, esta función obtiene un chiste aleatorio de la API 'api.chucknorris.io'. Transforma los datos obtenidos en el formato esperado y los devuelve.
- `fetchJoke()`: Esta función utiliza un número aleatorio, con la ayuda de Math.random(), para decidir si obtener un chiste de la API de chistes "Dad Jokes" o de "Chuck Norris" y devuelve el chiste obtenido.
- `changeBackground()`: Esta función cambia el fondo de la página web seleccionando aleatoriamente una imagen de fondo, blobs, de un conjunto de imágenes disponibles.
- `showNextJoke()`: Esta función muestra el siguiente chiste en la interfaz de usuario, al darle click al botón next joke, llamando a su  vez a la función fetchJoke() y actualiza el DOM con el chiste obtenido.
- `voteJoke(score: number)`: Registra la puntuación dada a un chiste, en un array previamente definido llamado reportJokes, junto con el chiste y la fecha en que se registró la puntuación.
- `handleScoreButtonClick(score: number)`: Función que maneja el evento de click aparte en los botones de puntuación. Llama a voteJoke(score) con la puntuación correspondiente.
- `assignScoreButtonEvents()`: Esta función asegura que cada botón de puntuación se comporte adecuadamente al hacer click para registrar las puntuaciones de los chistes y que el botón "next joke" también funcione correctaemtne cuando se hace click en él.
- `fetchWeather()`: Obtiene datos meteorológicos de la ciudad de Barcelona utilizando la API de OpenWeatherMap y los muestra en la interfaz de usuario, la temperatura y el icon.
- `showJokeInDOM(joke?: Joke)`: Muestra un chiste en el DOM. Recibe un objeto de tipo Joke y actualiza el elemento HTML correspondiente con el chiste.
- `document.addEventListener("DOMContentLoaded", function(event) {...})`: Esta función se encarga de realizar varias tareas al cargar completamente el DOM, como mostrar el primer joke, cambiar el fondo, asignar eventos a los botones de puntuación y obtener información sobre el clima a mostrar. En resumen, esta función asegura que todo esté listo y funcione correctamente cuando el usuario accede a la página.

### Tecnologías del proyecto

- TypeScript
- HTML, CSS
- Bootstrap

### Instalación

1. Clona el repositorio:
git clone https://github.com/deuvede24/IT-Academy-Angular-Sprint4.git

2. Ingresa al directorio del proyecto:
cd IT-Academy-Angular-Sprint4

3. Instala las dependencias:
npm install

4. Compila el código TypeScript con el siguiente comando:
npx tsc


### Uso

Para visualizar el proyecto, ejecuta el archivo `index.html` con Live Server o ábrelo en el navegador.


