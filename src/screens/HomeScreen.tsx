import { View, Text } from 'react-native';
import React from 'react';
import { LogoutButton } from '../components/LogOutButton';
import {
  ButtonStyles,
  ContainerStyles,
  ModalStyles,
  TextStyles,
} from '../assets/styles';
import { colors } from '../assets/colors';
import { AddButton, Loading, RenderItem } from '../components';
import HabitModal from '../components/HabitModal';
import { useHabit } from '../hooks/useHabit';
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store/store';
import { open } from '../redux/reducers/visibility-slice';

export default function HomeScreen() {
  const { habits, loading } = useHabit();
  const visible = useSelector((state: RootState) => state.visibility.visible);
  const habitId = useSelector((state: RootState) => state.visibility.habitId);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <GestureHandlerRootView style={ModalStyles.containerWithModal}>
      <View style={ContainerStyles.logOutContainer}>
        <LogoutButton />
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

          <AddButton
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
