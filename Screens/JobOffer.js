import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { ScrollView, Text, Image, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import ImagesPath from "../assets/Icons/ImagesPath";
import { color } from "../helper/Common/Colors";
import fonts from "../helper/Common/fonts";
import { strings } from "../helper/Common/String";
import ClickabletextField from "../helper/components/ClickableTextField";
import CustomTextField from "../helper/components/CustomTextField";
import DropDownPicker from "../helper/components/DropDownPicker";
import { MainButton } from "../helper/components/mainButton";
import { TextButton } from "../helper/components/TextButton";
import { AuthStyle } from "../helper/CustomStyle/AuthStyle";
import { CustomStyling } from "../helper/CustomStyle/CustomStyling";

const JobOfferView = ({navigation=useNavigation()}) => {
    const CompanyLocations = [{id: 1, name: "Ludhiana, Punjab"}, {id: 2, name: "Chandigarh"}, {id: 3, name: "Mohali"}, {id: 4, name: "Noida"}];
    const JobTypes = [{id: 1, name: "Full-Time"}, {id: 2, name: "Part-Time"}, {id: 3, name: "Internship"}];
    const JobPositions = [{id: 1, name: "Entry-Level"}, {id: 2, name: "Junior"}, {id: 3, name: "Senior"}];
    const [formData, setFormData] = useState({});

    const onTextChange = (key, value) => {
        var data = {...formData};
        data[key] = value;
        setFormData(data);
      };
    return(
        <View style={{backgroundColor: color.mainColor, flex: 1}}>
            
        <ScrollView style={CustomStyling.curveViewStyle}>
            <CustomTextField 
                pickerLabel="Job Name"
                placeholder={"Enter Job Name"}
                defaultValue={""}
            />
    
            <DropDownPicker
                pickerLabel="Job Type"
                pickerPlaceholder={"Select Job Type"}
                value={formData?.jobType}
                pickerData={JobTypes}
                onSelectValue={(val) => onTextChange("jobType", val)}
                containerStyle={{zIndex: 200}}
            />
            
            <DropDownPicker
                pickerLabel="Job Position"
                pickerPlaceholder={"Select Job Position"}
                value={formData?.jobPosition}
                pickerData={JobPositions}
                onSelectValue={(val) => onTextChange("jobPosition", val)}
                containerStyle={{zIndex: 180}}
            />

            <CustomTextField 
                pickerLabel="Salary"
                placeholder={"Enter Salary"}
                defaultValue={""}
            />
            
            <DropDownPicker
                pickerLabel="For Office"
                pickerPlaceholder={"Select Office"}
                value={formData?.officeBranch}
                pickerData={CompanyLocations}
                onSelectValue={(val) => onTextChange("officeBranch", val)}
                containerStyle={{zIndex: 150}}
            />
            <CustomTextField 
                pickerLabel="Requirements"
                placeholder={"Enter Requirements"}
                defaultValue={""}
                textInputMultiline={true}
                viewStyle={{height: 120}}
                textInputStyle={{height: 110}}
            />
             <CustomTextField 
                pickerLabel="Benefits"
                placeholder={"Enter Benefits"}
                defaultValue={""}
                textInputMultiline={true}
                viewStyle={{height: 120}}
                textInputStyle={{height: 110}}
            />
            <MainButton
                text={"Submit"}
                viewStyle={{marginBottom: 48}}
            />
            
        </ScrollView>
       </View>
    );

};

export default JobOfferView;