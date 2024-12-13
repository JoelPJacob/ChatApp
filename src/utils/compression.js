import ImageResizer from 'react-native-image-resizer';
import { Video } from 'react-native-compressor';

export const compressImage = async (imageUri) => {
  try {
    const compressed = await ImageResizer.createResizedImage(imageUri, 800, 800, 'JPEG', 80);
    return compressed.uri;
  } catch (error) {
    console.error('Image compression error:', error);
    return imageUri;
  }
};

export const compressVideo = async (videoUri) => {
  try {
    const compressed = await Video.compress(videoUri, {
      compressionMethod: 'auto',
    });
    return compressed;
  } catch (error) {
    console.error('Video compression error:', error);
    return videoUri;
  }
};
