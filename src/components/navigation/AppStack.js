import React, { useContext, useEffect, useState } from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { View } from "react-native"
// import { WaveIndicator } from 'react-native-indicators'
import { HomeScreen, ProfileScreen, QRscan } from "../../screens"
import { MaterialCommunityIcons } from '@expo/vector-icons';

import AsyncStorage from "@react-native-async-storage/async-storage"
import { AuthContext } from "../../context/AuthContext"

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

export default function AppStack () {
    return(
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="HomeScreen" component={BottommNavigation} options={{gestureEnabled:false}}></Stack.Screen>
            <Stack.Screen name="ProfileScreen" component={BottommNavigation}></Stack.Screen>

            <Stack.Screen name="QRscan" component={QRscan} 
            ></Stack.Screen>
        </Stack.Navigator>
    )

function BottommNavigation() {
    return(
        <Tab.Navigator 
            activeColor="#D64D43"
            labelStyle={{ fontSize: 12 }}
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: '#4873E1'
            }}
            barStyle={{ backgroundColor: 'white', borderTopWidth:0.3, borderColor:'grey'}}
        >
            <Tab.Screen 
                name="Основное" 
                component={HomeScreen}
                options={{
                    gestureEnabled:false,
                    tabBarLabel: 'QR',
                    tabBarLabelStyle: {fontSize: 13} ,
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="qrcode-scan" color={color} size={26} />),
                }}
            /> 
            <Tab.Screen 
                name="Личный кабинет" 
                component={ProfileScreen}
                options={{
                    tabBarLabel: 'Профиль',
                    tabBarLabelStyle: {fontSize: 13} ,
                    tabBarIcon: ({color }) => (
                    <MaterialCommunityIcons name="account" color={color} size={26} />
                ),
                    tabBarColor: false
                }}
            />
        </Tab.Navigator>
        )
    }
}