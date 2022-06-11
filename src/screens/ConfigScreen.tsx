import React, {useContext, useEffect, useState} from 'react';
import {
  Keyboard,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {FadeIn} from 'react-native-reanimated';
import {Contend} from '../components/Contend';
import {Header} from '../components/Header';
import {Loading} from '../components/Loading';
import {ThemeContext} from '../context/theme/themeContext';
import {useForm} from '../hooks/useForm';
import {
  editAccentColorService,
  editNameService,
  getPreferencesService,
} from '../services/preferences';
import Icon from 'react-native-vector-icons/Ionicons';

export const ConfigScreen = () => {
  const {theme, globalStyles, setColor, accentColor} = useContext(ThemeContext);

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

  const handleEditName = async () => {
    try {
      if (name !== '') {
        const res = await editNameService(data._id.toString(), name);
        if (typeof res !== 'string') {
          setPreferences({data: res, loading: false, error: ''});
          setColor(res.selectedColor);
        }
      }
    } catch (err) {
      setPreferences({
        data: {_id: {}, name: '', selectedColor: '', colors: ['']},
        loading: false,
        error: 'Ocurrió un error',
      });
    }
    Keyboard.dismiss();
  };
  const handleEditColor = async (selectedColor?: string) => {
    try {
      const res = await editAccentColorService(
        data._id.toString(),
        selectedColor ? selectedColor : color,
      );
      if (typeof res !== 'string') {
        setPreferences({data: res, loading: false, error: ''});
        setColor(res.selectedColor);
      }
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
        <StatusBar animated={true} backgroundColor={accentColor} />
        <Header
          title="Configuraciones"
          showBackButton={false}
          numberOfLines={1}
          ajustFontSize
        />
        <Contend>
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            style={[styles.title, {color: theme.colors.text}]}>
            ¿Cómo quieres que te llamemos?
          </Text>
          <View style={styles.fromContainer}>
            <View style={styles.inputItem}>
              <TextInput
                style={[
                  styles.input,
                  {backgroundColor: theme.colors.secondary},
                ]}
                onChangeText={value => onChange(value, 'name')}
                placeholderTextColor={theme.colors.neutral}
                placeholder={data.name}
                autoCorrect={false}
                autoCapitalize="sentences"
                keyboardType="default"
                value={name}
              />
              <TouchableOpacity
                onPress={() => handleEditName()}
                style={[
                  styles.saveButton,
                  {
                    backgroundColor: accentColor,

                    shadowColor: theme.colors.neutral,
                  },
                ]}>
                <Icon
                  name={'save-outline'}
                  color={theme.colors.secondary}
                  size={28}
                />
              </TouchableOpacity>
            </View>

            <Text
              numberOfLines={1}
              adjustsFontSizeToFit
              style={[styles.title, {color: theme.colors.text}]}>
              Elije el color que más te guste
            </Text>
            {data.colors.map((item, index) => (
              <View key={index} style={styles.inputItem}>
                {/* <TextInput
                  style={[
                    styles.input,
                    {backgroundColor: theme.colors.secondary},
                  ]}
                  onChangeText={value => onChange(value, 'color')}
                  placeholderTextColor={theme.colors.neutral}
                  placeholder={data.selectedColor}
                  autoCorrect={false}
                  autoCapitalize="sentences"
                  keyboardType="default"
                  value={color}
                /> */}
                <TouchableOpacity
                  onPress={() => handleEditColor(item)}
                  style={[
                    styles.colorContainer,
                    {backgroundColor: item, shadowColor: theme.colors.neutral},
                  ]}
                />
              </View>
            ))}
          </View>
        </Contend>
      </Animated.View>
    );
  }
};

const styles = StyleSheet.create({
  title: {
    marginVertical: 8,
    fontSize: 19,
    fontWeight: 'bold',
  },
  fromContainer: {
    flex: 1,
  },
  inputItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  input: {
    width: '85%',
    paddingHorizontal: 10,
    fontSize: 18,
    borderRadius: 8,
  },
  saveButton: {
    height: 48,
    width: 48,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  colorContainer: {
    width: '100%',
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    elevation: 4,
  },
});
