import * as React from 'react';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {Button, View, Text} from 'react-native';
import {BottomTabParamList} from '../App';

type Props = BottomTabScreenProps<BottomTabParamList, 'Favourite'>;

const FavPokemon: React.FC<Props> = ({navigation}) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Favourite Pokemon Screen</Text>
      <Button
        title="Go to Pokemon List"
        onPress={() => navigation.navigate('List')}
      />
    </View>
  );
};

export default FavPokemon;
