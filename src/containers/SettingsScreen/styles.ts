import { StyleSheet } from "react-native";
import { Colors } from "../../library/constants";
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
    viewSwitch: {
        marginHorizontal: DimensionsValue.VALUE_15,
        marginVertical: DimensionsValue.VALUE_10,
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'space-between'
    },
    imageItems: {
        width: DimensionsValue.VALUE_20,
        height: DimensionsValue.VALUE_20,
        tintColor: theme.TXT_PRIMARY
    },
    textDarkMode: {
        color: theme.TXT_PRIMARY,
        fontSize: DimensionsValue.VALUE_18,
        marginStart: DimensionsValue.VALUE_10,
        alignSelf: 'center',
        flex: 1
    },
    imageProfile: {
        width: DimensionsValue.VALUE_100,
        height: DimensionsValue.VALUE_100,
        borderRadius: DimensionsValue.VALUE_100
    },
    viewProfileDetails: {
        marginVertical: DimensionsValue.VALUE_15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textUserName: {
        color: theme.TXT_PRIMARY,
        fontSize: DimensionsValue.VALUE_16,
        fontWeight: '600',
        alignSelf: 'center',
        marginTop: DimensionsValue.VALUE_5
    },
    textEmail: {
        color: theme.TXT_PRIMARY,
        fontSize: DimensionsValue.VALUE_16,
        fontWeight: '600',
        alignSelf: 'center',
        opacity: 0.8
    },
    imageRight: {
        width: DimensionsValue.VALUE_18,
        height: DimensionsValue.VALUE_18,
        resizeMode: 'cover',
        tintColor: theme.TXT_PRIMARY,
        transform: [{
            rotate: '180deg'
        }]
    },
    textDeleteAccount: {
        color: `${Colors.RED_LIGHT}`,
        fontSize: DimensionsValue.VALUE_18,
        marginStart: DimensionsValue.VALUE_10,
        alignSelf: 'center',
        fontWeight: '500',
        flex: 1
    },
    imageDelete: {
        tintColor: Colors.RED_LIGHT,
        width: DimensionsValue.VALUE_18,
        height: DimensionsValue.VALUE_18,
    },
    textLogOut: {
        color: theme.TXT_PRIMARY,
        fontWeight: '700',
        fontSize: DimensionsValue.VALUE_18,
        marginStart: DimensionsValue.VALUE_10,
        alignSelf: 'center',
        flex: 1
    },
    imageLogout: {
        tintColor: theme.TXT_PRIMARY,
        width: DimensionsValue.VALUE_18,
        height: DimensionsValue.VALUE_18,
    }
});

export default styles