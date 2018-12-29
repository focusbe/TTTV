/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component, PropTypes } from 'react';
import { AppRegistry, View, Text, Button } from 'react-native';
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';


const TabNav = require('./src/Components/tabnav');
//const TabNav = require('./src/Pages/controller');
const RootStack = StackNavigator(
    {
        Tab: {
            screen: TabNav,
            navigationOptions:{
                title:'主页',
                header:null
            }
        }
    },
    {
        initialRouteName: 'Tab',
        initialRouteParams:{
            headerMode:'none'
        },
        headerMode: 'float'
    }
);
export default class APP extends Component {
    render() {
        return (
            <RootStack />
            // <View>
            //     <Text >text</Text>
            // </View>
        );
    }
}
AppRegistry.registerComponent('TTTV', () => APP);
