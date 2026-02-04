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

  constructor(private http: HttpClient) {}

  getPokemons(limit = 50, offset = 0): Observable<Pokemon[]> {
    return this.http
      .get<any>(`${this.apiUrl}?limit=${limit}&offset=${offset}`)
      .pipe(
        switchMap((res) =>
          forkJoin<Pokemon[]>(
            res.results.map((p: any) =>
              this.http.get<any>(p.url).pipe(
                switchMap((detail) =>
                  this.http.get<any>(detail.species.url).pipe(
                    map((species) => ({
                      name: detail.name,
                      image: detail.sprites.other.dream_world.front_default,
                      color: this.COLOR_MAP[species.color.name] ?? '#e5e7eb',
                    })),
                  ),
                ),
              ),
            ),
          ),
        ),
      );
  }
}
