import React from 'react'
import { StyleSheet, Text, TextInput, View, Image, Button, TouchableOpacity, useWindowDimensions, Dimensions, LayoutAnimation } from 'react-native';
import firebase from 'firebase'
import Colors from '../utils/Colors';
import { TouchableHighlight } from 'react-native-gesture-handler';

export default class ProfileScreen extends React.Component {
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
        LayoutAnimation.easeInEaseOut();
        return (
            <View style={styles.container}>
                <Text>Profil Ekranı</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.themeOrange,
      alignItems: 'center',
      justifyContent: 'center'
    },
    divider:{
        height:1,
        flex:1,
        alignSelf:"center",
        backgroundColor: Colors.black,
    },
  });