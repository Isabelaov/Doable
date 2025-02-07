import { StyleSheet } from 'react-native';
import { colors } from '../colors';

export const ModalStyles = StyleSheet.create({
  containerWithModal: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    width: '90%',
    padding: 5,
    marginHorizontal: '5%',
  },
  modalContent: {
    backgroundColor: 'white',
    borderColor: colors.primary,
    borderWidth: 2,
    padding: 10,
    borderRadius: 15,
  },
});
