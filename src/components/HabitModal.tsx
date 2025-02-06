import { View, Text, ModalProps, Modal } from 'react-native';
import React from 'react';
import { Field, Formik } from 'formik';
import { useHabit } from '../hooks/useHabit';
import { FrequencyPicker, Input, Loading, Button, TimePicker } from '.';
import {
  ModalStyles,
  TextStyles,
  ContainerStyles,
  ButtonStyles,
} from '../assets/styles';
import habitValidationSchema from '../utils/validation/habit.validation';
import { Frequencies } from '../../core/enums/frequency.enum';
import CancelButton from './CancelButton';
import parseTime from '../utils/parsing/parseTime';
import { Habit } from '../../core/domain/entities/habit.entity';

export type HabitModalProps = ModalProps & {
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  id: number | undefined | null;
  habit?: Habit;
};

export default function HabitModal({
  visible,
  setVisible,
  id,
  habit,
}: HabitModalProps): React.JSX.Element {
  const { loading, handleDelete, handleHabit } = useHabit();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={() => {
        setVisible(false);
        return;
      }}>
      <View style={ModalStyles.modalContainer}>
        <View style={ModalStyles.modalContent}>
          {loading ? (
            <Loading />
          ) : (
            <>
              <CancelButton
                style={ButtonStyles().cancelButton}
                onPress={() => {
                  setVisible(false);
                  return;
                }}
              />

              <Text style={TextStyles.title}>
                {id ? 'Update' : 'Add'} Habit
              </Text>

              <Formik
                validationSchema={habitValidationSchema}
                onSubmit={values => {
                  handleHabit(values, id);
                  setVisible(false);
                }}
                initialValues={{
                  name: habit?.name || '',
                  description: habit?.description || '',
                  frequency: habit?.frequency || Frequencies.daily,
                  reminderTime: habit?.reminderTime || parseTime(new Date()),
                }}>
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  errors,
                  touched,
                }) => (
                  <>
                    <Input
                      placeholder="Name"
                      onChangeText={handleChange('name')}
                      onBlur={handleBlur('name')}
                      value={values.name}
                      error={touched.name ? errors.name : undefined}
                    />

                    <Input
                      placeholder="Description"
                      onChangeText={handleChange('description')}
                      onBlur={handleBlur('name')}
                      value={values.description}
                      error={
                        touched.description ? errors.description : undefined
                      }
                    />

                    <Field name="reminderTime" component={TimePicker} />

                    <FrequencyPicker
                      onBlur={handleBlur('frequency')}
                      selectedValue={values.frequency}
                      onValueChange={handleChange('frequency')}
                    />

                    <View style={ContainerStyles.bySide}>
                      <Button
                        onPress={() => handleSubmit()}
                        text="Save"
                        backgroundPrimary={false}
                        disabled={loading}
                      />

                      {id ? (
                        <Button
                          onPress={() => handleDelete(id)}
                          backgroundPrimary={false}
                          text="Delete"
                          disabled={loading}
                        />
                      ) : (
                        <></>
                      )}
                    </View>
                  </>
                )}
              </Formik>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
}
