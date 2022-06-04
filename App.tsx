import 'react-native-gesture-handler';
import React, {useContext, useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {DrawerNavigation} from './src/navigation/Drawer';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ListsProvider} from './src/context/lists/listsProvider';
import {TodosProvider} from './src/context/todos/todosProvider';
import {ThemeProvider} from './src/context/theme/themeProvider';
import {ThemeContext} from './src/context/theme/themeContext';

const AppNavigation = ({children}: any) => {
  const {theme} = useContext(ThemeContext);

  return <NavigationContainer theme={theme}>{children}</NavigationContainer>;
};

export const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <ListsProvider>
          <TodosProvider>
            <AppNavigation>
              <DrawerNavigation />
            </AppNavigation>
          </TodosProvider>
        </ListsProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};
