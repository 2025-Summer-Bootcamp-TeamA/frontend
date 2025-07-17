import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const MainFeatureCard = ({ imageSource, title, subtitle}) => (
  <View style={styles.card}>
    <Image source={imageSource} style={styles.image} resizeMode="cover" />
    <LinearGradient
      colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0)']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.gradientOverlay}
    />
    {/* 텍스트 오버레이 */}
    <View style={styles.textOverlay}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
    {/* 시작하기 버튼 */}
    <TouchableOpacity style={styles.glassButton} activeOpacity={0.85}>
      <Text style={styles.buttonText}>시작하기</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  card: {
    width: 358,
    height: 363,
    borderRadius: 8,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 0,
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 1,
  },
  textOverlay: {
    position: 'absolute',
    top: 95,
    left: 13,
    alignItems: 'flex-start',
    zIndex: 2,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 12,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 16,
    fontWeight: '500',
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  glassButton: {
    position: 'absolute',
    left: 84,
    right: 84,
    bottom: 37,
    width: 190,
    height: 46,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    zIndex: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: 1,
  },
});

export default MainFeatureCard; 