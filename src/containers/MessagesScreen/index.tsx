import React, { useEffect, useState } from "react";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FlatList, Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import WebView from "react-native-webview";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { MaterialTopTabNavigationProp, MaterialTopTabScreenProps } from "@react-navigation/material-top-tabs";
import Header from "../../library/components/Header";
import Demo from '../HomeScreen/assets/data/demo.js';
import DimensionsValue from "../../library/utils/DimensionsValue";
import { AppConstants, ScreenConstants } from "../../library/constants";
import ItemMessage from "./components/ItemMessage";
import styles from "./styles";
import useTheme from "../../library/hooks/useTheme";
import TextInputField from "../../library/components/TextInputField";
import images from "../../library/resources/images";
import { Theme } from "../../library/types";
import InstaStory from "../../library/components/Stories";
import data from "../ProfileScreen/data";
type Props = NativeStackScreenProps<any> & MaterialTopTabScreenProps<any>

const MessagesScreen: React.FC<Props> = ({ navigation }) => {

  const [theme] = useTheme();

  const [searchValue, setSearchValue] = useState('');

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header
        title="Messages"
        titleStyle={{
          fontWeight: '600',
          marginHorizontal: DimensionsValue.VALUE_10,
        }}
      />
      <TextInputField
        containerStyle={{ minHeight: DimensionsValue.VALUE_46 }}
        value={searchValue}
        onChangeText={(value) => setSearchValue(value)}
        renderLeftIcon={() => (
          <Image source={images.IC_SEARCH} style={styles(theme).imageSearch} />
        )}
        placeholder={'Search'}

      />
      <FlatList
        data={Demo}
        ListHeaderComponent={<Activities theme={theme} />}
        renderItem={({ item, index }) => (
          <ItemMessage
            key={index}
            item={item}
            handlePressItem={(item: any) =>
              navigation.navigate(ScreenConstants.PROFILE_SCREEN)
            }
          />
        )}
      />
    </SafeAreaView>
  );
}

export default MessagesScreen

type ActivitiesProps = {
  theme: Theme
}
const Activities = ({theme}: ActivitiesProps) => (
  <View style={styles(theme).viewHeader}>
    <Text style={styles(theme).textActivities}>Activities</Text>
    
    <InstaStory
      data={[{id: -1,user_name:'You',seen:true,user_image:images.IC_USER}, ...data]}
      duration={10}
      avatarSize={DimensionsValue.VALUE_70}
      onStart={(item: any) => console.log(item)}
      onClose={(item: any) => console.log('close: ', item)}
      customSwipeUpComponent={
        <View>
          <Text>Swipe</Text>
        </View>
      }
      onPressCreateStory={() => console.log("onPressCreateStory")}
      avatarTextStyle={{fontWeight: '700', color: theme.TXT_PRIMARY}}
      style={styles(theme).viewInstaStory}
      renderExtraItem={() => <TouchableOpacity
        hitSlop={AppConstants.HITSLOP_SMALL}
        style={styles(theme).viewOverlay}>
        <Image
          style={styles(theme).imagePlus}
          source={images.IC_PLUS_LIGHT}
        />
      </TouchableOpacity>}
    />
    <Text style={styles(theme).textMessages}>Messages</Text>
  </View>
);