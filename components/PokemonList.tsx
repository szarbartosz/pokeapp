import * as React from 'react';
import {useEffect} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {SafeAreaView, FlatList, StyleSheet} from 'react-native';
import {Pokemon, StackParamList} from '../App';
import PokemonListElement from './PokemonListElement';
import {fetchMorePokemons, fetchPokemons} from '../services/pokemonService';

type Props = NativeStackScreenProps<StackParamList, 'Overview'>;

const PokemonList: React.FC<Props> = ({navigation}) => {
  const limit = React.useRef(20);
  const [offset, setOffset] = React.useState(0);
  const [pokemons, setPokemons] = React.useState<Pokemon[]>([]);

  useEffect(() => {
    fetchPokemons(limit.current, setPokemons);
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
          fetchMorePokemons(
            pokemons,
            limit.current,
            offset + limit.current,
            setPokemons,
            setOffset,
          )
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
