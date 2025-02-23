import { View, Text, ModalProps, Modal, TouchableOpacity } from 'react-native';
import React from 'react';
import { Field, Formik } from 'formik';
import { useHabit } from '../hooks/useHabit';
import {
  FrequencyPicker,
  Input,
  Loading,
  Button,
  TimePicker,
  CalendarModal,
} from '.';
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
import { AppDispatch } from '../redux/store/store';
import { useDispatch } from 'react-redux';
import { close } from '../redux/reducers/modal-slice';
import { CustomIcon } from './Icon';
import { colors } from '../assets/colors';
import { openCalendar } from '../redux/reducers/calendar-slice';

export type HabitModalProps = ModalProps & {
  id?: number;
};

export default function HabitModal({
  visible,
  id,
}: HabitModalProps): React.JSX.Element {
  const { loading, handleDelete, handleHabit, habits } = useHabit();
  const dispatch = useDispatch<AppDispatch>();

  const habit = habits.find(h => h.id === id);

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={ModalStyles.modalContainer}>
        <View style={ModalStyles.modalContent}>
          {loading ? (
            <Loading />
          ) : (
            <>
              <CancelButton
                style={ButtonStyles().cancelButton}
                onPress={() => dispatch(close())}
              />

              <Text style={TextStyles.title}>
                {id ? 'Update' : 'Add'} Habit
              </Text>

              <Formik
                validationSchema={habitValidationSchema}
                onSubmit={values => {
                  handleHabit(values, id);
                  dispatch(close());
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

                    <View
                      style={
                        id
                          ? ContainerStyles.bySide
                          : ContainerStyles.singleCentered
                      }>
                      <Field name="reminderTime" component={TimePicker} />

                      {id ? (
                        <TouchableOpacity
                          onPress={() => dispatch(openCalendar())}
                          style={ContainerStyles.marginHorizontal}>
                          <CustomIcon
                            name="calendar"
                            family="Entypo"
                            color={colors.secondary}
                          />
                        </TouchableOpacity>
                      ) : (
                        <></>
                      )}
                    </View>

                    <FrequencyPicker
                      onBlur={handleBlur('frequency')}
                      selectedValue={values.frequency}
                      onValueChange={handleChange('frequency')}
                    />

                    <View
                      style={
                        id
                          ? ContainerStyles.bySide
                          : ContainerStyles.singleCentered
                      }>
                      <Button
                        onPress={() => handleSubmit()}
                        text="Save"
                        backgroundPrimary
                        disabled={loading}
                      />

                      {id ? (
                        <Button
                          onPress={() => {
                            handleDelete(id);
                            dispatch(close());
                          }}
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
          <CalendarModal habit={habit} />
        </View>
      </View>
    </Modal>
  );
}
