import { StyleSheet } from 'react-native';
import { colors } from '../colors';

export const TextStyles = StyleSheet.create({
  error: {
    margin: 5,
    fontSize: 20,
    color: '#b24242',
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    margin: 15,
    textAlign: 'center',
  },
  titleSecondary: {
    color: colors.secondary,
    margin: 15,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
  buttonText: {
    fontSize: 20,
    textAlign: 'center',
    color: colors.buttonText,
  },
  anchorText: {
    fontSize: 15,
    textAlign: 'center',
    color: colors.secondary,
  },
  normal: {
    color: 'black',
    fontSize: 17,
  },
  time: {
    fontSize: 17,
    marginLeft: 5,
  },
  inline: {
    fontSize: 18,
  },
  graph: {
    color: colors.secondary,
    fontSize: 20,
    textAlign: 'center',
  },
  graphLabel: {
    color: 'black',
    fontSize: 17,
    marginHorizontal: 5,
  },
});
