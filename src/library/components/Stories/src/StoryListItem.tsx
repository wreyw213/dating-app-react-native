import React, { useState, useEffect, useRef } from 'react';
import {
    Animated,
    Image,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    TouchableWithoutFeedback,
    ActivityIndicator,
    View,
    Platform,
    SafeAreaView
} from "react-native";
import type { IUserStoryItem } from "./interfaces/IUserStory";
import { usePrevious } from "./helpers/StateHelpers";
import { isNullOrWhitespace } from "./helpers/ValidationHelpers";
import GestureRecognizer from 'react-native-swipe-gestures';
import Video from 'react-native-video';
import FastImage from 'react-native-fast-image';

const { width, height } = Dimensions.get('window');

type resizeMode = "stretch" | "contain" | "cover"

type Props = {
    profileName: string,
    profileImage: string,
    duration?: number,
    onFinish?: Function,
    onClosePress: Function,
    key: number,
    swipeText?: string,
    customSwipeUpComponent?: any,
    customCloseComponent?: any,
    stories?: IUserStoryItem[],
    currentPage: number,
    index: number,
};

export const StoryListItem = (props: Props) => {
    const stories = props.stories;

    const {duration} = props;

    const [load, setLoad] = useState(true);
    const [pressed, setPressed] = useState(false);
    const [videoDeuartion, setVideoDuration] = useState(duration)
    const [resizeMode, setResizeMode] = useState<resizeMode>('cover')

    const [content, setContent] = useState(
      stories?.length
        ? stories.map(x => {
            return {
              image: x.story_image,
              onPress: x.onPress,
              swipeText: x.swipeText,
              finish: 0,
              isVideo: x.is_video,
            };
          })
        : [],
    );

    const [current, setCurrent] = useState(0);

    const progress = useRef(new Animated.Value(0)).current;

    const prevCurrentPage = usePrevious(props.currentPage);

    useEffect(() => {
        //@ts-ignore
        let isPrevious = prevCurrentPage > props.currentPage;
        if (isPrevious) {
            setCurrent(content.length - 1);
        } else {
            setCurrent(0);
        }

        let data = [...content];
        data.map((x, i) => {
            if (isPrevious) {
                x.finish = 1;
                if (i == content.length - 1) {
                    x.finish = 0;
                }
            } else {
                x.finish = 0;
            }

        })
        setContent(data)
        start();
    }, [props.currentPage]);

    const prevCurrent = usePrevious(current);

    useEffect(() => {
        if (!isNullOrWhitespace(prevCurrent) && prevCurrent) { //added prevCurrent to avoid type error
            if (current > prevCurrent && content[current - 1].image == content[current].image) {
                start();
            } else if (current < prevCurrent && content[current + 1].image == content[current].image) {
                start();
            }
        }

    }, [current]);

    function start(totalTime = duration) {
        setLoad(false);
        progress.setValue(0);
        startAnimation(totalTime);
    }

    function startAnimation(totalTime = videoDeuartion) {

        Animated.timing(progress, {
            toValue: 1,
            duration: totalTime ? totalTime : props.duration,
            useNativeDriver: false
        }).start(({ finished }) => {
            if (finished) {
                next();
            }
        });
    }

    function onSwipeUp() {
        if (props.onClosePress) {
            props.onClosePress();
        }
        if (content[current].onPress) {
            content[current].onPress();
        }
    }

    function onSwipeDown() {
        props?.onClosePress();
    }

    const config = {
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 80
    };

    function next() {
        // check if the next content is not empty
        setLoad(true);
        if (current !== content.length - 1) {
            let data = [...content];
            data[current].finish = 1;
            setContent(data);
            setCurrent(current + 1);
            progress.setValue(0);
        } else {
            // the next content is empty
            close('next');
        }
    }

    function previous() {
        // checking if the previous content is not empty
        setLoad(true);
        if (current - 1 >= 0) {
            let data = [...content];
            data[current].finish = 0;
            setContent(data);
            setCurrent(current - 1);
            progress.setValue(0);
        } else {
            // the previous content is empty
            close('previous');
        }
    }

    function close(state: string) {
        let data = [...content];
        data.map(x => x.finish = 0);
        setContent(data);
        progress.setValue(0);
        if (props.currentPage == props.index) {
            if (props.onFinish) {
                props.onFinish(state);
            }
        }
    }

    const swipeText = content?.[current]?.swipeText || props.swipeText || 'Swipe Up';

    return (
        <GestureRecognizer
            onSwipeUp={() => onSwipeUp()}
            onSwipeDown={() => onSwipeDown()}
            config={config}
            style={{
                flex: 1,
                backgroundColor: 'black'
            }}
        >
            <SafeAreaView>
                <View style={styles.backgroundContainer}>
                    {content[current].isVideo && props.currentPage == props.index ?
                        <Video
                            key={`${props.index}${current}`}
                            source={{ uri: content[current].image }}
                            paused={false}
                            style={styles.image}
                            resizeMode={resizeMode}
                            onBuffer={(data) => {
                                if (data.isBuffering) progress.stopAnimation()
                                else startAnimation()
                            }}
                            onLoad={(data) => {
                                const { naturalSize } = data

                                if (naturalSize.width < width) {
                                    setResizeMode("cover")
                                } else {
                                    setResizeMode("contain")
                                }
                                console.log("data.duration", data.duration);
                                start(data.duration * 1000)
                                setVideoDuration(data.duration * 1000)
                            }}
                        />
                        : <FastImage
                            onLoadEnd={() => start()}
                            source={{ uri: content[current].image }}
                            style={styles.image}
                            resizeMode={resizeMode}
                        />
                    }
                    {load && <View style={styles.spinnerContainer}>
                        <ActivityIndicator size="large" color={'white'} />
                    </View>}
                </View>
            </SafeAreaView>
            <View style={{ flexDirection: 'column', flex: 1, }}>
                <View style={styles.animationBarContainer}>
                    {content.map((index, key) => {
                        return (
                            <View key={key} style={styles.animationBackground}>
                                <Animated.View
                                    style={{
                                        flex: current == key ? progress : content[key].finish,
                                        height: 2,
                                        backgroundColor: 'white',
                                    }}
                                />
                            </View>
                        );
                    })}
                </View>
                <View style={styles.userContainer}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image style={styles.avatarImage}
                            source={{ uri: props.profileImage }}
                        />
                        <Text style={styles.avatarText}>{props.profileName}</Text>
                    </View>
                    <TouchableOpacity onPress={() => {
                        if (props.onClosePress) {
                            props.onClosePress();
                        }
                    }}>
                        <View style={styles.closeIconContainer}>
                            {props.customCloseComponent ?
                                props.customCloseComponent :
                                <Text style={{ color: 'white' }}>X</Text>
                            }
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.pressContainer}>
                    <TouchableWithoutFeedback
                        onPressIn={() => progress.stopAnimation()}
                        onLongPress={() => setPressed(true)}
                        onPressOut={() => {
                            setPressed(false);
                            startAnimation();
                        }}
                        onPress={() => {
                            if (!pressed && !load) {
                                previous()
                            }
                        }}
                    >
                        <View style={{ flex: 1 }} />
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPressIn={() => progress.stopAnimation()}
                        onLongPress={() => setPressed(true)}
                        onPressOut={() => {
                            setPressed(false);
                            startAnimation();
                        }}
                        onPress={() => {
                            if (!pressed && !load) {
                                next()
                            }
                        }}>
                        <View style={{ flex: 1 }} />
                    </TouchableWithoutFeedback>
                </View>
            </View>
            {content[current].onPress &&
                <TouchableOpacity activeOpacity={1}
                    onPress={onSwipeUp}
                    style={styles.swipeUpBtn}>
                    {props.customSwipeUpComponent ?
                        props.customSwipeUpComponent :
                        <>
                            <Text style={{ color: 'white', marginTop: 5 }}></Text>
                            <Text style={{ color: 'white', marginTop: 5 }}>{swipeText}</Text>
                        </>
                    }
                </TouchableOpacity>}
        </GestureRecognizer>
    )
}


export default StoryListItem;

StoryListItem.defaultProps = {
    duration: 10000
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    image: {
        width: width,
        height: height,
    },
    backgroundContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    spinnerContainer: {
        zIndex: -100,
        position: "absolute",
        justifyContent: 'center',
        backgroundColor: 'black',
        alignSelf: 'center',
        width: width,
        height: height,
    },
    animationBarContainer: {
        flexDirection: 'row',
        paddingTop: 10,
        paddingHorizontal: 10,
    },
    animationBackground: {
        height: 2,
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'rgba(117, 117, 117, 0.5)',
        marginHorizontal: 2,
    },
    userContainer: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
    },
    avatarImage: {
        height: 30,
        width: 30,
        borderRadius: 100
    },
    avatarText: {
        fontWeight: 'bold',
        color: 'white',
        paddingLeft: 10,
    },
    closeIconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        paddingHorizontal: 15,
    },
    pressContainer: {
        flex: 1,
        flexDirection: 'row'
    },
    swipeUpBtn: {
        position: 'absolute',
        right: 0,
        left: 0,
        alignItems: 'center',
        bottom: Platform.OS == 'ios' ? 20 : 50
    }
});
