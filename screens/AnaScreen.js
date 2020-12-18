import React, { useState, useEffect, Component } from 'react';
import { StyleSheet, Text, TextInput, View, Image, Button, TouchableOpacity, useWindowDimensions, Dimensions, LayoutAnimation, FlatList, SafeAreaView } from 'react-native';
import firebase from 'firebase'
import { AntDesign } from '@expo/vector-icons';
import Colors from '../utils/Colors';
import { TouchableHighlight } from 'react-native-gesture-handler';
// import FirebaseKmt from '../FirebaseKmt'

export default class HomeScreen extends React.Component {
    state = {
        email: "",
        displayName: "",
        user: {},
        listeler: [],
        loading: true,
    };

    // useEffect(()=>{
        
    // }, []);


    componentDidMount(){
        const { email, displayName, uid } = firebase.auth().currentUser;
        this.setState({ email, displayName, uid });
        // fb = new FirebaseKmt(user => {

        // });

        // this.listeleriGetir(listeler => {
        //     this.state({listeler, user}, () =>{
        //         this.state({loading:false});
        //     });
        // });
        // this.setState({user});

        //this.listeleriGetir();

        // FirebaseKmt.listeyiGetir(listeler => {
        //         this.setState({listeler}, () => {
        //             this.setState({loading:false});
        //         });
        //     });
        //     console.log(this.state.listeler);
    }

    listeleriGetir(){
        firebase.firestore().collection("Users").doc(firebase.auth().currentUser.uid).collection("Listeler").onSnapshot(snap => {
            console.log("Total: ", snap.size); 
            snap.forEach(doc => {
                console.log(doc.id, doc.data());
                this.setState(state => {
                    state.listeler.push({id: doc.id, ...doc.data()});
                });
            });
        });
        // console.log("Girdi");
        // const tmp = [];
        // this.setState(state => {
        //     state.listeler.push(this.tmp);
        // });
        // console.log(this.state.listeler);
        // console.log("Cikti");
    }

    signOut = () => {
        firebase.auth().signOut();
    };

    render() {
        LayoutAnimation.easeInEaseOut();
        return (
            <SafeAreaView style={styles.container}>
                <Text>Hoş geldin {this.state.email}!</Text>
                <TouchableOpacity style={{ marginTop:32 }} onPress={this.signOut}>
                    <Text>Çıkış</Text>
                </TouchableOpacity>
                <Button title="asdsad"
                onPress={() => this.props.navigation.openDrawer()} />

                <Text style={styles.Baslik}>Düzen Takibi</Text>
                <View style={{flexDirection: "row"}}>
                    <View style={styles.divider} />
                </View>
                <View style={{marginVertical: 48}}>
                    <TouchableOpacity style={styles.listeyeEkle}>
                        <AntDesign name="plus" size={16} color={Colors.white}/>
                    </TouchableOpacity>
                    <Text style={styles.listeyeEkleTxt}> Listeye Ekle</Text>
                </View>

                <View>
                    <Text>
                        Kullanıcı: {this.state.uid}
                    </Text>
                    <TextInput defaultValue={this.state.uid}></TextInput>
                </View>
                <Button title="Çıkış" onPress={this.signOut} />

                <View style={{height: 275, paddingLeft: 32}}>
                    <FlatList
                    data = {this.state.listeler}
                    keyExtractor= {item => item.id.toString()}
                    renderItem={({item}) => (<View><Text>{item.name}</Text></View>)}
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