import { verticalScale } from '@/themes';
import React, { forwardRef } from 'react';
import { StyleSheet } from 'react-native';
import { ButtonProps, Button as PaperButton } from 'react-native-paper';

const Button = forwardRef<any, ButtonProps>((props, ref) => {
  return (
    <PaperButton
      {...props}
      style={[styles.border, props.style]}
      contentStyle={[styles.padding, props.contentStyle]}>
      {props.children}
    </PaperButton>
  );
});

const styles = StyleSheet.create({
  border: {
    borderRadius: 0,
  },
  padding: {
    paddingVertical: verticalScale(5),
  },
});

export default Button;
