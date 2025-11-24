import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, SafeAreaView, Alert, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';

// HANYA IMPORT 'db' DARI FILE KONFIGURASI
import { db } from './firebase/config'; 
import { ref, push, update } from "firebase/database";

// HAPUS BLOK KODE firebaseConfig DAN initializeApp DARI SINI

const FormInputLocationScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const isEditMode = !!params.id;

  const [name, setName] = useState('');
  const [coordinates, setCoordinates] = useState('');
  const [accuration, setAccuration] = useState('');
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  useEffect(() => {
    if (isEditMode) {
      setName(params.name as string || '');
      setCoordinates(params.coordinates as string || '');
      setAccuration(params.accuration as string || '');
    }
  }, [params]);

  const getCoordinates = async () => {
    setIsGettingLocation(true);
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Izin Ditolak', 'Izin untuk mengakses lokasi ditolak');
      setIsGettingLocation(false);
      return;
    }
    try {
      let location = await Location.getCurrentPositionAsync({});
      const coords = `${location.coords.latitude},${location.coords.longitude}`;
      const accuracy = location.coords.accuracy ? `${location.coords.accuracy.toFixed(0)} m` : 'N/A';
      setCoordinates(coords);
      setAccuration(accuracy);
    } catch (error) {
      Alert.alert('Error', 'Gagal mendapatkan lokasi.');
    } finally {
      setIsGettingLocation(false);
    }
  };

  const handleSave = () => {
    if (!name || !coordinates) {
      Alert.alert('Error', 'Nama dan Koordinat wajib diisi!');
      return;
    }
    const dataToSave = { name, coordinates, accuration };
    if (isEditMode) {
      const locationRef = ref(db, `points/${params.id}`);
      update(locationRef, dataToSave)
        .then(() => {
          Alert.alert("Sukses", "Data lokasi berhasil diperbarui.");
          router.back();
        })
        .catch((e) => {
          Alert.alert("Error", "Gagal memperbarui data.");
        });
    } else {
      const locationsRef = ref(db, 'points/');
      push(locationsRef, dataToSave)
        .then(() => {
          Alert.alert("Sukses", "Data lokasi berhasil disimpan.");
          router.back();
        })
        .catch((e) => {
          Alert.alert("Error", "Gagal menyimpan data");
        });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: isEditMode ? 'Edit Lokasi' : 'Form Input Lokasi' }} />
      <View style={styles.formContainer}>
        <Text style={styles.label}>Nama Lokasi</Text>
        <TextInput style={styles.input} placeholder="Contoh: Titik 0 KM Jogja" value={name} onChangeText={setName} placeholderTextColor="#999"/>
        <Text style={styles.label}>Koordinat</Text>
        <TextInput style={styles.input} placeholder="Contoh: -7.8014,110.3647" value={coordinates} onChangeText={setCoordinates} placeholderTextColor="#999"/>
        {accuration ? (
          <>
            <Text style={styles.label}>Akurasi</Text>
            <View style={styles.accuracyContainer}><Text style={styles.accuracyText}>{accuration}</Text></View>
          </>
        ) : null}
        <TouchableOpacity style={styles.buttonLocation} onPress={getCoordinates} disabled={isGettingLocation}>
          {isGettingLocation ? <ActivityIndicator color="#004A74" /> : <Text style={styles.buttonLocationText}>Dapatkan Lokasi Saat Ini</Text>}
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonSave} onPress={handleSave}>
          <Text style={styles.buttonSaveText}>SAVE</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  formContainer: { padding: 20 },
  label: { fontSize: 16, fontFamily: 'Poppins_600SemiBold', marginBottom: 8, color: '#333333' },
  input: { height: 50, backgroundColor: '#FFFFFF', borderColor: '#DDDDDD', borderWidth: 1, borderRadius: 8, paddingHorizontal: 15, marginBottom: 16, fontSize: 16, fontFamily: 'Poppins_400Regular', color: '#111111' },
  accuracyContainer: { height: 50, backgroundColor: '#E9ECEF', borderRadius: 8, justifyContent: 'center', paddingHorizontal: 15, marginBottom: 16 },
  accuracyText: { fontSize: 16, fontFamily: 'Poppins_400Regular', color: '#495057' },
  buttonLocation: { backgroundColor: 'transparent', paddingVertical: 15, borderRadius: 8, alignItems: 'center', marginTop: 10, borderWidth: 1, borderColor: '#004A74' },
  buttonLocationText: { color: '#004A74', fontSize: 16, fontFamily: 'Poppins_700Bold' },
  buttonSave: { backgroundColor: '#004A74', paddingVertical: 15, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  buttonSaveText: { color: '#FFFFFF', fontSize: 16, fontFamily: 'Poppins_700Bold' },
});

export default FormInputLocationScreen;