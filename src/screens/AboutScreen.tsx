import React from 'react';
import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {themeColors} from '../../App';
import {socialMedia} from '../data/menuItems';

export const AboutScreen = () => {
  const loadInBrowser = (url: string) => {
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };

  return (
    <View style={{flex: 1, padding: 20}}>
      <View style={styles.container}>
        <Image
          source={require('../../android/app/src/main/res/mipmap-xxhdpi/ic_launcher_round.png')}
        />
        <View style={styles.textContainer}>
          <Text style={{fontSize: 18, color: themeColors.white}}>
            Desarrollado por{' '}
          </Text>
          <Text
            style={{
              fontSize: 18,
              textDecorationLine: 'underline',
              color: themeColors.accent,
            }}
            onPress={() =>
              loadInBrowser('https://www.linkedin.com/in/jkrucheski/')
            }>
            JKrucheski
          </Text>
        </View>
      </View>

      <View style={styles.socialMediaContainer}>
        {socialMedia.map(sm => (
          <TouchableOpacity
            key={sm.name}
            style={styles.btn}
            activeOpacity={0.8}
            onPress={() => loadInBrowser(sm.link)}>
            <Icon name={sm.icon} color={themeColors.white} size={24} />
            <Text style={styles.text}>{sm.text}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: themeColors.primary,
    borderRadius: 8,
    padding: 10,
    marginTop: 24,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 18,
    marginBottom: 4,
  },
  socialMediaContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  btn: {
    width: '100%',
    height: 54,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: themeColors.primary,
    borderRadius: 8,
    padding: 10,
    marginVertical: 4,
  },

  text: {
    flex: 1,
    fontSize: 18,
    marginLeft: 12,
    color: themeColors.white,
  },
});
