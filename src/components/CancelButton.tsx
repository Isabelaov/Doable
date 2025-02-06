import { TouchableOpacityProps, TouchableOpacity } from 'react-native';
import React from 'react';
import { CustomIcon } from './Icon';
import { colors } from '../assets/colors';

type Props = TouchableOpacityProps & {
  color?: string;
};

export default function CancelButton({
  disabled = false,
  color = colors.secondary,
  ...rest
}: Props) {
  return (
    <TouchableOpacity disabled={disabled} {...rest}>
      <CustomIcon
        family="MaterialIcons"
        name="cancel"
        size={30}
        color={color}
      />
    </TouchableOpacity>
  );
}
