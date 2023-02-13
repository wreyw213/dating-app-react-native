import React, { useEffect } from "react";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FlatList, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import WebView from "react-native-webview";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { MaterialTopTabNavigationProp, MaterialTopTabScreenProps } from "@react-navigation/material-top-tabs";
import Header from "../../library/components/Header";
import useTheme from "../../library/hooks/useTheme";
import styles from "./styles";
import demo from "../HomeScreen/assets/data/demo";
import MatchCard from "./components/MatchCard";

type Props = NativeStackScreenProps<any> & MaterialTopTabScreenProps<any>

const MatchesScreen: React.FC<Props> = ({ navigation }) => {

    const [theme] = useTheme()

    return null


    return <View style={styles(theme).containerHome}>
        <Header
            title="Matches"
            titleStyle={{ fontWeight: '700' }}
        />

        <Text style={styles(theme).textScreenDiscription}>This is a list of people who have super liked you and your matches.</Text>

        <FlatList
            data={demo}
            numColumns={2}
            renderItem={({ item, index }) => <MatchCard
                image={item.image}
                name={item.name}
                onPressLeft={() => console.log("Left Press")}
                onPressRight={() => console.log("Right Press")}
                onPressChat={() => console.log("Chat Press")}
            />}
        />
    </View>
}

export default MatchesScreen

