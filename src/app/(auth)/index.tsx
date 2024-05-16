import { Input, Loader, Text } from '@/components/atoms';
import { useAuthStore } from '@/store';
import { horizontalScale, verticalScale } from '@/themes';
import { ILogin } from '@/types';
import { Link, router } from 'expo-router';
import { Formik } from 'formik';
import React from 'react';
import { Keyboard, Pressable, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Button } from 'react-native-paper';
import * as Yup from 'yup';

const initialState: ILogin = {
  username: '',
  password: '',
};

const validationSchema = Yup.object().shape({
  username: Yup.string().required('Username address is required'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

const Login = () => {
  const [loading, onLogin, authMessage] = useAuthStore(state => [
    state.loading,
    state.onLogin,
    state.message,
  ]);

  const onHandleSubmit = async (values: ILogin) => {
    // await onLogin(values);
    router.replace('/profile');
  };

  return (
    <>
      <Loader visible={loading} loaderText={authMessage ?? 'Signing in...'} />
      <KeyboardAwareScrollView
        style={styles.keyboardContainer}
        contentContainerStyle={styles.keyboardContent}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <Text variant="displaySmall" style={styles.signIn}>
              Sign In
            </Text>
            <Formik
              initialValues={initialState}
              onSubmit={onHandleSubmit}
              validationSchema={validationSchema}>
              {({ values, handleChange, handleBlur, handleSubmit, errors, touched }) => (
                <>
                  <Input
                    inputLabel="Username"
                    onChangeText={handleChange('username')}
                    onBlur={handleBlur('username')}
                    value={values.username}
                    autoCapitalize="none"
                    dense
                    renderError={!!errors.username && !!touched.username}
                    errorMessage={errors.username}
                  />
                  <Input
                    inputLabel="Password"
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    autoCapitalize="none"
                    dense
                    secureTextEntry
                    renderError={!!errors.password && !!touched.password}
                    errorMessage={errors.password}
                  />
                  <View style={styles.forgotWrapper}>
                    <Link href="/forgotPass" asChild>
                      <Pressable>
                        <Text style={styles.forgotPass}>Forgot Password?</Text>
                      </Pressable>
                    </Link>
                  </View>
                  <Button
                    mode="contained"
                    style={styles.submitButton}
                    onPress={() => handleSubmit()}>
                    Login
                  </Button>
                  <View style={styles.registerWrapper}>
                    <Text>Don't have an account? </Text>
                    <Link href="/register" asChild>
                      <Pressable>
                        <Text variant="titleSmall">Register</Text>
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
  forgotWrapper: {
    marginVertical: verticalScale(5),
  },
  forgotPass: {
    textAlign: 'right',
  },
  registerWrapper: {
    flexDirection: 'row',
    marginTop: verticalScale(30),
    alignItems: 'center',
    justifyContent: 'center',
  },
  signIn: {
    marginBottom: verticalScale(20),
  },
  submitButton: {
    marginTop: verticalScale(30),
  },
});

export default Login;
