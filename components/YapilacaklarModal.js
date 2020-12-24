import React from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    FlatList,
    KeyboardAvoidingView,
    TextInput,
    Keyboard,
    Animated
} from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import Colors from "../utils/Colors";
import firebase from 'firebase'

export default class YapilacaklarModal extends React.Component {
    state = {
        newTodo: ""
    };

    toggleTodoCompleted = index => {
        let list = this.props.list;
        list.todos[index].completed = !list.todos[index].completed;

        firebase.firestore().collection("Users").doc(firebase.auth().currentUser.uid).collection("Listeler").doc(list.id).update(list);
        // this.props.updateList(list);
    };

    addTodo = () => {
        let list = this.props.list;

        if (!list.todos.some(todo => todo.title === this.state.newTodo)) {
            list.todos.push({ title: this.state.newTodo, completed: false });

            firebase.firestore().collection("Users").doc(firebase.auth().currentUser.uid).collection("Listeler").doc(list.id).update(list);

        }

        this.setState({ newTodo: "" });
        Keyboard.dismiss();
    };

    deleteTodo = index => {
        let list = this.props.list;
        list.todos.splice(index, 1);

        firebase.firestore().collection("Users").doc(firebase.auth().currentUser.uid).collection("Listeler").doc(list.id).update(list);

    };

    deleteList = () => {
        let list = this.props.list;
        firebase.firestore().collection("Users").doc(firebase.auth().currentUser.uid).collection("Listeler").doc(list.id).delete();

    };

    renderTodo = (todo, index) => {
        return (
            <View style={styles.todoContainer}>
                    <TouchableOpacity onPress={() => this.toggleTodoCompleted(index)}>
                        <Ionicons
                            name={todo.completed ? "ios-square" : "ios-square-outline"}
                            size={24}
                            color={Colors.gray}
                            style={{ width: 32 }}
                        />
                    </TouchableOpacity>

                    <Text
                        style={[
                            styles.todo,
                            {
                                textDecorationLine: todo.completed ? "line-through" : "none",
                                color: todo.completed ? Colors.link : Colors.black
                            }
                        ]}
                    >
                        {todo.title}
                    </Text>
                    <TouchableOpacity onPress={() => this.deleteTodo(index)}>
                        <Ionicons
                            name="trash-outline"
                            size={24}
                            color={Colors.themeRed}
                            style={{ width: 32 }}
                        />
                    </TouchableOpacity>
                </View>
        );
    };

    render() {
        const list = this.props.list;

        const taskCount = list.todos.length;
        const completedCount = list.todos.filter(todo => todo.completed).length;

        return (
            <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
                <SafeAreaView style={styles.container}>
                    <TouchableOpacity
                        style={{ position: "absolute", top: 25, right: 32, zIndex: 10 }}
                        onPress={this.props.closeModal}
                    >
                        <AntDesign name="close" size={24} color={Colors.black} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ position: "absolute", top: 64, right: 32, zIndex: 10 }}
                        onPress={() => this.deleteList()}
                    >
                        <AntDesign name="delete" size={24} color={Colors.themeRed} />
                    </TouchableOpacity>

                    <View style={[styles.section, styles.header, { borderBottomColor: list.color }]}>
                        <View>
                            <Text style={styles.title}>{list.name}</Text>
                            <Text style={styles.taskCount}>
                                {taskCount} görevden {completedCount} tanesi yapıldı.
                            </Text>
                        </View>
                    </View>

                    <View style={[styles.section, { flex: 3, marginVertical: 16 }]}>
                        <FlatList
                            data={list.todos}
                            renderItem={({ item, index }) => this.renderTodo(item, index)}
                            keyExtractor={item => item.title}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>

                    <View style={[styles.section, styles.footer]}>
                        <TextInput
                            style={[styles.input, { borderColor: list.color }]}
                            onChangeText={text => this.setState({ newTodo: text })}
                            value={this.state.newTodo}
                        />
                        <TouchableOpacity
                            style={[styles.addTodo, { backgroundColor: list.color }]}
                            onPress={() => this.addTodo()}
                        >
                            <AntDesign name="plus" size={16} color={Colors.white} />
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    section: {
        alignSelf: "stretch"
    },
    header: {
        justifyContent: "flex-end",
        marginLeft: 64,
        borderBottomWidth: 3,
        paddingTop: 16
    },
    title: {
        fontSize: 30,
        fontWeight: "800",
        color: Colors.black
    },
    taskCount: {
        marginTop: 4,
        marginBottom: 16,
        color: Colors.gray,
        fontWeight: "600"
    },
    footer: {
        paddingHorizontal: 32,
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 16
    },
    input: {
        flex: 1,
        height: 48,
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 6,
        marginRight: 8,
        paddingHorizontal: 8
    },
    addTodo: {
        borderRadius: 4,
        padding: 16,
        alignItems: "center",
        justifyContent: "center"
    },
    todoContainer: {
        paddingVertical: 16,
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 32,
        justifyContent:'space-between'
    },
    todo: {
        color: Colors.black,
        fontWeight: "700",
        fontSize: 16
    },
    deleteButton: {
        flex: 1,
        backgroundColor: Colors.red,
        justifyContent: "center",
        alignItems: "center",
        width: 80
    }
});
