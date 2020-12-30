import React from 'react'
import { StyleSheet, Text, TextInput, View, Image, Button, TouchableOpacity, useWindowDimensions, Dimensions } from 'react-native';
import firebase from 'firebase'
import Colors from '../utils/Colors';
import { TouchableHighlight } from 'react-native-gesture-handler';
import {Ionicons} from '@expo/vector-icons'

const windowWidth = Dimensions.get('window').width;

export default class RegisterScreen extends React.Component {
    state = {
        email: "",
        sifre: "",
        errorMessage: null,
        adSoyad: "",
    }

    kayitIslemi = () => {
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.sifre)
                        .then(kullaniciBilgileri => {
                            return kullaniciBilgileri.user.updateProfile({
                                displayName: this.state.adSoyad
                            })
                        })
                        .catch(error => this.setState({ errorMessage: error.message }));
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={ styles.GeriTusu } onPress={() => this.props.navigation.goBack()}>
                    <Ionicons name="arrow-back-circle" size={32} color="#FFFFFF"></Ionicons>
                </TouchableOpacity>

                <View style={{ textAlign: 'center' }}>
                    <Text style={{ fontSize: 32 }}>Haydi başlayalım!</Text>
                </View>
                <View style={{ padding: 20 }}>
                    <TextInput
                        placeholder="Ad Soyad"
                        style={styles.input}
                        onChangeText={adSoyad => this.setState({ adSoyad })}
                        value={this.state.adSoyad}
                    />
                </View>
                <View style={{ paddingBottom: 20 }}>
                    <TextInput
                        placeholder="E-Mail"
                        style={styles.input}
                        onChangeText={email => this.setState({ email })}
                        value={this.state.email}
                    />
                </View>
                <View style={{ paddingBottom: 20 }}>
                    <TextInput
                        placeholder="Şifre"
                        style={styles.input}
                        onChangeText={sifre => this.setState({ sifre })}
                        value={this.state.sifre}
                        secureTextEntry
                        autoCapitalize="none"
                    />
                </View>
                {this.state.errorMessage &&
                    <Text style={{ color: 'red' }}>
                        {this.state.errorMessage}
                    </Text>}
                <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.kayitIslemi}
                    >
                        <Text style={{ fontSize: 20 }}>Kayıt Ol</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                    <View style={{ flex: 0.7, alignItems: 'flex-end' }}>
                        <Text>
                            Zaten hesabınız var mı?
                    </Text>
                    </View>
                    <View style={{ flex: 0.20, alignItems: 'flex-end' }}>
                        <TouchableHighlight onPress={() => this.props.navigation.navigate("Giris")}>
                            <Text style={{ marginLeft: 5, color: Colors.link }}>
                                Giriş yapın
                        </Text>
                        </TouchableHighlight>
                    </View>
                    <View style={{ flex: 0, alignItems: 'flex-end' }}>
                        <Text style={{ marginLeft: 2 }}>.</Text>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.themeOrange,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        backgroundColor: Colors.white,
        fontSize: 14,
        height: 40,
        width: windowWidth * 0.9,
        borderRadius: 20,
        paddingLeft: 20,
    },
    button: {
        alignItems: 'center',
        backgroundColor: Colors.button,
        padding: 8,
        width: windowWidth * 0.9,
        borderRadius: 20,
        paddingLeft: 20,
    },
    GeriTusu:{
        position:"absolute",
        top:34,
        left: 20,
        width:32,
        height:32,
        borderRadius:16,
        alignItems:"center",
        justifyContent:"center",
    }
});