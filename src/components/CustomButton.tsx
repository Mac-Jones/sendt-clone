import icons from '@/constants/icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react';

import { Image, StyleProp, Text, TouchableOpacity, ViewStyle } from 'react-native';

interface CustomButtonProps {
  title: string;
  handlePress: () => void;
  backgroundColor: string;
  isActive?: boolean;
  additionalStyles?: StyleProp<ViewStyle>;
  color: string;
}

const CustomButton = ({
  title,
  handlePress,
  backgroundColor,
  isActive,
  color,
  additionalStyles,
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.8}
      disabled={isActive}
      style={[
        {
          backgroundColor: `${backgroundColor}`,
          borderRadius: 50,
          flexDirection: 'row',
          gap: 5,
          height: 48,
          width: '50%',
          justifyContent: 'center',
          alignItems: 'center',
        },
        additionalStyles,
      ]}
      className={`bg-secondary rounded-xl min-h-[58px] justify-center items-center opacity-50
      `}>
      {title === 'Maps' || title === 'Pickups' ? (
        <Image source={title === 'Pickups' ? icons.personPin : icons.map} width={24} height={24} />
      ) : title === 'Start Route' ? (
        <MaterialIcons name="alt-route" size={24} color="#fff" />
      ) : title === 'Scan Boxes' ? (
        <MaterialIcons name="qr-code-scanner" size={24} color="#fff" />
      ) : null}

      <Text
        style={{
          color,
          fontFamily: 'Inter_600SemiBold',
          fontSize: 14,
        }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

// in app.json under "expo-location"
// "expo-location",
//         {
//           "locationAlwaysAndWhenInUsePermission": "Allow $(PRODUCT_NAME) to use your location.",
//           "isIosBackgroundLocationEnabled": true,
//           "isAndroidBackgroundLocationEnabled": true
//         }
