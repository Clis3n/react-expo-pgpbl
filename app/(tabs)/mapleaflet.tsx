import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ActivityIndicator, SafeAreaView, Platform } from 'react-native';
import MapView, { Marker, UrlTile } from 'react-native-maps';

// Import dari file konfigurasi Firebase
import { db } from '../firebase/config';
import { ref, onValue } from 'firebase/database';

type Point = {
  id: string;
  name: string;
  coordinates: string;
};

const MapLeafletScreen = () => {
  const [points, setPoints] = useState<Point[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const pointsRef = ref(db, 'points/');
    const unsubscribe = onValue(pointsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const pointsArray = Object.keys(data).map(key => ({
          id: key,
          name: data[key].name || 'Tanpa Nama',
          coordinates: data[key].coordinates || '0,0',
        }));
        setPoints(pointsArray);
      } else {
        setPoints([]);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (Platform.OS === 'web') {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Peta Lokasi (OSM)</Text>
        </View>
        <View style={styles.centered}>
          <Text style={styles.webMessage}>Tampilan peta tidak didukung pada versi web.</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#FFFFFF" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Peta Lokasi (OSM)</Text>
      </View>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -7.7956,
          longitude: 110.3695,
          latitudeDelta: 0.5,
          longitudeDelta: 0.5,
        }}>
        <UrlTile
          urlTemplate="http://c.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maximumZ={19}
        />
        {points.map(point => {
          const [latitude, longitude] = point.coordinates.split(',').map(Number);
          if (isNaN(latitude) || isNaN(longitude)) return null;
          return (
            <Marker
              key={point.id}
              coordinate={{ latitude, longitude }}
              title={point.name}
              description={point.coordinates}
            />
          );
        })}
      </MapView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#004A74' },
  headerContainer: { height: 50, backgroundColor: '#FFFFFF', justifyContent: 'center' },
  headerTitle: { fontSize: 20, fontFamily: 'Poppins_700Bold', textAlign: 'center', color: '#004A74' },
  map: { flex: 1 },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#004A74' },
  webMessage: { fontSize: 16, fontFamily: 'Poppins_400Regular', color: '#FFFFFF', textAlign: 'center', padding: 20 },
});

export default MapLeafletScreen;