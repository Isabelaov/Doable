import { View, Text } from 'react-native';
import React from 'react';
import {
  ButtonStyles,
  ContainerStyles,
  ModalStyles,
  TextStyles,
} from '../assets/styles';
import { colors } from '../assets/colors';
import { IconButton, Loading, RenderItem } from '../components';
import HabitModal from '../components/HabitModal';
import { useHabit } from '../hooks/useHabit';
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store/store';
import { open } from '../redux/reducers/modal-slice';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '../navigation/rootStack';

export default function HomeScreen() {
  const { habits, loading } = useHabit();
  const visible = useSelector((state: RootState) => state.visibility.visible);
  const habitId = useSelector((state: RootState) => state.visibility.habitId);
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<NavigationProps>();

  return (
    <GestureHandlerRootView style={ModalStyles.containerWithModal}>
      <View style={ContainerStyles.logOutContainer}>
        <IconButton
          family="Ionicons"
          name="person"
          color={colors.secondary}
          onPress={() => navigation.navigate('Profile')}
        />
      </View>

      <Text style={TextStyles.title}>Your Habits</Text>

      {loading ? (
        <Loading />
      ) : (
        <>
          <FlatList
            data={habits}
            extraData={habits}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => <RenderItem item={item} />}
          />

          <IconButton
            family="Ionicons"
            name="add"
            color={colors.primary}
            style={ButtonStyles('rgba(0,0,0,0.1)').addButton}
            onPress={() => {
              dispatch(open());
            }}
          />
        </>
      )}

      <HabitModal visible={visible} id={habitId} />
    </GestureHandlerRootView>
  );
}
