import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

interface SelectionViewProps {
  onSelect: (nickname: string, className: string) => void;
}

export const SelectionView = ({ onSelect }: SelectionViewProps) => {
  const [name, setName] = useState('');
  const isNameValid = name.trim().length >= 3;

  const classes = [
    { id: 'Front-end', color: '#E44D26', desc: 'Dano Crítico Alto (Burst)' },
    { id: 'Back-end', color: '#3776AB', desc: 'Dano Sustentado (Tank)' },
    { id: 'DevOps', color: '#2496ED', desc: 'Multiplicador de Squad (Buffer)' },
    { id: 'QA', color: '#4CAF50', desc: 'Cura de Integridade (Healer)' },
    { id: 'Security', color: '#9C27B0', desc: 'Defesa e Firewall (Support)' },
  ];

  const handleSelect = (className: string) => {
    if (!isNameValid) return;
    onSelect(name.trim(), className);
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" />
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        
        <View style={styles.header}>
          <Text style={styles.title}>DUNGEON MASTER</Text>
          <View style={styles.versionBadge}>
            <Text style={styles.versionText}>ENGINE V2.0</Text>
          </View>
        </View>

        <Text style={styles.subtitle}>Sincronize seu perfil de acesso:</Text>

        {/* INPUT DE NICKNAME COM ESTILO TERMINAL */}
        <View style={[styles.inputContainer, isNameValid && styles.inputValid]}>
          {/* CORREÇÃO AQUI: Envolvido em chaves para evitar erro de token */}
          <Text style={styles.inputPrefix}>{'>'}</Text> 
          <TextInput
            style={styles.input}
            placeholder="NICKNAME_DO_ALUNO"
            placeholderTextColor="#333"
            value={name}
            onChangeText={setName}
            autoCorrect={false}
            maxLength={15}
            selectionColor="#4CAF50"
          />
        </View>

        <Text style={[styles.subtitle, { marginTop: 30, marginBottom: 20 }]}>
          Escolha sua Stack de Atuação:
        </Text>

        {/* LISTA DE CLASSES NEON */}
        <View style={styles.classGrid}>
          {classes.map((c) => (
            <TouchableOpacity 
              key={c.id} 
              activeOpacity={0.7}
              disabled={!isNameValid}
              style={[
                styles.classButton, 
                { 
                  borderColor: isNameValid ? c.color : '#1a1a1a',
                  opacity: isNameValid ? 1 : 0.3 
                }
              ]} 
              onPress={() => handleSelect(c.id)}
            >
              <View style={styles.buttonInfo}>
                <Text style={[styles.buttonText, { color: isNameValid ? c.color : '#444' }]}>
                  {c.id.toUpperCase()}
                </Text>
                <Text style={styles.classDesc}>{c.desc}</Text>
              </View>
              {isNameValid && (
                <View style={[styles.glowEffect, { backgroundColor: c.color }]} />
              )}
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.footerNote}>
          Certifique-se que o nome é o mesmo da lista de presença.
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#050505' 
  },
  scrollContent: { 
    padding: 30,
    paddingTop: 80,
    paddingBottom: 40
  },
  header: {
    alignItems: 'center',
    marginBottom: 40
  },
  title: { 
    color: '#fff', 
    fontSize: 34, 
    fontWeight: '900', 
    textAlign: 'center',
    letterSpacing: 1
  },
  versionBadge: {
    backgroundColor: '#ff4d4d',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginTop: 5
  },
  versionText: {
    color: '#000',
    fontSize: 10,
    fontWeight: 'bold'
  },
  subtitle: { 
    color: '#666', 
    fontSize: 12, 
    textAlign: 'center', 
    textTransform: 'uppercase',
    letterSpacing: 2
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0a0a0a',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1a1a1a',
    paddingHorizontal: 20,
    marginTop: 15,
    height: 65,
  },
  inputValid: {
    borderColor: '#4CAF50',
    backgroundColor: '#0a100a',
  },
  inputPrefix: {
    color: '#4CAF50',
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 10
  },
  input: {
    flex: 1,
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  classGrid: {
    width: '100%',
    gap: 15
  },
  classButton: { 
    backgroundColor: '#0d0d0d', 
    padding: 20, 
    borderRadius: 15, 
    width: '100%', 
    borderWidth: 1,
    position: 'relative',
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonInfo: {
    alignItems: 'center',
    zIndex: 2
  },
  buttonText: { 
    fontSize: 18, 
    fontWeight: '900', 
    letterSpacing: 1
  },
  classDesc: { 
    color: '#555', 
    fontSize: 11, 
    textAlign: 'center', 
    marginTop: 4,
    fontWeight: '600'
  },
  glowEffect: {
    position: 'absolute',
    left: 0,
    width: 4,
    height: '100%',
    opacity: 0.8
  },
  footerNote: {
    color: '#222',
    fontSize: 10,
    textAlign: 'center',
    marginTop: 40,
    fontWeight: 'bold',
    textTransform: 'uppercase'
  }
});