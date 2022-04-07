import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import * as yup from 'yup';
import { ScrollView, Text, View } from 'react-native';
import { color } from "../helper/Common/Colors";
import CustomTextField from "../helper/components/CustomTextField";
import { MainButton } from "../helper/components/mainButton";
import { AuthStyle } from "../helper/CustomStyle/AuthStyle";
import { CustomStyling } from "../helper/CustomStyle/CustomStyling";

const ChangePasswordView = ({navigation=useNavigation()}) => {
    const [showErrorMsg, setShowErrMsg] = useState(false);

    const ChangePasswordValidationSchema = yup.object().shape({
        currentPswrd: yup
            .string()
            .min(6, ({ min }) => `Please enter valid current password`)
            .required('Please enter current password'),
        newPassword: yup
            .string()
            .min(6, ({ min }) => `Please enter password of at least ${min} characters`)
            .required('Please enter new password'),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref('newPassword'), null], 'Please enter confirm password same as new password')
            .required('Please re-enter new password')
    });

    useEffect(() => {
        setShowErrMsg(false);
    }, []); 
      
    return(
        <Formik
            validationSchema={ChangePasswordValidationSchema}
            initialValues={{ currentPswrd: '', newPassword: '', confirmPassword: ''}}
            onSubmit={values => {
                navigation.goBack();
            }}
        >
            {({handleChange, handleBlur, handleSubmit, values, errors, isValid,}) => (
                <View style={{backgroundColor: color.mainColor, flex: 1}}>
                    <Text style={[AuthStyle.viewTitle]}>Change Password</Text>
                <ScrollView style={[CustomStyling.curveViewStyle, {marginTop: 40}]}>
                    {/* <Text style={[{marginTop: 40, marginBottom: 60}, AuthStyle.viewSubTitile]}>Please enter the 4-digit code recive by Email</Text> */}
                    <CustomTextField 
                        pickerLabel="Current Password"
                        placeholder={"Enter current password"}
                        defaultValue={""}
                        isPasswordField={true}
                        containerStyle={{marginTop: 24}}
                        onTextChange={handleChange("currentPswrd")}
                        showError={showErrorMsg && errors.currentPswrd}
                        errorText={errors.currentPswrd}
                    />
                    <CustomTextField 
                        pickerLabel="New Password"
                        placeholder={"Enter new password"}
                        defaultValue={""}
                        isPasswordField={true}
                        onTextChange={handleChange("newPassword")}
                        showError={showErrorMsg && errors.newPassword}
                        errorText={errors.newPassword}
                    />
                    <CustomTextField 
                        pickerLabel="Confirm Password"
                        placeholder={"Re-enter new password"}
                        defaultValue={""}
                        isPasswordField={true}
                        onTextChange={handleChange("confirmPassword")}
                        showError={showErrorMsg && errors.confirmPassword}
                        errorText={errors.confirmPassword}
                    />
                    <MainButton 
                        text={"Submit"}
                        onPress={() => {
                            (isValid) ? handleSubmit() : setShowErrMsg(true);
                        }}
                        // onPress={handleSubmit}
                        // disabled={!isValid}
                    />
                    
                </ScrollView>
                </View>
            )}
        </Formik>
    );

};

export default ChangePasswordView;