import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from "./Components/Home/Home"
import Second from './Components/Second/Second';
import { registerRootComponent } from 'expo'; 
import RootReducer from "./Reducers/RootReducer"
import { Provider } from "react-redux"
import { createStore } from "redux"

const store = createStore(RootReducer)


function App() {
  return (
    <Provider store={store}>
      <View>
        <Home />
      {/* <Second /> */}
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default registerRootComponent(App)
