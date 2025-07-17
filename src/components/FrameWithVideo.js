import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Video } from 'expo-av';

export default function FrameWithVideo({
  frameSource,
  videoSource,
  frameWidth,
  frameHeight,
  frameTop = 0,
  frameLeft = 0,
  frameInnerMarginW = 0,
  frameInnerMarginH = 0,
  videoRef,
  videoProps = {},
  videoZIndex = 2,
  frameZIndex = 1,
}) {
  // 영상 크기와 위치 계산
  const videoWidth = frameWidth - frameInnerMarginW * 2;
  const videoHeight = frameHeight * 0.87 - frameInnerMarginH * 2;
  const videoTop = frameTop + frameInnerMarginH;
  const videoLeft = frameLeft + frameInnerMarginW;

  return (
    <View
      style={{
        width: frameWidth,
        height: frameHeight * 0.87,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      <Image
        source={frameSource}
        style={{
          width: frameWidth,
          height: frameHeight * 0.87,
          position: 'absolute',
          top: frameTop,
          left: frameLeft,
          zIndex: frameZIndex,
        }}
        resizeMode="stretch"
      />
      <Video
        ref={videoRef}
        source={videoSource}
        style={{
          width: videoWidth,
          height: videoHeight,
          position: 'absolute',
          top: videoTop,
          left: videoLeft,
          zIndex: videoZIndex,
          borderRadius: 16,
          backgroundColor: '#000',
        }}
        {...videoProps}
      />
    </View>
  );
}