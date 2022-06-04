import React, {useContext, useEffect, useState} from 'react';
import {
  Keyboard,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Animated, {FadeIn} from 'react-native-reanimated';
import {Contend} from '../components/Contend';
import {Header} from '../components/Header';
import {Loading} from '../components/Loading';
import {ThemeContext} from '../context/theme/themeContext';
import {useForm} from '../hooks/useForm';
import {
  editPreferencesService,
  getPreferencesService,
} from '../services/preferences';

export const ConfigScreen = () => {
  const {theme, globalStyles} = useContext(ThemeContext);

  const {name, color, onChange} = useForm({name: '', color: ''});

  const [{data, loading}, setPreferences] = useState({
    data: {_id: {}, name: '', selectedColor: '', colors: ['']},
    loading: true,
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getPreferencesService();
        typeof res !== 'string' &&
          setPreferences({data: res, loading: false, error: ''});
      } catch (err) {
        setPreferences({
          data: {_id: {}, name: '', selectedColor: '', colors: ['']},
          loading: false,
          error: 'Ocurrió un error',
        });
      }
    };
    fetchData();
  }, []);

  const handleEdit = async () => {
    try {
      const res = await editPreferencesService(
        data._id.toString(),
        name,
        color,
      );
      typeof res !== 'string' &&
        setPreferences({data: res, loading: false, error: ''});
    } catch (err) {
      setPreferences({
        data: {_id: {}, name: '', selectedColor: '', colors: ['']},
        loading: false,
        error: 'Ocurrió un error',
      });
    }
    Keyboard.dismiss();
  };

  if (loading) {
    return (
      <View style={globalStyles.mainContainer}>
        <Loading />
      </View>
    );
  } else {
    return (
      <Animated.View style={globalStyles.mainContainer} entering={FadeIn}>
        <StatusBar animated={true} backgroundColor={theme.colors.accent} />
        <Header
          title="Configuraciones"
          showBackButton={false}
          numberOfLines={1}
          ajustFontSize
        />
        <Contend save={() => handleEdit()}>
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            style={[styles.title, {color: theme.colors.text}]}>
            ¿Cómo quieres que te llamemos?
          </Text>
          <View style={styles.fromContainer}>
            <TextInput
              style={[styles.input, {backgroundColor: theme.colors.secondary}]}
              onChangeText={value => onChange(value, 'name')}
              placeholderTextColor={theme.colors.neutral}
              placeholder={data.name}
              autoCorrect={false}
              autoCapitalize="sentences"
              keyboardType="default"
              value={name}
            />

            <Text
              numberOfLines={1}
              adjustsFontSizeToFit
              style={[styles.title, {color: theme.colors.text}]}>
              Elije un color que más te guste
            </Text>

            <TextInput
              style={[styles.input, {backgroundColor: data.selectedColor}]}
              onChangeText={value => onChange(value, 'color')}
              placeholderTextColor={theme.colors.neutral}
              placeholder={data.selectedColor}
              autoCorrect={false}
              autoCapitalize="sentences"
              keyboardType="default"
              value={color}
            />
            {data.colors.map((item, index) => (
              <Text key={index}>{item}</Text>
            ))}
          </View>
        </Contend>
      </Animated.View>
    );
  }
};

const styles = StyleSheet.create({
  title: {
    fontSize: 19,
    fontWeight: 'bold',
  },
  fromContainer: {
    flex: 1,
  },
  input: {
    paddingHorizontal: 10,
    fontSize: 18,
    marginTop: 8,
    marginBottom: 16,
    borderRadius: 8,
  },
});
