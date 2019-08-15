import React from 'react';
import {StyleSheet, Text, View} from 'react-native';


class Home extends React.Component {
  render() {
    return (
      <View style={styles.box}>
        <Text style={styles.text}>Mobile Portfolio Coming Soon (:</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  box: {padding: 10},
  text: {fontWeight: 'bold'}
});


export default Home;