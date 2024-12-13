import React from 'react';
import { FlatList, View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import TickIcon from '../assets/svg/TickIcon';

const chatListData = [
  { id: '1', name: 'John Doe', date: '12 Dec', dp: 'https://images.pexels.com/photos/1898555/pexels-photo-1898555.jpeg?auto=compress&cs=tinysrgb&w=800', tick: true },
  { id: '2', name: 'Jane Smith', date: '10 Dec', dp: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=800', tick: false },
  { id: '3', name: 'Alice Johnson', date: '9 Dec', dp: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=800', tick: true },
  { id: '4', name: 'Bob Brown', date: '8 Dec', dp: 'https://images.pexels.com/photos/1855582/pexels-photo-1855582.jpeg?auto=compress&cs=tinysrgb&w=800', tick: false },
  { id: '5', name: 'Charlie White', date: '7 Dec', dp: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=800', tick: true },
  { id: '6', name: 'Diana Blue', date: '6 Dec', dp: 'https://images.pexels.com/photos/2613260/pexels-photo-2613260.jpeg?auto=compress&cs=tinysrgb&w=800', tick: false },
  { id: '7', name: 'Edward Green', date: '5 Dec', dp: 'https://images.pexels.com/photos/1115697/pexels-photo-1115697.jpeg?auto=compress&cs=tinysrgb&w=800', tick: true },
  { id: '8', name: 'Fiona Gray', date: '4 Dec', dp: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=800', tick: false },
  { id: '9', name: 'George Black', date: '3 Dec', dp: 'https://images.pexels.com/photos/1855582/pexels-photo-1855582.jpeg?auto=compress&cs=tinysrgb&w=800', tick: true },
  { id: '10', name: 'Helen Yellow', date: '2 Dec', dp: 'https://images.pexels.com/photos/227294/pexels-photo-227294.jpeg?auto=compress&cs=tinysrgb&w=800', tick: false },
];

export default function ChatListScreen({ navigation }) {
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Chat', { chatId: item.id })}>
      <View style={styles.chatItem}>
        <Image source={{ uri: item.dp }} style={styles.dp} />
        <View style={styles.chatDetails}>
          <Text style={styles.chatName}>{item.name}</Text>
          <Text style={styles.chatDate}>{item.date}</Text>
        </View>
        {item.tick && <TickIcon width={20} height={20} style={styles.tickIcon} />}
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={chatListData}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContainer}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginVertical: 8,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dp: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  chatDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  chatName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
    color: '#222',
  },
  chatDate: {
    fontSize: 14,
    color: '#777',
  },
  tickIcon: {
    marginLeft: 10,
  },
});