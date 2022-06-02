import React, {useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Tooltip from 'react-native-walkthrough-tooltip';
import {themeColors} from '../../App';
import {MenuOption} from '../interfaces/AppInterfaces';

interface Props {
  id: string;
  iconName: string;
  options: MenuOption[];
}

export const FloatingMenu = ({id, iconName, options}: Props) => {
  const [showTip, setTip] = useState(false);

  return (
    <Tooltip
      key={id}
      closeOnChildInteraction={true}
      contentStyle={{
        width: 110,
        padding: 0,
        backgroundColor: 'transparent',
        elevation: 2,
        shadowColor: themeColors.white,
      }}
      isVisible={showTip}
      content={
        <View key={'menu' + id} style={styles.menu}>
          {options.map((option: MenuOption) => (
            <TouchableOpacity
              key={option.id}
              onPress={() => {
                option.action && option.action(id);
                setTip(false);
              }}
              style={styles.btn}>
              <Icon
                name={option.iconName}
                color={themeColors.accent}
                size={18}
              />
              <Text style={styles.btnText}>{option.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      }
      placement="left"
      arrowSize={{width: 0, height: 0}}
      backgroundColor="transparent"
      onClose={() => setTip(false)}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setTip(true)}
        style={{
          height: 48,
          width: 48,
          alignItems: 'flex-end',
          justifyContent: 'center',
        }}>
        <Icon name={iconName} color={themeColors.accent} size={34} />
      </TouchableOpacity>
    </Tooltip>
  );
};

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 5,
    borderRadius: 8,
    backgroundColor: themeColors.primary,
  },
  btn: {
    width: '100%',
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    // borderWidth: 1,
    borderRadius: 8,
    borderColor: themeColors.accent,
    marginVertical: 2,
  },
  btnText: {
    fontSize: 16,
    marginLeft: 4,
    color: themeColors.white,
  },
});
