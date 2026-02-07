import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map, Observable, switchMap } from 'rxjs';
import { Pokemon } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';

  COLOR_MAP: Record<string, string> = {
    red: '#f87171',
    blue: '#60a5fa',
    green: '#4ade80',
    yellow: '#facc15',
    purple: '#c084fc',
    brown: '#a16207',
    gray: '#9ca3af',
    black: '#374151',
    white: '#f9fafb',
    pink: '#f9a8d4',
  };

  TYPE_COLORS: Record<string, string> = {
    fire: '#F08030',
    water: '#6890F0',
    grass: '#78C850',
    electric: '#F8D030',
    ice: '#98D8D8',
    fighting: '#C03028',
    poison: '#A040A0',
    ground: '#E0C068',
    flying: '#A890F0',
    psychic: '#F85888',
    bug: '#A8B820',
    rock: '#B8A038',
    ghost: '#705898',
    dragon: '#7038F8',
    dark: '#705848',
    steel: '#B8B8D0',
    fairy: '#EE99AC',
    normal: '#A8A878',
  };

  constructor(private http: HttpClient) {}

  getPokemons(limit = 20, offset = 0): Observable<Pokemon[]> {
    return this.http
      .get<any>(`${this.apiUrl}?limit=${limit}&offset=${offset}`)
      .pipe(
        switchMap((res) =>
          forkJoin<Pokemon[]>(
            res.results.map((p: any) =>
              this.http.get<any>(p.url).pipe(
                switchMap((detail) =>
                  this.http.get<any>(detail.species.url).pipe(
                    map((species) => {
                      const baseColor =
                        this.COLOR_MAP[species.color.name] ?? '#e5e7eb';

                      return {
                        name: detail.name,
                        image: detail.sprites.other.dream_world.front_default,
                        color: baseColor,
                        abilities: detail.abilities.map((a: any) => ({
                          name: a.ability.name,
                          color: baseColor,
                        })),
                      } as Pokemon;
                    }),
                  ),
                ),
              ),
            ),
          ),
        ),
      );
  }
}
