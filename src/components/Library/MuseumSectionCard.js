import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const MuseumSectionCard = ({ 
  title, 
  videoCount, 
  museumImage, 
  onPress,
  isExpanded = false,
  style 
}) => {
  return (
    <TouchableOpacity 
      style={[styles.card, style]} 
      onPress={onPress}
      activeOpacity={0.8}
    >
      {/* 좌측: 텍스트 정보 */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.videoCount}>{videoCount}개의 영상</Text>
      </View>
      
      {/* 우측: 박물관 이미지와 화살표 */}
      <View style={styles.rightContainer}>
        <View style={styles.imageContainer}>
          <Image 
            source={museumImage} 
            style={styles.museumImage}
            resizeMode="cover"
          />
        </View>
        
        {/* 확장/축소 화살표 */}
        <View style={styles.arrowContainer}>
          <Ionicons 
            name={isExpanded ? "chevron-up" : "chevron-down"} 
            size={24} 
            color="#E1B668" 
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingRight: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  videoCount: {
    fontSize: 16,
    color: '#E1B668',
    fontWeight: '600',
    opacity: 0.9,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 12,
    overflow: 'hidden',
  },
  museumImage: {
    width: '100%',
    height: '100%',
  },
  arrowContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MuseumSectionCard; 