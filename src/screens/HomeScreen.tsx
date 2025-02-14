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
import { AddButton, ItemContent, Loading, renderItem } from '../components';
import HabitModal from '../components/HabitModal';
import { useHabit } from '../hooks/useHabit';
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler';

export default function HomeScreen() {
  const {
    habits,
    loading,
    modalVisible,
    habitId,
    setModalVisible,
    setHabitId,
  } = useHabit();

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
                onPress={() => {
                  setModalVisible(true);
                  setHabitId(item.id);
                }}>
                <ItemContent item={item} />
              </TouchableOpacity>
            )}
            style={{}}
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
