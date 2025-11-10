import React, { useState } from 'react'; // Impor useState
import { StyleSheet, View, Text, SectionList, SafeAreaView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
// HAPUS impor 'useMahasiswa' yang menyebabkan galat

// Definisikan data dummy langsung di sini
const INITIAL_DATA = [
  {
    title: 'Asisten',
    data: ['Asbil', 'Budi', 'Charlie', 'David'],
  },
  {
    title: 'Mahasiswa Kelas A',
    data: ['Cindy', 'Dina', 'Evi', 'Fani', 'Gina', 'Hani', 'Ika', 'Jeni', 'Kiko'],
  },
  {
    title: 'Mahasiswa Kelas B',
    data: ['Dono', 'Kasino', 'Indro', 'Toto', 'Joko', 'Budi', 'Charlie', 'David', 'Eko'],
  },
];

const MahasiswaScreen = () => {
  // Gunakan useState untuk menyimpan data secara lokal di komponen ini
  const [mahasiswaData] = useState(INITIAL_DATA);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Daftar Hadir Praktikum</Text>
      </View>
      
      <SectionList
        sections={mahasiswaData}
        keyExtractor={(item, index) => item + index}
        contentContainerStyle={styles.listContentContainer}
        renderItem={({ item, index, section }) => {
          const isLastItem = index === section.data.length - 1;
          return (
            <View style={[styles.itemContainer, isLastItem && styles.lastItemContainer]}>
              <MaterialIcons name="account-circle" size={24} color="#004A74" />
              <Text style={styles.itemText}>{item}</Text>
            </View>
          );
        }}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionHeader}>{title}</Text>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderSectionFooter={() => <View style={{ height: 20 }} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#004A74',
  },
  headerContainer: {
    height: 50,
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Poppins_700Bold',
    textAlign: 'center',
    color: '#004A74',
    paddingTop: 10,
  },
  listContentContainer: {
    paddingHorizontal: 16,
  },
  sectionHeader: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    backgroundColor: '#1A5C82',
    color: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#FFFFFF',
  },
  lastItemContainer: {
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