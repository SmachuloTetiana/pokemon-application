import { Component, OnInit } from '@angular/core';

import { Pokemon } from '../pokemon.model';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {

  pokemons: Pokemon[];
  pokemon: Pokemon;
  offset: number;

  constructor(private pokemonService: PokemonService) { }

  async ngOnInit() {
    const data = await this.pokemonService.getPokemonList();

    this.pokemons = data.results;
    this.offset = this.getOffset(data.next);
  }


  getPokemonId(url: string): string {
    const parsedUrl = url.replace(/\/\s*$/,'').split('/');

    return parsedUrl[parsedUrl.length-1];
  }

  async loadMore() {
    try {
      const data = await this.pokemonService.getPokemonList(this.offset);
  
      this.pokemons = [...this.pokemons, ...data.results];
      this.offset = this.getOffset(data.next);

    } catch (e) {
      this.errorLogger(e);
    }
  }

  private getOffset(url: string): number {
    return +(new URL(url)).searchParams.get('offset');
  }

  async loadDetails(name: string) {
    try {
      this.pokemon = await this.pokemonService.getPokemon(name);
      console.log(this.pokemon);
    } catch(e) {
      this.errorLogger(e);
    }
  }

  private errorLogger(e): void {
    console.error('Something went wrong:', e);
  }
}
