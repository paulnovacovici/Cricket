import React from 'react';
import StatusBar from './StatusBar'
import { Text, View, StyleSheet, TouchableHighlight} from 'react-native';


export default class GameScreen extends React.Component {
  constructor(props) {

    super(props);

    this.state = {
      scoreboard: {}
    }

    this.props.navigation.getParam('data').map(player =>
      this.state.scoreboard[player.name] = {20: 0, 19: 0, 18: 0, 17: 0, 16: 0, 15: 0, B: 0, score: 0}
    )

    this.history = [JSON.parse(JSON.stringify( this.state.scoreboard ))]
  }

  textColor = (clicks) => {
    if (clicks == 0) {
      return {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'black'
      }
    }
    else if (clicks == 1){
      return {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'green'
      }
    }
    else if (clicks == 2) {
      return {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'yellow'
      }
    }
    else {
      return {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'red'
      }
    }
  }

  undoFunction = () => {
    if (this.history.length > 1){
      this.setState(prevState => {
        this.history.pop()
        return {scoreboard: JSON.parse(JSON.stringify(this.history[this.history.length-1]))}
      })
    }
  }

  scoreboardButton = (name, num) => {
    if (this.state.scoreboard[name][num] < 3) {
      this.setState(prevState => {
        prevState.scoreboard[name][num]++;
        this.history.push(JSON.parse(JSON.stringify(prevState.scoreboard)));
        return {scoreboard: prevState.scoreboard}
      })
    }
    else {
      // check other players if score is closed or not
      this.setState(prevState => {
        for (const [key, value] of Object.entries(this.state.scoreboard)) {
          if (key != name && value[num] != 3) {
                if (num == 'B') {
                  prevState.scoreboard[key]["score"] += 25;
                }
                else {
                  prevState.scoreboard[key]["score"] += num;
                }
          }
        }
        this.history.push(JSON.parse(JSON.stringify(prevState.scoreboard)));
        return {scoreboard: prevState.scoreboard}
      })
    }
  }



  render() {
    const data = this.props.navigation.getParam('data');

    buttonsListArr = data.map(player => {
      return (
      <View key={player.name} style={{flexDirection: 'column', flex: 1, backgroundColor: '#d8d8d8'}}>
        <View style={styles.playerContainer} >
          <Text adjustsFontSizeToFit allowFontScaling style={styles.playerText}>{player.name}</Text>
        </View>
        <TouchableHighlight style={{flex:1, justifyContent:'center'}} underlayColor='#dddddd' onPress={() => this.scoreboardButton(player.name,20) }>
            <View style={styles.gameboardButton}>
              <Text style={this.textColor(this.state.scoreboard[player.name][20])}>20</Text>
            </View>
        </TouchableHighlight>
        <TouchableHighlight style={{flex:1, justifyContent:'center'}} underlayColor='#dddddd' onPress={ () => this.scoreboardButton(player.name,19) }>
            <View style={styles.gameboardButton}>
              <Text style={this.textColor(this.state.scoreboard[player.name][19])}>19</Text>
            </View>
        </TouchableHighlight>
        <TouchableHighlight style={{flex:1, justifyContent:'center'}} underlayColor='#dddddd' onPress={ () => this.scoreboardButton(player.name,18) }>
            <View style={styles.gameboardButton}>
              <Text style={this.textColor(this.state.scoreboard[player.name][18])}>18</Text>
            </View>
        </TouchableHighlight>
        <TouchableHighlight style={{flex:1, justifyContent:'center'}} underlayColor='#dddddd' onPress={ () => this.scoreboardButton(player.name,17) }>
            <View style={styles.gameboardButton}>
              <Text style={this.textColor(this.state.scoreboard[player.name][17])}>17</Text>
            </View>
        </TouchableHighlight>
        <TouchableHighlight style={{flex:1, justifyContent:'center'}} underlayColor='#dddddd' onPress={ () => this.scoreboardButton(player.name,16) }>
            <View style={styles.gameboardButton}>
              <Text style={this.textColor(this.state.scoreboard[player.name][16])}>16</Text>
            </View>
        </TouchableHighlight>
        <TouchableHighlight style={{flex:1, justifyContent:'center'}} underlayColor='#dddddd' onPress={ () => this.scoreboardButton(player.name,15) }>
            <View style={styles.gameboardButton}>
              <Text style={this.textColor(this.state.scoreboard[player.name][15])}>15</Text>
            </View>
        </TouchableHighlight>
        <TouchableHighlight style={{flex:1, justifyContent:'center'}} underlayColor='#dddddd' onPress={ () => this.scoreboardButton(player.name,"B") }>
            <View style={styles.gameboardButton}>
              <Text style={this.textColor(this.state.scoreboard[player.name]["B"])}>B</Text>
            </View>
        </TouchableHighlight>
        <View
          style={{
            height: 1,
            width: "100%",
            backgroundColor: "black",
            marginLeft: "14%"
          }}
        />
        <View style={styles.scoreboard}>
          <Text> {this.state.scoreboard[player.name]["score"]} </Text>
        </View>
      </View>


    )});

    return (
      <View style={{flex: 1}}>
        <StatusBar />
        <View style={{ flexDirection: 'row', flex: 1}}>
          {buttonsListArr}
        </View>
        <View style={{flexDirection: 'row'}}>
          <TouchableHighlight style={{flex:1}} underLayColor='green' onPress={() => {this.undoFunction()}}>
            <View style={styles.undoButton}>
              <Text style={styles.undoText}> Undo </Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight style={{flex:1}} underLayColor='green' onPress={() => {this.props.navigation.navigate('Home')}}>
            <View style={styles.newGameButton}>
              <Text style={styles.newGameText}> New Game </Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  undoButton: {
    alignItems: 'center',
    backgroundColor: 'indianred'
  },
  undoText: {
    padding: 15,
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white'
  },
  newGameButton: {
    alignItems: 'center',
    backgroundColor: '#2196F3'
  },
  newGameText: {
    padding: 15,
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white'
  },
  playerContainer: {
    height: 70,
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'center'
  },
  playerText: {
    textAlign:"center",
    textAlignVertical:"center",
    color: 'black',
    fontWeight: 'bold',
    padding: 10
  },
  gameboardButton: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  gameboardText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black'
  },
  scoreboard: {
    flex: 1,
    alignItems: "center",
    justifyContent: 'center'
  }
});
