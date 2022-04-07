import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { Formik } from 'formik'

import Colors, { color } from "../Common/Colors";
import fonts from "../Common/fonts";
import { CustomStyling } from "../CustomStyle/CustomStyling";
import ImagesPath from "../../assets/Icons/ImagesPath";

const CustomTextField = ({
  containerStyle,
  viewStyle,
  textInputStyle,
  textInputMultiline,
  textInputLines,
  leftImagePath,
  rightImagePath,
  defaultValue,
  isPasswordField,
  value,
  placeholder,
  editable,
  keyboardType,
  showError,
  errorText,
  onTextChange = () => {},
  onRightImgClick = () => {},
  onBlur = () => {},
  pickerLabel,
  pickerLabelStyle,
}) => {
  const [hidePswrdText, setHidePswrdText] = useState(true);
  const [textValue, setTextValue] = useState(defaultValue);
  const showErrMsg = showError;//(showError == pickerLabel) ? true : false;
  return (
    <View style={[{ marginBottom: 24,}, containerStyle]}>
      <Text style={[styles.titleLabel, pickerLabelStyle]}> 
                {pickerLabel} 
      </Text>
    <View style={[styles.container, viewStyle, {borderColor: showErrMsg ? color.darkRed : Colors.color.lightGray}]}>
        {/* {(textValue != "" && textValue != undefined) ? <View style={{ marginLeft: 12,
            marginTop: -8, alignItems: "baseline"}}>
              <Text style={[styles.LabelStyle, pickerLabelStyle]}> 
                {pickerLabel} 
              </Text>
          </View> : null} */}

        <View style={{ paddingHorizontal: 8, marginTop: (textValue != "" && textValue != undefined) ? 4 : 4, flexDirection: "row", justifyContent: "center", width: '100%'}}>
            {(leftImagePath != null) ? <View style={CustomStyling.fieldSubView}><Image source={leftImagePath}
                style={CustomStyling.fieldImage}/> 
                </View>: null
            }
            <TextInput
                style={[CustomStyling.fieldText, {width: (leftImagePath != null) ? ((isPasswordField || (rightImagePath != null)) ? '80%' : '90%') : ((isPasswordField || (rightImagePath != null)) ? '90%' : '100%')}, textInputStyle]}
                multiline={textInputMultiline}
                numberOfLines={textInputLines}
                placeholder={placeholder}
                onChangeText = {val => {onTextChange(val);
                    setTextValue(val);
                    onBlur(val);
                }}
                editable={editable}
                keyboardType={keyboardType}
                defaultValue={defaultValue}
                value={value}
                //onBlur={e => onBlur()}
                secureTextEntry={(isPasswordField) ? hidePswrdText : false}
                color={color.subtitleBlack}
                placeholderTextColor={color.lightGray}
                textAlignVertical="top"                
            />
                
          {(isPasswordField) ? <TouchableOpacity onPress={() => setHidePswrdText(!hidePswrdText)} style={CustomStyling.fieldSubView}>
              <Image source={hidePswrdText ? ImagesPath.eyeImg : ImagesPath.slashEyeImg}
                style={CustomStyling.passwordImage}/>
           </TouchableOpacity> : null}

           {(rightImagePath != null) ? <TouchableOpacity style={CustomStyling.fieldSubView} onPress={() => onRightImgClick()}>
              <Image source={rightImagePath}
                style={CustomStyling.fieldImage}/> 
              </TouchableOpacity>: null
            }
      </View>
    </View>
   {(showErrMsg) ? <Text style={CustomStyling.ErrorText}>{errorText}</Text>:null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // elevation: 1,
   // width: '19%',
    // zIndex: 1000,
    height: 50, 
    backgroundColor: color.textfieldGray,
    borderWidth:0, 
    borderColor: Colors.color.lightGray, 
    borderRadius: 8, 
  },
  LabelStyle: {
    fontSize: 12,
    fontFamily: fonts.medium,
    color: color.titleBlack,
    
    backgroundColor: color.white,
  },
  titleLabel:{
    fontSize: 16,
    fontFamily: fonts.medium,
    color: color.titleBlack,
    marginBottom: 8
  }
});

export default CustomTextField;
