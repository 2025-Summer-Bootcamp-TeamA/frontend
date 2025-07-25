import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur';
import Icon from 'react-native-vector-icons/Ionicons';

export default function MuseumChooseCard({ name, address, pieces, onPress }) {
  return (
    <TouchableOpacity style={styles.cardWrapper} onPress={onPress} activeOpacity={0.85}>
      <View style={styles.borderContainer}>
        <BlurView intensity={80} tint="dark" style={styles.blurContainer}>
          <View style={styles.content}>
            <View style={styles.textBlock}>
              <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">{name}</Text>
              <Text style={styles.address} numberOfLines={1} ellipsizeMode="tail">{address}</Text>
              <Text style={styles.pieces}>{pieces}</Text>
            </View>
            <Icon name="chevron-forward" size={28} color="#fff" style={styles.chevron} />
          </View>
        </BlurView>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardWrapper: {
    marginBottom: 24,
    borderRadius: 20,
    overflow: 'visible', // borderContainer가 border를 담당하므로 visible
  },
  borderContainer: {
    borderRadius: 20,
    borderWidth: 0.6, // 더 두껍게 하고 싶으면 값 증가
    borderColor: '#fff', // 완전한 흰색!
    overflow: 'hidden', // BlurView와 내용이 border 밖으로 안 나가게
  },
  blurContainer: {
    padding: 20,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.07)',
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textBlock: {
    flex: 1,
    minWidth: 0,
  },
  chevron: {
    marginLeft: 16,
    flexShrink: 0,
  },
  name: { color: '#fff', fontWeight: 'bold', fontSize: 20, marginBottom: 4 },
  address: { color: '#fff', fontSize: 14, marginBottom: 2 },
  pieces: { color: '#fff', fontSize: 13, opacity: 0.8 },
});