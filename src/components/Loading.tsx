import React, {useContext, useEffect} from 'react';
import {StatusBar, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  cancelAnimation,
  Easing,
} from 'react-native-reanimated';
import {ThemeContext} from '../context/theme/themeContext';

export const Loading = () => {
  const {theme} = useContext(ThemeContext);

  const rotation = useSharedValue(0);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotateZ: `${rotation.value}deg`,
        },
      ],
    };
  }, [rotation.value]);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 1000,
        easing: Easing.linear,
      }),
      200,
    );
    return () => cancelAnimation(rotation);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        backgroundColor: theme.colors.primary,
      }}>
      <StatusBar animated={true} backgroundColor={theme.colors.primary} />

      <Animated.View
        style={[
          {
            height: 60,
            width: 60,
            borderRadius: 30,
            borderWidth: 7,
            borderTopColor: theme.colors.secondary,
            borderRightColor: theme.colors.secondary,
            borderBottomColor: theme.colors.secondary,
            borderLeftColor: theme.colors.primary,
          },
          animatedStyles,
        ]}
      />
    </View>
  );
};
