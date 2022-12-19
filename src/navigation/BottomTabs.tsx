import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react"
import HomeScreen from "../containers/HomeScreen";
import SettingsScreen from "../containers/SettingsScreen";

const BottomTab = () => {
    const Tab = createBottomTabNavigator();

    return <Tab.Navigator screenOptions={{
        headerShown: false
    }}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
}

export default BottomTab