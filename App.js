import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';


import Main from './profile';
import Story from './profile/story';
export default function App() {
  return (


    <View >
      <Main />
      <Story />
    </View>

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
