import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FavouritePokemon from './components/FavouritePokemon';
import PokemonList from './components/PokemonList';
import PokemonDetails from './components/PokemonDetails';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MapComponent from './components/Map';

export type Pokemon = {
  name: string;
  url: string;
  photoUrl: string;
};

export type BottomTabParamList = {
  Favourite: undefined;
  Pokemons: undefined;
  Map: undefined;
};

export type StackParamList = {
  Overview: undefined;
  Details: {
    pokemon: Pokemon;
  };
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

const Stack = createNativeStackNavigator<StackParamList>();

const PokemonStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Overview" component={PokemonList} />
    <Stack.Screen name="Details" component={PokemonDetails} />
  </Stack.Navigator>
);

const PokemonTabs = () => (
  <Tab.Navigator>
    <Tab.Screen name="Favourite" component={FavouritePokemon} />
    <Tab.Screen name="Pokemons" component={PokemonStack} />
    <Tab.Screen name="Map" component={MapComponent} />
  </Tab.Navigator>
);

const App = () => {
  return (
    <NavigationContainer>
      <PokemonTabs />
    </NavigationContainer>
  );
};

export default App;
