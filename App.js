import React from 'react';
import { Keyboard, StyleSheet, Text, View, FlatList, TextInput, Button, TouchableHighlight, TouchableOpacity} from 'react-native';
import { List, ListItem} from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons'

export default class App extends React.Component {
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
    if (this.state.data.length >= 4) return null;

    return (
      <View style={{flexDirection:'row', flex: 1}}>
        <TextInput
            style={styles.footer}
            placeholder={this.state.placeholder}
            value={this.state.inputText}
            onChangeText = {(text) => this.setState({inputText:text})}
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
              renderItem = {({item},index) => (
                  <ListItem
                    title={item.name}
                    titleStyle={styles.itemStyle}
                    rightIcon={
                      <View>
                        <TouchableHighlight
                          underlayColor='gray'
                          onPress={ () => {

                          } }
                        >
                          <Ionicons
                              style={{marginRight:"5%"}}
                              name='ios-close'
                              size={50}
                              color='red'/>
                        </TouchableHighlight>
                      </View>
                    }
                    />
                )}
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
              onPress={ () => {}}
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
