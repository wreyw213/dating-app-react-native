import React, { useEffect, useRef, useState } from "react";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppState, AppStateStatus, FlatList, LayoutChangeEvent, Text, View } from "react-native";
import { useIsFocused, useNavigationState } from "@react-navigation/native";
import { useDrawerStatus } from '@react-navigation/drawer';
import { MaterialTopTabNavigationProp } from "@react-navigation/material-top-tabs";
import useTheme from "../../library/hooks/useTheme";
import styles from "./styles";
import Header from "../../library/components/Header";
import data from "./data";
import InstaStory from "../../library/components/Stories";
import Button from "../../library/components/Button";
import { ScreenConstants } from "../../library/constants";

type Props = NativeStackScreenProps<any> & DrawerScreenProps<any> & { topTabNavigation?: MaterialTopTabNavigationProp<any> }


const ProfileScreen: React.FC<Props> = ({ navigation, topTabNavigation }) => {
	const isFoucused = useIsFocused()
	const [theme] = useTheme()

	return <View style={styles(theme).container}>

		<Header
			title="Profile"
			titleStyle={{ fontWeight: '600' }}
		/>

		<InstaStory
			data={data}
			duration={10}
			onStart={(item: any) => console.log(item)}
			onClose={(item: any) => console.log('close: ', item)}
			customSwipeUpComponent={<View>
				<Text>Swipe</Text>
			</View>}
			avatarTextStyle={{ fontWeight: '700', color: theme.TXT_PRIMARY }}
			style={{ marginTop: 30 }} />

	</View>
}

export default ProfileScreen;
