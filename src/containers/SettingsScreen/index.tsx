import React, { useEffect, useState } from "react";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import styles from "./styles";
import useTheme from "../../library/hooks/useTheme";
import Header from "../../library/components/Header";
import images from "../../library/resources/images";
import { Colors, ScreenConstants } from "../../library/constants";
import FastImage from "react-native-fast-image";
import TextInputField from "../../library/components/TextInputField";
import DimensionsValue from "../../library/utils/DimensionsValue";
import { Switch } from "react-native";
import { StatusBar } from "react-native";
import { AppDispatch } from "../../library/redux/store";
import { useDispatch } from "react-redux";
import { updateTheme } from "../../library/redux/themeReducer";
import ImageButton from "../../library/components/ImageButton";
import { ScrollView } from "react-native-gesture-handler";

type Props = NativeStackScreenProps<any> & DrawerScreenProps<any> & BottomTabScreenProps<any>

const SettingsScreen: React.FC<Props> = ({ navigation }) => {

    const [theme] = useTheme();
    const dispatch = useDispatch() as AppDispatch;
    const [isEnabled, setIsEnabled] = useState(theme.type == 'dark' ? true : false)

    useEffect(() => {
        StatusBar.setBarStyle(theme.type == 'dark' ? 'light-content' : 'dark-content')
        setIsEnabled(theme.type == 'dark' ? true : false)
    }, [theme])

    const SETTTINGS_ITEMS = [
        { id: 0, title: 'Dark Mode', icon: images.IC_DARK },
        { id: 1, title: 'Notifications', screen: ScreenConstants.NOTIFICATION_SCREEN, icon: images.IC_BELL },
        { id: 2, title: 'Password & Security', screen: ScreenConstants.NOTIFICATION_SCREEN, icon: images.IC_LOCK },
        { id: 3, title: 'Privacy', screen: ScreenConstants.NOTIFICATION_SCREEN, icon: images.IC_SHIELD },
        { id: 4, title: 'FeedBack', screen: ScreenConstants.NOTIFICATION_SCREEN, icon: images.IC_FEEDBACK },
        { id: 5, title: 'Help', screen: ScreenConstants.NOTIFICATION_SCREEN, icon: images.IC_HELP },
        { id: 6, title: 'Terms & Policy', screen: ScreenConstants.NOTIFICATION_SCREEN, icon: images.IC_AGREEMENT },
        { id: 7, title: 'About', screen: ScreenConstants.NOTIFICATION_SCREEN, icon: images.IC_INFO },
    ]

    return <ScrollView contentContainerStyle={{ flex: 1 }} style={styles(theme).container}>
        <Header
            leftIcon={images.IC_BACK}
            leftIconStyle={styles(theme).imageBack}
            tapOnLeftIcon={() => navigation.goBack()}
            title={'Settings'}
            headerStyle={{ alignItems: 'center' }}
            titleStyle={{ textAlign: 'center', marginRight: DimensionsValue.VALUE_50 }}
        />

        <View style={styles(theme).viewProfileDetails}>
            <FastImage style={styles(theme).imageProfile} source={{ uri: 'https://image.freepik.com/free-vector/mobile-wallpaper-with-fluid-shapes_79603-601.jpg' }} />
            <Text style={styles(theme).textUserName}>mark davis</Text>
            <Text style={styles(theme).textEmail}>markdavis@yopmail.com</Text>
        </View>
        {SETTTINGS_ITEMS.map((item) => <View style={styles(theme).viewSwitch}>
            <Image style={styles(theme).imageItems} source={item.icon} />
            <Text style={styles(theme).textDarkMode}>{item.title}</Text>

            {item.id == 0 ? <Switch
                trackColor={{ false: Colors.C4C4C4, true: Colors.DARK_BLUE }}
                thumbColor={isEnabled ? Colors.WHITE : Colors.F4F3F4}
                ios_backgroundColor={Colors.C4C4C4}
                onValueChange={(value) => {
                    setIsEnabled(value)
                    dispatch(updateTheme(value ? 'dark' : 'light'))
                }}
                value={isEnabled}
            /> : <ImageButton image={images.IC_BACK} imageStyle={styles(theme).imageRight} />
            }
        </View>)}

        <TouchableOpacity style={[styles(theme).viewSwitch, { marginTop: 'auto' }]}>
            <Image style={styles(theme).imageLogout} source={images.IC_LOGOUT} />
            <Text style={styles(theme).textLogOut} >Log Out</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles(theme).viewSwitch, { marginBottom: DimensionsValue.VALUE_30 }]}>
            <Image style={styles(theme).imageDelete} source={images.IC_DELETE} />
            <Text style={styles(theme).textDeleteAccount} >Delete Account</Text>
        </TouchableOpacity>

    </ScrollView>
}

export default SettingsScreen

