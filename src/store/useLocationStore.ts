import { LatLng, LocationInfo } from '@/types';
import { produce } from 'immer';
import { create } from 'zustand';

interface LocationState {
  currentLocation: LatLng | null;
  destinationLocation: LatLng | null;
  locations: LocationInfo[];
  completedLocations: LocationInfo[];
  getWayPoints: () => LatLng[];
  acceptLocation: (id: string) => void;
  onCompletedPickup: (id: string) => void;
  addLocation: (cords: LocationInfo) => void;
  setCurrentLocation: (coord: LatLng) => void;
  clearRoute: () => void;
}

export const useLocationStore = create<LocationState>()((set, get) => ({
  currentLocation: null,
  destinationLocation: null,
  locations: [],
  completedLocations: [],
  clearRoute: () => {
    set(
      produce(state => {
        state.locations = [];
        state.destinationLocation = null;
      }),
    );
  },
  getWayPoints: () => {
    const locations = get()
      .locations.filter(loc => loc.accepted === true)
      .map(loc => ({
        latitude: loc.latitude,
        longitude: loc.longitude,
      }));

    return locations;
  },
  acceptLocation: id => {
    set(
      produce(state => {
        // accept the route
        const foundState = state.locations.find((state: LocationInfo) => state.info?.id === id);
        foundState.accepted = true;

        // set destination
        state.destinationLocation = {
          latitude: foundState.latitude,
          longitude: foundState.longitude,
        };
      }),
    );
  },
  onCompletedPickup: id => {
    set(
      produce(state => {
        // completed the pickup
        const foundState = state.locations.find((state: LocationInfo) => state.info?.id === id);
        foundState.completed = true;
      }),
    );
  },
  addLocation: loc => {
    set(
      produce(state => {
        state.locations.push(loc);
      }),
    );
  },
  setCurrentLocation: coord => {
    set(
      produce(state => {
        state.currentLocation = coord;
      }),
    );
  },
}));
