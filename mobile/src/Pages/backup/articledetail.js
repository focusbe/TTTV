import React, { Component,PropTypes } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Alert,
  WebView,
  StatusBar
} from 'react-native';

var WEBVIEW_REF = 'webview';
class articleDetail extends Component{
    static propTypes = {
      url: PropTypes.string.isRequired,
      navigator: PropTypes.object.isRequired,
    }
    constructor(props, context) {
      super(props, context);
    //   this._onForward = this._onForward.bind(this);
    //   this._onBack = this._onBack.bind(this);
    }
    _onBack(){
        //this.props.navigator.pop();
    }
    _onForward() {
    //   this.props.navigator.push({
    //       component: Home,
    //     title: 'Scene ',
    //   });
    }

    render() {

      return (
            <View style={{width:'100%',height:'100%'}}>
                <StatusBar
                  translucent={true}
                  barStyle={'dark-content'}
                />
                <WebView
                  ref={WEBVIEW_REF}
                  style={styles.webView}
                  source={{uri: this.props.url}}

                  javaScriptEnabled={true}
                  domStorageEnabled={true}
                  decelerationRate="normal"
                //   onNavigationStateChange={this.onNavigationStateChange}
                //   onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest}
                  startInLoadingState={false}
                  scalesPageToFit={true}
                />
            </View>

      )
    }

    onNavigationStateChange = (navState) => {
        // this.setState({
        //   backButtonEnabled: navState.canGoBack,
        //   forwardButtonEnabled: navState.canGoForward,
        //   url: navState.url,
        //   status: navState.title,
        //   loading: navState.loading,
        //   scalesPageToFit: true
        // });
  };
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
module.exports = articleDetail;
