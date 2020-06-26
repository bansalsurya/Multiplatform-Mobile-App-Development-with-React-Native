import React, { Component } from 'react';
import Main from './components/MainComponent';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';

class App extends Component {
  render() {
    const store = ConfigureStore();
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    );
  }
}
export default App;
