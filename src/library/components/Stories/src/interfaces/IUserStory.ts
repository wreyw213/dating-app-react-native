export interface IUserStory {
    id?:number,
    seen?: boolean;
    user_id?: number,
    user_image: string,
    user_name: string,
    stories?: IUserStoryItem[]
}

export interface IUserStoryItem {
    story_id: number,
    story_image: string,
    onPress?: any,
    swipeText?: string,
    is_video?: boolean,
    seen?: boolean
}
