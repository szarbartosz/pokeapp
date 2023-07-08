import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PokemonList from './components/PokemonList';
import MapComponent from './components/Map';
import PokemonDetails from './components/PokemonDetails';
import FavouritePokemon from './components/FavouritePokemon';
import {
  StarIcon,
  ListBulletIcon,
  MapIcon,
} from 'react-native-heroicons/outline';

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

const COLOR_ACTIVE = '#3B4CCA';
const COLOR_INACTIVE = '#949494';

const PokemonTabs = () => (
  <Tab.Navigator
    screenOptions={({route}) => ({
      tabBarIcon: ({focused}) =>
        route.name === 'Favourite' ? (
          <StarIcon color={focused ? COLOR_ACTIVE : COLOR_INACTIVE} />
        ) : route.name === 'Pokemons' ? (
          <ListBulletIcon color={focused ? COLOR_ACTIVE : COLOR_INACTIVE} />
        ) : (
          <MapIcon color={focused ? COLOR_ACTIVE : COLOR_INACTIVE} />
        ),
      tabBarActiveTintColor: COLOR_ACTIVE,
      tabBarInactiveTintColor: COLOR_INACTIVE,
    })}>
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
