import React, {useContext} from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {FloatingMenu} from './FloatingMenu';
import Icon from 'react-native-vector-icons/Ionicons';
import Animated, {FadeInRight, FadeInLeft} from 'react-native-reanimated';
import {Item, MenuOption} from '../interfaces/AppInterfaces';
import {ThemeContext} from '../context/theme/themeContext';

interface Props {
  index: number;
  action?: (id: string, name?: string) => void;
  secondaryAction?: (id: string) => void;
  item: Item;
  options: MenuOption[];
}

export const ListItems = ({item, action, options, secondaryAction}: Props) => {
  const {theme, globalStyles, accentColor} = useContext(ThemeContext);

  return (
    <Animated.View
      key={item.id}
      entering={FadeInRight.delay(300)}
      exiting={FadeInLeft.delay(300).duration(300)}
      style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 8,
        borderBottomColor: theme.colors.secondary,
        borderBottomWidth: 1,
      }}>
      <TouchableOpacity
        style={{
          height: 48,
          width: 48,
          flexDirection: 'row',
          alignItems: 'center',
        }}
        activeOpacity={0.8}
        onPress={() => action && action(item.id, item.title)}>
        <Icon
          name={item.iconName}
          color={
            item.status !== 'closed' ? accentColor : theme.colors.secondary
          }
          size={34}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          flex: 1,
          height: 48,
          paddingHorizontal: 5,
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
        }}
        activeOpacity={0.8}
        onPress={() =>
          secondaryAction
            ? secondaryAction(item.id)
            : action && action(item.id, item.title)
        }>
        <Text
          numberOfLines={1}
          style={
            item.status !== 'closed'
              ? [globalStyles.subTitle]
              : [styles.itemTitleStrikeThrough, {color: theme.colors.secondary}]
          }>
          {item.title}
        </Text>
        {item.info && <Text style={globalStyles.textInfo}>{item.info}</Text>}
      </TouchableOpacity>
      <FloatingMenu id={item.id} options={options} iconName="menu-outline" />
    </Animated.View>
  );
};
const styles = StyleSheet.create({
  itemTitleStrikeThrough: {
    fontSize: 20,
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
});
