import { Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Habit } from '../../core/domain/entities/habit.entity';
import { ListStyles, TextStyles } from '../assets/styles';
import { CustomIcon } from './Icon';
import { isCompleted } from '../utils/calcs/isCompleted';
import { useHabit, useProgress } from '../hooks';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store/store';
import { open } from '../redux/reducers/visibility-slice';

export const RenderItem = ({ item }: { item: Habit }) => {
  const { loadHabits } = useHabit();
  const dispatch = useDispatch<AppDispatch>();

  const { addProgress } = useProgress();

  return (
    <TouchableOpacity
      style={ListStyles.item}
      onLongPress={() => {
        addProgress(item.id);
        loadHabits();
      }}
      onPress={() => dispatch(open(item.id))}>
      <View style={ListStyles.left}>
        <Text style={ListStyles.title}>{item.name}</Text>
        <Text style={ListStyles.description}>
          {item.description || 'No description'}
        </Text>
      </View>

      <View style={ListStyles.right}>
        <View>
          <Text style={TextStyles.inline}>{item.reminderTime}</Text>
          <Text style={ListStyles.description}>{item.frequency}</Text>
        </View>

        <View style={ListStyles.icon}>
          {isCompleted(item) ? (
            <CustomIcon size={35} family="Ionicons" name="checkmark-circle" />
          ) : (
            <CustomIcon
              size={35}
              family="Entypo"
              name="circle-with-cross"
              color={'red'}
            />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};
