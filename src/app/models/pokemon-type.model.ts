// Tipos reales de Pokémon (dominio)
export type PokemonType =
  | 'normal'
  | 'fire'
  | 'water'
  | 'grass'
  | 'electric'
  | 'ice'
  | 'fighting'
  | 'poison'
  | 'ground'
  | 'flying'
  | 'psychic'
  | 'bug'
  | 'rock'
  | 'ghost'
  | 'dragon'
  | 'dark'
  | 'steel'
  | 'fairy'
  | 'stellar'
  | 'unknown';

// Configuración visual por tipo
export interface PokemonTypeConfig {
  label: string;
  color: string;
  icon: string; // ruta svg
}

// Modelo SOLO para el filtro (UI)
export interface PokemonTypeFilter {
  key: PokemonType | 'all';
  color: string;
  icon: string;
}
