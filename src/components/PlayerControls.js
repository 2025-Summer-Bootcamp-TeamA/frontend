import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';

export default function PlayerControls({
  isPlaying,
  currentTime,
  duration,
  onPlayPause,
  onSeekBackward,
  onSeekForward,
  progress,
  onSeek, // 추가!
}) {
  // 시간 포맷 함수
  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <View style={styles.container}>
      {/* Slider로 재생 위치 이동 */}
      <Slider
        style={{ width: '100%', height: 20 }}
        minimumValue={0}
        maximumValue={duration}
        value={currentTime}
        minimumTrackTintColor="#29f"
        maximumTrackTintColor="#888"
        thumbTintColor="#fff"
        onSlidingComplete={onSeek}
      />
      {/* Controls */}
      <View style={styles.controlsRow}>
        <Text style={styles.time}>{formatTime(currentTime)}</Text>
        <TouchableOpacity onPress={onSeekBackward}>
          <Text style={styles.controlButton}>{'|◀︎'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPlayPause}>
          <Text style={styles.playPause}>{isPlaying ? '⏸' : '▶️'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onSeekForward}>
          <Text style={styles.controlButton}>{'▶︎|'}</Text>
        </TouchableOpacity>
        <Text style={styles.time}>{formatTime(duration)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'rgba(60,40,20,0.8)',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  time: {
    color: '#fff',
    fontSize: 13,
    width: 40,
    textAlign: 'center',
  },
  controlButton: {
    color: '#fff',
    fontSize: 22,
    marginHorizontal: 8,
  },
  playPause: {
    color: '#fff',
    fontSize: 28,
    marginHorizontal: 8,
  },
});