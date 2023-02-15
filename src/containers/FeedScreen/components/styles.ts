import { Dimensions, StyleSheet } from "react-native";
import { ColorConstants, Colors } from "../../../library/constants";
import { Theme } from "../../../library/types";
import DimensionsValue from "../../../library/utils/DimensionsValue";

const { width } = Dimensions.get('window');

const cellWidth = width;
const styles = (theme: Theme) => StyleSheet.create({
    cell: {
        width: cellWidth,
        backgroundColor: theme.BG_PRIMARY,

    },
    viewTop: {
        flexDirection: 'row',
        padding: 40,
        justifyContent: 'space-between',
        position: 'absolute',
        right: 0,
        left: 0,
        zIndex: 999,
    },
    video: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: theme.BG_PRIMARY
    },
    poster: {
        resizeMode: 'cover',
    },
    overlayText: {
        color: theme.TXT_PRIMARY,
    },
    textDescription: {
        position: 'absolute',
        bottom: DimensionsValue.VALUE_10,
        margin: DimensionsValue.VALUE_10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    imageUser: {
        width: DimensionsValue.VALUE_50,
        height: DimensionsValue.VALUE_50
    },
    textName: {
        color: theme.TXT_PRIMARY,
        fontWeight: '600',
        fontSize: DimensionsValue.VALUE_18,
        marginHorizontal: DimensionsValue.VALUE_10
    },
    textUserName: {
        color: theme.TXT_PRIMARY,
        fontSize: DimensionsValue.VALUE_12,
        marginHorizontal: DimensionsValue.VALUE_10
    },
    textTime: {
        fontSize: DimensionsValue.VALUE_14,
        color: theme.TXT_PRIMARY,
    },
    viewSideActions: {
        position: 'absolute',
        alignSelf: 'center',
        justifyContent: 'center',
        flex: 1,
        bottom: DimensionsValue.VALUE_100,
        right: DimensionsValue.VALUE_10,
        paddingHorizontal: DimensionsValue.VALUE_10
    },
    imageAction: {
        width: DimensionsValue.VALUE_30,
        height: DimensionsValue.VALUE_30,
        marginVertical: DimensionsValue.VALUE_10,
        tintColor: Colors.WHITE
    }
});

export default styles