import React from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView } from 'react-native';
import MuseumChooseCard from '../../components/Home/Museumchoosecard.js';

// 박물관 데이터 예시
const museums = [
  {
    name: '국립중앙박물관',
    address: '서울 용산구 서빙고로 137',
    pieces: '207,458+ pieces',
  },
  {
    name: '국립중앙박물관',
    address: '서울 용산구 서빙고로 137',
    pieces: '207,458+ pieces',
  },
  {
    name: '국립중앙박물관',
    address: '서울 용산구 서빙고로 137',
    pieces: '207,458+ pieces',
  },
  {
    name: '국립중앙박물관',
    address: '서울 용산구 서빙고로 137',
    pieces: '207,458+ pieces',
  },
];

export default function MuseumListScreen() {
  return (
    <ImageBackground
      source={require('../../../assets/backgrounds/바탕화면.jpg')}
      style={styles.background}
      imageStyle={styles.imageStyle}
    >
      {/* 어두운 오버레이 */}
      <View style={styles.overlay} />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>
          방문한 박물관을{'\n'}골라주세요
        </Text>
        {museums.map((museum, idx) => (
          <MuseumChooseCard
            key={idx}
            name={museum.name}
            address={museum.address}
            pieces={museum.pieces}
            onPress={() => {
              // 카드 클릭 시 동작 (예: 상세화면 이동)
            }}
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
    paddingTop: 80,
    paddingBottom: 40,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 32,
  },
});