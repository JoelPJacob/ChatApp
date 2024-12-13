import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const ChatBubble = ({ message }) => {
  return (
    <View style={[styles.container, message.sender === 'user' ? styles.user : styles.admin]}>
      {message.type === 'text' ? (
        <Text style={styles.text}>{message.text}</Text>
      ) : (
        <Image source={{ uri: message.uri }} style={styles.media} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    margin: 5,
    borderRadius: 8,
  },
  user: { backgroundColor: '#DCF8C6', alignSelf: 'flex-end' },
  admin: { backgroundColor: '#FFF', alignSelf: 'flex-start' },
  text: { fontSize: 16 },
  media: { width: 150, height: 150, borderRadius: 8 },
});

export default ChatBubble;
