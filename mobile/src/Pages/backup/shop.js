import React, { Component,PropTypes } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Alert,
  WebView,
  ScrollView
} from 'react-native';
var WEBVIEW_REF = 'weidian';
class ShopPage extends Component{
    static propTypes = {

    }
    constructor(props, context) {
      super(props, context);
    //   this._onForward = this._onForward.bind(this);
    //   this._onBack = this._onBack.bind(this);
    }
    render() {
      return (

              <WebView
                ref={WEBVIEW_REF}
                style={styles.webView}
                source={{uri: 'https://weidian.com/?userid=1222033042&ifr=shopdetail&wfr=c'}}

                javaScriptEnabled={true}
                domStorageEnabled={true}
                decelerationRate="normal"
              //   onNavigationStateChange={this.onNavigationStateChange}
              //   onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest}
                startInLoadingState={false}
                scalesPageToFit={true}
              />
      )
    }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  webView:{
      backgroundColor:'white',
      paddingTop:100
  }
});
module.exports = ShopPage;
