import React from 'react'
import { StyleSheet, Text, TextInput, View, Image, Button, TouchableOpacity, useWindowDimensions, Dimensions, LayoutAnimation, FlatList } from 'react-native';
import firebase from 'firebase'
import { AntDesign } from '@expo/vector-icons';
import Colors from '../utils/Colors';
import { TouchableHighlight } from 'react-native-gesture-handler';

export default class HomeScreen extends React.Component {
    state = {
        email: "",
        displayName: "",
        user: {},
        listeler: [],
        loading: true,
        // let ref = firebase.firestore().collection("Kullanicilar").doc(this.state.uid).collection("listeler");
    };

    componentDidMount(){
        const { email, displayName, uid } = firebase.auth().currentUser;
        this.setState({ email, displayName, uid });
    }

    signOut = () => {
        firebase.auth().signOut();
    };

    

    render() {
        LayoutAnimation.easeInEaseOut();
        return (
            <View style={styles.container}>
                {/* <Text>Hoş geldin {this.state.email}!</Text>
                <TouchableOpacity style={{ marginTop:32 }} onPress={this.signOut}>
                    <Text>Çıkış</Text>
                </TouchableOpacity> */}

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
                </View>

                <View style={{height: 275, paddingLeft: 32}}>
                    {/* <FlatList
                    data = {tempData}
                    keyExtractor= {item => item.name}
                    renderItem={({item}) => (<View><Text>{item.name}</Text></View>)}
                    /> */}
                </View>
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