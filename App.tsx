import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {DrawerNavigation} from './src/navigation/Drawer';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ListsProvider} from './src/context/lists/listsProvider';
import {TodosProvider} from './src/context/todos/todosProvider';

export const themeColors = {
  accent: '#8d9bce', //'#8D8DAA', //#D885A3 ', //#F56D91', //'#F7F5F2',
  primary: '#121216',
  secondary: '#2a2b33',
  white: '#fff',
  neutral: 'rgba(255, 255, 255, 0.5)',
};

export const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <SafeAreaProvider>
      <ListsProvider>
        <TodosProvider>
          <NavigationContainer
            theme={{
              dark: true,
              colors: {
                primary: themeColors.accent,
                background: themeColors.accent,
                card: themeColors.primary,
                text: themeColors.white,
                border: themeColors.primary,
                notification: themeColors.primary,
              },
            }}>
            <DrawerNavigation />
          </NavigationContainer>
        </TodosProvider>
      </ListsProvider>
    </SafeAreaProvider>
  );
};
