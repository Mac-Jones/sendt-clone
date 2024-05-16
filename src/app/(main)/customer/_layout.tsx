import { Stack } from 'expo-router';
import React from 'react';

const CustomerLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Sender Details' }} />
      <Stack.Screen name="scan" options={{ headerShown: false }} />
    </Stack>
  );
};

export default CustomerLayout;
