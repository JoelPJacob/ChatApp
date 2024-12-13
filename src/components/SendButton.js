import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import SendIcon from '../assets/svg/SendIcon';

export default function SendButton({ onSend }) {
  return (
    <TouchableOpacity onPress={onSend} style={styles.button}>
      {/* <Text style={styles.buttonText}>Send</Text> */}
      <SendIcon width={30} height={30}/> 
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    // backgroundColor: '#FFBB1A',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
