import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ImageBackground, Image, ActivityIndicator } from 'react-native';
import { Video } from 'expo-av';
import { useEvent } from 'expo';
import PlayerControls from '../../components/PlayerControls';
import ArtworkInfoPanel from '../../components/ArtworkInfoPanel';
import { useRoute } from '@react-navigation/native';
import { getVideo } from '../../api/videos/getVideoApi';

const backgroundImage = require('../../../assets/backgrounds/video_playback_background.webp');
const frameImage = require('../../../assets/backgrounds/Video_frame.webp');

const VIDEO_URL = 'https://storage.googleapis.com/teama-buck/%E1%84%85%E1%85%A6%E1%84%8B%E1%85%A9%E1%84%82%E1%85%A1%E1%84%85%E1%85%B3%E1%84%83%E1%85%A9_%E1%84%83%E1%85%A1%E1%84%87%E1%85%B5%E1%86%AB%E1%84%8E%E1%85%B5_%E1%84%86%E1%85%A9%E1%84%82%E1%85%A1%E1%84%85%E1%85%B5%E1%84%8C%E1%85%A1_%E1%84%8C%E1%85%A1%E1%86%A8%E1%84%91%E1%85%AE%E1%86%B7_%E1%84%89%E1%85%A9%E1%84%80%E1%85%A2__07-24%2022_20.mp4';

const VideoDetailScreen = () => {
  const route = useRoute();
  const { videoId } = route.params;
  const [videoDetail, setVideoDetail] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const videoRef = React.useRef(null);

  // useEffect(() => {
  //   const fetchVideoDetail = async () => {
  //     try {
  //       console.log('=== 비디오 상세 조회 시작 ===');
  //       console.log('조회할 videoId:', videoId);

  //       const result = await getVideo(videoId);

  //       if (result.success) {
  //         console.log('비디오 상세 조회 성공:', result.data);
  //         setVideoDetail(result.data);
  //       } else {
  //         console.error('비디오 상세 조회 실패:', result.message);
  //       }
  //     } catch (error) {
  //       console.error('비디오 상세 조회 중 오류:', error);
  //     }
  //   };

  //   if (videoId) {
  //     fetchVideoDetail();
  //   }
  // }, [videoId]);

  const handlePlaybackStatusUpdate = (status) => {
    if (status.isLoaded) {
      setCurrentTime(status.positionMillis / 1000);
      setDuration(status.durationMillis / 1000);
      setProgress(
        status.durationMillis > 0
          ? status.positionMillis / status.durationMillis
          : 0
      );
      setIsPlaying(status.isPlaying);
    }
  };

  const handlePlay = () => {
    setIsPlaying(true);
    videoRef.current?.playAsync();
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      setIsPlaying(false);
      videoRef.current?.pauseAsync();
    } else {
      setIsPlaying(true);
      videoRef.current?.playAsync();
    }
  };

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Image
          source={frameImage}
          style={styles.frame}
          resizeMode="contain"
        />
        <View style={styles.videoArea}>
          {!videoLoaded && (
            <View style={styles.skeletonWrapper}>
              <ActivityIndicator size="large" color="#fff" />
            </View>
          )}
          <Video
            ref={videoRef}
            source={{ uri: videoDetail?.videoUrl || VIDEO_URL }}
            style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
            resizeMode="contain"
            useNativeControls={false}
            onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
            onLoad={() => setVideoLoaded(true)}
          />
        </View>
      </View>
      <View style={styles.artworkInfoPanelWrapper}>
        <ArtworkInfoPanel
          title={videoDetail?.title || "모나리자"}
          artist={videoDetail?.artist || "레오나르도 다 빈치"}
          description={videoDetail?.description || "레오나르도 다 빈치의 모나리자(Mona Lisa)는 세계에서 가장 유명한 초상화 중 하나로, 16세기 초 이탈리아에서 완성된 작품이다. 부드러운 미소와 신비로운 눈빛으로 잘 알려져 있으며, 인물의 표정과 배경의 섬세한 묘사가 돋보인다. 다 빈치는 명암법(스푸마토)을 활용해 얼굴과 손의 입체감을 자연스럽게 표현했다. 모나리자가 누구를 모델로 했는지에 대해서는 여러 설이 있지만, 일반적으로 피렌체 상인의 부인 리자 델 조콘도라는 의견이 유력하다. 현재 이 작품은 프랑스 파리의 루브르 박물관에 전시되어 있으며, 전 세계에서 수많은 관람객이 찾는 명작이다."}
        />
      </View>
      <View style={styles.playerControlsWrapper}>
        <PlayerControls 
          currentTime={currentTime}
          duration={duration}
          progress={progress}
          onPlay={handlePlay}
          onPlayPause={handlePlayPause}
          isPlaying={isPlaying}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  frame: {
    marginTop: 114,
    marginLeft: 42,
    marginRight: 42,
    width: 305,
    height: 520,
    // aspectRatio: 280 / 520, // 고정 크기이므로 aspectRatio 제거
  },
  videoArea: {
    position: 'absolute',
    top: 114+35, // frame marginTop + 상단 여백(예시)
    left: 75, // frame marginLeft + 좌측 여백(예시)
    width: 243, // frame width - 좌우 여백(예시)
    height: 429, // frame height - 상하 여백(예시)
    backgroundColor: 'rgba(0,0,0,0.3)', // 임시로 반투명(테스트용)
    overflow: 'hidden',
    zIndex: 1,
  },
  skeletonWrapper: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(30, 32, 40, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 18,
    zIndex: 2,
  },
  playerControlsWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  artworkInfoPanelWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 112,
    zIndex: 10,
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
});

export default VideoDetailScreen;
