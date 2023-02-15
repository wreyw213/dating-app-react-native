import React, { FC } from "react";
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AppConstants, ColorConstants, Colors } from "../../../library/constants";
import useTheme from "../../../library/hooks/useTheme";
import images from "../../../library/resources/images";
import { Theme } from "../../../library/types";
import DimensionsValue from "../../../library/utils/DimensionsValue";

type Props = {
  item: any;
  handlePressItem: (item: any) => void;
  onPressCreateStory:()=>void
};
const Activity: FC<Props> = ({handlePressItem, item}) => {
  const [theme] = useTheme();

  return (
    <TouchableOpacity
      style={styles(theme).viewContainer}
      onPress={handlePressItem}>
      <View>
        <Image
          source={item.image || images.IC_USER}
          style={styles(theme).imageUser}
        />
        {item.id == -1 && (
          <TouchableOpacity
            hitSlop={AppConstants.HITSLOP_SMALL}
            style={styles(theme).viewOverlay}>
            <Image
              style={styles(theme).imagePlus}
              source={images.IC_PLUS_LIGHT}
            />
          </TouchableOpacity>
        )}
      </View>

      <Text style={styles(theme).textUserName}>{item.name.split(' ')[0]}</Text>
    </TouchableOpacity>
  );
};

export default Activity;

const styles = (theme: Theme) =>
  StyleSheet.create({
    viewContainer: {
      // borderBottomColor:`${theme.BG_SECONDRY}EE`,
      marginHorizontal: DimensionsValue.VALUE_10,
      paddingVertical: DimensionsValue.VALUE_10,
      justifyContent: 'center',
      alignContent: 'center',
    },
    viewDetails: {
      borderBottomColor: `${theme.BG_SECONDRY}33`,
      borderBottomWidth: 1,
      justifyContent: 'center',
      // alignSelf:'center',
      flex: 1,
      marginHorizontal: DimensionsValue.VALUE_10,
    },
    imageUser: {
      width: DimensionsValue.VALUE_70,
      height: DimensionsValue.VALUE_70,
      borderRadius: DimensionsValue.VALUE_50,
    },
    textUserName: {
      marginVertical: DimensionsValue.VALUE_5,
      fontSize: DimensionsValue.VALUE_14,
      fontWeight: '600',
      color: theme.TXT_PRIMARY,
      textAlign: 'center',
    },
    textLastMessage: {
      fontSize: DimensionsValue.VALUE_14,
      marginBottom: DimensionsValue.VALUE_5,
      fontWeight: '400',
      color: theme.TXT_PRIMARY,
    },
    viewLastMessageDetails: {
      justifyContent: 'center',
    },
    textLastMessageTime: {
      color: theme.TXT_PRIMARY,
      fontSize: DimensionsValue.VALUE_12,
      opacity: 0.7,
      marginVertical: DimensionsValue.VALUE_5,
    },
    viewUnReadMessageCount: {
      width: DimensionsValue.VALUE_18,
      height: DimensionsValue.VALUE_18,
      borderRadius: DimensionsValue.VALUE_18,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors.RED_LIGHT,
      alignSelf: 'center',
      marginBottom: DimensionsValue.VALUE_5,
    },
    textUnReadCount: {
      color: Colors.WHITE,
      fontSize: DimensionsValue.VALUE_12,
      fontWeight: '700',
    },
    viewOverlay: {
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      width: DimensionsValue.VALUE_30,
      height: DimensionsValue.VALUE_30,
      borderRadius: DimensionsValue.VALUE_60,
      backgroundColor: theme.BG_SECONDRY,
      top: -DimensionsValue.VALUE_7/2,
      bottom: 0,
      right: -DimensionsValue.VALUE_6,
    },
    imagePlus: {
      width: DimensionsValue.VALUE_25,
      height: DimensionsValue.VALUE_25,
      tintColor: theme.TXT_SECONDARY,
    },
  });