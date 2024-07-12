import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';


interface SignUpProps {
    navigation: any; // Adjust type based on actual navigation prop type
}

interface SignUpState {
    email: string;
    password: string;
    errorMessage: string | null;
}

export default class SignUp extends Component<SignUpProps, SignUpState> {
    state: SignUpState = {
        email: '',
        password: '',
        errorMessage: null
    };

    handleSignUp = () => {
        // TODO: Implement Firebase authentication logic
        console.log('handleSignUp');
    };

    render() {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Text style={{ color: '#e93766', fontSize: 40 }}>Sign Up</Text>
                {this.state.errorMessage && (
                    <Text style={{ color: 'red' }}>{this.state.errorMessage}</Text>
                )}
                <TextInput
                    placeholder="Email"
                    autoCapitalize="none"
                    style={{
                        height: 40,
                        fontSize:20,
                        width: '90%',
                        borderColor: '#9b9b9b',
                        borderBottomWidth: 1,
                        marginTop: 8,
                        marginVertical: 15
                    }}
                    onChangeText={(email) => this.setState({ email })}
                    value={this.state.email}
                />
                <TextInput
                    secureTextEntry
                    placeholder="Password"
                    autoCapitalize="none"
                    style={{height: 40,
                        fontSize:20,
                        width: '90%',
                        borderColor: '#9b9b9b',
                        borderBottomWidth: 1,
                        marginTop: 8,
                        marginVertical: 15}}
                    onChangeText={(password) => this.setState({ password })}
                    value={this.state.password}
                />
                <Button title="Sign Up" color="#e93766" onPress={this.handleSignUp} />
                <View>
                    <Text>
                        Already have an account?{' '}
                        <Text
                            onPress={() => this.props.navigation.navigate('Login')}
                            style={{ color: '#e93766', fontSize: 18 }}
                        >
                            Login
                        </Text>
                    </Text>
                </View>
            </View>
        );
    }
}
