import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import PhotoRemoveModal from './PhotoRemoveModal';

const UploadCard = ({ title = "작품 사진 업로드", subtitle = "작품을 화면 중앙에 맞춰 촬영해주세요", onCapture, buttonTitle = "촬영하기", photo, onRemove }) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.uploadCard}>
      {photo ? (
        <>
          <Image source={{ uri: photo }} style={styles.fullImage} resizeMode="contain" />
          {/* X 버튼 우측 상단에 배치 */}
          <TouchableOpacity style={styles.removeButton} onPress={() => setModalVisible(true)}>
            <Text style={styles.removeButtonText}>×</Text>
          </TouchableOpacity>
          <PhotoRemoveModal
            visible={modalVisible}
            onCancel={() => setModalVisible(false)}
            onDelete={() => {
              setModalVisible(false);
              onRemove && onRemove();
            }}
          />
        </>
      ) : (
        <>
          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={styles.cardSubtitle}>{subtitle}</Text>
          <TouchableOpacity style={styles.captureButton} onPress={onCapture}>
            <Text style={styles.captureButtonText}>{buttonTitle}</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  uploadCard: {
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderStyle: 'dashed',
    borderRadius: 12,
    width: 350, // 카드 크기 고정
    height: 300,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    overflow: 'hidden',
    padding: 0, // padding 제거
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
  previewImage: {
    width: 180,
    height: 180,
    borderRadius: 12,
    marginBottom: 16,
    backgroundColor: '#222',
  },
  fullImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  removeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 16,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
    elevation: 2,
  },
  removeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 26,
    lineHeight: 28,
    textAlign: 'center',
  },
});

export default UploadCard; 