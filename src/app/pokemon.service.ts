import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

import { Pokemon } from "./pokemon.model";

@Injectable()
export class PokemonService {
    private readonly apiUrl = 'https://pokeapi.co/api/v2/pokemon';
    private limit = 12;

    constructor(private http: HttpClient) { }

    getPokemonList(offset = 0): Promise<any> {
        return this.http.get<any>(`${this.apiUrl}?limit=${this.limit}&offset=${offset}`).toPromise();
    }

    getPokemon(name: string): Promise<Pokemon>{
        return this.http.get<Pokemon>(`${this.apiUrl}/${name}`).toPromise();
    }
}