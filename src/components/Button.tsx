import React from 'react';
import { TouchableOpacityProps, TouchableOpacity, Text } from 'react-native';
import { colors } from '../assets/colors';
import { Loading } from './Loading';
import { ButtonStyles } from '../assets/styles/Button.styles';
import { TextStyles } from '../assets/styles/Text.styles';

type ButtonProps = TouchableOpacityProps & {
  text: string;
  isLoading?: boolean;
  disabled?: boolean;
  backgroundPrimary?: boolean;
};

export const Button: React.FC<ButtonProps> = ({
  text,
  isLoading = false,
  disabled = false,
  backgroundPrimary = true,
  ...rest
}) => {
  return (
    <TouchableOpacity
      style={
        ButtonStyles(backgroundPrimary ? colors.primary : colors.secondary)
          .button
      }
      disabled={disabled || isLoading}
      {...rest}>
      {isLoading ? (
        <Loading />
      ) : (
        <Text style={TextStyles.buttonText}>{text}</Text>
      )}
    </TouchableOpacity>
  );
};
