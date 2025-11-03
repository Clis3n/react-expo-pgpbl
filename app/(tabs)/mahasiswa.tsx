import React from 'react';
import { StyleSheet, View, Text, SectionList, SafeAreaView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useMahasiswa } from '@/context/MahasiswaContext';

const MahasiswaScreen = () => {
  const { mahasiswaData } = useMahasiswa();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Utama Halaman */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Daftar Hadir Praktikum</Text>
      </View>
      
      <SectionList
        sections={mahasiswaData}
        keyExtractor={(item, index) => item + index}
        contentContainerStyle={styles.listContentContainer}
        renderItem={({ item, index, section }) => {
          // Cek apakah item ini adalah yang terakhir di seksinya
          const isLastItem = index === section.data.length - 1;
          return (
            <View
              style={[
                styles.itemContainer,
                // Terapkan sudut tumpul bawah jika ini item terakhir
                isLastItem && styles.lastItemContainer,
              ]}>
              <MaterialIcons name="account-circle" size={24} color="#004A74" />
              <Text style={styles.itemText}>{item}</Text>
            </View>
          );
        }}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionHeader}>{title}</Text>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        // Menambahkan jarak antar blok seksi
        renderSectionFooter={() => <View style={{ height: 20 }} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#004A74', // Latar belakang utama biru UGM
  },
  headerContainer: {
    height: 50,
    backgroundColor: '#FFFFFF',
    marginBottom: 16, // <--- PENAMBAHAN JARAK DI SINI
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Poppins_700Bold',
    textAlign: 'center',
    color: '#004A74',
    paddingTop: 10,
  },
  listContentContainer: {
    paddingHorizontal: 16, // Beri jarak kanan-kiri untuk semua daftar
  },
  sectionHeader: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    backgroundColor: '#1A5C82', // Warna biru yang SAMA
    color: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 16,
    // Sudut atas tumpul
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#FFFFFF', // Latar belakang item PUTIH
  },
  lastItemContainer: {
    // Sudut bawah tumpul HANYA untuk item terakhir
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  itemText: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    marginLeft: 16,
    color: '#004A74',
  },
  separator: {
    height: 1,
    backgroundColor: '#EEEEEE',
    marginLeft: 16,
  },
});

export default MahasiswaScreen;