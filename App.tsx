import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {DrawerNavigation} from './src/navigation/Drawer';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ListsProvider} from './src/context/lists/listsProvider';
import {TodosProvider} from './src/context/todos/todosProvider';

export const themeColors = {
  primary: '#8d9bce', //'#8D8DAA', //#D885A3 ', //#F56D91', //'#F7F5F2',
  secondary: '#121216',
  neutral1: '#fff',
  neutral2: '#2a2b33',
  neutral3: 'rgba(255, 255, 255, 0.5)',
  neutral4: 'rgba(18 , 18 , 22, 0.8)',
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
                primary: themeColors.primary,
                background: themeColors.primary,
                card: themeColors.secondary,
                text: themeColors.neutral1,
                border: themeColors.secondary,
                notification: themeColors.secondary,
              },
            }}>
            <DrawerNavigation />
          </NavigationContainer>
        </TodosProvider>
      </ListsProvider>
    </SafeAreaProvider>
  );
};
