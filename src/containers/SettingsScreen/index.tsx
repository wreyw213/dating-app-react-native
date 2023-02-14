import React from "react";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import styles from "./styles";
import useTheme from "../../library/hooks/useTheme";
import Header from "../../library/components/Header";
import images from "../../library/resources/images";
import { Colors } from "../../library/constants";
import FastImage from "react-native-fast-image";
import TextInputField from "../../library/components/TextInputField";
import DimensionsValue from "../../library/utils/DimensionsValue";

type Props = NativeStackScreenProps<any> & DrawerScreenProps<any> & BottomTabScreenProps<any>

const SettingsScreen: React.FC<Props> = ({ navigation }) => {

    const [theme] = useTheme();

    return <View style={styles(theme).container}>
        <Header
            leftIcon={images.IC_BACK}
            leftIconStyle={styles(theme).imageBack}
            tapOnLeftIcon={() => navigation.goBack()}
        />
    </View>
}

export default SettingsScreen

