import { horizontalScale, moderateScale, verticalScale } from '@/themes';
import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { HelperText, MD3Colors, TextInput, TextInputProps } from 'react-native-paper';
import Text from './Text';

interface Props extends TextInputProps {
  inputLabel?: string;
  renderError?: boolean;
  errorMessage?: string;
  renderRight?: boolean;
}

const Input: FC<Props> = props => {
  return (
    <View style={styles.wrapper}>
      {props.inputLabel && (
        <Text variant="bodyMedium" style={styles.label}>
          {props.inputLabel}
        </Text>
      )}
      <View style={styles.relative}>
        <View style={styles.leftIcon}>{props.left}</View>
        <TextInput
          {...props}
          mode="outlined"
          outlineStyle={styles.outline}
          style={[styles.textAlign, props.style]}
        />
        {props.renderRight && <View style={styles.rightIcon}>{props.right}</View>}
      </View>
      {props.renderError && (
        <HelperText type="error" style={styles.error} visible>
          {props.errorMessage}
        </HelperText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: verticalScale(10),
  },
  outline: {
    borderRadius: moderateScale(20),
    borderWidth: 1,
    backgroundColor: '#fff',
  },
  relative: {
    position: 'relative',
  },
  textAlign: {
    textAlign: 'auto',
  },
  label: {
    marginBottom: verticalScale(10),
  },
  error: {
    color: MD3Colors.error50,
  },
  leftIcon: {
    position: 'absolute',
    zIndex: 1000,
    left: horizontalScale(15),
    top: verticalScale(12),
  },
  rightIcon: {
    position: 'absolute',
    zIndex: 1000,
    right: horizontalScale(15),
    top: verticalScale(12),
  },
});

export default Input;
