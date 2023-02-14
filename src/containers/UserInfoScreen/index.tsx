import React, { useState } from "react";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Alert, ListViewBase, ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";
import Button from "../../library/components/Button";
import { LoginData } from "../../library/types/userInfo";
import { loginApi } from "../../library/apis/userApis";
import crashlytics from '@react-native-firebase/crashlytics';
import analytics from '@react-native-firebase/analytics';
import useTheme from "../../library/hooks/useTheme";

type Props = NativeStackScreenProps<any> & DrawerScreenProps<any>


const UserInfoScreen: React.FC<Props> = ({ navigation }) => {
    const [theme] = useTheme()

    const [userData, setUserData] = useState<LoginData>()
    const [data, setData] = useState(null)

    const handleLogin = (): void => {
        const apiData = {
            "email": "Tester.xyz008@yopmail.com",
            "password": "Test@1234",
            "device_type": "app"
        }
        loginApi<LoginData>(apiData).then(({ data }) => {
            setUserData(data.data)
            Alert.alert(data.message)
        }).catch((err) => {
            Alert.alert(err)
        })
    }

    async function onSignIn(user: any) {

        await analytics().logEvent('basket', {
            id: 3745092,
            item: 'mens grey t-shirt',
            description: ['round neck', 'long sleeved'],
            size: 'L',
        })
        return
        try {
            // crashlytics().crash()
            console.log("----------_____________-----------");
            crashlytics().log('User signed in.');
            // crashlytics().recordError(new Error("app just stareted crashing"));
            await Promise.all([
                crashlytics().setUserId(user.uid),
                crashlytics().setAttribute('credits', String(user.credits)),
                crashlytics().setAttributes({
                    role: 'admin',
                    followers: '13',
                    email: user.email,
                    username: user.username,
                }),
            ]);
            // const p = data.app.debug() //crash Here
        } catch (err: any) {
            console.log("error", err);

            crashlytics().recordError(err)
        }
    }

    return <SafeAreaView style={styles(theme).safeAreaView}>
        <ScrollView style={{ flex: 1, }}>

            <Button
                title="Login"
                // onPress={handleLogin}
                onPress={() =>
                    onSignIn({
                        uid: 'Aa0Bb1Cc2Dd3Ee4Ff5Gg6Hh7Ii8Jj9',
                        username: 'Joaquin Phoenix',
                        email: 'phoenix@example.com',
                        credits: 42,
                    })
                }
                containerStyle={styles(theme).buttonContainer}
                textStyle={styles(theme).buttonText}
            />
            <Text style={styles(theme).textUserData}>{JSON.stringify(userData)}</Text>

        </ScrollView>

    </SafeAreaView>
}

export default UserInfoScreen

