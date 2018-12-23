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

// ALL REDUCERS
import notifyReducer from "./reducers/notifyReducer.jsx";
import settingsReducer from "./reducers/settingsReducer.jsx";

// GOOGLE ADD firebase to your project
const firebaseConfig = {
  apiKey: "AIzaSyD0TCtP0q42XcXMPNluhwQR6hIM-MsyMqw",
  authDomain: "onlinebanking-b6543.firebaseapp.com",
  databaseURL: "https://onlinebanking-b6543.firebaseio.com",
  projectId: "onlinebanking-b6543",
  storageBucket: "onlinebanking-b6543.appspot.com",
  messagingSenderId: "590909358988"
};

// CONFIG react-redux-firebase
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

// ADD ENHANCERS (reactReduxFirebase) when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
  reduxFirestore(firebase) // <- needed if using firestore
)(createStore);

// COMBINE all the Reducers
const rootReducer =
  // All in State (Redux Tool)
  combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    notify: notifyReducer,
    settings: settingsReducer
  });

// BEFORE INIT: check for LS settings
if (localStorage.getItem("settings") === null) {
  // Default settings
  const defaultSettings = {
    disableBalanceOnAdd: true,
    disableBalanceOnEdit: false,
    allowRegistration: false
  };

  //SET to LS (ONLY String ALLOWED)
  localStorage.setItem("settings", JSON.stringify(defaultSettings));
}

// INIT State (String->Object)
const initialState = { settings: JSON.parse(localStorage.getItem("settings")) };

// CREATE the STORE (combinedReducers, [initState], [enhancers] )
const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  compose(
    reduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
