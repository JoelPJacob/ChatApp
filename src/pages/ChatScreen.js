import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Modal,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import Video from 'react-native-video';
import SendButton from '../components/SendButton';
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import PlusIcon from '../assets/svg/PlusIcon';

const dummyMessages = [
  { id: '1', text: 'Hello!', sender: '1', type: 'text' },
  { id: '2', text: '', sender: '2', type: 'image', mediaUri: 'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
  { id: '3', text: '', sender: '2', type: 'video', mediaUri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
  { id: '4', text: 'Hello Joel', sender: '2', type: 'text' },
  { id: '5', text: 'How Are You?', sender: '1', type: 'text' },
  { id: '6', text: 'Good', sender: '2', type: 'text' },
  { id: '7', text: '', sender: '1', type: 'video', mediaUri: 'https://videos.pexels.com/video-files/7017803/7017803-sd_360_640_30fps.mp4' },
  { id: '8', text: '', sender: '2', type: 'video', mediaUri: 'https://videos.pexels.com/video-files/4761433/4761433-sd_506_960_25fps.mp4' },
  { id: '9', text: '', sender: '1', type: 'image', mediaUri: 'https://images.pexels.com/photos/1659438/pexels-photo-1659438.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: '10', text: '', sender: '2', type: 'image', mediaUri: 'https://images.pexels.com/photos/62289/yemen-chameleon-chamaeleo-calyptratus-chameleon-reptile-62289.jpeg?auto=compress&cs=tinysrgb&w=800' },
];

export default function ChatScreen({ route }) {
  const [messages, setMessages] = useState(dummyMessages);
  const [messageText, setMessageText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [selectedMediaType, setSelectedMediaType] = useState('');

  const checkPermissions = async () => {
    try {
      const imagePermission = await check(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES);
      const videoPermission = await check(PERMISSIONS.ANDROID.READ_MEDIA_VIDEO);
      const cameraPermission = await check(PERMISSIONS.ANDROID.CAMERA);

      let permissionsGranted = true;

      // If permissions are not granted, request them
      if (imagePermission !== RESULTS.GRANTED) {
        await request(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES);
        permissionsGranted = false;
      }
      if (videoPermission !== RESULTS.GRANTED) {
        await request(PERMISSIONS.ANDROID.READ_MEDIA_VIDEO);
        permissionsGranted = false;
      }
      if (cameraPermission !== RESULTS.GRANTED) {
        await request(PERMISSIONS.ANDROID.CAMERA);
        permissionsGranted = false;
      }

      return permissionsGranted;
    } catch (error) {
      console.error('Error checking permissions:', error);
      return false;
    }
  };

  const selectMedia = async () => {
    const permissionGranted = await checkPermissions();
    if (permissionGranted) {
      launchImageLibrary({ mediaType: 'mixed' }, (response) => {
        if (response.assets) {
          const selectedAsset = response.assets[0];
          const newMessage = {
            id: (messages.length + 1).toString(),
            text: '',
            sender: '1',
            type: selectedAsset.type.includes('image') ? 'image' : 'video',
            mediaUri: selectedAsset.uri,
          };
          setMessages([...messages, newMessage]);
        }
      });
    } else {
      console.log('Permissions not granted');
    }
  };

  const sendMessage = () => {
    if (messageText.trim()) {
      const newMessage = {
        id: (messages.length + 1).toString(),
        text: messageText,
        sender: '1',
        type: 'text',
      };
      setMessages([...messages, newMessage]);
      setMessageText('');
    }
  };

  const openModal = (mediaUri, type) => {
    setSelectedMedia(mediaUri);
    setSelectedMediaType(type);
    setModalVisible(true);
  };

  const renderMessage = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        item.type !== 'text' ? openModal(item.mediaUri, item.type) : null
      }
      style={
        item.sender === '1' ? styles.sentMessageContainer : styles.receivedMessageContainer
      }
    >
      {item.type === 'text' && <Text style={styles.messageText}>{item.text}</Text>}
      {item.type === 'image' && (
        <Image source={{ uri: item.mediaUri }} style={styles.media} />
      )}
      {item.type === 'video' && (
        <Video
          source={{ uri: item.mediaUri }}
          style={styles.media}
          resizeMode="contain"
          paused
        />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.chatContainer}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Type a message"
          placeholderTextColor="#aaa"
          value={messageText}
          onChangeText={setMessageText}
        />
        <TouchableOpacity style={styles.iconButton} onPress={selectMedia}>
          <PlusIcon width={24} height={24} />
        </TouchableOpacity>
        <SendButton onSend={sendMessage} />
      </View>

      <Modal
        visible={modalVisible}
        transparent={false}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
          {selectedMediaType === 'image' && (
            <Image source={{ uri: selectedMedia }} style={styles.fullScreenMedia} />
          )}
          {selectedMediaType === 'video' && (
            <Video
              source={{ uri: selectedMedia }}
              style={styles.fullScreenMedia}
              resizeMode="contain"
              controls
            />
          )}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
  },
  chatContainer: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  sentMessageContainer: {
    alignSelf: 'flex-end',
    backgroundColor: '#e5e5ea',
    marginVertical: 5,
    padding: 10,
    borderRadius: 10,
    maxWidth: '100%',
  },
  receivedMessageContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#bfbfbf',
    marginVertical: 5,
    padding: 10,
    borderRadius: 10,
    maxWidth: '100%',
  },
  messageText: {
    // color: '#fff',
  },
  media: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 16,
  },
  iconButton: {
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 20,
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  fullScreenMedia: {
    width: '100%',
    height: '100%',
  },
});
