import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, TouchableOpacity, TextInput, Modal, Button, Input, Keyboard } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Colors from "../utils/Colors";
import firebase from 'firebase'
import * as Notifications from 'expo-notifications'
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default class EkleModal extends React.Component {
    backgroundColors = [Colors.black, Colors.blue, Colors.greyLight, Colors.themeRed, Colors.themeBrown, Colors.themeYellow, Colors.themeOrangeDark];

    state = {
        name: "",
        color: this.backgroundColors[0],
        showListVisible: false,
        
        time: new Date(),
        title:"Bildirim başlığı",
        body:"Bildirim içeriği",

        dtVisible: false,
    };

    handlePicker = (data) => {
        //data.setHours(data.getHours() + 3);
        this.setState({time:data});
        console.log(this.state.time);
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
        console.log("Log: " + 
        this.state.time.getFullYear() + " " + 
        (this.state.time.getMonth() + 1) + " " +
        this.state.time.getDate() + " " + 
        this.state.time.getHours() + " " + 
        this.state.time.getMinutes());

        Notifications.scheduleNotificationAsync({
            content:{
                title:'Başlık',
                body:'İçerik',
            },
            trigger:{
                //date: this.state.time,
                year: this.state.time.getFullYear(),
                month: this.state.time.getMonth() + 1,
                date: this.state.time.getDate(),
                hour: this.state.time.getHours(),
                minute: this.state.time.getMinutes(),
                seconds: 0,
            },
          });
      };


    onSubmit = text => {
        Keyboard.dismiss();
        const schedulingOptions = {
        time: new Date().getTime() + Number(text),
        };
        Notifications.scheduleLocalNotificationAsync(
            {
                title: this.state.title,
                body: this.state.body
            },
            schedulingOptions,
        );
    };

    

    addList = list => {
        this.addListFire({
            name: list.name,
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
        const { name, color } = this.state;

        const list = { name, color };

        this.addList(list);

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

                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 12 }}>
                        {this.renderColors()}
                    </View>

                    <TouchableOpacity
                        style={[styles.create, { backgroundColor: this.state.color }]}
                        onPress={this.createTodo}
                    >
                        <Text style={{ color: Colors.white, fontWeight: "600" }}>Oluştur!</Text>
                    </TouchableOpacity>

                    {/* <TextInput
                        style={styles.input}
                        placeholder="Süre"
                        onChangeText={text => this.setState({ time: text })}
                    /> */}
                    <View style={{margin:10}}></View>

                <Button onPress={this.scheduleNotification} title="Bildirim" />

                <View style={{margin:10}}></View>

                <Button title="Show Date Picker" onPress={ this.showPicker } />

                <View style={{margin:10}}></View>

                <DateTimePickerModal
                    isVisible={this.state.dtVisible}
                    mode="datetime"
                    locale="tr_TR"
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
        marginTop: 24,
        height: 50,
        borderRadius: 6,
        alignItems: "center",
        justifyContent: "center"
    },
    colorSelect: {
        width: 30,
        height: 30,
        borderRadius: 4
    }
});
