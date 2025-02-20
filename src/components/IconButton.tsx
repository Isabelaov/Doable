import {
  View,
  Text,
  TouchableOpacityProps,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { colors } from '../assets/colors';
import { CustomIcon, FamilyType } from './Icon';

type Props = TouchableOpacityProps & {
  color?: string;
  family: FamilyType;
  name: string;
  size?: number;
};

export function IconButton({
  disabled = false,
  family,
  name,
  size,
  color = colors.primary,
  ...rest
}: Props) {
  return (
    <TouchableOpacity disabled={disabled} {...rest}>
      <CustomIcon family={family} name={name} size={size || 30} color={color} />
    </TouchableOpacity>
  );
}
