import 'react-native-gesture-handler';
import React, {useContext, useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {DrawerNavigation} from './src/navigation/Drawer';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ListsProvider} from './src/context/lists/listsProvider';
import {TodosProvider} from './src/context/todos/todosProvider';
import {ThemeProvider} from './src/context/theme/themeProvider';
import {getThemesService} from './src/services/themes';
import {ThemeContext} from './src/context/theme/themeContext';

const AppNavigation = ({children}: any) => {
  const {theme} = useContext(ThemeContext);
  return <NavigationContainer theme={theme}>{children}</NavigationContainer>;
};

export const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getThemesService();
      console.log('APP', res);
    };
    fetchData().catch(err => console.log('EEE', err));
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
