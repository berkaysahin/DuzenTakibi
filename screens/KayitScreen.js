import React from 'react'
import { StyleSheet, Text, TextInput, View, Image, Button, TouchableOpacity, useWindowDimensions, Dimensions } from 'react-native';
import firebase from 'firebase'
import Colors from '../utils/Colors';
import { TouchableHighlight } from 'react-native-gesture-handler';

const windowWidth = Dimensions.get('window').width;

export default class RegisterScreen extends React.Component {
    state = {
        email: "",
        adSoyad: "",
        sifre: "",
        errorMessage: null,
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
                        placeholder="Kullanıcı Adı"
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
                    <View style={{ flex: 0.6, alignItems: 'flex-end' }}>
                        <Text>
                            Hesabınız yok mu?
                    </Text>
                    </View>
                    <View style={{ flex: 0.3, alignItems: 'flex-end' }}>
                        <TouchableHighlight onPress={() => this.props.navigation.popToTop()}>
                            <Text style={{ marginLeft: 5, color: Colors.link }}>
                                Hemen oluşturun
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
});