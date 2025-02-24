import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { FormStyles, TextStyles } from '../assets/styles';
import { UserForm } from '../components';
import { colors } from '../assets/colors';
import { useUser } from '../hooks';

export const RegisterScreen = () => {
  const { submitting } = useUser();

  return (
    <View style={FormStyles.registerContainer}>
      <Text style={TextStyles.titleSecondary}>
        Get <Text style={TextStyles.title}>Started</Text>
      </Text>

      {submitting ? (
        <ActivityIndicator size="large" color={colors.primary} />
      ) : (
        <UserForm />
      )}
    </View>
  );
};
