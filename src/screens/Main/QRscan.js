import { Text, View, StyleSheet, TouchableOpacity, Modal, Dimensions } from 'react-native'
import React, { Component, useState, useEffect, useContext } from 'react'
import { BarCodeScanner } from 'expo-barcode-scanner'

import { decode } from 'js-base64';
import { AuthContext } from '../../context/AuthContext';
import { AntDesign } from '@expo/vector-icons'; 
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export default function QRscan({navigation}) {
    const {dostupy} = useContext(AuthContext)
    const [scanned, setScanned] = useState(false)
    const [modal, setModal] = useState(false)
    const [isOtkaz, setIsOtkaz] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [qrInfo, setQrInfo] = useState('')
    const [hasPermission, setHasPermission] = useState(null)

    // console.log(qrInfo)

    const showInfo = () => {
        setIsLoading(true)
        // if(qrInfo !== ''){
            const commonElements = dostupy.filter((element) => qrInfo.response.dostupy.includes(element))
            if(commonElements.length !==0){
                setIsOtkaz(false)
            }else{
                setIsOtkaz(true)
            }
        // }
        setIsLoading(false)  
    }

    useEffect(()=>{
        if(qrInfo !== ''){
            showInfo()
            setModal(true)
        }else(
            setModal(false)
        )
    })

    // console.log(qrInfo)

    const askForCameraPermission = () =>{
        (async () =>{
            const {status} = await BarCodeScanner.requestPermissionsAsync()
            setHasPermission(status == 'granted')
        })()
    }

    useEffect(()=>{
        askForCameraPermission()
    },[])

    const handleBarCodeScaned = ({type, data}) => {
        try{
            setScanned(true)
            const a = decode(data)
            const parsedA = JSON.parse(a)
            setQrInfo(parsedA)
        } catch(er){
            console.log(er)
        }
    }

let dostup = []
for(let i=0; i < (qrInfo === '' ? '' : (qrInfo.response.dostupy).length); i++){
  dostup.push(
    <View key={i} style={styles.dostupContainer}>
    <View style={{width:"90%"}}>
      <Text style={{color:"#4d4d4d"}}>{i+1}. { (qrInfo === '' ? '' :(qrInfo.response.dostupy)[i])} </Text>
    </View>
    {/* <AntDesign name="checkcircle" size={18} color="#05A815" />  */}
  </View>
  )
}

    return (
      <View style={{flex: 1, alignItems:'center', justifyContent:'center'}}>
        <Modal
            animationType="fade"
            transparent={false}
            visible={modal}
            style={{backgroundColor:'white'}}
        >
            <View style={{ alignItems:'center', justifyContent:'center', backgroundColor:'#ffffff', height:'100%', width:'100%'}}>
                <View style={{width:windowWidth-60, backgroundColor:'white', alignItems:'center', padding:15, borderWidth:2, borderColor:'grey', borderRadius:15}}>
                    <View style={{width:windowWidth-70 , alignItems:'center'}}>
                        <Text style={{fontSize:24, fontWeight:'700', color:"#4d4d4d"}}>Данные</Text>
                    </View>
                    <View style={{width:windowWidth-80 , marginTop:15, flexDirection:'row', alignItems:'center'}}>
                        <View>
                            <Text style={{fontSize:18, fontWeight:'600', color:"#4d4d4d"}}>ФИО:</Text>
                        </View>
                        <View style={{marginLeft:20}}>
                            <Text style={{fontSize:18, fontWeight:'400', color:"#4d4d4d"}}>{qrInfo === ''? '': qrInfo.response.fio}</Text>
                        </View>
                    </View>
                    <View style={{width:windowWidth-80 , marginTop:10, flexDirection:'row', alignItems:'center'}}>
                        <View>
                            <Text style={{fontSize:18, fontWeight:'600', color:"#4d4d4d"}}>ИИН:</Text>
                        </View>
                        <View style={{marginLeft:20}}>
                            <Text style={{fontSize:18, fontWeight:'400', color:"#4d4d4d"}}>{qrInfo === ''? '': qrInfo.response.iin}</Text>
                        </View>
                    </View>
                    <View style={{width:windowWidth-80 , marginTop:10, flexDirection:'row', alignItems:'center'}}>
                        <View>
                            <Text style={{fontSize:18, fontWeight:'600', color:"#4d4d4d"}}>Гос.номер:</Text>
                        </View>
                        <View style={{marginLeft:20}}>
                            <Text style={{fontSize:18, fontWeight:'400', color:"#4d4d4d"}}>{qrInfo === ''? '': qrInfo.response.gosnomer}</Text>
                        </View>
                    </View>

                    <View style={{width:windowWidth-80 , marginTop:10}}>
                        <View>
                            <Text style={{fontSize:18, fontWeight:'600', color:"#4d4d4d"}}>Время генерации QR кода:</Text>
                        </View>
                        <View style={{marginLeft:0, marginTop:5}}>
                            <Text style={{fontSize:18, fontWeight:'400', color:"#4d4d4d"}}>{qrInfo === ''? '': qrInfo.gen_date}</Text>
                        </View>
                    </View>

                    <View style={{width:windowWidth-80 , marginTop:10}}>
                        <View>
                            <Text style={{fontSize:18, fontWeight:'600', color:"#4d4d4d"}}>Доступы:</Text>
                        </View>
                        {dostup}
                    </View>

                </View>

                <View style={{width:windowWidth-60, backgroundColor: isOtkaz === false ? '#C3FFC5' : '#FEBFBF', alignItems:'center', padding:20, marginTop:15, flexDirection:'row', justifyContent:'center', borderRadius:15}}>
                    <AntDesign name= {isOtkaz === false ? "checkcircle" : "closecircle"} size={30} color= {isOtkaz === false ? "#05A815" : "#F12525"}  />
                    <Text style={{color: isOtkaz === false ? '#05A815':'#F12525', fontSize:20, fontWeight:'500', marginLeft:15}}>{isOtkaz === false ?  'Доступ разрешен' : 'Доступ запрещен'}</Text>
                </View>

                <TouchableOpacity style={{width:windowWidth-60, height:50, alignItems:'center', justifyContent:'center', marginTop:20, borderRadius:15}} onPress={() => {setModal(false); setQrInfo(''); setScanned(false)}}>
                    <Text style={{fontSize:18, color:'#4873E1', fontWeight:'600'}}>Закрыть</Text>
                </TouchableOpacity>
            </View>
        </Modal>





        {/* <Text>QRscan</Text> */}
        <View style={{width: 290, height:290, borderWidth:5, borderColor:'#4873E1', borderRadius:36, alignItems:'center', justifyContent:'center'}}>
            <View style={styles.barcodebox}>
                <BarCodeScanner 
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScaned}
                    style={{height: 500, width: 280}}
                />
            </View>
            </View>

            <TouchableOpacity style={{width:300, height: 50, alignItems:'center', justifyContent:'center', marginTop:5}} onPress={() => navigation.goBack()}>
                <Text style={{fontSize:18, fontWeight:'600', color:'#4873E1'}}>Назад</Text>
            </TouchableOpacity>
      </View>
    )
}

const styles = StyleSheet.create({
    barcodebox: {
        // backgroundColor:'tomato',
        alignItems:'center',
        justifyContent:'center',
        height:280,
        width:280,
        overflow:'hidden',
        borderRadius:30,
    },
    dostupContainer:{
        width:"100%", 
        marginTop:0, 
        // borderWidth:0.6, 
        padding:5, 
        borderColor:'grey',
        borderBottomWidth:1, 
        borderRadius:0, 
        flexDirection:'row', 
        justifyContent:'space-between', 
        alignItems:'center'
      },
})