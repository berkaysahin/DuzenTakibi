import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Modal, useWindowDimensions, Dimensions } from "react-native";
import Colors from '../utils/Colors';

const windowWidth = Dimensions.get('window').width;

export default class Is extends React.Component {
    state = {
        showListVisible: false
    };

    toggleListModal() {
        this.setState({ showListVisible: !this.state.showListVisible });
    }

    render() {
        const liste = this.props.list;
        const tamamlanmisSayisi = liste.todos.filter(todo => todo.completed).length;
        const beklenenSayisi = liste.todos.length - tamamlanmisSayisi;

        return (
            <View style={[styles.listContainer, { backgroundColor: liste.color }]}>
                    <Text style={styles.listTitle} numberOfLines={1}>
                        {liste.name}
                    </Text>

                    <View>
                        <View style={{ alignItems: "center", justifyContent:'center', flexDirection:'row' }}>
                            <Text style={styles.count}>{beklenenSayisi}</Text>
                            <Text style={styles.subtitle}>Yapılacak</Text>
                        </View>
                        <View style={{ alignItems: "center", justifyContent:'center', flexDirection:'row' }}>
                            <Text style={styles.count}>{tamamlanmisSayisi}</Text>
                            <Text style={styles.subtitle}>Bitti</Text>
                        </View>
                    </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    listContainer: {
        paddingVertical: 32,
        paddingHorizontal: 16,
        borderRadius: 6,
        marginHorizontal: 12,
        alignItems: "center",
        width: windowWidth * 0.8,
        marginBottom:15,
    },
    listTitle: {
        fontSize: 24,
        fontWeight: "700",
        color: Colors.white,
        marginBottom: 18
    },
    count: {
        fontSize: 48,
        fontWeight: "200",
        color: Colors.white
    },
    subtitle: {
        fontSize: 12,
        fontWeight: "700",
        color: Colors.white
    }
});