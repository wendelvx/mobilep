import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface HPBarProps {
  label: string;
  current: number;
  max: number;
  color: string;
}

export const HPBar = ({ label, current, max, color }: HPBarProps) => {
  const percentage = Math.max(0, Math.min(100, (current / max) * 100));

  return (
    <View style={{ width: '100%', alignItems: 'center', marginBottom: 15 }}>
      <Text style={[styles.hpLabel, { color: color === '#ff4d4d' ? '#fff' : color }]}>
        {label}: {current.toLocaleString()}
      </Text>
      <View style={[styles.barContainer, { borderColor: color }]}>
        <View style={[styles.fill, { width: `${percentage}%`, backgroundColor: color }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  hpLabel: { fontSize: 14, fontWeight: 'bold', marginVertical: 4 },
  barContainer: { 
    width: '90%', 
    height: 16, 
    backgroundColor: '#222', 
    borderRadius: 8, 
    borderWidth: 1, 
    overflow: 'hidden' 
  },
  fill: { height: '100%' },
});