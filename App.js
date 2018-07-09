import React from 'react';
import { StyleSheet, Text, View, FlatList} from 'react-native';
import { List, ListItem} from 'react-native-elements';


Testing = (props) => {
  return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
      </View>
    );
}

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [{name:"Paul Novacovici"}, {name:"Jason Novacovici"}],
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

  render() {
    return (
      <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
        <FlatList
          data = {this.state.data}
          renderItem = {({item}) => (
              <ListItem
                title={item.name}
                titleStyle={styles.itemStyle}
                hideChevron
                />
            )}
          ItemSeparatorComponent={this.renderSeparator}
          keyExtractor = {(item) => item.name}
          ListHeaderComponent={this.renderHeader}
        />
      </List>
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
  },
  itemStyle: {
    fontSize: 40,
  }
});
