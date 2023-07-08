import {useEffect, useState} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Ability} from '../components/PokemonDetails';
import {fetchDetails} from '../services/pokemonService';
import {FAVOURITE_POKEMON_KEY, getData} from '../services/asyncStorageService';
import {Pokemon, StackParamList} from '../App';

type Props = {
  pokemon: Pokemon;
  navigation: NativeStackNavigationProp<StackParamList, 'Details'>;
};

export const useDetails = ({pokemon, navigation}: Props) => {
  const [abilities, setAbilities] = useState<Ability[]>([]);
  const [isFavourite, setIsFavourite] = useState<boolean>(false);

  useEffect(() => {
    fetchDetails(pokemon, setAbilities);

    const getFavouritePokemon = async () => {
      const favouritePokemon = await getData(FAVOURITE_POKEMON_KEY);
      setIsFavourite(favouritePokemon?.name === pokemon.name);
    };

    const unsubscribe = navigation.addListener('focus', () => {
      getFavouritePokemon();
    });

    return unsubscribe;
  }, [pokemon, navigation]);

  return {abilities, isFavourite, setIsFavourite};
};
