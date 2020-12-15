import React from 'react'
import { StyleSheet, Text, TextInput, View, Image, Button, TouchableOpacity, useWindowDimensions, Dimensions } from 'react-native';
import firebase from 'firebase'
import Colors from '../utils/Colors';
import { TouchableHighlight } from 'react-native-gesture-handler';

export default class HomeScreen extends React.Component {
    state = {
        email: "",
        displayName: ""
    };

    componentDidMount(){
        const { email, displayName } = firebase.auth().currentUser;
        this.setState({ email, displayName });
    }

    signOut = () => {
        firebase.auth().signOut();
    };

    render() {
        return (
            <View style={styles.container}>
                <Text>Hoş geldin {this.state.email}!</Text>
                <TouchableOpacity style={{ marginTop:32 }} onPress={this.signOut}>
                    <Text>Çıkış</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    }
  });