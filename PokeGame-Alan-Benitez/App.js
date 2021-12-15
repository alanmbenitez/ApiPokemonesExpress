import { Provider } from 'react-redux';
import React from 'react';
import Wrapper from './Wrapper';
import generateStore from './store';

const store = generateStore()
export default function App() {
       
  return(
    <Provider store={store}>
      <Wrapper/>
    </Provider>
  )
}
