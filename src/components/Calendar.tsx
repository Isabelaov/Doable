import { Modal, View } from 'react-native';
import React from 'react';
import { AppDispatch, RootState } from '../redux/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { ButtonStyles, ModalStyles } from '../assets/styles';
import { Calendar } from 'react-native-calendars';
import { closeCalendar } from '../redux/reducers/calendar-slice';
import { colors } from '../assets/colors';
import { XButton } from './XButton';
import { Habit } from '../../core/domain/entities/habit.entity';
import { markDays } from '../utils/calcs/markedDays';

export function CalendarModal({ habit }: { habit?: Habit }) {
  const visible = useSelector((state: RootState) => state.calendar.visible);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={ModalStyles.modalContainer}>
        <View style={ModalStyles.calendarContent}>
          {habit ? (
            <>
              <Calendar markedDates={markDays(habit.progress)} />
              <XButton
                style={ButtonStyles().cancelCalendar}
                onPress={() => dispatch(closeCalendar())}
                color={colors.calendar}
              />
            </>
          ) : (
            <></>
          )}
        </View>
      </View>
    </Modal>
  );
}
