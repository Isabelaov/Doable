import { View, Text, Modal } from 'react-native';
import React from 'react';
import { ModalStyles } from '../assets/styles/modal.styles';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store/store';
import { Formik } from 'formik';
import { passwordValidation } from '../utils/validation';
import { Input, Button } from '.';
import { useUser } from '../hooks';
import { ContainerStyles, TextStyles } from '../assets/styles';
import { closeCalendar } from '../redux/reducers';

export const ConfirmModal = () => {
  const visible = useSelector((state: RootState) => state.calendar.visible);
  const dispatch = useDispatch<AppDispatch>();
  const { updateUser } = useUser();

  const cancel = () => {
    dispatch(closeCalendar());
  };

  return (
    <Modal
      transparent
      visible={visible}
      animationType="slide"
      onRequestClose={() => cancel()}>
      <View style={ModalStyles.modalContainer}>
        <View style={ModalStyles.modalContent}>
          <Text style={TextStyles.title}>Save Changes</Text>
          <Formik
            initialValues={{
              password: '',
            }}
            validationSchema={passwordValidation}
            onSubmit={values => updateUser(values.password)}>
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
                  placeholder="Original password"
                  secureTextEntry
                  onBlur={handleBlur('password')}
                  onChangeText={handleChange('password')}
                  value={values.password}
                  error={touched.password ? errors.password : undefined}
                />

                <View style={ContainerStyles.bySide}>
                  <Button
                    text="Update"
                    onPress={() => handleSubmit()}
                    backgroundPrimary={false}
                  />

                  <Button text="Cancel" onPress={() => cancel()} />
                </View>
              </>
            )}
          </Formik>
        </View>
      </View>
    </Modal>
  );
};
