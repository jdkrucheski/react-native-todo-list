import React, {useContext} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
// import Animated, {FadeInRight} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';
import {ThemeContext} from '../context/theme/themeContext';

interface Props {
  type: 'NEW' | 'EDIT';
  title: string;
  isVisible?: boolean;
  closeModal: () => void;
  onCreate: (name: string) => void;
  onEdit: () => void;
  onChange: (name: string) => void;
  formValue: string;
}

export const CustomModal = ({
  type,
  title,
  isVisible,
  closeModal,
  onCreate,
  onEdit,
  onChange,
  formValue,
}: Props) => {
  const {theme, accentColor} = useContext(ThemeContext);
  const {t} = useTranslation();
  return (
    <Modal visible={isVisible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View
          style={[
            styles.modalContend,
            {
              backgroundColor: theme.colors.primary,
              shadowColor: theme.colors.neutral,
            },
          ]}>
          <TouchableOpacity
            onPress={() => {
              closeModal();
              onChange('');
            }}
            style={{
              height: 48,
              alignItems: 'flex-end',
              justifyContent: 'center',
            }}>
            <Icon name="close-outline" color={theme.colors.neutral} size={38} />
          </TouchableOpacity>
          <Text style={[styles.title, {color: theme.colors.text}]}>
            {title}
          </Text>
          <View style={styles.fromContainer}>
            <TextInput
              style={[styles.input, {backgroundColor: theme.colors.secondary}]}
              onChangeText={value => onChange(value)}
              placeholderTextColor={theme.colors.neutral}
              placeholder={`${t('Nombre de la')} ${title.toLocaleLowerCase()}`}
              autoCorrect={false}
              autoCapitalize="sentences"
              keyboardType="default"
              value={formValue}
            />
          </View>
          <View style={styles.btnContainer}>
            <TouchableOpacity
              onPress={() => {
                if (formValue !== '') {
                  type === 'NEW' ? onCreate(formValue) : onEdit();
                  closeModal();
                  onChange('');
                }
              }}
              style={[
                styles.btn,
                {
                  backgroundColor: accentColor,
                  shadowColor: theme.colors.neutral,
                },
              ]}>
              <Text style={[styles.btnText, {color: theme.colors.text}]}>
                {t('Guardar')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContend: {
    borderTopEndRadius: 18,
    borderTopStartRadius: 18,
    minHeight: 240,
    elevation: 4,
    marginHorizontal: 20,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    width: '80%',
  },
  fromContainer: {
    flex: 1,
  },
  input: {
    paddingHorizontal: 10,
    fontSize: 18,
    marginTop: 16,
    borderRadius: 8,
  },
  btnContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  btn: {
    width: 96,
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginVertical: 2,
    elevation: 2,
  },
  btnText: {
    fontSize: 18,
    marginLeft: 4,
  },
});
