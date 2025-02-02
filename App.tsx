/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { Navigator } from './src/navigation/navigator';
import { Provider } from 'react-redux';
import { store } from './src/redux/store/store';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
}

export default App;
