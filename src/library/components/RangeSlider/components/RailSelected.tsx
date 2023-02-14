import React, { memo } from 'react';
import {StyleSheet, View} from 'react-native';
import { Colors } from '../../../constants';

const RailSelected = () => {
  return (
    <View style={styles.root}/>
  );
};

export default memo(RailSelected);

const styles = StyleSheet.create({
  root: {
    height: 6,
    backgroundColor: Colors.RED_LIGHT,
    borderRadius: 6,
  },
});