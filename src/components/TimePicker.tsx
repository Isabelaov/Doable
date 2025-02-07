import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { FieldProps, FormikProps } from 'formik';
import { ContainerStyles, TextStyles } from '../assets/styles';
import parseTime from '../utils/parsing/parseTime';
import { CustomIcon } from './Icon';

type TimePickerFieldProps = {
  field: FieldProps['field'];
  form: FormikProps<any>;
};

export function TimePicker({ field, form }: TimePickerFieldProps) {
  const [showPicker, setShowPicker] = useState(false);
  console.log({ value: field.value });

  const handleTimeChange = (
    event: DateTimePickerEvent,
    selectedTime = new Date(),
  ) => {
    setShowPicker(false);

    if (event.type === 'set') {
      const formattedTime = parseTime(selectedTime);
      form.setFieldValue(field.name, formattedTime);
    }
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() => setShowPicker(true)}
        style={ContainerStyles.next}>
        <CustomIcon name="clock" family="Feather" />
        <Text style={TextStyles.time}>
          {field.value || parseTime(new Date())}
        </Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          mode="time"
          onChange={handleTimeChange}
          value={new Date()}
          display="default"
        />
      )}

      {form.touched[field.name] && form.errors[field.name] && (
        <Text style={TextStyles.error}>
          {form.errors[field.name]?.toString()}
        </Text>
      )}
    </View>
  );
}
