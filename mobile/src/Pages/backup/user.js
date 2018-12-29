'use strict';

import React, { Component,PropTypes } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Alert,
  WebView,
  Image,
  ListView,StatusBar
} from 'react-native';

//var openShare = require('react-native-open-share');

class User extends Component{
    _wechatLogin() {
        var _this = this;
        //openShare.wechatLogin();

        // if (!_this.wechatLogin) {
        //     _this.wechatLogin = DeviceEventEmitter.addListener(
        //         'managerCallback',
        //         (response) => {
        //             AlertIOS.alert(
        //                 'response',
        //                 JSON.stringify(response)
        //             );

        //             _this.wechatLogin.remove();
        //             delete _this.wechatLogin;
        //         }
        //     );
        // }
    }

    render(){
        return (
            <View></View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
module.exports = User;
