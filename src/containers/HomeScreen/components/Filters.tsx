import React, { useCallback, useState } from 'react';
import {
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  LayoutAnimation,
} from 'react-native';
import Button from '../../../library/components/Button';
import ImageButton from '../../../library/components/ImageButton';
import RangeSlider from '../../../library/components/RangeSlider';
import { Colors } from '../../../library/constants';
import useTheme from '../../../library/hooks/useTheme';
import images from '../../../library/resources/images';
import { Theme } from '../../../library/types';
import DimensionsValue from '../../../library/utils/DimensionsValue';
import GenderButton from './GenderButton';

type Props = {
  data?: any;
  handleCallBack: (data: any) => void;
};
const FiltersModal = ({ data, handleCallBack }: Props) => {
  const [theme] = useTheme();

  const [intereset, setInterest] = useState(0);
  const [values, setValues] = useState({ low: 40, high: 50 });
  const [ageRange, setAgeRange] = useState({ low: 18, high: 50 });


  const onPressClear = () => {
    setValues({ low: 40, high: 50 })
    setAgeRange({ low: 18, high: 50 });
    setInterest(0)
  }
  return (
    <View style={styles(theme).containerCardItem}>
      <View style={styles(theme).topContainer}>
        <View style={{ flex: 1 }} />
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={styles(theme).textFilters}>Filters</Text>
        </View>
        <ImageButton
          title="Clear"
          titleStyle={styles(theme).textClear}
          containerStyle={styles(theme).containerClear}
          onPress={onPressClear}
        />
      </View>

      <Text style={styles(theme).matchesTextCardItem}>Interested in</Text>

      <GenderButton setSelectItem={setInterest} selectedItem={intereset} />

      <View style={styles(theme).viewDistance}>
        <Text style={styles(theme).matchesTextCardItem}>Distance</Text>
        <Text style={styles(theme).matchesTextCardItem}>{values.low}</Text>
      </View>

      <RangeSlider
        min={0}
        max={150}
        setValues={(low, high) => setValues({ low, high })}
        values={values}
        rangeDisabled={true}
        step={5}
        theme={theme}
      />

      <View style={styles(theme).viewDistance}>
        <Text style={styles(theme).matchesTextCardItem}>Age</Text>
        <Text style={styles(theme).matchesTextCardItem}>{ageRange.low}-{ageRange.high}</Text>
      </View>

      <RangeSlider
        min={16}
        max={50}
        setValues={(low, high) => setAgeRange({ low, high })}
        values={ageRange}
        rangeDisabled={false}
        theme={theme}
      />

      <Button
        title="Continue"
        onPress={() => {
          handleCallBack({ range: 40, age: 20, interest: 'girl' });
        }}
        textStyle={styles(theme).textContinue}
        containerStyle={styles(theme).buttonContainer}
      />
    </View>
  );
};

export default FiltersModal;

const styles = (theme: Theme) =>
  StyleSheet.create({
    containerCardItem: {
      flex: 1,

      paddingHorizontal: DimensionsValue.VALUE_30,
    },
    topContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    textFilters: {
      color: theme.TXT_PRIMARY,
      fontWeight: '700',
      fontSize: DimensionsValue.VALUE_24,
    },
    textClear: {
      color: Colors.RED_LIGHT,
      fontWeight: '700',
      fontSize: DimensionsValue.VALUE_16,
    },
    containerClear: {
      flex: 1,
      alignItems: 'flex-end',
      justifyContent: 'center',
    },
    matchesTextCardItem: {
      marginTop: DimensionsValue.VALUE_30,
      color: theme.TXT_PRIMARY,
      fontWeight: '700',
      fontSize: DimensionsValue.VALUE_16,
    },
    viewDistance: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: DimensionsValue.VALUE_30,
    },
    buttonContainer: {
      marginTop: 'auto',
      marginBottom: DimensionsValue.VALUE_70,
      width: '100%',
      height: DimensionsValue.VALUE_57,
      borderRadius: DimensionsValue.VALUE_15,
      backgroundColor: Colors.RED_LIGHT,
    },
    textContinue: {
      fontSize: DimensionsValue.VALUE_16,
      fontWeight: '700',
      color: Colors.WHITE,
    },
  });
