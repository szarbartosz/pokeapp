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
      <View style={[styles.item, styles.shadow]}>
        <Image style={styles.image} source={{uri: photoUrl}} />
        <View>
          <Text style={styles.title}>{name}</Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#3B4CCA',
    borderRadius: 16,
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
  image: {
    width: 60,
    height: 60,
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

export default PokemonListElement;
