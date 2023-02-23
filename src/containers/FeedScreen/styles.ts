import { Dimensions, StyleSheet } from "react-native";
import ColorConstants from "../../library/constants/ColorConstants";
import { Theme } from "../../library/types";
import DimensionsValue from "../../library/utils/DimensionsValue";
import { cellHeight } from "./utils/constants";

const { width } = Dimensions.get('window');

const cellWidth = width;
const styles = (theme: Theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.BG_PRIMARY,
    },
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
        zIndex: 999
    },
    video: {
        position: 'absolute',
        top: 5,
        right: 0,
        bottom: 5,
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
        color: theme.TXT_PRIMARY,
        margin: DimensionsValue.VALUE_10
    }
});

export default styles