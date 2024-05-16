import { useLocationStore } from '@/store';
import { horizontalScale, moderateScale, verticalScale } from '@/themes';
import { LocationInfo } from '@/types';
import React, { FC, memo, useCallback, useState } from 'react';
import { FlatList, ListRenderItem, StyleSheet, View } from 'react-native';
import { Button, Card, Text as RNText } from 'react-native-paper';
import { SceneRendererProps } from 'react-native-tab-view';
import { Text } from '../atoms';
import { GenericModal } from '../organisms';

const CustomerRoutes: FC<SceneRendererProps> = ({ jumpTo }) => {
  const [locations, clearRoute, onCompletedPickup] = useLocationStore(state => [
    state.locations.filter(loc => loc.accepted && !loc.completed),
    state.clearRoute,
    state.onCompletedPickup,
  ]);

  const [startRoute, setStartRoute] = useState(false);

  const renderRoutes = useCallback<ListRenderItem<LocationInfo>>(({ item, index }) => {
    return (
      <Card mode="contained" style={styles.card}>
        <Card.Content>
          <View style={styles.content}>
            <View style={styles.pic}>
              <Text style={styles.picNum}>{index + 1}</Text>
            </View>
            <View style={styles.detailsWrapper}>
              <RNText variant="bodyLarge" style={styles.name}>
                {item.info?.name}
              </RNText>
              <RNText variant="bodySmall">{item.info?.address}</RNText>
              <RNText variant="bodySmall">{item.info?.description}</RNText>
            </View>
          </View>
        </Card.Content>
        {/* <Card.Actions>
            <Button onPress={() => onCompletedPickup(item.info?.id!)}>Done</Button>
          </Card.Actions> */}
      </Card>
    );
  }, []);

  return (
    <>
      <View style={styles.container}>
        <FlatList
          keyExtractor={route => route.info?.id!}
          data={locations}
          style={{ paddingHorizontal: horizontalScale(20) }}
          renderItem={renderRoutes}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View>
      <Text style={styles.topText}>Auto Route based on your location</Text>
      {startRoute && (
        <View style={styles.modalContainer}>
          <GenericModal
            header="Ready To Start Your Route?"
            body="Buckle up and have a safe ride"
            primaryAction={
              <Button mode="contained" onPress={() => jumpTo('maps')}>
                Let's go
              </Button>
            }
            secondaryAction={
              <Button mode="outlined" onPress={() => setStartRoute(false)}>
                Cancel
              </Button>
            }
          />
        </View>
      )}
      <View style={styles.routeBtns}>
        <Button mode="contained" onPress={() => setStartRoute(true)}>
          Start route
        </Button>
        {locations.length >= 1 && (
          <Button mode="outlined" onPress={clearRoute}>
            Clear routes
          </Button>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: verticalScale(140),
  },
  modalContainer: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    zIndex: 100,
  },
  scrollView: {
    flex: 1,
    marginHorizontal: horizontalScale(20),
    paddingTop: verticalScale(60),
  },
  content: {
    flexDirection: 'row',
  },
  separator: {
    height: verticalScale(10),
  },
  card: {
    backgroundColor: '#fff',
  },
  detailsWrapper: {
    flex: 1,
    marginLeft: horizontalScale(15),
    gap: moderateScale(5),
  },
  name: {
    fontWeight: 'bold',
    marginBottom: verticalScale(5),
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
  routeBtns: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: verticalScale(20),
    alignSelf: 'center',
    gap: moderateScale(10),
  },
  topText: {
    textAlign: 'center',
    marginBottom: verticalScale(80),
  },
});

export default memo(CustomerRoutes);
