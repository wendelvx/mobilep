import React from 'react';
import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export const SelectionView = ({ onSelect }: { onSelect: (className: string) => void }) => {
  const classes = [
    { id: 'Front-end', color: '#E44D26', desc: 'Dano Crítico Massivo' },
    { id: 'Back-end', color: '#3776AB', desc: 'Refatoração e Dano Estável' },
    { id: 'DevOps', color: '#2496ED', desc: 'Deploy e Multiplicador' },
    { id: 'QA', color: '#4CAF50', desc: 'Testes e Cura de Integridade' },
    { id: 'Security', color: '#9C27B0', desc: 'Defesa e Firewall' },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.title}>THE TCC TITAN</Text>
      <Text style={styles.subtitle}>Escolha sua especialidade:</Text>
      {classes.map((c) => (
        <TouchableOpacity 
          key={c.id} 
          style={[styles.classButton, { borderColor: c.color }]} 
          onPress={() => onSelect(c.id)}
        >
          <Text style={[styles.buttonText, { color: c.color }]}>{c.id}</Text>
          <Text style={styles.classDesc}>{c.desc}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', justifyContent: 'center', alignItems: 'center', padding: 30 },
  title: { color: '#fff', fontSize: 30, fontWeight: 'bold', textAlign: 'center' },
  subtitle: { color: '#888', fontSize: 16, textAlign: 'center', marginBottom: 20 },
  classButton: { backgroundColor: '#1a1a1a', padding: 15, borderRadius: 12, width: '100%', marginBottom: 10, borderWidth: 2 },
  buttonText: { fontSize: 18, fontWeight: 'bold', textAlign: 'center' },
  classDesc: { color: '#555', fontSize: 12, textAlign: 'center', marginTop: 4 },
});