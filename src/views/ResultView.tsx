import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const ResultView = ({ status }: { status: string }) => {
  const isVictory = status === "VICTORY";

  return (
    <View style={[styles.container, { backgroundColor: isVictory ? '#030' : '#400' }]}>
      <Text style={styles.title}>{isVictory ? "VITÓRIA!" : "GAME OVER"}</Text>
      <Text style={styles.subtitle}>
        {isVictory ? "TCC APROVADO COM 10!" : "O projeto virou código legado."}
      </Text>
      <Text style={{color: '#fff', marginTop: 30}}>Aguarde o Mestre reiniciar o sistema.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 30 },
  title: { color: '#fff', fontSize: 30, fontWeight: 'bold', textAlign: 'center' },
  subtitle: { color: '#888', fontSize: 16, textAlign: 'center' },
});