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
} from 'react-native';
// 1. Impor komponen DropDownPicker
import DropDownPicker from 'react-native-dropdown-picker';
import { useMahasiswa } from '@/context/MahasiswaContext';

const FormInputScreen = () => {
  const [nama, setNama] = useState('');
  const [nim, setNIM] = useState('');

  // 2. State yang dibutuhkan oleh DropDownPicker
  const [open, setOpen] = useState(false); // Untuk membuka/menutup dropdown
  const [value, setValue] = useState<string | null>(null); // Untuk menyimpan nilai yang dipilih
  const [items, setItems] = useState([
    { label: 'Asisten', value: 'Asisten' },
    { label: 'Mahasiswa Kelas A', value: 'Mahasiswa Kelas A' },
    { label: 'Mahasiswa Kelas B', value: 'Mahasiswa Kelas B' },
  ]);

  const [isNamaFocused, setIsNamaFocused] = useState(false);
  const [isNimFocused, setIsNimFocused] = useState(false);
  
  const { addMahasiswa } = useMahasiswa();
  const router = useRouter();

  const handleSave = () => {
    // Gunakan 'value' dari state dropdown
    if (!nama || !nim || !value) {
      Alert.alert('Error', 'Semua kolom harus diisi!');
      return;
    }
    addMahasiswa(nama, value);
    
    Alert.alert('Sukses', `Mahasiswa "${nama}" berhasil ditambahkan ke ${value}.`);
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: 'Form Input Mahasiswa' }} />
      <View style={styles.formContainer}>
        <Text style={styles.label}>Nama</Text>
        <TextInput
          style={[styles.input, isNamaFocused && styles.inputFocused]}
          placeholder="Masukkan Nama"
          placeholderTextColor="#999"
          value={nama}
          onChangeText={setNama}
          onFocus={() => setIsNamaFocused(true)}
          onBlur={() => setIsNamaFocused(false)}
        />
        <Text style={styles.label}>NIM</Text>
        <TextInput
          style={[styles.input, isNimFocused && styles.inputFocused]}
          placeholder="Masukkan NIM"
          placeholderTextColor="#999"
          value={nim}
          onChangeText={setNIM}
          keyboardType="numeric"
          onFocus={() => setIsNimFocused(true)}
          onBlur={() => setIsNimFocused(false)}
        />
        <Text style={styles.label}>Kelas</Text>
        
        {/* 3. Implementasi DropDownPicker */}
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          placeholder="Pilih Kelas"
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          dropDownContainerStyle={styles.dropDownContainer}
          textStyle={styles.dropdownText}
          zIndex={1000} // Penting agar dropdown muncul di atas elemen lain
        />
        
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>SAVE</Text>
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
  inputFocused: {
    borderColor: '#004A74',
    borderWidth: 2,
  },
  // 4. Gaya untuk Dropdown agar sesuai tema
  dropdown: {
    backgroundColor: '#FFFFFF',
    borderColor: '#DDDDDD',
    borderWidth: 1,
    borderRadius: 8,
    height: 50,
    marginBottom: 16,
  },
  placeholderStyle: {
    color: '#999',
    fontFamily: 'Poppins_400Regular',
  },
  dropDownContainer: {
    backgroundColor: '#FFFFFF',
    borderColor: '#DDDDDD',
    borderWidth: 1,
  },
  dropdownText: {
    fontFamily: 'Poppins_400Regular',
    color: '#111111',
  },
  button: {
    backgroundColor: '#004A74',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    // Gunakan zIndex negatif agar tombol berada di bawah dropdown jika dropdown terbuka
    zIndex: -1,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Poppins_700Bold',
  },
});

export default FormInputScreen;