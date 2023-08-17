import React, {} from 'react';
import {StyleSheet, Text, View} from 'react-native';

function SettingsScreen() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
    </View>
  );
}

export default SettingsScreen;
const styles = StyleSheet.create({
  container: {
    // padding: 20,
    backgroundColor: '#00f',
    flex: 1,
  },
  svg: {
    backgroundColor: 'white',
    borderRadius: 16,
    overflow: 'hidden',
  },
});
