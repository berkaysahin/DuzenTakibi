import React, { useState, useEffect, Component } from 'react';
import { StyleSheet, Text, TextInput, View, Image, Button, TouchableOpacity, Modal, useWindowDimensions, ScrollView, Dimensions, LayoutAnimation, FlatList, SafeAreaView, ActivityIndicator } from 'react-native';
import firebase from 'firebase'
import { AntDesign } from '@expo/vector-icons';
import Colors from '../utils/Colors';
import { TouchableHighlight } from 'react-native-gesture-handler';
import FirebaseKmt from '../FirebaseKmt';
import Is from '../components/Is';
import { MaterialIcons } from '@expo/vector-icons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class HomeScreen extends React.Component {
    state = {
        email: "",
        displayName: "",
        user: {},
        listeler: [],
        loading: true,
        addTodoVisible: false,
    };

    componentDidMount(){
        console.disableYellowBox = true
        fb = new FirebaseKmt((error, user) => {
            if (error == "error") {
                return;
            }
            if (user) {
                const { email, displayName, uid } = firebase.auth().currentUser;
                this.setState({ email, displayName, uid });
                fb.listeyiGetir(listeler => {
                    this.setState({ listeler, user }, () => {
                        this.setState({ loading: false });
                    });
                });
    
                this.setState({ user });
            }
        });
    }

    componentWillUnmount() {
        fb.detach();
    }

    signOut = () => {
        firebase.auth().signOut();
    };

    renderList = list => {
        return <Is list={list} updateList={this.updateList} />;
    };

    updateList = list => {
        fb.updateList(list);
    };

    addList = list => {
        fb.addList({
            name: list.name,
            color: list.color,
            todos: []
        });
    };

    toggleAddTodoModal() {
        this.setState({ addTodoVisible: !this.state.addTodoVisible });
    }

    render() {
        if(this.state.loading){
            return(
                <View style={styles.container}>
                    <ActivityIndicator size="large"></ActivityIndicator>
                </View>
            );
        }

        LayoutAnimation.easeInEaseOut();
        return (
            <SafeAreaView style={styles.container}>
                <View style={{margin:10}}></View>
                <MaterialIcons name="menu" size={32} color={Colors.white} style={{left: 20, top:20}} onPress={() => this.props.navigation.openDrawer()} />

                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={styles.Baslik}>Düzen Takibi</Text>
                    <View style={{flexDirection: "row"}}>
                        <View style={styles.divider} />
                    </View>
                    <View style={{marginVertical: 2}}></View>
                    
                    <FlatList
                        data = {this.state.listeler}
                        keyExtractor= {item => item.id.toString()}
                        renderItem={({item}) => (<Is list={item} />)}
                        keyboardShouldPersistTaps="always"
                        horizontal={false}
                        showsHorizontalScrollIndicator={true}
                        style={{height:windowHeight*0.84}}
                        />
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
        backgroundColor: Colors.greyDark,
    },
    Baslik:{
        fontWeight:"300",
        color: Colors.greyLight,
        fontSize:38,
    },
    listeyeEkle:{
        borderWidth: 2,
        borderColor: Colors.greyLight,
        borderRadius: 4,
        padding: 16,
        alignItems:"center",
        justifyContent:"center",
    },
    listeyeEkleTxt:{
        color: Colors.greyLight,
        fontWeight: "600",
        fontSize: 14,
        marginTop: 8,
    }
  });