import React, { Fragment, useEffect, useRef, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Alert, FlatList, Image, ImageRequireSource, Text, TouchableOpacity, View } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { MaterialTopTabScreenProps } from "@react-navigation/material-top-tabs";
import useTheme from "../../library/hooks/useTheme";
import styles from "./styles";
import Header from "../../library/components/Header";
import data from "./data";
import InstaStory from "../../library/components/Stories";
import Geolocation from 'react-native-geolocation-service';
import { Linking } from "react-native";
import images from "../../library/resources/images";
import FastImage, { Source } from "react-native-fast-image";
import DimensionsValue from "../../library/utils/DimensionsValue";
import demo from "../HomeScreen/assets/data/demo";
import ImageViewModal from "../../library/components/ImageViewModal";
import Button from "../../library/components/Button";

type Props = NativeStackScreenProps<any> & MaterialTopTabScreenProps<any>

type ImageModalDataType = {
	show: boolean,
	image?: Source | ImageRequireSource
}
const ProfileScreen: React.FC<Props> = () => {
	const isFoucused = useIsFocused()
	const [theme] = useTheme()
	const [imageModalData, setImageModalData] = useState<ImageModalDataType>({
		show: false,
	})

	useEffect(() => {
		if (!isFoucused) return
		// getCoordinates()
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

	const handlePressImage = (item: any) => {
		setImageModalData({
			show: true,
			...item
		})
	}

	const renderGallryItem = ({ item, index }: any) => {
		return <TouchableOpacity onPress={() => handlePressImage(item)} style={styles(theme).viewGalleryItem}>
			<Image style={styles(theme).imageGallery} source={item.image} />
		</TouchableOpacity>
	}


	const renderHeader = () => {
		return <Fragment>
			<View style={styles(theme).viewProfile}>
				<View style={styles(theme).viewProfileDetails}>
					<FastImage style={styles(theme).imageProfile} source={{ uri: 'https://image.freepik.com/free-vector/mobile-wallpaper-with-fluid-shapes_79603-601.jpg' }} />
					<Text style={styles(theme).textUserName}>mark davis</Text>
				</View>
				<View style={styles(theme).viewPostDetailsView}>
					<View style={styles(theme).viewdetails}>
						<Text style={styles(theme).textPostsDetails}>10</Text>
						<Text style={styles(theme).textPostsDetails}>Posts</Text>
					</View>
					<View style={styles(theme).viewdetails}>
						<Text style={styles(theme).textPostsDetails}>5</Text>
						<Text style={styles(theme).textPostsDetails}>Matches</Text>
					</View>
				</View>
			</View>
			<Text style={styles(theme).textDescription}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Explicabo tempore optio odit ullam id quis dolores provident! Illo!</Text>

			<View style={styles(theme).viewButtons}>
				<Button textStyle={styles(theme).textButtons} containerStyle={styles(theme).buttonContainer} title="Edit Profile" onPress={() => Alert.alert("Develoiper says", "still to implement")} />
				<Button textStyle={styles(theme).textButtons} containerStyle={styles(theme).buttonContainer} title="Share Profile" onPress={() => Alert.alert("Develoiper says", "still to implement")} />
			</View>

			<View style={styles(theme).viewStory}>
				<Text style={styles(theme).textStory}>Story</Text>
			</View>


			<InstaStory
				data={data}
				duration={10}
				onStart={(item: any) => console.log(item)}
				onClose={(item: any) => console.log('close: ', item)}
				customSwipeUpComponent={<View>
					<Text>Swipe</Text>
				</View>}
				avatarTextStyle={{ fontWeight: '700', color: theme.TXT_PRIMARY }}
				style={{ marginVertical: 10 }} />

			<View style={styles(theme).viewPosts}>
				<Text style={styles(theme).textPosts}>Posts</Text>
			</View>
		</Fragment >
	}

	return <View style={styles(theme).container}>

		<Header
			title="mark_devis_89"
			titleStyle={{ fontWeight: '600' }}
			rightIcon={images.IC_PLUS_ROUND}
			rightIconStyle={styles(theme).imageRightHeader}
		/>

		<FlatList
			ListHeaderComponent={renderHeader}
			data={demo}
			renderItem={renderGallryItem}
			numColumns={3}
			contentContainerStyle={{ padding: DimensionsValue.VALUE_5 }}
			showsVerticalScrollIndicator={false}
		/>


		{imageModalData.show && <ImageViewModal cached={true} uri={imageModalData.image} hideModal={() => {
			setImageModalData({ show: false })
		}} />}
	</View>
}

export default ProfileScreen;
