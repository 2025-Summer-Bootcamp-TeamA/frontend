import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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
    <TouchableOpacity style={styles.card} activeOpacity={0.7} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image 
          source={thumbnailUrl} 
          style={[
            styles.image, 
            isSelectMode && isSelected && styles.imageDimmed
          ]} 
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
      </View>
      
      <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
        {artworkInfo.title}
      </Text>
      <Text style={styles.artist} numberOfLines={1} ellipsizeMode="tail">
        {artworkInfo.artist}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 116,
    alignItems: 'flex-start',
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 13,
  },
  image: {
    width: 116,
    height: 163,
    borderRadius: 5,
    backgroundColor: '#222', // 이미지 로딩 전 배경
  },
  imageDimmed: {
    opacity: 0.6, // 선택 모드일 때 이미지 흐려짐
  },
  checkbox: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'white',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  title: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600', // semiBold
    marginBottom: 3,
    textAlign: 'left',
    paddingLeft: 2,
    width: '100%',
  },
  artist: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500', // medium
    textAlign: 'left',
    paddingLeft: 2,
    width: '100%',
  },
});

export default ArtworkCard; 