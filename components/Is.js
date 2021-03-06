import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Modal, useWindowDimensions, Dimensions } from "react-native";
import Colors from '../utils/Colors';
import YapilacaklarModal from './YapilacaklarModal'

const windowWidth = Dimensions.get('window').width;

export default class Is extends React.Component {
    state = {
        showListVisible: false
    };

    toggleListModal() {
        this.setState({ showListVisible: !this.state.showListVisible });
    }

    render() {
        const list = this.props.list;
        const tamamlanmisSayisi = list.todos.filter(todo => todo.completed).length;
        const beklenenSayisi = list.todos.length - tamamlanmisSayisi;

        return (
            <View>
                <Modal
                    animationType="slide"
                    visible={this.state.showListVisible}
                    onRequestClose={() => this.toggleListModal()}
                >
                    <YapilacaklarModal
                        list={list}
                        closeModal={() => this.toggleListModal()}
                        updateList={this.props.updateList}
                    />
                </Modal>
                <TouchableOpacity
                    style={[styles.listContainer, { backgroundColor: list.color }]}
                    onPress={() => this.toggleListModal()}
                >
                     <View style={{ alignItems: "center", justifyContent:'space-between', flexDirection:'row' }}>
                        <Text style={styles.listTitle} numberOfLines={1}>{list.name}</Text>
                        <Text style={styles.count}> | {beklenenSayisi}</Text>
                        <Text style={styles.subtitle}> Yapılacak</Text>
                        <Text style={styles.count}> | {tamamlanmisSayisi}</Text>
                        <Text style={styles.subtitle}> Bitti</Text>
                    </View>
                    </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    listContainer: {
        paddingVertical: 32,
        paddingHorizontal: 16,
        alignItems: "center",
        width: windowWidth,
    },
    listTitle: {
        fontSize: 24,
        fontWeight: "700",
        color: Colors.white,
        //marginBottom: 18
    },
    count: {
        fontSize: 24,
        fontWeight: "200",
        color: Colors.white
    },
    subtitle: {
        fontSize: 12,
        fontWeight: "700",
        color: Colors.white,
    }
});