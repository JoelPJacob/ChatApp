import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MessageBubble({ message }) {
  return (
    <View style={[styles.bubble, message.type === 'sent' ? styles.sent : styles.received]}>
      <Text style={styles.text}>{message.content}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bubble: {
    margin: 10,
    padding: 10,
    borderRadius: 10,
    maxWidth: '80%',
  },
  sent: {
    alignSelf: 'flex-end',
    backgroundColor: '#d1fcd3',
  },
  received: {
    alignSelf: 'flex-start',
    backgroundColor: '#f0f0f0',
  },
  text: {
    fontSize: 16,
  },
});
