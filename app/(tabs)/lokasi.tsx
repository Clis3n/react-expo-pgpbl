import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, SectionList, ActivityIndicator, RefreshControl, SafeAreaView, TouchableOpacity, Linking, Text, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// Import dari file konfigurasi Firebase
import { db } from '../firebase/config'; 
import { ref, onValue, remove } from "firebase/database";

const LokasiScreen = () => {
  const [sections, setSections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const pointsRef = ref(db, 'points/');
    const unsubscribe = onValue(pointsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const pointsArray = Object.keys(data).map(key => ({ id: key, ...data[key] }));
        const formattedData = [{ title: 'Lokasi Tersimpan', data: pointsArray }];
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
    setTimeout(() => { setRefreshing(false); }, 1000);
  }, []);

  const handleNavigateToMaps = (coordinates: string) => {
    if (!coordinates) return;
    const [latitude, longitude] = coordinates.split(',').map(coord => coord.trim());
    const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
    Linking.openURL(url);
  };

  const handleEdit = (item: any) => {
    router.push({
      pathname: '/forminputlocation',
      params: { id: item.id, name: item.name, coordinates: item.coordinates, accuration: item.accuration }
    });
  };

  const handleDelete = (id: string) => {
    Alert.alert(
      "Hapus Lokasi", "Apakah Anda yakin ingin menghapus lokasi ini?",
      [
        { text: "Batal", style: "cancel" },
        {
          text: "Hapus", style: "destructive",
          onPress: () => {
            const locationRef = ref(db, `points/${id}`);
            remove(locationRef)
              .then(() => Alert.alert("Sukses", "Lokasi berhasil dihapus."))
              .catch(() => Alert.alert("Error", "Gagal menghapus lokasi."));
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#FFFFFF" />
      </View>
    );
  }

  return (
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
            renderItem={({ item }) => (
              <View style={styles.itemContainer}>
                <TouchableOpacity style={styles.itemContent} onPress={() => handleNavigateToMaps(item.coordinates)}>
                  <MaterialIcons name="location-pin" size={24} color="#004A74" />
                  <View style={styles.itemTextContainer}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemCoordinates}>{item.coordinates}</Text>
                  </View>
                </TouchableOpacity>
                <View style={styles.buttonGroup}>
                  <TouchableOpacity style={styles.iconButton} onPress={() => handleEdit(item)}>
                    <MaterialIcons name="edit" size={22} color="#4A90E2" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.iconButton} onPress={() => handleDelete(item.id)}>
                    <MaterialIcons name="delete" size={22} color="#D0021B" />
                  </TouchableOpacity>
                </View>
              </View>
            )}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#FFFFFF" />}
          />
        ) : (
          <View style={styles.centered}><Text style={styles.emptyText}>Tidak ada data lokasi tersimpan.</Text></View>
        )}
      </SafeAreaView>
      <TouchableOpacity style={styles.fab} onPress={() => router.push({ pathname: '/forminputlocation' })}>
        <MaterialIcons name="add" size={28} color="#004A74" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#004A74' },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#004A74' },
  headerContainer: { height: 50, backgroundColor: '#FFFFFF', marginBottom: 16, justifyContent: 'center' },
  headerTitle: { fontSize: 20, fontFamily: 'Poppins_700Bold', textAlign: 'center', color: '#004A74' },
  listContentContainer: { paddingHorizontal: 16, paddingBottom: 80 },
  itemContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 8, marginBottom: 10 },
  itemContent: { flex: 1, flexDirection: 'row', alignItems: 'center', paddingVertical: 14, paddingLeft: 16 },
  itemTextContainer: { marginLeft: 16 },
  itemName: { fontSize: 16, fontFamily: 'Poppins_600SemiBold', color: '#11181C' },
  itemCoordinates: { fontSize: 12, fontFamily: 'Poppins_400Regular', color: '#6B7280' },
  buttonGroup: { flexDirection: 'row' },
  iconButton: { padding: 16 },
  separator: {},
  emptyText: { color: '#FFFFFF', fontFamily: 'Poppins_400Regular', fontSize: 16 },
  fab: { position: 'absolute', width: 56, height: 56, alignItems: 'center', justifyContent: 'center', right: 30, bottom: 30, backgroundColor: '#FFFFFF', borderRadius: 28, elevation: 8 },
});

export default LokasiScreen;