import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const LobbyView = ({ gameState, playerClass }: any) => {
  const roles = ['Front-end', 'Back-end', 'DevOps', 'QA', 'Security'];
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>SQUAD FORMANDO</Text>
      <Text style={styles.subtitle}>Aguardando autorização do Mestre...</Text>
      <View style={styles.lobbyGrid}>
        {roles.map(r => (
          <View key={r} style={[styles.lobbyCard, gameState.class_counts[r] > 0 && styles.cardReady]}>
            <Text style={{ color: gameState.class_counts[r] > 0 ? '#4CAF50' : '#444', fontWeight: 'bold' }}>
              {r}: {gameState.class_counts[r] > 0 ? 'PRONTO' : 'FALTANDO'}
            </Text>
          </View>
        ))}
      </View>
      <Text style={styles.waitText}>Você é: {playerClass}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', justifyContent: 'center', alignItems: 'center', padding: 30 },
  title: { color: '#fff', fontSize: 30, fontWeight: 'bold', textAlign: 'center' },
  subtitle: { color: '#888', fontSize: 16, textAlign: 'center', marginBottom: 20 },
  lobbyGrid: { width: '100%', gap: 8 },
  lobbyCard: { padding: 12, backgroundColor: '#1a1a1a', borderRadius: 8, borderWidth: 1, borderColor: '#333' },
  cardReady: { borderColor: '#4CAF50' },
  waitText: { color: '#aaa', fontStyle: 'italic', marginTop: 20 },
});