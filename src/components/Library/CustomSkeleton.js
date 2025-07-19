import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

const CustomSkeleton = () => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const animationRef = useRef(null);

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: false,
        }),
      ])
    );
    
    animationRef.current = animation;
    animation.start();

    // 컴포넌트 언마운트 시 애니메이션 정리
    return () => {
      if (animationRef.current) {
        animationRef.current.stop();
        animationRef.current = null;
      }
    };
  }, [animatedValue]);

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  return (
    <View style={styles.container}>
      {/* 박물관 섹션 1 */}
      <View style={styles.section}>
        <Animated.View style={[styles.sectionTitle, { opacity }]} />
        <View style={styles.artworkRow}>
          {[1, 2, 3].map((item) => (
            <View key={item} style={styles.artworkCard}>
              <Animated.View style={[styles.artworkImage, { opacity }]} />
              <Animated.View style={[styles.artworkTitle, { opacity }]} />
              <Animated.View style={[styles.artworkArtist, { opacity }]} />
            </View>
          ))}
        </View>
      </View>

      {/* 박물관 섹션 2 */}
      <View style={styles.section}>
        <Animated.View style={[styles.sectionTitle, { opacity }]} />
        <View style={styles.artworkRow}>
          {[1, 2, 3].map((item) => (
            <View key={item} style={styles.artworkCard}>
              <Animated.View style={[styles.artworkImage, { opacity }]} />
              <Animated.View style={[styles.artworkTitle, { opacity }]} />
              <Animated.View style={[styles.artworkArtist, { opacity }]} />
            </View>
          ))}
        </View>
      </View>

      {/* 박물관 섹션 3 */}
      <View style={styles.section}>
        <Animated.View style={[styles.sectionTitle, { opacity }]} />
        <View style={styles.artworkRow}>
          {[1, 2, 3].map((item) => (
            <View key={item} style={styles.artworkCard}>
              <Animated.View style={[styles.artworkImage, { opacity }]} />
              <Animated.View style={[styles.artworkTitle, { opacity }]} />
              <Animated.View style={[styles.artworkArtist, { opacity }]} />
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 0,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    width: 150,
    height: 24,
    borderRadius: 4,
    marginBottom: 16,
    marginLeft: 20,
    backgroundColor: '#2a2a2a',
  },
  artworkRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  artworkCard: {
    width: 116,
    marginRight: 17,
  },
  artworkImage: {
    width: 116,
    height: 163,
    borderRadius: 5,
    marginBottom: 13,
    backgroundColor: '#2a2a2a',
  },
  artworkTitle: {
    width: '80%',
    height: 15,
    borderRadius: 3,
    marginBottom: 3,
    backgroundColor: '#2a2a2a',
  },
  artworkArtist: {
    width: '60%',
    height: 12,
    borderRadius: 3,
    backgroundColor: '#2a2a2a',
  },
});

export default CustomSkeleton; 