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
import { ScreenConstants } from "../../library/constants";
import ItemMessage from "./components/ItemMessage";
import Activity from "./components/Activity";
import styles from "./styles";
import useTheme from "../../library/hooks/useTheme";
import TextInputField from "../../library/components/TextInputField";
import images from "../../library/resources/images";
import { Theme } from "../../library/types";
type Props = NativeStackScreenProps<any> & MaterialTopTabScreenProps<any>

const MessagesScreen: React.FC<Props> = ({ navigation }) => {

  const [theme] = useTheme();

  const [searchValue, setSearchValue] = useState('');

  return null


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
const Activities = ({ theme }: ActivitiesProps) => (
  <View style={styles(theme).viewHeader}>
    <Text style={styles(theme).textActivities}>Activities</Text>
    <FlatList
      data={[{ id: -1, name: 'You' }, ...Demo]}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item, index }) => (
        <Activity
          handlePressItem={() => console.log('rgejhgrhej')}
          item={item}
          onPressCreateStory={() => console.log('create story')}
        />
      )}
      contentContainerStyle={{ paddingLeft: DimensionsValue.VALUE_10 }}
    />
    <Text style={styles(theme).textMessages}>Messages</Text>
  </View>
);