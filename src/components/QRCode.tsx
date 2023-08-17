import 'react-native-reanimated';

import {useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Camera, Frame, useCameraDevices, useFrameProcessor} from 'react-native-vision-camera';

const QRCodeScreen = () => {
  const cameraRef = useRef(null);
  const [scanning, setScanning] = useState(true);
  const [result, setResult] = useState<Frame>();
  const devices = useCameraDevices('wide-angle-camera');
  const device = devices.back;

  useEffect(() => {
    const requestPermission = async () => {
      const cameraPermission = await Camera.getCameraPermissionStatus();
      console.log(cameraPermission);

      const newCameraPermission = await Camera.requestCameraPermission();
      console.log(newCameraPermission);
    };
    requestPermission();
  }, []);

  const frameProcessor = useFrameProcessor(frame => {
    'worklet';
    if (!scanning) return;
    try {
      const qrCodeData = frame; //detectQrCode(frame);
      console.log(qrCodeData);
      setResult(qrCodeData);
      setScanning(false);
    } catch (error) {
      console.error(error);

      // Ignore errors and keep scanning
    }
  }, []);

  const startScanning = () => {
    setScanning(true);
    setResult(undefined);
  };

  if (device == null) return <></>;
  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        frameProcessor={frameProcessor}
        style={styles.camera}
        // style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        // type={Camera.Constants.Type.back}
        // ratio="16:9" // Adjust the ratio to match your camera's aspect ratio
      />
      <View style={styles.resultContainer}>
        {result ? (
          <View>
            <Text style={styles.resultText}>QR Code Result:</Text>
            <Text style={styles.resultValue}>{result.toString()}</Text>
            <TouchableOpacity style={styles.button} onPress={startScanning}>
              <Text style={styles.buttonText}>Scan Again</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Text style={styles.scanningText}>Scanning...</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  resultContainer: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 10,
    alignItems: 'center',
  },
  resultText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  resultValue: {
    fontSize: 16,
    marginBottom: 20,
  },
  scanningText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default QRCodeScreen;
