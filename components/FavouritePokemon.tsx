import * as React from 'react';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {Text, StyleSheet, View, Image, Button} from 'react-native';
import {
  FAVOURITE_POKEMON_KEY,
  removeData,
} from '../services/asyncStorageService';
import {useFavouritePokemon} from '../hooks/useFavouritePokemon';
import {BottomTabParamList} from '../App';

type Props = BottomTabScreenProps<BottomTabParamList, 'Favourite'>;

const FavouritePokemon: React.FC<Props> = ({navigation}) => {
  const {pokemon, pokemonPresent, setPokemonPresent} = useFavouritePokemon({
    navigation,
  });

  return pokemonPresent ? (
    <View style={styles.container}>
      <View style={[styles.contentWrapper, styles.shadow]}>
        <Image style={styles.image} source={{uri: pokemon?.photoUrl}} />
        <Text style={styles.caption}>{pokemon?.name}</Text>
      </View>
      <View style={[styles.buttonContainer, styles.shadow]}>
        <Button
          color="#3B4CCA"
          title="Not my favourite anymore!"
          onPress={() => {
            removeData(FAVOURITE_POKEMON_KEY);
            setPokemonPresent(false);
          }}
        />
      </View>
    </View>
  ) : (
    <View style={styles.container}>
      <View style={[styles.contentWrapper, styles.shadow]}>
        <Text style={styles.text}>You do not have Your favourite pokemon!</Text>
      </View>
      <View style={[styles.buttonContainer, styles.shadow]}>
        <Button
          title="Go to Pokemon List"
          color="#3B4CCA"
          onPress={() => navigation.navigate('Pokemons')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentWrapper: {
    backgroundColor: '#3B4CCA',
    borderRadius: 16,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 180,
    height: 180,
  },
  caption: {
    fontSize: 22,
    margin: 16,
    textAlign: 'center',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  text: {
    fontSize: 18,
    margin: 16,
    textAlign: 'center',
    color: '#FFFFFF',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 24,
    width: '80%',
    backgroundColor: '#FFFFFF',
    color: '#3B4CCA',
    borderRadius: 16,
    padding: 8,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 10,
  },
});

export default FavouritePokemon;
