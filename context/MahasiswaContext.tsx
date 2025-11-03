import React, { createContext, useState, useContext, ReactNode } from 'react';

// Data awal mahasiswa
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

// Tipe untuk data dan fungsi yang akan kita bagikan
type MahasiswaContextType = {
  mahasiswaData: typeof INITIAL_DATA;
  addMahasiswa: (nama: string, kelas: string) => void;
};

// Membuat Context
const MahasiswaContext = createContext<MahasiswaContextType | undefined>(undefined);

// Membuat Provider Komponen
export const MahasiswaProvider = ({ children }: { children: ReactNode }) => {
  const [mahasiswaData, setMahasiswaData] = useState(INITIAL_DATA);

  const addMahasiswa = (nama: string, kelas: string) => {
    setMahasiswaData(prevData => {
      // Buat salinan data agar tidak mengubah state secara langsung
      const newData = prevData.map(section => {
        if (section.title === kelas) {
          // Tambahkan nama baru ke section yang benar
          return {
            ...section,
            data: [...section.data, nama].sort(), // Menambahkan dan mengurutkan nama
          };
        }
        return section;
      });
      return newData;
    });
  };

  return (
    <MahasiswaContext.Provider value={{ mahasiswaData, addMahasiswa }}>
      {children}
    </MahasiswaContext.Provider>
  );
};

// Membuat Custom Hook untuk menggunakan context dengan mudah
export const useMahasiswa = () => {
  const context = useContext(MahasiswaContext);
  if (!context) {
    throw new Error('useMahasiswa must be used within a MahasiswaProvider');
  }
  return context;
};