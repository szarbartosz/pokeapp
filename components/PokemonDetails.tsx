import * as React from 'react';
import {Button, Image, StyleSheet, Text, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StackParamList} from '../App';
import {
  FAVOURITE_POKEMON_KEY,
  storeData,
} from '../services/asyncStorageService';
import {useDetails} from '../hooks/useDetails';
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
  const {abilities, isFavourite, setIsFavourite} = useDetails({
    pokemon,
    navigation,
  });

  return (
    <View style={styles.container}>
      <View style={[styles.contentWrapper, styles.shadow]}>
        <Image style={styles.image} source={{uri: pokemon.photoUrl}} />
        <Text style={styles.caption}>{pokemon.name}</Text>
      </View>
      <View style={[styles.abilitiesWrapper, styles.shadow]}>
        <Text style={styles.text}>Abilities</Text>
        <AbilityList abilities={abilities} />
      </View>
      {isFavourite ? (
        <View style={[styles.buttonContainer, styles.shadow]}>
          <Button
            color="#3B4CCA"
            title="That's Your favourite pokemon!"
            disabled
          />
        </View>
      ) : (
        <View style={[styles.buttonContainer, styles.shadow]}>
          <Button
            color="#3B4CCA"
            title="Mark as favourite"
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
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  contentWrapper: {
    margin: 16,
    backgroundColor: '#3B4CCA',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    width: '80%',
  },
  abilitiesWrapper: {
    margin: 16,
    backgroundColor: '#CC0000',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    width: '80%',
    paddingBottom: 16,
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

export default PokemonDetails;
