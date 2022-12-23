import React, { FC } from 'react';
import { Text, Dimensions, TouchableOpacity, ActivityIndicator, View, Image, Platform, StyleSheet, ImageSourcePropType, StyleProp, ViewStyle, TextStyle, ImageStyle } from 'react-native';
const { width, } = Dimensions.get('window');

type Props = {
  title: string,
  isLoading?: boolean,
  disabled?: boolean,
  onPress: () => void,
  leftImage?: ImageSourcePropType,
  rightImage?: ImageSourcePropType,
  containerStyle?: StyleProp<ViewStyle>,
  textStyle?: StyleProp<TextStyle>,
  leftImageStyles?: StyleProp<ImageStyle>,
  rightImageStyles?: StyleProp<ImageStyle>
}
const Button: React.FC<Props> = ({ title, isLoading, disabled, onPress, leftImage, rightImage,
  containerStyle, textStyle, leftImageStyles, rightImageStyles
}) => {
  return (

    <TouchableOpacity disabled={isLoading || disabled} style={[styles.touchContainer,
    disabled && { backgroundColor: '#fefefe' }, containerStyle]} onPress={onPress}>
      {isLoading ? <ActivityIndicator color={'#FFF'} /> :
        <View style={styles.rootView}>
          {leftImage && <Image style={[styles.buttonLeftImage, leftImageStyles]} source={leftImage} />}
          <Text style={[styles.titleLabel, textStyle,]}>{title}</Text>
          {rightImage && <Image style={[styles.buttonRightImage, rightImageStyles]} source={rightImage} />}
        </View>}
    </TouchableOpacity>
  );
}

export default Button

const styles = StyleSheet.create({
  touchContainer: {
    alignSelf: 'center',
    height: width / 8.15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: width / 37.5,
    backgroundColor: '#000',
    // minWidth: width / 4
  },
  titleLabel: {
    // color: '#FFFFFF',
    // fontSize: 12,
  },
  rootView: {
    flexDirection: 'row'
  },
  buttonRightImage: {
    marginEnd: 5,
    alignSelf: 'center'
  },
  buttonLeftImage: {
    marginEnd: 5,
    alignSelf: 'center'
  },
});
