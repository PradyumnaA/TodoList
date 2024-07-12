import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import List from "./app/screens/List";
import Details from "./app/screens/Details";
import Login from "./app/screens/Login";
import Loader from "./app/screens/Loader";
import { onAuthStateChanged, User } from 'firebase/auth';
import { FIREBASE_AUTH } from './firebaseConfig';

const Stack = createStackNavigator();

export default function App() {
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState<User | null>(null);  // Explicitly define the type

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
            setUser(user);
            if (initializing) setInitializing(false);
        });

        return () => unsubscribe();
    }, [initializing]);

    if (initializing) return <Loader />;

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={user ? 'My Todos' : 'Login'}>
                {user ? (
                    <>
                        <Stack.Screen name="My Todos" component={List} />
                        <Stack.Screen name="Details" component={Details} />
                    </>
                ) : (
                    <Stack.Screen name="Login" component={Login} />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}
