//import liraries
import React, { Component, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Keyboard } from 'react-native';
import COLORS from '../../conts/colors';
import Button from '../components/Button';
import Input from '../components/Input';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// create a component
const AddCars = ({ addCars, editCars, updateCars, backBtn }) => {

    const [editCar, setEditCar] = React.useState(null);
    const [inputs, setInputs] = React.useState({
        color: '',
        make: '',
        model: '',
        registrationNo: '',
    });
    const [errors, setErrors] = React.useState({});
    useEffect(() => {
        setEditCar(editCars)
    },
        [])
        // Validate Input Fields
    const validate = () => {
        Keyboard.dismiss();
        if (editCar) { updateCars(editCar); return }

        let isValid = true;

        if (!inputs.color) {
            handleError('Please input Color', 'color');
            isValid = false;
        }

        if (!inputs.make) {
            handleError('Please input Make', 'make');
            isValid = false;
        }

        if (!inputs.model) {
            handleError('Please input Model', 'model');
            isValid = false;
        }

        if (!inputs.registrationNo) {
            handleError('Please input Registration Number', 'registrationNo');
            isValid = false;
        }

        if (isValid) {

            addCars(inputs);

        }
    };
    // Set Errors 
    const handleError = (error, input) => {
        setErrors(prevState => ({ ...prevState, [input]: error }));
    };
    //Set Values
    const handleOnchange = (text, input) => {
        if (editCar) {
            setEditCar(prevState => ({ ...prevState, [input]: text }));
        }
        else {
            setInputs(prevState => ({ ...prevState, [input]: text }));
        }
    };
    return (
        <View style={styles.container}>
            <Icon
                onPress={backBtn}
                name={'keyboard-backspace'}
                style={styles.backIcon}
            />
            <ScrollView>
                <Text style={styles.mainHeading}>
                    {editCar ? 'Edit Car Details' : 'Add Cars Detail'}
                </Text>
                <Text style={styles.heading}>
                    {editCar ? 'Update Your Car Details' : 'Enter Your Car Details to Register'}
                </Text>
                <View style={{ marginVertical: 20 }}>
                    <Input
                        onChangeText={text => handleOnchange(text, 'color')}
                        onFocus={() => handleError(null, 'color')}
                        label="Colour"
                        placeholder="Enter Colour"
                        error={errors.color}
                        value={editCar?.color}
                    />

                    <Input
                        onChangeText={text => handleOnchange(text, 'make')}
                        onFocus={() => handleError(null, 'make')}
                        label="Make"
                        placeholder="Enter car Make"
                        error={errors.make}
                        value={editCar?.make}

                    />

                    <Input
                        onChangeText={text => handleOnchange(text, 'model')}
                        onFocus={() => handleError(null, 'model')}
                        label="Model"
                        placeholder="Enter Car Model"
                        error={errors.model}
                        value={editCar ? editCar.model : null}

                    />
                    <Input
                        onChangeText={text => handleOnchange(text, 'registrationNo')}
                        onFocus={() => handleError(null, 'registrationNo')}
                        label="Registration Number"
                        placeholder="Registration Number"
                        error={errors.registrationNo}
                        value={editCar ? editCar.registrationNo : null}
                        editable={editCar ? false : true}
                    />
                    <Button title={editCar ? 'Update Car' : "Register Car"} onPress={validate} />

                </View>
            </ScrollView>
        </View>
    );
};

// define  styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: '#2c3e50',
    },
    backIcon: { color: COLORS.darkBlue, fontSize: 32, padding: 15 },
    heading:{ color: COLORS.grey, fontSize: 16, marginVertical: 10,color:COLORS.light },
    mainHeading:{ fontSize: 32, fontWeight: 'bold',color:COLORS.light }
});

//make this component available to the app
export default AddCars;
