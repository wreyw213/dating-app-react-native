import React, { FC } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  Text,
  TextInputProps,
} from 'react-native';
import useTheme from '../hooks/useTheme';
import { Theme } from '../types';
import DimensionsValue from '../utils/DimensionsValue';

interface Props extends TextInputProps {
  placeholder?: string;
  renderRightIcon?: any;
  renderLeftIcon?: any;
  containerStyle?: StyleProp<ViewStyle>;
  value: string;
  onChangeText: (text: string) => void;
  inputFieldStyle?: StyleProp<TextStyle>;
  title?: string
}

const TextInputField: FC<Props> = ({
  placeholder,
  renderLeftIcon,
  renderRightIcon,
  containerStyle,
  value,
  onChangeText,
  inputFieldStyle,
  ...Props
}) => {

  const [theme] = useTheme();

  return (
    <View style={[styles(theme).container, containerStyle]}>
      {renderLeftIcon ? renderLeftIcon() : null}
      <TextInput
        style={[styles(theme).input, inputFieldStyle]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={theme.TXT_PRIMARY}
        {...Props}
        keyboardAppearance={theme.type == 'dark' ? 'dark' : 'light'}
      />
      {renderRightIcon ? renderRightIcon() : null}
    </View>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: `${theme.BG_SECONDRY}33`,
      borderRadius: DimensionsValue.VALUE_12,
      paddingHorizontal: DimensionsValue.VALUE_10,
      marginVertical: DimensionsValue.VALUE_15,
      width: DimensionsValue.VALUE_330,
      alignSelf: 'center',
    },
    input: {
      flex: 1,
      paddingHorizontal: 10,
      fontSize: DimensionsValue.VALUE_16,
      color: theme.TXT_PRIMARY
    },
  });

export default TextInputField;
