import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from '../../conts/colors';
import { RegisterCars } from '../../conts/data';
import AddCars from './AddCars';
const HomeScree = ({ navigation }) => {
  const [userDetails, setUserDetails] = React.useState();
  const [registerCars, setRegisterCars] = React.useState(null)
  const [modalVisible, setModalVisible] = React.useState(false)
  const [editData, seteditData] = React.useState(null)

  React.useEffect(() => {
    setRegisterCars(RegisterCars)
  }, []);

  // logout User
  const logout = () => {
    AsyncStorage.setItem(
      'userData',
      JSON.stringify({ ...userDetails, loggedIn: false }),
    );
    navigation.navigate('LoginScreen');
  };
  // Delete Register Car
  const deleteCar = (item) => {
    let updatedCars = registerCars.filter((i) => i.registrationNo !== item.registrationNo)
    setRegisterCars(updatedCars);
  }
  // Flat List Item
  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.cardView}>
        <View style={styles.iconView}>
          <Icon
            onPress={() => { seteditData(item); setModalVisible(true) }}
            name={'square-edit-outline'}
            style={{ color: COLORS.darkBlue, fontSize: 22, marginRight: 15 }}
          />
          <Icon
            name={'delete'}
            onPress={() => deleteCar(item)}
            style={{ color: COLORS.red, fontSize: 22, marginRight: 5 }}
          />
        </View>
        <View style={styles.innerView}>
          <Text>Color</Text>
          <Text>{item?.color}</Text>
        </View>
        <View style={styles.innerView}>
          <Text>Make</Text>
          <Text>{item?.make}</Text>
        </View>
        <View style={styles.innerView}>
          <Text>Model</Text>
          <Text>{item?.model}</Text>
        </View>
        <View style={styles.innerView}>
          <Text>Registration Num</Text>
          <Text>{item?.registrationNo}</Text>
        </View>
      </View>
    )
  }

  // Add Car in the Existing List
  const addCars = (item) => {
    setModalVisible(!modalVisible)
    let updatedCars = registerCars;
    let registrationContain = registerCars.some((value) => value.registrationNo === item.registrationNo)
    if (registrationContain) {
      Alert.alert('Error', 'Car Already Added With Same Registation Number')
      return
    }
    updatedCars.push(item)
    setRegisterCars(updatedCars)
  }
  // Update the Car
  const updateCars = (item) => {
    const index = registerCars.findIndex((i) => i.registrationNo === item.registrationNo);
    const updatedData = {
      color: item.color,
      make: item.make,
      model: item.model,
      registrationNo: item.registrationNo,
    }
    let newArr = [...registerCars];
    newArr[index] = updatedData

    setRegisterCars(newArr)
    seteditData(null)
    setModalVisible(!modalVisible)
  }
  return (
    <>
      {modalVisible ? <AddCars editCars={editData} updateCars={updateCars} addCars={addCars} backBtn={() => { setModalVisible(false); seteditData(null) }} /> :
        <View
          style={styles.container}>
          <View style={styles.topText}>
            <Text style={styles.heading}>
              Registered Cars
            </Text>
            <Icon name='logout'
              style={styles.iconStyle}
              onPress={logout}
            />
          </View>

          <FlatList
            data={registerCars}
            renderItem={renderItem}
            keyExtractor={(item, index) => index}
            extraData={registerCars}
          />
          <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.floatBtn}>
            <Icon name='plus-circle'
              style={{ color: COLORS.darkBlue, fontSize: 50 }}
            />
          </TouchableOpacity>
        </View>
      }
    </>
  );
};
const styles = StyleSheet.create({
  cardView: {
    justifyContent: 'space-between',
    padding: 10, shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 0.1,
    marginVertical: 5,

  },
  iconView: { alignSelf: 'flex-end', flexDirection: 'row' },
  innerView: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  floatBtn: {
    //Here is the trick
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#2c3e50',

  },
  topText: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  heading: {
    fontSize: 28,
    paddingVertical: 20,
    color: COLORS.light
  },
  iconStyle: { color: COLORS.darkBlue, fontSize: 32 }
})
export default HomeScree;
