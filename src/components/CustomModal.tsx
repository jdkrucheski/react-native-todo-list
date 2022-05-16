import React from 'react';
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
import {themeColors} from '../../App';

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
  return (
    <Modal visible={isVisible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContend}>
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
            <Icon name="close-outline" color={themeColors.neutral3} size={38} />
          </TouchableOpacity>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.fromContainer}>
            <TextInput
              style={styles.input}
              onChangeText={value => onChange(value)}
              placeholderTextColor={themeColors.neutral3}
              placeholder={`Nombre de la ${title.toLocaleLowerCase()}`}
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
              style={styles.btn}>
              <Text style={styles.btnText}>Guardar</Text>
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
    backgroundColor: themeColors.secondary,
    elevation: 4,
    shadowColor: themeColors.neutral1,
    marginHorizontal: 20,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    width: '80%',
    color: themeColors.neutral1,
  },
  fromContainer: {
    flex: 1,
  },

  input: {
    paddingHorizontal: 10,
    fontSize: 18,
    marginTop: 16,
    borderRadius: 8,
    color: themeColors.neutral1,
    backgroundColor: themeColors.neutral2,
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
    backgroundColor: themeColors.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginVertical: 2,
    elevation: 2,
    shadowColor: themeColors.neutral1,
  },
  btnText: {
    fontSize: 18,
    marginLeft: 4,
    color: themeColors.neutral1,
  },
});
