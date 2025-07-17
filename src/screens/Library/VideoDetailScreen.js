import React, { useRef, useState } from 'react';
import { StyleSheet, ImageBackground, View, Dimensions, SafeAreaView } from 'react-native';
import BackButton from '../../components/BackButton';
import PlayerControls from '../../components/PlayerControls';
import ArtworkInfo from '../../components/ArtworkInfo';
import FrameWithVideo from '../../components/FrameWithVideo';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function VideoDetailScreen() {
  // 프레임(액자) 크기와 위치
  const frameWidth = Math.min(SCREEN_WIDTH * 0.85, 350);
  const frameHeight = frameWidth * (520 / 280);
  const frameTop = -20; // 프레임을 위로 20px 올림
  const frameLeft = 0;
  const frameInnerMarginW = frameWidth * 0.07; // 프레임 테두리 두께(좌우)
  const frameInnerMarginH = frameHeight * 0.07; // 프레임 테두리 두께(상하)

  // Video & PlayerControls 상태 관리
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(1);
  const videoRef = useRef(null);

  const handlePlaybackStatusUpdate = (status) => {
    if (status.isLoaded) {
      setIsPlaying(status.isPlaying);
      setCurrentTime(status.positionMillis / 1000);
      setDuration(status.durationMillis / 1000);
    }
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      videoRef.current.pauseAsync();
    } else {
      videoRef.current.playAsync();
    }
  };

  const handleSeekBackward = () => {
    videoRef.current.setPositionAsync(Math.max((currentTime - 5) * 1000, 0));
  };

  const handleSeekForward = () => {
    videoRef.current.setPositionAsync(Math.min((currentTime + 5) * 1000, duration * 1000));
  };

  // 슬라이더로 영상 위치 이동
  const handleSeek = (seekTime) => {
    videoRef.current.setPositionAsync(seekTime * 1000);
  };

  return (
    <ImageBackground
      source={require('../../../assets/backgrounds/video_playback_background.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={{ flex: 1 }}>
        <BackButton />
        <View style={styles.centerContainer} pointerEvents="box-none">
          <FrameWithVideo
            frameSource={require('../../../assets/backgrounds/frame.png')}
            videoSource={{ uri: 'https://www.w3schools.com/html/mov_bbb.mp4' }}
            frameWidth={frameWidth}
            frameHeight={frameHeight}
            frameTop={frameTop}
            frameLeft={frameLeft}
            frameInnerMarginW={frameInnerMarginW}
            frameInnerMarginH={frameInnerMarginH}
            videoRef={videoRef}
            videoProps={{
              useNativeControls: false,
              resizeMode: 'cover',
              onPlaybackStatusUpdate: handlePlaybackStatusUpdate,
            }}
          />
        </View>
        <View style={styles.bottomPanelWrapper} pointerEvents="box-none">
          <ArtworkInfo
            title="Sukiya Riverbank in the Eastern Capital"
            year="2023-2025"
            artist="레오나르도 다 빈치"
            desc="모나리자는 어쩌고 저쩌고 ..."
          />
          <PlayerControls
            isPlaying={isPlaying}
            currentTime={currentTime}
            duration={duration}
            onPlayPause={handlePlayPause}
            onSeekBackward={handleSeekBackward}
            onSeekForward={handleSeekForward}
            progress={currentTime / duration}
            onSeek={handleSeek}
          />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  bottomPanelWrapper: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    zIndex: 10,
  },
});