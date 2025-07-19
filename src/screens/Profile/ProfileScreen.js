import React, { useState, useEffect } from 'react';
import { View, ImageBackground, StyleSheet } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming,
  FadeIn,
  FadeOut
} from 'react-native-reanimated';
import ProfileInfo from '../../components/Profile/ProfileInfo';
import ProfileStats from '../../components/Profile/ProfileStats';
import ProfileActions from '../../components/Profile/ProfileActions';

export default function ProfileScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [userStats, setUserStats] = useState({
    visitedMuseums: 0,
    createdVideos: 0,
    savedItems: 0,
  });
  
  // Reanimated 값들
  const screenOpacity = useSharedValue(0);
  const contentOpacity = useSharedValue(0);

  // 화면 진입 시 페이드 인 애니메이션
  useEffect(() => {
    screenOpacity.value = withTiming(1, {
      duration: 600,
    });
  }, []);

  // 데이터 로딩 시뮬레이션 (미래 API 호출을 대비)
  useEffect(() => {
    const loadData = async () => {
      // 로딩 효과를 위한 지연 (실제 API 호출 시에는 제거)
      setTimeout(() => {
        // 더미 데이터 (나중에 API 호출로 대체)
        setUserStats({
          visitedMuseums: 5,
          createdVideos: 15,
          savedItems: 8,
        });
        
        setIsLoading(false);
        
        // 로딩 완료 시 콘텐츠 페이드 인
        contentOpacity.value = withTiming(1, {
          duration: 400,
        });
      }, 0);
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

  return (
    <Animated.View style={[styles.container, screenAnimatedStyle]}>
      <ImageBackground
        source={require('../../../assets/backgrounds/바탕화면.webp')}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.innerContainer}>
          {isLoading ? (
            // 로딩 중일 때는 빈 화면 또는 스켈레톤
            <View style={styles.loadingContainer} />
          ) : (
            <Animated.View 
              style={[styles.contentContainer, contentAnimatedStyle]}
              entering={FadeIn.duration(400)}
              exiting={FadeOut.duration(200)}
            >
              <ProfileInfo username="User님" />
              <ProfileStats 
                visitedMuseums={userStats.visitedMuseums}
                createdVideos={userStats.createdVideos}
                savedItems={userStats.savedItems}
              />
              <ProfileActions />
            </Animated.View>
          )}
        </View>
      </ImageBackground>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  innerContainer: {
    flex: 1,
    width: '100%',
  },
  loadingContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: 'transparent',
  },
  contentContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    paddingTop: 45,
  },
});