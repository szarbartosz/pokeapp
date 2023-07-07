import * as React from 'react';
import {useState} from 'react';
import {Button, Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import {Ability} from './PokemonDetails';

type Props = {ability: Ability};

const AbilityListElement: React.FC<Props> = ({ability}) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <Pressable
      style={[styles.elementWrapper, styles.shadow]}
      onPress={() => setModalVisible(true)}>
      <View>
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={[styles.text, styles.bold]}>
                {ability.ability.name}:
              </Text>
              <Text style={[styles.text]}>{ability.details}</Text>
              <View style={[styles.buttonContainer, styles.shadow]}>
                <Button
                  color="#3B4CCA"
                  title="Close modal"
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}
                />
              </View>
            </View>
          </View>
        </Modal>
        <View>
          <Text style={styles.text}>{ability.ability.name}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  elementWrapper: {
    margin: 8,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    width: '80%',
  },
  image: {
    width: 180,
    height: 180,
  },
  caption: {
    fontSize: 22,
    margin: 16,
    textAlign: 'center',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  text: {
    fontSize: 18,
    margin: 16,
    textAlign: 'center',
    color: '#3B4CCA',
  },
  bold: {
    fontWeight: 'bold',
  },
  buttonContainer: {
    width: 180,
    backgroundColor: '#FFFFFF',
    color: '#3B4CCA',
    borderRadius: 16,
    padding: 8,
    marginTop: 16,
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
});

export default AbilityListElement;
