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
import DropDownPicker from 'react-native-dropdown-picker';
// HAPUS impor 'useMahasiswa' yang menyebabkan galat

const FormInputScreen = () => {
  const [nama, setNama] = useState('');
  const [nim, setNIM] = useState('');

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string | null>(null);
  const [items, setItems] = useState([
    { label: 'Asisten', value: 'Asisten' },
    { label: 'Mahasiswa Kelas A', value: 'Mahasiswa Kelas A' },
    { label: 'Mahasiswa Kelas B', value: 'Mahasiswa Kelas B' },
  ]);

  const [isNamaFocused, setIsNamaFocused] = useState(false);
  const [isNimFocused, setIsNimFocused] = useState(false);
  
  const router = useRouter();

  const handleSave = () => {
    if (!nama || !nim || !value) {
      Alert.alert('Error', 'Semua kolom harus diisi!');
      return;
    }
    // Karena context sudah dihapus, kita hanya tampilkan notifikasi
    Alert.alert('Sukses', `Data mahasiswa "${nama}" telah disimulasikan untuk disimpan.`);
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
          zIndex={1000}
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
    backgroundColor: '#f5f5ff',
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
    zIndex: -1,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Poppins_700Bold',
  },
});

export default FormInputScreen;