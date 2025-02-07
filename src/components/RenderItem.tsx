import { Text, View } from 'react-native';
import React from 'react';
import { Habit } from '../../core/domain/entities/habit.entity';
import { ListStyles, TextStyles } from '../assets/styles';
import { parseDate } from '../utils/parsing/parseTime';

export const ItemContent = ({ item }: { item: Habit }) => (
  <>
    <View style={ListStyles.left}>
      <Text style={ListStyles.title}>{item.name}</Text>
      <Text style={ListStyles.description}>
        {item.description || 'No description'}
      </Text>
    </View>

    <View style={ListStyles.right}>
      <Text style={TextStyles.inline}>{parseDate(item.createdAt)}</Text>
      <Text style={TextStyles.inline}>{item.reminderTime}</Text>
    </View>
  </>
);
