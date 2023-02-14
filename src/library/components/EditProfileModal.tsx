import React, { FC, useState } from 'react'
import { Modal, StyleSheet, View, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import FastImage from 'react-native-fast-image'
import { Colors } from '../constants'
import images from '../resources/images'
import { Theme } from '../types'
import DimensionsValue from '../utils/DimensionsValue'
import ImageButton from './ImageButton'

type Props = {
    theme: Theme
    isVisible: boolean,
    hideModal: () => void,
    onChangeCallBack: () => void
}

const EditProfileModal: FC<Props> = ({ theme, isVisible, hideModal, onChangeCallBack }) => {
    const [loading, setLoading] = useState(false);

    const handlePressDone = () => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            onChangeCallBack()
        }, 3000)
    }

    return <Modal
        transparent={true}
        visible={isVisible}
        onDismiss={hideModal}
    >
        <SafeAreaView style={styles(theme).viewContainer}>
            <View style={styles(theme).viewHeader}>
                <ImageButton containerStyle={styles(theme).viewTextBack} title='Close' titleStyle={styles(theme).textClose} onPress={hideModal} />
                <ImageButton containerStyle={styles(theme).viewTextProfile} title='Edit Profile' titleStyle={styles(theme).textProfile} />
                <ImageButton indecatorColor={Colors.BLUE} containerStyle={styles(theme).viewTextDone} title='Done' titleStyle={styles(theme).textDone} onPress={handlePressDone} isLoading={loading} />
            </View>

            <TouchableOpacity style={styles(theme).viewProfile}>
                <FastImage style={styles(theme).imageProfile} source={{ uri: 'https://image.freepik.com/free-vector/mobile-wallpaper-with-fluid-shapes_79603-601.jpg' }} />
                <Image style={styles(theme).imageEdit} source={images.IC_EDIT} />
            </TouchableOpacity>


            <Text>Name</Text>

        </SafeAreaView>
    </Modal>
}

export default EditProfileModal

const styles = (theme: Theme) => StyleSheet.create({
    viewContainer: {
        flex: 1,
        backgroundColor: theme.BG_PRIMARY,
    },
    viewHeader: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 2,
        borderBottomColor: `${theme.BG_SECONDRY}33`,
        paddingBottom: DimensionsValue.VALUE_5
    },
    textClose: {
        fontSize: DimensionsValue.VALUE_18,
        color: theme.TXT_PRIMARY,
    },
    textDone: {
        fontSize: DimensionsValue.VALUE_18,
        color: Colors.BLUE,
        fontWeight: '900'
    },
    textProfile: {
        fontSize: DimensionsValue.VALUE_18,
        color: theme.TXT_PRIMARY,
        fontWeight: '700'
    },
    viewLoader: {
        width: DimensionsValue.VALUE_60
    },
    viewTextBack: {
        alignItems: 'flex-start',
        flex: 1,
        paddingHorizontal: DimensionsValue.VALUE_10
    },
    viewTextProfile: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: DimensionsValue.VALUE_7
    },
    viewTextDone: {
        flex: 1,
        alignItems: 'flex-end',
        paddingHorizontal: DimensionsValue.VALUE_10
    },
    imageProfile: {
        width: DimensionsValue.VALUE_120,
        height: DimensionsValue.VALUE_120,
        borderRadius: DimensionsValue.VALUE_120
    },
    viewProfile: {
        marginVertical: DimensionsValue.VALUE_30,
        alignSelf: 'center',
        justifyContent: 'center',
    },
    imageEdit: {
        position: 'absolute',
        tintColor: theme.TXT_PRIMARY,
        alignSelf: 'center',
        width: DimensionsValue.VALUE_40,
        height: DimensionsValue.VALUE_40,
    }
})