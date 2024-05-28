interface Joke {
    id: string;
    joke: string;
    status: number;
}

interface JokeReport {
    joke: string;
    score: number;
    date: string;
}

//Ex.1&2
const API_URL = 'https://icanhazdadjoke.com/';
async function getDadJoke(): Promise<Joke> {
    try {
        const respuesta = await fetch(API_URL, {
            headers: {
                'Accept': 'application/json'
            }
        }); console.log(respuesta)
        if (!respuesta.ok) {
            throw new Error(`Error fetching joke: ${respuesta.statusText}`);
        }
        const data: Joke = await respuesta.json();
        return data;

    } catch (error) {
        console.error("There are no jokes to show!", error);
        throw error;

    }

}
//Ex5
async function getChuckNorrisJoke(): Promise<Joke> {
    try {
        const response = await fetch('https://api.chucknorris.io/jokes/random');
        if (!response.ok) {
            throw new Error(`Error fetching Chuck Norris joke: ${response.statusText}`);
        }
        const data = await response.json();
        console.log("Response from Chuck Norris API:", data); // Mostrar los datos de la respuesta en la consola
        const jokeData: Joke = {
            id: data.id,
            joke: data.value,
            status: 200 // La API de Chuck Norris no proporciona un código de estado, por lo que establecemos uno arbitrario
        };
        return jokeData;
    } catch (error) {
        console.error('There are no Chuck Norris jokes to show!', error);
        throw error;
    }
}


async function fetchJoke(): Promise<Joke> {
    const randomNumber = Math.random();
    if (randomNumber < 0.5) { // 50% de probabilidad para cada API
        return getDadJoke();
    } else {
        return getChuckNorrisJoke();
    }
}

//Ex6.
const shapes = [
    "blob1.svg",
    "blob2.svg",
    "blob3.svg",
    "blob4.svg",
];
// Función para cambiar el fondo
function changeBackground() {
    // Obtener un índice aleatorio para seleccionar una imagen de fondo
    const randomIndex = Math.floor(Math.random() * shapes.length);
    // Obtener la ruta de la imagen de fondo seleccionada
    const selectedShape = shapes[randomIndex];
    // Cambiar el fondo del contenedor
    const changeBackground = document.getElementById('changeBg');
    if (changeBackground) {
        changeBackground.style.backgroundImage = `url('/images/${selectedShape}')`
    }
}
//changeBackground();

async function showNextJoke() {
    try {
        const joke = await fetchJoke();
        showJokeInDOM(joke);
        changeBackground();
    } catch (error) {
        console.error("Failed to show next joke!", error);
    }
}

async function showJokeInDOM(joke?: Joke) {
    try {
        const jokeElement = document.getElementById('joke');
        if (jokeElement && joke && joke.joke) { // Verificar si hay un elemento de joke y que no sea undefined
            jokeElement.textContent = joke.joke;
        }
    } catch (error) {
        console.error("Failed to get and show dad joke:", error);
    }
}

//EX3.
// Array para almacenar los datos de los chistes valorados
let reportJokes: JokeReport[] = [];

// Función para manejar la votación de un chiste
function voteJoke(score: number): void {
    try {
        // Obtener el chiste actual del DOM
        const jokeElement = document.getElementById('joke');
        if (jokeElement) {
            const jokeText = jokeElement.textContent || '';
            const date = new Date().toISOString(); // Obtener la fecha en formato ISO
            const reportData: JokeReport = { joke: jokeText, score: score, date: date }; // Crear el objeto de reporte
            reportJokes.push(reportData); // Agregar el objeto al array reportJokes
            console.log('Joke valorado:', reportData); // Mostrar el reporte en la consola
            console.log('Contenido del array reportJokes:', reportJokes); // Mostrar el contenido del array en la consola
        } else {
            throw new Error('No se encontró el elemento del joke en el DOM.');
        }
    } catch (error) {
        console.error('Error al valorar el joke:', error);
    }
}

//Función para manejar el clic en un botón de puntuación
function handleScoreButtonClick(score: number): void {
    voteJoke(score); // Votar el chiste con la puntuación proporcionada
}


function assignScoreButtonEvents() {
    for (let i = 1; i <= 3; i++) {
        const scoreButton = document.getElementById(`score-button-${i}`);
        if (scoreButton) {
            scoreButton.onclick = () => handleScoreButtonClick(i);
        }
    }
    const nextJokeButton = document.getElementById('next-joke-button');
    if (nextJokeButton) {
        nextJokeButton.onclick = showNextJoke;
    }
}

//Ex4.
//Weater info
const API_KEY = 'c993b94e24ffc37cf8882f0070c4b1e6';
const CITY = "Barcelona";

async function fetchWeather(): Promise<void> {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const weatherData = await response.json();
        const temperature = weatherData.main.temp;
        const iconCode = weatherData.weather[0].icon;

        const weatherText = document.getElementById('weather-text');
        const weatherIcon = document.getElementById('weather-icon') as HTMLImageElement | null;;

        if (weatherText && weatherIcon) {
            weatherText.innerText = `${temperature}°C`;
            weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
            weatherIcon.style.display = 'block';
        } else {
            throw new Error('Weather elements not found');
        }
    } catch (error) {
        const weatherText = document.getElementById('weather-text');
        if (weatherText) {
            weatherText.innerText = 'Error al cargar la información meteorológica';
        }
        console.error('Error fetching weather:', error);
    }
}

//fetchWeather();



document.addEventListener("DOMContentLoaded", function (event) {
    // Este código se ejecutará cuando el DOM esté completamente cargado
    try {
        showNextJoke();
        changeBackground();
    } catch (error) {
        console.error("Failed to show initial joke:", error);
    }

    const weatherIcon = document.getElementById('weather-icon');
    if (weatherIcon) {
        console.log('El elemento weather-icon se encontró en el DOM.');
    } else {
        console.error('El elemento weather-icon no se encontró en el DOM.');
    }

    assignScoreButtonEvents();
    fetchWeather();
    //changeBackground();
});









