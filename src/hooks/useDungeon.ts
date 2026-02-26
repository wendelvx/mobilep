import * as Haptics from 'expo-haptics';
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

// Dica: Em produção, você pode mover isso para um arquivo .env
const SERVER_URL = 'https://cadillac-tribe-orlando-bolt.trycloudflare.com';

export const useDungeon = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [playerClass, setPlayerClass] = useState<string | null>(null);
  const [nickname, setNickname] = useState<string>(""); // Novo: Estado para persistir o nome do aluno
  const [gameState, setGameState] = useState<any>(null);
  const [lastReset, setLastReset] = useState(0);

  // 1. Inicialização da conexão
  useEffect(() => {
    const s = io(SERVER_URL, {
      transports: ['websocket'], // Força websocket para menor latência
    });
    
    setSocket(s);

    s.on('boss_update', (data) => {
      setGameState(data);
    });

    return () => {
      s.disconnect();
    };
  }, []);

  // 2. Lógica de Reset Global (Quando o Mestre reinicia a partida no Go)
  useEffect(() => {
    if (gameState && gameState.reset_trigger > lastReset) {
      setLastReset(gameState.reset_trigger);
      setPlayerClass(null); // Remove a classe para forçar o aluno a escolher de novo
      // Opcional: Haptics de aviso de reset
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    }
  }, [gameState]);

  // 3. Seleção de Classe (Agora com Nickname real)
  const selectClass = (name: string, className: string) => {
    const cleanName = name.trim() || "Anônimo";
    setNickname(cleanName);
    setPlayerClass(className);

    socket?.emit('join_game', { 
      nickname: cleanName, 
      class: className 
    });
  };

  // 4. Ação de Combate com Feedback Tátil Diferenciado
  const handleAction = (isFake: boolean = false) => {
    if (!playerClass || !socket) return;

    // Se houver um incidente ativo, usamos um feedback de "Notificação" (mais longo/suave)
    // Se for ataque normal, usamos o "Impacto" (mais seco/agressivo)
    if (gameState?.active_incident?.id) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } else {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }

    socket.emit('attack', { isFake });
  };

  return { 
    gameState, 
    playerClass, 
    nickname, // Retornamos o nickname para as Views
    selectClass, 
    handleAction 
  };
};