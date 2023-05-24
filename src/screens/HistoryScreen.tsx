import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Card, Text} from 'react-native-paper';
import QRCodeStyled from 'react-native-qrcode-styled';

export default function HistoryScreen() {
  const card = (
    <Card mode="elevated" style={styles.card}>
      <QRCodeStyled
        data={'Simple QR Code'}
        style={styles.svg}
        padding={20}
        pieceSize={5}
        color={'#000'}
        //@ts-expect-error
        errorCorrectionLevel={'H'}
        innerEyesOptions={{
          borderRadius: 5,
          color: '#000',
        }}
        outerEyesOptions={{
          borderRadius: 12,
          color: '#ffa114',
        }}
        logo={{
          href: 'https://roomlelo.in/logo512.png',
          padding: 4,
          // scale: 0.8,
          // hidePieces: false,
          // ... any other svg Image props (x, y, preserveAspectRatio, opacity, ...etc)
        }}
      />
      <Text style={{textAlign: 'center'}}>Simple QR Code</Text>
    </Card>
  );
  return (
    <ScrollView style={styles.scrollContainer}>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}>
        {Array(12)
          .fill('')
          .map(d => card)}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },

  card: {
    backgroundColor: '#fff',
    width: '49%',
    overflow: 'hidden',
    marginVertical: 5,
    alignItems: 'center',
  },
  svg: {
    backgroundColor: 'white',
    borderRadius: 16,
    overflow: 'hidden',
  },
});
