import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/authSlice';

export default function ProfileActions() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <View style={styles.bottomRow}>
      <TouchableOpacity onPress={handleLogout}>
        <Text style={styles.bottomText}>로그아웃</Text>
      </TouchableOpacity>
      <Text style={styles.bottomDivider}> | </Text>
      <TouchableOpacity>
        <Text style={styles.bottomText}>회원탈퇴</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomRow: {
    position: 'absolute',
    bottom: 40,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  bottomText: {
    color: '#fff',
    fontSize: 14,
    opacity: 0.7,
  },
  bottomDivider: {
    color: '#fff',
    fontSize: 14,
    opacity: 0.7,
    marginHorizontal: 8,
  },
});