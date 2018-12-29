import React, { Component,PropTypes } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Alert,
  ScrollView
} from 'react-native';
class Controller extends Component{
    static propTypes = {

    }
    constructor(props, context) {
      super(props, context);
    //   this._onForward = this._onForward.bind(this);
    //   this._onBack = this._onBack.bind(this);
    }
    render() {
      return (
          <ScrollView>
            <Text>controller</Text>
          </ScrollView>
      )
    }
}

module.exports = Controller;
