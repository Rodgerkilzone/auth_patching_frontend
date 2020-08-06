import React, { Component } from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { ThemeProvider } from '@material-ui/styles';
import theme from './theme';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './assets/scss/index.scss';
import Routes from './Routes';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux'
import { store, persistor } from './redux/store'
const browserHistory = createBrowserHistory();

export default class App extends Component {
  render() {
    return (
      <Provider store={store} >
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
      
            <Router history={browserHistory}>
   
           <Routes />
     </Router>
      
      </ThemeProvider>
     </PersistGate>
   </Provider>
  
    );
  }
}
