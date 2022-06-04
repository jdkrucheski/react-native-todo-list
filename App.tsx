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
import {getPreferencesService} from './src/services/preferences';
import changeNavigationBarColor from 'react-native-navigation-bar-color';

const AppNavigation = ({children}: any) => {
  const {theme, setColor} = useContext(ThemeContext);
  changeNavigationBarColor(theme.colors.primary, true, false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getPreferencesService();
        typeof res !== 'string' && setColor(res.selectedColor);
      } catch (err) {
        setColor('#8d9bce');
      }
    };
    fetchData();
  }, []);

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
