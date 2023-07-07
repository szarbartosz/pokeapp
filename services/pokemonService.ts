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
      const fetchPromise = response.data.abilities.map((ability: Ability) => {
        return axios
          .get(ability.ability.url)
          .then(response => {
            ability.details = response.data.effect_entries.find(
              (effectEntry: EffectEntry) => effectEntry.language.name === 'en',
            ).effect;
          })
          .catch(error => {
            console.log(error);
          });
      });

      Promise.all(fetchPromise)
        .then(() => {
          setAbilities(response.data.abilities);
        })
        .catch(error => {
          console.log(error);
        });
    })
    .catch(error => {
      console.log(error);
    });
};

export const fetchRandomPokemon = (
  setSpottedPokemon: Dispatch<SetStateAction<Pokemon[]>>,
) =>
  axios
    .get(
      `https://pokeapi.co/api/v2/pokemon?limit=1&offset=${
        Math.floor(Math.random() * 1000) + 1
      }`,
    )
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

      setSpottedPokemon(response.data.results[0]);
    })
    .catch(error => {
      console.log(error);
    });
