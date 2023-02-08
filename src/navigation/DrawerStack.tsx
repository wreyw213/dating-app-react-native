
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { MaterialTopTabScreenProps } from "@react-navigation/material-top-tabs";
import React, { useEffect } from "react"
import { Text, View } from "react-native";
import HomeScreen from "../containers/HomeScreen";
import SettingsScreen from "../containers/SettingsScreen";
import ScreenConstants from "../library/constants/ScreenConstants";
import BottomTab from "./BottomTabs";

function NotificationsScreen() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Notification Screen</Text>
        </View>
    );
}

type Props = MaterialTopTabScreenProps<any>

const DrawerStack: React.FC<Props> = ({ navigation }) => {
    const Drawer = createDrawerNavigator();

    return <Drawer.Navigator screenOptions={{
        headerTitle: '',
        headerShown: false,
        drawerType: 'front'
    }}>
        <Drawer.Screen
            name={ScreenConstants.HOME_STACK}
            // component={BottomTab} 
            children={(Props) => <BottomTab
                {...Props}
                topTabNavigation={navigation}
            />}
        />
        {/* <Drawer.Screen name="HomeSCREEN" component={HomeScreen} /> */}
        <Drawer.Screen name={ScreenConstants.NOTIFICATION_SCREEN} component={NotificationsScreen} />
    </Drawer.Navigator>
}

export default DrawerStack