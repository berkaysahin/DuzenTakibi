import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, TouchableOpacity, TextInput, Modal, Button, Input, Keyboard } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Colors from "../utils/Colors";
import firebase from 'firebase'
import * as Notifications from 'expo-notifications'
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default class TodoEkleScreen extends React.Component {
    backgroundColors = [Colors.black, Colors.blue, Colors.greyLight, Colors.themeRed, Colors.themeBrown, Colors.themeYellow, Colors.themeOrangeDark];

    state = {
        name: "",
        color: this.backgroundColors[0],
        showListVisible: false,
        
        datetime: new Date(),
        title:"Bildirim başlığı",
        body:"Bildirim içeriği",

        dtVisible: false,
    };

    handlePicker = (data) => {
        //data.setHours(data.getHours() + 3);
        this.setState({datetime:data});
        console.log(this.state.datetime);
        this.setState({
            dtVisible:false,
        });
    }

    showPicker = () => {
        this.setState({
            dtVisible:true,
        });
    }

    hidePicker = () => {
        this.setState({
            dtVisible:false,
        });
    }

    scheduleNotification = async () => {
        //this.state.datetime.setHours(this.state.datetime.getHours() + 3);
        // console.log("Log: " + 
        // this.state.datetime.getFullYear() + "-" + 
        //                 (this.state.datetime.getMonth() + 1) + "-" +
        //                 this.state.datetime.getDate() + " " + 
        //                 this.state.datetime.getHours() + ":" + 
        //                 this.state.datetime.getMinutes());

        

        this.setState({ showListVisible: !this.state.showListVisible });

        Notifications.scheduleNotificationAsync({
            content:{
                title:'Başlık',
                body:'İçerik',
            },
            trigger:{
                date: this.state.datetime,
            },
          });
      };

    addList = list => {
        this.addListFire({
            name: list.name,
            datetime: this.state.datetime.getFullYear() + "-" + 
                        (this.state.datetime.getMonth() + 1) + "-" +
                        this.state.datetime.getDate() + " " + 
                        this.state.datetime.getHours() + ":" + 
                        this.state.datetime.getMinutes(),

            color: list.color,
            todos: []
        });
    };

    addListFire(liste) {
        let db = firebase.firestore().collection("Users").doc(firebase.auth().currentUser.uid).collection("Listeler");
        db.add(liste);
    }

    toggleListModal() {
        this.setState({ showListVisible: !this.state.showListVisible });
    }

    createTodo = () => {
        

        const { name, datetime, color } = this.state;

        const list = { name, datetime, color };

        this.addList(list);
        this.scheduleNotification();

        this.setState({ name: "" });

        this.props.navigation.navigate("Ana");
    };

    renderColors() {
        return this.backgroundColors.map(color => {
            return (
                <TouchableOpacity
                    key={color}
                    style={[styles.colorSelect, { backgroundColor: color }]}
                    onPress={() => this.setState({ color })}
                />
            );
        });
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <View style={{ alignSelf: "stretch", marginHorizontal: 32 }}>
                    <Text style={styles.title}>Yeni Liste Oluştur</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Liste Adı?"
                        onChangeText={text => this.setState({ name: text })}
                    />

                    <View style={{flexDirection: "row", margin:20 }}>
                        <View style={styles.divider} />
                    </View>

                    <TouchableOpacity
                        style={[styles.dateTime, { backgroundColor: Colors.blue }]}
                        onPress={this.showPicker}
                    >
                        <Text style={{ color: Colors.white, fontWeight: "600" }}>Bitiş Zamanını Ayarla</Text>
                    </TouchableOpacity>

                    <View style={{flexDirection: "row", margin:20 }}>
                        <View style={styles.divider} />
                    </View>

                    <Text>Görev Rengini Seç:</Text>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 12 }}>
                        {this.renderColors()}
                    </View>

                    <View style={{flexDirection: "row", margin: 20 }}>
                        <View style={styles.divider} />
                    </View>
                    
                    <TouchableOpacity
                        style={[styles.create, { backgroundColor: this.state.color }]}
                        onPress={this.createTodo}
                    >
                        <Text style={{ color: Colors.white, fontWeight: "600" }}>Oluştur!</Text>
                    </TouchableOpacity>

                <DateTimePickerModal
                    isVisible={this.state.dtVisible}
                    mode="datetime"
                    locale="tr_TR"
                    minimumDate={Date.now}
                    onConfirm={this.handlePicker}
                    onCancel={this.hidePicker}
                />
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.themeOrange,
    },
    title: {
        fontSize: 28,
        fontWeight: "800",
        color: Colors.black,
        alignSelf: "center",
        marginBottom: 16
    },
    input: {
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: Colors.grey,
        borderRadius: 6,
        height: 50,
        marginTop: 8,
        paddingHorizontal: 16,
        fontSize: 18,
    },
    create: {
        height: 50,
        borderRadius: 6,
        alignItems: "center",
        justifyContent: "center"
    },
    dateTime: {
        height: 50,
        borderRadius: 6,
        alignItems: "center",
        justifyContent: "center"
    },
    colorSelect: {
        width: 30,
        height: 30,
        borderRadius: 4
    },
    divider:{
        height:1,
        flex:1,
        alignSelf:"center",
        backgroundColor: Colors.greyDark,
    },
});
