import { StyleSheet } from 'react-native';

export const ContainerStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 10,
  },

  bySide: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  singleCentered: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  next: {
    display: 'flex',
    flexDirection: 'row',
    marginHorizontal: 5,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  marginHorizontal: {
    marginHorizontal: 10,
  },
  marginVertical: { marginVertical: 30 },
  buttonEnd: {
    position: 'absolute',
    right: 5,
    top: 20,
  },
  logOutContainer: {
    width: '100%',
    position: 'absolute',
    top: 15,
    left: 10,
  },
});
