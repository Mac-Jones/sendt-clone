import icons from '@/constants/icons';
import { useLocationStore } from '@/store';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { Tabs } from 'expo-router';
import React from 'react';
import { Image, View } from 'react-native';
import { useTheme } from 'react-native-paper';

const MainLayout = () => {
  const theme = useTheme();
  const requests = useLocationStore(state => state.locations.filter(loc => !loc.accepted));

  interface TabIconProps {
    icon: number;
    color: string;
    size: number;
  }

  const TabIcon = ({ icon, color }: TabIconProps) => {
    return (
      <View className="items-center justify-center gap-2">
        <Image source={icon} resizeMode="contain" tintColor={color} className="w-6 h-6" />
      </View>
    );
  };

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: '#595959',

        tabBarLabelStyle: {
          fontFamily: 'Inter_400Regular',
          fontSize: 10,
        },
      }}>
      <Tabs.Screen
        name="request"
        options={{
          headerShown: false,
          title: 'Route',
          tabBarIcon: ({ color, size }) => (
            // <Ionicons name="map-outline" color={color} size={size} />
            <MaterialIcons name="alt-route" size={size} color={color} />
          ),
          // headerRight: ({ tintColor }) => (
          //   <TouchableOpacity style={{ marginRight: horizontalScale(10) }} onPress={logout}>
          //     <Ionicons name="log-out-outline" color={tintColor} size={moderateScale(20)} />
          //   </TouchableOpacity>
          // ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: 'Requests',
          tabBarIcon: ({ color, size, focused }) => (
            // <Ionicons name="layers-outline" color={color} size={size} />
            <TabIcon
              icon={icons.distanceInactive}
              color={color}
              // name="Home"
              size={size}
              // focused={focused}
            />
          ),
          tabBarBadge: requests.length >= 1 ? requests.length : undefined,
          tabBarBadgeStyle: {
            backgroundColor: theme.colors.primary,
          },
        }}
      />
      <Tabs.Screen
        name="jobList"
        options={{
          title: 'Job List',
          tabBarIcon: ({ color, size }) => <Feather name="package" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            // <Ionicons name="person-circle-outline" color={color} size={size} />
            <MaterialCommunityIcons name="account-circle-outline" size={size} color={color} />
          ),
          headerTitleStyle: {
            fontFamily: 'DaysOne',
          },
          headerStyle: {
            backgroundColor: '#f2f2f2',
          },
        }}
      />
      <Tabs.Screen
        name="customer"
        options={{
          href: null,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="addRoutes"
        options={{
          href: null,
          title: 'Add Routes',
        }}
      />
      <Tabs.Screen
        name="availability"
        options={{
          href: null,
          title: 'Availability',
        }}
      />
    </Tabs>
  );
};

export default MainLayout;
