import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React from 'react';
import { View } from 'react-native';
import {
  TouchableOpacity,
  Image,
  SafeAreaView,
  Platform,
  StyleSheet,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppConstants, Colors } from '../constants';
import useIsKeyboardShown from '../hooks/useIsKeyboardShown';
import useTheme from '../hooks/useTheme';
import { Theme } from '../types';
import DimensionsValue from '../utils/DimensionsValue';

const BottomBar = (Props: BottomTabBarProps) => {
  const isKeyboardShown = useIsKeyboardShown();

  const render = () => {
    if (Platform.OS === 'ios') {
      return <RenderBottomBar {...Props} />;
    }

    if (isKeyboardShown) return null;

    return <RenderBottomBar {...Props} />;
  };

  return render();
};

const RenderBottomBar = ({ state, navigation }: BottomTabBarProps) => {
  const [theme] = useTheme();
  const safeArea = useSafeAreaInsets();

  return (
    <View style={[styles(theme).viewContainer, { marginBottom: safeArea.bottom }]}>
      {AppConstants.MAIN_STACK.map((elem: any, index: number) => {
        const isFocused = state.index == index;
        return (
          <TouchableOpacity
            style={{
              flex: 1,
              alignItems: 'center',
            }}
            key={index}
            onPress={() =>
              elem.screenName && navigation.navigate(elem.screenName)
            }>
            <Image
              source={elem.image}
              style={[
                {
                  tintColor: isFocused ? Colors.GREEN : theme.BG_SECONDRY,
                },
                styles(theme).image,
              ]}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default BottomBar;

const styles = (theme: Theme) =>
  StyleSheet.create({
    viewContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    image: {
      width: DimensionsValue.VALUE_20,
      height: DimensionsValue.VALUE_20,
      marginTop: DimensionsValue.VALUE_20
    },
  });
