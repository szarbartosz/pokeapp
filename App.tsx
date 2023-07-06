import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FavPokemon from './components/FavPokemon';
import PokemonList from './components/PokemonList';
import PokemonDetails from './components/PokemonDetails';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

export type Pokemon = {
  name: string;
  url: string;
  photoUrl: string;
};

export type BottomTabParamList = {
  Favourite: undefined;
  Pokemons: undefined;
};

export type StackParamList = {
  Overview: undefined;
  Details: {
    pokemon: Pokemon;
  };
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

const Stack = createNativeStackNavigator<StackParamList>();

const PokemonStackScreen = () => (
  <Stack.Navigator>
    <Stack.Screen name="Overview" component={PokemonList} />
    <Stack.Screen name="Details" component={PokemonDetails} />
  </Stack.Navigator>
);

const MyTabs = () => (
  <Tab.Navigator>
    <Tab.Screen name="Favourite" component={FavPokemon} />
    <Tab.Screen name="Pokemons" component={PokemonStackScreen} />
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
