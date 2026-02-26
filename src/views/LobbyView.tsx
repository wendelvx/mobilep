import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { BossIcon } from '../components/BossIcon';

export const LobbyView = ({ gameState, playerClass, nickname }: any) => {
  const { boss, class_counts } = gameState;
  const roles = ['Front-end', 'Back-end', 'DevOps', 'QA', 'Security'];

  return (
    <View style={styles.container}>
      {/* SEÇÃO DO CHEFE SELECIONADO */}
      <View style={styles.bossSection}>
        <Text style={styles.overhead}>O Mestre convocou:</Text>
        <BossIcon bossId={boss.id} />
        <Text style={styles.bossName}>{boss.name}</Text>
        <View style={styles.difficultyBadge}>
          <Text style={styles.difficultyText}>DIFICULDADE: {(boss.base_hp / 100000).toFixed(0)}/10</Text>
        </View>
      </View>

      <View style={styles.divider} />

      {/* STATUS DO SQUAD */}
      <Text style={styles.title}>FORMAÇÃO DO SQUAD</Text>
      <Text style={styles.subtitle}>Aguardando autorização para o deploy...</Text>
      
      <View style={styles.lobbyGrid}>
        {roles.map(role => {
          const count = class_counts[role] || 0;
          const isReady = count > 0;
          
          return (
            <View 
              key={role} 
              style={[
                styles.lobbyCard, 
                isReady ? styles.cardReady : styles.cardWaiting
              ]}
            >
              <View style={styles.cardInfo}>
                <Text style={[styles.roleText, { color: isReady ? '#4CAF50' : '#666' }]}>
                  {role}
                </Text>
                <Text style={styles.countText}>{count} no Squad</Text>
              </View>
              {isReady ? (
                <Text style={styles.statusLabel}>OK</Text>
              ) : (
                <ActivityIndicator size="small" color="#444" />
              )}
            </View>
          );
        })}
      </View>

      {/* RODAPÉ DE IDENTIFICAÇÃO */}
      <View style={styles.footer}>
        <Text style={styles.waitText}>
          HERÓI: <Text style={styles.highlight}>{nickname}</Text> | CLASSE: <Text style={styles.highlight}>{playerClass}</Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0c0c0c', justifyContent: 'center', alignItems: 'center', padding: 30 },
  
  // Seção do Boss
  bossSection: { alignItems: 'center', marginBottom: 30 },
  overhead: { color: '#888', fontSize: 10, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 10 },
  bossName: { color: '#fff', fontSize: 24, fontWeight: '900', letterSpacing: 1, textAlign: 'center' },
  difficultyBadge: { backgroundColor: '#222', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 4, marginTop: 8 },
  difficultyText: { color: '#FFEB3B', fontSize: 10, fontWeight: 'bold' },
  
  divider: { width: '40%', height: 1, backgroundColor: '#333', marginVertical: 20 },

  // Squad Grid
  title: { color: '#fff', fontSize: 20, fontWeight: 'bold', textAlign: 'center' },
  subtitle: { color: '#555', fontSize: 13, textAlign: 'center', marginBottom: 25 },
  lobbyGrid: { width: '100%', gap: 10 },
  lobbyCard: { 
    padding: 15, 
    borderRadius: 12, 
    borderWidth: 1, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center' 
  },
  cardWaiting: { backgroundColor: '#151515', borderColor: '#222' },
  cardReady: { backgroundColor: '#151515', borderColor: '#4CAF50', borderLeftWidth: 6 },
  
  cardInfo: { flex: 1 },
  roleText: { fontSize: 16, fontWeight: 'bold' },
  countText: { color: '#444', fontSize: 11, marginTop: 2 },
  statusLabel: { color: '#4CAF50', fontWeight: 'bold', fontSize: 12 },

  // Footer
  footer: { marginTop: 30, borderTopWidth: 1, borderTopColor: '#222', paddingTop: 15, width: '100%' },
  waitText: { color: '#444', fontSize: 11, textAlign: 'center' },
  highlight: { color: '#888', fontWeight: 'bold' }
});