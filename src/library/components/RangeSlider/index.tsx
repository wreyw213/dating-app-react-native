import React, {FC, useCallback, useState} from 'react';
import {View, Text, ScrollView, StyleProp, ViewProps, ViewStyle} from 'react-native';
import Slider from 'rn-range-slider';
import { Theme } from '../../types';
import Rail from './components/Rail';
import RailSelected from './components/RailSelected';
import Thumb from './components/Thumb';

type Props={
    min:number
    max:number
    style?:StyleProp<ViewStyle>
    setValues:(low:number,high:number) => void
    values:{
        low:number
        high:number
    },
    rangeDisabled?:boolean,
    step?:number,
    theme:Theme
}

const RangeSlider:FC<Props> = ({min,max,style,values,setValues,theme,rangeDisabled=false,step=1}) => {

  console.log("theme",theme);
  
  const renderThumb = useCallback(
    (name: 'high' | 'low') => <Thumb theme={theme} name={name} />,
    [theme],
  );
  const renderRail = useCallback(() => <Rail theme={theme}/>, []);
  const renderRailSelected = useCallback(() => <RailSelected />, []);

  const handleValueChange = useCallback((lowValue:number, highValue:number) => {
    setValues(lowValue,highValue)
  }, []);

  return (
        <Slider
          style={style}
          min={min}
          max={max}
          step={step}
          disableRange={rangeDisabled}
          floatingLabel={true}
          renderThumb={renderThumb}
          renderRail={renderRail}
          renderRailSelected={renderRailSelected}
          renderLabel={()=>null}
          renderNotch={() => null}
          onValueChanged={handleValueChange}
          low={values.low}
          high={values.high}
        />
  );
};

export default RangeSlider;