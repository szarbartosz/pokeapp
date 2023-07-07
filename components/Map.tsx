import * as React from 'react';
import {BaseSyntheticEvent, useState} from 'react';
import {Image, Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import MapView from 'react-native-maps';
import {Marker, Callout} from 'react-native-maps';
import {Pokemon} from '../App';
import {ClickCords, fetchRandomPokemon} from '../services/pokemonService';

export type MarkerType = {
  coordinate: {
    latitude: number;
    longitude: number;
  };
  pokemon: Pokemon;
};

const MapComponent: React.FC = () => {
  const [markers, setMarkers] = useState<MarkerType[]>([]);
  const [currentMarker, setCurrentMarker] = useState<MarkerType | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleLongPress = (e: BaseSyntheticEvent) => {
    fetchRandomPokemon(e.nativeEvent as ClickCords, markers, setMarkers);
  };

  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: 50.049683,
        longitude: 19.944544,
        latitudeDelta: 0.0622,
        longitudeDelta: 0.0121,
      }}
      onLongPress={e => handleLongPress(e)}>
      {markers.map((marker, index) => (
        <Marker
          key={index}
          coordinate={marker.coordinate}
          onPress={() => {
            setCurrentMarker(marker);
            setModalVisible(!modalVisible);
          }}
        />
      ))}
      <Callout>
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.title}>
                  {currentMarker?.pokemon.name} spotted!
                </Text>
                <Image
                  style={styles.photo}
                  source={{uri: currentMarker?.pokemon.photoUrl}}
                />
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}>
                  <Text style={styles.textStyle}>Hide modal</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>
      </Callout>
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  title: {
    fontSize: 22,
    color: '#3B4CCA',
    marginBottom: 16,
  },
  photo: {
    width: 180,
    height: 180,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#3B4CCA',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default MapComponent;
