import HomeScreen from './HomeScreen';
import GameScreen from './GameScreen'
import React from 'react';
import { Keyboard, StyleSheet, Text, View, FlatList, TextInput, Button, TouchableHighlight, TouchableOpacity} from 'react-native';
import { List, ListItem} from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons'
import Swipeout from 'react-native-swipeout';
import { createStackNavigator } from 'react-navigation';

const RootStack = createStackNavigator({
  Home: {
    screen: HomeScreen,
    header: {visible: false},
    navigationOptions: {
      title: 'Home',
      header: null
    },
  },
  Game: GameScreen,
});

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}
