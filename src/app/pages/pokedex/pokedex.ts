import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pokemon } from '../../models/pokemon.model';
import { Card } from '../../components/card/card';
import { Loading } from '../../components/loading/loading';
import { PokemonService } from '../../services/pokemon';
import { ErrorState } from '../../components/error-state/error-state';
import {
  PokemonTypeFilter,
  PokemonType,
} from '../../models/pokemon-type.model';
import { Modal } from '../../components/modal/modal';

@Component({
  selector: 'app-pokedex',
  imports: [CommonModule, Card, Loading, ErrorState, Modal],
  templateUrl: './pokedex.html',
  styleUrl: './pokedex.scss',
})
export class Pokedex {
  pokemons: Pokemon[] = [];
  types: PokemonTypeFilter[] = [];
  loading = true;
  hasError = false;

  selectedPokemon: Pokemon | null = null;

  constructor(private _pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.loadPokemons();
  }

  onTypeSelected(type: PokemonType | null) {
    console.log('Filtrar por:', type);
  }

  loadPokemons(): void {
    this.loading = true;
    this.hasError = false;

    this._pokemonService.getPokemons().subscribe({
      next: (data) => {
        this.pokemons = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.hasError = true;
      },
    });
  }

  openPokemon(pokemon: Pokemon) {
    this.selectedPokemon = pokemon;
  }

  closeModal() {
    this.selectedPokemon = null;
  }
}
