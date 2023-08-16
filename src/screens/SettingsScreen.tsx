import React, {FC, useState} from 'react';
import {GoogleVisionBarcodesDetectedEvent, RNCamera} from 'react-native-camera';
import {StatusBar, StyleSheet, Text, useColorScheme, View} from 'react-native';
import ZoomView from '../components/ZoomView';
import {Barcode} from 'react-native-camera';
import QRCodeStyled from 'react-native-qrcode-styled';

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
