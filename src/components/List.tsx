import React from 'react';
import {FlatList} from 'react-native';
import Animated, {FadeInRight} from 'react-native-reanimated';
import {Item, MenuOption} from '../interfaces/AppInterfaces';
import {ListItems} from './ListItems';

interface Props {
  items: Item[];
  action?: (id: string, name?: string) => void;
  secondaryAction?: (id: string) => void;
  footerAction?: (id?: string) => void;
  menuOptions: MenuOption[];
}
export const List = ({items, menuOptions, action, secondaryAction}: Props) => {
  return (
    <FlatList
      data={items}
      style={{flex: 1}}
      showsVerticalScrollIndicator={false}
      keyExtractor={item => item.id}
      renderItem={({item, index}) => (
        <ListItems
          item={item}
          index={index}
          options={menuOptions}
          action={action}
          secondaryAction={secondaryAction}
        />
      )}
      ItemSeparatorComponent={() => (
        <Animated.View
          style={{
            marginTop: 8,
          }}
          entering={FadeInRight}
        />
      )}
    />
  );
};
