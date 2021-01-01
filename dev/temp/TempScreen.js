import React from 'react';
import {
  View, Text, StyleSheet,
} from 'react-native';

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const TempScreen = (props) => {
  const {} = props;
  return (
    <View style={style.container}>
      <Text>This is TempScreen screen!</Text>
    </View>
  );
};

TempScreen.propTypes = {

};

TempScreen.defaultProps = {

};

export default TempScreen;
