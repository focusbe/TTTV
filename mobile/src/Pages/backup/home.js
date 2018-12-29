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
import ScrollableTabView, {
    DefaultTabBar,
} from 'react-native-scrollable-tab-view';
import DietPage from './diet';
import BeautyPage from './beauty';
import ShopPage from './shop';
import UserPage from './user';
import CustomTabBar from './custombar';
class Home extends Component{
    constructor(props) {
        super(props);
    }
    pushDetails(url){
        this.props.navigator.push({
          component: contentView,
          passProps: {url:url},
          navigationBarHidden:true
        });
    }
    render(){
        return(
            <ScrollableTabView
            style={styles.container}
            renderTabBar={()=><CustomTabBar inactiveTextColor="#535353" activeTextColor="#ea7059" icons={['ios-cafe','ios-body','ios-cart','ios-contact']} backgroundColor='rgba(255, 255, 255, 0.7)' />}
            tabBarPosition='bottom'
            >
                <DietPage navigator = {this.props.navigator} tabLabel="Diet"/>
                <BeautyPage navigator = {this.props.navigator} tabLabel="Beauty"/>
                <ShopPage navigator = {this.props.navigator} tabLabel="Shop"/>
                <UserPage navigator = {this.props.navigator} tabLabel="User"/>
            </ScrollableTabView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        paddingTop:0
    }
});
module.exports = Home;
