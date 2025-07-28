import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import MuseumChooseCard from '../../components/Home/Museumchoosecard.js';
import { selectMuseums, selectMuseumsLoading, selectMuseumsError, setSelectedMuseum } from '../../store/museumSlice';

// 기본 박물관 데이터 (API 실패 시 fallback용)
// const defaultMuseums = [
//   {
//     name: '서울역사박물관',
//     address: '서울 종로구 새문안로 55',
//     place_id: 'ChIJYYYYYYB7Lj4ARXyb4HFVDV8s',
//     latitude: 37.5717,
//     longitude: 126.9794,
//     web_url: 'https://www.museum.seoul.kr',
//     distance_m: 591.23,
//     rank: 1
//   },
//   {
//     name: '한국은행 화폐박물관',
//     address: '서울 중구 남대문로 39',
//     place_id: 'ChIJZZZZZZB7Lj4ARXyb4HFVDV8s',
//     latitude: 37.5598,
//     longitude: 126.9783,
//     web_url: 'https://museum.bok.or.kr',
//     distance_m: 745.48,
//     rank: 2
//   },
//   {
//     name: '국립민속박물관',
//     address: '서울 종로구 삼청로 37',
//     place_id: 'ChIJXXXXXXB7Lj4ARXyb4HFVDV8s',
//     latitude: 37.5799,
//     longitude: 126.977,
//     web_url: 'https://www.nfm.go.kr',
//     distance_m: 1492.62,
//     rank: 3
//   },
//   {
//     name: '국립중앙박물관',
//     address: '서울 용산구 서빙고로 137',
//     place_id: 'ChIJzVVVVUB7Lj4ARXyb4HFVDV8s',
//     latitude: 37.5242,
//     longitude: 126.9806,
//     web_url: 'https://www.museum.go.kr',
//     distance_m: 4709.13,
//     rank: 4
//   }
// ];

export default function MuseumListScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  
  // Redux에서 박물관 데이터 가져오기
  const museums = useSelector(selectMuseums);
  const isLoading = useSelector(selectMuseumsLoading);
  const error = useSelector(selectMuseumsError);

  // API 데이터가 없거나 에러가 있으면 기본 데이터 사용
  const displayMuseums = museums ;

  const handleMuseumSelect = (museum) => {
    dispatch(setSelectedMuseum(museum));
    navigation.navigate('MainTabs');
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
            <Text style={styles.errorText}>실시간 박물관 정보를 불러올 수 없습니다.</Text>
            <Text style={styles.errorSubText}>기본 박물관 목록을 표시합니다.</Text>
          </View>
        )}
        
        {/* 박물관 목록 표시 */}
        {displayMuseums.map((museum, idx) => (
          <MuseumChooseCard
            key={museum.place_id}
            name={museum.name}
            address={museum.address}
            distance_m={museum.distance_m}
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