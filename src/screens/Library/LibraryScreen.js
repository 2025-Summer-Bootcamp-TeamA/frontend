import React, { useState, useEffect, useLayoutEffect } from 'react';
import { StyleSheet, ScrollView, View, ImageBackground, Text, TouchableOpacity, Dimensions } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming
} from 'react-native-reanimated';
import MuseumSection from '../../components/Library/MuseumSection';
import CustomSkeleton from '../../components/Library/CustomSkeleton';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { deleteVideo } from '../../store/librarySlice';
import PhotoRemoveModal from '../../components/photo_upload/PhotoRemoveModal';

const backgroundImage = require('../../../assets/backgrounds/바탕화면.webp');
const { width } = Dimensions.get('window');

const LibraryScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const videoLibrary = useSelector(state => state.library.videoLibrary);
  const [isLoading, setIsLoading] = useState(true);
  const [museumSections, setMuseumSections] = useState([]);
  
  // 선택 모드 관련 상태 추가
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  
  // Reanimated 값들
  const screenOpacity = useSharedValue(0);
  const contentOpacity = useSharedValue(0);

  // 삭제 모달 상태
  const [isRemoveModalVisible, setIsRemoveModalVisible] = useState(false);

  // 선택 모드 토글 함수
  const toggleSelectMode = () => {
    if (isSelectMode) {
      // 선택 모드 해제 시 선택된 항목들 초기화
      setSelectedIds([]);
    }
    setIsSelectMode(!isSelectMode);
  };

  // 네이티브 헤더에 선택/취소 버튼 추가
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={toggleSelectMode} style={{ marginRight: 25}}>
          <Text style={{ 
            color: isSelectMode ? '#FF3B30' : 'white', 
            fontSize: 17, 
            fontWeight: '600' 
          }}>
            {isSelectMode ? '취소' : '선택'}
          </Text>
        </TouchableOpacity>
      ),
      headerTitle: '라이브러리리',
      headerTitleAlign: 'center',
    });
  }, [navigation, isSelectMode]);

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
    if (isSelectMode) {
      // 선택 모드일 때는 선택/해제 로직
      setSelectedIds(prev => 
        prev.includes(videoId) 
          ? prev.filter(id => id !== videoId)
          : [...prev, videoId]
      );
    } else {
      // 일반 모드일 때는 상세 화면으로 이동
      navigation.navigate('VideoDetail', { id: videoId });
    }
  };

  // 삭제 버튼 클릭 시 모달 오픈
  const handleDeletePress = () => {
    if (selectedIds.length === 0) return;
    setIsRemoveModalVisible(true);
  };

  // 모달에서 삭제 확정 시
  const handleDelete = () => {
    // 나중에는 삭제 api 연동동
    if (selectedIds.length === 0) return;
    dispatch(deleteVideo(selectedIds));
    setSelectedIds([]);
    setIsSelectMode(false);
    setIsRemoveModalVisible(false);
  };

  // 모달에서 취소 시
  const handleCancelRemove = () => {
    setIsRemoveModalVisible(false);
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
                    isSelectMode={isSelectMode}
                    selectedIds={selectedIds}
                  />
                ))}
              </Animated.View>
            )}
          </ScrollView>

          {/* 선택 모드 하단 바 */}
          {isSelectMode && (
            <View style={styles.bottomBar}>
              <Text style={styles.selectedCount}>{selectedIds.length}개 선택됨</Text>
              <TouchableOpacity 
                style={[
                  styles.deleteButton, 
                  selectedIds.length === 0 && styles.deleteButtonDisabled
                ]} 
                onPress={handleDeletePress}
                disabled={selectedIds.length === 0}
              >
                <Ionicons 
                  name="trash-outline" 
                  size={28} 
                  color={selectedIds.length === 0 ? '#666' : 'white'} 
                />
              </TouchableOpacity>
            </View>
          )}

          {/* 삭제 확인 모달 */}
          <PhotoRemoveModal 
            visible={isRemoveModalVisible}
            onCancel={handleCancelRemove}
            onDelete={handleDelete}
            message="정말 삭제하시겠어요?"
          />
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
  bottomBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(30,30,30,0.95)',
    paddingHorizontal: 28,
    paddingVertical: 16,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    width: width,
    zIndex: 10,
  },
  selectedCount: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  deleteButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255,0,0,0.18)',
  },
  deleteButtonDisabled: {
    backgroundColor: 'rgba(102,102,102,0.18)',
    opacity: 0.7,
  },
});

export default LibraryScreen; 