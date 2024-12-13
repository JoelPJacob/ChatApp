import React, { useState } from 'react';
import { View, Button, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import { compressImage, compressVideo } from '../utils/compression'; // Image and video compression utilities
import { sendMessage } from '../services/socket'; // Send via socket

const MultimediaPage = () => {
  const [media, setMedia] = useState(null);

  const handleSelectMedia = () => {
    ImagePicker.launchImageLibrary(
      { mediaType: 'mixed' },
      async (response) => {
        if (response.assets) {
          const { uri, type } = response.assets[0];
          
          let compressedUri = uri;
          
          if (type.startsWith('image/')) {
            compressedUri = await compressImage(uri);
          } else if (type.startsWith('video/')) {
            compressedUri = await compressVideo(uri);
          }

          setMedia({ uri: compressedUri, type });
          sendMessage({ media: compressedUri, type });
        }
      }
    );
  };

  return (
    <View style={styles.container}>
      <Button title="Select Media" onPress={handleSelectMedia} />
      {media && media.type.startsWith('image/') && (
        <Image source={{ uri: media.uri }} style={styles.mediaPreview} />
      )}
      {/* Add additional logic for video preview */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  mediaPreview: { width: 200, height: 200, marginTop: 20 },
});

export default MultimediaPage;
