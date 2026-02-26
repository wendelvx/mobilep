import React from 'react';
import { StyleSheet, Text } from 'react-native';

export const BossIcon = () => {
  return <Text style={styles.bossEmoji}>🐉</Text>;
};

const styles = StyleSheet.create({
  bossEmoji: {
    fontSize: 80,
    marginBottom: 10,
    textShadowColor: 'rgba(255, 77, 77, 0.8)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
});