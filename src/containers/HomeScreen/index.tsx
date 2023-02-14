import React, { FC, useRef, useState } from 'react';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ImageBackground, View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import useTheme from '../../library/hooks/useTheme';
import styles from './styles';

type Props = NativeStackScreenProps<any> & DrawerScreenProps<any>;

import CardStack, { Card } from 'react-native-card-stack-swiper';
import CardItem from './components/CardItem';
import Demo from './assets/data/demo.js';
import Header from '../../library/components/Header';
import images from '../../library/resources/images';

const Home: FC<Props> = ({ navigation }) => {
  const [theme] = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  let swiper: any = useRef(null);

  return null


  return (
    <View style={styles(theme).containerHome}>
      <Header
        title="Discover"
        rightIcon={images.IC_FILTER}
        titleStyle={{ fontWeight: '600' }}
        showRightIcon={true}
        rightIconStyle={styles(theme).imageHeaderProfile}
      />
      {/* @ts-ignore */}
      <CardStack
        loop={true}
        verticalSwipe={true}
        disableBottomSwipe={true}
        renderNoMoreCards={() => null}
        onSwiped={index => {
          console.log('index', index);
          setCurrentIndex(index + 1);
        }}
        onSwipedRight={index => {
          console.log('onSwipedRight Like', index);
          setCurrentIndex(index + 1);
        }}
        onSwipedLeft={index => {
          console.log('onSwipedLeft Dislike', index);
          setCurrentIndex(index + 1);
        }}
        ref={swiper}>
        {Demo.map((item, index) => (
          // @ts-ignore
          <Card key={index} >
            {/* @ts-ignore */}
            <CardItem
              image={item.image}
              name={item.name}
              description={item.description}
              matches={item.match}
              actions={true}
              onPressSuperLike={() => {
                swiper.current?.swipeTop();
                setCurrentIndex(currentIndex + 1);
              }}
              onPressLeft={() => {
                swiper.current?.swipeLeft();
                setCurrentIndex(currentIndex + 1);
              }}
              onPressRight={() => {
                swiper.current?.swipeRight();
                setCurrentIndex(currentIndex + 1);
              }}
            />
          </Card>
        ))}
      </CardStack>
    </View>
  );
};

export default Home;
