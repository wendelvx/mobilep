import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useDungeon } from '../src/hooks/useDungeon';
import { ArenaView } from '../src/views/ArenaView';
import { LobbyView } from '../src/views/LobbyView';
import { ResultView } from '../src/views/ResultView';
import { SelectionView } from '../src/views/SelectionView';

export default function GameScreen() {
  // Consome toda a inteligência do Hook modular que criamos
  const { gameState, playerClass, selectClass, handleAction } = useDungeon();

  // 1. Fase de Seleção: Se o aluno ainda não escolheu uma classe
  if (!playerClass) {
    return <SelectionView onSelect={selectClass} />;
  }

  // 2. Fase de Conexão: Se a classe foi escolhida, mas o servidor ainda não respondeu
  if (!gameState) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2496ED" />
        <Text style={styles.loadingText}>Sincronizando com o Reino...</Text>
      </View>
    );
  }

  // 3. Máquina de Estados: Renderiza a View correta baseada no status vindo do Go
  switch (gameState.status) {
    case 'WAITING':
      return (
        <LobbyView 
          gameState={gameState} 
          playerClass={playerClass} 
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
      return <ResultView status={gameState.status} />;

    default:
      // Fallback de segurança para voltar à seleção se algo bugar
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
    color: '#fff',
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1.2,
  },
});