import { Text, View, Dimensions, StyleSheet } from 'react-native'
import React, { Component, useContext, useState, useEffect } from 'react'
import { TouchableOpacity } from 'react-native'
import { AuthContext } from '../../context/AuthContext'
import { MaterialIndicator } from 'react-native-indicators';
import { AntDesign } from '@expo/vector-icons'; 
import axios from 'axios';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function ProfileScreen ({navigation}) {
  const {logout, iin, fio, dostupy, gosnomer, userInfo} = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(false)


  // console.log(userInfo)

if(isLoading) {
  return(
      <View  style={{flex: 1, justifyContent:'center', alignItems: 'center', backgroundColor:'white'}}>
          <MaterialIndicator color="#4873E1"/>
      </View>
  )
}

let dostup = []
for(let i=0; i < dostupy.length; i++){
  dostup.push(
    <View key={i} style={styles.dostupContainer}>
    <View style={{width:"90%"}}>
      <Text>{i+1}. {dostupy[i]} </Text>
    </View>
    <AntDesign name="checkcircle" size={18} color="#05A815" /> 
  </View>
  )
}


    return (
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <View style={{width:windowWidth-80}}>
            <Text style={styles.profileHeader}>Профиль</Text>
          </View>

          <View>
          <View style={styles.fio}>
            <Text style={styles.label}>ФИО:</Text>
            <Text style={styles.text}>{fio}</Text>
          </View>

          <View style={styles.iin}>
            <Text style={styles.label}>ИИН:</Text>
            <Text style={styles.text}>{iin}</Text>
          </View>

          <View style={{...styles.gost,  display: gosnomer === '' ? "none" : "flex"}}>
            <Text style={styles.label}>Гос.номер:</Text>
            <Text style={styles.text}>{gosnomer}</Text>
          </View>
          </View>
    
        <View style={styles.line}></View>

          <View style={{width:windowWidth-80, marginTop:10}}>
            <Text style={styles.label}>Доступы:</Text>
            {dostup}
          </View>

        </View>
        <TouchableOpacity style={styles.btn} onPress={() => logout()}>
          <Text style={{fontSize:18, color:'white'}}>Выйти</Text>
        </TouchableOpacity>
      </View>
    )
}

const styles = StyleSheet.create({
  dostupContainer:{
    width:"100%", 
    marginTop:10, 
    borderWidth:0.6, 
    padding:5, 
    borderColor:'grey', 
    borderRadius:4, 
    flexDirection:'row', 
    justifyContent:'space-between', 
    alignItems:'center'
  },
  container:{
    flex:1, 
    alignItems:'center', 
    justifyContent:'center',
    backgroundColor:'white'
  },
  profileContainer:{
    width:windowWidth-60,
    paddingTop:20,
    paddingBottom:30, 
    backgroundColor:'white',
    borderRadius:15, 
    alignItems:'center',
    borderWidth:0.4,
    borderColor:'grey'
  },
  profileHeader:{
    fontSize:24, 
    fontWeight:'600'
  },
  fio:{
    width:windowWidth-80, 
    marginTop:20, 
    flexDirection:'row'
  },
  label:{
    fontSize:16, 
    fontWeight:'600'
  },
  text:{
    fontSize:16, 
    marginLeft:10
  },
  iin:{
    width:windowWidth-80, 
    marginTop:10, 
    flexDirection:'row'
  },
  gost:{
    width:windowWidth-80,
    marginTop:10, 
    flexDirection:'row', 
  },
  line:{
    width:windowWidth-85, 
    height:0.6, 
    backgroundColor:'grey', 
    marginTop:10
  },
  btn:{
    width:windowWidth-60,
    height:50, 
    backgroundColor:"#EA0E00", 
    alignItems:'center', 
    justifyContent:'center', 
    marginTop:20, 
    borderRadius:15
  }
})