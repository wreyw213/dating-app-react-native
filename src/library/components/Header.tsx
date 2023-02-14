import React, { FC, ReactElement } from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet, ImageSourcePropType, StyleProp, ViewStyle, ImageStyle as NativeImageStyle, TextStyle } from 'react-native';
import { Colors } from '../constants';
import { ImageStyle } from 'react-native-fast-image';
import DimensionsValue from '../utils/DimensionsValue';
import { Theme } from '../types';
import useTheme from '../hooks/useTheme';


type Props = {
  leftIcon?: ImageSourcePropType;
  tapOnLeftIcon?: () => void;
  tapOnRightIcon?: () => void;
  title?: string;
  rightIcon?: ImageSourcePropType;
  rightIconStyle?: StyleProp<ImageStyle> & StyleProp<NativeImageStyle>;
  leftIconStyle?: StyleProp<ImageStyle> & StyleProp<NativeImageStyle>;
  headerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  showRightIcon?: boolean | null;
  showUserProfileImage?: boolean;
  renderExtraItem?: () => ReactElement
};
const Header: FC<Props> = ({
  leftIcon,
  tapOnLeftIcon,
  title = null,
  rightIcon,
  tapOnRightIcon,
  rightIconStyle,
  leftIconStyle,
  headerStyle,
  titleStyle,
  showRightIcon = true,
  showUserProfileImage = false,
  renderExtraItem,
  ...titleProps
}) => {

  const [theme] = useTheme();

  return (
    <View style={[styles(theme).viewHeader, headerStyle]}>
      {leftIcon ? (
        <TouchableOpacity
          hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
          onPress={() => tapOnLeftIcon && tapOnLeftIcon()}
          style={{
            width: DimensionsValue.VALUE_50,
          }}>
          <Image source={leftIcon} style={leftIconStyle} />
        </TouchableOpacity>
      ) : null}

      {title ? (
        <Text {...titleProps} style={[styles(theme).textTitle, titleStyle]}>
          {title}
        </Text>
      ) : null}

      <TouchableOpacity
        hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
        onPress={() => tapOnRightIcon && tapOnRightIcon()}
        style={{ justifyContent: 'center' }}
      >
        {rightIcon ? <Image source={rightIcon} style={rightIconStyle} /> : null}
      </TouchableOpacity>
      {renderExtraItem ? renderExtraItem() : null}
    </View>
  );
};

export default Header

const styles = (theme: Theme) => StyleSheet.create({
  textTitle: {
    fontSize: DimensionsValue.VALUE_28,
    color: theme.TXT_PRIMARY,
    flex: 1,
  },
  viewHeader: {
    flexDirection: 'row',
    // height: DimensionsValue.VALUE_20,
    // alignItems: 'center',
    zIndex: 999,
    backgroundColor: Colors.TRANSPARENT,
    paddingHorizontal: DimensionsValue.VALUE_10,
    justifyContent: 'space-between',
  },
})