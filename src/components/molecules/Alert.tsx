import { horizontalScale, moderateScale, verticalScale } from '@/themes';
import React, { FC } from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import { Modal, Portal } from 'react-native-paper';
import Text from '../atoms/Text';

interface Props {
  visible: boolean;
  onDismiss: () => void;
  onPress?: () => void;
  containerStyle?: ViewStyle;
  okText?: string;
  dismissText?: string;
  children: React.ReactNode;
}

const width = Dimensions.get('window').width;

const Alert: FC<Props> = ({
  visible,
  onDismiss,
  containerStyle,
  onPress,
  okText = 'Ok',
  dismissText = 'Cancel',
  children,
}) => {
  return (
    <Portal>
      <Modal
        visible={visible}
        dismissableBackButton={false}
        contentContainerStyle={[styles.container, containerStyle]}>
        {children}
        <View style={styles.buttons}>
          {onPress && (
            <TouchableOpacity onPress={onPress}>
              <Text>{okText}</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={onDismiss}>
            <Text>{dismissText}</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  container: {
    width: horizontalScale(width / 1.3),
    alignSelf: 'center',
    paddingHorizontal: horizontalScale(20),
    paddingVertical: verticalScale(20),
    minHeight: verticalScale(150),
    backgroundColor: '#fff',
  },
  buttons: {
    flex: 1,
    gap: moderateScale(20),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});

export default Alert;
