//LanguagePicker.tsx

import React, {useContext, useState} from 'react';
import {Modal, View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {ThemeContext} from '../context/theme/themeContext';

interface Props {
  selected: string;
  items: {name: string; label: string}[];
  onSelect: (item: string) => void;
}
export const Picker = ({items, selected, onSelect}: Props) => {
  const {theme, globalStyles, accentColor} = useContext(ThemeContext);

  const [modalVisible, setModalVisible] = useState(false);

  const Item = ({name, label}: {name: string; label: string}) => (
    <TouchableOpacity
      style={[
        styles.itemButton,
        {
          backgroundColor: name,
          shadowColor: theme.colors.neutral,
        },
      ]}
      onPress={() => {
        onSelect(name);
        setModalVisible(!modalVisible);
      }}>
      <Text style={globalStyles.subTitle}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{flex: 1}}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View
            style={[
              styles.modalView,
              {
                backgroundColor: theme.colors.primary,
                shadowColor: theme.colors.neutral,
              },
            ]}>
            {items.map(item => (
              <Item {...item} key={item.name} />
            ))}
            <TouchableOpacity
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
              style={{
                width: '100%',
                alignItems: 'flex-end',
              }}>
              <Icon
                name="close-outline"
                color={theme.colors.neutral}
                size={38}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        style={[styles.button, {backgroundColor: accentColor}]}
        onPress={() => setModalVisible(true)}>
        <Text style={globalStyles.subTitle}>
          {items.find(n => n.name === selected)?.label}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: '80%',
    padding: 20,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOpacity: 0.9,
    shadowRadius: 20,
    elevation: 29,
  },
  itemButton: {
    width: '100%',
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
  button: {
    width: '100%',
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    elevation: 4,
  },
});
