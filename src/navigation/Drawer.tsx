import React, {useContext} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Animated from 'react-native-reanimated';
import {AboutScreen} from '../screens/AboutScreen';
import {DrawerContent} from '../components/DrawerContent';
import {StackNavigator} from './Stack';
import {ThemeContext} from '../context/theme/themeContext';
import {ConfigScreen} from '../screens/ConfigScreen';

const Drawer = createDrawerNavigator();

export const DrawerNavigation = () => {
  const {globalStyles} = useContext(ThemeContext);

  return (
    <Animated.View style={globalStyles.mainContainer}>
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
        <Drawer.Screen name="ConfigScreen">
          {() => <ConfigScreen />}
        </Drawer.Screen>
      </Drawer.Navigator>
    </Animated.View>
  );
};
