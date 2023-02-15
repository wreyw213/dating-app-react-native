import React from 'react';
import { Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import useTheme from '../../../library/hooks/useTheme';
import images from '../../../library/resources/images';
import { Theme } from '../../../library/types';
import DimensionsValue from '../../../library/utils/DimensionsValue';
import styles from './styles';

type Props = {
  actions: boolean
  description: any
  image: any
  matches: any
  name: any
  onPressLeft: any
  onPressRight: any
  status: any
  variant: any,
  onPressSuperLike: () => void
}
const CardItem = ({
  actions,
  description,
  image,
  matches,
  name,
  onPressLeft,
  onPressRight,
  status,
  variant,
  onPressSuperLike
}: Props) => {
  const [theme] = useTheme();

  const fullWidth = Dimensions.get('window').width;
  const imageStyle = [
    {
      borderRadius: 8,
      width: variant ? fullWidth / 2 - 30 : fullWidth - 80,
      height: variant ? DimensionsValue.VALUE_168 : DimensionsValue.VALUE_350,
      margin: variant ? 0 : 20
    }
  ];

  const nameStyle = [
    {
      paddingTop: variant ? 10 : 15,
      paddingBottom: variant ? 5 : 7,
      color: theme.TXT_SECONDARY,
      fontSize: variant ? 15 : 30
    }
  ];

  return (
    <View style={styles(theme).containerCardItem}>
      {/* IMAGE */}
      <Image source={image} style={imageStyle} />

      {/* MATCHES */}
      {matches && (
        <View style={styles(theme).matchesCardItem}>
          <Image style={styles(theme).imageActions} source={images.IC_HEART} />
          <Text style={styles(theme).matchesTextCardItem}>
            {' '} {matches}% Match!
          </Text>
        </View>
      )}

      {/* NAME */}
      <Text style={nameStyle}>{name}</Text>

      {/* DESCRIPTION */}
      {description && (
        <Text numberOfLines={2} style={styles(theme).descriptionCardItem}>{description}</Text>
      )}

      {/* ACTIONS */}
      {actions && (
        <View style={styles(theme).actionsCardItem}>
          <TouchableOpacity style={styles(theme).miniButton} onPress={() => onPressSuperLike()}>
            <Image style={styles(theme).imageActions} source={images.IC_STAR} />
          </TouchableOpacity>

          <TouchableOpacity style={styles(theme).button} onPress={() => onPressLeft()}>
            <Image style={styles(theme).imageActions} source={images.IC_HEART} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles(theme).button}
            onPress={() => onPressRight()}>
            <Image style={[styles(theme).imageActions, styles(theme).imageDisLike]} source={images.IC_PLUS} />
          </TouchableOpacity>

          <TouchableOpacity style={styles(theme).miniButton}>
            <Image style={styles(theme).imageActions} source={images.IC_FLESH} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default CardItem;



