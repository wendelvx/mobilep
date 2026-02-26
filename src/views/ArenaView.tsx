import React from 'react';
// ADICIONADO: ActivityIndicator no import abaixo
import {
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { BossIcon } from '../components/BossIcon';
import { HPBar } from '../components/HPBar';

export const ArenaView = ({ gameState, playerClass, onAttack }: any) => {
  const { boss, boss_hp, team_hp, max_team_hp, multiplier, active_incident } = gameState;

  const themes: any = {
    'Front-end': { color: '#E44D26', label: 'ATTACK CRIT 💥' },
    'Back-end': { color: '#3776AB', label: 'REFACTOR HIT ⚙️' },
    'DevOps': { color: '#2496ED', label: 'OPTIMIZE ⚡' },
    'QA': { color: '#4CAF50', label: 'FIX BUG 🛠️' },
    'Security': { color: '#9C27B0', label: 'ENCRYPT 🔒' },
  };

  const currentTheme = themes[playerClass] || { color: '#fff', label: 'ACTION' };

  return (
    <SafeAreaView style={styles.battleContainer}>
      <StatusBar barStyle="light-content" />
      
      <View style={styles.header}>
        <BossIcon bossId={boss.id} />
        <Text style={styles.bossTitle}>{boss.name}</Text>
        
        <View style={styles.statusGroup}>
          <HPBar label="INTEGRIDADE DO PROF" current={boss_hp} max={boss.base_hp} color="#ff4d4d" />
          <HPBar label="SAÚDE DA TURMA" current={team_hp} max={max_team_hp} color="#4CAF50" />
        </View>

        <View style={styles.multBadge}>
          <Text style={styles.multLabel}>POWER MULTIPLIER: {multiplier.toFixed(2)}x</Text>
        </View>
      </View>

      <View style={styles.actionArea}>
        {active_incident?.id ? (
          <IncidentUI 
            incident={active_incident} 
            playerClass={playerClass} 
            onAttack={onAttack} 
          />
        ) : (
          <TouchableOpacity 
            activeOpacity={0.7} 
            style={[styles.attackCircle, { borderColor: currentTheme.color }]} 
            onPress={() => onAttack()}
          >
            <View style={[styles.innerCircle, { backgroundColor: currentTheme.color + '10' }]}>
              <Text style={[styles.attackText, { color: currentTheme.color }]}>{currentTheme.label}</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.footer}>
        <View style={styles.classBadge}>
          <Text style={styles.playerInfo}>
             MODO: {playerClass.toUpperCase()}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const IncidentUI = ({ incident, playerClass, onAttack }: any) => {
  const progress = Math.min(100, (incident.current_clicks / incident.target_quota) * 100);
  const isRequiredClass = incident.required_class === "All" || incident.required_class === playerClass;

  const incidentConfigs: any = {
    error_500: { title: "SERVER CRASH", sub: "Apenas DevOps podem agir!", btn: "🚀 RE-DEPLOY", color: "#fff" },
    code_review: { title: "CODE REVIEW", sub: "Clique no ritmo (800ms)!", btn: "📝 ANALISAR", color: "#FFEB3B" },
    phishing: { title: "S.O.C. ALERT", sub: "Cuidado com o link falso!", btn: "🛡️ FIREWALL", color: "#9C27B0" },
    legacy_code_spill: { title: "LEGACY SPILL", sub: "Refatore o código antigo!", btn: "🛠️ REFACTOR", color: "#3776AB" },
    database_lock: { title: "DB LOCKED", sub: "Limpe as queries travadas!", btn: "🔓 UNLOCK", color: "#3498db" },
  };

  const config = incidentConfigs[incident.id] || { title: "INCIDENTE", sub: "Ação necessária!", btn: "AGIR", color: "#ff4d4d" };

  return (
    <View style={[styles.incidentBox, { borderColor: config.color + '50' }]}>
      <Text style={[styles.errorTitle, { color: config.color }]}>{config.title}</Text>
      
      <View style={styles.incidentProgressContainer}>
        <View style={[styles.incidentProgressBar, { width: `${progress}%`, backgroundColor: config.color }]} />
      </View>
      <Text style={styles.quotaText}>{incident.current_clicks} / {incident.target_quota} RESOLUÇÕES</Text>

      <Text style={styles.errorSubtitle}>
        {isRequiredClass ? config.sub : `BLOQUEADO: Esperando ${incident.required_class}...`}
      </Text>

      {incident.id === "phishing" && (
        <TouchableOpacity style={styles.fakeButton} onPress={() => onAttack(true)}>
          <Text style={styles.fakeButtonText}>⚡ GANHAR XP BÔNUS AQUI!</Text>
        </TouchableOpacity>
      )}

      {isRequiredClass ? (
        <TouchableOpacity 
          style={[styles.specialButton, { backgroundColor: config.color }]} 
          onPress={() => onAttack()}
        >
          <Text style={styles.specialText}>{config.btn}</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.disabledButton}>
          <ActivityIndicator size="small" color="#444" style={{ marginBottom: 5 }} />
          <Text style={styles.disabledText}>AGUARDANDO SQUAD</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  battleContainer: { flex: 1, backgroundColor: '#050505', justifyContent: 'space-between', alignItems: 'center' },
  header: { alignItems: 'center', width: '100%', paddingTop: 20 },
  bossTitle: { color: '#fff', fontSize: 20, fontWeight: '900', marginBottom: 20, textTransform: 'uppercase', letterSpacing: 2 },
  statusGroup: { width: '100%', paddingHorizontal: 20 },
  multBadge: { backgroundColor: '#111', paddingHorizontal: 15, paddingVertical: 6, borderRadius: 20, marginTop: 10, borderWidth: 1, borderColor: '#333' },
  multLabel: { color: '#FFEB3B', fontSize: 10, fontWeight: 'bold', letterSpacing: 1 },
  
  actionArea: { width: '100%', alignItems: 'center', height: 320, justifyContent: 'center' },
  attackCircle: { width: 200, height: 200, borderRadius: 100, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center', borderWidth: 8 },
  innerCircle: { width: '100%', height: '100%', borderRadius: 100, justifyContent: 'center', alignItems: 'center' },
  attackText: { fontSize: 18, fontWeight: '900', textAlign: 'center' },
  
  incidentBox: { alignItems: 'center', width: '90%', backgroundColor: '#0a0a0a', padding: 25, borderRadius: 30, borderWidth: 2 },
  errorTitle: { fontSize: 32, fontWeight: '900', fontStyle: 'italic' },
  incidentProgressContainer: { width: '100%', height: 10, backgroundColor: '#1a1a1a', borderRadius: 5, marginTop: 15, overflow: 'hidden' },
  incidentProgressBar: { height: '100%' },
  quotaText: { color: '#444', fontSize: 11, marginTop: 8, fontWeight: 'bold' },
  errorSubtitle: { color: '#888', fontSize: 13, textAlign: 'center', marginVertical: 15, fontWeight: '600' },
  
  specialButton: { padding: 20, borderRadius: 15, width: '100%', alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.5, shadowRadius: 10, elevation: 5 },
  specialText: { color: '#000', fontSize: 18, fontWeight: 'bold' },
  
  disabledButton: { padding: 20, borderRadius: 15, width: '100%', alignItems: 'center', backgroundColor: '#111', borderWidth: 1, borderColor: '#222' },
  disabledText: { color: '#333', fontSize: 14, fontWeight: 'bold' },
  
  fakeButton: { backgroundColor: '#FFD700', padding: 12, borderRadius: 10, width: '100%', marginBottom: 15, alignItems: 'center' },
  fakeButtonText: { color: '#000', fontWeight: '800', fontSize: 12 },
  
  footer: { width: '100%', alignItems: 'center', paddingBottom: 30 },
  classBadge: { borderBottomWidth: 2, borderBottomColor: '#333', paddingBottom: 5 },
  playerInfo: { color: '#333', fontSize: 12, fontWeight: 'bold', letterSpacing: 2 }
});