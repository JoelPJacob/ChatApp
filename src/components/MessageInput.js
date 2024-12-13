import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const MessageInput = ({ onSend }) => {
  const [message, setMessage] = useState('');

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Type a message"
        value={message}
        onChangeText={setMessage}
      />
      <Button title="Send" onPress={() => { onSend(message); setMessage(''); }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', padding: 10 },
  input: { flex: 1, borderColor: '#ccc', borderWidth: 1, borderRadius: 5, paddingHorizontal: 10 },
});

export default MessageInput;
