import { Input, Text } from '@/components/atoms';
import { horizontalScale, verticalScale } from '@/themes';
import { Formik, FormikValues } from 'formik';
import React from 'react';
import { Alert, Keyboard, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Button } from 'react-native-paper';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Please enter a valid email').required('Email address is required'),
});

const ForgotPassword = () => {
  const onHandleSubmit = async (values: FormikValues) => {
    try {
      // TODO: logic once submitted
      Alert.alert('Success', JSON.stringify(values));
    } catch (error) {
      // TODO: logic if failed to login
    }
  };

  return (
    <>
      <KeyboardAwareScrollView
        style={styles.keyboardContainer}
        contentContainerStyle={styles.keyboardContent}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <Text variant="displaySmall" style={styles.forgotPass}>
              Reset Password
            </Text>
            <Text style={styles.forgotSubHeader}>
              Enter the email address with your account and we'll send an email with confirmation to
              reset your password.
            </Text>
            <Formik
              initialValues={{ email: '' }}
              onSubmit={onHandleSubmit}
              validationSchema={validationSchema}>
              {({ values, handleChange, handleBlur, handleSubmit, errors, touched }) => (
                <>
                  <Input
                    inputLabel="Email Address"
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    dense
                    autoCapitalize="none"
                    renderError={!!errors.email && !!touched.email}
                    errorMessage={errors.email}
                  />
                  <Button
                    mode="contained"
                    style={styles.submitButton}
                    onPress={() => handleSubmit()}>
                    Send Code
                  </Button>
                </>
              )}
            </Formik>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardContent: { flex: 1, justifyContent: 'center' },
  container: {
    paddingHorizontal: horizontalScale(20),
    paddingBottom: verticalScale(30),
  },
  forgotSubHeader: {
    marginVertical: verticalScale(20),
  },
  forgotPass: {
    marginBottom: verticalScale(20),
  },
  submitButton: {
    marginTop: verticalScale(30),
  },
});

export default ForgotPassword;
