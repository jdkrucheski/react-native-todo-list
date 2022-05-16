import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {TodosScreen} from '../screens/TodosScreen';
import {ListsScreen} from '../screens/ListsScreen';
import {DetailScreen} from '../screens/DetailScreen';

export type RootStackParams = {
  ListsScreen: undefined;
  TodosScreen: {
    listId: string;
    listName: string;
  };
  DetailScreen: {
    todoId: string;
    listId: string;
  };
  NewItemScreen: {
    type: 'category' | 'task' | 'edit';
    listId: string;
    todoId: string;
  };
};

const Stack = createStackNavigator<RootStackParams>();

export const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="ListsScreen"
        component={ListsScreen}
        options={{
          title: 'Main',
          transitionSpec: {
            open: {
              animation: 'spring',
              config: {
                stiffness: 1000,
                overshootClamping: true,
                // restDisplacementThreshold: 0.01,
                // restSpeedThreshold: 0.01,
              },
            },
            close: {
              animation: 'spring',
              config: {
                stiffness: 500,
                overshootClamping: true,
                // restDisplacementThreshold: 0.01,
                // restSpeedThreshold: 0.01,
              },
            },
          },
        }}
      />
      <Stack.Screen
        name="TodosScreen"
        options={{
          title: 'List',
          transitionSpec: {
            open: {
              animation: 'spring',
              config: {
                stiffness: 1000,
                overshootClamping: true,
                // restDisplacementThreshold: 0.01,
                // restSpeedThreshold: 0.01,
              },
            },
            close: {
              animation: 'spring',
              config: {
                stiffness: 500,
                overshootClamping: true,
                // restDisplacementThreshold: 0.01,
                // restSpeedThreshold: 0.01,
              },
            },
          },
        }}
        component={TodosScreen}
      />
      <Stack.Screen
        name="DetailScreen"
        component={DetailScreen}
        options={{
          title: 'Detail',
          transitionSpec: {
            open: {
              animation: 'spring',
              config: {
                stiffness: 1000,
                overshootClamping: true,
                // restDisplacementThreshold: 0.01,
                // restSpeedThreshold: 0.01,
              },
            },
            close: {
              animation: 'spring',
              config: {
                stiffness: 500,
                overshootClamping: true,
                // restDisplacementThreshold: 0.01,
                // restSpeedThreshold: 0.01,
              },
            },
          },
        }}
      />
    </Stack.Navigator>
  );
};
