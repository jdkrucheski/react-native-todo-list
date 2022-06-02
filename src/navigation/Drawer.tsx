import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Animated from 'react-native-reanimated';
import {AboutScreen} from '../screens/AboutScreen';
import {DrawerContent} from '../components/DrawerContent';
import {StyleSheet} from 'react-native';
import {StackNavigator} from './Stack';
import {themeColors} from '../../App';

const Drawer = createDrawerNavigator();

export const DrawerNavigation = () => {
  return (
    <Animated.View style={styles.container}>
      <Drawer.Navigator
        initialRouteName="StackNavigator"
        screenOptions={{
          headerShown: false,
          drawerType: 'slide',
          overlayColor: 'transparent',
          drawerStyle: {
            flex: 1,
            width: '60%',
            paddingRight: 20,
            backgroundColor: 'transparent',
          },
          sceneContainerStyle: {
            backgroundColor: 'transparent',
          },
        }}
        drawerContent={props => {
          return <DrawerContent {...props} />;
        }}>
        <Drawer.Screen name="StackNavigator">
          {() => <StackNavigator />}
        </Drawer.Screen>
        <Drawer.Screen name="AboutScreen">
          {() => <AboutScreen />}
        </Drawer.Screen>
      </Drawer.Navigator>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColors.accent,
  },
});
