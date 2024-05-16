import React, { FC } from 'react';
import { TextComponent } from 'react-native';
import { Text as PaperText, TextProps } from 'react-native-paper';

const Text: FC<TextProps<TextComponent>> = props => {
  return <PaperText {...props}>{props.children}</PaperText>;
};

export default Text;
