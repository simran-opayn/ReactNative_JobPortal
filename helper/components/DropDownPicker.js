import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Image,
} from "react-native";
import ImagesPath from "../../assets/Icons/ImagesPath";
import { color } from "../Common/Colors";
import fonts from "../Common/fonts";
import { CustomStyling } from "../CustomStyle/CustomStyling";

const DropDownPicker = ({
  pickerStyle,
  pickerPlaceholder = "",
  pickerData = [],
  selectedTextStyle,
  placeholderTextStyle,
  value,
  containerStyle,
  pickerdrop,
  nestedScroll,
  onSelectValue = () => {},
  passID = () => {},
  pickerLabel,
  pickerLabelStyle,
  showError,
  errorText,
}) => {
  const [showPicker, setShowPicker] = useState(false);
  return (
    <View style={[{ marginBottom: 24}, containerStyle]}>
      <Text style={[styles.titleLabel, pickerLabelStyle]}> {pickerLabel} </Text>
    <View style={[styles.container, {borderColor: (showError) ? color.darkRed : color.lightGray, borderBottomRightRadius: showPicker ? 0 : 8, borderBottomLeftRadius: showPicker ? 0 : 8}]}>
      <View>
      {/* {(value != "" && value != undefined) ? <View style={{ marginLeft: 4,
            marginTop: -10, alignItems: "baseline"}}>
              <Text style={[styles.LabelStyle, pickerLabelStyle]}> 
                {pickerLabel} 
              </Text>
          </View> : null} */}
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => setShowPicker(!showPicker)}
          style={[styles.pickerView, pickerStyle, {marginTop: (value != "" && value != undefined) ? 0 : 4, marginHorizontal: 8}]}
        >
          {value !== "" && (
            <Text style={[styles.selectedText, selectedTextStyle]}>
              {value}
            </Text>
          )}

          {pickerPlaceholder !== "" && (value == "" || value == undefined) && (
            <Text style={[styles.placeholderText, placeholderTextStyle]}>
              {pickerPlaceholder}
              
            </Text>
          )}

          <Image source={!showPicker ? ImagesPath.downArrowImg : ImagesPath.upArrowImg}
           style={{position: "absolute", alignSelf: "center", resizeMode: "contain", right: 8, height: 16, width: 16, tintColor: color.imageBlack}}/>
        </TouchableOpacity>
        {showPicker && (
          <View style={[styles.pickerContainer, pickerdrop]}>
            <ScrollView
              nestedScrollEnabled={nestedScroll}
              showsVerticalScrollIndicator={false}
            >
              {pickerData.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    onSelectValue(item?.name);
                    setShowPicker(false);
                    passID(item?.id);
                  }}
                  style={styles.pickerItemStyle}
                >
                  <Text style={styles.containerItemStyle}>{item?.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
      </View>
    </View>
    {(showError) ? <Text style={CustomStyling.ErrorText}>{errorText}</Text>: null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // elevation: 1,
   // width: '19%',
    // zIndex: 1000,
    height: 50,
    borderWidth: 0,
    backgroundColor: color.textfieldGray,
    borderColor: color.lightGray,
    borderRadius: 8,
    paddingHorizontal: 0,
    justifyContent: "center"
  },
  pickerView: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: -4,
    height: 40
  },
  pickerContainer: {
    width: '100%',
    height: 120,
    borderWidth: 1,
    borderColor: color.lightGray,
    // borderRadius: w(0.3),
    backgroundColor: color.textfieldGray,
    elevation: 5,
    zIndex: 1,
    position: "absolute",
    top: 45,
  },
  pickerItemStyle: {
    borderTopWidth: 1,
    borderColor: color.lightGray,
    justifyContent: "center",
    height: 40,
  },
  selectedText: {
    fontSize: 16,
    fontFamily: fonts.regular,
    color: "black",
  },
  containerItemStyle: {
    marginLeft: 10,
    color: color.black,
    //fontFamily: fonts.InterRegular,
    fontSize: 16,
  },
  placeholderText: {
    color: "darkgray",
    fontSize: 16,
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

export default DropDownPicker;
