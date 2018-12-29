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
class BeautyPage extends Component{
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
            <Text>beauty</Text>
          </ScrollView>
      )
    }
}

module.exports = BeautyPage;
