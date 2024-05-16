import { Text } from '@/components/atoms';
import CustomButton from '@/components/CustomButton';
import RenderedRoutes from '@/components/RenderedRoutes';
import images from '@/constants/images';

// import icons from '@/constants/icons';
import { useLocationStore } from '@/store';
import { horizontalScale, moderateScale, verticalScale } from '@/themes';
import { LocationInfo } from '@/types';
// import { useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, Image, ListRenderItem, StyleSheet, View } from 'react-native';
import { Button, Card, MD3LightTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const Request = () => {
  // const router = useRouter();
  const [locations, acceptLocation] = useLocationStore(state => [
    state.locations.filter(loc => !loc.accepted),
    state.acceptLocation,
  ]);

  const renderRoutes = useCallback<ListRenderItem<LocationInfo>>(
    ({ item }) => {
      return (
        <Card mode="contained" style={styles.card}>
          <Card.Content>
            <View style={[styles.content, item.accepted && styles.contentBottom]}>
              <View style={styles.pic} />
              <View style={styles.detailsWrapper}>
                <View style={styles.detailTop}>
                  <Text variant="bodyLarge">{item.info?.name}</Text>
                  <Text style={styles.time}>00:59:59</Text>
                </View>
                <Text variant="bodySmall">{item.info?.address}</Text>
                <Text variant="bodySmall">{item.info?.description}</Text>
              </View>
            </View>
          </Card.Content>
          {!item.accepted && (
            <Card.Actions style={styles.actions}>
              <Button onPress={() => acceptLocation(item.info?.id!)}>Accept</Button>
            </Card.Actions>
          )}
        </Card>
      );
    },
    [acceptLocation],
  );

  const [isActiveButton1, setIsActiveButton1] = useState(true);
  const [isActiveButton2, setIsActiveButton2] = useState(false);
  const [bgColor1, setBgColor1] = useState('#fff');
  const [bgColor2, setBgColor2] = useState('#f2f2f2');
  const [firstOverlayOpen, setFirstOverlayOpen] = useState(false);
  const [secondOverlayOpen, setSecondOverlayOpen] = useState(false);
  const [isAllPickedUp, setIsAllPickedUp] = useState(true);

  const handleButtonPress = () => {
    setIsActiveButton1(!isActiveButton1);
    setIsActiveButton2(!isActiveButton2);
    setBgColor1(isActiveButton1 ? '#f2f2f2' : '#fff');
    setBgColor2(isActiveButton2 ? '#f2f2f2' : '#fff');
  };

  const handleOverlay = () => {
    setFirstOverlayOpen(!firstOverlayOpen);
    if (isActiveButton1 === false) {
      setIsActiveButton1(true);
      setIsActiveButton2(false);
      setBgColor1(isActiveButton1 ? '#fff' : '#fff');
      setBgColor2(isActiveButton2 ? '#f2f2f2' : '#f2f2f2');
    }
  };

  const handleSecondOverlay = () => {
    setSecondOverlayOpen(true);
  };

  const handleCloseOverlay = () => {
    setFirstOverlayOpen(false);
    setSecondOverlayOpen(false);
  };

  useEffect(() => {
    setTimeout(handleCloseOverlay, 2000);
  }, [secondOverlayOpen]);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <FlatList
          keyExtractor={route => route.info?.id!}
          data={locations}
          // style={{ paddingHorizontal: horizontalScale(20) }}
          renderItem={renderRoutes}
          ListHeaderComponent={() => (
            <View
              style={{
                width: '100%',
                display: 'flex',
                flex: 1,
                justifyContent: 'center',
                // alignItems: 'center',
              }}>
              <View
                style={{
                  alignSelf: 'center',
                  backgroundColor: '#f2f2f2',
                  flexDirection: 'row',
                  height: 48,
                  width: 240,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 50,
                  shadowColor: 'grey',
                  shadowOpacity: 0.8,
                  shadowRadius: 20,
                  shadowOffset: { width: 10, height: 10 },
                  elevation: 20,

                  padding: 2,
                }}>
                <CustomButton
                  title="Maps"
                  color="#601FEA"
                  handlePress={handleButtonPress}
                  backgroundColor={bgColor1}
                  isActive={isActiveButton1}
                />

                <CustomButton
                  title="Pickups"
                  color="#601FEA"
                  handlePress={handleButtonPress}
                  backgroundColor={bgColor2}
                  isActive={isActiveButton2}
                />
              </View>

              <View
                style={{
                  display: 'flex',
                  flex: 1,
                }}>
                {isActiveButton1 ? (
                  <View
                    style={{
                      alignSelf: 'center',
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: 200,
                      height: 200,
                    }}>
                    <Text variant="displayLarge">Maps</Text>
                  </View>
                ) : (
                  <View style={{ marginTop: 20 }}>
                    <Text
                      style={{
                        fontFamily: 'DaysOne',
                        fontSize: 24,
                        letterSpacing: -0.25,
                        marginBottom: 20,
                      }}>
                      Pickups
                    </Text>
                    {isAllPickedUp && (
                      <Card
                        mode="contained"
                        style={{
                          borderRadius: 8,
                          backgroundColor: '#fff',
                          marginBottom: 10,
                        }}>
                        <Card.Content>
                          <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                            <Text
                              style={{
                                fontFamily: 'Inter_700Bold',
                                fontSize: 15,
                                letterSpacing: -0.25,
                                textAlign: 'center',
                              }}>
                              You have picked up all your boxes today!
                            </Text>
                            <Text
                              style={{
                                fontFamily: 'Inter_400Regular',
                                fontSize: 14,
                                letterSpacing: -0.25,
                                textAlign: 'center',
                                marginTop: 5,
                                marginBottom: 20,
                              }}>
                              Head on over to the warehouse to drop them off.
                            </Text>

                            <CustomButton
                              title={`Let's go!`}
                              handlePress={() => {}}
                              backgroundColor="#601FEA"
                              color="#fff"
                            />
                          </View>
                        </Card.Content>
                      </Card>
                    )}
                    <View style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                      <RenderedRoutes
                        title="Jane Doe"
                        subTitle="Rhodes, Concord West 2318 "
                        desc="7 boxes • 70kgs total"
                        isAllPickedUp={isAllPickedUp}
                      />
                      <RenderedRoutes
                        title="Jane Doe"
                        subTitle="Rhodes, Concord West 2318 "
                        desc="7 boxes • 70kgs total"
                        isAllPickedUp={isAllPickedUp}
                      />
                      <RenderedRoutes
                        title="Jane Doe"
                        subTitle="Rhodes, Concord West 2318 "
                        desc="7 boxes • 70kgs total"
                        isAllPickedUp={isAllPickedUp}
                      />
                      <RenderedRoutes
                        title="Jane Doe"
                        subTitle="Rhodes, Concord West 2318 "
                        desc="7 boxes • 70kgs total"
                      />
                      <RenderedRoutes
                        title="Jane Doe"
                        subTitle="Rhodes, Concord West 2318 "
                        desc="7 boxes • 70kgs total"
                      />
                      <RenderedRoutes
                        title="Jane Doe"
                        subTitle="Rhodes, Concord West 2318 "
                        desc="7 boxes • 70kgs total"
                      />
                    </View>
                  </View>
                )}
              </View>
            </View>
          )}
        />
      </SafeAreaView>
      {/* <FAB
        icon="map-marker-plus-outline"
        style={styles.fab}
        mode="flat"
        color="#fff"
        onPress={() => router.push('/(main)/addRoutes')}
      /> */}

      <CustomButton
        title="Start Route"
        color="#fff"
        backgroundColor="#601FEA"
        handlePress={handleOverlay}
        additionalStyles={{
          width: 155,
          height: 48,
          position: 'absolute',
          bottom: 15,
          left: '50%',
          transform: [{ translateX: -77.5 }],
          gap: 7,
          opacity: 1,
        }}
      />
      {firstOverlayOpen && (
        <View
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'flex-end',
          }}>
          {firstOverlayOpen && secondOverlayOpen ? (
            <View
              style={{
                backgroundColor: '#fff',
                width: horizontalScale(340),
                // height: verticalScale(156),
                borderRadius: 8,
                borderWidth: 1,
                borderColor: '#d9d9d9',
                marginBottom: 20,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View style={{ marginVertical: 20 }}>
                <Image source={images.LoadingOverlay} />
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  marginBottom: 23,
                  gap: 10,
                  alignItems: 'center',
                }}>
                {/* <CustomButton
                  title="Cancel"
                  color="#601FEA"
                  backgroundColor="#f2f2f2"
                  handlePress={handleCloseOverlay}
                  additionalStyles={{
                    opacity: 1,
                    width: 88,
                  }}
                /> */}
                <Text style={{ fontFamily: 'Inter_700Bold', fontSize: 16, letterSpacing: -0.25 }}>
                  Starting your route
                </Text>
                <Text
                  style={{ fontFamily: 'Inter_400Regular', fontSize: 14, letterSpacing: -0.25 }}>
                  Give us a second, your map is updating...
                </Text>
              </View>
            </View>
          ) : (
            <View
              style={{
                backgroundColor: '#fff',
                width: horizontalScale(340),
                // height: verticalScale(156),
                borderRadius: 8,
                borderWidth: 1,
                borderColor: '#d9d9d9',
                marginBottom: 20,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View style={{ marginVertical: 20, gap: 3 }}>
                <Text style={{ fontFamily: 'Inter_700Bold', fontSize: 16, letterSpacing: -0.25 }}>
                  Ready to start your route?
                </Text>
                <Text
                  style={{ fontFamily: 'Inter_400Regular', fontSize: 14, letterSpacing: -0.25 }}>
                  Buckle up and have a safe ride
                </Text>
              </View>
              <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 23, gap: 10 }}>
                <CustomButton
                  title="Cancel"
                  color="#601FEA"
                  backgroundColor="#f2f2f2"
                  handlePress={handleCloseOverlay}
                  additionalStyles={{
                    opacity: 1,
                    width: 88,
                  }}
                />
                <CustomButton
                  title="Let's Go"
                  color="#fff"
                  backgroundColor="#601FEA"
                  handlePress={handleSecondOverlay}
                  additionalStyles={{
                    opacity: 1,
                    width: 96,
                  }}
                />
              </View>
            </View>
          )}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: horizontalScale(20),
    marginTop: verticalScale(20),
  },
  actions: { marginTop: verticalScale(10), alignSelf: 'center' },
  content: {
    flexDirection: 'row',
  },
  contentBottom: {
    marginBottom: verticalScale(10),
  },
  card: {
    backgroundColor: '#fff',
    marginBottom: verticalScale(10),
    // changed from original
    borderTopLeftRadius: moderateScale(10),
    borderBottomLeftRadius: moderateScale(10),
  },
  detailsWrapper: { flex: 1, marginLeft: horizontalScale(15) },
  detailTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  pic: {
    width: horizontalScale(40),
    height: verticalScale(40),
    borderRadius: 100,
    backgroundColor: MD3LightTheme.colors.secondary,
  },
  time: {
    fontSize: moderateScale(10),
  },
  fab: {
    position: 'absolute',
    margin: moderateScale(16),
    // right: 0,
    bottom: 0,
    backgroundColor: MD3LightTheme.colors.secondary,
  },
  map: {
    height: 'auto',
    width: 100,
    borderTopLeftRadius: moderateScale(10),
    borderBottomLeftRadius: moderateScale(10),
  },
  primaryBtn: {
    backgroundColor: '#601FEA',
    width: 155,
    height: 48,
    position: 'absolute',
    bottom: 15,
    left: '50%',
    transform: [{ translateX: -77.5 }],
    borderRadius: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 7,
  },
});

export default Request;
