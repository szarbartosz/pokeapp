import * as React from 'react';
import {Button, View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

function FavPokemon({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Favourite Pokemon Screen</Text>
      <Button
        title="Go to Pokemon List"
        onPress={() => navigation.navigate('List')}
      />
    </View>
  );
}

function PokemonList({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Pokemon List Screen</Text>
      <Button
        title="Go to Your Favourite Pokemon"
        onPress={() => navigation.navigate('Favourite')}
      />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Favourite" component={FavPokemon} />
      <Tab.Screen name="List" component={PokemonList} />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}

export default App;
