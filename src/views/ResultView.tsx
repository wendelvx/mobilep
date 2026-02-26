import React from 'react';
// ADICIONADO: Platform no import abaixo
import { Platform, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { BossIcon } from '../components/BossIcon';

interface ResultViewProps {
  status: string;
  gameState: any;
}

export const ResultView = ({ status, gameState }: ResultViewProps) => {
  const isVictory = status === "VICTORY";
  const bossName = gameState?.boss?.name || "O Inimigo";
  const bossId = gameState?.boss?.id || "tcc_titan";

  // Cores dinâmicas para o tema de resultado
  const themeColor = isVictory ? '#4CAF50' : '#ff4d4d';
  const bgHighlight = isVictory ? 'rgba(76, 175, 80, 0.05)' : 'rgba(255, 77, 77, 0.05)';

  return (
    <SafeAreaView style={[
      styles.container, 
      { backgroundColor: isVictory ? '#020a02' : '#0a0202' }
    ]}>
      <StatusBar barStyle="light-content" />

      <View style={styles.content}>
        {/* HEADER DE STATUS */}
        <View style={styles.header}>
          <Text style={styles.statusLabel}>STATUS_DA_REQUISICAO</Text>
          <Text style={[styles.title, { color: themeColor }]}>
            {isVictory ? "HTTP 200: OK" : "HTTP 500: ERROR"}
          </Text>
        </View>

        {/* ÍCONE DO PROFESSOR (BOSS) */}
        <View style={[styles.iconWrapper, { borderColor: themeColor }]}>
          <BossIcon bossId={bossId} />
          <View style={[styles.resultBadge, { backgroundColor: themeColor }]}>
            <Text style={styles.resultBadgeText}>
              {isVictory ? "REFATORADO" : "DEPRECADO"}
            </Text>
          </View>
        </View>

        {/* LOG DE RESULTADO */}
        <View style={[styles.messageBox, { backgroundColor: bgHighlight, borderColor: themeColor + '30' }]}>
          <Text style={[styles.mainMessage, { color: themeColor }]}>
            {isVictory ? "MISSÃO CUMPRIDA" : "SISTEMA CORROMPIDO"}
          </Text>
          <Text style={styles.bossLog}>
            {isVictory 
              ? `O ${bossName} foi finalizado com sucesso. O deploy foi aceito pela banca!` 
              : `O ${bossName} detectou erros críticos. O projeto entrou em looping infinito.`}
          </Text>
        </View>

        <View style={styles.terminalContainer}>
          <Text style={styles.terminalText}>
            {isVictory 
              ? "> Salvando logs no Postgres...\n> Gerando ranking de danos...\n> Sessão finalizada com sucesso." 
              : "> Rollback iniciado...\n> Limpando cache do Redis...\n> Aguardando nova sprint."}
          </Text>
        </View>

        {/* FOOTER DE ESPERA */}
        <View style={styles.footer}>
          <View style={[styles.pulseDot, { backgroundColor: themeColor }]} />
          <Text style={styles.waitText}>AGUARDANDO RESET DO MESTRE</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 30 
  },
  header: {
    alignItems: 'center',
  },
  statusLabel: {
    color: '#333',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginBottom: 5
  },
  title: { 
    fontSize: 32, 
    fontWeight: '900', 
    textAlign: 'center',
    letterSpacing: -1
  },
  iconWrapper: {
    position: 'relative',
    padding: 10,
  },
  resultBadge: {
    position: 'absolute',
    bottom: 5,
    right: -10,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 5,
    transform: [{ rotate: '5deg' }]
  },
  resultBadgeText: {
    color: '#000',
    fontSize: 10,
    fontWeight: 'black',
  },
  messageBox: {
    width: '100%',
    padding: 25,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: 'center'
  },
  mainMessage: {
    fontSize: 22,
    fontWeight: '900',
    marginBottom: 10,
    letterSpacing: 1
  },
  bossLog: {
    color: '#aaa',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    fontWeight: '500'
  },
  terminalContainer: {
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 15,
    borderRadius: 10,
    borderLeftWidth: 3,
    borderLeftColor: '#222'
  },
  terminalText: {
    color: '#444',
    // Platform agora está disponível aqui:
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace', 
    fontSize: 11,
    lineHeight: 18
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  waitText: { 
    color: '#222', 
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1
  },
  pulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 10,
    opacity: 0.6
  }
});