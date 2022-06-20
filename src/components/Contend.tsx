import {useDrawerStatus} from '@react-navigation/drawer';
import {useNavigation, DrawerActions} from '@react-navigation/native';
import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import Animated, {FadeInDown} from 'react-native-reanimated';
import {ThemeContext} from '../context/theme/themeContext';
import {FloatingButton} from './FloatingButton';

interface Props {
  children: any;
  action?: (id?: string) => void;
  save?: () => void;
}

// TODO: Cambiar nombre
export const Contend = ({children, action, save}: Props) => {
  const navigation = useNavigation();
  const drawer = useDrawerStatus();
  const {theme} = useContext(ThemeContext);

  return (
    <Animated.View
      style={[styles.card, {backgroundColor: theme.colors.primary}]}
      entering={FadeInDown.delay(200)}>
      <View style={styles.childrenContainer}>{children}</View>
      <View
        style={[styles.menuContainer, {backgroundColor: theme.colors.primary}]}>
        <FloatingButton
          action={() => {
            navigation.dispatch(DrawerActions.openDrawer());
          }}
          icon={drawer !== 'closed' ? 'close-outline' : 'menu-outline'}
          position={'left'}
        />

        <FloatingButton
          action={() => action && action()}
          icon="add-outline"
          position={'right'}
        />
        {save && (
          <FloatingButton
            action={() => save()}
            icon="save-outline"
            position={'right'}
          />
        )}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 10,
    borderTopEndRadius: 24,
    borderTopStartRadius: 24,
  },
  childrenContainer: {
    flex: 1,
  },
  menuContainer: {
    width: '100%',
    height: 48,
  },
});
