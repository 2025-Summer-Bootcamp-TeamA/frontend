import React from 'react';
import { View, StyleSheet, FlatList, Text, ScrollView, ImageBackground } from 'react-native';
// MainFeature 배경 이미지 import
import Bg from '../../../assets/backgrounds/HomeScreen.webp';
import MainFeatureBg from '../../../assets/backgrounds/MainFeature 배경.webp';

import Demo1 from '../../../assets/Demo/Demobg1.webp';
import Demo2 from '../../../assets/Demo/Demobg2.webp';
import Demo3 from '../../../assets/Demo/Demobg3.webp';

import MuseumCard from '../../components/Home/MuseumCard';
import MainFeatureCard from '../../components/Home/MainFeatureCard';

const museums = [
  {
    id: '1',
    name: '루브르 박물관',
    address: 'Rue de Rivoli, 75001 Paris, France',
    image: Demo1,
  },
  {
    id: '2',
    name: '오랑주리 미술관',
    address: 'Jardin des Tuileries, Paris 75001, France',
    image: Demo2,
  },
  {
    id: '3',
    name: '오르세 미술관',
    address:  'Esplanade Valéry Giscard d\'Estaing, 75007 Paris, France',
    image: Demo3,
  },
  {
    id: '4',
    name: '퐁피두 센터',
    address:'Place Georges-Pompidou, 75004 Paris, France',
    image: Demo1,
  },
  {
    id: '5',
    name:'피카소 미술관',
    address:'5 rue de Thorigny, 75003 Paris, France',
    image: Demo2,
  },
];

const HomeScreen = ({ navigation, selectedMuseumName }) => (
  <ImageBackground
    source={Bg}
    style={{ flex: 1 }}
    resizeMode="cover"
  >
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.greetingBox}>
        <Text style={styles.greeting}>안녕하세요, 준영님!</Text>
        <Text style={styles.welcome}>
          {selectedMuseumName ? `${selectedMuseumName}에 오신걸 환영합니다.` : '박물관에 오신걸 환영합니다.'}
        </Text>
      </View>
      <MainFeatureCard
        imageSource={MainFeatureBg}
        title="박물관 그 이상의 경험"
        subtitle="한 장의 사진이 특별한 이야기가 됩니다"
        navigation={navigation}
      />
      <Text style={styles.sectionTitle}>근처 박물관</Text>
      <FlatList
        data={museums}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <MuseumCard name={item.name} address={item.address} image={item.image} />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </ScrollView>
  </ImageBackground>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  greetingBox: {
    marginBottom: 16,
  },
  greeting: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  welcome: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 8,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 28,
    marginBottom: 12,
  },
  listContent: {
    paddingBottom: 16,
  },
});

export default HomeScreen; 