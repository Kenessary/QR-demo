import { Text, View, Image, TouchableOpacity } from 'react-native'
import React, { Component, useContext, useEffect, useState } from 'react'
import QRCode from 'react-native-qrcode-svg'
import { AuthContext } from '../../context/AuthContext'
import { MaterialIndicator } from 'react-native-indicators';
// import { encode } from 'base-64';
// import { TextEncoder } from 'text-encoding';
// import base64 from 'react-native-base64'
import { encode } from 'js-base64';
import moment from 'moment';


export default function HomeScreen ({navigation}) {
  const date = moment().format(`DD.MM.YYYY hh:mm:ss`)
  const {userInfo, isLoading, fio} = useContext(AuthContext)
  userInfo.gen_date = `${date}`





  const string_userInfo = JSON.stringify(userInfo)
  
  const encoded_info = encode(string_userInfo);
  
  // console.log(fio)




  if(isLoading) {
    return(
        <View style={{flex: 1, justifyContent:'center', alignItems: 'center', backgroundColor:'white'}}>
            <MaterialIndicator color="#4873E1"/>
        </View>
    )
  }

    return (
      <View style={{flex:1, alignItems:"center", justifyContent:"center", backgroundColor:'white'}}>

        <View style={{display: fio === 'Сотрудник СБ' ? "none" : "flex", alignItems:'center' }}>
          <Text style={{fontSize:22, fontWeight:'600', color:'#4d4d4d'}}>QR код</Text>
          <View style={{width:250, height:250, borderWidth:5, borderColor:'#4873E1', alignItems:'center', justifyContent:'center', borderRadius:20, marginTop:40}}>
            <QRCode value={encoded_info} size={200} />
          </View>
        </View>

        <View style={{display: fio !== 'Сотрудник СБ' ? "none" : "flex", alignItems:'center' }}>
          <TouchableOpacity style={{width:250, height:250, borderWidth:4, borderColor:'#4873E1', alignItems:'center', justifyContent:'center', borderRadius:20, marginTop:40}} 
          onPress={() => navigation.navigate('QRscan')}>
            <Image source={require('../../../assets/qr_img2.png')} style={{width:150, height:150, borderRadius:15, marginBottom:20}}/>
            <Text style={{fontSize:20, fontWeight:'700', color:'#4873E1'}}>Сканировать</Text>
          </TouchableOpacity>
        </View>




      </View>
    )
}