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

  const classes = [
    { id: 'Front-end', color: '#E44D26', desc: 'Dano Crítico Massivo' },
    { id: 'Back-end', color: '#3776AB', desc: 'Refatoração e Dano Estável' },
    { id: 'DevOps', color: '#2496ED', desc: 'Deploy e Multiplicador' },
    { id: 'QA', color: '#4CAF50', desc: 'Testes e Cura de Integridade' },
    { id: 'Security', color: '#9C27B0', desc: 'Defesa e Firewall' },
  ];

  const handleSelect = (className: string) => {
    if (name.trim().length < 3) {
      alert("Por favor, digite um nome com pelo menos 3 caracteres.");
      return;
    }
    onSelect(name.trim(), className);
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <Text style={styles.title}>DUNGEON MASTER</Text>
        <Text style={styles.subtitle}>Identifique-se, Herói:</Text>

        {/* Campo de Nickname */}
        <TextInput
          style={styles.input}
          placeholder="Seu Nickname (Ex: DevMaster)"
          placeholderTextColor="#444"
          value={name}
          onChangeText={setName}
          autoCorrect={false}
          maxLength={15}
        />

        <Text style={[styles.subtitle, { marginTop: 20 }]}>Escolha sua especialidade:</Text>

        {/* Lista de Classes */}
        {classes.map((c) => (
          <TouchableOpacity 
            key={c.id} 
            activeOpacity={0.8}
            style={[
              styles.classButton, 
              { borderColor: c.color, opacity: name.trim().length < 3 ? 0.4 : 1 }
            ]} 
            onPress={() => handleSelect(c.id)}
          >
            <View>
              <Text style={[styles.buttonText, { color: c.color }]}>{c.id}</Text>
              <Text style={styles.classDesc}>{c.desc}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#121212' 
  },
  scrollContent: { 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 30,
    paddingTop: 60 
  },
  title: { 
    color: '#fff', 
    fontSize: 32, 
    fontWeight: 'bold', 
    textAlign: 'center',
    letterSpacing: 2
  },
  subtitle: { 
    color: '#888', 
    fontSize: 14, 
    textAlign: 'center', 
    marginBottom: 15,
    textTransform: 'uppercase' 
  },
  input: {
    width: '100%',
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333',
    color: '#fff',
    padding: 15,
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 5
  },
  classButton: { 
    backgroundColor: '#1a1a1a', 
    padding: 18, 
    borderRadius: 12, 
    width: '100%', 
    marginBottom: 12, 
    borderWidth: 2,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  buttonText: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    textAlign: 'center' 
  },
  classDesc: { 
    color: '#666', 
    fontSize: 11, 
    textAlign: 'center', 
    marginTop: 4 
  },
});