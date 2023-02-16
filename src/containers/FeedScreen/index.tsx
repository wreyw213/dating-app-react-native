import React, {useCallback, useEffect, useRef, useState} from 'react';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  AppState,
  AppStateStatus,
  FlatList,
  LayoutChangeEvent,
  View,
} from 'react-native';
import FlatItem from './components/FlatItem';
import data from './utils/apidata.json';
import {cellHeight} from './utils/constants';
import {useIsFocused} from '@react-navigation/native';
import {useDrawerStatus} from '@react-navigation/drawer';
import {MaterialTopTabNavigationProp} from '@react-navigation/material-top-tabs';
import useTheme from '../../library/hooks/useTheme';
import {RootState} from '../../library/redux/store';
import {useSelector} from 'react-redux';

type Props = NativeStackScreenProps<any> &
  DrawerScreenProps<any> & {
    topTabNavigation?: MaterialTopTabNavigationProp<any>;
  };

let cellRefs: any = {};
let currentIndex = 0;

const FeedScreen: React.FC<Props> = ({navigation, topTabNavigation}) => {
  const isFoucused = useIsFocused();
  const [theme] = useTheme();
  const isDrawerOpen = useDrawerStatus() === 'open';
  
  const {addMobData} = useSelector(state => state) as RootState;
  const mobDataRef = useRef(addMobData.addShowing);
  const focusedRef = useRef(isFoucused);
  
  const flatListRef = useRef<FlatList>(null);
  const [heightOfView, setHeight] = useState(cellHeight);

  useEffect(() => {
    if (isDrawerOpen) {
      pauseCurrentItem();
    } else {
      playCurrentItem();
    }
  }, [isDrawerOpen]);

  useEffect(() => {

    /**
     * Ref of focused is used because in listeners we can't get updated 
     * state for sure. Ref store reference of value and can be accessed in listeners 
     * 
     */
    focusedRef.current = isFoucused;

    if (!isFoucused) return;

    mobDataRef.current = addMobData.addShowing;
    if (addMobData.addShowing) {
      pauseCurrentItem();
    } else {
      playCurrentItem();
    }
  }, [addMobData.addShowing, isFoucused]);

  useEffect(() => {
    let listerner: () => void;
    let listernerSwipeEnd: () => void;

    const appStateListener = AppState.addEventListener(
      'change',
      (state: AppStateStatus) => {
        if (state == 'active') {
          console.log('Active =>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
          playCurrentItem();
        } else {
          console.log('InActive =>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
          pauseCurrentItem();
        }
      },
    );

    const navigationListener = navigation.addListener('blur', () => {
      console.log('Blur =>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
      pauseCurrentItem();
    });

    const navigationFocusListener = navigation.addListener('focus', () => {
      console.log('focus=>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
      playCurrentItem();
    });

    if (topTabNavigation) {
      listerner = topTabNavigation.addListener('swipeStart', () => {
        pauseCurrentItem();
        console.log('swipeStart=>>>>>>>>>>>>>>>>');
      });

      listernerSwipeEnd = topTabNavigation.addListener('swipeEnd', () => {
        isFoucused && playCurrentItem();
        console.log('swipeEnd=>>>>>>>>>>>>>>>>');
      });
    }

    return () => {
      appStateListener.remove();
      navigationListener();
      if (listerner) listerner();
      if (listernerSwipeEnd) listernerSwipeEnd();
      navigationFocusListener();
    };
  }, []);

  const pauseCurrentItem = () => {
    const cell = cellRefs[currentIndex];
    if (cell) {
      cell.pause();
    }
  };
  const playCurrentItem = (() => {
    if (!focusedRef.current || mobDataRef.current == true) return;
    

    const cell = cellRefs[currentIndex];
    if (cell) {
      addMobData.addShowing ? cell.pause() : cell.play(false);
    }
  })

  const _renderItem = ({item, index}: any) => {
    return (
      <FlatItem
        theme={theme}
        key={index}
        index={index}
        ref={ref => {
          cellRefs[index] = ref;
        }}
        scrollToTop={scrollToTop}
        heightOfView={heightOfView}
        {...item}
      />
    );
  };

  const scrollToTop = () => {
    flatListRef.current?.scrollToIndex({index: 0, animated: false});
  };

  const onViewableItemsChanged = (props: any) => {
    const changed = props.changed;
    changed.forEach((item: any) => {
      const cell = cellRefs[item.key];
      if (cell) {
        if (item.isViewable) {
          cell.play(true);
          currentIndex = item.key;
        } else {
          cell.pause();
        }
      }
    });
  };
  const viewConfigRef = useRef({viewAreaCoveragePercentThreshold: 70});
  const onViewRef = useRef(onViewableItemsChanged);

  // const viewabilityConfigCallbackPairs = useRef([{ viewabilityConfig, onViewableItemsChanged }])

  return (
    <View style={{flex: 1}}>
      <FlatList
        ref={flatListRef}
        style={{flex: 1}}
        contentContainerStyle={{flexGrow: 1}}
        data={data.filter((item)=> item.media_type != 'image')}
        renderItem={_renderItem}
        keyExtractor={(item, index) => index.toString()}
        // viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
        initialNumToRender={3}
        maxToRenderPerBatch={3}
        windowSize={2}
        getItemLayout={(_data, index) => ({
          length: heightOfView,
          offset: heightOfView * index,
          index,
        })}
        onLayout={(e: LayoutChangeEvent) => {
          const {height} = e.nativeEvent.layout;
          setHeight(height);
        }}
        snapToInterval={heightOfView}
        snapToAlignment="start"
        decelerationRate={"fast"}
        removeClippedSubviews={true}
        pagingEnabled={true}
      />
    </View>
  );
};

export default FeedScreen;
