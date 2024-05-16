import ExpoCheckbox, { CheckboxProps } from 'expo-checkbox';
import React, { FC } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

interface Props extends CheckboxProps {
  children?: React.ReactNode;
  styles?: ViewStyle;
}

const Checkbox: FC<Props> = props => {
  return (
    <View style={[styles.wrapper, props.styles]}>
      <ExpoCheckbox value={props.value} onValueChange={props.onValueChange} />
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Checkbox;
