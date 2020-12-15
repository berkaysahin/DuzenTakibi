import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import firebase from 'firebase'

class LoadingScreen extends React.Component {
    componentDidMount() {
        this.checkIfLoggedIn();
    }

    checkIfLoggedIn = () => {
        firebase.auth().onAuthStateChanged(
            function (user) {
                if (user) {
                    this.props.navigation.navigate('App');
                } else {
                    this.props.navigation.navigate('Auth');
                }
            }.bind(this)
        );
    };

    render() {
        return (
            <View style={styles.container}>
                <Text>Yükleniyor...</Text>
                <ActivityIndicator size="large" />
            </View>
        );
    }
}

export default LoadingScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    }
  });