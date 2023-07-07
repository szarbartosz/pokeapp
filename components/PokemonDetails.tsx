import * as React from 'react';
import {Button, Image, StyleSheet, Text, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StackParamList} from '../App';
import {
  FAVOURITE_POKEMON_KEY,
  storeData,
} from '../services/asyncStorageService';
import {usePokemonDetails} from '../hooks/usePokemonDetails';
import AbilityList from './AbilityList';

export type Ability = {
  ability: {
    name: string;
    url: string;
  };
  details: string;
};

type Props = NativeStackScreenProps<StackParamList, 'Details'>;

const PokemonDetails: React.FC<Props> = ({route, navigation}) => {
  const {pokemon} = route.params;
  const {abilities, isFavourite, setIsFavourite} = usePokemonDetails({
    pokemon,
    navigation,
  });

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={{uri: pokemon.photoUrl}} />
      <Text style={styles.title}>{pokemon.name}</Text>
      <Text style={styles.subTitle}>Abilities:</Text>
      <AbilityList abilities={abilities} />
      {isFavourite ? (
        <View style={styles.infoContainer}>
          <Text style={styles.title}>That's Your favourite pokemon!</Text>
        </View>
      ) : (
        <View style={styles.buttonContainer}>
          <Button
            color="#FFFFFF"
            title="mark as favourite"
            onPress={() => {
              storeData(FAVOURITE_POKEMON_KEY, pokemon);
              setIsFavourite(true);
              navigation.goBack();
            }}
          />
        </View>
      )}
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
    color: '#FFFFFF',
    marginBottom: 16,
  },
  subTitle: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  buttonContainer: {
    marginTop: 120,
    backgroundColor: '#CC0000',
    borderRadius: 4,
    padding: 8,
  },
  infoContainer: {
    marginTop: 120,
  },
});

export default PokemonDetails;
