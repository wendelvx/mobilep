import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useDungeon } from '../src/hooks/useDungeon';
import { ArenaView } from '../src/views/ArenaView';
import { LobbyView } from '../src/views/LobbyView';
import { ResultView } from '../src/views/ResultView';
import { SelectionView } from '../src/views/SelectionView';

export default function GameScreen() {
  // Agora desestruturamos o 'nickname' que vem do hook para usar no Lobby e Resultados
  const { gameState, playerClass, nickname, selectClass, handleAction } = useDungeon();

  // 1. FASE DE SELEÇÃO
  // Se não houver classe, o aluno precisa se identificar e escolher o papel.
  if (!playerClass) {
    return <SelectionView onSelect={selectClass} />;
  }

  // 2. FASE DE CONEXÃO/SINCRONIA
  // Se a classe foi escolhida mas o pacote do Redis ainda não chegou, mostramos o loading.
  if (!gameState) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2496ED" />
        <Text style={styles.loadingText}>SINCROZINANDO COM A ARENA...</Text>
      </View>
    );
  }

  // 3. MÁQUINA DE ESTADOS (STATE MACHINE)
  // Renderiza a View baseada no 'status' processado pela Engine em Go.
  switch (gameState.status) {
    case 'WAITING':
      return (
        <LobbyView 
          gameState={gameState} 
          playerClass={playerClass} 
          nickname={nickname} // Novo: Passamos o nome para o Lobby
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
          gameState={gameState} // Novo: Passamos o estado para mostrar o nome do Boss derrotado/vitorioso
        />
      );

    default:
      // Fallback: se o status for desconhecido, volta para a seleção por segurança
      return <SelectionView onSelect={selectClass} />;
  }
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#444',
    marginTop: 20,
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 2,
    textTransform: 'uppercase'
  },
});