import React, { useState, useEffect } from "react";
import { View, Image, TouchableOpacity, Text, StyleSheet, Platform, StyleProp, TextStyle } from "react-native";
import images from "../../../resources/images";
import { usePrevious } from "./helpers/StateHelpers";


type Props = {
    item: any
    unPressedBorderColor?: string
    pressedBorderColor?: string
    avatarSize?: number
    showText?: boolean
    textStyle: any,
    handleStoryItemPress: (item: any) => void
}

const StoryCircleListItem = (props: Props) => {

    const {
        item,
        unPressedBorderColor,
        pressedBorderColor,
        avatarSize,
        showText,
        textStyle,
    } = props;

    const [isPressed, setIsPressed] = useState(props?.item?.seen);

    const prevSeen = usePrevious(props?.item?.seen);

    useEffect(() => {
        if (prevSeen != props?.item?.seen) {
            setIsPressed(props?.item?.seen);
        }

    }, [props?.item?.seen]);

    const _handleItemPress = (item: any) => {
        const { handleStoryItemPress } = props;

        if (handleStoryItemPress) handleStoryItemPress(item);

        setIsPressed(true);
    };

    const size = avatarSize ?? 60;

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => _handleItemPress(item)}
                style={[
                    styles.avatarWrapper,
                    {
                        height: size + 4,
                        width: size + 4,
                    },
                    !isPressed
                        ? {
                            borderColor: unPressedBorderColor
                                ? unPressedBorderColor
                                : 'red'
                        }
                        : {
                            borderColor: pressedBorderColor
                                ? pressedBorderColor
                                : 'grey'
                        }
                ]}
            >
                <Image
                    style={{
                        height: size,
                        width: size,
                        borderRadius: 100,
                    }}
                    source={{ uri: item.user_image }}
                    defaultSource={Platform.OS === 'ios' ? images.DEFAULT_AVATAR : null}
                />
            </TouchableOpacity>
            {showText &&
                <Text
                    numberOfLines={1}
                    ellipsizeMode={'tail'}
                    style={{
                        width: size + 4,
                        ...styles.text,
                        ...textStyle
                    }}>{item.user_name}</Text>}
        </View>
    );
}

export default StoryCircleListItem;

const styles = StyleSheet.create({
    container: {
        marginVertical: 5,
        marginRight: 10
    },
    avatarWrapper: {
        borderWidth: 2,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        borderColor: 'red',
        borderRadius: 100,
        height: 64,
        width: 64
    },
    text: {
        marginTop: 3,
        textAlign: "center",
        alignItems: "center",
        fontSize: 11
    }
});
