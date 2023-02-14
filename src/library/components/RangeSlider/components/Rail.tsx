import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Theme } from '../../../types';

const Rail = ({theme}:any) => {
  return (
    <View style={styles(theme).root}/>
  );
};

export default memo(Rail);

const styles = (theme: Theme) =>
  StyleSheet.create({
    root: {
      flex: 1,
      height: 6,
      borderRadius: 6,
      backgroundColor: `${theme.BG_SECONDRY}33`,
    },
  });