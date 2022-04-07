import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { ScrollView, Text, Image, View, TouchableOpacity } from 'react-native';
import ImagesPath from "../assets/Icons/ImagesPath";
import { color } from "../helper/Common/Colors";
import Validations, { EmptyFieldStr, FieldValidation } from "../helper/Common/Validations";
import ClickabletextField from "../helper/components/ClickableTextField";
import CustomTextField from "../helper/components/CustomTextField";
import { MainButton } from "../helper/components/mainButton";
import { CustomStyling } from "../helper/CustomStyle/CustomStyling";
import ImagePicker from "react-native-image-crop-picker";
import PopUpModal from "../helper/components/PopUpModal";

const EditCompanyProfileView = ({navigation=useNavigation()}) => {
    const CompanyLocations = [{id: 1, name: "Ludhiana, Punjab"}, {id: 2, name: "Chandigarh"}, {id: 3, name: "Mohali"}, {id: 4, name: "Noida"}];
    const CompanyImages = [{id: 1, name: ImagesPath.activeUserImg}, {id: 2, name: ImagesPath.activeUserImg}, {id: 3, name: ImagesPath.activeUserImg}, {id: 4, name: ImagesPath.activeUserImg}];
    const [ formData, setFormData ] = useState({});
    const [ officeFormData, setOfficeFormData ] = useState({});
    const [ showErrorMsg, setShowErrMsg] = useState(false);
    const [ showLocationErrorMsg, setShowLocationErrMsg] = useState(false);
    const [showPickerModal, setShowPicker] = useState(false);
    const [selectdImageData, setSelectedImgData] = useState({});

    const editProfileApi = () => {
        navigation.goBack();
    };

    const onTextChange = (key, value) => {
        var data = {...formData};
        data[key] = value;
        setFormData(data);
    };
    const onDetailTextChange = (key, value) => {
        var data = {...officeFormData};
        data[key] = value;
        setOfficeFormData(data);
    };

    const validateForm = () => {
        if (Validations.FieldValidation(formData?.name) || Validations.FieldValidation(formData?.category) || Validations.FieldValidation(formData?.headOfficeLocation)
            || Validations.FieldValidation(formData?.aboutCompany) || (formData?.CompanyLocations?.count == 0)){
            setShowErrMsg(true);
        }
        else{
            setShowErrMsg(false);
            editProfileApi();
        }
    };

    const validateOfficeDetail = () => {
        if (Validations.FieldValidation(officeFormData?.location) || Validations.FieldValidation(formData?.number)){
            setShowLocationErrMsg(true);
        }
        else{
            setShowLocationErrMsg(false);
        }
    };

    const openImagePicker = () => {
        ImagePicker.openPicker({
            cropping: true,
            includeBase64: true,
        })
        .then((ImgData) => {
            setShowPicker(false);
            console.log(ImgData);
            setSelectedImgData({ uri: ImgData.path,
            type: 'image/jpeg',
            name: strings.uniqueFileName+".jpeg",});
            console.log(selectdImageData.uri);
        })
        .catch((error) => {     
            setShowPicker(false);
        });
       
    };
    
    const openCamera = () => {
        ImagePicker.openCamera({
            cropping: true,
            includeBase64: true,
        })
        .then((ImgData) => {
            setShowPicker(false);
            setSelectedImgData({ uri: ImgData.path,
            type: 'image/jpeg',
            name: strings.uniqueFileName+".jpeg",}
            );  
        })
        .catch((error) => {
            setShowPicker(false);
        });
    };

    return(
        <View style={{backgroundColor: color.mainColor, flex: 1}}>
            
        <ScrollView style={CustomStyling.curveViewStyle}>
            <View style={{alignItems: "center", marginBottom: 24}}>
                {/* <Image 
                    source={ImagesPath.userwhiteImg}
                    style={{width:120, height: 120, borderRadius: 60, borderWidth: 1, borderColor: color.mainColor}}
                />               */}
                { (selectdImageData?.uri != null || selectdImageData?.uri != undefined) ?
                    (<Image 
                        source={{
                            uri: selectdImageData.uri,
                            //method: 'GET'
                        }}
                        style={{width:120, height: 120, borderRadius: 60, borderWidth: 1, borderColor: color.mainColor}}
                    />) :
                    (<Image 
                        source={ImagesPath.userwhiteImg}
                        style={{width:120, height: 120, borderRadius: 60, borderWidth: 1, borderColor: color.mainColor}}
                    />)
                //   )
                }   
                <TouchableOpacity style={{alignItems: "center", justifyContent: "center", marginLeft: 85, marginTop: -40, width: 30, height: 30, borderRadius: 15, borderWidth: 1, borderColor: color.buttonColor, backgroundColor: color.white}} onPress={() => navigation.navigate("EditProfile")}>
                    <Image 
                        source={ImagesPath.cameraImg}
                        style={{height: 16, width: 16, tintColor: color.buttonColor}}
                    />
                </TouchableOpacity>
            </View>

            <CustomTextField 
                pickerLabel="Company Name"
                placeholder={"Enter Company Name"}
                defaultValue={formData?.name}
                onTextChange={(val) => onTextChange("name", val)}
                showError={showErrorMsg && FieldValidation(formData?.name)}
                errorText={EmptyFieldStr("comapny name")}
            />
            
            <CustomTextField 
                pickerLabel="Company Category"
                placeholder={"Enter Company Category"}
                defaultValue={formData?.category}
                onTextChange={(val) => onTextChange("category", val)}
                showError={showErrorMsg && FieldValidation(formData?.category)}
                errorText={EmptyFieldStr("comapny category")}
            />
            
            <CustomTextField 
                pickerLabel="Head Office Location"
                placeholder={"Enter Head Office  Location"}
                defaultValue={formData?.headOfficeLocation}
                onTextChange={(val) => onTextChange("headOfficeLocation", val)}
                showError={showErrorMsg && FieldValidation(formData?.headOfficeLocation)}
                errorText={EmptyFieldStr("head office location")}
            />
            <CustomTextField 
                pickerLabel="About Company"
                placeholder={"Enter something about company"}
                defaultValue={formData?.aboutCompany}
                textInputMultiline={true}
                viewStyle={{height: 120}}
                textInputStyle={{height: 110}}
                onTextChange={(val) => onTextChange("aboutCompany", val)}
                showError={showErrorMsg && FieldValidation(formData?.aboutCompany)}
                errorText={EmptyFieldStr("comapny detail")}
            />
            <Text style={CustomStyling.medium16Text}>Company Portfolio</Text>
            <ScrollView style={{flexDirection: "row", marginTop: 8, width: "100%", marginBottom: 24 }} horizontal>
                {CompanyImages.map((item, index) => ( 
                    <View style={{zIndex: 100}}  key={index}>
                        <TouchableOpacity style={{zIndex: 110, alignSelf: "flex-end"}} onPress={() => navigation.navigate("EditProfile")}>
                            <Image 
                                source={ImagesPath.cancelImg}
                                style={{height: 20, width: 20, borderRadius: 10, tintColor: color.buttonColor, resizeMode: "contain", zIndex: 1200, backgroundColor: color.white}}
                            />
                        </TouchableOpacity>
                        <View style={{zIndex: 50, paddingHorizontal: 8, marginTop: -8, width: 140}}>
                                <Image 
                                    source={item.name}
                                    style={{width: "100%", height: 120, resizeMode: "contain", borderRadius: 12, borderWidth: 1, backgroundColor: color.white}}
                                />
                            </View>
                    </View>
                ))}
            </ScrollView>
            <ClickabletextField 
                pickerLabel="Upload Image"
                placeholder={"Upload Image"}
                defaultValue={""}
                rightImagePath={ImagesPath.attachmentImg}
            />
            <Text style={CustomStyling.medium16Text}>Company Locations</Text>
            <ScrollView style={{marginTop: 4, width: "100%", marginBottom: 24 }}>
                {CompanyLocations.map((item, index) => ( 
                    <View style={{zIndex: 100, marginVertical: 4}}  key={index}>
                        <TouchableOpacity style={{zIndex: 110, alignSelf: "flex-end"}} onPress={() => navigation.navigate("EditProfile")} key={index}>
                            <Image 
                                source={ImagesPath.cancelImg}
                                style={{height: 20, width: 20, borderRadius: 10, tintColor: color.buttonColor, resizeMode: "contain", zIndex: 1200, backgroundColor: color.white}}
                            />
                        </TouchableOpacity>
                        <View style={{zIndex: 50, paddingHorizontal: 8, marginTop: -8, borderRadius: 8, borderWidth: 1}}>
                        <View style={{flexDirection: "row", paddingVertical: 4, marginVertical: 4, alignItems: "center"}}>
                            <Image 
                                source={ImagesPath.locationImg}
                                style={{width: 14, height: 14, tintColor: color.buttonColor, resizeMode: "contain"}}
                            />
                            <Text style={[CustomStyling.regular16Text]}>{item.name}</Text>
                        </View>
                        <View style={{flexDirection: "row", marginBottom: 8, alignItems: "center"}}>
                            <Image 
                                source={ImagesPath.phoneImg}
                                style={{width: 14, height: 14, tintColor: color.buttonColor, resizeMode: "contain"}}
                            />
                            <Text style={[CustomStyling.regular16Text]}>+91-8794561263</Text>
                        </View>
                        </View>
                    </View>
                ))}
            </ScrollView>
            <Text style={[CustomStyling.medium16Text, {marginBottom: 8}]}>Add Office Details</Text>

            <View style={{ padding: 16, borderRadius: 16, borderWidth: 1}}>
                <CustomTextField 
                    pickerLabel="Office Location"
                    placeholder={"Enter Office Location"}
                    defaultValue={officeFormData?.location}
                    onTextChange={(val) => onDetailTextChange("location", val)}
                    showError={showErrorMsg && FieldValidation(officeFormData?.location)}
                    errorText={EmptyFieldStr("office location")}
                />
                <CustomTextField 
                    pickerLabel="Office Contact Number"
                    placeholder={"Enter Office Contact Number"}
                    defaultValue={officeFormData?.number}
                    onTextChange={(val) => onDetailTextChange("number", val)}
                    showError={showErrorMsg && FieldValidation(officeFormData?.number)}
                    errorText={EmptyFieldStr("office contact number")}
                />
                <MainButton
                    text={"Add"}
                    viewStyle={{marginTop: 0}}
                    onPress={() => validateOfficeDetail()}
                />
            </View>
            <MainButton
                text={"Update"}
                viewStyle={{marginBottom: 48}}
                onPress={() => validateForm()}
            />
            
        </ScrollView>
        {showPickerModal && (
            <PopUpModal
            onPressCamera={openCamera}
            onPressGallery={openImagePicker}
            onPressCancel={() => setShowPicker(false)}
            />
        )}
       </View>
    );

};

export default EditCompanyProfileView;