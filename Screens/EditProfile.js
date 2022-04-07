
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

const EditProfileView = ({navigation=useNavigation()}) => {
    const skills = [{id: 1, name: "Java"}, {id: 2, name: "Python"}, {id: 3, name: "Swift"}, {id: 4, name: "JavaScript"}, {id: 5, name: "iOS App Development"},
    {id: 6, name: "React-Native"}, {id: 7, name: "UI/UX Designing"}, {id: 8, name: "VS Code"}];
    const [isStudent, setIsStudent] = useState(true);
    const [ formData, setFormData ] = useState({});
    const [ skillFormData, setSkillFormData ] = useState({});
    const [ showErrorMsg, setShowErrMsg] = useState(false);
    const [ showSkillErrorMsg, setShowSkillErrMsg] = useState(false);
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
        var data = {...skillFormData};
        data[key] = value;
        setSkillFormData(data);
    };

    const validateForm = () => {
        if (Validations.FieldValidation(formData?.name) || Validations.FieldValidation(formData?.location) || Validations.FieldValidation(formData?.aboutSelf)
            || Validations.FieldValidation(formData?.highestEducation) || (formData?.skills?.count == 0)){
            setShowErrMsg(true);
        }
        else if (isStudent){
            if (Validations.FieldValidation(formData?.courseName) || Validations.FieldValidation(formData?.institute)){
                setShowErrMsg(true);
            }
            else{
                setShowErrMsg(false);
                editProfileApi();
            }
        }
        else{
            if (Validations.FieldValidation(formData?.designation) || Validations.FieldValidation(formData?.company) || Validations.FieldValidation(formData?.totalExperience)){
                setShowErrMsg(true);
            }
            else{
                setShowErrMsg(false);
                editProfileApi();
            }
        }
    };

    const validateSkillDetail = () => {
        if (Validations.FieldValidation(skillFormData?.skill)){
            setShowSkillErrMsg(true);
        }
        else{
            setShowSkillErrMsg(false);
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
            {/* <View style={{alignItems: "center", margin: 24}}>
           
                <Image 
                    source={ImagesPath.userwhiteImg}
                    style={{width:80, height: 80, borderRadius: 40}}
                />
                
                <TouchableOpacity style={{alignItems: "center", marginLeft: 40, marginTop: -30, width: 30, height: 30, borderRadius: 15, borderWidth: 1, borderColor: color.buttonColor}} onPress={() => navigation.navigate("EditProfile")}>
                    <Image 
                        source={ImagesPath.cameraImg}
                        style={{height: 16, width: 16, tintColor: color.buttonColor}}
                    />
                </TouchableOpacity>
           </View> */}
        <ScrollView style={CustomStyling.curveViewStyle}>
            <View style={{alignItems: "center", marginBottom: 24}}>
                {/* <Image 
                    source={ImagesPath.userwhiteImg}
                    style={{width:120, height: 120, borderRadius: 60, borderWidth: 1, borderColor: color.mainColor}}
                />    */}
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
                <TouchableOpacity style={{alignItems: "center", justifyContent: "center", marginLeft: 85, marginTop: -40, width: 30, height: 30, borderRadius: 15, borderWidth: 1, borderColor: color.buttonColor, backgroundColor: color.white}} onPress={() => setShowPicker(true)}>
                    <Image 
                        source={ImagesPath.cameraImg}
                        style={{height: 16, width: 16, tintColor: color.buttonColor}}
                    />
                </TouchableOpacity>
            </View>

            <CustomTextField 
                pickerLabel="Full Name"
                placeholder={"Enter Full Name"}
                defaultValue={formData?.name}
                onTextChange={(val) => onTextChange("name", val)}
                showError={showErrorMsg && FieldValidation(formData?.name)}
                errorText={EmptyFieldStr("full name")}
            />
            <View style={{width: '100%', flexDirection: "row", marginBottom: 24}}>
                <TouchableOpacity style={{ width: "50%", flexDirection: "row", alignItems: "center"}} onPress={() => setIsStudent(true)}>
                    <Image 
                        source={(isStudent) ? ImagesPath.radioBtnOnImg : ImagesPath.radioBtnOffImg}
                        style={{height: 16, width: 16, tintColor: color.buttonColor}}
                    />
                    <Text style={[CustomStyling.medium16Text, {marginLeft: 4}]}>Student</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ width: "50%", flexDirection: "row", alignItems: "center"}} onPress={() => setIsStudent(false)}>
                    <Image 
                        source={(!isStudent) ? ImagesPath.radioBtnOnImg : ImagesPath.radioBtnOffImg}
                        style={{height: 16, width: 16, tintColor: color.buttonColor}}
                    />
                    <Text style={[CustomStyling.medium16Text, {marginLeft: 4}]}>Professional</Text>
                </TouchableOpacity>
            </View>
            {(isStudent) ?
                <View> 
                    <CustomTextField 
                        pickerLabel="Degree/Course Name"
                        placeholder={"Enter Degree Name"}
                        defaultValue={formData?.courseName}
                        onTextChange={(val) => onTextChange("courseName", val)}
                        showError={showErrorMsg && FieldValidation(formData?.courseName)}
                        errorText={EmptyFieldStr("course name")}
                    />
                    <CustomTextField 
                        pickerLabel="Institute Name"
                        placeholder={"Enter Institute Name"}
                        defaultValue={formData?.institute}
                        onTextChange={(val) => onTextChange("institute", val)}
                        showError={showErrorMsg && FieldValidation(formData?.institute)}
                        errorText={EmptyFieldStr("institute name")}
                    />
                </View>
                :
                <View> 
                    <CustomTextField 
                        pickerLabel="Designation"
                        placeholder={"Enter Designation"}
                        defaultValue={formData?.designation}
                        onTextChange={(val) => onTextChange("designation", val)}
                        showError={showErrorMsg && FieldValidation(formData?.designation)}
                        errorText={EmptyFieldStr("designation")}
                    />
                    <CustomTextField 
                        pickerLabel="Company Name"
                        placeholder={"Enter Company Name"}
                        defaultValue={formData?.company}
                        onTextChange={(val) => onTextChange("company", val)}
                        showError={showErrorMsg && FieldValidation(formData?.company)}
                        errorText={EmptyFieldStr("comapny name")}
                    />
                    <CustomTextField 
                        pickerLabel="Total Experience"
                        placeholder={"Enter Total Experience"}
                        defaultValue={formData?.totalExperience}
                        onTextChange={(val) => onTextChange("totalExperience", val)}
                        showError={showErrorMsg && FieldValidation(formData?.totalExperience)}
                        errorText={EmptyFieldStr("total experience")}
                    />
                </View>
            }
            <CustomTextField 
                pickerLabel="Your Location"
                placeholder={"Enter your  Location"}
                defaultValue={formData?.location}
                onTextChange={(val) => onTextChange("location", val)}
                showError={showErrorMsg && FieldValidation(formData?.location)}
                errorText={EmptyFieldStr("your location")}
            />
            <CustomTextField 
                pickerLabel="About Yourself"
                placeholder={"Enter something about yourself"}
                defaultValue={formData?.aboutSelf}
                textInputMultiline={true}
                viewStyle={{height: 120}}
                textInputStyle={{height: 110}}
                onTextChange={(val) => onTextChange("aboutSelf", val)}
                showError={showErrorMsg && FieldValidation(formData?.aboutSelf)}
                errorText={EmptyFieldStr("something about yourself")}
            />
            <Text style={CustomStyling.medium16Text}>Your Skills</Text>
                <View style={{flexDirection: "row", flexWrap: "wrap", marginTop: 8, width: "100%", marginBottom: 24 }}>
                {skills.map((item, index) => ( 
                    <View style={{zIndex: 100, marginRight: 12}}  key={index}>
                        <TouchableOpacity style={{zIndex: 110, alignSelf: "flex-end"}} onPress={() => navigation.navigate("EditProfile")}>
                            <Image 
                                source={ImagesPath.cancelImg}
                                style={{height: 20, width: 20, borderRadius: 10, tintColor: color.buttonColor, resizeMode: "contain", zIndex: 1200, backgroundColor: color.white}}
                            />
                        </TouchableOpacity>
                        <View style={{borderRadius: 12, backgroundColor: color.white, paddingHorizontal: 8, paddingVertical: 4, marginBottom: 4, marginTop: -10, borderWidth: 1, zIndex: 80}}>
                            <Text style={[CustomStyling.regular16Text]}>{item.name}</Text>
                        </View>
                    </View>
                ))}
                </View>
            <CustomTextField 
                pickerLabel="Add Skill"
                placeholder={"Enter skill"}
                defaultValue={skillFormData?.skill}
                rightImagePath={ImagesPath.addImg}
                onRightImgClick={() => validateSkillDetail()}
                onTextChange={(val) => onDetailTextChange("skill", val)}
                showError={showSkillErrorMsg && FieldValidation(skillFormData?.skill)}
                errorText={EmptyFieldStr("skill")}
            />
            <CustomTextField 
                pickerLabel="Highest Education"
                placeholder={"Enter highest education"}
                defaultValue={formData.highestEducation}
                onTextChange={(val) => onTextChange("highestEducation", val)}
                showError={showErrorMsg && FieldValidation(formData?.highestEducation)}
                errorText={EmptyFieldStr("highest education")}
            />
            <ClickabletextField 
                pickerLabel="Upload Resume"
                placeholder={"Upload Resume"}
                defaultValue={""}
                rightImagePath={ImagesPath.attachmentImg}
                // containerStyle={{marginBottom: 80}}
            />
            <MainButton
                text={"Update"}
                viewStyle={{marginBottom: 80}}
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

export default EditProfileView;