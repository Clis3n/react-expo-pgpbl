import { initializeApp, getApps } from "firebase/app";
import { getDatabase } from "firebase/database";

// Konfigurasi Firebase Anda
const firebaseConfig = {
  apiKey: "AIzaSyByJbhP7GXwvGkQDH7S-MMpZcbYSY8sReA",
  authDomain: "pgpbl-ugm.firebaseapp.com",
  databaseURL: "https://pgpbl-ugm-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "pgpbl-ugm",
  storageBucket: "pgpbl-ugm.firebasestorage.app",
  messagingSenderId: "973673114812",
  appId: "1:973673114812:web:29d49016fd2575d8c434b9",
};

// Cek apakah aplikasi Firebase sudah diinisialisasi
let app;
if (getApps().length === 0) {
  // Jika belum, inisialisasi
  app = initializeApp(firebaseConfig);
} else {
  // Jika sudah, ambil instance yang sudah ada
  app = getApps()[0];
}

const db = getDatabase(app);

// Ekspor instance database untuk digunakan di file lain
export { db };