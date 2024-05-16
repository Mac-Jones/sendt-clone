import { Text } from '@/components/atoms';
import { horizontalScale, moderateScale, verticalScale } from '@/themes';
import React from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import { MD3LightTheme, Portal } from 'react-native-paper';

const width = Dimensions.get('window').width;
const modalWidth = width - horizontalScale(40);

const CustomerTrackingModal = () => {
  return (
    <Portal.Host>
      <View style={[styles.container, styles.shadow]}>
        <View style={styles.wrapper}>
          <View style={styles.pic}>
            <Text style={styles.picNum}>{1}</Text>
          </View>
          <View style={styles.headerWrapper}>
            <View style={styles.header}>
              <Text variant="bodyLarge" style={styles.headerText}>
                Jane Doe
              </Text>
              <View style={styles.status}>
                <Text variant="bodySmall" style={styles.statusText}>
                  On your way
                </Text>
              </View>
            </View>
            <View style={styles.body}>
              <Text variant="bodyMedium">369 Victoria Rd Concord West 2318</Text>
              <Text variant="bodyMedium">2 boxes • 40kgs • Air Cargo</Text>
            </View>
            <TouchableOpacity style={styles.directionWrapper}>
              <Text variant="bodyLarge" style={styles.directionBtn}>
                Get Directions
              </Text>
            </TouchableOpacity>
          </View>
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
    paddingHorizontal: horizontalScale(15),
    paddingVertical: verticalScale(15),
  },
  headerWrapper: {
    flex: 1,
    marginLeft: verticalScale(15),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    fontWeight: 'bold',
  },
  body: {
    marginTop: verticalScale(5),
    marginBottom: verticalScale(5),
  },
  button: {
    marginBottom: verticalScale(5),
  },
  directionWrapper: {
    flexDirection: 'row',
    marginTop: verticalScale(5),
  },
  directionBtn: {
    color: MD3LightTheme.colors.primary,
  },
  status: {
    backgroundColor: MD3LightTheme.colors.backdrop,
    paddingVertical: verticalScale(5),
    paddingHorizontal: horizontalScale(10),
    borderRadius: moderateScale(20),
  },
  pic: {
    width: horizontalScale(30),
    height: verticalScale(30),
    borderRadius: 100,
    backgroundColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
  },
  picNum: {
    color: '#fff',
    fontWeight: 'bold',
  },
  statusText: {
    color: '#fff',
  },
  shadow: {
    shadowColor: '#171717',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  wrapper: {
    flexDirection: 'row',
  },
});

export default CustomerTrackingModal;
