import { View, NativeSyntheticEvent, TargetedEvent } from 'react-native';
import React from 'react';
import { Picker } from '@react-native-picker/picker';
import { colors } from '../assets/colors';
import { PickerStyles } from '../assets/styles';
import { Frequencies } from '../../core/enums/frequency.enum';

type Props = {
  onBlur?: (e: NativeSyntheticEvent<TargetedEvent>) => void;
  selectedValue?: any;
  onValueChange?: (itemValue: any, itemIndex: number) => void;
};

export function FrequencyPicker({
  onBlur,
  selectedValue,
  onValueChange,
}: Props) {
  return (
    <View style={PickerStyles.pickerContainer}>
      <Picker
        onBlur={onBlur}
        mode="dropdown"
        dropdownIconColor={colors.primary}
        style={PickerStyles.picker}
        selectedValue={selectedValue}
        onValueChange={onValueChange}>
        {Object.values(Frequencies).map(frequency => (
          <Picker.Item
            style={PickerStyles.pickerItem}
            key={frequency}
            label={frequency}
            value={frequency}
          />
        ))}
      </Picker>
    </View>
  );
}
