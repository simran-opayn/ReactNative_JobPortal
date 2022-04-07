import React, { useState, useEffect } from "react";
import { ScrollView, Text } from 'react-native';
import { Formik } from 'formik'
import * as yup from 'yup'

import CustomTextField from "../helper/components/CustomTextField";
import { MainButton } from "../helper/components/mainButton";
import { color } from "../helper/Common/Colors";

const LoginToView = () => {
    const [showErrorMsg, setShowErrMsg] = useState(false);
    const loginValidationSchema = yup.object().shape({
        email: yup
          .string()
          .email("Please enter valid email")
          .required('Email Address is Required'),
        password: yup
          .string()
          .min(8, ({ min }) => `Password must be at least ${min} characters`)
          .required('Password is required'),
      });

    useEffect(() => {
        setShowErrMsg(false);
    }, []);

    return(
        <Formik
        validationSchema={loginValidationSchema}
        initialValues={{ email: '', password: '' }}
        onSubmit={values => console.log(values)}
        
      >
        {({handleChange, handleBlur, handleSubmit, values, errors, isValid,
   }) => (
        <ScrollView style={{padding: 24, backgroundColor: color.white}}>
            <Text style={{marginTop: 80, marginBottom: 40}}>Login</Text>
            <CustomTextField 
                pickerLabel="Username"
                //  onBlur={() => handleBlur('email')}
                defaultValue={values.email}
                keyboardType="email-address"
                onTextChange={handleChange("email")}
                onBlur={() => { console.log(errors.email && showErrorMsg+ "   >  "+showErrorMsg+"    <err"+errors.email)}}
                errorText={errors.email}
                showError={ showErrorMsg && errors.email }
            />
            <CustomTextField 
                pickerLabel="Paassord"
                isPasswordField={true}
                defaultValue={values.password}
                //  onBlur={handleBlur('pasword')}
                onTextChange={handleChange("password")}
                keyboardType="email-address"
                errorText={errors.password}
                showError={ showErrorMsg && errors.password }
            />
            <MainButton 
                text={"Login"}
                onPress={() => {(isValid) ? handleSubmit() : setShowErrMsg(true);
                    (isValid) ? console.log("Errrrs solveddd") : console.log("Errrs Prressennntt");
                }}
                // disabled={!isValid}
            />
        </ScrollView>
        )}
        </Formik>
    );

};

export default LoginToView;