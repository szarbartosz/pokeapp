import * as React from 'react';
import {SafeAreaView, FlatList, StyleSheet} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useFetchPokemons} from '../hooks/useFetchPokemons';
import PokemonListElement from './PokemonListElement';
import {StackParamList} from '../App';

type Props = NativeStackScreenProps<StackParamList, 'Overview'>;

const PokemonList: React.FC<Props> = ({navigation}) => {
  const {pokemons, loadMore} = useFetchPokemons();

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
        onEndReached={loadMore}
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
