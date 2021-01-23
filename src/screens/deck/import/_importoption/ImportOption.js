import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { useNavigationState } from '@react-navigation/native';
import { Button } from 'react-native-paper';
import Color from '../../../../config/Color';

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  butonContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    padding: 10,
  },
});

const ImportOption = (props) => {
  const { navigation, route } = props;
  const routes = useNavigationState((_state) => _state.routes);
  useEffect(() => console.log(routes), []);

  const renderImportButton = () => (
    <View style={style.butonContainer}>
      <Button color={Color.green2} mode="contained" onPress={() => navigation.navigate('menu')}>Import</Button>
    </View>
  );

  return (
    <View style={style.container}>
      <Text>ImportOption</Text>
      {renderImportButton()}
    </View>
  );
};

ImportOption.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

export default ImportOption;
