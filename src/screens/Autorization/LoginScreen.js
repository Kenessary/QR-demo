import { Text, View, Dimensions, Button, StyleSheet } from 'react-native'
import React, { useState, useContext } from 'react'
import { TouchableOpacity, TextInput } from 'react-native';
import { AuthContext } from "../../context/AuthContext";
import AsyncStorage from '@react-native-async-storage/async-storage';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export default function LoginScreen ({navigation}) {
    const { login } = useContext(AuthContext)
    const [inputs, setInputs] = useState({ login: '', parol: ''})
    globalThis.login = inputs.login
    globalThis.parol = inputs.parol

    // console.log(in)



    const handleOnChange = (text, input) => {
        setInputs(prevState=>({...prevState, [input]: text}))
    }

    return (
      <View style={{flex: 1, alignItems:'center', justifyContent:'center', backgroundColor:'#F2F2F2'}}>
        <View style={{width:windowWidth-40, height:windowHeight-280, backgroundColor:"white", borderRadius:30, alignItems:'center'}}>
            <View style={{width:windowWidth-90, height:"10%", marginTop:15, backgroundColor:'white', flexDirection:'row'}}>
                <TouchableOpacity style={{width:"45%", height:'100%', alignItems:'center', justifyContent:'center', borderBottomColor:"#4873E1", borderBottomWidth:3}}>
                    <Text style={{fontSize:18, color:'#4d4d4d', fontWeight:600}}>Вход</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{width:"55%", height:'100%', alignItems:'center', justifyContent:'center'}}>
                    <Text style={{fontSize:18, color:'#4d4d4d', fontWeight:400}}>Регистрация</Text>
                </TouchableOpacity>
            </View>

            <View style={{width:windowWidth-80, height:"78%", marginTop:10, backgroundColor:'white'}}>
                <Text style={{fontSize:16, marginTop:10, marginLeft:5, color:"#7A7A7A"}}>Логин:</Text>
                <TextInput style={styles.input} onChangeText={(text)=>handleOnChange(text, 'login')}  />
                <Text style={{fontSize:16, marginTop:10, marginLeft:5, color:"#7A7A7A"}}>Пароль:</Text>
                <TextInput style={styles.input} onChangeText={(text)=>handleOnChange(text, 'parol')} secureTextEntry={true}/>

                {/* <View style={{width:'100%', height:20, marginTop:15, alignItems:'flex-end'}}>
                    <TouchableOpacity><Text style={{fontSize:15, color:'#4d4d4d'}}>Забыли пароль?</Text></TouchableOpacity>
                </View> */}

                <TouchableOpacity style={styles.loginBtn} onPress={()=> login(inputs.login, inputs.parol)}>
                    <Text style={{fontSize:18, color:'white', fontWeight:600}}>Войти</Text>
                </TouchableOpacity>
                
            </View>

        
        </View>
      </View>
    )
}

const styles = StyleSheet.create({
    input:{
        backgroundColor:'white',
        width:'100%', 
        height:50, 
        marginTop:5, 
        borderWidth:2, 
        borderColor:"#cfcfcf", 
        borderRadius:5, 
        fontSize:16, 
        paddingLeft:10, 
        paddingRight:10,
        color:'#4d4d4d'
    }, 
    loginBtn: {
        width:"100%",
        height:50,
        backgroundColor:'#4873E1', 
        marginTop: 40, 
        alignItems:'center', 
        justifyContent:'center', 
        borderRadius:5
    }
})