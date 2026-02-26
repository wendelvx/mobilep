import React from 'react';
import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BossIcon } from '../components/BossIcon';
import { HPBar } from '../components/HPBar';

export const ArenaView = ({ gameState, playerClass, onAttack }: any) => {
  const { boss, team_hp, max_team_hp, multiplier, active_incident } = gameState;

  const themes: any = {
    'Front-end': { color: '#E44D26', label: 'ATTACK CRIT 💥' },
    'Back-end': { color: '#3776AB', label: 'REFACTOR HIT ⚙️' },
    'DevOps': { color: '#2496ED', label: 'OPTIMIZE ⚡' },
    'QA': { color: '#4CAF50', label: 'FIX BUG 🛠️' },
    'Security': { color: '#9C27B0', label: 'ENCRYPT 🔒' },
  };

  const currentTheme = themes[playerClass] || { color: '#fff', label: 'ACTION' };

  return (
    <View style={styles.battleContainer}>
      <StatusBar barStyle="light-content" />
      
      <View style={styles.header}>
        <BossIcon />
        <HPBar label="TITAN HP" current={boss.hp} max={boss.max_hp} color="#ff4d4d" />
        <HPBar label="INTEGRIDADE" current={team_hp} max={max_team_hp} color="#4CAF50" />
        <Text style={styles.multLabel}>POTÊNCIA ATUAL: {multiplier.toFixed(2)}x</Text>
      </View>

      <View style={styles.actionArea}>
        {active_incident ? (
          <IncidentUI incident={active_incident} playerClass={playerClass} onAttack={onAttack} />
        ) : (
          <TouchableOpacity 
            activeOpacity={0.7} 
            style={[styles.attackCircle, { borderColor: currentTheme.color }]} 
            onPress={() => onAttack()}
          >
            <Text style={[styles.attackText, { color: currentTheme.color }]}>{currentTheme.label}</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.footer}>
        <Text style={styles.playerInfo}>Role: {playerClass} | Dungeon Master API</Text>
      </View>
    </View>
  );
};

// Sub-componente interno para os Incidentes
const IncidentUI = ({ incident, playerClass, onAttack }: any) => {
  const configs: any = {
    error_500: { title: "ERROR 500", sub: playerClass === 'DevOps' ? "DE-DEPLOY!" : "Aguarde DevOps", btn: "🚀 RE-DEPLOY", class: "DevOps", color: "#fff" },
    code_review: { title: "CODE REVIEW", sub: "Spam cura o Boss! Clique devagar.", btn: "📝 ANALISAR", class: "ANY", color: "#ffcc00" },
    phishing: { title: "PHISHING!", sub: "Cuidado com os links!", btn: "🛡️ FIREWALL", class: "Security", color: "#9C27B0" },
    legacy_code_spill: { title: "LEGACY SPILL", sub: playerClass === 'Back-end' ? "REFATORAR!" : "Aguarde Back-end", btn: "🛠️ REFACTOR", class: "Back-end", color: "#3776AB" },
    database_lock: { title: "DB LOCKED", sub: playerClass === 'Security' ? "DESTRAVE O DB!" : "Aguarde Security", btn: "🔓 UNLOCK DB", class: "Security", color: "#3498db" },
  };

  const config = configs[incident];

  return (
    <View style={styles.incidentBox}>
      <Text style={[styles.errorTitle, { color: config.color === "#fff" ? "#fff" : config.color }]}>{config.title}</Text>
      <Text style={styles.errorSubtitle}>{config.sub}</Text>
      {incident === "phishing" && (
        <TouchableOpacity style={styles.fakeButton} onPress={() => onAttack(true)}>
          <Text style={{ fontWeight: 'bold' }}>🎁 XP GRÁTIS AQUI!</Text>
        </TouchableOpacity>
      )}
      {(config.class === playerClass || config.class === "ANY") && (
        <TouchableOpacity style={[styles.specialButton, { backgroundColor: config.color }]} onPress={() => onAttack()}>
          <Text style={styles.specialText}>{config.btn}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  battleContainer: { flex: 1, backgroundColor: '#0a0a0a', justifyContent: 'space-around', alignItems: 'center', padding: 20 },
  header: { alignItems: 'center', width: '100%' },
  multLabel: { color: '#FFEB3B', fontSize: 12, marginTop: 10, fontWeight: 'bold' },
  actionArea: { width: '100%', alignItems: 'center' },
  attackCircle: { width: 200, height: 200, borderRadius: 100, backgroundColor: '#111', justifyContent: 'center', alignItems: 'center', borderWidth: 8 },
  attackText: { fontSize: 20, fontWeight: 'bold', textAlign: 'center' },
  incidentBox: { alignItems: 'center', width: '100%' },
  errorTitle: { fontSize: 38, fontWeight: 'bold' },
  errorSubtitle: { color: '#fff', fontSize: 16, textAlign: 'center', marginVertical: 15 },
  specialButton: { padding: 20, borderRadius: 15, width: '80%' },
  specialText: { color: '#000', fontSize: 18, fontWeight: 'bold', textAlign: 'center' },
  fakeButton: { backgroundColor: '#ffcc00', padding: 15, borderRadius: 10, width: '80%', marginBottom: 15, alignItems: 'center' },
  footer: { borderTopWidth: 1, borderTopColor: '#222', width: '100%', alignItems: 'center', paddingTop: 10 },
  playerInfo: { color: '#444', fontSize: 12 }
});