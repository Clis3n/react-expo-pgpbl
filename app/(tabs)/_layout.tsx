import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#004A74',
        tabBarInactiveTintColor: '#0049747e',
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 0,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Beranda',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Lainnya',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="mahasiswa"
        options={{
          title: 'Mahasiswa',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="user.graduate.fill" color={color} />
          ),
        }}
      />
      {/* Penambahan Tab Baru untuk Lokasi */}
      <Tabs.Screen
        name="lokasi"
        options={{
          title: 'Lokasi',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="location.pin.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}