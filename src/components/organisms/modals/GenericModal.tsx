import { Text } from '@/components/atoms';
import { horizontalScale, moderateScale, verticalScale } from '@/themes';
import React, { FC } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Portal } from 'react-native-paper';

const width = Dimensions.get('window').width;
const modalWidth = width - horizontalScale(40);

type GenericModalProps = {
  header: string;
  body: string;
  primaryAction: React.ReactNode;
  secondaryAction?: React.ReactNode;
};

const GenericModal: FC<GenericModalProps> = ({ header, body, primaryAction, secondaryAction }) => {
  return (
    <Portal.Host>
      <View style={[styles.container, styles.shadow]}>
        <Text variant="bodyLarge" style={styles.header}>
          {header}
        </Text>
        <Text variant="bodyLarge" style={styles.body}>
          {body}
        </Text>
        <View style={styles.buttons}>
          {secondaryAction}
          {primaryAction}
        </View>
      </View>
    </Portal.Host>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginTop: 'auto',
    marginBottom: verticalScale(20),
    width: modalWidth,
    borderRadius: moderateScale(15),
    paddingHorizontal: horizontalScale(20),
    paddingTop: verticalScale(10),
    paddingBottom: verticalScale(5),
    alignItems: 'center',
  },
  header: {
    marginTop: verticalScale(10),
    fontWeight: 'bold',
  },
  body: {
    marginTop: verticalScale(5),
    marginBottom: verticalScale(5),
    textAlign: 'center',
  },
  shadow: {
    shadowColor: '#171717',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: verticalScale(10),
    marginBottom: verticalScale(10),
    columnGap: moderateScale(10),
  },
});

export default GenericModal;
