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

export const ConfigScreen = () => {
  // const navigation = useNavigation();
  const {data, loading, setLists} = useContext(ListsContext);
  const {theme, globalStyles} = useContext(ThemeContext);
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
      // eslint-disable-next-line react-hooks/exhaustive-deps
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

  // const handleDelete = (id: string) => {
  //   deleteList(id)
  //     .then(res => {
  //       res && setLists({data: res, loading: false, error: ''});
  //     })
  //     .catch(err => setLists({data: [], loading: false, error: err}));
  // };

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
        <Contend
          action={() => {
            setShowModal({showModal: true, type: 'NEW'});
          }}>
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
