import React from 'react'
import { StyleSheet, Text, TextInput, View, Image, Button, TouchableOpacity, useWindowDimensions, Alert, Dimensions, LayoutAnimation, SafeAreaView } from 'react-native';
import firebase from 'firebase'
import Colors from '../utils/Colors';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';
// import CardView from 'react-native-cardview'

const windowWidth = Dimensions.get('window').width;

export default class ProfileScreen extends React.Component {
    state = {
        email: "",
        displayName: "",

        currentPassword: "",
        newPassword: "",

        workCount: "",
    };

    componentDidMount(){
        const { email, displayName } = firebase.auth().currentUser;
        this.setState({ email, displayName });
        this.workCount();
    }

    signOut = () => {
        firebase.auth().signOut();
    };


    reauthenticate = (currentPassword) => {
        var user = firebase.auth().currentUser;
        var cred = firebase.auth.EmailAuthProvider.credential(user.email, currentPassword);
        return user.reauthenticateWithCredential(cred);
      }

    onChangePasswordPress = () => {
        this.reauthenticate(this.state.currentPassword).then(() => {
          var user = firebase.auth().currentUser;
          user.updatePassword(this.state.newPassword).then(() => {
            Alert.alert("Şifreniz başarıyla değiştirildi.");
            this.setState({ currentPassword:"", newPassword:"" });
          }).catch((error) => { console.log(error.message); });
        }).catch((error) => { Alert.alert("Şu anki şifreniz yanlış."); });
      }

    workCount = async () => {
        firebase.firestore().collection("Users").doc(firebase.auth().currentUser.uid).collection("Listeler").onSnapshot(
            x => this.setState({ workCount: x.docs.length })
        )
    }

    render() {
        LayoutAnimation.easeInEaseOut();
        return (
            <SafeAreaView style={styles.container}>
                <View style={{margin:10}}></View>

                
                <View style={{ flexDirection:'row', alignItems:'center', top:20, justifyContent:'center' }}>
                    <MaterialIcons name="menu" size={32} color={Colors.white} style={{ left: 20, position:'absolute' }} onPress={() => this.props.navigation.openDrawer()} />
                    <Text style={styles.Baslik}>Düzen Takibi</Text>
                </View>

                <View style={{ alignItems: 'center', flexDirection:'column', justifyContent: 'space-evenly', marginTop:25, flex:1 }}>
                    <View style={ styles.backShadow }>
                        <Text style={{ fontSize:24 }}>Merhaba {firebase.auth().currentUser.displayName}</Text>
                        
                        <Text style={{ fontSize:18, margin:10 }}>
                            Mail Adresiniz: { firebase.auth() ? firebase.auth().currentUser.email : '' }
                        </Text>

                        <Text style={{ fontSize:18 }}>Şu andaki aktif iş sayısı: { this.state.workCount }</Text>
                    </View>

                    <View style={ styles.backShadow }>
                        <Text style={{ fontSize:22, marginTop:20, marginBottom:10 }}>Şifre Değiştir</Text>
                        <TextInput
                                placeholder="Şu Anki Şifre"
                                style={styles.input}
                                onChangeText={currentPassword => this.setState({ currentPassword })}
                                value={this.state.currentPassword}
                                secureTextEntry
                                autoCapitalize="none"
                            />

                        <TextInput
                                placeholder="Eski Şifre"
                                style={styles.input}
                                onChangeText={newPassword => this.setState({ newPassword })}
                                value={this.state.newPassword}
                                secureTextEntry
                                autoCapitalize="none"
                            />

                        <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={ this.onChangePasswordPress }
                            >
                                <Text style={{ fontSize: 20 }}>Güncelle</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
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
    input: {
        backgroundColor: Colors.white,
        fontSize: 14,
        height: 45,
        width: windowWidth * 0.9,
        borderRadius: 20,
        paddingLeft: 20,
        marginBottom:15
    },
    Baslik:{
        fontWeight:"300",
        color: Colors.greyLight,
        fontSize:38,
    },
    button: {
        alignItems: 'center',
        backgroundColor: Colors.greyDark,
        padding: 8,
        width: windowWidth * 0.9,
        borderRadius: 20,
        paddingLeft: 20,
    },
    backShadow: {
        borderColor: "transparent",
        shadowColor: '#FFFFFF', // "#ff7235"
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.3,
        shadowRadius: 3.84,

        elevation: 5,
        padding:25,

        // borderColor: "transparent", // Required to show shadows on Android for some reason !?!?
        // shadowColor: '#000',
        // shadowOffset: {
        //   width: 0,
        //   height: 2,
        // },
        // shadowOpacity: 0.3,
        // shadowRadius: 5,

        // elevation: 15,
    },
  });