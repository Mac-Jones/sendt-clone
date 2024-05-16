import { Input, Loader, Text } from '@/components/atoms';
import { Alert } from '@/components/molecules';
import { useAuthStore } from '@/store';
import { horizontalScale, verticalScale } from '@/themes';
import { Link } from 'expo-router';
import { Formik, FormikValues } from 'formik';
import React, { useState } from 'react';
import { Keyboard, Pressable, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Button } from 'react-native-paper';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  username: Yup.string().required('Usernameis required'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
  confirmPassword: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

const Register = () => {
  const [loading, onRegister, authMessage] = useAuthStore(state => [
    state.loading,
    state.onRegister,
    state.message,
  ]);
  const [isMatch, setIsMatch] = useState(true);

  const onHandleSubmit = async (values: FormikValues) => {
    if (values.password !== values.confirmPassword) {
      setIsMatch(false);
      return;
    }

    await onRegister({
      firstName: values.firstName,
      lastName: values.lastName,
      username: values.username,
      password: values.password,
    });
  };

  return (
    <>
      <Loader visible={loading} loaderText={authMessage ?? 'Signing in...'} />
      <Alert visible={!isMatch} onDismiss={() => setIsMatch(true)} dismissText="Ok">
        <Text>Password does not match.</Text>
      </Alert>
      <KeyboardAwareScrollView
        style={styles.keyboardContainer}
        contentContainerStyle={styles.keyboardContent}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <Text variant="displaySmall" style={styles.register}>
              Register
            </Text>
            <Formik
              initialValues={{
                firstName: '',
                lastName: '',
                username: '',
                password: '',
                confirmPassword: '',
              }}
              onSubmit={onHandleSubmit}
              validationSchema={validationSchema}>
              {({ values, handleChange, handleBlur, handleSubmit, errors, touched }) => (
                <>
                  <Input
                    inputLabel="First Name"
                    onChangeText={handleChange('firstName')}
                    onBlur={handleBlur('firstName')}
                    value={values.firstName}
                    dense
                    renderError={!!errors.firstName && !!touched.firstName}
                    errorMessage={errors.firstName}
                  />
                  <Input
                    inputLabel="Last Name"
                    onChangeText={handleChange('lastName')}
                    onBlur={handleBlur('lastName')}
                    value={values.lastName}
                    dense
                    renderError={!!errors.lastName && !!touched.lastName}
                    errorMessage={errors.lastName}
                  />
                  <Input
                    inputLabel="Username"
                    onChangeText={handleChange('username')}
                    onBlur={handleBlur('username')}
                    value={values.username}
                    dense
                    autoCapitalize="none"
                    renderError={!!errors.username && !!touched.username}
                    errorMessage={errors.username}
                  />
                  <Input
                    inputLabel="Password"
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    dense
                    autoCapitalize="none"
                    secureTextEntry
                    renderError={!!errors.password && !!touched.password}
                    errorMessage={errors.password}
                  />
                  <Input
                    inputLabel="Confirm Password"
                    onChangeText={handleChange('confirmPassword')}
                    onBlur={handleBlur('confirmPassword')}
                    value={values.confirmPassword}
                    dense
                    autoCapitalize="none"
                    secureTextEntry
                    renderError={!!errors.confirmPassword && !!touched.confirmPassword}
                    errorMessage={errors.confirmPassword}
                  />
                  <Button
                    mode="contained"
                    style={styles.submitButton}
                    onPress={() => handleSubmit()}>
                    Register
                  </Button>
                  <View style={styles.registerWrapper}>
                    <Text>Already have an account? </Text>
                    <Link href="/(auth)/" asChild>
                      <Pressable>
                        <Text variant="titleSmall">Login</Text>
                      </Pressable>
                    </Link>
                  </View>
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
  },
  registerWrapper: {
    flexDirection: 'row',
    marginTop: verticalScale(30),
    alignItems: 'center',
    justifyContent: 'center',
  },
  register: {
    marginBottom: verticalScale(20),
  },
  submitButton: {
    marginTop: verticalScale(40),
  },
});

export default Register;
