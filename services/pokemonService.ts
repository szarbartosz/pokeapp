import axios from 'axios';
import {Pokemon} from '../App';
import {Dispatch, SetStateAction} from 'react';
import {Ability, EffectEntry} from '../components/PokemonDetails';

export const fetchPokemons = (
  limit: number,
  setPokemons: Dispatch<SetStateAction<Pokemon[]>>,
) => {
  axios
    .get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`)
    .then(response => {
      response.data.results.map((pokemon: Pokemon) => {
        axios
          .get(pokemon.url)
          .then(response => {
            pokemon.photoUrl = response.data.sprites.front_default;
          })
          .catch(error => {
            console.log(error);
          });
      });

      setPokemons(response.data.results);
    })
    .catch(error => {
      console.log(error);
    });
};

export const fetchMorePokemons = (
  previousPokemons: Pokemon[],
  limit: number,
  offset: number,
  setPokemons: Dispatch<SetStateAction<Pokemon[]>>,
  setOffset: Dispatch<SetStateAction<number>>,
) => {
  axios
    .get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
    .then(response => {
      response.data.results.map((pokemon: Pokemon) => {
        axios
          .get(pokemon.url)
          .then(response => {
            pokemon.photoUrl = response.data.sprites.front_default;
          })
          .catch(error => {
            console.log(error);
          });
      });

      setPokemons([...previousPokemons, ...response.data.results]);
      setOffset(offset);
    })
    .catch(error => {
      console.log(error);
    });
};

export const fetchPokemonDetails = (
  pokemon: Pokemon,
  setAbilities: Dispatch<SetStateAction<Ability[]>>,
) => {
  axios
    .get(pokemon.url)
    .then(response => {
      response.data.abilities.map((ability: Ability) => {
        axios
          .get(ability.ability.url)
          .then(response => {
            ability.details = response.data.effect_entries.find(
              (effectEntry: EffectEntry) => effectEntry.language.name === 'en',
            ).effect;

            console.log('INNER FETCH: ', ability);
          })
          .catch(error => {
            console.log(error);
          });
      });

      console.log('OUTER FETCH: ', response.data.abilities);
      setAbilities(response.data.abilities);
    })
    .catch(error => {
      console.log(error);
    });
};