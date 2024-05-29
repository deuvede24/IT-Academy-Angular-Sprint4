"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//Ex.1&2
const API_URL = 'https://icanhazdadjoke.com/';
function getDadJoke() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const respuesta = yield fetch(API_URL, {
                headers: {
                    'Accept': 'application/json'
                }
            });
            console.log(respuesta);
            if (!respuesta.ok) {
                throw new Error(`Error fetching joke: ${respuesta.statusText}`);
            }
            const data = yield respuesta.json();
            return data;
        }
        catch (error) {
            console.error("There are no jokes to show!", error);
            throw error;
        }
    });
}
//Ex5
function getChuckNorrisJoke() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch('https://api.chucknorris.io/jokes/random');
            if (!response.ok) {
                throw new Error(`Error fetching Chuck Norris joke: ${response.statusText}`);
            }
            const data = yield response.json();
            console.log("Response from Chuck Norris API:", data); // Mostrar los datos de la respuesta en la consola
            const jokeData = {
                id: data.id,
                joke: data.value,
                status: 200 // La API de Chuck Norris no proporciona un código de estado, por lo que establecemos uno arbitrario
            };
            return jokeData;
        }
        catch (error) {
            console.error('There are no Chuck Norris jokes to show!', error);
            throw error;
        }
    });
}
function fetchJoke() {
    return __awaiter(this, void 0, void 0, function* () {
        const randomNumber = Math.random();
        if (randomNumber < 0.5) { // 50% de probabilidad para cada API
            return getDadJoke();
        }
        else {
            return getChuckNorrisJoke();
        }
    });
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
        changeBackground.style.backgroundImage = `url('/images/${selectedShape}')`;
    }
}
//changeBackground();
function showNextJoke() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const joke = yield fetchJoke();
            showJokeInDOM(joke);
            changeBackground();
        }
        catch (error) {
            console.error("Failed to show next joke!", error);
        }
    });
}
function showJokeInDOM(joke) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const jokeElement = document.getElementById('joke');
            if (jokeElement && joke && joke.joke) { // Verificar si hay un elemento de joke y que no sea undefined
                jokeElement.textContent = joke.joke;
            }
        }
        catch (error) {
            console.error("Failed to get and show dad joke:", error);
        }
    });
}
//EX3.
// Array para almacenar los datos de los chistes valorados
let reportJokes = [];
//Función que vota los chistes
function voteJoke(score) {
    try {
        const jokeElement = document.getElementById('joke'); //obtener el joke
        if (jokeElement) {
            const jokeText = jokeElement.textContent || '';
            const currentJokeIndex = reportJokes.findIndex(report => report.joke === jokeText);
            const joke = currentJokeIndex !== -1 ? reportJokes[currentJokeIndex] : null; //verificar si el chiste actual ya existe en el array reportJokes
            if (joke) {
                joke.score = score; //asigno el valor de score
                console.log('Joke valorado:', joke);
                console.log('Contenido del array reportJokes:', reportJokes);
            }
            else {
                const date = new Date().toISOString();
                const reportData = { joke: jokeText, score: score, date: date };
                reportJokes.push(reportData); //hago push al array 
                console.log('Joke valorado:', reportData);
                console.log('Contenido del array reportJokes:', reportJokes);
            }
        }
        else {
            throw new Error('No se encontró el elemento del joke en el DOM.');
        }
    }
    catch (error) {
        console.error('Error al valorar el joke:', error);
    }
}
//Función para manejar el clic en un botón de puntuación
function handleScoreButtonClick(score) {
    voteJoke(score); // Votar el chiste con la puntuación proporcionada
}
// Función para asignar eventos a los botones de puntuación
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
function fetchWeather() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const weatherData = yield response.json();
            const temperature = weatherData.main.temp;
            const iconCode = weatherData.weather[0].icon;
            const weatherText = document.getElementById('weather-text');
            const weatherIcon = document.getElementById('weather-icon');
            ;
            if (weatherText && weatherIcon) {
                weatherText.innerText = `${temperature}°C`;
                weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
                weatherIcon.style.display = 'block';
            }
            else {
                throw new Error('Weather elements not found');
            }
        }
        catch (error) {
            const weatherText = document.getElementById('weather-text');
            if (weatherText) {
                weatherText.innerText = 'Error al cargar la información meteorológica';
            }
            console.error('Error fetching weather:', error);
        }
    });
}
//fetchWeather();
document.addEventListener("DOMContentLoaded", function (event) {
    // Este código se ejecutará cuando el DOM esté completamente cargado
    try {
        showNextJoke();
        changeBackground();
    }
    catch (error) {
        console.error("Failed to show initial joke:", error);
    }
    const weatherIcon = document.getElementById('weather-icon');
    if (weatherIcon) {
        console.log('El elemento weather-icon se encontró en el DOM.');
    }
    else {
        console.error('El elemento weather-icon no se encontró en el DOM.');
    }
    assignScoreButtonEvents();
    fetchWeather();
    //changeBackground();
});
