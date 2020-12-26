import React from 'react'
import { StyleSheet, Text, TextInput, View, Image, Button, TouchableOpacity, useWindowDimensions, Dimensions } from 'react-native';
import firebase from 'firebase'
import Colors from '../utils/Colors';
import { TouchableHighlight } from 'react-native-gesture-handler';

const windowWidth = Dimensions.get('window').width;

export default class LoginScreen extends React.Component {
    state = {
        email: "",
        sifre: "",
        errorMessage: null,
    }

    handleLogin = () => {
        const { email, sifre } = this.state;

        firebase.auth().signInWithEmailAndPassword(email, sifre)
                        .catch(error => this.setState({errorMessage: error.message}));
    }

    componentWillUnmount(){
        this.unsubscribe;
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{ textAlign: 'center' }}>
                    <Text style={{ fontSize: 32 }}>Düzen Takibi</Text>
                </View>
                <View style={{ padding: 20 }}>
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
                        onPress={() => this.handleLogin()}
                    >
                        <Text style={{ fontSize: 20 }}>Giriş Yap</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                    <View style={{ flex: 0.6, alignItems: 'flex-end' }}>
                        <Text>
                            Hesabınız yok mu?
                    </Text>
                    </View>
                    <View style={{ flex: 0.3, alignItems: 'flex-end' }}>
                        <TouchableHighlight onPress={() => this.props.navigation.navigate("Kayit")}>
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