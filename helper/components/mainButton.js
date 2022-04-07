import React from "react"
import { Text, TouchableOpacity, View } from "react-native"
import { AuthStyle } from "../CustomStyle/AuthStyle"
 
 
export const MainButton = ({text,onPress,viewStyle, disabled, textStyle}) =>{
    return (
        <TouchableOpacity onPress={onPress}>
            <View style = {[AuthStyle.mainButtonContainer, viewStyle, {opacity: disabled ? 0.5: 1.0}]}>
                <Text style = {[AuthStyle.mainButtonText, textStyle]}>{text}</Text>
            </View>
        </TouchableOpacity>
    )
}