import * as React from 'react';
import {Button, View, Text} from 'react-native';
import axios from 'axios';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {BottomTabParamList} from '../App';

type Props = BottomTabScreenProps<BottomTabParamList, 'List'>;

type Pokemon = {
  name: string;
  url: string;
};

const PokemonList: React.FC<Props> = ({navigation}) => {
  const [pokemons, setPokemons] = React.useState<Pokemon[]>([]);
  axios
    .get('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0')
    .then(function (response) {
      setPokemons(response.data.results);
    })
    .catch(function (error) {
      console.log(error);
    })
    .finally(function () {
      console.log('finally');
    });

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Pokemon List Screen</Text>
      {pokemons.map(pokemon => (
        <Text key={pokemon.name}>{pokemon.name}</Text>
      ))}
      <Button
        title="Go to Your Favourite Pokemon"
        onPress={() => navigation.navigate('Favourite')}
      />
    </View>
  );
};

export default PokemonList;
