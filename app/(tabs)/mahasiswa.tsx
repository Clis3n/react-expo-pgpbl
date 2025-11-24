import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  SectionList,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// HANYA IMPORT 'db' DARI FILE KONFIGURASI
import { db } from '../firebase/config';
import { ref, onValue } from 'firebase/database';

// HAPUS BLOK KODE firebaseConfig DAN initializeApp DARI SINI

const MahasiswaScreen = () => {
  const [sections, setSections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const mahasiswaRef = ref(db, 'mahasiswa/');
    const unsubscribe = onValue(mahasiswaRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const mahasiswaArray = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        const groupedData = mahasiswaArray.reduce((acc, current) => {
          const key = current.class || 'Lainnya';
          if (!acc[key]) {
            acc[key] = [];
          }
          acc[key].push(current);
          return acc;
        }, {} as Record<string, any[]>);
        const formattedSections = Object.keys(groupedData).map(title => ({
          title: title,
          data: groupedData[title].sort((a: { name: string }, b: { name: string }) => a.name.localeCompare(b.name)),
        }));
        setSections(formattedSections);
      } else {
        setSections([]);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#FFFFFF" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#004A74' }}>
      <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Daftar Hadir Praktikum</Text>
        </View>
        {sections.length > 0 ? (
          <SectionList
            sections={sections}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContentContainer}
            renderItem={({ item, index, section }) => {
              const isLastItem = index === section.data.length - 1;
              return (
                <View style={[styles.itemContainer, isLastItem && styles.lastItemContainer]}>
                  <MaterialIcons name="account-circle" size={24} color="#004A74" />
                  <View style={styles.itemTextContainer}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemSubText}>{item.nim}</Text>
                  </View>
                </View>
              );
            }}
            renderSectionHeader={({ section: { title } }) => (
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionHeaderText}>{title}</Text>
              </View>
            )}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            renderSectionFooter={() => <View style={{ height: 20 }} />}
          />
        ) : (
          <View style={styles.centered}>
            <Text style={styles.emptyText}>Belum ada data mahasiswa.</Text>
          </View>
        )}
      </SafeAreaView>
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push({ pathname: '/forminput' })}>
        <MaterialIcons name="add" size={28} color="#004A74" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#004A74',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#004A74',
  },
  emptyText: {
    color: '#FFFFFF',
    fontFamily: 'Poppins_400Regular',
    fontSize: 16,
    textAlign: 'center',
  },
  headerContainer: {
    height: 50,
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Poppins_700Bold',
    textAlign: 'center',
    color: '#004A74',
  },
  listContentContainer: {
    paddingHorizontal: 16,
  },
  sectionHeader: {
    backgroundColor: '#1A5C82',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  sectionHeaderText: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: '#FFFFFF',
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
  // PERUBAHAN GAYA DI SINI
  itemTextContainer: {
    marginLeft: 16,
  },
  itemName: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: '#11181C', // Warna nama gelap
  },
  itemSubText: {
    fontSize: 12,
    fontFamily: 'Poppins_400Regular',
    color: '#6B7280', // Warna NIM abu-abu
  },
  separator: {
    height: 1,
    backgroundColor: '#EEEEEE',
    marginLeft: 16,
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
  },
});

export default MahasiswaScreen;