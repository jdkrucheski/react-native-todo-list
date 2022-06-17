import {useNavigation} from '@react-navigation/native';
import React, {useContext} from 'react';
import {
  ImageStyle,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {FadeInRight} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';
import {ThemeContext} from '../context/theme/themeContext';

interface Props {
  title: string;
  numberOfLines?: number;
  ajustFontSize?: boolean;
  isEditable?: boolean;
  status?: string;
  style?: StyleProp<ImageStyle>;
  showBackButton?: boolean;
}

export const Header = ({
  title,
  numberOfLines,
  ajustFontSize,
  showBackButton = true,
  status = 'GUARDADO',
}: Props) => {
  const {theme, globalStyles} = useContext(ThemeContext);

  const navigation = useNavigation();
  return (
    <Animated.View entering={FadeInRight.delay(300)} style={styles.container}>
      <View style={styles.status}>
        {status !== 'GUARDADO' && (
          <Text style={{color: '#E45826', fontWeight: '700', marginRight: 18}}>
            {status.toUpperCase()}
          </Text>
        )}
      </View>
      <View style={styles.titleContainer}>
        {showBackButton && (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              height: 48,
              width: 48,
              alignItems: 'center',
              flexDirection: 'row',
              paddingTop: 3,
            }}>
            <Icon
              name="chevron-back-outline"
              color={theme.colors.neutral}
              size={34}
            />
          </TouchableOpacity>
        )}

        <Text
          numberOfLines={numberOfLines}
          adjustsFontSizeToFit={ajustFontSize}
          style={{...globalStyles.title, paddingLeft: showBackButton ? 0 : 10}}>
          {title}
        </Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 180,
    paddingTop: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  titleContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  status: {
    width: '100%',
    height: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
});
