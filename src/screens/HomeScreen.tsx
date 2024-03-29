import {useNavigation} from '@react-navigation/native';
import React, {FC, useState} from 'react';
import {StatusBar, StyleSheet, Text, View, useColorScheme} from 'react-native';

import ZoomView from '../components/ZoomView';

function HomeScreen() {
  const {navigate} = useNavigation();
  const isDarkMode = useColorScheme() === 'dark';
  const [state, setState] = useState<{
    zoom: number;
    barcodes: GoogleVisionBarcodesDetectedEvent['barcodes'];
  }>({zoom: 0, barcodes: []});

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#000' : '#fcf',
  };

  const barcodeRecognized = ({barcodes}: GoogleVisionBarcodesDetectedEvent) => {
    setState({...state, barcodes});
    barcodes.forEach(barcode => console.warn(barcode.data));
  };

  const renderBarcodes = () => <View>{state.barcodes.map(renderBarcode)}</View>;

  const renderBarcode: FC<Barcode> = ({bounds, data}) => (
    <React.Fragment key={data + bounds.origin.x}>
      <View
        style={{
          borderWidth: 2,
          borderRadius: 10,
          position: 'absolute',
          borderColor: '#F00',
          justifyContent: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          padding: 10,
          ...bounds.size,
          left: bounds.origin.x,
          top: bounds.origin.y,
        }}>
        <Text
          style={{
            color: '#F00',
            flex: 1,
            position: 'absolute',
            textAlign: 'center',
            backgroundColor: 'transparent',
          }}>
          {data}
        </Text>
      </View>
    </React.Fragment>
  );
  return (
    <View style={[backgroundStyle, {flex: 1}]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />

      <View style={[backgroundStyle, styles.container]}>
        <ZoomView
          onZoomProgress={progress => {
            setState({...state, zoom: progress});
          }}
          onZoomStart={() => {
            console.log('zoom start');
          }}
          onZoomEnd={() => {
            console.log('zoom end');
          }}>
          {/* <RNCamera zoom={state.zoom} style={{flex: 1}} captureAudio={false}>
            {renderBarcodes()}
          </RNCamera> */}
        </ZoomView>
      </View>
    </View>
  );
}

export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    // padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00f',
    flex: 1,
  },
});
