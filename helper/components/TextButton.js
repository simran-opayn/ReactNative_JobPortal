import React from "react"
import { Text, TouchableOpacity, View } from "react-native"
import { color } from "../Common/Colors"
import { AuthStyle } from "../CustomStyle/AuthStyle"
 
 
export const TextButton = (
    {
        text,
        onPress,
        viewStyle,
        textStyle,
        showUnderLine
    }) =>{
    return (
        <TouchableOpacity onPress={onPress} style={viewStyle}>
            <Text style = {[AuthStyle.textButtonText, textStyle]}>{text}</Text>
            {(showUnderLine) ? <View style={{height: 3, width: "80%", marginTop: 4, borderRadius: 2, backgroundColor: color.white, alignSelf: "center"}}></View> : null}
        </TouchableOpacity>
    )
}