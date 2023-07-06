import * as React from 'react';
import {useEffect} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {SafeAreaView, FlatList, StyleSheet} from 'react-native';
import axios from 'axios';
import {Pokemon, StackParamList} from '../App';
import PokemonListElement from './PokemonListElement';

type Props = NativeStackScreenProps<StackParamList, 'Overview'>;

const PokemonList: React.FC<Props> = ({navigation}) => {
  const limit = React.useRef(20);
  const [offset, setOffset] = React.useState(0);
  const [pokemons, setPokemons] = React.useState<Pokemon[]>([]);

  const fetchPokemons = (limit: number) => {
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

  const fetchMorePokemons = (limit: number, offset: number) => {
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

        setPokemons([...pokemons, ...response.data.results]);
        setOffset(offset);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchPokemons(limit.current);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={pokemons}
        renderItem={({item}) => (
          <PokemonListElement
            name={item.name}
            photoUrl={item.photoUrl}
            onPress={() => navigation.navigate('Details', {pokemon: item})}
          />
        )}
        keyExtractor={item => item.name}
        onEndReachedThreshold={0.01}
        onEndReached={() =>
          fetchMorePokemons(limit.current, offset + limit.current)
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default PokemonList;
