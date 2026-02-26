import React from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { BossIcon } from '../components/BossIcon';

interface ResultViewProps {
  status: string;
  gameState: any;
}

export const ResultView = ({ status, gameState }: ResultViewProps) => {
  const isVictory = status === "VICTORY";
  const bossName = gameState?.boss?.name || "O Inimigo";
  const bossId = gameState?.boss?.id || "tcc_titan";

  return (
    <View style={[
      styles.container, 
      { backgroundColor: isVictory ? '#051a05' : '#1a0505' } // Tons muito escuros para contraste
    ]}>
      <StatusBar barStyle="light-content" />

      <View style={styles.content}>
        {/* Ícone do Boss com moldura de status */}
        <View style={[
          styles.iconCircle, 
          { borderColor: isVictory ? '#4CAF50' : '#ff4d4d' }
        ]}>
          <BossIcon bossId={bossId} />
        </View>

        <Text style={[
          styles.title, 
          { color: isVictory ? '#4CAF50' : '#ff4d4d' }
        ]}>
          {isVictory ? "MISSÃO CUMPRIDA" : "SISTEMA CORROMPIDO"}
        </Text>

        <Text style={styles.bossLog}>
          {isVictory 
            ? `O ${bossName} foi refatorado com sucesso!` 
            : `O ${bossName} derrubou a produção.`}
        </Text>

        <View style={styles.messageBox}>
          <Text style={styles.subtitle}>
            {isVictory 
              ? "Parabéns! Seu desempenho e dano crítico foram registrados no Hall da Fama do PostgreSQL." 
              : "O projeto virou código legado e o deploy falhou. Preparem o rollback para a próxima tentativa."}
          </Text>
        </View>

        {/* Indicador de Espera */}
        <View style={styles.footer}>
          <View style={styles.pulseDot} />
          <Text style={styles.waitText}>Aguardando comando do Mestre para Reset...</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 30 
  },
  content: {
    alignItems: 'center',
    width: '100%'
  },
  iconCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    marginBottom: 20,
    // Efeito de brilho (Glow)
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 15,
    elevation: 10
  },
  title: { 
    fontSize: 28, 
    fontWeight: '900', 
    textAlign: 'center',
    letterSpacing: 1,
    textTransform: 'uppercase'
  },
  bossLog: {
    color: '#fff',
    fontSize: 14,
    marginTop: 10,
    fontWeight: 'bold',
    fontStyle: 'italic',
    opacity: 0.8
  },
  messageBox: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    padding: 20,
    borderRadius: 15,
    marginTop: 30,
    width: '100%'
  },
  subtitle: { 
    color: '#aaa', 
    fontSize: 15, 
    textAlign: 'center',
    lineHeight: 22
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 50
  },
  waitText: { 
    color: '#666', 
    fontSize: 12,
    fontWeight: 'bold'
  },
  pulseDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#444',
    marginRight: 10
  }
});