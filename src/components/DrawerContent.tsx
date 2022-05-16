import {DrawerContentScrollView} from '@react-navigation/drawer';
import {DrawerNavigationHelpers} from '@react-navigation/drawer/lib/typescript/src/types';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {menuItems} from '../data/menuItems';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
  navigation: DrawerNavigationHelpers;
}
export const DrawerContent = ({navigation}: Props) => {
  return (
    <DrawerContentScrollView
      scrollEnabled={true}
      contentContainerStyle={{flex: 1}}>
      <View style={styles.containner}>
        <View style={{flex: 1}} />
        <View style={{marginBottom: 20}}>
          {menuItems.map(item => (
            <View key={item.name} style={styles.itemContainner}>
              <Icon name={item.icon} color="#121216" size={22} />
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate(item.component);
                }}>
                <Text style={styles.text}>{item.name}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  containner: {
    flex: 1,
    paddingLeft: 30,
    paddingTop: 65,
    width: '100%',
  },
  itemContainner: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
  },
  text: {
    fontSize: 18,
    color: '#fff',
    marginLeft: 16,
  },
});
