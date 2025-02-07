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
import { AddButton, Loading, renderItem } from '../components';
import HabitModal from '../components/HabitModal';
import { useHabit } from '../hooks/useHabit';
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler';

export default function HomeScreen() {
  const { habits, loading, modalVisible, setModalVisible } = useHabit();

  if (loading) {
    return <Loading />;
  }

  return (
    <GestureHandlerRootView style={ModalStyles.containerWithModal}>
      <View style={ContainerStyles.logOutContainer}>
        <LogoutButton />
      </View>

      <Text style={TextStyles.title}>Your Habits</Text>

      <HabitModal
        id={undefined}
        visible={modalVisible}
        setVisible={setModalVisible}
      />

      <FlatList
        data={habits}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        style={{}}
      />

      <AddButton
        color={colors.primary}
        style={ButtonStyles('rgba(0,0,0,0.1)').addButton}
        onPress={() => {
          setModalVisible(true);
        }}
      />
    </GestureHandlerRootView>
  );
}
