import React from 'react';
import { Text, View, Image, Dimensions, TouchableOpacity, StyleSheet } from 'react-native';
import Button from '../../../library/components/Button';
import ImageButton from '../../../library/components/ImageButton';
import { Colors } from '../../../library/constants';
import useTheme from '../../../library/hooks/useTheme';
import images from '../../../library/resources/images';
import { Theme } from '../../../library/types';
import DimensionsValue from '../../../library/utils/DimensionsValue';

type Props = {
  selectedItem?:any
  setSelectItem:(data:any)=>void
}
const GenderButton = ({selectedItem, setSelectItem}: Props) => {
  const [theme] = useTheme();

  const ITEMS = [
    {id: 0, title: 'Girls'},
    {id: 1, title: 'Boys'},
    {id: 2, title: 'Both'},
  ];
console.log("selectedItem",selectedItem);

  return (
    <View style={styles(theme).containerCardItem}>
      {ITEMS.map(({id, title}, index) => (
        <ImageButton
          containerStyle={
            selectedItem == id
              ? styles(theme).selectedButton
              : styles(theme).unSelectedButton
          }
          titleStyle={
            selectedItem == id
              ? styles(theme).textSelected
              : styles(theme).textUnSelected
          }
          title={title}
          onPress={() => setSelectItem(id)}
        />
      ))}
    </View>
  );
};


export default GenderButton;


const styles = (theme: Theme) =>
  StyleSheet.create({
    containerCardItem: {
      height: DimensionsValue.VALUE_57,
      borderWidth: 1,
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderRadius: DimensionsValue.VALUE_15,
      marginTop: DimensionsValue.VALUE_20,
      overflow: 'hidden',
      borderColor: `${theme.BG_SECONDRY}20`,
    },
    selectedButton: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors.RED_LIGHT,
    },
    unSelectedButton: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    textSelected: {
        color:Colors.WHITE,
        fontWeight:'700',
        fontSize:DimensionsValue.VALUE_14
    },
    textUnSelected: {
        color:theme.TXT_PRIMARY,
        fontWeight:'600',
        fontSize:DimensionsValue.VALUE_14
    },
  });

