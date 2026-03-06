import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { POKEMON_TYPES_CONFIG } from '../../config/pokemon-types.config';
import {
  PokemonTypeFilter,
  PokemonType,
} from '../../models/pokemon-type.model';
import { PokemonService } from '../../services/pokemon';

@Component({
  selector: 'app-type-filter',
  imports: [CommonModule],
  templateUrl: './type-filter.html',
  styleUrl: './type-filter.scss',
})
export class TypeFilter {
  types: PokemonTypeFilter[] = [];

  @Output()
  typeSelected = new EventEmitter<PokemonType | null>();
  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.loadTypes();
  }

  loadTypes() {
    this.pokemonService.getTypes().subscribe((types: PokemonType[]) => {
      this.types = [
        {
          key: 'all',
          icon: 'assets/types/all.png',
          color: '#9ca3af',
        },
        ...types.map((t) => ({
          key: t,
          icon: POKEMON_TYPES_CONFIG[t].icon,
          color: POKEMON_TYPES_CONFIG[t].color,
        })),
      ];

      console.log(this.types);
    });
  }

  selectType(type: PokemonType | 'all') {
    this.typeSelected.emit(type === 'all' ? null : type);
  }
}
