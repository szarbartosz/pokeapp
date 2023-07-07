import {useEffect, useRef, useState} from 'react';
import {Pokemon} from '../App';
import {
  POKEMON_FETCH_LIMIT,
  fetchMorePokemons,
  fetchPokemons,
} from '../services/pokemonService';

export const useFetchPokemons = () => {
  const limit = useRef(POKEMON_FETCH_LIMIT);
  const [offset, setOffset] = useState(0);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  const loadMore = () => {
    fetchMorePokemons(
      pokemons,
      limit.current,
      offset + limit.current,
      setPokemons,
      setOffset,
    );
  };

  useEffect(() => {
    fetchPokemons(limit.current, setPokemons);
  }, []);

  return {pokemons, loadMore};
};
