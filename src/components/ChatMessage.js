import React from 'react';
import { View, Text, Image, StyleSheet, Video } from 'react-native';

export default function ChatMessage({ message }) {
  if (message.type === 'text') {
    return (
      <View style={[styles.message, message.sender === 'user' ? styles.user : styles.other]}>
        <Text style={styles.text}>{message.content}</Text>
      </View>
    );
  }

  if (message.type === 'image') {
    return (
      <View style={[styles.message, message.sender === 'user' ? styles.user : styles.other]}>
        <Image source={{ uri: message.content }} style={styles.image} />
      </View>
    );
  }

  if (message.type === 'video') {
    return (
      <View style={[styles.message, message.sender === 'user' ? styles.user : styles.other]}>
        <Video
          source={{ uri: message.content }}
          style={styles.video}
          controls
          resizeMode="contain"
        />
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  message: {
    margin: 10,
    padding: 10,
    borderRadius: 10,
    maxWidth: '70%',
  },
  user: {
    alignSelf: 'flex-end',
    backgroundColor: '#d1f4d3',
  },
  other: {
    alignSelf: 'flex-start',
    backgroundColor: '#f4d1d1',
  },
  text: {
    fontSize: 16,
  },
  image: {
    width: 200,
    height: 150,
    borderRadius: 10,
  },
  video: {
    width: 200,
    height: 150,
    borderRadius: 10,
  },
});
