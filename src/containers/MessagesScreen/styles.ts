import {Dimensions, StyleSheet} from 'react-native';
import {Colors} from '../../library/constants/ColorConstants';
import {Theme} from '../../library/types';
import DimensionsValue from '../../library/utils/DimensionsValue';


const styles = (theme: Theme) =>
  StyleSheet.create({
    viewHeader : {

    },
    textActivities:{
        color:theme.TXT_PRIMARY,
        marginHorizontal:DimensionsValue.VALUE_20,
        fontSize:DimensionsValue.VALUE_18,
        fontWeight:'700'
    },
    textMessages:{
        color:theme.TXT_PRIMARY,
        marginHorizontal:DimensionsValue.VALUE_20,
        fontSize:DimensionsValue.VALUE_18,
        fontWeight:'700',
        marginVertical:DimensionsValue.VALUE_10
    },
    imageSearch:{
        width:DimensionsValue.VALUE_22,
        height:DimensionsValue.VALUE_22,
        tintColor:theme.TXT_PRIMARY
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

    viewInstaStory:{
      marginTop: DimensionsValue.VALUE_30,
      marginHorizontal:DimensionsValue.VALUE_10
    }
  });

export default styles;
