import React from 'react';
import { TouchableOpacityProps, TouchableOpacity } from 'react-native';
import { colors } from '../assets/colors';
import { CustomIcon } from './Icon';

type Props = TouchableOpacityProps & {
  color?: string;
};

export function XButton({
  disabled = false,
  color = colors.secondary,
  ...rest
}: Props) {
  return (
    <TouchableOpacity disabled={disabled} {...rest}>
      <CustomIcon family="Feather" name="x" size={25} color={color} />
    </TouchableOpacity>
  );
}
