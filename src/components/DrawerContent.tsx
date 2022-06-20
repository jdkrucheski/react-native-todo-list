import {DrawerContentScrollView} from '@react-navigation/drawer';
import {DrawerNavigationHelpers} from '@react-navigation/drawer/lib/typescript/src/types';
import React, {useContext} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {menuItems} from '../data/menuItems';
import Icon from 'react-native-vector-icons/Ionicons';
import {ThemeContext} from '../context/theme/themeContext';

interface Props {
  navigation: DrawerNavigationHelpers;
}
export const DrawerContent = ({navigation}: Props) => {
  const {theme, globalStyles} = useContext(ThemeContext);

  return (
    <DrawerContentScrollView
      scrollEnabled={true}
      contentContainerStyle={{flex: 1}}>
      <View style={styles.containner}>
        <View style={{flex: 1}} />
        <View style={{marginBottom: 20}}>
          {menuItems.map(item => (
            <View key={item.name} style={styles.itemContainner}>
              <Icon
                name={item.icon}
                color={theme.colors.notification}
                size={22}
                style={{
                  marginRight: 8,
                }}
              />
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate(item.component);
                }}>
                <View
                  key={item.name}
                  style={{
                    justifyContent: 'center',
                    height: 50,
                  }}>
                  <Text
                    style={[
                      globalStyles.subTitle,
                      {
                        color: theme.colors.notification,
                      },
                    ]}>
                    {item.name}
                  </Text>
                </View>
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
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  text: {
    fontSize: 18,
    color: '#fff',
    marginLeft: 16,
  },
});
