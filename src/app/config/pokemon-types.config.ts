import { PokemonType, PokemonTypeConfig } from '../models/pokemon-type.model';

export const POKEMON_TYPES_CONFIG: Record<PokemonType, PokemonTypeConfig> = {
  normal: {
    label: 'Normal',
    color: '#A8A878',
    icon: 'assets/types/normal.png',
  },
  fire: { label: 'Fire', color: '#F08030', icon: 'assets/types/fire.png' },
  water: { label: 'Water', color: '#6890F0', icon: 'assets/types/water.png' },
  grass: { label: 'Grass', color: '#78C850', icon: 'assets/types/grass.png' },
  electric: {
    label: 'Electric',
    color: '#F8D030',
    icon: 'assets/types/electric.png',
  },
  ice: { label: 'Ice', color: '#98D8D8', icon: 'assets/types/ice.png' },
  fighting: {
    label: 'Fighting',
    color: '#C03028',
    icon: 'assets/types/fighting.png',
  },
  poison: {
    label: 'Poison',
    color: '#A040A0',
    icon: 'assets/types/poison.png',
  },
  ground: {
    label: 'Ground',
    color: '#E0C068',
    icon: 'assets/types/ground.png',
  },
  flying: {
    label: 'Flying',
    color: '#A890F0',
    icon: 'assets/types/flying.png',
  },
  psychic: {
    label: 'Psychic',
    color: '#F85888',
    icon: 'assets/types/psychic.png',
  },
  bug: { label: 'Bug', color: '#A8B820', icon: 'assets/types/bug.png' },
  rock: { label: 'Rock', color: '#B8A038', icon: 'assets/types/rock.png' },
  ghost: { label: 'Ghost', color: '#705898', icon: 'assets/types/ghost.png' },
  dragon: {
    label: 'Dragon',
    color: '#7038F8',
    icon: 'assets/types/dragon.png',
  },
  dark: { label: 'Dark', color: '#705848', icon: 'assets/types/dark.png' },
  steel: { label: 'Steel', color: '#B8B8D0', icon: 'assets/types/steel.png' },
  fairy: { label: 'Fairy', color: '#EE99AC', icon: 'assets/types/fairy.png' },
  stellar: {
    label: 'Stellar',
    color: '#7dd3fc',
    icon: 'assets/types/stellar.png',
  },
  unknown: {
    label: 'Unknown',
    color: '#9ca3af',
    icon: 'assets/types/unknown.png',
  },
};
