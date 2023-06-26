import React, { useContext, useState, useEffect } from "react"
import { NavigationContainer } from "@react-navigation/native"
import { AuthContext } from "../context/AuthContext"
import { View } from "react-native"
import { MaterialIndicator } from "react-native-indicators"

import AppStack from "./navigation/AppStack"
import AuthStack from "./navigation/AuthStack"
import AsyncStorage from "@react-native-async-storage/async-storage"


const Navigation = () => {
    const {isLoading, iin} = useContext(AuthContext)



    if(isLoading) {
        return(
            <View style={{flex: 1, justifyContent:'center', alignItems: 'center', backgroundColor:'white'}}>
                <MaterialIndicator color="#4873E1"/>
            </View>
        )
      }

    return (
        <NavigationContainer>
            {iin === null ? <AuthStack/> : <AppStack/>}
        </NavigationContainer>
    )
}

export default Navigation