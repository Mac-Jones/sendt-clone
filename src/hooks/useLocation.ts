import { useLocationStore } from '@/store';
import { LatLng } from '@/types';
import * as Location from 'expo-location';
import { useCallback, useEffect, useRef, useState } from 'react';

export const useLocation = () => {
  const setCurrentLocation = useLocationStore(state => state.setCurrentLocation);
  const [startWatch, setStartWatch] = useState(false);
  const trackingRef = useRef<any>();

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access location was denied');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setCurrentLocation({
        latitude: location?.coords.latitude,
        longitude: location?.coords.longitude,
      });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // watching the current location
  const watchPosition = useCallback(async (cb: (latLng: LatLng) => void) => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      alert('Permission to access location was denied');
      return;
    }

    Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.BestForNavigation,
        distanceInterval: 10,
      },
      location => {
        const { longitude, latitude } = location.coords;
        console.log('location', longitude, latitude);
        console.log('=========================');
        cb({ latitude, longitude });
        setCurrentLocation({
          latitude,
          longitude,
        });
      },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startTracking = useCallback(
    (cb: (latLng: LatLng) => void) => {
      setStartWatch(true);
      trackingRef.current = setInterval(() => {
        watchPosition(cb);
      }, 6000);
    },
    [watchPosition],
  );

  const stopTracking = useCallback(() => {
    setStartWatch(false);
    clearInterval(trackingRef.current);
  }, []);

  return {
    startWatch,
    startTracking,
    stopTracking,
  };
};
