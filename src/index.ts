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
// Función para mostrar la siguiente broma
async function showNextDadJoke() {
    try {
        const joke = await getDadJoke();
        showDadJokeInDOM(joke); // Mostrar la broma en el DOM
    } catch (error) {
        console.error("Failed to show next joke!", error);
    }
}

async function showDadJokeInDOM(joke?: Joke) {
    try {
        const jokeElement = document.getElementById('joke');
        if (jokeElement && joke && joke.joke) { // Verificar si hay un elemento de broma y si el chiste no es undefined
            jokeElement.textContent = joke.joke;
        }
        } catch (error) {
            console.error("Failed to get and show dad joke:", error);
        }
    }


// Llamada a la función para mostrar la broma en el DOM
showDadJokeInDOM();

try {
    showNextDadJoke();
} catch (error) {
    console.error("Failed to show initial joke:", error);
}



