import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Theme } from '../../../library/types';
import DimensionsValue from '../../../library/utils/DimensionsValue';

type Props = {
    theme:Theme
}
const BottomSheetHandlerComponent = ({theme}:Props) => {
    return <View style={styles(theme).mainContainer}>
        <View style={styles(theme).viewLeftContainer}/>
        {/* <View style={styles(theme).viewCenterContainer}/> */}
        <View style={styles(theme).viewRightContainer}/>
    </View>
};




const styles = (theme:Theme) => StyleSheet.create({
    mainContainer:{
        flexDirection:'row',
        height:DimensionsValue.VALUE_46,
        // borderTopEndRadius: DimensionsValue.VALUE_30,
        //   borderTopStartRadius: DimensionsValue.VALUE_30,
    },
    viewLeftContainer:{
        backgroundColor:`${theme.BG_PRIMARY}FF`,
        // borderTopStartRadius: DimensionsValue.VALUE_30,
        // borderTopEndRadius: 10,
        flex:1
    },
    viewCenterContainer:{

    },
    viewRightContainer:{
        flex:1,
        borderTopStartRadius: 30,
        borderTopEndRadius: DimensionsValue.VALUE_25,
        backgroundColor:`${theme.BG_PRIMARY}FF`
    }
})
export default BottomSheetHandlerComponent