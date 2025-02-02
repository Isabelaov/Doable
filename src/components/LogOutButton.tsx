import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { Loading } from './Loading';
import { useUser } from '../hooks/useUser';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const LogoutButton: React.FC<TouchableOpacityProps> = ({
  disabled = false,
  ...rest
}) => {
  const { logoutUser, submitting } = useUser();

  return (
    <TouchableOpacity
      disabled={disabled || submitting}
      onPress={logoutUser}
      {...rest}>
      {submitting ? <Loading /> : <Icon name="logout" size={30} />}
    </TouchableOpacity>
  );
};
