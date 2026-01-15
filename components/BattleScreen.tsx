// Location: components/BattleScreen.tsx
import { LevelData } from '@/constants/GameData'; // '@/' is a shortcut to your root folder
import React, { useState } from 'react';
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface BattleProps {
  levelData: LevelData;
  onVictory: () => void;
}

export default function BattleScreen({ levelData, onVictory }: BattleProps) {
  const [monsterHP, setMonsterHP] = useState(100);
  const [playerHP, setPlayerHP] = useState(100);
  const [userInput, setUserInput] = useState('');

  const handleAttack = () => {
    if (userInput.trim().toLowerCase() === levelData.correctAnswer) {
      // Correct! Hit the monster
      const newHP = Math.max(0, monsterHP - levelData.damage);
      setMonsterHP(newHP);
      setUserInput(''); // Clear text box

      if (newHP === 0) {
        Alert.alert("Victory!", `${levelData.monsterName} defeated!`, [
          { text: "Next Level", onPress: () => {
            setMonsterHP(100); // Reset for next monster
            onVictory(); 
          }}
        ]);
      } else {
        // Monster survives, maybe it attacks back? (Optional for now)
      }
    } else {
      // Wrong! Player takes damage
      setPlayerHP(prev => Math.max(0, prev - 10));
      Alert.alert("Error", "Syntax Error! The Bug attacks you!");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>LEVEL {levelData.id}</Text>
      
      {/* 1. THE STAGE (Monster & HP) */}
      <View style={styles.stage}>
        <Text style={styles.enemyTitle}>{levelData.monsterName}</Text>
        <Image source={levelData.monsterImg} style={styles.monster} />
        <View style={styles.hpBar}>
            <Text style={styles.hpText}>Enemy HP: {monsterHP}</Text>
        </View>
      </View>

      {/* 2. PLAYER STATS */}
      <Text style={styles.playerText}>Your System Health: {playerHP}%</Text>

      {/* 3. THE TERMINAL (Input) */}
      <View style={styles.terminal}>
        <Text style={styles.prompt}>{levelData.prompt}</Text>
        <View style={styles.codeRow}>
          <TextInput
            style={styles.input}
            onChangeText={setUserInput}
            value={userInput}
            autoCapitalize="none"
            placeholder="Type here..."
            placeholderTextColor="#666"
          />
          <Text style={styles.codeText}>{levelData.suffix}</Text>
        </View>
      </View>

      {/* 4. ATTACK BUTTON */}
      <TouchableOpacity style={styles.button} onPress={handleAttack}>
        <Text style={styles.buttonText}>EXECUTE CODE</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1a2e', padding: 20, justifyContent: 'center' },
  header: { color: '#4ecca3', fontSize: 20, textAlign: 'center', marginBottom: 20, fontWeight: 'bold'},
  stage: { alignItems: 'center', marginBottom: 30 },
  enemyTitle: { color: '#fff', fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  monster: { width: 120, height: 120, resizeMode: 'contain' },
  hpBar: { marginTop: 10, backgroundColor: '#e94560', padding: 5, borderRadius: 5 },
  hpText: { color: '#fff', fontWeight: 'bold' },
  playerText: { color: '#4ecca3', textAlign: 'center', marginBottom: 10 },
  terminal: { backgroundColor: '#16213e', padding: 20, borderRadius: 10, marginBottom: 20, borderWidth: 1, borderColor: '#4ecca3' },
  prompt: { color: '#888', marginBottom: 10, fontFamily: 'monospace' },
  codeRow: { flexDirection: 'row', alignItems: 'center' },
  input: { borderBottomWidth: 2, borderBottomColor: '#4ecca3', color: '#fff', fontSize: 18, minWidth: 50, textAlign: 'center', fontFamily: 'monospace' },
  codeText: { color: '#fff', fontSize: 18, fontFamily: 'monospace' },
  button: { backgroundColor: '#e94560', padding: 15, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 18 }
});