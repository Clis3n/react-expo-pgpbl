import { ThemeProvider, DefaultTheme } from '@react-navigation/native';
import { Stack } from 'expo-router';
import 'react-native-reanimated';
import { StatusBar } from 'expo-status-bar';

import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

// PERBAIKAN DI SINI: Path impor tidak boleh menyertakan 'app'
import { MahasiswaProvider } from '@/context/MahasiswaContext'; 

// Mencegah splash screen hilang secara otomatis sebelum font dimuat
SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }
  
  const CustomTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#004A74',
      card: '#004A74',
      text: '#FFFFFF',
      primary: '#FFFFFF',
      border: '#004A74',
    },
  };

  return (
    <MahasiswaProvider>
      <ThemeProvider value={CustomTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        </Stack>
        <StatusBar style="light" />
      </ThemeProvider>
    </MahasiswaProvider>
  );
}