import { Image } from 'expo-image';
import { Platform, StyleSheet, View, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router'; // Impor useRouter

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';

// Fungsi sederhana untuk membuat huruf pertama kapital
const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export default function HomeScreen() {
  const router = useRouter(); // Inisialisasi router

  return (
    <View style={{ flex: 1 }}>
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
            {/* Informasi Nama */}
            <ThemedView style={styles.profileItem}>
              <ThemedText style={styles.label}>Nama</ThemedText>
              <ThemedText style={styles.value}>Clisen Ardy Laksono Wicaksono</ThemedText>
            </ThemedView>

            {/* Informasi NIM */}
            <ThemedView style={styles.profileItem}>
              <ThemedText style={styles.label}>NIM</ThemedText>
              <ThemedText style={styles.value}>23/517152/SV/22742</ThemedText>
            </ThemedView>

            {/* Informasi Program Studi */}
            <ThemedView style={styles.profileItem}>
              <ThemedText style={styles.label}>Program Studi</ThemedText>
              <ThemedText style={styles.value}>Sistem Informasi Geografis</ThemedText>
            </ThemedView>

            {/* Informasi Fakultas */}
            <ThemedView style={styles.profileItem}>
              <ThemedText style={styles.label}>Fakultas</ThemedText>
              <ThemedText style={styles.value}>Sekolah Vokasi</ThemedText>
            </ThemedView>
          </ThemedView>

          {/* Bagian Footer Informasi Perangkat */}
          <ThemedView style={styles.footerContainer}>
            <ThemedText style={styles.footerText}>
              Aplikasi ini dijalankan di perangkat {capitalize(Platform.OS)}
            </ThemedText>
          </ThemedView>
        </View>
      </ParallaxScrollView>

      {/* Mengubah onPress untuk navigasi ke halaman forminput */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push('/forminput')}>
        <IconSymbol name="plus" size={28} color="#004A74" />
      </TouchableOpacity>
    </View>
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
  fab: {
    position: 'absolute',
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    elevation: 8,
    shadowColor: '#000',
    shadowRadius: 4,
    shadowOpacity: 0.3,
    shadowOffset: { height: 2, width: 0 },
  },
});