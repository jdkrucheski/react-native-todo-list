import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {FloatingMenu} from './FloatingMenu';
import Icon from 'react-native-vector-icons/Ionicons';
import {themeColors} from '../../App';
import Animated, {FadeInRight, FadeInLeft} from 'react-native-reanimated';
import {Item, MenuOption} from '../interfaces/AppInterfaces';

interface Props {
  index: number;
  action?: (id: string, name?: string) => void;
  secondaryAction?: (id: string) => void;
  item: Item;
  options: MenuOption[];
}

export const ListItems = ({item, action, options, secondaryAction}: Props) => {
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
        borderBottomColor: themeColors.neutral2,
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
            item.status !== 'closed'
              ? themeColors.primary
              : themeColors.neutral2
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
              ? styles.itemTitle
              : styles.itemTitleStrikeThrough
          }>
          {item.title}
        </Text>
        {item.subTitle && (
          <Text style={styles.itemSubTitle}>{item.subTitle}</Text>
        )}
      </TouchableOpacity>
      <FloatingMenu id={item.id} options={options} iconName="menu-outline" />
    </Animated.View>
  );
};
const styles = StyleSheet.create({
  itemTitle: {
    color: themeColors.neutral1,
    fontSize: 20,
  },
  itemTitleStrikeThrough: {
    color: themeColors.neutral2,
    fontSize: 20,
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
  itemSubTitle: {
    fontSize: 16,
    color: themeColors.neutral3,
  },
});
