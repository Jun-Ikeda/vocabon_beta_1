import React, { useState, useEffect } from 'react';
import {
  Text, View, StyleSheet, Button, Alert, Linking,
} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function DemoBarCodeScanner() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  if (hasPermission === false) {
    Alert.alert(
      'No Notification Permission',
      'please goto setting and on notification permission manual',
      [
        { text: 'cancel', onPress: () => console.log('cancel') },
        { text: 'Allow', onPress: () => Linking.openURL('app-settings:') },
      ],
      { cancelable: false },
    );
    return;
  }
  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && <Button title="Tap to Scan Again" onPress={() => setScanned(false)} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});
