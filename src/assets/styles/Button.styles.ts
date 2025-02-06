import { StyleSheet } from 'react-native';
import { colors } from '../colors';

export const ButtonStyles = (backgroundColor = colors.primary) =>
  StyleSheet.create({
    button: {
      padding: 5,
      borderRadius: 10,
      width: '40%',
      margin: 15,
      alignSelf: 'center',
      backgroundColor,
    },
    addButton: {
      backgroundColor,
      padding: 10,
      borderRadius: 20,
      position: 'absolute',
      right: 15,
      bottom: 15,
    },
    cancelButton: {
      padding: 10,
      borderRadius: 20,
      position: 'absolute',
      right: 0,
      top: 0,
    },
  });
