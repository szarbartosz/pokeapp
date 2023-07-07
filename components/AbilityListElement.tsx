import * as React from 'react';
import {Ability} from './PokemonDetails';
import {StyleSheet, Text} from 'react-native';

type Props = {ability: Ability};

const AbilityListElement: React.FC<Props> = ({ability}) => (
  <Text style={styles.listElement}>
    {ability.ability.name}: {ability.details}
  </Text>
);

const styles = StyleSheet.create({
  listElement: {
    fontSize: 12,
    color: '#FFFFFF',
    margin: 2,
  },
});

export default AbilityListElement;
