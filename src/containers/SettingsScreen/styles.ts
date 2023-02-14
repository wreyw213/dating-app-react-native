import { StyleSheet } from "react-native";
import { Theme } from "../../library/types";
import DimensionsValue from "../../library/utils/DimensionsValue";


const styles = (theme: Theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.BG_PRIMARY,
    },
    imageBack: {
        width: DimensionsValue.VALUE_24,
        height: DimensionsValue.VALUE_24,
        resizeMode: 'cover',
        tintColor: theme.TXT_PRIMARY,
    },

});

export default styles