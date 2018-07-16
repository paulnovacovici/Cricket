import React from 'react';
import { Text, View} from 'react-native';


export default class HomeScreen extends React.Component {
  render() {
    const data = this.props.navigation.getParam('data');

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
      </View>
    );
  }
}
