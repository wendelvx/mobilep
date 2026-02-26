import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface HPBarProps {
  label: string;
  current: number;
  max: number;
  color: string;
}

export const HPBar = ({ label, current, max, color }: HPBarProps) => {
  // Garante que a porcentagem não quebre o layout se o HP for negativo ou exceder o max
  const percentage = Math.max(0, Math.min(100, (current / max) * 100));

  return (
    <View style={styles.container}>
      <View style={styles.labelRow}>
        <Text style={[styles.hpLabel, { color: '#fff' }]}>{label}</Text>
        <Text style={[styles.hpValue, { color }]}>{current.toLocaleString()}</Text>
      </View>
      
      <View style={[styles.barContainer, { borderColor: color }]}>
        <View 
          style={[
            styles.fill, 
            { 
              width: `${percentage}%`, 
              backgroundColor: color,
              // Adiciona uma leve opacidade para o efeito de "energia"
              shadowColor: color,
              shadowOpacity: 0.5,
              shadowRadius: 5,
              elevation: 5
            }
          ]} 
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    width: '100%', 
    alignItems: 'center', 
    marginBottom: 15 
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginBottom: 4
  },
  hpLabel: { 
    fontSize: 12, 
    fontWeight: 'bold', 
    textTransform: 'uppercase',
    letterSpacing: 1
  },
  hpValue: {
    fontSize: 12,
    fontWeight: '900'
  },
  barContainer: { 
    width: '90%', 
    height: 14, 
    backgroundColor: '#1a1a1a', 
    borderRadius: 7, 
    borderWidth: 1, 
    overflow: 'hidden' 
  },
  fill: { 
    height: '100%',
    borderRadius: 7
  },
});