import { View, Text, ModalProps } from 'react-native';
import React from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStack } from '../navigation/rootStack';

type NavigationProp = NativeStackNavigationProp<RootStack, 'Home'>;

export type ItemModalProps = ModalProps & {
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  navigation: NavigationProp;
  itemId: number | undefined | null;
  setItemId: React.Dispatch<React.SetStateAction<number | undefined>>;
};

export default function HabitModal() {
  return (
    <View>
      <Text>HabitModal</Text>
    </View>
  );
}
