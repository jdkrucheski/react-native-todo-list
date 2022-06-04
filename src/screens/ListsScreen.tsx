import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useCallback, useContext, useState} from 'react';
import {StatusBar, View} from 'react-native';
import Animated, {FadeIn} from 'react-native-reanimated';
import {Contend} from '../components/Contend';
import {CustomModal} from '../components/CustomModal';
import {Header} from '../components/Header';
import {List} from '../components/List';
import {Loading} from '../components/Loading';
import {ListsContext} from '../context/lists/listsContext';
import {ThemeContext} from '../context/theme/themeContext';
import {useForm} from '../hooks/useForm';
import {deleteList, editList, getLists, newList} from '../services/lists';

export const ListsScreen = () => {
  const navigation = useNavigation();
  const {data, loading, setLists} = useContext(ListsContext);
  const {accentColor, globalStyles} = useContext(ThemeContext);
  const {formValue, onChange} = useForm({formValue: ''});
  const [toEditId, setToEditId] = useState('');
  const [{showModal, type}, setShowModal] = useState({
    showModal: false,
    type: 'NEW' as 'NEW' | 'EDIT',
  });

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        const res = await getLists();
        res && setLists({data: res, loading: false, error: ''});
      };
      fetchData().catch(err =>
        setLists({data: [], loading: false, error: err}),
      );

      return () => {
        // console.log('Screen was unfocused');
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, []),
  );

  const handleNew = (name: string) => {
    newList(name)
      .then(res => {
        res && setLists({data: res, loading: false, error: ''});
      })
      .catch(err => setLists({data: [], loading: false, error: err}));
  };

  const handleEdit = () => {
    editList(toEditId, formValue)
      .then(res => {
        res && setLists({data: res, loading: false, error: ''});
      })
      .catch(err => setLists({data: [], loading: false, error: err}));
  };

  const handleDelete = (id: string) => {
    deleteList(id)
      .then(res => {
        res && setLists({data: res, loading: false, error: ''});
      })
      .catch(err => setLists({data: [], loading: false, error: err}));
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
        <Header title="Categorías" showBackButton={false} />
        <Contend
          action={() => {
            setShowModal({showModal: true, type: 'NEW'});
          }}>
          <List
            items={data.map(l => {
              return {
                id: l._id.toString(),
                iconName: 'at-circle-outline',
                title: l.name,
                info: `Tareas completas: ${
                  l.todos?.filter(t => t.status === 'closed').length
                }/${l.todos?.length}`,
              };
            })}
            action={(id: string, name?: string) => {
              navigation.navigate(
                'TodosScreen' as never,
                {
                  listId: id,
                  listName: name,
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
            title="Nueva categoría"
            isVisible={showModal}
            closeModal={() => setShowModal({showModal: false, type: 'NEW'})}
            onCreate={(value: string) => handleNew(value)}
            onEdit={() => handleEdit()}
            onChange={(value: string) => onChange(value, 'formValue')}
            formValue={formValue}
          />
        </Contend>
      </Animated.View>
    );
  }
};
