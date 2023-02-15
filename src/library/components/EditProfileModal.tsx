import React, { FC, useState } from 'react'
import { Modal, StyleSheet, View, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FastImage from 'react-native-fast-image'
import { Colors } from '../constants'
import images from '../resources/images'
import { Theme } from '../types'
import DimensionsValue from '../utils/DimensionsValue'
import ImageButton from './ImageButton'
import TextInputField from './TextInputField'

type Props = {
    theme: Theme
    isVisible: boolean,
    hideModal: () => void,
    onChangeCallBack: () => void
}

const EditProfileModal: FC<Props> = ({ theme, isVisible, hideModal, onChangeCallBack }) => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: 'mark dev',
        username: 'mark_329',
        dob: '12-09-1997',
        email: 'mark@yopmail.com',
        phonenumber: '+919694566790',
        bio: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam odio qui nobis quia error quisquam?'
    })

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
            <KeyboardAwareScrollView >

                <TouchableOpacity style={styles(theme).viewProfile}>
                    <FastImage style={styles(theme).imageProfile} source={{ uri: 'https://image.freepik.com/free-vector/mobile-wallpaper-with-fluid-shapes_79603-601.jpg' }} />
                    <Image style={styles(theme).imageEdit} source={images.IC_EDIT} />
                </TouchableOpacity>


                <Text style={styles(theme).textFieldTitle}>Username</Text>
                <TextInputField
                    value={formData.username}
                    onChangeText={(username) => setFormData({ ...formData, username })}
                    containerStyle={styles(theme).inputContainer}
                />

                <Text style={styles(theme).textFieldTitle}>Name</Text>
                <TextInputField
                    value={formData.name}
                    onChangeText={(name) => setFormData({ ...formData, name })}
                    containerStyle={styles(theme).inputContainer}
                />

                <Text style={styles(theme).textFieldTitle}>Bio</Text>
                <TextInputField
                    value={formData.bio}
                    onChangeText={(bio) => setFormData({ ...formData, bio })}
                    containerStyle={[styles(theme).inputContainer, { height: undefined, paddingVertical: 7 }]}
                    multiline={true}
                    numberOfLines={3}
                />

                <Text style={styles(theme).textFieldTitle}>Email</Text>
                <TextInputField
                    value={formData.email}
                    onChangeText={(email) => setFormData({ ...formData, email })}
                    containerStyle={styles(theme).inputContainer}
                />

                <Text style={styles(theme).textFieldTitle}>Phone Number</Text>
                <TextInputField
                    value={formData.phonenumber}
                    onChangeText={(phonenumber) => setFormData({ ...formData, phonenumber })}
                    containerStyle={styles(theme).inputContainer}
                />

                <Text style={styles(theme).textFieldTitle}>DOB</Text>
                <TextInputField
                    value={formData.dob}
                    onChangeText={(dob) => setFormData({ ...formData, dob })}
                    containerStyle={styles(theme).inputContainer}
                />
            </KeyboardAwareScrollView>
        </SafeAreaView>
    </Modal>
}

export default EditProfileModal

const styles = (theme: Theme) => StyleSheet.create({
    viewContainer: {
        flex: 1,
        backgroundColor: theme.BG_PRIMARY,
    },
    inputContainer: {
        height: DimensionsValue.VALUE_46,
        paddingHorizontal: 0,
        marginVertical: DimensionsValue.VALUE_10
    },
    textFieldTitle: {
        fontSize: DimensionsValue.VALUE_16,
        fontWeight: '400',
        marginHorizontal: DimensionsValue.VALUE_20,
        marginTop: DimensionsValue.VALUE_15,
        color: theme.TXT_PRIMARY
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