import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { MaterialTopTabNavigationProp } from "@react-navigation/material-top-tabs";
import React, { FC, useEffect } from "react"
import ChatScreen from "../containers/ChatScreen";
import FeedScreen from "../containers/FeedScreen";
import HomeScreen from "../containers/HomeScreen";
import MatchesScreen from "../containers/MatchesScreen";
import MessagesScreen from "../containers/MessagesScreen";
import PlansScreen from "../containers/PlansScreen";
import SettingsScreen from "../containers/SettingsScreen";
import UserInfoScreen from "../containers/UserInfoScreen";
import BottomBar from "../library/components/BottomBar";
import ScreenConstants from "../library/constants/ScreenConstants";

type Props = DrawerScreenProps<any> & { topTabNavigation: MaterialTopTabNavigationProp<any> }

const BottomTab: FC<Props> = ({ topTabNavigation }) => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={props => <BottomBar {...props} />}>
      <Tab.Screen name={ScreenConstants.HOME_SCREEN} component={HomeScreen} />
      <Tab.Screen name={ScreenConstants.MESSAGES_SCREEN} component={MessagesScreen} />
      <Tab.Screen
        name={ScreenConstants.MATCHES_SCREEN}
        component={MatchesScreen}
      />
      <Tab.Screen
        name={ScreenConstants.FEED_SCREEN}
        children={Props => (
          <FeedScreen {...Props} topTabNavigation={topTabNavigation} />
        )}
      />
    </Tab.Navigator>
  );
}

export default BottomTab