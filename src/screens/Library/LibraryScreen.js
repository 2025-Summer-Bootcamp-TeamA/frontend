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
import { useSelector } from 'react-redux';

const backgroundImage = require('../../../assets/backgrounds/바탕화면.webp');

const LibraryScreen = () => {
  const navigation = useNavigation();
  const videoLibrary = useSelector(state => state.library.videoLibrary);
  const [isLoading, setIsLoading] = useState(true);
  const [museumSections, setMuseumSections] = useState([]);
  
  // Reanimated 값들
  const screenOpacity = useSharedValue(0)
  ;
  const contentOpacity = useSharedValue(0);

  // 화면 진입 시 페이드 인 애니메이션
  useEffect(() => {
    screenOpacity.value = withTiming(1, {
      duration: 600,
    });
  }, []);

  // 데이터 로딩 및 그룹핑
  useEffect(() => {
    // 로딩 효과를 위한 지연 (실제 API 호출 시에는 제거)
    setTimeout(() => {
      // museum 이름별로 그룹핑
      const grouped = videoLibrary.reduce((acc, video) => {
        if (!acc[video.museum]) acc[video.museum] = [];
        acc[video.museum].push(video);
        return acc;
      }, {});
      const sections = Object.entries(grouped).map(([title, artworks]) => ({
        title,
        placeId: artworks[0]?.placeId,
        artworks,
      }));
      setMuseumSections(sections);
      setIsLoading(false);
      // 로딩 완료 시 콘텐츠 페이드 인
      contentOpacity.value = withTiming(1, {
        duration: 400,
      });
    }, 200);
  }, [videoLibrary]);

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

  const handlePressArtwork = (videoId) => {
    navigation.navigate('VideoDetail', { id: videoId });
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
              >
                {museumSections.map((museum, idx) => (
                  <MuseumSection
                    key={museum.placeId}
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