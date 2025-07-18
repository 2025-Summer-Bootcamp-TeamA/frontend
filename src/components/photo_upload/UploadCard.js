import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const UploadCard = ({ title = "작품 사진 업로드", subtitle = "작품을 화면 중앙에 맞춰 촬영해주세요", onCapture, buttonTitle = "촬영하기" }) => {
  return (
    <View style={styles.uploadCard}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardSubtitle}>{subtitle}</Text>
      <TouchableOpacity style={styles.captureButton} onPress={onCapture}>
        <Text style={styles.captureButtonText}>{buttonTitle}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  uploadCard: {
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: 55,
    marginBottom: 25,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  cardTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  cardSubtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 20,
  },
  captureButton: {
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  captureButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default UploadCard; 