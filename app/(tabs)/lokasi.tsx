import React, { useState, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  View,
  SectionList,
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
  TouchableOpacity,
  Linking,
  Text,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router'; // Impor useRouter untuk navigasi

// Import Firebase
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';

// Konfigurasi Firebase Anda
const firebaseConfig = {
  apiKey: "AIzaSyDquL31FL9x1rw1YD18LGuqb_UQ50EhtDw",
  authDomain: "pgpbl-ugm.firebaseapp.com",
  databaseURL: "https://pgpbl-ugm-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "pgpbl-ugm",
  storageBucket: "pgpbl-ugm.firebasestorage.app",
  messagingSenderId: "973673114812",
  appId: "1:973673114812:web:29d49016fd2575d8c434b9",
  measurementId: "G-Z825JXS898"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const LokasiScreen = () => {
  const [sections, setSections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter(); // Inisialisasi router

  useEffect(() => {
    const pointsRef = ref(db, 'points/');
    const unsubscribe = onValue(pointsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const pointsArray = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        const formattedData = [{
          title: 'Lokasi Tersimpan',
          data: pointsArray
        }];
        setSections(formattedData);
      } else {
        setSections([]);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const handlePress = (coordinates: string) => {
    if (!coordinates) return;
    const [latitude, longitude] = coordinates.split(',').map(coord => coord.trim());
    const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
    Linking.openURL(url);
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#FFFFFF" />
      </View>
    );
  }

  return (
    // Bungkus semua dengan View agar FAB bisa melayang di atasnya
    <View style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Lokasi Tersimpan</Text>
        </View>

        {sections.length > 0 ? (
          <SectionList
            sections={sections}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContentContainer}
            renderItem={({ item, index, section }) => {
              const isLastItem = index === section.data.length - 1;
              return (
                <TouchableOpacity onPress={() => handlePress(item.coordinates)}>
                  <View style={[styles.itemContainer, isLastItem && styles.lastItemContainer]}>
                    <MaterialIcons name="location-pin" size={24} color="#004A74" />
                    <View style={styles.itemTextContainer}>
                      <Text style={styles.itemName}>{item.name}</Text>
                      <Text style={styles.itemCoordinates}>{item.coordinates}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            renderSectionFooter={() => <View style={{ height: 20 }} />}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#FFFFFF" />
            }
          />
        ) : (
          <View style={styles.centered}>
            <Text style={styles.emptyText}>Tidak ada data lokasi tersimpan.</Text>
          </View>
        )}
      </SafeAreaView>

      {/* FAB ditambahkan di sini */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push({ pathname: '/forminputlocation' })}>
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
    backgroundColor: '#004A74',
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
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginBottom: 10,
  },
  lastItemContainer: {},
  itemTextContainer: {
    marginLeft: 16,
  },
  itemName: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: '#11181C',
  },
  itemCoordinates: {
    fontSize: 12,
    fontFamily: 'Poppins_400Regular',
    color: '#6B7280',
  },
  separator: {},
  emptyText: {
    color: '#FFFFFF',
    fontFamily: 'Poppins_400Regular',
    fontSize: 16,
  },
  // Gaya untuk FAB ditambahkan di sini
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

export default LokasiScreen;