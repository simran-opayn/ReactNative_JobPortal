import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import * as yup from 'yup';
import { ScrollView, Text, Image, View, TouchableOpacity } from 'react-native';
import ImagesPath from "../assets/Icons/ImagesPath";
import { color } from "../helper/Common/Colors";
import ClickabletextField from "../helper/components/ClickableTextField";
import CustomTextField from "../helper/components/CustomTextField";
import { MainButton } from "../helper/components/mainButton";
import { CustomStyling } from "../helper/CustomStyle/CustomStyling";

const ApplyJobView = ({navigation=useNavigation()}) => {
    const [showErrorMsg, setShowErrMsg] = useState(false);
    const [isStudent, setIsStudent] = useState(true);
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

    const formValidationSchema = yup.object().shape({
        isStudent: yup.boolean(),
        name: yup
            .string()
            .required('Please enter name'),
        email: yup
            .string()
            .email("Please enter valid email")
            .required('Please enter email'),
        contactNumber: yup
            .string()
            .matches(phoneRegExp, 'Please enter a valid phone number')
            .required('Please enter phone number'),
        courseName: yup
            .string()
            .when('isStudent', {
                is: true,
                then: yup.string().required('Please enter course name')
            }),
        instituteName: yup
            .string()
            .when('isStudent', {
                is: true,
                then: yup.string().required('Please enter institute name')
              }),
        position: yup
            .string()
            .when('isStudent', {
                is: false,
                then: yup.string().required('Please enter current position')
            }),
        company: yup
            .string()
            .when('isStudent', {
                is: false,
                then: yup.string().required('Please enter current company name')
            }),
        salary: yup
            .string()
            .when('isStudent', {
                is: false,
                then: yup.string().required('Please enter current salary')
            }),
        experience: yup
            .string()
            .when('isStudent', {
                is: false,
                then: yup.string().required('Please enter total experience')
            }),
        resumeTitle: yup
            .string()
            .required('Please upload resume'),
    });

    useEffect(() => {
        setShowErrMsg(false);
    }, []); 

    return(
        <Formik
            validationSchema={formValidationSchema}
            initialValues={{ name: '', email: '', contactNumber: '', courseName: '', instituteName: '', position: '', company: '',
                                salary: '', experience: '', resumeTitle: 'MyResume.pdf', hireDescription: '', isStudent: isStudent }}
            onSubmit={values => {
                navigation.goBack();
            }}
        >
            {({handleChange, handleBlur, handleSubmit, values, errors, isValid, setFieldValue}) => (
                <View style={{backgroundColor: color.mainColor, flex: 1}}>
                    
                    <ScrollView style={CustomStyling.curveViewStyle}>
                        <CustomTextField 
                            pickerLabel="Name"
                            placeholder={"Enter Name"}
                            defaultValue={values.name}
                            onTextChange={handleChange("name")}
                            showError={showErrorMsg && errors.name}
                            errorText={errors.name}
                        />
                        <CustomTextField 
                            pickerLabel="Email"
                            placeholder={"Enter Email"}
                            defaultValue={values.email}
                            onTextChange={handleChange("email")}
                            showError={showErrorMsg && errors.email}
                            errorText={errors.email}
                        />
                        <CustomTextField 
                            pickerLabel="Contact Number"
                            placeholder={"Enter Contact Number"}
                            defaultValue={values.contactNumber}
                            onTextChange={handleChange("contactNumber")}
                            showError={showErrorMsg && errors.contactNumber}
                            errorText={errors.contactNumber}
                        />
                        <View style={{width: '100%', flexDirection: "row", marginBottom: 24}}>
                            <TouchableOpacity style={{ width: "50%", flexDirection: "row", alignItems: "center"}} onPress={() => { setIsStudent(true); setFieldValue("isStudent", true) }}>
                                <Image 
                                    source={(isStudent) ? ImagesPath.radioBtnOnImg : ImagesPath.radioBtnOffImg}
                                    style={{height: 16, width: 16, tintColor: color.buttonColor}}
                                />
                                <Text style={[CustomStyling.medium16Text, {marginLeft: 4}]}>Student</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ width: "50%", flexDirection: "row", alignItems: "center"}} onPress={() => { setIsStudent(false); setFieldValue("isStudent", false) }}>
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
                                    defaultValue={values.courseName}
                                    onTextChange={handleChange("courseName")}
                                    showError={showErrorMsg && errors.courseName}
                                    errorText={errors.courseName}
                                />
                                <CustomTextField 
                                    pickerLabel="Institute Name"
                                    placeholder={"Enter Institute Name"}
                                    defaultValue={values.instituteName}
                                    onTextChange={handleChange("instituteName")}
                                    showError={showErrorMsg && errors.instituteName}
                                    errorText={errors.instituteName}
                                />
                            </View>
                            :
                            <View>
                                <CustomTextField 
                                    pickerLabel="Current Position"
                                    placeholder={"Enter Current Position"}
                                    defaultValue={values.position}
                                    onTextChange={handleChange("position")}
                                    showError={showErrorMsg && errors.position}
                                    errorText={errors.position}
                                />
                                <CustomTextField 
                                    pickerLabel="Current Company"
                                    placeholder={"Enter Current company"}
                                    defaultValue={values.company}
                                    onTextChange={handleChange("company")}
                                    showError={showErrorMsg && errors.company}
                                    errorText={errors.company}
                                />
                                <CustomTextField 
                                    pickerLabel="Current Salary"
                                    placeholder={"Enter Current Salary"}
                                    defaultValue={values.salary}
                                    onTextChange={handleChange("salary")}
                                    showError={showErrorMsg && errors.salary}
                                    errorText={errors.salary}
                                />
                                <CustomTextField 
                                    pickerLabel="Total Experience"
                                    placeholder={"Enter Total Experience"}
                                    defaultValue={values.experience}
                                    onTextChange={handleChange("experience")}
                                    showError={showErrorMsg && errors.experience}
                                    errorText={errors.experience}
                                />
                            </View>
                        }   
                        <ClickabletextField 
                            pickerLabel="Upload Resume"
                            placeholder={"Upload Resume"}
                            value={values.resumeTitle}
                            onTouch={handleChange("resumeTitle")}
                            showError={showErrorMsg && errors.resumeTitle}
                            errorText={errors.resumeTitle}
                            rightImagePath={ImagesPath.attachmentImg}
                        />
                        <CustomTextField 
                            pickerLabel="Why we hire you?"
                            placeholder={"Enter description about how you are perfect for this role."}
                            defaultValue={values.hireDescription}
                            onTextChange={handleChange("hireDescription")}
                            textInputMultiline={true}
                            viewStyle={{height: 120}}
                            textInputStyle={{height: 110}}
                        />
                        
                        <MainButton
                            text={"Submit"}
                            viewStyle={{marginBottom: 48}}
                            onPress={() => {
                                (isValid) ? handleSubmit() : setShowErrMsg(true);
                            }}
                        />
                        
                    </ScrollView>
                </View>
            )}
        </Formik>
    );

};

export default ApplyJobView;