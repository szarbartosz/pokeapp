import * as React from 'react';
import {View, Text, StyleSheet, Image, TouchableHighlight} from 'react-native';

type Props = {
  name: string;
  photoUrl: string;
  onPress: () => void;
};

const PokemonListElement: React.FC<Props> = ({name, photoUrl, onPress}) => {
  return (
    <TouchableHighlight onPress={onPress}>
      <View style={styles.item}>
        <Image style={styles.logo} source={{uri: photoUrl}} />
        <View>
          <Text style={styles.title}>{name}</Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  item: {
    borderRadius: 4,
    backgroundColor: '#3B4CCA',
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  subTitle: {
    fontSize: 12,
    color: '#FFFFFF',
  },
  logo: {
    width: 60,
    height: 60,
  },
});

export default PokemonListElement;
