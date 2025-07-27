import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import MuseumChooseCard from '../../components/Home/Museumchoosecard.js';
import { selectMuseums, selectMuseumsLoading, selectMuseumsError } from '../../store/museumSlice';

// 기본 박물관 데이터 (API 실패 시 fallback용)
const defaultMuseums = [
  {
    name: '루브르 박물관',
    address: 'Rue de Rivoli, 75001 Paris, France',
    pieces: '380,000+ pieces',
  },
  {
    name: '오랑주리 미술관',
    address: 'Jardin des Tuileries, Paris 75001, France',
    pieces: '144+ pieces',
  },
  {
    name: '오르세 미술관',
    address: 'Esplanade Valéry Giscard d\'Estaing, 75007 Paris, France',
    pieces: '4,000+ pieces',
  },
  {
    name: '퐁피두 센터',
    address: 'Place Georges-Pompidou, 75004 Paris, France',
    pieces: '120,000+ pieces',
  },
];

export default function MuseumListScreen() {
  const navigation = useNavigation();
  
  // Redux에서 박물관 데이터 가져오기
  const museums = useSelector(selectMuseums);
  const isLoading = useSelector(selectMuseumsLoading);
  const error = useSelector(selectMuseumsError);

  // API 데이터가 없거나 에러가 있으면 기본 데이터 사용
  const displayMuseums = museums.length > 0 ? museums : defaultMuseums;

  const handleMuseumSelect = (museum) => {
    // 박물관 선택 시 MainTabs로 이동하면서 선택된 박물관 정보 전달
    navigation.navigate('MainTabs', { 
      selectedMuseumName: museum.name,
      selectedMuseumAddress: museum.address,
      selectedMuseumPlaceId: museum.place_id
    });
  };

  return (
    <ImageBackground
      source={require('../../../assets/backgrounds/HomeScreen.webp')}
      style={styles.background}
      imageStyle={styles.imageStyle}
    >
      {/* 어두운 오버레이 */}
      <View style={styles.overlay} />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>
          방문한 박물관을{'\n'}골라주세요
        </Text>
        
        {/* 로딩 중일 때 */}
        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#fff" />
            <Text style={styles.loadingText}>근처 박물관을 찾고 있습니다...</Text>
          </View>
        )}
        
        {/* 에러가 있을 때 */}
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>박물관 정보를 불러올 수 없습니다.</Text>
            <Text style={styles.errorSubText}>기본 박물관 목록을 표시합니다.</Text>
          </View>
        )}
        
        {/* 박물관 목록 표시 */}
        {displayMuseums.map((museum, idx) => (
          <MuseumChooseCard
            key={idx}
            name={museum.name}
            address={museum.address}
            // 몇 km 떨어져있는지 추가 될듯듯
            pieces={museum.pieces || '정보 없음'}
            onPress={() => handleMuseumSelect(museum)}
          />
        ))}
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  imageStyle: { resizeMode: 'cover' },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)', // 어두운 반투명 오버레이
  },
  container: {
    padding: 24,
    paddingTop: 100,
    paddingBottom: 40,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 32,
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    color: '#fff',
    fontSize: 16,
    marginTop: 16,
    textAlign: 'center',
  },
  errorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    marginBottom: 20,
  },
  errorText: {
    color: '#ff6b6b',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  errorSubText: {
    color: '#fff',
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },
});