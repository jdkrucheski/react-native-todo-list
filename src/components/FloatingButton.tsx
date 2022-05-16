import React from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {themeColors} from '../../App';

interface Props {
  action?: (id?: string) => void;
  icon: string;
  position: 'left' | 'right';
}

export const FloatingButton = ({action, icon, position}: Props) => {
  const ubication = position === 'left' ? {left: 80} : {right: 80};
  return (
    <TouchableOpacity
      onPress={() => action && action()}
      style={[
        {
          height: 58,
          width: 58,
          borderRadius: 24,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: themeColors.primary,
          elevation: 4,
          shadowColor: themeColors.neutral1,
          position: 'absolute',
          bottom: 6,
        },
        ubication,
      ]}>
      <Icon name={icon} color={themeColors.neutral1} size={34} />
    </TouchableOpacity>
  );
};
