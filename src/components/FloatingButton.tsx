import React, {useContext} from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {ThemeContext} from '../context/theme/themeContext';

interface Props {
  action?: (id?: string) => void;
  icon: string;
  position: 'left' | 'right';
}

export const FloatingButton = ({action, icon, position}: Props) => {
  const {theme, accentColor} = useContext(ThemeContext);

  const ubication = position === 'left' ? {left: 80} : {right: 80};
  return (
    <TouchableOpacity
      onPress={() => action && action()}
      style={[
        {
          height: 50,
          width: 50,
          borderRadius: 10,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: accentColor,
          elevation: 4,
          shadowColor: theme.colors.neutral,
          position: 'absolute',
          bottom: 10,
        },
        ubication,
      ]}>
      <Icon name={icon} color={theme.colors.secondary} size={34} />
    </TouchableOpacity>
  );
};
