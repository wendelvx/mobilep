import * as Haptics from 'expo-haptics';
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const SERVER_URL = 'https://mini-dem-reunion-twiki.trycloudflare.com';

export const useDungeon = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [playerClass, setPlayerClass] = useState<string | null>(null);
  const [gameState, setGameState] = useState<any>(null);
  const [lastReset, setLastReset] = useState(0);

  useEffect(() => {
    const s = io(SERVER_URL);
    setSocket(s);
    s.on('boss_update', (data) => setGameState(data));
    return () => { s.disconnect(); };
  }, []);

  useEffect(() => {
    if (gameState && gameState.reset_trigger > lastReset) {
      setLastReset(gameState.reset_trigger);
      setPlayerClass(null);
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

  return { gameState, playerClass, selectClass, handleAction };
};