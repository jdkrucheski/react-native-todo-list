import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, StatusBar, TextInput, View, Keyboard} from 'react-native';
import {Header} from '../components/Header';
import {RootStackParams} from '../navigation/Stack';
import {StackScreenProps} from '@react-navigation/stack';
import Animated, {FadeIn, FadeInRight} from 'react-native-reanimated';
import {Contend} from '../components/Contend';
import {useForm} from '../hooks/useForm';
import {Loading} from '../components/Loading';
import {TodoInterface} from '../interfaces/AppInterfaces';
import {editTodo, getTodo} from '../services/todos';
import {TodosContext} from '../context/todos/todosContext';
import {ThemeContext} from '../context/theme/themeContext';
import i18n from '../../i18n.config';

interface Props extends StackScreenProps<RootStackParams, 'DetailScreen'> {}

export const DetailScreen = ({route}: Props) => {
  const {todoId, listId} = route.params;
  const [flag, setFlag] = useState(false);
  const [thisTodo, setThisTodo] = useState<TodoInterface>();
  const {setTodos} = useContext(TodosContext);
  const {theme, globalStyles, accentColor} = useContext(ThemeContext);

  const {notes, onChange} = useForm({
    notes: '',
  });

  useEffect(() => {
    getTodo(todoId).then(todo => {
      todo && setThisTodo(todo);
      todo && onChange(todo.notes, 'notes');
      setFlag(true);
    });
  }, []);

  const handleEdit = () => {
    getTodo(todoId).then(todo => {
      todo &&
        editTodo(listId, {...todo, notes: notes})
          .then(res => {
            const aux = res && res.find(t => t._id.toString() === todoId);
            aux && setThisTodo(aux);
            res && setTodos({data: res, loading: false, error: ''});
          })
          .catch(err => setTodos({data: [], loading: false, error: err}));
    });
    Keyboard.dismiss();
  };

  if (!flag) {
    return (
      <View style={globalStyles.mainContainer}>
        <Loading />
      </View>
    );
  } else {
    return (
      <Animated.View style={globalStyles.mainContainer} entering={FadeIn}>
        <StatusBar animated={true} backgroundColor={accentColor} />
        {thisTodo && (
          <Header
            title={thisTodo?.name}
            showBackButton
            isEditable
            status={
              thisTodo?.notes !== notes
                ? i18n.t('No guardado')
                : i18n.t('Guardado')
            }
          />
        )}
        <Animated.View
          entering={FadeInRight.delay(300)}
          style={[
            styles.fieldContainer,
            {
              justifyContent: 'flex-end',
              paddingHorizontal: 20,
              marginVertical: 0,
            },
          ]}
        />
        <Contend save={() => handleEdit()}>
          <TextInput
            style={globalStyles.inputText}
            multiline={true}
            onChangeText={value => onChange(value, 'notes')}
            placeholderTextColor={theme.colors.primary}
            placeholder={notes}
            value={notes}
            autoCorrect={false}
            autoCapitalize="none"
            keyboardType="default"
          />
        </Contend>
      </Animated.View>
    );
  }
};

const styles = StyleSheet.create({
  fieldContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
});
