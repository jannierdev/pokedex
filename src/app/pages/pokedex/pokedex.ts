import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pokemon } from '../../models/pokemon.model';
import { Card } from '../../components/card/card';
import { Loading } from '../../components/loading/loading';
import { PokemonService } from '../../services/pokemon';
import { ErrorState } from '../../components/error-state/error-state';

@Component({
  selector: 'app-pokedex',
  imports: [CommonModule, Card, Loading, ErrorState],
  templateUrl: './pokedex.html',
  styleUrl: './pokedex.scss',
})
export class Pokedex {
  pokemons: Pokemon[] = [];
  loading = true;
  hasError = false;

  constructor(private _pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.loadPokemons();
  }

  loadPokemons(): void {
    this.loading = true;
    this.hasError = false;

    this._pokemonService.getPokemons().subscribe({
      next: (data) => {
        console.log(data);
        
        this.pokemons = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.hasError = true;
      },
    });
  }
}
