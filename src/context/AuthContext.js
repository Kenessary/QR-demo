import React, { createContext, useContext, useEffect, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"
import qs from "qs"

export const AuthContext = createContext(null)

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(false)
    const [iin, setIin] = useState('')
    const [fio, setFio] = useState('')
    const [dostupy, setDostupy] = useState('')
    const [gosnomer, setGosnomer] = useState('')
    const [userInfo, setUserInfo] = useState('')

    const login = async(login, password) => {
        setIsLoading(true)
        const config = {
            method: 'get',
            url: `http://95.57.218.120/?apitest.sagyzlogin={"login":"${login}","password":${password}}`,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
            // data : data  
        }
        axios(config)
        .then(async function(response){
            let user = response.data.replace(/<[^>]*>/g, '').replace(/-->/g, '')
            let parsed_user = JSON.parse(user)
            setUserInfo(parsed_user)
            AsyncStorage.setItem('info_user',JSON.stringify(parsed_user))
            let iin = parsed_user.response.iin
            let fio = parsed_user.response.fio
            let dostupy = parsed_user.response.dostupy
            let gosnomer = parsed_user.response.gosnomer
            // AsyncStorage.setItem('iin_fio', JSON.stringify(fio) )
            // AsyncStorage.setItem('iin_dostupy', JSON.stringify(dostupy))
            // console.log(dostupy)
            if(iin !== undefined){
                setIin(iin)
                setFio(fio)
                setDostupy(dostupy)
                setGosnomer(gosnomer)
                AsyncStorage.setItem('iin_user', iin)
                AsyncStorage.setItem('fio_user', fio)
                AsyncStorage.setItem('gosnomer_user', gosnomer)
                AsyncStorage.setItem('dostupy_user', JSON.stringify(dostupy))
            }  
            setIsLoading(false)
        })
        .catch(function(error){
            console.log(error)
            setIsLoading(false)
        })  
    }

    const logout = () =>{
        setIsLoading(true)
        setIin(null)
        AsyncStorage.removeItem('iin_user')
        AsyncStorage.removeItem('fio_user')
        AsyncStorage.removeItem('dostupy_user')
        AsyncStorage.removeItem('gosnomer_user')
        setUserInfo(undefined)
        AsyncStorage.removeItem('info_user')
        setIsLoading(false)
    }

    const isLoggedIn = async() => {
        try {
            setIsLoading(true)
            let useriin = await AsyncStorage.getItem('iin_user')
            let userfio = await AsyncStorage.getItem('fio_user')
            let userdostupy = await AsyncStorage.getItem('dostupy_user')
            let usergosnomer = await AsyncStorage.getItem('gosnomer_user')
            setIin(useriin)
            setFio(userfio)
            setGosnomer(usergosnomer)
            setDostupy(JSON.parse(userdostupy))
            let userInfo = await AsyncStorage.getItem('info_user')
            setUserInfo(JSON.parse(userInfo))
            setIsLoading(false)
        } catch(e){
            console.log(e)
        }
    }

    useEffect(() => {
        isLoggedIn() 
     }, [])


    return(
        <AuthContext.Provider value={{login, iin, fio, dostupy, gosnomer, isLoading, userInfo, logout}}>
            {children}
        </AuthContext.Provider>
        )
}
