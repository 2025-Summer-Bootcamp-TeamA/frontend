import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

const CircularLoadingAnimation = ({ size = 200, strokeWidth = 8 }) => {
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 2000,
        easing: Easing.linear,
      }),
      -1, // 무한 반복
      false
    );
  }, []);

  const animatedProps = useAnimatedProps(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference * 0.7; // 252도 (70%)만 그리기

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <AnimatedSvg 
        width={size} 
        height={size}
        animatedProps={animatedProps}
      >
        <Defs>
          <LinearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset="0%" stopColor="#E1B668" stopOpacity="0.7" />
            <Stop offset="25%" stopColor="#F4A261" stopOpacity="0.8" />
            <Stop offset="50%" stopColor="#E76F51" stopOpacity="0.8" />
            <Stop offset="75%" stopColor="#F4A261" stopOpacity="0.8" />
            <Stop offset="100%" stopColor="#E1B668" stopOpacity="0.7" />
          </LinearGradient>
        </Defs>
        
        {/* 배경 원 (옅은 색상) */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#FDF6E3"
          strokeWidth={strokeWidth}
          strokeOpacity={0.25}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * 0.3} // 252도만 그리기
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
        
        {/* 애니메이션 원 */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#gradient)"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={strokeDasharray}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </AnimatedSvg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CircularLoadingAnimation; 