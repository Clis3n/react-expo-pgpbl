import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#39626fff' }}
      headerImage={
        <Image
          source={require('@/assets/images/UGM-putihCrop.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={ styles.title }>Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Nama</ThemedText>
        <ThemedText>
          Risma Kusumajati
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">NIM</ThemedText>
        <ThemedText>
          23/518881/SV/23080
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Kelas</ThemedText>
        <ThemedText>
          A
        </ThemedText>
      </ThemedView>
      
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Mata Kuliah</ThemedText>
        <ThemedText>
          Praktikum Pemrograman Geospasial Perangkat Bergerak Lanjut
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Aplikasi</ThemedText>
        <ThemedText>Aplikasi ini berjalan di 
        <ThemedText type="defaultSemiBold">
            {Platform.select({
              ios: ' ios',
              android: ' android',
              web: ' web',
            })}
          </ThemedText>
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 220,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  title: {
    color: '#A1CEDC',
    fontSize: 62,
    marginBottom: 24,
  },
});
