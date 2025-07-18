import React from 'react';
import { View, StyleSheet, ImageBackground, Image } from 'react-native';
import { Video } from 'expo-av';
import PlayerControls from '../../components/PlayerControls';
import ArtworkInfoPanel from '../../components/ArtworkInfoPanel';

const backgroundImage = require('../../../assets/backgrounds/video_playback_background.png');
const frameImage = require('../../../assets/backgrounds/Video_frame.png');

const VideoDetailScreen = () => {
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
          <Video
            source={{ uri: 'https://www.w3schools.com/html/mov_bbb.mp4' }}
            style={{ width: '100%', height: '100%' }}
            resizeMode="cover"
            useNativeControls={false}
            isLooping
            shouldPlay={false}
            usePoster={true}
            posterSource={require('../../../assets/icons/Demo1.png')}
            posterStyle={{ width: '100%', height: '100%', resizeMode: 'cover' }}
          />
        </View>
      </View>
      <View style={styles.artworkInfoPanelWrapper}>
        <ArtworkInfoPanel
          title="Sukiya Riverbank in the Eastern Capital"
          artist="레오나르도 다 빈치"
          script="모나리자는 어쩌고 저쩌고 루브르 박물관 어쩌고 저쩌고 자고 싶고 놀고싶고 먹고싶고 드러눕고싶고"
        />
      </View>
      <View style={styles.playerControlsWrapper}>
        <PlayerControls currentTime={0} duration={46} />
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
    top: 114 + 35, // frame marginTop + 상단 여백(예시)
    left:76, // frame marginLeft + 좌측 여백(예시)
    width: 242, // frame width - 좌우 여백(예시)
    height: 463, // frame height - 상하 여백(예시)
    backgroundColor: 'rgba(0,0,0,0.3)', // 임시로 반투명(테스트용)
    overflow: 'hidden',
    zIndex: 1,
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
});

export default VideoDetailScreen;
