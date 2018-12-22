// Full config on: https://github.com/trave84/react-redux-firebase

import { createStore, combineReducers, compose } from "redux";
import firebase from "firebase";
import "firebase/firestore";

import {
  reactReduxFirebase,
  firebaseReducer,
  reduxFirebase
} from "react-redux-firebase";
import { reduxFirestore, firestoreReducer } from "redux-firestore";

// Reducers

// Google add firebase to your project
const firebaseConfig = {
  apiKey: "AIzaSyD0TCtP0q42XcXMPNluhwQR6hIM-MsyMqw",
  authDomain: "onlinebanking-b6543.firebaseapp.com",
  databaseURL: "https://onlinebanking-b6543.firebaseio.com",
  projectId: "onlinebanking-b6543",
  storageBucket: "onlinebanking-b6543.appspot.com",
  messagingSenderId: "590909358988"
};

// react-redux-firebase config
const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
};

// INIT FireBase Instance
firebase.initializeApp(firebaseConfig);
// INIT FireStore
const firestore = firebase.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

// ADD reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
  reduxFirestore(firebase) // <- needed if using firestore
)(createStore);

// ADD firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer // <- needed if using firestore
});

// Initil State
const initialState = {};

// Create Store
const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  compose(
    reduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
