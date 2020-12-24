import React from 'react'
import { StyleSheet, Text, TextInput, View, Image, Button, TouchableOpacity, useWindowDimensions, Dimensions, LayoutAnimation, SafeAreaView } from 'react-native';
import firebase from 'firebase'
import Colors from '../utils/Colors';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';

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
            <SafeAreaView style={styles.container}>
                <View style={{margin:10}}></View>
                <MaterialIcons name="menu" size={32} color={Colors.white} style={{left: 20, top:20}} onPress={() => this.props.navigation.openDrawer()} />

                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                    
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.themeOrange,
    },
    divider:{
        height:1,
        flex:1,
        alignSelf:"center",
        backgroundColor: Colors.black,
    },
  });