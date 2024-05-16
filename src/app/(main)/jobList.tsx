import { horizontalScale, moderateScale, verticalScale } from '@/themes';
import React, { useCallback } from 'react';
import { FlatList, Image, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

const Parcel = () => {
  const renderRoutes = useCallback(() => {
    return (
      <View style={styles.card}>
        <View style={styles.content}>
          <Image source={require('../../../assets/images/sample-map.png')} style={styles.map} />
          <View style={styles.detailsWrapper}>
            <Text variant="bodyLarge" style={{ fontWeight: 'bold' }}>
              5 December 2023
            </Text>
            <Text variant="bodyLarge">Rhodes, Concord West 2318 </Text>
            <Text variant="bodyLarge">7 boxes • 70kgs total</Text>
          </View>
        </View>
      </View>
    );
  }, []);

  return (
    <>
      <View style={styles.container}>
        <Text variant="bodyLarge" style={{ fontWeight: 'bold', marginBottom: verticalScale(10) }}>
          Today
        </Text>
        <FlatList
          data={Array(3).fill(2)}
          renderItem={renderRoutes}
          ItemSeparatorComponent={() => <View style={{ height: verticalScale(15) }} />}
        />
        <Text variant="bodyLarge" style={{ fontWeight: 'bold', marginVertical: verticalScale(10) }}>
          Upcoming
        </Text>
        <FlatList
          data={Array(7).fill(1)}
          renderItem={renderRoutes}
          ItemSeparatorComponent={() => <View style={{ height: verticalScale(15) }} />}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: verticalScale(20),
    paddingHorizontal: horizontalScale(20),
  },
  content: {
    flexDirection: 'row',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: moderateScale(10),
  },
  detailsWrapper: {
    flex: 1,
    marginLeft: horizontalScale(15),
    paddingVertical: verticalScale(10),
  },
  map: {
    height: 'auto',
    width: 100,
    borderTopLeftRadius: moderateScale(10),
    borderBottomLeftRadius: moderateScale(10),
  },
});

export default Parcel;
