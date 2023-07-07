import {useEffect, useState} from 'react';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {FAVOURITE_POKEMON_KEY, getData} from '../services/asyncStorageService';
import {BottomTabParamList, Pokemon} from '../App';

type Props = {
  navigation: BottomTabNavigationProp<BottomTabParamList, 'Favourite'>;
};

export const useFavouritePokemon = ({navigation}: Props) => {
  const [pokemon, setPokemon] = useState<Pokemon>();
  const [pokemonPresent, setPokemonPresent] = useState<boolean>(false);

  useEffect(() => {
    const getFavouritePokemon = async () => {
      const favouritePokemon = await getData(FAVOURITE_POKEMON_KEY);
      setPokemon(favouritePokemon);
      setPokemonPresent(favouritePokemon !== null);
    };

    const unsubscribe = navigation.addListener('focus', () => {
      getFavouritePokemon();
    });

    return unsubscribe;
  }, [navigation]);

  return {pokemon, pokemonPresent, setPokemonPresent};
};
