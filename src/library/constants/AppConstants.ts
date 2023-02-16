import images from "../resources/images";
import ScreenConstants from "./ScreenConstants";

export default {
  THEME_STORE: 'theme_store',
  TOKEN: 'token',

  MAIN_STACK: [
    {image: images.IC_FIND, screenName: ScreenConstants.HOME_SCREEN},
    {image: images.IC_CHAT, screenName: ScreenConstants.MESSAGES_SCREEN},
    {
      image: images.IC_HEART_SMALL,
      screenName: ScreenConstants.MATCHES_SCREEN,
    },
    {image: images.IC_PLAY_BUTTON, screenName: ScreenConstants.FEED_SCREEN},
  ],

  HITSLOP_SMALL: {
    top: 20,
    left: 10,
    bottom: 10,
    right: 10,
  },

  IOS_ADD_ID: 'ca-app-pub-3409347172641481/7254791990',

  ANDROID_ADD_ID: 'ca-app-pub-3409347172641481/8515902776',

  AD_TIME_OUT: __DEV__ ? 6000 : 60000, //time is in miliseconds, ads will show after 5*AD_TIME_OUT
};