import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { LogoutButton } from '../components/LogOutButton';
import {
  ButtonStyles,
  ContainerStyles,
  ListStyles,
  ModalStyles,
  TextStyles,
} from '../assets/styles';
import { colors } from '../assets/colors';
import { AddButton, ItemContent, Loading } from '../components';
import HabitModal from '../components/HabitModal';
import { useHabit } from '../hooks/useHabit';
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler';
import { useProgress } from '../hooks';

export default function HomeScreen() {
  const {
    habits,
    loading,
    modalVisible,
    habitId,
    setModalVisible,
    setHabitId,
    loadHabits,
  } = useHabit();

  const { addProgress } = useProgress();

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
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={ListStyles.item}
                onLongPress={() => {
                  addProgress(item.id);
                  loadHabits();
                }}
                onPress={() => {
                  setModalVisible(true);
                  setHabitId(item.id);
                }}>
                <ItemContent item={item} />
              </TouchableOpacity>
            )}
          />

          <AddButton
            color={colors.primary}
            style={ButtonStyles('rgba(0,0,0,0.1)').addButton}
            onPress={() => {
              setModalVisible(true);
            }}
          />
        </>
      )}

      <HabitModal
        visible={modalVisible}
        setVisible={setModalVisible}
        id={habitId}
        setHabitId={setHabitId}
      />
    </GestureHandlerRootView>
  );
}
