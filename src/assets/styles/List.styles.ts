import { StyleSheet } from 'react-native';
import { colors } from '../colors';

export const ListStyles = StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 5,
    marginVertical: 10,
    justifyContent: 'space-between',
    borderColor: colors.secondary,
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    marginBottom: 5,
  },
  right: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  left: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
  title: {
    fontSize: 19,
  },
  description: {
    fontSize: 15,
    fontStyle: 'italic',
  },
  icon: {
    marginLeft: 15,
  },
});
