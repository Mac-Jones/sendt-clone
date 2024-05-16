import { Text } from '@/components/atoms';
import CustomButton from '@/components/CustomButton';
import RenderedRoutes from '@/components/RenderedRoutes';
import icons from '@/constants/icons';
import images from '@/constants/images';
import { horizontalScale, moderateScale, verticalScale } from '@/themes';
import Entypo from '@expo/vector-icons/Entypo';
import { Link } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Card, Divider } from 'react-native-paper';

const Profile = () => {
  return (
    <>
      <ScrollView style={styles.container}>
        <Card mode="contained" style={styles.card}>
          <Card.Content>
            <View style={styles.content}>
              <View style={styles.pic}>
                <Image
                  source={images.MyPic}
                  style={{
                    width: horizontalScale(50),
                    height: verticalScale(50),
                    borderRadius: moderateScale(100),
                  }}
                  resizeMode="contain"
                />
              </View>
              {/* <View style={styles.status} /> */}
              <Text variant="titleLarge" style={styles.name}>
                Jane Doe
              </Text>
              <View style={{ flexDirection: 'row', gap: 10 }}>
                <Image source={icons.locationIcon} />
                <Text style={{ fontFamily: 'Inter_400Regular', letterSpacing: -0.25 }}>
                  396 Victoria Rd Concord West 2138
                </Text>
              </View>
            </View>
            <Divider style={styles.divider} />
            <Link href="/(main)/availability" asChild>
              <TouchableOpacity style={styles.info}>
                <Image source={icons.callIcon} />
                <Text style={{ fontFamily: 'Inter_400Regular', letterSpacing: -0.25 }}>
                  +64 3 345 6789
                </Text>
              </TouchableOpacity>
            </Link>
            <Divider style={styles.divider} />
            <Link href="/(main)/availability" asChild>
              <TouchableOpacity style={styles.info}>
                <Image source={icons.mailIcon} />
                <Text style={{ fontFamily: 'Inter_400Regular', letterSpacing: -0.25 }}>
                  jane.doe@gmail.com
                </Text>
              </TouchableOpacity>
            </Link>
            <Divider style={styles.divider} />
            <View style={styles.empty} />
            <View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontFamily: 'Inter_600SemiBold' }}>Boxes (3)</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    height: 20,
                    width: 75,
                    backgroundColor: '#333',
                    borderRadius: 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 3,
                  }}>
                  <Entypo name="aircraft" size={10} color="#fff" />
                  <Text style={{ fontSize: 10, fontFamily: 'Inter_400Regular', color: '#fff' }}>
                    Air Cargo
                  </Text>
                </View>
              </View>
              <View style={{ marginTop: 20 }}>
                <View style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                  <RenderedRoutes
                    title="Box 1"
                    subTitle="L120cm x W120cm x D120cm"
                    desc="10 kgs"
                    isBoxItem
                  />
                  <RenderedRoutes
                    title="Box 2"
                    subTitle="Sub Title 1"
                    desc="other description "
                    isBoxItem
                  />
                  <RenderedRoutes
                    title="Box 3"
                    subTitle="Sub Title 1"
                    desc="other description "
                    isBoxItem
                  />
                  <RenderedRoutes
                    title="Box 4"
                    subTitle="Sub Title 1"
                    desc="other description "
                    isBoxItem
                  />
                </View>
              </View>
            </View>
          </Card.Content>
        </Card>
      </ScrollView>
      <CustomButton
        title="Scan Boxes"
        color="#d9d9d9"
        backgroundColor="#601FEA"
        handlePress={() => {
          console.log('hello');
        }}
        isActive={false}
        additionalStyles={{
          width: 155,
          height: 48,
          position: 'absolute',
          bottom: 15,
          left: '50%',
          transform: [{ translateX: -77.5 }],
          gap: 7,
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: horizontalScale(20),
    marginTop: verticalScale(20),
  },
  availability: {
    width: horizontalScale(10),
    height: verticalScale(10),
    backgroundColor: 'green',
    borderRadius: 100,
    marginRight: horizontalScale(5),
  },
  card: {
    borderRadius: 20,
    backgroundColor: '#fff',
  },
  content: {
    alignItems: 'center',
    marginBottom: verticalScale(10),
    marginTop: verticalScale(40),
  },
  pic: {
    width: horizontalScale(50),
    height: verticalScale(50),
    borderRadius: moderateScale(100),
    backgroundColor: 'gray',
    marginBottom: verticalScale(10),
  },
  status: {
    width: horizontalScale(10),
    height: verticalScale(10),
    backgroundColor: 'green',
    borderRadius: 100,
    position: 'absolute',
    top: moderateScale(40),
    right: moderateScale(139),
  },
  name: {
    // fontWeight: 'bold',
    // fontFamily: 'DaysOne',
    fontFamily: 'Inter_700Bold',
    letterSpacing: -0.25,
  },
  divider: {
    width: '100%',
    marginVertical: verticalScale(5),
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(10),
    marginVertical: verticalScale(10),
  },
  empty: {
    height: verticalScale(15),
  },
});

export default Profile;
