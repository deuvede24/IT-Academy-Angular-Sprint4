interface Joke {
    id: string;
    joke: string;
}
const API_URL = 'https://icanhazdadjoke.com/';
async function obtenerAcudit(): Promise<string> {
    const respuesta = await fetch(API_URL, {
      headers: {
        'Accept': 'application/json'
      }
    });
    const datos = await respuesta.json();
    return datos.joke;
  }