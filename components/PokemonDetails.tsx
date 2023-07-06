import * as React from 'react';
import {useState, useEffect} from 'react';
import {Button, Image, StyleSheet, Text, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import axios from 'axios';
import {Pokemon, StackParamList} from '../App';

type Props = NativeStackScreenProps<StackParamList, 'Details'>;

type Ability = {
  ability: {
    name: string;
    url: string;
  };
  details: string;
};

type EffectEntry = {
  effect: string;
  language: {
    name: string;
  };
};

const PokemonDetails: React.FC<Props> = ({route}) => {
  const {pokemon} = route.params;
  const [abilities, setAbilities] = useState<Ability[]>([]);

  const fetchPokemonDetails = (pokemon: Pokemon) => {
    axios
      .get(pokemon.url)
      .then(response => {
        response.data.abilities.map((ability: Ability) => {
          axios
            .get(ability.ability.url)
            .then(response => {
              ability.details = response.data.effect_entries.find(
                (effectEntry: EffectEntry) =>
                  effectEntry.language.name === 'en',
              ).effect;

              console.log('INNER FETCH: ', ability);
            })
            .catch(error => {
              console.log(error);
            });
        });

        console.log('OUTER FETCH: ', response.data.abilities);
        setAbilities(response.data.abilities);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchPokemonDetails(pokemon);
  }, [pokemon]);

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={{uri: pokemon.photoUrl}} />
      <Text style={styles.title}>{pokemon.name}</Text>
      <Text style={styles.subTitle}>Abilities:</Text>
      {abilities.length > 0 &&
        abilities.map((ability: Ability) => (
          <Text
            style={styles.listElement}
            key={pokemon.name + ability.ability.name}>
            {ability.ability.name}
          </Text>
        ))}
      <View style={styles.buttonContainer}>
        <Button color="#FFFFFF" title="mark as favourite" />
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

export default PokemonDetails;
