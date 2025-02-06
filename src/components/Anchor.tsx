import React from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { Loading } from '.';
import { TextStyles } from '../assets/styles';

type AnchorProps = TouchableOpacityProps & {
  text: string;
  isLoading?: boolean;
  disabled?: boolean;
};

export const Anchor: React.FC<AnchorProps> = ({
  text,
  isLoading = false,
  ...props
}) => {
  return (
    <TouchableOpacity disabled={isLoading} {...props}>
      {isLoading ? (
        <Loading size="small" />
      ) : (
        <Text style={TextStyles.anchorText}>{text}</Text>
      )}
    </TouchableOpacity>
  );
};
