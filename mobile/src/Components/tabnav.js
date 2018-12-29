import React, { Component, PropTypes } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
var HomeScreen = require('../Pages/home');
var ControllerScreen = require('../Pages/controller');
import {TabNavigator, TabBarBottom} from 'react-navigation';
const TabNav = TabNavigator(
    {
        Home: {
            screen: HomeScreen,
            navigationOptions: ({ navigation }) => ({
                tabBarLabel: '首页',
            }),
        },
        // Controller: {
        //     screen: ControllerScreen,
        //     navigationOptions: ({ navigation }) => ({
        //         tabBarLabel: '遥控',
        //     }),
        // },
    },
    {
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
        swipeEnabled: true,
        animationEnabled: true,
        lazy: true,
        tabBarOptions: {
            inactiveTextColor:"#535353",
             activeTextColor:"#ea7059",
            style: { backgroundColor: '#ffffff', display:'none'},
            labelStyle: {
                fontSize: 10, // 文字大小
                bottom: 2
            },
        },
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor }) => {
                const { routeName } = navigation.state;
                let iconName;
                if (routeName === 'Home') {
                    iconName = `ios-home${focused ? '' : '-outline'}`;
                } else if (routeName === 'Controller') {
                    iconName = `ios-laptop${focused ? '' : '-outline'}`;
                }
                return <Ionicons name={iconName} size={25} color={tintColor} />;
            },
        }),

    }
);
module.exports = TabNav;