import React from 'react';
import { Image, Platform, StyleSheet, View } from 'react-native';

interface BossIconProps {
  bossId: string;
}

// MAPEAMENTO DE IMAGENS .JPG
// Importante: No React Native, o require precisa do caminho estático completo.
const bossImages: Record<string, any> = {
  arquiteto: require('../../assets/bosses/arquiteto.jpg'),
  pixel_perfect: require('../../assets/bosses/pixel_perfect.jpg'),
  tcc_titan: require('../../assets/bosses/tcc_titan.jpg'),
  guardiao: require('../../assets/bosses/guardiao.jpg'),
  fallback: require('../../assets/bosses/tcc_titan.jpg'), // Imagem padrão
};

export const BossIcon = ({ bossId }: BossIconProps) => {
  const source = bossImages[bossId] || bossImages.fallback;

  return (
    <View style={styles.container}>
      <View style={styles.glowContainer}>
        <Image 
          source={source} 
          style={styles.bossImage} 
          resizeMode="cover" 
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  glowContainer: {
    width: 130,
    height: 130,
    borderRadius: 65, // Metade do tamanho para ficar circular
    backgroundColor: '#000',
    borderWidth: 3,
    borderColor: '#ff4d4d',
    
    // Efeito de Brilho (iOS)
    shadowColor: '#ff4d4d',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 20,

    // Efeito de Brilho (Android)
    elevation: 15,
    overflow: Platform.OS === 'ios' ? 'visible' : 'hidden', // No Android, elevation precisa de contenção
  },
  bossImage: {
    width: '100%',
    height: '100%',
    borderRadius: 62, // Um pouco menor que o container para o border aparecer
  },
});