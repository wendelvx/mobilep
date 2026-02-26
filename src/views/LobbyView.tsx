import React from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { BossIcon } from '../components/BossIcon';

export const LobbyView = ({ gameState, playerClass, nickname }: any) => {
  // Desestruturando o boss atualizado enviado pela Engine
  const { boss, class_counts } = gameState;
  const roles = ['Front-end', 'Back-end', 'DevOps', 'QA', 'Security'];

  // Cálculo de dificuldade dinâmico para dar um charme na UI
  const difficulty = (boss.base_hp / 200000).toFixed(0);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* SEÇÃO DO CHEFE SELECIONADO NO HTML */}
      <View style={styles.bossSection}>
        <Text style={styles.overhead}>O MESTRE SELECIONOU:</Text>
        
        {/* O BossIcon agora recebe o boss.id que vem direto do HTML via Socket */}
        <BossIcon bossId={boss.id} />
        
        <Text style={styles.bossName}>{boss.name}</Text>
        
        <View style={styles.difficultyBadge}>
          <Text style={styles.difficultyText}>
            LEVEL DE DIFICULDADE: {difficulty}/10
          </Text>
        </View>
      </View>

      <View style={styles.divider} />

      {/* STATUS DO SQUAD EM TEMPO REAL */}
      <View style={styles.squadSection}>
        <Text style={styles.title}>FORMAÇÃO DO SQUAD</Text>
        <Text style={styles.subtitle}>Sincronizando deploy com a turma...</Text>
        
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
                  <Text style={[styles.roleText, { color: isReady ? '#4CAF50' : '#444' }]}>
                    {role.toUpperCase()}
                  </Text>
                  <Text style={styles.countText}>
                    {count === 0 ? 'AGUARDANDO...' : `${count} ONLINE`}
                  </Text>
                </View>
                
                {isReady ? (
                  <Text style={styles.statusLabel}>PRONTO</Text>
                ) : (
                  <ActivityIndicator size="small" color="#222" />
                )}
              </View>
            );
          })}
        </View>
      </View>

      {/* RODAPÉ DE IDENTIFICAÇÃO DO ALUNO */}
      <View style={styles.footer}>
        <Text style={styles.waitText}>
          LOGADO COMO: <Text style={styles.highlight}>{nickname}</Text>
        </Text>
        <Text style={styles.waitText}>
          CARGO: <Text style={styles.highlight}>{playerClass}</Text>
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flexGrow: 1, 
    backgroundColor: '#0a0a0a', 
    alignItems: 'center', 
    padding: 30,
    paddingTop: 60
  },
  bossSection: { 
    alignItems: 'center', 
    width: '100%',
    marginBottom: 20 
  },
  overhead: { 
    color: '#ff4d4d', 
    fontSize: 10, 
    fontWeight: 'bold',
    textTransform: 'uppercase', 
    letterSpacing: 2, 
    marginBottom: 20 
  },
  bossName: { 
    color: '#fff', 
    fontSize: 26, 
    fontWeight: '900', 
    letterSpacing: 1, 
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  },
  difficultyBadge: { 
    backgroundColor: '#1a1a1a', 
    paddingHorizontal: 12, 
    paddingVertical: 6, 
    borderRadius: 4, 
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#333'
  },
  difficultyText: { 
    color: '#FFEB3B', 
    fontSize: 10, 
    fontWeight: 'bold',
    letterSpacing: 1
  },
  divider: { 
    width: '80%', 
    height: 1, 
    backgroundColor: '#222', 
    marginVertical: 30 
  },
  squadSection: {
    width: '100%',
  },
  title: { 
    color: '#fff', 
    fontSize: 18, 
    fontWeight: 'bold', 
    textAlign: 'center' 
  },
  subtitle: { 
    color: '#444', 
    fontSize: 12, 
    textAlign: 'center', 
    marginBottom: 20,
    marginTop: 5
  },
  lobbyGrid: { 
    width: '100%', 
    gap: 10 
  },
  lobbyCard: { 
    padding: 14, 
    borderRadius: 8, 
    borderWidth: 1, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center' 
  },
  cardWaiting: { 
    backgroundColor: '#0d0d0d', 
    borderColor: '#1a1a1a' 
  },
  cardReady: { 
    backgroundColor: '#0d0d0d', 
    borderColor: '#4CAF50', 
    borderLeftWidth: 4 
  },
  cardInfo: { flex: 1 },
  roleText: { 
    fontSize: 13, 
    fontWeight: 'bold',
    letterSpacing: 1
  },
  countText: { 
    color: '#333', 
    fontSize: 10, 
    marginTop: 2,
    fontWeight: 'bold'
  },
  statusLabel: { 
    color: '#4CAF50', 
    fontWeight: 'bold', 
    fontSize: 10 
  },
  footer: { 
    marginTop: 40, 
    borderTopWidth: 1, 
    borderTopColor: '#1a1a1a', 
    paddingTop: 20, 
    width: '100%',
    alignItems: 'center'
  },
  waitText: { 
    color: '#333', 
    fontSize: 11, 
    lineHeight: 18,
    textTransform: 'uppercase'
  },
  highlight: { 
    color: '#666', 
    fontWeight: 'bold' 
  }
});