import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import * as yup from 'yup';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { color } from "../helper/Common/Colors";
import CustomTextField from "../helper/components/CustomTextField";
import { MainButton } from "../helper/components/mainButton";
import { TextButton } from "../helper/components/TextButton";
import { AuthStyle } from "../helper/CustomStyle/AuthStyle";
import { CustomStyling } from "../helper/CustomStyle/CustomStyling";

const SignUpView = ({navigation=useNavigation()}) => {
    const [isJobSeeker, setIsJobSeeker] = useState(true);
    const [showErrorMsg, setShowErrMsg] = useState(false);

    const loginValidationSchema = yup.object().shape({
        name: yup
            .string()
            .required('Please enter name'),
        email: yup
            .string()
            .email("Please enter valid email")
            .required('Please enter email'),
        password: yup
            .string()
            .min(6, ({ min }) => `Please enter password of at least ${min} characters`)
            .required('Please enter password'),
        confirmPassword: yup
            .string()
            .required('Please re-enter password')
            .oneOf([yup.ref('password'), null], 'Please enter confirm password same as password'),
    });
  
    useEffect(() => {
        setShowErrMsg(false);
    }, []); 

    return(
        <Formik
            validationSchema={loginValidationSchema}
            initialValues={{ name: '', email: '', password: '', confirmPassword: '' }}
            onSubmit={values => {
                navigation.goBack();
            }}
        >
        {({handleChange, handleBlur, handleSubmit, values, errors, isValid,}) => (
        <View style={{backgroundColor: color.mainColor, flex: 1}}>
            <Text style={AuthStyle.viewTitle}>Signup</Text>
            <View style={{flexDirection: "row", marginTop: 40, marginBottom: 8, marginHorizontal: 40}}>
                <View style={{width: "50%"}}>
                <TextButton
                    text={"Job Seeker"}
                    textStyle={{color: color.white, textAlign: "center"}}
                    showUnderLine={isJobSeeker}
                    onPress={() => {
                        setShowErrMsg(false);
                        setIsJobSeeker(true);
                    }}
                />
                </View>
                <View style={{width: "50%"}}>
                <TextButton
                    text={"Recruiter"}
                    textStyle={{color: color.white, textAlign: "center"}}
                    showUnderLine={(!isJobSeeker)}
                    viewStyle={{marginLeft: 32}}
                    onPress={() => {
                        setShowErrMsg(false);
                        setIsJobSeeker(false);
                    }}
                />
                </View>
                <View style={{width: "50%", alignContent: "center"}}></View>
            </View>
        <ScrollView style={CustomStyling.curveViewStyle}>
            {(!isJobSeeker) ? 
                <CustomTextField 
                    pickerLabel="Company Name"
                    placeholder={"Enter company name"}
                    defaultValue={""}
                    containerStyle={{marginTop: 32}}
                    onTextChange={handleChange("name")}
                    errorText={errors.name}
                    showError={ showErrorMsg && errors.name }
                />
                : 
                <CustomTextField 
                    pickerLabel="Full Name"
                    placeholder={"Enter Full Name"}
                    defaultValue={""}
                    containerStyle={{marginTop: (isJobSeeker) ? 32:0}}
                    onTextChange={handleChange("name")}
                    errorText={errors.name}
                    showError={ showErrorMsg && errors.name }
                />
            }
           <CustomTextField 
                pickerLabel="Email"
                placeholder={"Enter email"}
                defaultValue={""}
                onTextChange={handleChange("email")}
                errorText={errors.email}
                showError={ showErrorMsg && errors.email }
            />
            <CustomTextField 
                pickerLabel="Password"
                placeholder={"Enter password"}
                defaultValue={""}
                isPasswordField={true}
                onTextChange={handleChange("password")}
                errorText={errors.password}
                showError={ showErrorMsg && errors.password }
            />
            <CustomTextField 
                pickerLabel="Confirm Password"
                placeholder={"Re-enter password"}
                defaultValue={""}
                isPasswordField={true}
                onTextChange={handleChange("confirmPassword")}
                errorText={errors.confirmPassword}
                showError={ showErrorMsg && errors.confirmPassword }
            />
            <MainButton 
                text={"SignUp"}
                onPress={() => {
                    (isValid) ? handleSubmit() : setShowErrMsg(true);
                }}
                // disabled={!isValid}
            />
            
            <View style={{flexDirection: "row", alignSelf: "center", marginTop: 24, marginBottom: 48}}>
                <Text style={CustomStyling.regular16Text}>Already have an account? </Text>
                <TextButton 
                    text={"Login Here"}
                    onPress={() => navigation.goBack()}
                />
            </View>
            
        </ScrollView>
       </View>
        )}
        </Formik>
    );

};

export default SignUpView;