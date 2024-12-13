import React, { createContext, useContext, useEffect, useState } from 'react';
import { StreamChat } from 'stream-chat';
import { OverlayProvider, Chat } from 'stream-chat-react-native';

const ChatClientContext = createContext();

const client = StreamChat.getInstance('YOUR_STREAM_API_KEY');

export const ChatClientProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const connectUser = async () => {
      console.log('Connecting user...');
      await client.connectUser(
        { id: 'user-id', name: 'User Name' },
        client.devToken('user-id')
      );
      console.log('User connected.');
      setIsConnected(true);
    };

    connectUser().catch((err) => console.error('Error connecting user:', err));

    return () => client.disconnectUser().catch((err) => console.error('Error disconnecting user:', err));
  }, []);


  return (
    <OverlayProvider>
      {isConnected ? (
        <Chat client={client}>{children}</Chat>
      ) : (
        <Text>Loading Chat...</Text>
      )}
    </OverlayProvider>
  );
};

export const useChatClient = () => useContext(ChatClientContext);
