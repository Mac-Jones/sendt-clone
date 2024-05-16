import { Text } from '@/components/atoms';
import { horizontalScale, moderateScale, verticalScale } from '@/themes';
import { Feather as FeatherIcon, Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Button, Card, Divider, MD3LightTheme } from 'react-native-paper';

const Customer = () => {
  const renderItem = () => {
    return (
      <View
        style={{
          backgroundColor: MD3LightTheme.colors.inverseOnSurface,
          padding: moderateScale(15),
          borderRadius: moderateScale(15),
        }}>
        <View style={{ flexDirection: 'row', gap: moderateScale(10) }}>
          <View style={styles.box}>
            <FeatherIcon name="box" color="#fff" size={moderateScale(15)} />
          </View>
          <View style={{ flex: 1 }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text variant="bodyLarge" style={{ fontWeight: 'bold' }}>
                Box 1/3
              </Text>
              <View
                style={{
                  backgroundColor: MD3LightTheme.colors.backdrop,
                  paddingVertical: verticalScale(5),
                  paddingHorizontal: horizontalScale(10),
                  borderRadius: moderateScale(20),
                }}>
                <Text variant="labelSmall" style={{ color: '#fff' }}>
                  Scanned
                </Text>
              </View>
            </View>
            <View style={{ marginTop: verticalScale(10) }}>
              <View style={{ flexDirection: 'row' }}>
                <Text variant="bodyLarge" style={{ flexBasis: moderateScale(90) }}>
                  Dimensions:
                </Text>
                <Text variant="bodyLarge" style={{ flexShrink: 1 }}>
                  L80cm x W80cm x D80cm
                </Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text variant="bodyLarge" style={{ flexBasis: moderateScale(90) }}>
                  Weight:
                </Text>
                <Text variant="bodyLarge" style={{ flexShrink: 1 }}>
                  10kgs
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Card mode="contained" style={styles.card}>
        <Card.Content>
          <View style={styles.content}>
            <View style={styles.pic} />
            <Text variant="titleLarge" style={styles.name}>
              John Doe
            </Text>
            <Text variant="bodyLarge">11 Adventure Place Rouse Hill 2155</Text>
            {/* <Text variant='bodyLarge'>2 boxes - 40kgs - Air Cargo</Text> */}
          </View>
          <Divider style={styles.divider} />
          <View style={styles.info}>
            <Ionicons name="call" />
            <Text variant="bodyLarge">+64 3 345 6789</Text>
          </View>
          <Divider style={styles.divider} />
          <View style={styles.info}>
            <Ionicons name="mail" />
            <Text variant="bodyLarge">john.doe@gmail.com</Text>
          </View>
          <Divider style={styles.divider} />
          <View style={{ marginVertical: verticalScale(10) }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: verticalScale(10),
              }}>
              <Text variant="bodyLarge" style={{ fontWeight: 'bold' }}>
                Boxes
              </Text>
              <View
                style={{
                  backgroundColor: MD3LightTheme.colors.backdrop,
                  paddingVertical: verticalScale(5),
                  paddingHorizontal: horizontalScale(10),
                  borderRadius: moderateScale(20),
                }}>
                <Text variant="labelSmall" style={{ color: '#fff' }}>
                  Air Cargo
                </Text>
              </View>
            </View>

            <FlatList
              data={Array(3).fill(1)}
              renderItem={renderItem}
              ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
            />
          </View>
        </Card.Content>
      </Card>
      <View style={styles.qrButton}>
        <Link href="/(main)/customer/scan" asChild>
          <Button mode="contained">Scan QR</Button>
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: horizontalScale(20),
    marginTop: verticalScale(20),
  },
  card: { backgroundColor: '#fff', borderRadius: 20 },
  content: {
    alignItems: 'center',
    marginBottom: verticalScale(10),
  },
  box: {
    width: horizontalScale(30),
    height: verticalScale(30),
    borderRadius: 100,
    backgroundColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pic: {
    width: horizontalScale(50),
    height: verticalScale(50),
    borderRadius: moderateScale(100),
    backgroundColor: 'gray',
    marginBottom: verticalScale(10),
  },
  name: {
    fontWeight: 'bold',
    marginBottom: verticalScale(5),
  },
  divider: { width: '100%', marginVertical: verticalScale(5) },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(10),
    marginVertical: verticalScale(10),
  },
  qrButton: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: verticalScale(20),
  },
});

export default Customer;
