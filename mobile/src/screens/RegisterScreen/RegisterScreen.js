import React, { useState } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import { useAuth } from '../../hooks';

export default ({ navigation, route }) => {
	const { signIn, signUp, errorHandler, authState } = useAuth();

	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSignIn = async () => {
		try {
			await signIn(email, password);
		} catch (err) {
			errorHandler(err, 'An unexpected error happened trying to Sign In');
		}
	}

	const handleSignUp = async () => {
		try {
			await signUp(username, email, password);
		} catch (err) {
			errorHandler(err, 'An unexpected error happened trying to Sign Up');
		}
	}

	return (
		<>
			<View>
				<Text>SignIn</Text>
				<TextInput
					placeholder='Email'
					value={email}
					autoCapitalize='none'
					autoCorrect={false}
					onChangeText={(text) => setEmail(text)}
				/>
				<TextInput
					placeholder='Password'
					value={password}
					autoCapitalize='none'
					autoCorrect={false}
					secureTextEntry={true}
					onChangeText={(text) => setPassword(text)}
				/>
				<Button title={'SIGNIN'} onPress={() => { handleSignIn() }} />
			</View>
			<View>
				<Text>SignUp</Text>
				<TextInput
					placeholder='UserName'
					value={username}
					autoCapitalize='none'
					autoCorrect={false}
					onChangeText={(text) => setUsername(text)}
				/>
				<TextInput
					placeholder='Email'
					value={email}
					autoCapitalize='none'
					autoCorrect={false}
					onChangeText={(text) => setEmail(text)}
				/>
				<TextInput
					placeholder='Password'
					value={password}
					autoCapitalize='none'
					autoCorrect={false}
					secureTextEntry={true}
					onChangeText={(text) => setPassword(text)}
				/>
				<Button title={'SIGNUP'} onPress={() => { handleSignUp() }} />
			</View>
			{
				!!authState.error &&
				<View>
					<Text>
						Ocorreu um erro
						</Text>
					<Text>
						{authState.error}
					</Text>
				</View>
			}
		</>
	);
}