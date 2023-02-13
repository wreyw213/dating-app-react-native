import React from "react";
import { View, FlatList } from "react-native";
import StoryCircleListItem from "./StoryCircleListItem";

type Props = {
    data: any[] | null | undefined
    handleStoryItemPress: (item: any, index: number) => void
    unPressedBorderColor?: string
    pressedBorderColor?: string
    avatarSize?: number
    showText?: boolean
    textStyle: any,
    onPressCreateStory?:()=>void,
    renderExtraItem?:any
}

const StoryCircleListView = (props: Props) => {

    const {
        data,
        handleStoryItemPress,
        unPressedBorderColor,
        pressedBorderColor,
        avatarSize,
        showText,
        textStyle,
        onPressCreateStory,
        renderExtraItem
    } = props;

    return (
        <View>
            <FlatList
                keyExtractor={(item, index) => index.toString()}
                data={data}
                horizontal
                style={{ paddingLeft: 12 }}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                ListFooterComponent={<View style={{ flex: 1, width: 8 }} />}
                renderItem={({ item, index }) => (
                    <StoryCircleListItem
                        avatarSize={avatarSize}
                        handleStoryItemPress={() =>
                            handleStoryItemPress && handleStoryItemPress(item, index)
                        }
                        unPressedBorderColor={unPressedBorderColor}
                        pressedBorderColor={pressedBorderColor}
                        item={item}
                        onPressCreateStory={onPressCreateStory}
                        renderExtraItem={renderExtraItem}
                        showText={showText}
                        textStyle={textStyle}
                    />
                )}
            />
        </View>
    );

}

export default StoryCircleListView;
