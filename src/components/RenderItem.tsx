import { Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Habit } from '../../core/domain/entities/habit.entity';
import { ListStyles, TextStyles } from '../assets/styles';

export const renderItem = ({ item }: { item: Habit }) => {
  return (
    <TouchableOpacity style={ListStyles.item}>
      <View style={ListStyles.left}>
        <Text style={ListStyles.title}>{item.name}</Text>
        <Text style={ListStyles.description}>
          {item.description || 'No description'}
        </Text>
      </View>

      <View style={ListStyles.right}>
        <Text style={TextStyles.inline}>
          {new Date(item.createdAt).toLocaleDateString('hi-IN')}
        </Text>
        <Text style={TextStyles.inline}>{item.reminderTime}</Text>
      </View>
    </TouchableOpacity>
  );
};
