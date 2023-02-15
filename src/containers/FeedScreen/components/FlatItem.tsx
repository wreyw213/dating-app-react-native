import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import VideoPlayer from "../../../library/components/VideoPlayer";
import ProgressiveImage from "./ProgressiveImage";
import { Theme } from "../../../library/types";
import ImageButton from "../../../library/components/ImageButton";
import images from "../../../library/resources/images";
import styles from "./styles";

type Props = {
	index: number,
	thumb: string,
	sources: string,
	media_small: string,
	title?: string,
	scrollToTop?: () => void,
	heightOfView: number,
	media_type: "image" | "video",
	theme: Theme,
	item?: any
}

class FlatItem extends React.PureComponent<Props> {
	video: any;

	componentWillUnmount() {
		if (this.video) {
			//@ts-ignore-next-line
			// this.video.setNativeProps({ paused: true })
		}
	}

	async play(seek: boolean) {
		// const status = await this.video.getStatusAsync();
		// if (status.isPlaying) {
		// return;
		// }
		console.log("playing=============")
		//@ts-ignore-next-line
		if (seek) this.video?.setNativeProps({ paused: false, seek: { time: 0 } })
		else this.video?.setNativeProps({ paused: false })
	}

	pause() {
		if (this.video) {
			// console.log("this.video", this.video)
			//@ts-ignore-next-line
			this.video.setNativeProps({ paused: true })
		}
	}

	render() {
		const { index, media_type, sources, media_small, title, scrollToTop, heightOfView, theme, item } = this.props;

		return (
			<View style={[styles(theme).cell, { height: heightOfView }]}>

				<TouchableOpacity style={[styles(theme).viewTop]} onPress={scrollToTop} />

				{media_type == 'image' ?
					<ProgressiveImage
						index={index}
						style={styles(theme).video}
						source={{ uri: sources }}
						thumbnailSource={{ uri: media_small }}
					/>
					:
					<VideoPlayer
						index={index}
						ref={(ref) => this.video = ref}
						source={sources}
						paused={true}
						style={styles(theme).video}
						repeat={true}
					/>
				}

				<View style={styles(theme).viewSideActions}>
					<ImageButton image={images.IC_HEART_OUTLINE} imageStyle={styles(theme).imageAction} />
					<ImageButton image={images.IC_COMMENT} imageStyle={styles(theme).imageAction} />
					<ImageButton image={images.IC_SHARE} imageStyle={styles(theme).imageAction} />
					<ImageButton image={images.IC_MORE} imageStyle={styles(theme).imageAction} />
				</View>

				<View style={styles(theme).textDescription}>
					<ImageButton imageStyle={styles(theme).imageUser} image={item && item.userImage ? { src: item.userImage } : images.IC_USER} />
					<View>
						<Text style={styles(theme).textName}>mark davis</Text>
						<Text style={styles(theme).textUserName}>@marko0283</Text>
					</View>
				</View>
			</View>
		);
	}
}


export default FlatItem
