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
// Función para mostrar la siguiente broma
function showNextDadJoke() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const joke = yield getDadJoke();
            showDadJokeInDOM(joke); // Mostrar la broma en el DOM
        }
        catch (error) {
            console.error("Failed to show next joke!", error);
        }
    });
}
function showDadJokeInDOM(joke) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const jokeElement = document.getElementById('joke');
            if (jokeElement && joke && joke.joke) { // Verificar si hay un elemento de broma y si el chiste no es undefined
                jokeElement.textContent = joke.joke;
            }
        }
        catch (error) {
            console.error("Failed to get and show dad joke:", error);
        }
    });
}
// Llamada a la función para mostrar la broma en el DOM
//showDadJokeInDOM();
try {
    showNextDadJoke();
}
catch (error) {
    console.error("Failed to show initial joke:", error);
}
// Array para almacenar los datos de los chistes valorados
let reportJokes = [];
// Función para manejar la votación de un chiste
function voteJoke(score) {
    try {
        // Obtener el chiste actual del DOM
        const jokeElement = document.getElementById('joke');
        if (jokeElement) {
            const jokeText = jokeElement.textContent || '';
            const date = new Date().toISOString(); // Obtener la fecha en formato ISO
            const reportData = { joke: jokeText, score: score, date: date }; // Crear el objeto de reporte
            reportJokes.push(reportData); // Agregar el objeto al array reportAcudits
            console.log('Joke valorado:', reportData); // Mostrar el reporte en la consola
            console.log('Contenido del array reportJokes:', reportJokes); // Mostrar el contenido del array en la consola
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
// Asignar funciones a los eventos de clic en los botones de puntuación
/*const scoreButton1 = document.getElementById('score-button-1');
const scoreButton2 = document.getElementById('score-button-2');
const scoreButton3 = document.getElementById('score-button-3');

if (scoreButton1) {
    scoreButton1.onclick = () => handleScoreButtonClick(1);
}
if (scoreButton2) {
    scoreButton2.onclick = () => handleScoreButtonClick(2);
}
if (scoreButton3) {
    scoreButton3.onclick = () => handleScoreButtonClick(3);
}*/
function assignScoreButtonEvents() {
    for (let i = 1; i <= 3; i++) {
        const scoreButton = document.getElementById(`score-button-${i}`);
        if (scoreButton) {
            scoreButton.onclick = () => handleScoreButtonClick(i);
        }
    }
}
/*function assignScoreButtonEvents() {
    // Iterar sobre cada número del 1 al 3
    for (let i = 1; i <= 3; i++) {
        // Obtener el botón de puntuación por su ID
        const scoreButton = document.getElementById(`score-button-${i}`);
        // Verificar si el botón existe
        if (scoreButton) {
            // Asignar el evento onclick al botón
            scoreButton.onclick = () => {
                // Obtener la puntuación del botón mediante el atributo de datos
                const score = parseInt(scoreButton.dataset.score || "0");
                voteJoke(score);
            };
        }
    }
}*/
/* Función para mostrar un chiste en el DOM
async function showDadJokeInDOM(joke?: string): Promise<void> {
    try {
        const jokeElement = document.getElementById('joke');
        if (jokeElement && joke) { // Verificar si hay un elemento de chiste y si el chiste no es undefined
            jokeElement.textContent = joke;
        }
    } catch (error) {
        console.error("Failed to get and show dad joke:", error);
    }
}*/
// Obtener un nuevo chiste y mostrarlo en el DOM al cargar la página
function getAndShowDadJoke() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch('https://icanhazdadjoke.com/', {
                headers: {
                    'Accept': 'application/json'
                }
            });
            const data = yield response.json();
            if (data && data.joke) {
                showDadJokeInDOM(data.joke);
            }
            else {
                throw new Error('Failed to fetch joke or joke is empty.');
            }
        }
        catch (error) {
            console.error("Failed to fetch dad joke:", error);
        }
    });
}
// Llamar a la función para obtener y mostrar un chiste al cargar la página
getAndShowDadJoke();
