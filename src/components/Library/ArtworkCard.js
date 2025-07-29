import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const ArtworkCard = ({ 
  thumbnailUrl, 
  artworkInfo, 
  onPress, 
  isSelectMode = false, 
  selectedIds = [], 
  videoId 
}) => {
  const isSelected = selectedIds.includes(videoId);

  return (
    <TouchableOpacity 
      style={[
        styles.card, 
        isSelectMode && isSelected && styles.cardSelected
      ]} 
      activeOpacity={0.8} 
      onPress={onPress}
    >
      <View style={styles.imageContainer}>
        <Image 
          source={thumbnailUrl} 
          style={styles.image}
        />
        
        {/* 그라데이션 오버레이 */}
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.7)']}
          style={styles.gradientOverlay}
        />
        
        {/* 선택 모드일 때 체크박스 표시 */}
        {isSelectMode && (
          <View style={[
            styles.checkbox, 
            isSelected && styles.checkboxSelected
          ]}>
            {isSelected && (
              <Ionicons name="checkmark" size={16} color="white" />
            )}
          </View>
        )}
        
        {/* 재생 버튼 오버레이 */}
        <View style={styles.playButton}>
          <View style={styles.playIcon}>
            <Ionicons name="play" size={16} color="white" />
          </View>
        </View>
      </View>
      
      {/* 텍스트 정보 */}
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
          {artworkInfo.title}
        </Text>
        <Text style={styles.artist} numberOfLines={1} ellipsizeMode="tail">
          {artworkInfo.artist}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 120,
    marginRight: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
  },
  cardSelected: {
    backgroundColor: 'rgba(225, 182, 104, 0.15)',
    borderWidth: 1.5,
    borderColor: '#E1B668',
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 8,
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    backgroundColor: '#2A2A2A',
  },
  gradientOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
    borderRadius: 8,
  },
  checkbox: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.8)',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  checkboxSelected: {
    backgroundColor: '#E1B668',
    borderColor: '#E1B668',
  },
  playButton: {
    position: 'absolute',
    bottom: 6,
    right: 6,
  },
  playIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 2,
    textAlign: 'left',
    lineHeight: 18,
  },
  artist: {
    color: '#E1B668',
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'left',
    opacity: 0.9,
    lineHeight: 14,
  },
});

export default ArtworkCard; 