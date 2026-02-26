import * as Haptics from 'expo-haptics';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, StatusBar } from 'react-native';
import { io, Socket } from 'socket.io-client';

// URL do seu túnel Cloudflare (Atualizada conforme seu último prompt)
const SERVER_URL = 'https://potato-hiv-theoretical-consistency.trycloudflare.com'; 

export default function GameScreen() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [playerClass, setPlayerClass] = useState<string | null>(null);
  const [gameState, setGameState] = useState<any>(null);
  
  // Estado para controlar se o jogo foi resetado pelo mestre
  const [lastReset, setLastReset] = useState(0);

  useEffect(() => {
    const s = io(SERVER_URL);
    setSocket(s);

    s.on('boss_update', (data: any) => {
      setGameState(data);
    });

    return () => { s.disconnect(); };
  }, []);

  // Monitora o ResetTrigger vindo do Go para voltar à estaca zero
  useEffect(() => {
    if (gameState && gameState.reset_trigger > lastReset) {
      setLastReset(gameState.reset_trigger);
      setPlayerClass(null); // Joga o usuário de volta para a escolha de roles
    }
  }, [gameState]);

  const selectClass = (className: string) => {
    setPlayerClass(className);
    socket?.emit('join_game', { nickname: 'Dev', class: className });
  };

  const handleAction = (isFake: boolean = false) => {
    if (!playerClass) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    socket?.emit('attack', { isFake });
  };

  // --- RENDERIZAÇÃO DE INTERFACES ---

  // 1. SELEÇÃO DE CLASSE
  if (!playerClass) {
    const classes = [
      { id: 'Front-end', color: '#E44D26', desc: 'Dano Crítico Massivo' },
      { id: 'Back-end', color: '#3776AB', desc: 'Refatoração e Dano Estável' },
      { id: 'DevOps', color: '#2496ED', desc: 'Deploy e Multiplicador' },
      { id: 'QA', color: '#4CAF50', desc: 'Testes e Cura de Integridade' },
      { id: 'Security', color: '#9C27B0', desc: 'Defesa e Firewall' },
    ];

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.title}>THE TCC TITAN</Text>
        <Text style={styles.subtitle}>Escolha sua especialidade:</Text>
        {classes.map((c) => (
          <TouchableOpacity 
            key={c.id} 
            style={[styles.classButton, { borderColor: c.color }]} 
            onPress={() => selectClass(c.id)}
          >
            <Text style={[styles.buttonText, { color: c.color }]}>{c.id}</Text>
            <Text style={styles.classDesc}>{c.desc}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  }

  if (!gameState) return (
    <View style={styles.container}>
      <Text style={{color: '#fff'}}>Conectando ao Reino...</Text>
    </View>
  );

  const { status, boss, team_hp, max_team_hp, multiplier, active_incident, class_counts } = gameState;

  // 2. LOBBY DE ESPERA
  if (status === "WAITING") {
    const roles = ['Front-end', 'Back-end', 'DevOps', 'QA', 'Security'];
    return (
      <View style={styles.container}>
        <Text style={styles.title}>SQUAD FORMANDO</Text>
        <Text style={styles.subtitle}>Aguardando autorização do Mestre...</Text>
        <View style={styles.lobbyGrid}>
          {roles.map(r => (
            <View key={r} style={[styles.lobbyCard, class_counts[r] > 0 && styles.cardReady]}>
              <Text style={{ color: class_counts[r] > 0 ? '#4CAF50' : '#444', fontWeight: 'bold' }}>
                {r}: {class_counts[r] > 0 ? 'PRONTO' : 'FALTANDO'}
              </Text>
            </View>
          ))}
        </View>
        <Text style={styles.waitText}>Você é: {playerClass}</Text>
      </View>
    );
  }

  // 3. FIM DE JOGO
  if (status === "GAMEOVER" || status === "VICTORY") {
    return (
      <View style={[styles.container, { backgroundColor: status === "VICTORY" ? '#030' : '#400' }]}>
        <Text style={styles.title}>{status === "VICTORY" ? "VITÓRIA!" : "GAME OVER"}</Text>
        <Text style={styles.subtitle}>
          {status === "VICTORY" ? "TCC APROVADO COM 10!" : "O projeto virou código legado."}
        </Text>
        <Text style={{color: '#fff', marginTop: 30}}>Aguarde o Mestre reiniciar o sistema.</Text>
      </View>
    );
  }

  // 4. LÓGICA VISUAL DE BATALHA E INCIDENTES
  const theme = {
    'Front-end': { color: '#E44D26', label: 'ATTACK CRIT 💥' },
    'Back-end': { color: '#3776AB', label: 'REFACTOR HIT ⚙️' },
    'DevOps': { color: '#2496ED', label: 'OPTIMIZE ⚡' },
    'QA': { color: '#4CAF50', label: 'FIX BUG 🛠️' },
    'Security': { color: '#9C27B0', label: 'ENCRYPT 🔒' },
  }[playerClass || ''] || { color: '#fff', label: 'ACTION' };

  return (
    <View style={styles.battleContainer}>
      <StatusBar barStyle="light-content" />
      
      <View style={styles.header}>
        {/* ADIÇÃO: O Boss Dragão agora aparece no Mobile também */}
        <Text style={styles.bossEmoji}>🐉</Text>

        <Text style={styles.hpLabel}>TITAN HP: {boss.hp.toLocaleString()}</Text>
        <View style={[styles.barContainer, { borderColor: '#ff4d4d' }]}>
            <View style={[styles.bossFill, { width: `${(boss.hp / boss.max_hp) * 100}%` }]} />
        </View>

        <Text style={[styles.hpLabel, { color: '#4CAF50', marginTop: 15 }]}>INTEGRIDADE: {team_hp}</Text>
        <View style={[styles.barContainer, { borderColor: '#4CAF50' }]}>
            <View style={[styles.integrityFill, { width: `${(team_hp / max_team_hp) * 100}%` }]} />
        </View>
        
        <Text style={[styles.hpLabel, { color: '#FFEB3B', fontSize: 12, marginTop: 10 }]}>POTÊNCIA ATUAL: {multiplier.toFixed(2)}x</Text>
      </View>

      <View style={{ width: '100%', alignItems: 'center' }}>
        {active_incident === "error_500" ? (
          <View style={styles.incidentBox}>
            <Text style={styles.errorTitle}>ERROR 500</Text>
            <Text style={styles.errorSubtitle}>{playerClass === 'DevOps' ? "VOCÊ PRECISA DAR RE-DEPLOY!" : "Servidor caiu. Aguarde DevOps."}</Text>
            {playerClass === 'DevOps' && (
              <TouchableOpacity style={styles.specialButton} onPress={() => handleAction()}>
                <Text style={styles.specialText}>🚀 RE-DEPLOY</Text>
              </TouchableOpacity>
            )}
          </View>
        ) : active_incident === "code_review" ? (
          <View style={styles.incidentBox}>
            <Text style={styles.errorTitle}>CODE REVIEW</Text>
            <Text style={styles.errorSubtitle}>Spam de cliques cura o Boss! Clique devagar.</Text>
            <TouchableOpacity style={[styles.specialButton, {backgroundColor: '#ffcc00'}]} onPress={() => handleAction()}>
              <Text style={styles.specialText}>📝 ANALISAR</Text>
            </TouchableOpacity>
          </View>
        ) : active_incident === "phishing" ? (
          <View style={styles.incidentBox}>
            <Text style={styles.errorTitle}>PHISHING!</Text>
            <TouchableOpacity style={styles.fakeButton} onPress={() => handleAction(true)}>
              <Text style={styles.buttonText}>🎁 XP GRÁTIS AQUI!</Text>
            </TouchableOpacity>
            {playerClass === 'Security' && (
              <TouchableOpacity style={[styles.specialButton, {backgroundColor: '#9C27B0'}]} onPress={() => handleAction()}>
                <Text style={[styles.specialText, {color: '#fff'}]}>🛡️ CLEAN FIREWALL</Text>
              </TouchableOpacity>
            )}
          </View>
        ) : active_incident === "legacy_code_spill" ? (
            <View style={styles.incidentBox}>
              <Text style={styles.errorTitle}>LEGACY SPILL</Text>
              <Text style={styles.errorSubtitle}>{playerClass === 'Back-end' ? "VOCÊ PRECISA REFATORAR!" : "Dano dobrado! Aguarde Back-end."}</Text>
              {playerClass === 'Back-end' && (
                <TouchableOpacity style={[styles.specialButton, {backgroundColor: '#3776AB'}]} onPress={() => handleAction()}>
                  <Text style={[styles.specialText, {color: '#fff'}]}>🛠️ REFACTOR</Text>
                </TouchableOpacity>
              )}
            </View>
        ) : active_incident === "database_lock" ? (
            <View style={styles.incidentBox}>
              <Text style={[styles.errorTitle, {color: '#3498db'}]}>DB LOCKED</Text>
              <Text style={styles.errorSubtitle}>{playerClass === 'Security' ? "DESTRAVE O BANCO DE DADOS AGORA!" : "Transações travadas. Aguarde Security."}</Text>
              {playerClass === 'Security' && (
                <TouchableOpacity style={[styles.specialButton, {backgroundColor: '#3498db'}]} onPress={() => handleAction()}>
                  <Text style={[styles.specialText, {color: '#fff'}]}>🔓 UNLOCK DB</Text>
                </TouchableOpacity>
              )}
            </View>
        ) : (
          <TouchableOpacity 
            activeOpacity={0.7} 
            style={[styles.attackCircle, { borderColor: theme.color }]} 
            onPress={() => handleAction()}
          >
            <Text style={[styles.attackText, { color: theme.color }]}>{theme.label}</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.footer}>
        <Text style={styles.playerInfo}>Role: {playerClass} | Servidor: Cloudflare Tunnel</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', justifyContent: 'center', alignItems: 'center', padding: 30 },
  battleContainer: { flex: 1, backgroundColor: '#0a0a0a', justifyContent: 'space-around', alignItems: 'center', padding: 20 },
  title: { color: '#fff', fontSize: 30, fontWeight: 'bold', textAlign: 'center' },
  subtitle: { color: '#888', fontSize: 16, textAlign: 'center', marginBottom: 20 },
  classButton: { backgroundColor: '#1a1a1a', padding: 15, borderRadius: 12, width: '100%', marginBottom: 10, borderWidth: 2 },
  buttonText: { fontSize: 18, fontWeight: 'bold', textAlign: 'center' },
  classDesc: { color: '#555', fontSize: 12, textAlign: 'center', marginTop: 4 },
  lobbyGrid: { width: '100%', gap: 8 },
  lobbyCard: { padding: 12, backgroundColor: '#1a1a1a', borderRadius: 8, borderWidth: 1, borderColor: '#333' },
  cardReady: { borderColor: '#4CAF50' },
  header: { alignItems: 'center', width: '100%', marginTop: 10 },
  
  // Estilo para o Boss Dragão (Replica o brilho do index.html)
  bossEmoji: {
    fontSize: 80,
    marginBottom: 10,
    textShadowColor: 'rgba(255, 77, 77, 0.8)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },

  hpLabel: { color: '#fff', fontSize: 14, fontWeight: 'bold', marginVertical: 4 },
  barContainer: { width: '90%', height: 16, backgroundColor: '#222', borderRadius: 8, borderWidth: 1, overflow: 'hidden' },
  bossFill: { height: '100%', backgroundColor: '#ff4d4d' },
  integrityFill: { height: '100%', backgroundColor: '#4CAF50' },
  attackCircle: { width: 220, height: 220, borderRadius: 110, backgroundColor: '#111', justifyContent: 'center', alignItems: 'center', borderWidth: 8 },
  attackText: { fontSize: 22, fontWeight: 'bold', textAlign: 'center' },
  incidentBox: { alignItems: 'center', width: '100%' },
  errorTitle: { color: '#fff', fontSize: 38, fontWeight: 'bold' },
  errorSubtitle: { color: '#fff', fontSize: 16, textAlign: 'center', marginVertical: 15 },
  specialButton: { backgroundColor: '#fff', padding: 20, borderRadius: 15, width: '80%' },
  specialText: { color: '#000', fontSize: 18, fontWeight: 'bold', textAlign: 'center' },
  fakeButton: { backgroundColor: '#ffcc00', padding: 20, borderRadius: 10, width: '80%', marginBottom: 20 },
  waitText: { color: '#aaa', fontStyle: 'italic', marginTop: 20 },
  footer: { borderTopWidth: 1, borderTopColor: '#222', width: '100%', alignItems: 'center', paddingTop: 10 },
  playerInfo: { color: '#444', fontSize: 12 }
});