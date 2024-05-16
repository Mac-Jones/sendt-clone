export type LatLng = {
  longitude: number;
  latitude: number;
};

export type CustomerLocInfo = {
  id: string;
  name: string;
  address: string;
  description: string;
};

export type LocationInfo = {
  info?: CustomerLocInfo;
  accepted: boolean;
  completed: boolean;
} & LatLng;
