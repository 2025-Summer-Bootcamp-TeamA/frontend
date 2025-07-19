import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, ImageBackground } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withSequence,
  runOnJS,
  FadeIn,
  FadeOut
} from 'react-native-reanimated';
import MuseumSection from '../../components/Library/MuseumSection';
import CustomSkeleton from '../../components/Library/CustomSkeleton';
import { useNavigation } from '@react-navigation/native';

const dummyData = [
  {
    title: '국립중앙박물관',
    artworks: [
      { id: '1', image: require('../../../assets/Demo/Demobg1.webp'), title: '모나리자', artist: '반고흐' },
      { id: '2', image: require('../../../assets/Demo/Demobg2.webp'), title: '모나리자', artist: '반고흐' },
      { id: '3', image: require('../../../assets/Demo/Demobg3.webp'), title: '모나리자', artist: '반고흐' },
    ],
  },
  {
    title: '서울역사박물관',
    artworks: [
      { id: '4', image: require('../../../assets/Demo/Demobg1.webp'), title: '모나리자', artist: '반고흐' },
      { id: '5', image: require('../../../assets/Demo/Demobg2.webp'), title: '모나리자', artist: '반고흐' },
      { id: '6', image: require('../../../assets/Demo/Demobg3.webp'), title: '모나리자', artist: '반고흐' },
    ],
  },
  {
    title: '국립화폐박물관',
    artworks: [
      { id: '7', image: require('../../../assets/Demo/Demobg1.webp'), title: '모나리자', artist: '반고흐' },
      { id: '8', image: require('../../../assets/Demo/Demobg2.webp'), title: '모나리자', artist: '반고흐' },
      { id: '9', image: require('../../../assets/Demo/Demobg3.webp'), title: '모나리자', artist: '반고흐' },
    ],
  },
];

const backgroundImage = require('../../../assets/backgrounds/바탕화면.webp');

const LibraryScreen = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  
  // Reanimated 값들
  const screenOpacity = useSharedValue(0);
  const contentOpacity = useSharedValue(0);

  // 화면 진입 시 페이드 인 애니메이션
  useEffect(() => {
    screenOpacity.value = withTiming(1, {
      duration: 300,
    });
  }, []);

  // 데이터 로딩 시뮬레이션 (미래 API 호출을 대비)
  useEffect(() => {
    const loadData = async () => {
      // 현재는 dummyData 사용, 미래에는 API 호출로 변경
      // const response = await fetchLibraryData();
      
      // 로딩 효과를 위한 지연 (실제 API 호출 시에는 제거)
      setTimeout(() => {
        setData(dummyData);
        setIsLoading(false);
        
        // 로딩 완료 시 콘텐츠 페이드 인
        contentOpacity.value = withTiming(1, {
          duration: 400,
        });
      }, 200); // 800ms 지연으로 Skeleton UI 효과 확인
    };

    loadData();
  }, []);

  // 화면 페이드 인 스타일
  const screenAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: screenOpacity.value,
    };
  });

  // 콘텐츠 페이드 인 스타일
  const contentAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: contentOpacity.value,
    };
  });

  const handlePressArtwork = (artworkId) => {
    navigation.navigate('VideoDetail', { id: artworkId });
  };

  return (
    <Animated.View style={[styles.container, screenAnimatedStyle]}>
      <ImageBackground source={backgroundImage} style={styles.background}>
        <View style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            {isLoading ? (
              <CustomSkeleton />
            ) : (
              <Animated.View 
                style={contentAnimatedStyle}
                entering={FadeIn.duration(400)}
              >
                {data?.map((museum, idx) => (
                  <MuseumSection
                    key={museum.title + idx}
                    title={museum.title}
                    artworks={museum.artworks}
                    onPressArtwork={handlePressArtwork}
                  />
                ))}
              </Animated.View>
            )}
          </ScrollView>
        </View>
      </ImageBackground>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  scrollContent: {
    paddingVertical: 24,
    paddingHorizontal: 0,
  },
});

export default LibraryScreen; 