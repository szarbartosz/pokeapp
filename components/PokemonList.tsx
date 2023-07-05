import * as React from 'react';
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  StatusBar,
  Button,
} from 'react-native';
import axios from 'axios';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {BottomTabParamList} from '../App';
import Pokemon from './Pokemon';
import {useEffect} from 'react';

type Props = BottomTabScreenProps<BottomTabParamList, 'List'>;

type Pokemon = {
  name: string;
  url: string;
};

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
              pokemon.url = response.data.sprites.front_default;
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
              pokemon.url = response.data.sprites.front_default;
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
        renderItem={({item}) => <Pokemon name={item.name} url={item.url} />}
        keyExtractor={item => item.name}
        onEndReachedThreshold={0.01}
        onEndReached={() =>
          fetchMorePokemons(limit.current, offset + limit.current)
        }
      />
      <Button
        title="Go to Your Favourite Pokemon"
        onPress={() => navigation.navigate('Favourite')}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
});

export default PokemonList;
