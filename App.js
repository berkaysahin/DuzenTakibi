import React from 'react';
import AppContainer from './routes';

import * as firebase from 'firebase';
import { firebaseConfig } from './config';

firebase.initializeApp(firebaseConfig);

export default function App() {
  return <AppContainer />;
}