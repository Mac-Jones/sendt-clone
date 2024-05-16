import { horizontalScale, verticalScale } from '@/themes';
import React, { FC } from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { ActivityIndicator, Modal, Portal } from 'react-native-paper';
import Text from './Text';

interface Props {
  visible: boolean;
  containerStyle?: ViewStyle;
  loaderText?: string;
}

const Loader: FC<Props> = ({ visible, loaderText = 'Loading' }) => {
  return (
    <Portal>
      <Modal
        visible={visible}
        dismissableBackButton={false}
        contentContainerStyle={styles.container}>
        <ActivityIndicator />
        <Text style={styles.text}>{loaderText}</Text>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    paddingHorizontal: horizontalScale(20),
    paddingVertical: verticalScale(20),
    maxWidth: horizontalScale(200),
    backgroundColor: '#fff',
  },
  text: {
    textAlign: 'center',
    marginTop: verticalScale(10),
  },
});

export default Loader;
