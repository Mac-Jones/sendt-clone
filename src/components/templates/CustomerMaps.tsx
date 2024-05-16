import { LATITUDE_DELTA, LONGITUDE_DELTA } from '@/constants/maps';
import { useLocationStore } from '@/store';
import { horizontalScale, moderateScale, verticalScale } from '@/themes';
import { LatLng } from '@/types';
import { Link } from 'expo-router';
import isPointWithinRadius from 'geolib/es/isPointWithinRadius';
import React, { FC, memo, useCallback, useMemo, useRef, useState } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import MapView, {
  AnimatedRegion,
  MapMarker,
  Marker,
  PROVIDER_GOOGLE,
  Region,
} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { Button, FAB, MD3LightTheme } from 'react-native-paper';
import { Text } from '../atoms';
import { CustomerTrackingModal, GenericModal } from '../organisms';

type CustomerMapsProps = {
  startWatch: boolean;
  startTracking: (cb: (latLng: LatLng) => void) => void;
  stopTracking: () => void;
};

const CustomerMaps: FC<CustomerMapsProps> = ({ startWatch, startTracking, stopTracking }) => {
  const [currentLocation, destinationLocation, wayPoints, locations] = useLocationStore(state => [
    state.currentLocation,
    state.destinationLocation,
    state.getWayPoints,
    state.locations,
  ]);
  const mapRef = useRef<MapView | null>(null);
  const markerRef = useRef<MapMarker | null>(null);

  const [arrived, setArrived] = useState(false);
  const [startRoute, setStartRoute] = useState(false);

  // smooth moving of the current location marker
  const animatedCurrentRoute = useMemo(
    () =>
      new AnimatedRegion({
        latitude: currentLocation?.latitude,
        longitude: currentLocation?.longitude,
        longitudeDelta: LONGITUDE_DELTA,
        latitudeDelta: LATITUDE_DELTA,
      }),
    [currentLocation],
  );

  const combinedWayPoints = useMemo(() => {
    return locations
      .filter(loc => !loc.completed)
      .map(loc => ({
        latitude: loc.latitude,
        longitude: loc.longitude,
      }));
  }, [locations]);

  const centerPointWithinRadius = useMemo<any>(() => {
    const formattedLatLng = combinedWayPoints
      .map(coord => {
        return `{latitude: ${coord?.latitude}, longitude: ${coord?.longitude}}`;
      })
      .join(' || ');

    return formattedLatLng;
  }, [combinedWayPoints]);

  // fitting all the locations in screen
  const onFitMapCoordinates = useCallback(() => {
    mapRef.current?.fitToCoordinates([currentLocation!, ...wayPoints(), destinationLocation!], {
      edgePadding: {
        right: horizontalScale(30),
        left: horizontalScale(30),
        bottom: verticalScale(200),
        top: verticalScale(200),
      },
    });
  }, [currentLocation, destinationLocation, wayPoints]);

  const animate = useCallback(
    (latLng: LatLng) => {
      if (Platform.OS === 'android') {
        if (markerRef.current) {
          markerRef.current.animateMarkerToCoordinate(latLng, 7000);
        }
      } else {
        animatedCurrentRoute.timing(latLng as any).start();
      }
    },
    [animatedCurrentRoute],
  );

  const onCenter = useCallback(() => {
    mapRef.current?.animateToRegion({
      latitude: currentLocation?.latitude!,
      longitude: currentLocation?.longitude!,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    });
  }, [currentLocation]);

  const onStartWatch = useCallback(() => {
    setStartRoute(false);
    startTracking(animate);
  }, [animate, startTracking]);

  const onStopTracking = useCallback(() => {
    setStartRoute(false);
    stopTracking();
  }, [stopTracking]);

  return (
    <>
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={
            {
              ...currentLocation,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            } as Region
          }
          onRegionChangeComplete={() => {
            const isNear = isPointWithinRadius(
              { latitude: currentLocation?.latitude!, longitude: currentLocation?.longitude! },
              centerPointWithinRadius,
              50,
            );
            setArrived(isNear);
          }}
          provider={PROVIDER_GOOGLE}
          ref={mapRef}>
          <Marker.Animated ref={markerRef} coordinate={animatedCurrentRoute as any}>
            <View style={styles.originMarker} />
          </Marker.Animated>
          {combinedWayPoints.map((marker, i: number) => (
            <Marker ref={markerRef} key={i} coordinate={marker}>
              <View style={styles.wayPoints}>
                <Text style={styles.wayPointText}>{i + 1}</Text>
              </View>
            </Marker>
          ))}
          {destinationLocation && (
            <MapViewDirections
              origin={currentLocation!}
              destination={destinationLocation!}
              apikey={process.env.EXPO_PUBLIC_ROUTES_API_KEY as string}
              strokeWidth={moderateScale(7)}
              strokeColor="#1f6feb"
              resetOnChange={false}
              optimizeWaypoints
              waypoints={wayPoints()}
              onReady={onFitMapCoordinates}
            />
          )}
        </MapView>
        {startRoute && (
          <View style={styles.modalContainer}>
            <GenericModal
              header="Ready To Start Your Route?"
              body="Buckle up and have a safe ride"
              primaryAction={
                <Button mode="contained" onPress={onStartWatch}>
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
        {startWatch && (
          <View style={styles.modalContainer}>
            <CustomerTrackingModal />
          </View>
        )}
        {arrived ? (
          <View style={styles.modalContainer}>
            <GenericModal
              header="Look's like your near"
              body="Have you arrived at your picked up location?"
              primaryAction={
                <Link href="/(main)/customer/" asChild>
                  <Button mode="contained">Yes I'm here</Button>
                </Link>
              }
              secondaryAction={<Button mode="outlined">Not yet</Button>}
            />
          </View>
        ) : (
          <View style={styles.destinationContainer}>
            <Button
              mode="contained"
              style={styles.routeBtn}
              onPress={startWatch ? onStopTracking : () => setStartRoute(true)}>
              {startWatch ? 'Stop track' : 'Start track'}
            </Button>
          </View>
        )}
      </View>
      {!startRoute && !startWatch && (
        <FAB
          icon="map-marker-path"
          style={styles.fab}
          mode="flat"
          color="#fff"
          onPress={onCenter}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  modalContainer: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    zIndex: 100,
  },
  destinationContainer: {
    flexDirection: 'row',
    gap: moderateScale(10),
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },
  fab: {
    position: 'absolute',
    margin: moderateScale(16),
    right: 0,
    bottom: 0,
    backgroundColor: MD3LightTheme.colors.secondary,
  },
  routeBtn: {
    position: 'relative',
    bottom: moderateScale(20),
  },
  originMarker: {
    width: moderateScale(35),
    height: moderateScale(35),
    backgroundColor: MD3LightTheme.colors.tertiary,
    borderRadius: 100,
  },
  wayPoints: {
    width: moderateScale(25),
    height: moderateScale(25),
    backgroundColor: MD3LightTheme.colors.secondary,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wayPointText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default memo(CustomerMaps);
