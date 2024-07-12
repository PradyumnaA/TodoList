import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert, ActivityIndicator } from "react-native";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from "../../firebaseConfig"; // Adjust the path as needed

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const signUp = async () => {
        setLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
            console.log(userCredential);
            Alert.alert("Success", "Successfully Signed up");
        } catch (error: any) {
            console.error(error);
            Alert.alert("Error", error.message || "Sign Up failed");
        } finally {
            setLoading(false);
        }
    };

    const signIn = async () => {
        setLoading(true);
        try {
            const userCredential = await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
            console.log(userCredential);
            Alert.alert("Success", "Successfully Signed in");
            // Navigate to a different screen here if needed
        } catch (error: any) {
            console.error(error);
            Alert.alert("Error", error.message || "Sign In failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Email"
                onChangeText={(text) => setEmail(text)}
                value={email}
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                placeholder="Password"
                onChangeText={(text) => setPassword(text)}
                value={password}
                style={styles.input}
                secureTextEntry
            />
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <>
                    <Button onPress={signUp} title="Sign Up" />
                    <Button onPress={signIn} title="Sign In" />
                </>
            )}
        </View>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        flexDirection: 'column',
        paddingVertical: 10,
    },
    input: {
        height: 45,
        borderWidth: 1,
        borderRadius: 20,
        padding: 10,
        marginVertical: 5,
    }
});
