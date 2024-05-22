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
showDadJokeInDOM();
try {
    showNextDadJoke();
}
catch (error) {
    console.error("Failed to show initial joke:", error);
}
