import { View } from 'react-native';
import React, { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useUser } from '../hooks';
import { Button, Loading, UserForm } from '../components';
import { ContainerStyles, FormStyles } from '../assets/styles';
import { CustomIcon } from '../components/Icon';
import { colors } from '../assets/colors';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store/store';

export default function ProfileScreen() {
  const { getUser, submitting } = useUser();
  const user = useSelector((state: RootState) => state.auth.user);

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
        {submitting ? <Loading /> : <UserForm />}
      </View>

      <View style={ContainerStyles.bySide}>
        <Button text="Import Data" />
        <Button text="Export Data" />
      </View>
    </GestureHandlerRootView>
  );
}
