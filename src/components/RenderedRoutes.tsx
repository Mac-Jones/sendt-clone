// import icons from '@/constants/icons';
import { horizontalScale, moderateScale, verticalScale } from '@/themes';
import { Feather } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from './atoms';

interface RenderedRoutesProps {
  title: string;
  subTitle: string;
  desc: string;
  isBoxItem?: boolean;
  isAllPickedUp?: boolean;
}

const RenderedRoutes = ({
  title,
  subTitle,
  desc,
  isBoxItem,
  isAllPickedUp,
}: RenderedRoutesProps) => {
  return (
    <View style={styles.card}>
      <View style={styles.content}>
        {isAllPickedUp ? (
          <View
            style={{
              backgroundColor: '#19D337',
              width: 32,
              height: 32,
              borderRadius: 40,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Feather name="check" size={17} color="#fff" />
          </View>
        ) : (
          <View
            style={{
              backgroundColor: '#9C87C6',
              width: 32,
              height: 32,
              borderRadius: 40,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Feather name="package" size={15} color="#fff" />
          </View>
        )}

        <View style={styles.detailsWrapper}>
          <Text style={{ fontFamily: 'Inter_700Bold', fontSize: 16 }}>{title}</Text>
          <Text
            style={{
              fontSize: 14,
              fontFamily: 'Inter_400Regular',
              letterSpacing: -0.25,
            }}>
            {subTitle}
          </Text>
          <Text style={{ fontSize: 14, fontFamily: 'Inter_400Regular' }}>{desc}</Text>
        </View>

        {isBoxItem && (
          <View
            style={{
              borderRadius: 10,
              backgroundColor: '#f2f2f2',
              height: 20,
              width: 68,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{ fontSize: 10, fontFamily: 'Inter_400Regular', letterSpacing: -0.25 }}>
              Unscanned
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default RenderedRoutes;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    marginBottom: verticalScale(10),
    // changed from original
    borderRadius: moderateScale(10),
    borderWidth: 1,
    borderColor: 'rgba(128, 128, 128, 0.5)',
    // padding: verticalScale(15),
  },
  content: {
    flexDirection: 'row',
    margin: 16,
    alignItems: 'flex-start',
  },
  contentBottom: {
    marginBottom: verticalScale(10),
  },
  detailsWrapper: { flex: 1, marginLeft: horizontalScale(15) },
  package: {
    height: 30,
    width: 30,
    // borderTopLeftRadius: moderateScale(10),
    // borderBottomLeftRadius: moderateScale(10),
    // marginLeft: horizontalScale(10),
  },
});
