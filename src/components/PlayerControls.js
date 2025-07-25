import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const PlayerControls = ({
  currentTime = 0,
  duration = 46,
  progress = 0,
  onPlayPause = () => {},
  onPlay = () => {}, // 추가
  onSeekBackward = () => {},
  onSeekForward = () => {},
  isPlaying = false, // 추가
}) => {
  // 시간 포맷 변환 함수
  const formatTime = (sec) => {
    if (isNaN(sec) || !isFinite(sec)) return '00:00';
    const m = Math.floor(sec / 60)
      .toString()
      .padStart(2, '0');
    const s = Math.floor(sec % 60)
      .toString()
      .padStart(2, '0');
    return `${m}:${s}`;
  };

  // progressBar width 계산
  const progressPercent = !isNaN(progress) && isFinite(progress)
    ? Math.min(100, Math.max(0, progress * 100))
    : 0;

  return (
    <View style={styles.wrapper}>
      {/* 진행 바 (Progress Bar) */}
      <View style={styles.progressBarBg}>
        <View style={[styles.progressBar, { width: `${progressPercent}%` }]} />
      </View>
      {/* 시간 표시 (좌: 현재, 우: 전체) */}
      <View style={styles.timeRow}>
        <Text style={styles.time}>{formatTime(currentTime)}</Text>
        <Text style={styles.time}>{formatTime(duration)}</Text>
      </View>
      {/* 버튼 (왼쪽, 재생/일시정지, 오른쪽) */}
      <View style={styles.controls}>
        <TouchableOpacity onPress={onSeekBackward} style={styles.iconBtn}>
          <Icon name="skip-previous" size={30} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={isPlaying ? onPlayPause : onPlay} // 조건적으로 핸들러 연결
          style={styles.iconBtn}
        >
          <Icon name={isPlaying ? "pause" : "play-arrow"} size={35} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onSeekForward} style={styles.iconBtn}>
          <Icon name="skip-next" size={30} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    paddingBottom: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 8,
  },
  progressBarBg: {
    width: '100%',
    height: 6,
    backgroundColor: '#fff3',
    marginTop: 10,
    overflow: 'hidden',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#fff',
    borderRadius: 3,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
    marginBottom: 2,
    paddingHorizontal: 19,
  },
  time: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    width: 48,
    textAlign: 'center',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 62,
    marginTop: 4,
  },
  iconBtn: {
    padding: 8,
  },
});

export default PlayerControls;
