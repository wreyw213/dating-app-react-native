import React from 'react';
import { Text, View, Image, Dimensions, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { Colors } from '../../../library/constants';
import useTheme from '../../../library/hooks/useTheme';
import images from '../../../library/resources/images';
import { Theme } from '../../../library/types';
import DimensionsValue from '../../../library/utils/DimensionsValue';

const {WHITE,DARK_GRAY,BLACK,GRAY,YELLOW,LIKE_ACTIONS,FLASH_ACTIONS,PRIMARY_BUTTON,SECONDARY_BUTTON} = Colors

type Props = {
  image:any
  name:any
  onPressLeft:any
  onPressRight:any,
  onPressChat?:any,
  age?:number
}
const MatchCard = ({
  image,
  name,
  onPressLeft,
  onPressRight,
  onPressChat,
  age,
}:Props) => {
  const [theme] = useTheme();


  return (
    <View style={styles(theme).containerCardItem}>

      <ImageBackground
        source={image || images.IC_USER}
        style={styles(theme).imageStyle}>

        <Text style={styles(theme).nameStyle}>
          {name},{age}
        </Text>

        <View style={styles(theme).actionsCardItem}>
          <TouchableOpacity
            style={styles(theme).button}
            onPress={() => onPressRight()}>
            <Image
              style={[styles(theme).imageActions, styles(theme).imageDisLike]}
              source={images.IC_PLUS}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles(theme).buttonLike}
            onPress={() => onPressLeft()}>
            <Image
              style={styles(theme).imageActions}
              source={images.IC_HEART}
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    containerCardItem: {
      backgroundColor: theme.BG_SECONDRY,
      borderRadius: DimensionsValue.VALUE_15,
      alignItems: 'center',
      margin: DimensionsValue.VALUE_10,
      width:DimensionsValue.VALUE_160,
      height:DimensionsValue.VALUE_200,
      overflow:'hidden'
    },
    actionsCardItem: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    button: {
      width: DimensionsValue.VALUE_60,
      alignItems: 'center',
      justifyContent: 'center',
      borderRightColor:theme.TXT_SECONDARY,
      borderRightWidth:2,
      height:DimensionsValue.VALUE_50,
      backgroundColor:`${Colors.BLACK}80`,
      flex:1
    },
    buttonLike:{
      width: DimensionsValue.VALUE_60,
      alignItems: 'center',
      justifyContent: 'center',
      height:DimensionsValue.VALUE_50,
      backgroundColor:`${Colors.BLACK}80`,
      flex:1
    },
    imageActions: {
      width: DimensionsValue.VALUE_25,
      height: DimensionsValue.VALUE_25,
      tintColor:Colors.WHITE
    },
    imageDisLike: {
      transform: [{rotate: '45 deg'}],
      tintColor:Colors.WHITE
    },
    imageStyle:{
        width:'100%',
        height:'100%',
        justifyContent:'flex-end'
    },
    nameStyle:{
      fontWeight:'800',
      fontSize:DimensionsValue.VALUE_16,
      marginHorizontal:DimensionsValue.VALUE_10,
      color:Colors.WHITE,
      marginBottom:DimensionsValue.VALUE_7
    }
  });

export default MatchCard;



