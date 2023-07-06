import * as React from 'react';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {Text, StyleSheet, View, Image, Button} from 'react-native';
import {BottomTabParamList, Pokemon} from '../App';
import {useEffect, useState} from 'react';
import {
  FAVOURITE_POKEMON_KEY,
  getData,
  removeData,
} from '../services/asyncStorageService';

type Props = BottomTabScreenProps<BottomTabParamList, 'Favourite'>;

const FavouritePokemon: React.FC<Props> = ({navigation}) => {
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

  return pokemonPresent ? (
    <View style={styles.container}>
      <Image style={styles.logo} source={{uri: pokemon?.photoUrl}} />
      <Text style={styles.title}>{pokemon?.name}</Text>
      <View style={styles.buttonContainer}>
        <Button
          color="#FFFFFF"
          title="Not my favourite pokemon anymore!"
          onPress={() => {
            removeData(FAVOURITE_POKEMON_KEY);
            setPokemonPresent(false);
          }}
        />
      </View>
    </View>
  ) : (
    <View style={styles.container}>
      <Text style={styles.title}>You do not have Your favourite pokemon!</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Go to Pokemon List"
          color="#FFFFFF"
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
    backgroundColor: '#3B4CCA',
  },
  logo: {
    width: 180,
    height: 180,
  },
  title: {
    fontSize: 22,
    padding: 16,
    textAlign: 'center',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  subTitle: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  listElement: {
    fontSize: 12,
    color: '#FFFFFF',
    margin: 2,
  },
  buttonContainer: {
    marginTop: 120,
    backgroundColor: '#CC0000',
    borderRadius: 4,
    padding: 8,
  },
});

export default FavouritePokemon;
