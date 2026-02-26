import React from 'react';
import { ActivityIndicator, StatusBar, StyleSheet, Text, View } from 'react-native';
import { useDungeon } from '../src/hooks/useDungeon';
import { ArenaView } from '../src/views/ArenaView';
import { LobbyView } from '../src/views/LobbyView';
import { ResultView } from '../src/views/ResultView';
import { SelectionView } from '../src/views/SelectionView';

export default function GameScreen() {
  // Hook customizado que gerencia Socket.io e o estado global do Go
  const { gameState, playerClass, nickname, selectClass, handleAction } = useDungeon();

  // 1. FASE DE IDENTIFICAÇÃO (Login/Classe)
  if (!playerClass) {
    return <SelectionView onSelect={selectClass} />;
  }

  // 2. FASE DE HANDSHAKE (Sincronizando com Redis/Go)
  // Ajustado para manter o fundo preto e a vibe de terminal
  if (!gameState) {
    return (
      <View style={styles.loadingContainer}>
        <StatusBar barStyle="light-content" />
        <ActivityIndicator size="large" color="#ff4d4d" />
        <Text style={styles.loadingText}>INICIALIZANDO_PROTOCOLO_TCP...</Text>
        <Text style={styles.subLoading}>Aguardando resposta do servidor Go</Text>
      </View>
    );
  }

  // 3. MÁQUINA DE ESTADOS (STATE MACHINE)
  // Aqui o status vem direto do Engine em Go via WebSocket
  switch (gameState.status) {
    case 'WAITING':
      return (
        <LobbyView 
          gameState={gameState} 
          playerClass={playerClass} 
          nickname={nickname} 
        />
      );

    case 'BATTLE':
      return (
        <ArenaView 
          gameState={gameState} 
          playerClass={playerClass} 
          onAttack={handleAction} 
        />
      );

    case 'VICTORY':
    case 'GAMEOVER':
      return (
        <ResultView 
          status={gameState.status} 
          gameState={gameState} 
        />
      );

    default:
      // Caso ocorra algum erro de status, volta para a seleção
      return <SelectionView onSelect={selectClass} />;
  }
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: '#050505', // Preto profundo para combinar com o resto
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  loadingText: {
    color: '#ff4d4d',
    marginTop: 25,
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 2,
    textAlign: 'center'
  },
  subLoading: {
    color: '#222',
    fontSize: 10,
    fontWeight: 'bold',
    marginTop: 8,
    textTransform: 'uppercase'
  }
});