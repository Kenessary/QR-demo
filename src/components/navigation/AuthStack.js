import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from '../../screens'

const Stack = createNativeStackNavigator()

const AuthStack = () => {
    return(
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="LoginScreen" component={LoginScreen} options={{customAnimationOnGesture:false}}/>
        </Stack.Navigator>
    )
}
export default AuthStack
