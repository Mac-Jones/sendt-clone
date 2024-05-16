import { useLocationStore } from '@/store';
import { horizontalScale, verticalScale } from '@/themes';
import { LocationInfo } from '@/types';
import { generateId } from '@/utils';
import { useRouter } from 'expo-router';
import React, { useCallback, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Button } from 'react-native-paper';

const SearchPlace = () => {
  const router = useRouter();
  const placeRef = useRef<any>();
  const [info, setInfo] = useState<LocationInfo | null>(null);

  const addLocation = useLocationStore(state => state.addLocation);

  const onPressAddress = (data: any, details: any) => {
    const latitude = details.geometry.location.lat;
    const longitude = details.geometry.location.lng;

    setInfo({
      info: {
        id: generateId(),
        name: 'John Doe',
        address: data.description,
        description: '2 boxes • 40kgs • Air Cargo',
      },
      accepted: false,
      completed: false,
      latitude,
      longitude,
    });
  };

  const onAddRoute = useCallback(() => {
    if (info) {
      addLocation(info);
      setInfo(null);
      placeRef.current.clear();
    }
    router.back();
  }, [addLocation, info, router]);

  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        ref={placeRef}
        placeholder="Enter the address"
        onPress={onPressAddress}
        fetchDetails
        query={{
          key: process.env.EXPO_PUBLIC_PLACES_API_KEY,
          language: 'en',
        }}
      />
      <Button mode="contained" style={{ marginBottom: verticalScale(20) }} onPress={onAddRoute}>
        {info ? 'Add Route' : 'Go back'}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: horizontalScale(20),
    paddingTop: verticalScale(20),
  },
});

export default SearchPlace;
