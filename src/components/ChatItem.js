import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import TickSVG from '../assets/tick.svg';

export default function ChatItem({ chat }) {
  const isRemoteImage = typeof chat.avatar === 'string';

  return (
    <View style={styles.chatItem}>
      <Image
        source={isRemoteImage ? { uri: chat.avatar } : chat.avatar}
        style={styles.avatar}
      />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{chat.name}</Text>
        <Text style={styles.date}>{chat.date}</Text>
      </View>
      {chat.tick &&
        // <TickSVG width={16} height={16} />
        <Text>DD</Text>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 12,
    color: '#888',
  },
});
