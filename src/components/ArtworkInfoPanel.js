import React, { useRef } from 'react';
import { Animated, PanResponder, View, Text, StyleSheet, Dimensions } from 'react-native';
import { BlurView } from 'expo-blur';

const MIN_HEIGHT = 160;
const MAX_HEIGHT = 380;
const SCREEN_WIDTH = Dimensions.get('window').width;

const ArtworkInfoPanel = ({
  title = '작품명',
  artist = '작가명',
  description = '작품 설명 대본이 여기에 들어갑니다. 길어도 스크롤 가능!',
  style,
}) => {
  const animatedHeight = useRef(new Animated.Value(MIN_HEIGHT)).current;

  // PanResponder로 위로 스와이프 시 height 증가, 아래로 내리면 감소
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => Math.abs(gestureState.dy) > 10,
      onPanResponderMove: (_, gestureState) => {
        let newHeight = MIN_HEIGHT - gestureState.dy;
        if (newHeight < MIN_HEIGHT) newHeight = MIN_HEIGHT;
        if (newHeight > MAX_HEIGHT) newHeight = MAX_HEIGHT;
        animatedHeight.setValue(newHeight);
      },
      onPanResponderRelease: (_, gestureState) => {
        // 항상 spring 애니메이션으로 부드럽게 이동
        const targetHeight = (MIN_HEIGHT - gestureState.dy > (MIN_HEIGHT + MAX_HEIGHT) / 2)
          ? MAX_HEIGHT
          : MIN_HEIGHT;
        Animated.spring(animatedHeight, {
          toValue: targetHeight,
          useNativeDriver: false,
          friction: 12,
          tension: 40,
        }).start();
      },
    })
  ).current;

  return (
    <Animated.View
      style={[
        styles.panel,
        style,
        {
          height: animatedHeight,
          width: SCREEN_WIDTH,
        },
      ]}
      {...panResponder.panHandlers}
    >
      <BlurView intensity={40} tint="dark" style={StyleSheet.absoluteFill} />
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.artist}>{artist}</Text>
        <View style={styles.descriptionWrapper}>
          <Text style={styles.description}>{description}</Text>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  panel: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
    overflow: 'hidden',
    backgroundColor: 'rgba(30,30,30,0.18)', // 글래스모피즘 느낌
  },
  content: {
    flex: 1,
    paddingHorizontal: 40,
    paddingTop: 25,
    paddingBottom: 12,
    justifyContent: 'flex-start',
  },
  title: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
    lineHeight: 32,
    marginBottom: 12,
  },
  artist: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 12,
    opacity:0.7
  },
  descriptionWrapper: {
    alignSelf: 'flex-start',
  },
  description: {
    color: '#fff',
    fontSize: 14,
    lineHeight: 21,
    opacity: 0.7,
  },
});

export default ArtworkInfoPanel; 