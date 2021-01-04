import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const Export = (props) => {
  const {} = props;
  return (
    <ScrollView horizontal pagingEnabled>
      <View />
      <View />
    </ScrollView>
  );
};

Export.propTypes = {

};

Export.defaultProps = {

};

export default Export;
