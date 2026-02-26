import React from 'react';
import { StyleSheet, Text } from 'react-native';

interface BossIconProps {
  bossId: string;
}

export const BossIcon = ({ bossId }: BossIconProps) => {
  // Mapeamento de IDs para Emojis baseados nos Perfis da V2.0
  const icons: Record<string, string> = {
    arquiteto: '🏛️',      // Backend
    pixel_perfect: '🎨',  // Frontend
    tcc_titan: '🐉',      // Boss Final
    guardiao: '🛡️',       // Security/QA
  };

  return (
    <Text style={styles.bossEmoji}>
      {icons[bossId] || '👾'} 
    </Text>
  );
};

const styles = StyleSheet.create({
  bossEmoji: {
    fontSize: 80,
    marginBottom: 10,
    // Brilho externo para dar um ar de "entidade"
    textShadowColor: 'rgba(255, 77, 77, 0.8)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
});