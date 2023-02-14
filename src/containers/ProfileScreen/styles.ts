import { Dimensions, StyleSheet } from "react-native";
import { Theme } from "../../library/types";
import DimensionsValue from "../../library/utils/DimensionsValue";

const { width } = Dimensions.get('window');

const cellWidth = width;
const styles = (theme: Theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.BG_PRIMARY,
        marginHorizontal: DimensionsValue.VALUE_10
    },
    viewProfile: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: DimensionsValue.VALUE_20,
    },
    textDescription: {
        bottom: DimensionsValue.VALUE_10,
        color: theme.TXT_PRIMARY,
        marginHorizontal: DimensionsValue.VALUE_10,
        marginVertical: DimensionsValue.VALUE_10
    },
    imageRightHeader: {
        width: DimensionsValue.VALUE_28,
        height: DimensionsValue.VALUE_28,
        tintColor: theme.TXT_PRIMARY
    },
    imageProfile: {
        width: DimensionsValue.VALUE_100,
        height: DimensionsValue.VALUE_100,
        borderRadius: DimensionsValue.VALUE_100
    },
    viewProfileDetails: {

    },
    textUserName: {
        color: theme.TXT_PRIMARY,
        fontSize: DimensionsValue.VALUE_16,
        fontWeight: '600',
        alignSelf: 'center',
        marginVertical: DimensionsValue.VALUE_10
    },
    viewGalleryItem: {
        width: DimensionsValue.VALUE_105,
        height: DimensionsValue.VALUE_105,
        borderRadius: DimensionsValue.VALUE_15,
        overflow: 'hidden',
        margin: DimensionsValue.VALUE_5
    },
    imageGallery: {
        width: '100%',
        height: '100%',
    },
    textStory: {
        color: theme.TXT_PRIMARY,
        fontSize: DimensionsValue.VALUE_20,
        fontWeight: '600',
    },
    textPosts: {
        color: theme.TXT_PRIMARY,
        fontSize: DimensionsValue.VALUE_20,
        fontWeight: '600',
    },
    viewStory: {
        borderBottomWidth: 1,
        marginHorizontal: DimensionsValue.VALUE_10,
        borderBottomColor: `${theme.BG_SECONDRY}33`,
        paddingBottom: DimensionsValue.VALUE_5,
    },
    viewPosts: {
        borderBottomWidth: 1,
        borderBottomColor: `${theme.BG_SECONDRY}33`,
        marginHorizontal: DimensionsValue.VALUE_10,
        marginVertical: DimensionsValue.VALUE_10,
        paddingBottom: DimensionsValue.VALUE_5,
    },
    viewButtons: {
        flexDirection: 'row',
        marginHorizontal: DimensionsValue.VALUE_10,
        justifyContent: 'space-between',
        marginTop: DimensionsValue.VALUE_5,
        marginBottom: DimensionsValue.VALUE_25,
    },
    buttonContainer: {
        height: DimensionsValue.VALUE_30,
        width: DimensionsValue.VALUE_150,
        borderRadius: DimensionsValue.VALUE_5
    },
    textButtons: {
        color: theme.TXT_SECONDARY,
        fontSize: DimensionsValue.VALUE_12,
        fontWeight: '700',
    },
    viewPostDetailsView: {
        display: 'flex',
        flexDirection: 'row',
    },
    textPostsDetails: {
        color: theme.TXT_PRIMARY,
        fontSize: DimensionsValue.VALUE_18,
        fontWeight: '700',
        alignSelf: 'center',
        marginTop: DimensionsValue.VALUE_7,
        letterSpacing: 0.9
    },
    viewdetails: {
        marginHorizontal: DimensionsValue.VALUE_10,
        marginVertical: DimensionsValue.VALUE_15,
        alignItems: 'center',
    }
});

export default styles