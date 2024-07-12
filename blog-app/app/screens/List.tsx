import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, TextInput, FlatList, TouchableOpacity } from "react-native";
import { FIRESTORE_db } from "../../firebaseConfig";
import { addDoc, collection, onSnapshot, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from "@expo/vector-icons";

export interface Todo {
    title: string;
    done: boolean;
    id: string;
}

const List = ({ navigation }: any) => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [todo, setTodo] = useState('');

    useEffect(() => {
        const todoRef = collection(FIRESTORE_db, 'todos');
        const unsubscribe = onSnapshot(todoRef, (snapshot) => {
            console.log('UPDATED');
            const todos = snapshot.docs.map((doc) => {
                const data = doc.data() as { title: string; done: boolean };
                return {
                    id: doc.id,
                    title: data.title,
                    done: data.done,
                };
            });
            setTodos(todos);
        }, (error) => {
            console.error("Error fetching todos: ", error);
        });

        // Clean up the subscription on unmount
        return () => unsubscribe();
    }, []);

    const addTodo = async () => {
        try {
            await addDoc(collection(FIRESTORE_db, 'todos'), { title: todo, done: false });
            setTodo('');
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };

    const renderItem = ({ item }: { item: Todo }) => {
        const ref = doc(FIRESTORE_db, `todos/${item.id}`);

        const toggleDone = async () => {
            try {
                await updateDoc(ref, { done: !item.done });
            } catch (error) {
                console.error("Error updating document: ", error);
            }
        };

        const deleteItem = async () => {
            try {
                await deleteDoc(ref);
            } catch (error) {
                console.error("Error deleting document: ", error);
            }
        };

        return (
            <View key={item.id} style={styles.todoContainer}>
                <TouchableOpacity onPress={toggleDone} style={styles.todo}>
                    {item.done ? <Ionicons name="checkmark-circle" size={24} color="green" /> : <Entypo name="circle" size={24} color="black" />}
                    <Text style={styles.todoText}>{item.title}</Text>
                </TouchableOpacity>
                <Ionicons
                    name="trash-bin-outline"
                    size={24}
                    color="red"
                    onPress={deleteItem}
                />
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <TextInput
                    placeholder="Add new todo"
                    onChangeText={(text: string) => setTodo(text)}
                    value={todo}
                    style={styles.input}
                />
                <Button onPress={addTodo} title="Add Todo" />
            </View>
            {todos.length > 0 && (
                <FlatList
                    data={todos}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                />
            )}
        </View>
    );
};

export default List;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
    },
    form: {
        flexDirection: 'row',
        marginVertical: 20,
        alignItems: "center",
    },
    input: {
        flex: 1,
        height: 45,
        borderWidth: 1,
        borderRadius: 20,
        padding: 10,
        marginRight: 10,
    },
    todo: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    todoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ccc',
        marginVertical: 4
    },
    todoText: {
        flex: 1,
        paddingHorizontal: 4,
    }
});
