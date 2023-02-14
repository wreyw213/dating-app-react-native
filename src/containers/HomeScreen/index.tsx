import React, {FC, useCallback, useMemo, useRef, useState} from 'react';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import { View} from 'react-native';
import CardStack, {Card} from 'react-native-card-stack-swiper';
import { useDispatch } from 'react-redux';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {BottomSheetModalMethods} from '@gorhom/bottom-sheet/lib/typescript/types';

import CardItem from './components/CardItem';
import Demo from './assets/data/demo.js';
import Header from '../../library/components/Header';
import images from '../../library/resources/images';
import FiltersModal from './components/Filters';
import DimensionsValue from '../../library/utils/DimensionsValue';
import useTheme from '../../library/hooks/useTheme';
import styles from './styles';
import { Text } from 'react-native';
import { Colors } from '../../library/constants';
import BottomSheetHandlerComponent from './components/BottomSheetHandlerComponent';

type Props = NativeStackScreenProps<any> & DrawerScreenProps<any>;

const Home: FC<Props> = ({navigation}) => {
  const [theme] = useTheme();
  const dispatch = useDispatch();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisiable, setIsVisiable] = useState(false);
  let swiper: any = useRef(null);

  const bottomSheetModalRef = useRef<BottomSheetModalMethods>(null);

  // variables
  const snapPoints = useMemo(() => ['60%', '75%'], []);

  const handleSheetChanges = useCallback((index: number) => {
    setIsVisiable(index == -1 ? false : true);
  }, []);

  const handlePresentModalPress = useCallback(() => {
   if (!isVisiable) {
     bottomSheetModalRef.current?.present()
   } else {
    handleCloseModalPress()
   }
  }, [isVisiable]);

  const handleCloseModalPress = useCallback(() => {
    bottomSheetModalRef.current?.forceClose();
  }, [isVisiable]);

  return (
    <View style={styles(theme).containerHome}>
      <Header
        title="Discover"
        rightIcon={images.IC_FILTER}
        titleStyle={{fontWeight: '600'}}
        showRightIcon={true}
        tapOnRightIcon={handlePresentModalPress}
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
          <Card key={index}>
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

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        $modal={true}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        enableHandlePanningGesture={true}
        enableContentPanningGesture={true}
        handleStyle={{
          borderRadius: 100,
        }}
        handleComponent={() => <BottomSheetHandlerComponent theme={theme} />}
        backgroundStyle={{
          backgroundColor:Colors.TRANSPARENT,
        }}>
        <FiltersModal
          handleCallBack={(data: any) => {
            handleCloseModalPress();
          }}
        />
      </BottomSheetModal>
    </View>
  );
};

export default Home;
