import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

import reducer, { restock } from './redux';
import HowlinMenuRedux from './redux-components/HowlinMenuRedux';

class HowlinRedux extends React.Component {
  componentWillMount() {
    const store = createStore(reducer, {}, applyMiddleware(logger));
    this.setState({
      store,
    });
  }
  render() {
    const { store } = this.state;
    return (
      <Provider store={store}>
        <div>
          <HowlinMenuRedux />
          <button
            type="button"
            style={{padding: 16, width: '100%'}}
            onClick={() => store.dispatch(restock())}
          >
            Restock!
          </button>
        </div>
      </Provider>
    );
  }
}

export default HowlinRedux;
