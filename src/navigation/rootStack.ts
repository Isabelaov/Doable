import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStack = {
  Login: any;
  Register: any;
  Home: any;
};

export type NavigationProps = NativeStackNavigationProp<RootStack>;
