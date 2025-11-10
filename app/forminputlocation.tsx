import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import * as Location from 'expo-location';

// Import Firebase
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push } from "firebase/database";

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

const FormInputLocationScreen = () => {
  const [name, setName] = useState('');
  const [coordinates, setCoordinates] = useState('');
  const [accuration, setAccuration] = useState('');
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  const router = useRouter();

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
    const locationsRef = ref(db, 'points/');
    push(locationsRef, {
      name: name,
      coordinates: coordinates,
      accuration: accuration,
    }).then(() => {
      Alert.alert("Sukses", "Data lokasi berhasil disimpan.");
      router.back();
    }).catch((e) => {
      console.error("Error adding document: ", e);
      Alert.alert("Error", "Gagal menyimpan data");
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: 'Form Input Lokasi' }} />
      <View style={styles.formContainer}>
        <Text style={styles.label}>Nama Lokasi</Text>
        <TextInput
          style={styles.input}
          placeholder="Contoh: Titik 0 KM Jogja"
          placeholderTextColor="#999"
          value={name}
          onChangeText={setName}
        />
        <Text style={styles.label}>Koordinat</Text>
        <TextInput
          style={styles.input}
          placeholder="Contoh: -7.8014,110.3647"
          placeholderTextColor="#999"
          value={coordinates}
          onChangeText={setCoordinates}
        />
        
        {/* PERUBAHAN DI SINI: Elemen Akurasi hanya dirender jika state `accuration` tidak kosong */}
        {accuration ? (
          <>
            <Text style={styles.label}>Akurasi</Text>
            <View style={styles.accuracyContainer}>
              <Text style={styles.accuracyText}>{accuration}</Text>
            </View>
          </>
        ) : null}
        
        <TouchableOpacity style={styles.buttonLocation} onPress={getCoordinates} disabled={isGettingLocation}>
          {isGettingLocation ? (
            <ActivityIndicator color="#004A74" />
          ) : (
            <Text style={styles.buttonLocationText}>Dapatkan Lokasi Saat Ini</Text>
          )}
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.buttonSave} onPress={handleSave}>
          <Text style={styles.buttonSaveText}>SAVE</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  formContainer: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    marginBottom: 8,
    color: '#333333',
  },
  input: {
    height: 50,
    backgroundColor: '#FFFFFF',
    borderColor: '#DDDDDD',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 16,
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: '#111111',
  },
  accuracyContainer: {
    height: 50,
    backgroundColor: '#E9ECEF',
    borderRadius: 8,
    justifyContent: 'center',
    paddingHorizontal: 15,
    marginBottom: 16,
  },
  accuracyText: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: '#495057',
  },
  buttonLocation: {
    backgroundColor: 'transparent',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#004A74',
  },
  buttonLocationText: {
    color: '#004A74',
    fontSize: 16,
    fontFamily: 'Poppins_700Bold',
  },
  buttonSave: {
    backgroundColor: '#004A74',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonSaveText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Poppins_700Bold',
  },
});

export default FormInputLocationScreen;