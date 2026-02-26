import React from 'react';
import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BossIcon } from '../components/BossIcon';
import { HPBar } from '../components/HPBar';

export const ArenaView = ({ gameState, playerClass, onAttack }: any) => {
  // Desestruturação conforme o GameState V2.0 do Go
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
    <View style={styles.battleContainer}>
      <StatusBar barStyle="light-content" />
      
      <View style={styles.header}>
        {/* Passamos o ID para o ícone mudar conforme o Boss selecionado */}
        <BossIcon bossId={boss.id} />
        <Text style={styles.bossTitle}>{boss.name}</Text>
        
        {/* HP do Boss baseado no Perfil Dinâmico */}
        <HPBar label="BOSS HP" current={boss_hp} max={boss.base_hp} color="#ff4d4d" />
        
        {/* Integridade da Turma */}
        <HPBar label="INTEGRIDADE" current={team_hp} max={max_team_hp} color="#4CAF50" />
        
        <View style={styles.multBadge}>
          <Text style={styles.multLabel}>POTÊNCIA: {multiplier.toFixed(2)}x</Text>
        </View>
      </View>

      <View style={styles.actionArea}>
        {active_incident?.id ? (
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
        <Text style={styles.playerInfo}>
          {playerClass.toUpperCase()} • SESSÃO ATIVA
        </Text>
      </View>
    </View>
  );
};

const IncidentUI = ({ incident, playerClass, onAttack }: any) => {
  // Lógica de progresso da Cota (V2.0)
  const progress = Math.min(100, (incident.current_clicks / incident.target_quota) * 100);
  
  // Verifica se a classe do aluno é a necessária para este incidente
  const isRequiredClass = incident.required_class === "All" || incident.required_class === playerClass;

  const incidentConfigs: any = {
    error_500: { title: "SERVER CRASH", sub: "Erro 500 detectado!", btn: "🚀 RE-DEPLOY", color: "#fff" },
    code_review: { title: "CODE REVIEW", sub: "Clique devagar (800ms)!", btn: "📝 ANALISAR", color: "#FFEB3B" },
    phishing: { title: "S.O.C. ALERT", sub: "Tentativa de Phishing!", btn: "🛡️ FIREWALL", color: "#9C27B0" },
    legacy_code_spill: { title: "LEGACY SPILL", sub: "Código antigo vazando!", btn: "🛠️ REFACTOR", color: "#3776AB" },
    database_lock: { title: "DB LOCKED", sub: "Deadlock no banco!", btn: "🔓 UNLOCK", color: "#3498db" },
  };

  const config = incidentConfigs[incident.id] || { title: "INCIDENTE", sub: "Resolva!", btn: "AGIR", color: "#ff4d4d" };

  return (
    <View style={styles.incidentBox}>
      <Text style={[styles.errorTitle, { color: config.color }]}>{config.title}</Text>
      
      {/* BARRA DE PROGRESSO DO INCIDENTE */}
      <View style={styles.incidentProgressContainer}>
        <View style={[styles.incidentProgressBar, { width: `${progress}%`, backgroundColor: config.color }]} />
      </View>
      <Text style={styles.quotaText}>{incident.current_clicks} / {incident.target_quota} CLIQUES</Text>

      <Text style={styles.errorSubtitle}>{isRequiredClass ? config.sub : `Aguardando ${incident.required_class}...`}</Text>

      {/* Botão de Phishing (Trap) */}
      {incident.id === "phishing" && (
        <TouchableOpacity style={styles.fakeButton} onPress={() => onAttack(true)}>
          <Text style={styles.fakeButtonText}>🎁 XP GRÁTIS AQUI!</Text>
        </TouchableOpacity>
      )}

      {/* Só mostra o botão de ação se for a classe correta */}
      {isRequiredClass ? (
        <TouchableOpacity 
          style={[styles.specialButton, { backgroundColor: config.color }]} 
          onPress={() => onAttack()}
        >
          <Text style={styles.specialText}>{config.btn}</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.disabledButton}>
          <Text style={styles.disabledText}>BLOQUEADO</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  battleContainer: { flex: 1, backgroundColor: '#0a0a0a', justifyContent: 'space-around', alignItems: 'center', padding: 20 },
  header: { alignItems: 'center', width: '100%' },
  bossTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 15, textTransform: 'uppercase', letterSpacing: 2 },
  multBadge: { backgroundColor: '#333', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 20, marginTop: 10 },
  multLabel: { color: '#FFEB3B', fontSize: 10, fontWeight: 'bold' },
  actionArea: { width: '100%', alignItems: 'center', height: 300, justifyContent: 'center' },
  attackCircle: { width: 180, height: 180, borderRadius: 90, backgroundColor: '#111', justifyContent: 'center', alignItems: 'center', borderWidth: 6 },
  attackText: { fontSize: 16, fontWeight: 'bold', textAlign: 'center', paddingHorizontal: 10 },
  
  // Incident Styles
  incidentBox: { alignItems: 'center', width: '100%', backgroundColor: '#151515', padding: 20, borderRadius: 20, borderWidth: 1, borderColor: '#333' },
  errorTitle: { fontSize: 28, fontWeight: 'black', letterSpacing: -1 },
  incidentProgressContainer: { width: '100%', height: 8, backgroundColor: '#000', borderRadius: 4, marginTop: 15, overflow: 'hidden' },
  incidentProgressBar: { height: '100%' },
  quotaText: { color: '#666', fontSize: 10, marginTop: 5, fontWeight: 'bold' },
  errorSubtitle: { color: '#aaa', fontSize: 14, textAlign: 'center', marginVertical: 15 },
  
  specialButton: { padding: 18, borderRadius: 12, width: '100%', alignItems: 'center' },
  specialText: { color: '#000', fontSize: 16, fontWeight: 'bold' },
  
  disabledButton: { padding: 18, borderRadius: 12, width: '100%', alignItems: 'center', backgroundColor: '#222' },
  disabledText: { color: '#444', fontSize: 16, fontWeight: 'bold' },
  
  fakeButton: { backgroundColor: '#ffcc00', padding: 12, borderRadius: 10, width: '100%', marginBottom: 10, alignItems: 'center' },
  fakeButtonText: { color: '#000', fontWeight: 'bold', fontSize: 12 },
  
  footer: { borderTopWidth: 1, borderTopColor: '#222', width: '100%', alignItems: 'center', paddingTop: 15 },
  playerInfo: { color: '#444', fontSize: 10, letterSpacing: 1 }
});