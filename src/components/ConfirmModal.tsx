import { View, Text, Modal } from 'react-native';
import React from 'react';
import { Button } from './Button';
import { ModalStyles } from '../assets/styles/modal.styles';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store/store';
import { FormValues } from './UserForm';

export const ConfirmModal = ({ values }: { values: FormValues }) => {
  const visible = useSelector((state: RootState) => state.calendar.visible);

  return (
    <Modal transparent visible={visible} animationType="slide">
      <View style={ModalStyles.modalContainer}>
        <Text>ConfirmModal</Text>
        <Button text="Update" />
      </View>
    </Modal>
  );
};
