import {Dimensions, StyleSheet} from 'react-native';
import {Colors} from '../../library/constants/ColorConstants';
import {Theme} from '../../library/types';
import DimensionsValue from '../../library/utils/DimensionsValue';


const styles = (theme: Theme) =>
  StyleSheet.create({
    textScreenDiscription: {
      margin: DimensionsValue.VALUE_10,
      fontSize: DimensionsValue.VALUE_16,
      lineHeight: DimensionsValue.VALUE_24,
      color: theme.TXT_PRIMARY,
      fontWeight: '400',
      opacity: 0.9,
    },
    containerHome: {
      marginHorizontal: 10,
      flex:1
    },
  });

export default styles;
