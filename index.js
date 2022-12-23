/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { store } from './src/library/redux/store';

const AppProvide = () => {
    return <Provider store={store}>
        <App />
    </Provider>
}
AppRegistry.registerComponent(appName, () => AppProvide);
