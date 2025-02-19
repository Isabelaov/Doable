import { Text, View } from 'react-native';
import React from 'react';
import { Habit } from '../../core/domain/entities/habit.entity';
import { ListStyles, TextStyles } from '../assets/styles';
import { CustomIcon } from './Icon';
import { isCompleted } from '../utils/calcs/isCompleted';

export const ItemContent = ({ item }: { item: Habit }) => {
  return (
    <>
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
    </>
  );
};
