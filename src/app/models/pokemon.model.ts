export interface Pokemon {
  name: string;
  image: string;
  color: string;
  description: string;
  types: PokemonTypeInfo[];
  abilities: Abilities[];
  stats: Stat[];
  resistances: TypeRelation[];
  weaknesses: TypeRelation[];
}

export interface Abilities {
  name: string;
  color: string;
}

export interface Stat {
  name: string;
  baseStat: number;
  effort: number;
}

export interface PokemonTypeInfo {
  name: string;
  color: string;
}

export interface TypeRelation {
  name: string;
  color: string;
}