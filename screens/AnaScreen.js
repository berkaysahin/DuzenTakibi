import React, { useState, useEffect, Component } from 'react';
import { StyleSheet, Text, TextInput, View, Image, Button, TouchableOpacity, useWindowDimensions, ScrollView, Dimensions, LayoutAnimation, FlatList, SafeAreaView, ActivityIndicator } from 'react-native';
import firebase from 'firebase'
import { AntDesign } from '@expo/vector-icons';
import Colors from '../utils/Colors';
import { TouchableHighlight } from 'react-native-gesture-handler';
import FirebaseKmt from '../FirebaseKmt';
import Is from '../components/Is';

const windowWidth = Dimensions.get('window').width;

export default class HomeScreen extends React.Component {
    state = {
        email: "",
        displayName: "",
        user: {},
        listeler: [],
        loading: true,
    };


    componentDidMount(){
        const { email, displayName, uid } = firebase.auth().currentUser;
        this.setState({ email, displayName, uid });
        
        fb = new FirebaseKmt((error, user) => {
            if (error) {
                return alert("Hata!");
            }
            
            fb.listeyiGetir(listeler => {
                this.setState({ listeler, user }, () => {
                    this.setState({ loading: false });
                });
            });

            this.setState({ user });
        });
    }

    signOut = () => {
        firebase.auth().signOut();
    };

    listeyiYenile = list => {
        firebase.listeyiYenile(list);
    };

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
                <Text>Hoş geldin {this.state.email}!</Text>

                <View style={{margin:10, alignItems: "center", justifyContent:'center', flexDirection:'row'}}>
                    <Button title="Çıkış" onPress={() => this.signOut} />
                    <View style={{marginRight:10}}></View>
                    <Button title="Drawer Menü" onPress={() => this.props.navigation.openDrawer()} />
                </View>
                
                <View style={{margin:10}}></View>
                

                <Text style={styles.Baslik}>Düzen Takibi</Text>
                <View style={{flexDirection: "row"}}>
                    <View style={styles.divider} />
                </View>
                <View style={{marginVertical: 20}}>
                    <TouchableOpacity style={styles.listeyeEkle}>
                        <AntDesign name="plus" size={16} color={Colors.white}/>
                    </TouchableOpacity>
                    <Text style={styles.listeyeEkleTxt}> Listeye Ekle</Text>
                </View>
                <ScrollView>
                <FlatList
                    data = {this.state.listeler}
                    keyExtractor= {item => item.id.toString()}
                    renderItem={({item}) => (<Is list={item} />)}
                    keyboardShouldPersistTaps="always"
                    horizontal={false}
                    showsHorizontalScrollIndicator={true}
                    />
                </ScrollView>
            </SafeAreaView>
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