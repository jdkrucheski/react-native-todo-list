import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, StatusBar, View} from 'react-native';
import {Header} from '../components/Header';
import {RootStackParams} from '../navigation/Stack';
import {StackScreenProps} from '@react-navigation/stack';
// import {RealmContext} from '../context/realm/realmContext';
import {themeColors} from '../../App';
import Animated, {FadeIn} from 'react-native-reanimated';
// import {useNavigation} from '@react-navigation/native';
// import {Contend} from '../components/Contend';
// import {List} from '../components/List';
import {Loading} from '../components/Loading';
import {TodosContext} from '../context/todos/todosContext';
import {
  deleteTodo,
  doneTodo,
  editTodo,
  getTodo,
  getTodos,
  newTodo,
} from '../services/todos';
import {Contend} from '../components/Contend';
import {List} from '../components/List';
import {useForm} from '../hooks/useForm';
import {CustomModal} from '../components/CustomModal';
import {useNavigation} from '@react-navigation/native';

interface Props extends StackScreenProps<RootStackParams, 'TodosScreen'> {}

export const TodosScreen = ({route}: Props) => {
  const navigation = useNavigation();
  const {listId, listName} = route.params;
  const {data, loading, setTodos} = useContext(TodosContext);
  const {formValue, onChange} = useForm({formValue: ''});
  const [toEditId, setToEditId] = useState('');
  const [{showModal, type}, setShowModal] = useState({
    showModal: false,
    type: 'NEW' as 'NEW' | 'EDIT',
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await getTodos(listId);
      res && setTodos({data: res, loading: false, error: ''});
    };
    fetchData().catch(err => setTodos({data: [], loading: false, error: err}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNew = (name: string) => {
    newTodo(listId, name)
      .then(res => {
        res && setTodos({data: res, loading: false, error: ''});
      })
      .catch(err => setTodos({data: [], loading: false, error: err}));
  };

  const handleEditName = () => {
    getTodo(toEditId).then(todo => {
      todo &&
        editTodo(listId, {...todo, name: formValue})
          .then(res => {
            res && setTodos({data: res, loading: false, error: ''});
          })
          .catch(err => setTodos({data: [], loading: false, error: err}));
    });
  };

  const handleDone = (id: string) => {
    doneTodo(listId, id)
      .then(res => {
        res && setTodos({data: res, loading: false, error: ''});
      })
      .catch(err => setTodos({data: [], loading: false, error: err}));
  };

  const handleDelete = (id: string) => {
    deleteTodo(listId, id)
      .then(res => {
        res && setTodos({data: res, loading: false, error: ''});
      })
      .catch(err => setTodos({data: [], loading: false, error: err}));
  };

  if (loading) {
    return (
      <View style={{flex: 1, backgroundColor: themeColors.accent}}>
        <Loading />
      </View>
    );
  } else {
    return (
      <Animated.View style={styles.mainContainer} entering={FadeIn}>
        <StatusBar animated={true} backgroundColor={themeColors.accent} />
        <Header
          title={listName}
          style={{width: '100%', height: 400}}
          showBackButton
        />
        <Contend
          action={() => {
            setShowModal({showModal: true, type: 'NEW'});
          }}>
          <List
            items={data.map(l => {
              return {
                id: l._id.toString(),
                iconName:
                  l.status === 'open' ? 'ellipse-outline' : 'checkmark-circle',
                title: l.name,
                status: l.status,
              };
            })}
            action={(id: string) => handleDone(id)}
            secondaryAction={(id: string) => {
              navigation.navigate(
                'DetailScreen' as never,
                {
                  todoId: id,
                  listId,
                } as never,
              );
            }}
            menuOptions={[
              {
                id: 0,
                name: 'Editar',
                iconName: 'build-outline',
                action: (id: string) => {
                  setToEditId(id);
                  const aux = data.find(l => l._id.toString() === id);
                  aux && onChange(aux?.name, 'formValue');
                  setShowModal({showModal: true, type: 'EDIT'});
                },
              },
              {
                id: 1,
                name: 'Eliminar',
                iconName: 'trash-outline',
                action: (id: string) => handleDelete(id),
              },
            ]}
          />
          <CustomModal
            type={type}
            title="Nueva tarea"
            isVisible={showModal}
            closeModal={() => setShowModal({showModal: false, type: 'NEW'})}
            onCreate={(value: string) => handleNew(value)}
            onEdit={() => handleEditName()}
            onChange={(value: string) => onChange(value, 'formValue')}
            formValue={formValue}
          />
        </Contend>
      </Animated.View>
    );
  }
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: themeColors.accent,
  },
});
