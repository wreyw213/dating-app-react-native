import React, { useEffect, useRef, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Alert, Text, View } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { MaterialTopTabScreenProps } from "@react-navigation/material-top-tabs";
import useTheme from "../../library/hooks/useTheme";
import styles from "./styles";
import Header from "../../library/components/Header";
import data from "./data";
import InstaStory from "../../library/components/Stories";
import Geolocation from 'react-native-geolocation-service';
import { Linking } from "react-native";

type Props = NativeStackScreenProps<any> & MaterialTopTabScreenProps<any>


const ProfileScreen: React.FC<Props> = () => {
	const isFoucused = useIsFocused()
	const [theme] = useTheme()

	useEffect(() => {
		if (!isFoucused) return
		getCoordinates()
	}, [isFoucused])

	const getCoordinates = async () => {
		try {
			const permission = await Geolocation.requestAuthorization('whenInUse')


			Geolocation.getCurrentPosition(
				(position) => {
					console.log(position);
					Alert.alert('Got current position')
				},
				(error) => {
					// See error code charts below.
					console.log(error.code, error.message);
					if (error.code == 1) showPermissionAlert();
					else Alert.alert(error.message)
				},
				{ enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
			);
		} catch (err) {
			console.log("Error=>>>>>>", err)
		}
	}

	const showPermissionAlert = () => {
		Alert.alert('App', 'Please grant location permission', [
			{ text: 'Cancel' },
			{ text: 'Settings', onPress: () => Linking.openSettings() }
		])
	}

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
