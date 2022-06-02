import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, StatusBar, TextInput, View, Keyboard} from 'react-native';
import {Header} from '../components/Header';
import {RootStackParams} from '../navigation/Stack';
import {StackScreenProps} from '@react-navigation/stack';
import {themeColors} from '../../App';
import Animated, {FadeIn, FadeInRight} from 'react-native-reanimated';
import {Contend} from '../components/Contend';
import {useForm} from '../hooks/useForm';
import {Loading} from '../components/Loading';
import {TodoInterface} from '../interfaces/AppInterfaces';
import {editTodo, getTodo} from '../services/todos';
import {TodosContext} from '../context/todos/todosContext';

interface Props extends StackScreenProps<RootStackParams, 'DetailScreen'> {}

export const DetailScreen = ({route}: Props) => {
  const {todoId, listId} = route.params;
  const [flag, setFlag] = useState(false);
  const [thisTodo, setThisTodo] = useState<TodoInterface>();
  const {setTodos} = useContext(TodosContext);

  const {notes, onChange} = useForm({
    notes: '',
  });

  useEffect(() => {
    getTodo(todoId).then(todo => {
      todo && setThisTodo(todo);
      todo && onChange(todo.notes, 'notes');
      setFlag(true);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <View style={{flex: 1, backgroundColor: themeColors.accent}}>
        <Loading />
      </View>
    );
  } else {
    return (
      <Animated.View style={styles.mainContainer} entering={FadeIn}>
        <StatusBar animated={true} backgroundColor={themeColors.accent} />
        {thisTodo && (
          <Header
            title={thisTodo?.name}
            showBackButton
            isEditable
            status={thisTodo?.notes !== notes ? 'No guardado' : 'GUARDADO'}
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
            style={styles.inputText}
            multiline={true}
            onChangeText={value => onChange(value, 'notes')}
            placeholderTextColor={themeColors.primary}
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
  mainContainer: {
    flex: 1,
  },
  btnContainer: {
    flex: 4,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 30,
  },
  btn: {
    width: 130,
    height: 60,
    borderRadius: 8,
    marginHorizontal: 10,
    backgroundColor: themeColors.accent,
    justifyContent: 'center',
    shadowColor: themeColors.accent,
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,
    elevation: 6,
  },
  btnText: {
    textAlign: 'center',
    color: themeColors.white,
    fontSize: 24,
    fontWeight: '500',
  },
  fieldContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  inputText: {
    maxHeight: '60%',
    paddingHorizontal: 10,
    fontSize: 28,
    marginTop: 16,
    borderRadius: 8,
    color: themeColors.white,
    backgroundColor: themeColors.secondary,
  },
});
