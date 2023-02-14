import React, { FC, useState } from 'react';
import { View, Modal, StyleSheet, Dimensions, Image, SafeAreaView, TouchableWithoutFeedback, ActivityIndicator, TouchableOpacity, Text, ImageRequireSource } from 'react-native';
import FastImage, { Source } from 'react-native-fast-image';
import DimensionsValue from '../utils/DimensionsValue';

const { width, height } = Dimensions.get('window');

type Props = {
  uri?: Source | ImageRequireSource;
  hideModal: () => void;
  cached?: boolean;
  fallbackSource?: ImageRequireSource
};

const ImageViewModal: FC<Props> = ({
  uri,
  hideModal,
  cached,
  fallbackSource,
}) => {
  const [loading, setLoading] = useState(true);
  const [rotate, setIsRotate] = useState(false);
  const [imageUri, setImageUri] = useState(uri);

  const handleError = () => {
    if (fallbackSource) setImageUri(fallbackSource);
  };
  return (
    <Modal
      animationType="none"
      transparent={true}
      supportedOrientations={[
        'landscape',
        'portrait',
        'landscape-left',
        'landscape-right',
      ]}
      visible={true}>
      <SafeAreaView style={styles.containerMain}>
        <TouchableWithoutFeedback onPress={hideModal}>
          <View style={rotate && styles.touchRotateView}>
            {loading && (
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <ActivityIndicator color={'white'} size={'large'} />
              </View>
            )}
            {cached ? (
              <FastImage
                onLoadEnd={() => setLoading(false)}
                onLoadStart={() => setLoading(true)}
                source={uri}
                resizeMode={FastImage.resizeMode.contain}
                style={[styles.imageChat, rotate && styles.imageRotate]}
              />
            ) : (
              <Image
                onLoadEnd={() => setLoading(false)}
                onLoadStart={() => setLoading(true)}
                onError={handleError}
                //@ts-ignore
                source={imageUri}
                style={[styles.imageChat, rotate && styles.imageRotate]}
              />
            )}
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </Modal>
  );
};

export default ImageViewModal;

const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageChat: {
    width: width,
    height: height - DimensionsValue.VALUE_60,
    resizeMode: 'contain',
    marginTop: 'auto'
  },
  touchRotateView: {
    transform: [{ rotate: '90 deg' }]
  },
  imageRotate: {
    width: height - DimensionsValue.VALUE_60,
    height: width,
  }
})
