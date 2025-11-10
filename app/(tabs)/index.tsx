import { Image } from 'expo-image';
import { Platform, StyleSheet, View } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

// Fungsi sederhana untuk membuat huruf pertama kapital
const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export default function HomeScreen() {
  // Router sudah tidak diperlukan di sini
  return (
    // View pembungkus sudah tidak diperlukan lagi
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#ffffff', dark: '#ffffff' }}
      headerImage={
        <Image
          source={require('@/assets/images/ugm-logo.svg')}
          style={styles.headerImage}
        />
      }>
      <View style={{ backgroundColor: '#004A74', minHeight: '100%' }}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title" style={styles.mainTitle}>Profil Mahasiswa</ThemedText>
        </ThemedView>

        <ThemedView style={styles.profileContainer}>
          <ThemedView style={styles.profileItem}>
            <ThemedText style={styles.label}>Nama</ThemedText>
            <ThemedText style={styles.value}>Clisen Ardy Laksono Wicaksono</ThemedText>
          </ThemedView>
          <ThemedView style={styles.profileItem}>
            <ThemedText style={styles.label}>NIM</ThemedText>
            <ThemedText style={styles.value}>23/517152/SV/22742</ThemedText>
          </ThemedView>
          <ThemedView style={styles.profileItem}>
            <ThemedText style={styles.label}>Program Studi</ThemedText>
            <ThemedText style={styles.value}>Sistem Informasi Geografis</ThemedText>
          </ThemedView>
          <ThemedView style={styles.profileItem}>
            <ThemedText style={styles.label}>Fakultas</ThemedText>
            <ThemedText style={styles.value}>Sekolah Vokasi</ThemedText>
          </ThemedView>
        </ThemedView>

        <ThemedView style={styles.footerContainer}>
          <ThemedText style={styles.footerText}>
            Aplikasi ini dijalankan di perangkat {capitalize(Platform.OS)}
          </ThemedText>
        </ThemedView>
      </View>
    </ParallaxScrollView>
    // FAB dan View pembungkusnya sudah dihapus dari sini
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    paddingHorizontal: 16,
    marginTop: 16,
    backgroundColor: 'transparent',
  },
  mainTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontFamily: 'Poppins_700Bold',
  },
  profileContainer: {
    marginTop: 16,
    paddingHorizontal: 16,
    gap: 16,
    backgroundColor: 'transparent',
  },
  profileItem: {
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 1,
  },
  label: {
    fontSize: 14,
    color: '#E5E7EB',
    marginBottom: 4,
    fontFamily: 'Poppins_400Regular',
  },
  value: {
    fontSize: 18,
    color: '#FFFFFF',
    fontFamily: 'Poppins_600SemiBold',
  },
  headerImage: {
    height: 350,
    width: 337.7,
    alignSelf: 'center',
    top: 75,
  },
  footerContainer: {
    marginTop: 32,
    paddingBottom: 32,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  footerText: {
    fontSize: 12,
    color: '#E5E7EB',
    fontStyle: 'italic',
    fontFamily: 'Poppins_400Regular',
  },
  // Gaya untuk FAB sudah dihapus dari sini
});