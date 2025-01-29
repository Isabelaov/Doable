import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { CustomIcon } from './Icon';
import { Loading } from './Loading';
import { useUser } from '../hooks/useUser';

export const LogoutButton: React.FC<TouchableOpacityProps> = ({
  disabled = false,
  ...rest
}) => {
  const { logout, submitting } = useUser();

  return (
    <TouchableOpacity
      disabled={disabled || submitting}
      onPress={logout}
      {...rest}>
      {submitting ? (
        <Loading />
      ) : (
        <CustomIcon family="AntDesign" name="logout" size={30} />
      )}
    </TouchableOpacity>
  );
};
