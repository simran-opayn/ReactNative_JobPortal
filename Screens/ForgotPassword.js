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

const ForgotPasswordView = ({navigation=useNavigation()}) => {
    const [showErrorMsg, setShowErrMsg] = useState(false);

    const loginValidationSchema = yup.object().shape({
        email: yup
          .string()
          .email("Please enter valid email")
          .required('Please enter email'),
    });

    useEffect(() => {
        setShowErrMsg(false);
    }, []); 

    return(
        <Formik
            validationSchema={loginValidationSchema}
            initialValues={{ email: '' }}
            onSubmit={values => {
                navigation.navigate("SetPassword");
            }}
        >
        {({handleChange, handleBlur, handleSubmit, values, errors, isValid,}) => (
            <View style={{backgroundColor: color.mainColor, flex: 1}}>
                <Text style={[AuthStyle.viewTitle]}>Forgot Password</Text>
                <ScrollView style={[CustomStyling.curveViewStyle, {marginTop: 40}]}>
                    <Text style={[AuthStyle.viewSubTitile, {marginTop: 40, marginBottom: 60, fontSize: 16}]}>Enter the email associated with your account and we'll send an email with 4-digit code to reset your password.</Text>
                    <CustomTextField 
                        pickerLabel="Email"
                        placeholder={"Enter email"}
                        defaultValue={""}
                        onTextChange={handleChange("email")}
                        errorText={errors.email}
                        showError={showErrorMsg && errors.email}
                    />
                    <MainButton 
                        text={"Submit"}
                        onPress={() => {(isValid) ? handleSubmit() : setShowErrMsg(true);}}
                    />
                </ScrollView>
            </View>
        )}
    </Formik>
    );

};

export default ForgotPasswordView;