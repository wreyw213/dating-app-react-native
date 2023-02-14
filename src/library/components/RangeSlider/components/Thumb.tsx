import React, {memo} from 'react';
import {View, StyleSheet} from 'react-native';
import { Colors } from '../../../constants';
import { Theme } from '../../../types';

const THUMB_RADIUS_LOW = 22;
const THUMB_RADIUS_HIGH = 22;

const Thumb = ({name,theme}:any) => {
  return (
    <View
      style={name === 'high' ? styles(theme).rootHigh : styles(theme).rootLow}
    />
  );
};

const styles =(theme:Theme)=> StyleSheet.create({
  rootLow: {
    width: THUMB_RADIUS_LOW * 2,
    height: THUMB_RADIUS_LOW * 2,
    borderRadius: THUMB_RADIUS_LOW,
    borderWidth: 4,
    borderColor: theme.BG_PRIMARY,
    backgroundColor: Colors.RED_LIGHT,
  },
  rootHigh: {
    width: THUMB_RADIUS_HIGH * 2,
    height: THUMB_RADIUS_HIGH * 2,
    borderRadius: THUMB_RADIUS_HIGH,
    borderWidth: 4,
    borderColor: theme.BG_PRIMARY,
    backgroundColor: Colors.RED_LIGHT,
  },
});

export default memo(Thumb);