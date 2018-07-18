import React from 'react';
import { Keyboard, StyleSheet, Text, View, FlatList, TextInput, Button, TouchableHighlight, TouchableOpacity} from 'react-native';
import { List, ListItem} from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons'
import Swipeout from 'react-native-swipeout';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      inputText: '',
      placeholder: 'Add Team',
    };
  }

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%"
        }}
      />
    );
  };

  renderHeader = () => {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}> Players</Text>
      </View>
      )
  };

  renderFooter = () => {
    if (this.state.data.length >= 4)
    {
      return (
        <Text> Max Teams: 4 </Text>
      )
    };

    return (
      <View style={{flexDirection:'row', flex: 1}}>
        <TextInput
            style={styles.footer}
            placeholder={this.state.placeholder}
            value={this.state.inputText}
            onChangeText = {(text) => this.setState({inputText:text})}
            onSubmitEditing = { () => {
              this.state.data.push({name:this.state.inputText, score: 0})
              this.setState({data:this.state.data, inputText:''})
            }}
            clearTextOnFocus={true}
            returnKeyType='go'
        />
        <TouchableHighlight
          underlayColor='gray'
          onPress={ () => {
            this.state.data.push({name:this.state.inputText})
            this.setState({data:this.state.data, inputText:''}) // Update doesn't render if state is the same D:
          } }
        >
          <Ionicons
              style={{marginRight:"5%"}}
              name='ios-add-circle-outline'
              size={50}
              color='black'/>
        </TouchableHighlight>
      </View>
    );
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{flex:1}}>
          <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
            <FlatList
              data = {this.state.data}
              renderItem = {(rowData) => {
                let swipeBtns = [{
                  text: 'Delete',
                  type: 'delete',
                  backgroundColor: 'red',
                  onPress: () => {
                    this.state.data.splice(rowData.index,1)
                    this.setState({data:this.state.data})
                  }
                }];

                return (
                  <Swipeout right={swipeBtns}
                    autoClose={true}
                    backgroundColor= 'transparent'>
                    <ListItem
                      title={rowData.item.name}
                      titleStyle={styles.itemStyle}
                      />
                    </Swipeout>
                  )}}
              extraData = {this.state}
              ItemSeparatorComponent={this.renderSeparator}
              keyExtractor = {(item, index) => index.toString()}
              ListHeaderComponent={this.renderHeader}
              ListFooterComponent={this.renderFooter}
            />

          </List>
        </View>
        <View>
          <TouchableHighlight
              underlayColor='green'
              onPress={ () => {
                this.props.navigation.navigate('Game', {
                  data: this.state.data,
              })} }
            >
              <View style={styles.button}>
                <Text style={styles.buttonText}>Start</Text>
              </View>

          </TouchableHighlight>
        </View>
      </View>
      )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'black'
  },
  headerText: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    color: 'white',
    fontSize: 50,
    fontWeight: 'bold',
    padding: 10
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#2196F3'
  },
  itemStyle: {
    fontSize: 40,
    padding: 2,
  },
  buttonText: {
    padding: 20,
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white'
  },
  footer: {
    height: 40,
    color: 'black',
    marginLeft: '5%',
    fontSize: 40,
    flex:1,
  }
});
