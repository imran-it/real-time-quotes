import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { MainState } from "./src/context/MainState";
import Quotes from "./src/components/Quotes";
import NavBar from "./src/components/NavBar";
import Constants from "expo-constants";

export default function App() {
  function MyStatusBar({ backgroundColor, ...props }) {
    return (
      <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
      </View>
    );
  }

  return (
    <MainState>
      <MyStatusBar
        backgroundColor={Platform.OS === 'ios' ? '#fff' : 'grey'}
        barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
      />
      <NavBar title='Real time quotes'/>
      <Quotes/>
    </MainState>
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
