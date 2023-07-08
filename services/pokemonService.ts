import axios from 'axios';
import {Pokemon} from '../App';
import {Dispatch, SetStateAction} from 'react';
import {Ability} from '../components/PokemonDetails';
import {MarkerType} from '../components/Map';

type EffectEntry = {
  effect: string;
  language: {
    name: string;
  };
};

export type ClickCords = {
  coordinate: {
    latitude: number;
    longitude: number;
  };
  position: {
    x: number;
    y: number;
  };
};

export const POKEMON_FETCH_LIMIT = 20;

export const fetchPokemons = (
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
      const fetchPromise = response.data.abilities.map((ability: Ability) =>
        axios
          .get(ability.ability.url)
          .then(response => {
            ability.details = response.data.effect_entries.find(
              (effectEntry: EffectEntry) => effectEntry.language.name === 'en',
            ).effect;
          })
          .catch(error => {
            console.log(error);
          }),
      );

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
  cords: ClickCords,
  markers: MarkerType[],
  setMarkers: Dispatch<SetStateAction<MarkerType[]>>,
) =>
  axios
    .get(
      `https://pokeapi.co/api/v2/pokemon?limit=1&offset=${
        Math.floor(Math.random() * 1000) + 1
      }`,
    )
    .then(response => {
      const fetchPromise = response.data.results.map((pokemon: Pokemon) => {
        axios
          .get(pokemon.url)
          .then(response => {
            pokemon.photoUrl = response.data.sprites.front_default;
          })
          .catch(error => {
            console.log(error);
          });
      });

      Promise.all(fetchPromise).then(() => {
        setMarkers([
          ...markers,
          {
            ...cords,
            pokemon: response.data.results[0],
          } as MarkerType,
        ]);
      });
    })
    .catch(error => {
      console.log(error);
    });
