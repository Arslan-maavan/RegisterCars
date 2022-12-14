import React from 'react';
import { View, Text, SafeAreaView, Keyboard, Alert, StyleSheet } from 'react-native';
import COLORS from '../../conts/colors';
import Button from '../components/Button';
import Input from '../components/Input';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [inputs, setInputs] = React.useState({ email: '', password: '' });
  const [errors, setErrors] = React.useState({});

  const validate = async () => {
    Keyboard.dismiss();
    let isValid = true;
    if (!inputs.email) {
      handleError('Please input email', 'email');
      isValid = false;
    }
    if (!inputs.password) {
      handleError('Please input password', 'password');
      isValid = false;
    }
    if (isValid) {
      login();
    }
  };

  const login = async () => {

    let userData = await AsyncStorage.getItem('userData');
    if (userData) {
      userData = JSON.parse(userData);
      if (
        inputs?.email == userData?.email &&
        inputs?.password == userData?.password
      ) {
        navigation.navigate('HomeScreen');
        AsyncStorage.setItem(
          'userData',
          JSON.stringify({ ...userData, loggedIn: true }),
        );
      } else {
        Alert.alert('Error', 'Invalid Details');
      }
    } else {
      Alert.alert('Error', 'User does not exist');
    }
  };

  const handleOnchange = (text, input) => {
    setInputs(prevState => ({ ...prevState, [input]: text }));
  };

  const handleError = (error, input) => {
    setErrors(prevState => ({ ...prevState, [input]: error }));
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainView}>
        <Text style={styles.mainHeading}>
          Log In
        </Text>
        <Text style={styles.heading}>
          Enter Your Details to Login
        </Text>
        <View style={{ marginVertical: 20 }}>
          <Input
            onChangeText={text => handleOnchange(text, 'email')}
            onFocus={() => handleError(null, 'email')}
            iconName="email-outline"
            label="Email"
            placeholder="Enter your email address"
            error={errors.email}
          />
          <Input
            onChangeText={text => handleOnchange(text, 'password')}
            onFocus={() => handleError(null, 'password')}
            iconName="lock-outline"
            label="Password"
            placeholder="Enter your password"
            error={errors.password}
            password
          />
          <Button title="Log In" onPress={validate} />
          <Text
            onPress={() => navigation.navigate('RegistrationScreen')}
            style={styles.textStyle}>
            Don't have account ?Register
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c3e50',
  },
  mainView: {
    paddingTop: 50,
    paddingHorizontal: 20
  },
  mainHeading: {
    color: COLORS.light,
    fontSize: 40,
    fontWeight: 'bold'
  },
  heading: {
    color: COLORS.light,
    fontSize: 18,
    marginVertical: 10
  },
  textStyle:{
    color: COLORS.light,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  }
});
export default LoginScreen;
