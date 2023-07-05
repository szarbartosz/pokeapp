import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FavPokemon from './components/FavPokemon';
import PokemonList from './components/PokemonList';

export type BottomTabParamList = {
  Favourite: undefined;
  List: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

const MyTabs = () => (
  <Tab.Navigator>
    <Tab.Screen name="Favourite" component={FavPokemon} />
    <Tab.Screen name="List" component={PokemonList} />
  </Tab.Navigator>
);

const App = () => {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
};

export default App;
