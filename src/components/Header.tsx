import {useNavigation} from '@react-navigation/native';
import React from 'react';
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
import {themeColors} from '../../App';

interface Props {
  title: string;
  isEditable?: boolean;
  status?: string;
  style?: StyleProp<ImageStyle>;
  showBackButton?: boolean;
}

export const Header = ({
  title,
  showBackButton = true,
  status = 'GUARDADO',
}: Props) => {
  const navigation = useNavigation();
  return (
    <Animated.View entering={FadeInRight.delay(300)} style={styles.container}>
      <View style={styles.status}>
        {status !== 'GUARDADO' && (
          <Text style={{color: '#E45826', fontWeight: '700'}}>
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
              color={themeColors.white}
              size={34}
            />
          </TouchableOpacity>
        )}

        <Text
          numberOfLines={2}
          style={{...styles.title, paddingLeft: showBackButton ? 0 : 10}}>
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
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    width: '80%',
    color: themeColors.white,
  },
  status: {
    width: '100%',
    height: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
});
