import { Alert, View } from 'react-native';
import React, { useState } from 'react';
import { LogoutButton } from '../components/LogOutButton';
import { ButtonStyles, ContainerStyles, ModalStyles } from '../assets/styles';
import { colors } from '../assets/colors';
import { AddButton } from '../components';

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);

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
          Alert.alert('UWU');
        }}
      />
    </View>
  );
}
