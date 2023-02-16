import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import useTimer from '../hooks/useTimer'
import { AppDispatch, RootState } from '../redux/store';
import { AppOpenAd, TestIds, InterstitialAd, AdEventType } from 'react-native-google-mobile-ads';
import { AppConstants } from '../constants';
import { Platform, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { updateAddState, updateLoadedState } from '../redux/addReducer';

const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : Platform.select({
  android: AppConstants.ANDROID_ADD_ID,
  ios: AppConstants.IOS_ADD_ID,
  default: AppConstants.ANDROID_ADD_ID
});

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing', 'sports', 'cricket', 'games'],
})


const AddMobComponent = () => {
    const {addMobData} = useSelector(state=>state) as RootState
    const [count,startCount,stopCount] = useTimer(AppConstants.AD_TIME_OUT);
    const dispatch = useDispatch() as AppDispatch;

  useEffect(() => {
    interstitial.load()

    const unsubscribe = interstitial.addAdEventListener(AdEventType.LOADED, () => {
      console.log("=====================>>>");


      if (typeof startCount == 'function') startCount();
      dispatch(updateLoadedState(true))
    });

    const unSubscribeErrAdd = interstitial.addAdEventListener(AdEventType.ERROR, (err) => {
      console.log("Error while Loading Error=>>>",err);
      setTimeout(()=>{
        interstitial.load();
      },120000)
    })

    const unSubscribeShowAdd = interstitial.addAdEventListener(AdEventType.OPENED, () => {
      console.log("add showing");
      if (typeof stopCount == 'function') stopCount()
      dispatch(updateAddState(true))
    })

    const unSubscribeHiddenAdd = interstitial.addAdEventListener(AdEventType.CLOSED, () => {
      console.log("add closing")
      dispatch(updateLoadedState(false))
      interstitial.load()
      dispatch(updateAddState(false))
      if (typeof startCount == 'function') startCount()
    })

    return () => {
      interstitial.removeAllListeners();
      if (typeof stopCount == 'function') stopCount()
    }

  }, [])

  useEffect(() => {
    console.log("addMobData.addLoaded", addMobData, count);

    if (addMobData.addLoaded) {
      console.log("count=>>>>>>>>", count)
      if (count == 1 && !addMobData.addShowing) {
        interstitial.show();
      }
    }


  }, [count])

  return null
}

export default AddMobComponent