import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationState, useNavigationState, useRoute } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { FC } from "react"
import { useSelector } from 'react-redux';
import ProfileScreen from '../containers/ProfileScreen';
import ScreenConstants from '../library/constants/ScreenConstants';
import { RootState } from '../library/redux/store';
import BottomTab from './BottomTabs';

type Props = NativeStackScreenProps<any>

const TopTabNavigation: FC<Props> = () => {
  const Tab = createMaterialTopTabNavigator();

  const { currentNavigationState: { data } } = useSelector((state => state)) as RootState

  const enabledRoutes = [
    ScreenConstants.FEED_SCREEN,
    ScreenConstants.PROFILE_SCREEN,
    //   ScreenConstants.HOME_SCREEN,
    ScreenConstants.CHAT_SCREEN,
  ];
  return <Tab.Navigator
    screenOptions={{
      swipeEnabled: (!data?.name || enabledRoutes.includes(data?.name)) ? true : false,
    }}
    tabBar={(Prosp) => null}>
    <Tab.Screen
      name={ScreenConstants.BOTTOM_STACk}
      component={BottomTab}
    />
    <Tab.Screen name={ScreenConstants.PROFILE_SCREEN} component={ProfileScreen} />
  </Tab.Navigator>
}

export default TopTabNavigation