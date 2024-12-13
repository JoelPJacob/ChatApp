import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Image,Text } from 'react-native';

export default function InputBar({ onSend, onAddMedia }) {
  const [text, setText] = useState('');

  const handleSend = () => {
    if (text.trim()) {
      onSend(text);
      setText('');
    }
  };

  return (
    <View style={styles.container}>
      <Text>dd</Text>
      <TouchableOpacity onPress={onAddMedia} style={styles.mediaButton}>
        {/* <Image source={require('../assets/images')} style={styles.icon} /> */}
        <Text style={{color:'red'}}>dd</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        placeholder="Type a message..."
        multiline={true}
      />
      <TouchableOpacity onPress={handleSend} style={styles.sendButton} disabled={!text.trim()}>
        {/* <Image source={require('../assets/send-icon.png')} style={styles.icon} /> */}
        <Text style={{color:'red'}}>dod</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  mediaButton: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 25,
    padding: 10,
    paddingLeft: 15,
    backgroundColor: '#f9f9f9',
    maxHeight: 100,
  },
  sendButton: {
    marginLeft: 10,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: '#007AFF', // Customize the color of the icon
  },
});
