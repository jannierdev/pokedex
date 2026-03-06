import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map, Observable, switchMap } from 'rxjs';
import { Pokemon } from '../models/pokemon.model';
import { PokemonType } from '../models/pokemon-type.model';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2/';

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
      .get<any>(`${this.apiUrl}pokemon?limit=${limit}&offset=${offset}`)
      .pipe(
        switchMap((res) =>
          forkJoin<Pokemon[]>(
            res.results.map((p: any) =>
              this.http.get<any>(p.url).pipe(
                switchMap((detail) =>
                  this.http.get<any>(detail.species.url).pipe(
                    switchMap((species) =>
                      forkJoin(
                        this.getTypeDetails(detail.types),
                      ).pipe(
                        map(([typeDetails]) => {
                          const baseColor =
                            this.COLOR_MAP[species.color.name] ?? '#e5e7eb';
                          const description = species.flavor_text_entries
                            ?.find((entry: any) => entry.language.name === 'en')
                            ?.flavor_text?.replace(/\n/g, ' ') || 'No description available';

                          return {
                            name: detail.name,
                            image: detail.sprites.other.dream_world.front_default,
                            color: baseColor,
                            description: description,
                            types: detail.types.map((t: any) => ({
                              name: t.type.name,
                              color: this.TYPE_COLORS[t.type.name] || '#999',
                            })),
                            abilities: detail.abilities.map((a: any) => ({
                              name: a.ability.name,
                              color: baseColor,
                            })),
                            stats: detail.stats.map((s: any) => ({
                              name: s.stat.name,
                              baseStat: s.base_stat,
                              effort: s.effort,
                            })),
                            resistances: typeDetails.resistances,
                            weaknesses: typeDetails.weaknesses,
                          } as Pokemon;
                        }),
                      ),
                    ),
                  ),
                ),
              ),
            ),
          ),
        ),
      );
  }

  private getTypeDetails(types: any[]) {
    const typeUrls = types.map((t) => t.type.url);
    return forkJoin(
      typeUrls.map((url) =>
        this.http.get<any>(url).pipe(
          map((type) => ({
            resistances: type.damage_relations.half_damage_to.map(
              (t: any) => ({
                name: t.name,
                color: this.TYPE_COLORS[t.name] || '#999',
              }),
            ),
            weaknesses: type.damage_relations.double_damage_from.map(
              (t: any) => ({
                name: t.name,
                color: this.TYPE_COLORS[t.name] || '#999',
              }),
            ),
          })),
        ),
      ),
    ).pipe(
      map((details) => {
        // Combinar resistencias y debilidades de todos los tipos
        const resistances = [
          ...new Map(
            details
              .flatMap((d) => d.resistances)
              .map((r) => [r.name, r]),
          ).values(),
        ];
        const weaknesses = [
          ...new Map(
            details
              .flatMap((d) => d.weaknesses)
              .map((w) => [w.name, w]),
          ).values(),
        ];
        return {
          resistances: resistances.slice(0, 4),
          weaknesses: weaknesses.slice(0, 4),
        };
      }),
    );
  }

  getTypes(): Observable<PokemonType[]> {
    return this.http.get<any>(`${this.apiUrl}/type`).pipe(
      map((res) =>
        res.results.map((t: any) => t.name as PokemonType),
      ),
    );
  }
}
