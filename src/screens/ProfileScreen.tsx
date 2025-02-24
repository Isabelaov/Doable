import { View } from 'react-native';
import React, { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useUser } from '../hooks';
import { Button, UserForm } from '../components';
import { ContainerStyles, FormStyles } from '../assets/styles';
import { CustomIcon } from '../components/Icon';
import { colors } from '../assets/colors';

export default function ProfileScreen() {
  const { user, getUser } = useUser();

  useEffect(() => {
    if (!user) {
      getUser();
    }
  });

  return (
    <GestureHandlerRootView style={FormStyles.updateContainer}>
      <View style={ContainerStyles.singleCentered}>
        <CustomIcon
          family="Ionicons"
          name="person"
          size={200}
          color={colors.secondary}
        />
      </View>

      <View style={ContainerStyles.marginVertical}>
        <UserForm user={user} />
      </View>

      <View style={ContainerStyles.bySide}>
        <Button text="Import Data" />
        <Button text="Export Data" />
      </View>
    </GestureHandlerRootView>
  );
}
