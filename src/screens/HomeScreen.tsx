import { View } from 'react-native';
import React from 'react';
import { LogoutButton } from '../components/LogOutButton';
import { ButtonStyles, ContainerStyles, ModalStyles } from '../assets/styles';
import { colors } from '../assets/colors';
import { AddButton } from '../components';
import HabitModal from '../components/HabitModal';
import { useHabit } from '../hooks/useHabit';

export default function HomeScreen() {
  const { modalVisible, setModalVisible } = useHabit();

  return (
    <View style={ModalStyles.containerWithModal}>
      <View style={ContainerStyles.logOutContainer}>
        <LogoutButton />
      </View>

      <AddButton
        color={colors.primary}
        style={ButtonStyles('rgba(0,0,0,0.1)').addButton}
        onPress={() => {
          setModalVisible(true);
        }}
      />

      <HabitModal
        id={undefined}
        visible={modalVisible}
        setVisible={setModalVisible}
      />
    </View>
  );
}
