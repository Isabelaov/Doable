import { View, Text } from 'react-native';
import React from 'react';
import { LogoutButton } from '../components/LogOutButton';

export default function HomeScreen() {
  return (
    <View>
      <Text>HomeScreen</Text>
      <LogoutButton />
    </View>
  );
}
