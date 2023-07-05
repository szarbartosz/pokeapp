import * as React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

type Props = {
  name: string;
  url: string;
};

const Pokemon: React.FC<Props> = ({name, url}) => {
  return (
    <View style={styles.item}>
      <Image style={styles.logo} source={{uri: url}} />
      <View>
        <Text style={styles.title}>{name}</Text>
      </View>
    </View>
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

export default Pokemon;
