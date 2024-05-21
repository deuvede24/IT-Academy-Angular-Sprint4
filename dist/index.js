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
/*interface JokeReport {
    joke: string;
    score: number;
    date: string;
  }*/
const API_URL = 'https://icanhazdadjoke.com/';
function obtenerAcudit() {
    return __awaiter(this, void 0, void 0, function* () {
        const respuesta = yield fetch(API_URL, {
            headers: {
                'Accept': 'application/json'
            }
        });
        const datos = yield respuesta.json();
        return datos.joke;
    });
}
